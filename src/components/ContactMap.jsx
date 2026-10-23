import React from 'react';
import { T, useLanguage, WHATSAPP } from './UI.jsx';

const officeQuery = 'Al shahin consulting in banking services, Julphar Tower, Ras Al Khaimah, United Arab Emirates';
const officeMapsLink = 'https://maps.app.goo.gl/LHT29o7UFcm6khU69';

// Standard public map embed: no Maps JavaScript SDK, API key or billing setup.
export function useOfficeMap() {
  const { lang } = useLanguage();
  const params = new URLSearchParams({ q: officeQuery, z: '15', output: 'embed', hl: lang });
  return { src: `https://www.google.com/maps?${params}`, href: officeMapsLink };
}

export default function ContactMap() {
  const { tr } = useLanguage();
  const map = useOfficeMap();
  return <div className="contact-map-card">
    <iframe className="contact-map-frame" title={tr('officeMapTitle')} src={map.src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    <div className="contact-map-info">
      <T as="p" k="visitOffice" className="eyebrow" />
      <T as="address" k="address" />
      <div className="contact-map-actions">
        <a className="text-link" href={map.href} target="_blank" rel="noopener noreferrer">{tr('openGoogleMaps')}</a>
        <a className="text-link" href={WHATSAPP}>{tr('contactWhatsApp')}</a>
      </div>
    </div>
  </div>;
}
