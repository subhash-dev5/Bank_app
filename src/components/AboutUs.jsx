import React from 'react';
import { T, SourceImage, useLanguage } from './UI.jsx';

const groups = [
  { heading: 'aboutPersonalGroup', items: ['area0', 'area1', 'area2'] },
  { heading: 'aboutBusinessGroup', items: ['area3', 'area4', 'area5', 'area6'] },
  { heading: 'aboutAdvisoryGroup', items: ['area7', 'area8'] },
  { heading: 'aboutIslamicGroup', items: ['area9'] },
  { heading: 'aboutDigitalGroup', items: ['area10'] },
];

export default function AboutUs() {
  const { tr } = useLanguage();
  return <section className="about-us-section section" id="about-us" aria-labelledby="about-us-heading">
    <div className="about-us-copy">
      <div className="section-heading reveal"><T as="h2" k="aboutUsTitle" id="about-us-heading" /></div>
      <T as="h3" k="aboutCompanyName" className="about-us-company" />
      <T as="p" k="aboutUsIntro" className="about-us-intro" />
      <div className="about-us-groups">
        {groups.map(group => <div className="about-us-group" key={group.heading}>
          <T as="h3" k={group.heading} />
          <ul>{group.items.map(key => <T as="li" k={key} key={key} />)}</ul>
        </div>)}
      </div>
    </div>
    <div className="about-us-visual">
      <SourceImage src="/assets/Silver Coins and Payment Logos.png" alt={tr('aboutPaymentImageAlt')} altKey="aboutPaymentImageAlt" width="1145" height="1374" loading="lazy" />
    </div>
  </section>;
}
