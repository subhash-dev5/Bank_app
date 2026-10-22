import { useEffect } from 'react';
import { motionQuery } from '../lib/motionPreference.js';

/** Scroll accents work independently of GSAP and never change document flow. */
export function useScrollDetails(scope, pathname) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const reduced = motionQuery();
    const sections = [...root.querySelectorAll('main > section')];
    const steps = [...root.querySelectorAll('.process-step')];
    const entrances = [...root.querySelectorAll('.section-heading, .service-card, .process-step, .calculator-card, .eligibility-card, .team-card, .review-carousel, .faq-list details, .contact-form, .about-art, .detail-content > div')];
    const visible = new Set();
    const ripples = new Map();
    let frame = 0, observer, entranceObserver;

    function paint() {
      frame = 0;
      if (reduced.matches) return;
      const height = window.innerHeight;
      for (const section of visible) {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (height * .85 - rect.top) / (height * .65)));
        const travel = Math.min(1, Math.max(-1, (height / 2 - (rect.top + rect.height / 2)) / height));
        section.style.setProperty('--scene-progress', progress.toFixed(3));
        section.style.setProperty('--scene-travel', `${(travel * 22).toFixed(1)}px`);
      }
      steps.forEach(step => {
        const rect = step.getBoundingClientRect();
        step.classList.toggle('step-reached', rect.top < height * .73);
      });
    }
    function queue() { if (!frame) frame = requestAnimationFrame(paint); }
    function clearRipples() {
      ripples.forEach((timer, node) => { clearTimeout(timer); node.remove(); }); ripples.clear();
    }
    function setup() {
      observer?.disconnect(); entranceObserver?.disconnect(); visible.clear();
      entrances.forEach((element, i) => {
        element.classList.remove('is-visible');
        element.classList.toggle('enter-ready', !reduced.matches && Boolean(window.IntersectionObserver));
        element.style.setProperty('--enter-delay', `${i % 4 * 85}ms`);
      });
      sections.forEach(section => {
        section.classList.toggle('scroll-scene', !reduced.matches);
        if (reduced.matches) { section.style.removeProperty('--scene-progress'); section.style.removeProperty('--scene-travel'); }
      });
      if (reduced.matches) { steps.forEach(step => step.classList.remove('step-reached')); clearRipples(); return; }
      if (window.IntersectionObserver) {
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            entry.target.classList.toggle('scene-in-view', entry.isIntersecting);
            if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
          });
          queue();
        }, { rootMargin: '12% 0px', threshold: 0 });
        sections.forEach(section => observer.observe(section));
        entranceObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
            else if (entry.boundingClientRect.top > window.innerHeight) entry.target.classList.remove('is-visible');
          });
        }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
        entrances.forEach(element => entranceObserver.observe(element));
      } else sections.forEach(section => visible.add(section));
      queue();
    }
    function revealFocused(event) {
      let element = event.target.closest('.enter-ready');
      while (element) { element.classList.add('is-visible'); element = element.parentElement?.closest('.enter-ready'); }
    }
    function ripple(event) {
      if (reduced.matches) return;
      const button = event.target.closest('.button, .carousel-controls button');
      if (!button || !root.contains(button) || button.disabled) return;
      if (ripples.size >= 4) { const first = ripples.entries().next().value; clearTimeout(first[1]); first[0].remove(); ripples.delete(first[0]); }
      const rect = button.getBoundingClientRect(), node = document.createElement('span');
      node.className = 'event-ripple'; node.setAttribute('aria-hidden', 'true');
      const keyboard = event.detail === 0;
      node.style.setProperty('--ripple-x', `${keyboard ? rect.width / 2 : event.clientX - rect.left}px`);
      node.style.setProperty('--ripple-y', `${keyboard ? rect.height / 2 : event.clientY - rect.top}px`);
      node.style.setProperty('--ripple-size', `${Math.max(rect.width, rect.height) * 2}px`);
      button.append(node);
      ripples.set(node, setTimeout(() => { node.remove(); ripples.delete(node); }, 650));
    }
    setup();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    root.addEventListener('click', ripple);
    root.addEventListener('focusin', revealFocused);
    reduced.addEventListener('change', setup);
    return () => {
      cancelAnimationFrame(frame); observer?.disconnect(); entranceObserver?.disconnect(); clearRipples();
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); root.removeEventListener('click', ripple); reduced.removeEventListener('change', setup);
      sections.forEach(section => { section.classList.remove('scroll-scene', 'scene-in-view'); section.style.removeProperty('--scene-progress'); section.style.removeProperty('--scene-travel'); });
      steps.forEach(step => step.classList.remove('step-reached'));
      entrances.forEach(element => { element.classList.remove('enter-ready', 'is-visible'); element.style.removeProperty('--enter-delay'); });
      root.removeEventListener('focusin', revealFocused);
    };
  }, [scope, pathname]);
}

/** Brief local feedback for calculator updates, with cancellation on unmount. */
export function useUpdateFeedback(ref, value) {
  useEffect(() => {
    const reduced = motionQuery();
    if (reduced.matches || !ref.current?.animate) return;
    const animation = ref.current.animate([
      { boxShadow: 'inset 0 0 0 1px transparent', backgroundColor: 'transparent' },
      { boxShadow: 'inset 0 0 0 1px #c9a24b66', backgroundColor: '#c9a24b0d', offset: .3 },
      { boxShadow: 'inset 0 0 0 1px transparent', backgroundColor: 'transparent' },
    ], { duration: 500, easing: 'ease-out' });
    const stop = () => { if (reduced.matches) animation.cancel(); };
    reduced.addEventListener('change', stop);
    return () => { animation.cancel(); reduced.removeEventListener('change', stop); };
  }, [ref, value]);
}
