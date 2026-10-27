import { useEffect } from 'react';
import { motionQuery } from '../lib/motionPreference.js';

/** Native sticky cards keep touch scrolling reversible and release after the last card. */
export function useMobileServiceStack(scope, pathname, lang) {
  useEffect(() => {
    const section = scope.current?.querySelector('.services-section');
    if (!section) return;
    const cards = [...section.querySelectorAll('.service-card')];
    const mobile = matchMedia('(max-width: 767px) and (min-height: 560px)');
    const system = matchMedia('(prefers-reduced-motion: reduce)');
    const preference = motionQuery();
    const header = document.querySelector('.site-header');
    let frame = 0, active = false, disposed = false;
    function clear() {
      active = false;
      section.classList.remove('mobile-service-stack');
      section.style.removeProperty('--service-stack-top');
      section.style.removeProperty('--service-stack-height');
      cards.forEach(card => {
        card.style.removeProperty('--stack-index');
        card.style.removeProperty('--stack-depth');
      });
    }
    function paint() {
      frame = 0;
      if (!active) return;
      const top = (header?.getBoundingClientRect().height || 0) + 12;
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        const distance = next ? next.getBoundingClientRect().top - top - (index + 1) * 4 : Infinity;
        const depth = Math.min(1, Math.max(0, 1 - distance / (window.innerHeight * .65)));
        card.style.setProperty('--stack-depth', depth.toFixed(3));
      });
    }
    function queue() { if (active && !frame) frame = requestAnimationFrame(paint); }
    function setup() {
      if (disposed) return;
      clear();
      if (!mobile.matches || system.matches || preference.matches || cards.length < 2) return;
      const top = (header?.getBoundingClientRect().height || 0) + 12;
      const height = Math.min(720, window.innerHeight - top - 48);
      section.style.setProperty('--service-stack-top', `${top}px`);
      section.style.setProperty('--service-stack-height', `${height}px`);
      cards.forEach((card, index) => card.style.setProperty('--stack-index', String(index)));
      section.classList.add('mobile-service-stack');
      // Keep the ordinary layout when enlarged text leaves too little room for the poster.
      if (cards.some(card => card.querySelector('.service-card-body').scrollHeight + 120 > height)) { clear(); return; }
      active = true;
      queue();
    }
    const observer = window.ResizeObserver ? new ResizeObserver(setup) : null;
    if (header) observer?.observe(header);
    setup();
    mobile.addEventListener('change', setup); system.addEventListener('change', setup);
    preference.addEventListener('change', setup);
    window.addEventListener('resize', setup);
    window.addEventListener('scroll', queue, { passive: true });
    document.fonts?.ready.then(setup);
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer?.disconnect(); clear();
      mobile.removeEventListener('change', setup); system.removeEventListener('change', setup);
      preference.removeEventListener('change', setup);
      window.removeEventListener('resize', setup); window.removeEventListener('scroll', queue);
    };
  }, [scope, pathname, lang]);
}
