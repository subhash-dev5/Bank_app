// One preference shared by CSS, scroll effects, counters and pointer interactions.
// The device setting remains the default; the review control is an explicit override.
export function motionQuery() {
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  return {
    get matches() {
      const mode = document.documentElement.dataset.motion;
      return mode ? mode === 'reduced' : system.matches;
    },
    addEventListener(_type, listener) {
      system.addEventListener('change', listener);
      window.addEventListener('shahin:motion-change', listener);
    },
    removeEventListener(_type, listener) {
      system.removeEventListener('change', listener);
      window.removeEventListener('shahin:motion-change', listener);
    },
  };
}
