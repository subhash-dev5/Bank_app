import { useEffect } from 'react';
import { motionQuery } from '../lib/motionPreference.js';

/** A single scroll-driven backdrop keeps the hero and sticky header continuous. */
export function useHeroBackground(scope, pathname) {
  useEffect(() => {
    const root = scope.current, hero = root?.querySelector('.hero');
    if (!hero) return;
    const reduced = motionQuery();
    let frame = 0;
    const paint = () => {
      frame = 0;
      const headerHeight = root.querySelector('.site-header')?.getBoundingClientRect().height || 99;
      const bounds = hero.getBoundingClientRect();
      const end = Math.max(1, bounds.bottom + window.scrollY - headerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / end));
      const fade = Math.min(1, Math.max(0, (progress - .12) / .88));
      const eased = fade * fade * (3 - 2 * fade);
      root.style.setProperty('--hero-background-opacity', String(1 - eased));
      root.style.setProperty('--hero-header-opacity', String(.55 + eased * .45));
      root.style.setProperty('--hero-background-shift', reduced.matches ? '0px' : `${-progress * 36}px`);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    reduced.addEventListener('change', queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); reduced.removeEventListener('change', queue);
      ['--hero-background-opacity', '--hero-header-opacity', '--hero-background-shift'].forEach(name => root.style.removeProperty(name));
    };
  }, [scope, pathname]);
}
