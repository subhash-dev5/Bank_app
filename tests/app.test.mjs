import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { after, test } from 'node:test';
import { createServer } from 'vite';
import { JSDOM } from 'jsdom';
import { amortise, validateEnquiry } from '../src/lib/finance.js';
import { createApp } from '../server.js';

process.env.NODE_ENV = 'test';
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost/' });
for (const key of ['window', 'document', 'HTMLElement', 'SVGElement', 'HTMLInputElement', 'Event', 'MouseEvent', 'KeyboardEvent']) globalThis[key] = dom.window[key];
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.matchMedia = dom.window.matchMedia = query => ({ matches: query.includes('prefers-reduced-motion'), addEventListener() {}, removeEventListener() {} });
globalThis.requestAnimationFrame = fn => setTimeout(() => fn(performance.now()), 0);
globalThis.cancelAnimationFrame = id => clearTimeout(id);
dom.window.requestAnimationFrame = globalThis.requestAnimationFrame;
dom.window.cancelAnimationFrame = globalThis.cancelAnimationFrame;
globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
globalThis.innerHeight = 900; globalThis.scrollY = 0;
dom.window.scrollTo = () => {};
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
const { act, createElement } = await import('react');
const { createRoot } = await import('react-dom/client');
const { renderToStaticMarkup } = await import('react-dom/server');
const vite = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom' });
const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
let root;
after(async () => { if (root) await act(() => root.unmount()); await vite.close(); dom.window.close(); });
const $ = selector => document.querySelector(selector);
const click = async selector => { const element = $(selector); assert(element, `Missing ${selector}`); await act(async () => element.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))); };
async function change(selector, value) {
  const el = $(selector); assert(el);
  const prototype = el instanceof HTMLInputElement ? HTMLInputElement.prototype : el.tagName === 'SELECT' ? dom.window.HTMLSelectElement.prototype : dom.window.HTMLTextAreaElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
  await act(async () => { setter.call(el, value); el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); });
}

test('amortisation covers default, mortgage, zero interest and schedule endpoints', () => {
  const loan = amortise(150000, 5.5, 4);
  assert(Math.abs(loan.payment - 3488.47) < .01);
  assert(Math.abs(amortise(1000000, 4.5, 20).payment - 6326.49) < .01);
  assert.equal(amortise(150000, 0, 4).payment, 3125);
  assert.equal(loan.balances[0], 150000); assert(loan.balances.at(-1) < .001);
  assert(loan.balances.every((v, i, a) => i === 0 || v <= a[i - 1]));
  assert.throws(() => amortise(0, 5, 4), RangeError);
  assert.deepEqual(validateEnquiry({ name: '', phone: 'abc', service: '', consent: false }), { name: 'required', phone: 'phoneError', service: 'required', consent: 'consentError' });
});

test('every dictionary entry has a native-review row; all six views have unique IDs, valid anchors and assets', async () => {
  const copy = JSON.parse(await fs.readFile(new URL('../src/content/translations.json', import.meta.url), 'utf8'));
  const missing = await fs.readFile(new URL('../MISSING.md', import.meta.url), 'utf8');
  for (const [key, values] of Object.entries(copy)) { assert(values.en && values.ar, key); assert(missing.includes(`\`${key}\``), key); }
  const views = ['/', ...['real-estate-financing', 'salary-financing', 'project-financing', 'open-bank-account', 'personal-loan'].map(s => `/services/${s}.html`)];
  const rendered = new Map(views.map(url => [url, new JSDOM(renderToStaticMarkup(createElement(App, { initialPath: url }))).window.document]));
  for (const [url, doc] of rendered) {
    const ids = [...doc.querySelectorAll('[id]')].map(el => el.id);
    assert.equal(ids.length, new Set(ids).size, url); assert.equal(doc.querySelectorAll('h1').length, 1, url);
    for (const link of doc.querySelectorAll('a[href]')) {
      const target = new URL(link.getAttribute('href'), `http://localhost${url}`);
      if (target.origin !== 'http://localhost') continue;
      const page = rendered.get(target.pathname === '/index.html' ? '/' : target.pathname);
      assert(page, `${url} → ${target.pathname}`);
      if (target.hash) assert(page.getElementById(target.hash.slice(1)), `${url} → ${target.hash}`);
    }
    for (const img of doc.querySelectorAll('img')) {
      assert(img.hasAttribute('alt') && img.width && img.height);
      if (img.getAttribute('src').startsWith('/assets/')) await fs.access(new URL(`../public${img.getAttribute('src')}`, import.meta.url));
    }
  }
});

test('real React interactions: tabs, enquiry, Arabic, client routes, reviews, image fallback and local-only form', async () => {
  root = createRoot($('#root'));
  await act(async () => root.render(createElement(App)));
  assert($('#payment').textContent.includes('3,488.47'));
  await click('#tab-mortgage'); assert.equal($('#amount').value, '1000000'); assert($('#payment').textContent.includes('6,326.49'));
  await change('#rate', '0'); assert($('#payment').textContent.includes('4,166.67'));
  assert(decodeURIComponent($('.send-result').href).includes('not an offer'));
  for (let i = 0; i < 4; i++) { assert($('#flow-next').disabled); await click('#flow-body input'); await click('#flow-next'); }
  assert($('#flow-body').textContent.includes('Nothing has been sent.'));
  assert($('#flow-body a').href.startsWith('https://wa.me/971557010000?text='));
  await click('.language'); assert.equal(document.documentElement.dir, 'rtl'); assert($('#flow-body').textContent.includes('لم يتم إرسال'));
  await click('a[href="/services/real-estate-financing.html"]'); assert.equal(window.location.pathname, '/services/real-estate-financing.html'); assert.equal(document.documentElement.dir, 'rtl');
  await click('a[href="/#services"]'); assert.equal(window.location.pathname, '/');
  await click('.language'); assert.equal(document.documentElement.dir, 'ltr');
  await click('#review-next'); assert.equal($('#review-count').textContent, '02 / 03');
  await act(() => $('#contact-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  assert($('#error-name').textContent); assert.equal($('#form-status').textContent, '');
  await change('#contact-name', 'Demo Reviewer'); await change('#contact-phone', '+971 55 123 4567'); await change('#contact-service', 'personal-loan'); await click('#contact-consent');
  await act(async () => { $('#contact-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); await new Promise(resolve => setTimeout(resolve, 10)); });
  assert($('#form-status').textContent.includes('Nothing was sent or saved'));
  assert.equal($('#contact-form').getAttribute('method'), 'dialog');
  const img = $('.source-image'); const warn = console.warn; console.warn = () => {};
  try { await act(() => img.dispatchEvent(new Event('error'))); assert(img.src.startsWith('data:image/svg+xml')); assert(window.imageFailures.length > 0); } finally { console.warn = warn; }
  await click('.menu-toggle'); assert.equal($('.menu-toggle').getAttribute('aria-expanded'), 'true');
});

test('full motion works with the CDN absent; scroll reveals and local engine respond to the review control', async () => {
  const observers = [];
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = []; observers.push(this); }
    observe(element) { this.targets.push(element); }
    disconnect() { this.targets = []; }
  }
  window.IntersectionObserver = globalThis.IntersectionObserver = Observer;
  assert.equal(document.documentElement.dataset.motion, 'reduced');
  await click('#motion-toggle');
  assert.equal(document.documentElement.dataset.motion, 'full');
  const heading = $('.section-heading');
  assert(heading.classList.contains('enter-ready'));
  const observer = observers.find(item => item.targets.includes(heading));
  assert(observer);
  observer.callback([{ target: heading, isIntersecting: true, boundingClientRect: { top: 200 } }]);
  assert(heading.classList.contains('is-visible'));
  for (let attempt = 0; attempt < 80 && !$('[data-animation-engine="ready"]'); attempt++) {
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 20)); });
  }
  assert($('[data-animation-engine="ready"]'), 'The locally bundled engine must initialise without external scripts');
  const { gsap, ScrollTrigger } = await vite.ssrLoadModule('/src/lib/animationEngine.js');
  try {
    assert(ScrollTrigger.getAll().length > 0, 'Scroll animations are registered');
    await click('#motion-toggle');
    assert.equal(document.documentElement.dataset.motion, 'reduced');
    assert.equal(ScrollTrigger.getAll().length, 0, 'Reduced mode tears down scroll animations');
    assert(!heading.classList.contains('enter-ready'), 'Content remains visible in reduced mode');
    const html = await fs.readFile(new URL('../index.html', import.meta.url), 'utf8');
    assert(!html.includes('cdnjs.cloudflare.com'));
  } finally { ScrollTrigger.disable(); gsap.ticker.sleep(); delete window.IntersectionObserver; delete globalThis.IntersectionObserver; }
});

test('Express production serves home/deep links/assets, exposes health, rejects submissions and unknown pages', async () => {
  const { app, close } = await createApp({ production: true });
  const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal((await fetch(`${origin}/api/health`)).status, 200);
    for (const url of ['/', '/services/personal-loan.html', '/assets/skyline.svg']) assert.equal((await fetch(origin + url)).status, 200, url);
    assert.equal((await fetch(origin + '/api/contact', { method: 'POST' })).status, 405);
    assert.equal((await fetch(origin + '/unknown-page')).status, 404);
  } finally { await new Promise(resolve => server.close(resolve)); await close(); }
});
