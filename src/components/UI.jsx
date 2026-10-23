import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import dictionary from '../content/translations.json';
import { motionQuery } from '../lib/motionPreference.js';

const LanguageContext = createContext(null);
export const BRAND = 'Al Shahin Banking Services and Consultations';
export const WHATSAPP = 'https://wa.me/971557010000';
export const serviceSlugs = ['real-estate-financing', 'salary-financing', 'project-financing', 'open-bank-account', 'personal-loan'];
export const whatsappMessage = text => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const tr = key => dictionary[key]?.[lang] || key;
  const number = (value, digits = 0) => new Intl.NumberFormat(lang === 'ar' ? 'ar-AE' : 'en-AE', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  const money = value => `${number(value, 2)} ${tr('amountUnit')}`;
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  return <LanguageContext.Provider value={{ lang, setLang, tr, number, money }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
export function T({ as: Tag = 'span', k, ...props }) {
  const { tr } = useLanguage();
  return <Tag data-i18n={k} {...props}>{tr(k)}</Tag>;
}

// Use the same stable dimensions on error. The fallback is an inline SVG data URL.
const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 390"><rect width="600" height="390" fill="#e6deca"/><circle cx="300" cy="190" r="145" fill="none" stroke="#c9a24b"/><path d="M190 295V170l48-34 48 34v125h-28v-80h-40v80zm130 0V95h66v200z" fill="#0b1f3a"/><path d="M328 117h50m-50 25h50m-50 25h50m-50 25h50m-50 25h50m-50 25h50m-50 25h50M160 305h270" stroke="#c9a24b"/><text x="300" y="350" text-anchor="middle" font-family="Arial" font-size="11" fill="#0b1f3a">AL SHAHIN · ILLUSTRATION PLACEHOLDER</text></svg>`;
export function SourceImage({ src, alt = '', altKey, ...props }) {
  const [failed, setFailed] = useState(false);
  const image = useRef(null), logged = useRef(false);
  const { tr, lang } = useLanguage();
  const serviceKey = altKey || Object.keys(dictionary).find(key => /^service\d$/.test(key) && dictionary[key].en === alt);
  const translatedAlt = serviceKey ? dictionary[serviceKey][lang] : alt;
  function fail() {
    if (logged.current) return;
    logged.current = true;
    const failure = { url: src, time: new Date().toISOString() };
    window.imageFailures ||= []; window.imageFailures.push(failure);
    console.warn('Al Shahin mock image fallback:', failure);
    setFailed(true);
  }
  useEffect(() => { if (image.current?.complete && !image.current.naturalWidth) fail(); }, [src]);
  return <img ref={image} {...props} src={failed ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fallbackSvg)}` : src} alt={failed && alt ? tr('imageFallback') : translatedAlt} onError={fail} />;
}

export function TiltCard({ children, ...props }) {
  const ref = useRef(null), frame = useRef(0);
  const move = event => {
    if (!matchMedia('(pointer: fine)').matches || motionQuery().matches) return;
    const { clientX, clientY } = event, rect = ref.current.getBoundingClientRect();
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty('--tilt-x', `${-(clientY - rect.top - rect.height / 2) / rect.height * 7}deg`);
      ref.current?.style.setProperty('--tilt-y', `${(clientX - rect.left - rect.width / 2) / rect.width * 7}deg`);
      ref.current?.style.setProperty('--shine-x', `${(clientX - rect.left) / rect.width * 100}%`);
      ref.current?.style.setProperty('--shine-y', `${(clientY - rect.top) / rect.height * 100}%`);
    });
  };
  const reset = () => { cancelAnimationFrame(frame.current); ref.current?.style.setProperty('--tilt-x', '0deg'); ref.current?.style.setProperty('--tilt-y', '0deg'); };
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return <article ref={ref} {...props} onPointerMove={move} onPointerLeave={reset}>{children}</article>;
}

export function Header({ pathname }) {
  const { tr, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false), [compact, setCompact] = useState(false), [active, setActive] = useState('');
  const menuButton = useRef(null);
  useEffect(() => {
    let frame = 0;
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // Separate thresholds prevent the shrinking header from toggling itself
        // when its own height change slightly shifts the scroll position.
        setCompact(previous => previous ? window.scrollY > 24 : window.scrollY > 96);
      });
    };
    const key = e => { if (e.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    scroll(); window.addEventListener('scroll', scroll, { passive: true }); document.addEventListener('keydown', key);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); document.removeEventListener('keydown', key); };
  }, []);
  useEffect(() => {
    setOpen(false); setActive(pathname.startsWith('/services/') ? 'services' : '');
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    ['services', 'process', 'calculators', 'about', 'reviews', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [pathname]);
  return <header className={`site-header${compact ? ' compact' : ''}`}>
    <a className="brand" href="/" aria-label={`${BRAND} — ${tr('homeLabel')}`}>
      <span className="brand-mark" aria-hidden="true"><SourceImage className="client-logo" src="https://shahinbs.com/wp-content/uploads/2024/11/cropped-Untitled-3-copy-2.jpg" width="43" height="43" /></span>
      <span className="brand-name">AL SHAHIN<small><T k="brandSub" /></small></span>
    </a>
    <nav id="navigation" aria-label={tr('mainNav')} className={open ? 'open' : ''}>
      {['services', 'process', 'calculators', 'about', 'reviews', 'contact'].map(id => <a key={id} href={`/#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{tr(`nav${id}`)}</a>)}
    </nav>
    <div className="header-actions">
      <button className="language" type="button" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label={tr('languageSwitch')}>{lang === 'en' ? 'العربية' : 'English'} <span>{lang === 'en' ? 'AR' : 'EN'}</span></button>
      <a className="call-link" href="tel:+971557010000" aria-label={`${tr('callLabel')} +971 55 701 0000`}>↗</a>
      <a className="button button-small" href={WHATSAPP}>{tr('whatsapp')}</a>
      <button ref={menuButton} className="menu-toggle" aria-controls="navigation" aria-expanded={open} aria-label={tr(open ? 'menuClose' : 'menuOpen')} onClick={() => setOpen(value => !value)}>{open ? '×' : '☰'}</button>
    </div>
  </header>;
}
