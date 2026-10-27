import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LanguageProvider, Header, T, SourceImage, useLanguage, serviceSlugs, WHATSAPP } from './components/UI.jsx';
import { Footer, Home, ServicePage } from './Pages.jsx';
import { usePageMotion } from './hooks/motion.js';
import { useScrollDetails } from './hooks/interactions.js';
import { motionQuery } from './lib/motionPreference.js';
import { useHeroBackground } from './hooks/heroBackground.js';
import { useMobileServiceStack } from './hooks/mobileServiceStack.js';

function ProgressAndGlow() {
  const progress = useRef(null), glow = useRef(null);
  const topRing = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const { tr } = useLanguage();
  useEffect(() => {
    let frame = 0, pointerFrame = 0, lastButton;
    const reduced = motionQuery();
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const fraction = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
        progress.current?.style.setProperty('transform', `scaleX(${fraction})`);
        topRing.current?.style.setProperty('stroke-dashoffset', String(1 - fraction));
        setShowTop(scrollY > innerHeight * .7);
      });
    };
    const clearMagnet = () => { lastButton?.style.setProperty('--magnet-x', '0px'); lastButton?.style.setProperty('--magnet-y', '0px'); lastButton = null; };
    const pointer = event => {
      if (reduced.matches || !matchMedia('(pointer:fine)').matches) return;
      const { clientX, clientY } = event;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        glow.current?.style.setProperty('left', `${clientX}px`); glow.current?.style.setProperty('top', `${clientY}px`);
        const button = event.target.closest('.button');
        if (lastButton !== button) clearMagnet();
        if (button) {
          lastButton = button; const rect = button.getBoundingClientRect();
          button.style.setProperty('--magnet-x', `${(clientX - rect.left - rect.width / 2) * .07}px`);
          button.style.setProperty('--magnet-y', `${(clientY - rect.top - rect.height / 2) * .1}px`);
        }
      });
    };
    scroll(); window.addEventListener('scroll', scroll, { passive: true }); window.addEventListener('pointermove', pointer, { passive: true }); document.addEventListener('pointerleave', clearMagnet);
    reduced.addEventListener('change', clearMagnet);
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(pointerFrame); clearMagnet(); window.removeEventListener('scroll', scroll); window.removeEventListener('pointermove', pointer); document.removeEventListener('pointerleave', clearMagnet); reduced.removeEventListener('change', clearMagnet); };
  }, []);
  return <><div ref={progress} className="scroll-progress" aria-hidden="true" /><div ref={glow} className="cursor-glow" aria-hidden="true" />
    <button type="button" className="back-to-top" hidden={!showTop} aria-label={tr('backToTop')} title={tr('backToTop')} onClick={() => {
      document.querySelector('.brand')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: motionQuery().matches ? 'instant' : 'smooth' });
    }}><svg viewBox="0 0 44 44" aria-hidden="true"><circle className="top-track" cx="22" cy="22" r="19" /><circle ref={topRing} className="top-progress" cx="22" cy="22" r="19" pathLength="1" /></svg><span aria-hidden="true">↑</span></button>
  </>;
}

function Site({ initialPath }) {
  const [pathname, setPathname] = useState(initialPath || window.location.pathname);
  const scope = useRef(null);
  const { lang, tr } = useLanguage();
  const slug = pathname.match(/^\/services\/([^/]+)\.html$/)?.[1];
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = 'full';
    window.dispatchEvent(new Event('shahin:motion-change'));
    return () => { delete document.documentElement.dataset.motion; };
  }, []);
  usePageMotion(scope, pathname, lang);
  useMobileServiceStack(scope, pathname, lang);
  useScrollDetails(scope, pathname);
  useHeroBackground(scope, pathname);
  useEffect(() => {
    const pop = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', pop); return () => window.removeEventListener('popstate', pop);
  }, []);
  useEffect(() => {
    const index = serviceSlugs.indexOf(slug);
    document.title = `${index >= 0 ? tr(`service${index}`) : tr('heroTitle')} | ${BRAND_TITLE}`;
  }, [pathname, lang]);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const hash = window.location.hash.slice(1);
      if (hash) document.getElementById(decodeURIComponent(hash))?.scrollIntoView?.({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  const navigate = event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href]');
    if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === pathname) return;
    if (!['/', '/index.html', ...serviceSlugs.map(s => `/services/${s}.html`)].includes(url.pathname)) return;
    event.preventDefault(); window.history.pushState({}, '', url); setPathname(url.pathname);
  };
  return <div ref={scope} className={`site-shell${slug ? '' : ' has-hero-background'}`} onClick={navigate}>
    {!slug && <div className="hero-backdrop" aria-hidden="true"><picture className="hero-backdrop-picture">
      <source media="(max-width: 767px)" srcSet="/assets/mobile-version%20bg.png" width="941" height="1672" />
      <SourceImage className="hero-backdrop-image" src="/assets/UAE Currency and White Eagle Logo.png" alt="" width="1672" height="941" fetchPriority="high" />
    </picture></div>}
    <a className="skip" href="#main"><T k="skip" /></a><ProgressAndGlow /><Header pathname={pathname} />
    <div className="ambient-motes" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
    {slug ? <ServicePage key={slug} slug={slug} /> : <Home />}
    <Footer /><a className="floating-wa" href={WHATSAPP} aria-label={tr('floatingLabel')}><img src="/assets/wt-logo.png" alt="" width="48" height="48" /></a>
  </div>;
}
const BRAND_TITLE = 'Al Shahin';
export default function App(props) { return <LanguageProvider><Site {...props} /></LanguageProvider>; }
