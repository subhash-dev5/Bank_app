import { useEffect, useRef, useState } from 'react';
import { motionQuery } from '../lib/motionPreference.js';

export function useAnimatedNumber(value) {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);
  useEffect(() => {
    const reduced = motionQuery();
    if (reduced.matches) { current.current = value; setDisplay(value); return; }
    const from = current.current, start = performance.now();
    let frame;
    const tick = now => {
      const progress = Math.min(1, (now - start) / 450);
      current.current = from + (value - from) * (1 - Math.pow(1 - progress, 3));
      setDisplay(current.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const stop = () => { if (reduced.matches) { cancelAnimationFrame(frame); current.current = value; setDisplay(value); } };
    reduced.addEventListener('change', stop);
    return () => { cancelAnimationFrame(frame); reduced.removeEventListener('change', stop); };
  }, [value]);
  return display;
}

/** Locally bundled GSAP; CSS entrance and floating animation starts immediately. */
export function usePageMotion(scope, pathname, lang) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const reduced = motionQuery();
    let context, media, disposed = false, engine, loading, generation = 0;
    function reset() { media?.revert(); context?.revert(); media = context = null; document.body.classList.remove('motion-rail'); }
    async function setup() {
      const version = ++generation;
      reset();
      if (disposed || reduced.matches) { root.dataset.animationEngine = 'reduced'; return; }
      try {
        engine ||= await (loading ||= import('../lib/animationEngine.js'));
      } catch (error) {
        if (!disposed) { root.dataset.animationEngine = 'unavailable'; console.warn('Scroll engine unavailable; native motion remains active.', error); }
        return;
      }
      if (disposed || reduced.matches || version !== generation) return;
      const { gsap, ScrollTrigger } = engine;
      root.dataset.animationEngine = 'ready';
      context = gsap.context(() => {
        media = gsap.matchMedia();
        media.add('(min-width: 1101px) and (pointer: fine)', () => {
          const rail = root.querySelector('.services-track'), viewport = root.querySelector('.services-window');
          if (!rail || !viewport) return;
          const pinTop = () => Math.ceil(document.querySelector('.site-header')?.getBoundingClientRect().height || 0) + 24;
          // Tall posters must remain vertically scrollable on short laptop screens.
          // Only pin when the complete row fits beneath the sticky header.
          if (viewport.offsetHeight > window.innerHeight - pinTop() - 24) return;
          const distance = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
          if (!distance()) return;
          document.body.classList.add('motion-rail');
          const animation = gsap.to(rail, { x: () => (lang === 'ar' ? 1 : -1) * distance(), ease: 'none', scrollTrigger: { trigger: viewport, start: () => `top ${pinTop()}px`, end: () => `+=${Math.min(distance(), window.innerHeight * 1.3)}`, pin: true, scrub: .5, invalidateOnRefresh: true } });
          const focus = event => {
            const card = event.target.closest('.service-card'); if (!card) return;
            const cards = [...rail.children], fraction = cards.indexOf(card) / Math.max(1, cards.length - 1), trigger = animation.scrollTrigger;
            window.scrollTo({ top: trigger.start + fraction * (trigger.end - trigger.start), behavior: 'instant' });
          };
          rail.addEventListener('focusin', focus);
          return () => { rail.removeEventListener('focusin', focus); document.body.classList.remove('motion-rail'); };
        });
        // Entrance reveals are native CSS/IntersectionObserver, including on mobile.
        if (root.querySelector('.process-line path')) gsap.from('.process-line path', { strokeDashoffset: 1000, ease: 'none', scrollTrigger: { trigger: '.process-grid', start: 'top 85%', end: 'bottom 50%', scrub: .6 } });
        if (root.querySelector('.about-monogram')) gsap.to('.about-monogram', { y: -24, scrollTrigger: { trigger: '.about-art', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        root.querySelectorAll('.detail-art').forEach(el => gsap.from(el, { rotation: -4, scale: .94, duration: 1.1, ease: 'power2.out', clearProps: 'transform' }));
      }, root);
      ScrollTrigger.refresh();
    }
    setup();
    reduced.addEventListener('change', setup);
    let resizeTimer;
    const resize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(setup, 150); };
    window.addEventListener('resize', resize);
    document.fonts?.ready.then(() => { if (!disposed) setup(); });
    return () => { disposed = true; generation++; clearTimeout(resizeTimer); window.removeEventListener('resize', resize); reduced.removeEventListener('change', setup); reset(); delete root.dataset.animationEngine; };
  }, [scope, pathname, lang]);
}
