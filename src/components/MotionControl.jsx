import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLanguage } from './UI.jsx';

export default function MotionControl() {
  const { tr } = useLanguage();
  const [systemReduced, setSystemReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [override, setOverride] = useState(null);
  const reduced = override ?? systemReduced;
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
    window.dispatchEvent(new Event('shahin:motion-change'));
  }, [reduced]);
  useEffect(() => () => { delete document.documentElement.dataset.motion; }, []);
  return <button id="motion-toggle" className="motion-toggle" type="button" aria-pressed={!reduced} aria-label={tr(reduced ? 'enableMotion' : 'reduceMotion')} onClick={() => setOverride(!reduced)}>
    <span className="motion-bars" aria-hidden="true"><i /><i /><i /></span>
    <span>{tr(reduced ? 'motionReduced' : 'motionFull')}</span>
    <span className="motion-switch" aria-hidden="true" />
  </button>;
}
