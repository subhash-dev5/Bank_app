import React from 'react';
import { T, SourceImage, useLanguage, WHATSAPP } from './UI.jsx';
import { services } from '../content/services.js';

export default function ServiceDetail({ slug }) {
  const service = services.find(item => item.slug === slug);
  const { tr } = useLanguage();
  if (!service) return null;
  const { index, image } = service;
  return <main id="main" className="service-page">
    <nav className="service-subnav" aria-label={tr('navservices')}>
      {services.map(item => <a key={item.slug} href={`/services/${item.slug}.html`} aria-current={item.slug === slug ? 'page' : undefined}>{tr(`service${item.index}`)}</a>)}
    </nav>

    <section className="detail-hero section">
      <div className="detail-intro">
        <T as="a" k="backServices" className="text-link" href="/#services" />
        <T as="p" k="detailEyebrow" className="eyebrow" />
        <T as="h1" k={`service${index}`} />
        <T as="p" k={`detailLine${index}`} className="detail-lead" />
        <T as="p" k={`detailDesc${index}`} className="detail-description" />
        <div className="hero-ctas">
          <T as="a" k="discussService" className="button" href={WHATSAPP} />
          <T as="a" k="checkEligibility" className="text-link" href="/#eligibility" />
        </div>
      </div>
      <div className="detail-art service-poster">
        <SourceImage src={image} alt={tr(`service${index}`)} altKey={`service${index}`} width="1024" height="1536" />
      </div>
    </section>

    <section className="detail-content section">
      <article className="detail-panel">
        <T as="h2" k="whoHeading" />
        <T as="p" k={`who${index}`} />
        <T as="p" k="detailDraft" className="notice" />
      </article>
      <article className="detail-panel">
        <T as="h2" k="prepare" />
        <ul className="detail-checklist">{[0, 1, 2, 3].map(i => <T as="li" k={`prep${i}`} key={i} />)}</ul>
        <T as="p" k="noDocs" className="fine-print" />
      </article>
    </section>

    {index === 4 && <section className="section nafis-block" id="nafis">
      <div className="nafis-copy">
        <T as="h2" k="service5" />
        <T as="p" k="benefit5" />
        <T as="p" k="nafisNote" className="notice" />
      </div>
      <div className="service-poster"><SourceImage src="/assets/5.png" alt={tr('service5')} altKey="service5" width="1024" height="1536" loading="lazy" /></div>
    </section>}

    <section className="detail-cta section">
      <T as="h2" k="ready" />
      <div className="detail-cta-actions">
        <T as="a" k="startChat" className="button" href={WHATSAPP} />
        <T as="a" k="navcontact" className="text-link" href="/#contact" />
      </div>
      <T as="p" k="approval" className="fine-print" />
    </section>
  </main>;
}
