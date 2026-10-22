import React from 'react';
import { T, SourceImage, TiltCard, useLanguage } from './components/UI.jsx';
import { Calculator, Eligibility, Reviews, ContactForm } from './components/Widgets.jsx';
function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
<div className="hero-grain" aria-hidden="true">
</div>
<div className="hero-copy">
<p className="eyebrow">
<span className="short-line">
</span>
<T as="span" k="heroLocation" />
</p>
<h1 id="hero-title">
<T as="span" k="heroTitle" />
<em>
<T as="span" k="heroEm" />
</em>
</h1>
<T as="p" k="heroText" className="hero-description" />
<div className="hero-ctas">
<T as="a" k="startChat" className="button" href="https://wa.me/971557010000" />
<T as="a" k="checkEligibility" className="text-link" href="#eligibility" />
</div>
<div className="hero-proof">
<T as="span" k="proof1" />
<T as="span" k="proof2" />
<T as="span" k="proof3" />
</div>
</div>
<div className="hero-art" aria-hidden="true">
<div className="orbit orbit-one">
</div>
<div className="orbit orbit-two">
</div>
<span className="art-label">{"25.8007° N 55.9762° E"}</span>
<div className="sun-disc">
</div>
<SourceImage className="mountain-layer" src="/assets/mountains.svg" alt="" width="800" height="600" />
<SourceImage className="skyline-layer" src="/assets/skyline.svg" alt="" width="800" height="600" />
<div className="coin coin-one">{"د.إ"}</div>
<div className="coin coin-two">{"✦"}</div>
<div className="art-caption">
<span>{"رأس الخيمة"}</span>
<small>{"RAS AL KHAIMAH, UAE"}</small>
</div>
<div className="art-seal">{"AS"}<span>{"YOUR AMBITION"}<br />{"OUR GUIDANCE"}</span>
</div>
</div>
<div className="hero-bottom">
<T as="span" k="heroAdvisory" />
<T as="a" k="explore" className="scroll-link" href="#services" />
</div>
</section>;
}
function TrustStrip() {
  return <div className="trust-strip">
<div className="trust-placeholder">{"✧ "}<T as="span" k="licensed" />
</div>
<div>{"◈ "}<T as="span" k="sharia" />
</div>
<div>{"◎ "}<T as="span" k="bilingual" />
</div>
<div>{"◷ "}<T as="span" k="always" />
</div>
</div>;
}
function Services() {
  const { tr } = useLanguage();
  return <section className="services-section section" id="services">
<div className="section-heading reveal">
<T as="p" k="serviceseyebrow" className="eyebrow" />
<T as="h2" k="servicestitle" />
<T as="p" k="servicesdesc" className="section-desc" />
</div>
<div className="section-aside">
<T as="span" k="servicesNote" />
<span aria-hidden="true">{"← →"}</span>
</div>
<div className="services-window" tabIndex={0} role="region" aria-label={tr('serviceRailLabel')}>
<div className="services-track">
<TiltCard className="service-card">
<div className="service-art service-art-1">
<SourceImage className="source-image" src="https://shahinbs.com/wp-content/uploads/2024/11/1-4-1024x1024.jpg" alt="Real estate financing" loading="lazy" width="360" height="230" />
<span className="service-number">{"01"}</span>
</div>
<div className="service-card-body">
<T as="h3" k="service0" />
<T as="p" k="benefit0" className="service-benefit" />
<T as="p" k="who0" className="service-who" />
<T as="a" k="learn" className="text-link" href="/services/real-estate-financing.html" />
</div>
</TiltCard>
<TiltCard className="service-card">
<div className="service-art service-art-2">
<SourceImage className="source-image" src="https://shahinbs.com/wp-content/uploads/2024/11/2-1024x1024.jpg" alt="Salary financing" loading="lazy" width="360" height="230" />
<span className="service-number">{"02"}</span>
</div>
<div className="service-card-body">
<T as="h3" k="service1" />
<T as="p" k="benefit1" className="service-benefit" />
<T as="p" k="who1" className="service-who" />
<T as="a" k="learn" className="text-link" href="/services/salary-financing.html" />
</div>
</TiltCard>
<TiltCard className="service-card">
<div className="service-art service-art-3">
<SourceImage className="source-image" src="https://shahinbs.com/wp-content/uploads/2024/11/3-1024x1024.jpg" alt="Project financing" loading="lazy" width="360" height="230" />
<span className="service-number">{"03"}</span>
</div>
<div className="service-card-body">
<T as="h3" k="service2" />
<T as="p" k="benefit2" className="service-benefit" />
<T as="p" k="who2" className="service-who" />
<T as="a" k="learn" className="text-link" href="/services/project-financing.html" />
</div>
</TiltCard>
<TiltCard className="service-card">
<div className="service-art service-art-4">
<SourceImage className="source-image" src="https://shahinbs.com/wp-content/uploads/2024/11/4-1024x1024.jpg" alt="Open a bank account" loading="lazy" width="360" height="230" />
<span className="service-number">{"04"}</span>
</div>
<div className="service-card-body">
<T as="h3" k="service3" />
<T as="p" k="benefit3" className="service-benefit" />
<T as="p" k="who3" className="service-who" />
<T as="a" k="learn" className="text-link" href="/services/open-bank-account.html" />
</div>
</TiltCard>
<TiltCard className="service-card">
<div className="service-art service-art-5">
<SourceImage className="source-image" src="https://shahinbs.com/wp-content/uploads/2024/11/5-1024x1024.jpg" alt="Personal loan" loading="lazy" width="360" height="230" />
<span className="service-number">{"05"}</span>
</div>
<div className="service-card-body">
<T as="h3" k="service4" />
<T as="p" k="benefit4" className="service-benefit" />
<T as="p" k="who4" className="service-who" />
<T as="a" k="learn" className="text-link" href="/services/personal-loan.html" />
</div>
</TiltCard>
<TiltCard className="service-card">
<div className="service-art service-art-6">
<SourceImage className="source-image" src="https://shahinbs.com/wp-content/uploads/2024/11/6-1024x1024.jpg" alt="NafIs" loading="lazy" width="360" height="230" />
<span className="service-number">{"06"}</span>
</div>
<div className="service-card-body">
<T as="h3" k="service5" />
<T as="p" k="benefit5" className="service-benefit" />
<T as="p" k="who5" className="service-who" />
<T as="a" k="learn" className="text-link" href="/services/personal-loan.html#nafis" />
</div>
</TiltCard>
</div>
</div>
</section>;
}
function Process() {
  return <section className="process-section section" id="process">
<div className="section-heading reveal">
<T as="p" k="processeyebrow" className="eyebrow" />
<T as="h2" k="processtitle" />
<T as="p" k="processdesc" className="section-desc" />
</div>
<div className="process-grid">
<svg className="process-line" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true">
<path d="M 0 15 H 1000">
</path>
</svg>
<article className="process-step reveal">
<span className="step-number">{"01"}</span>
<T as="h3" k="step0" />
<T as="p" k="stepdesc0" />
</article>
<article className="process-step reveal">
<span className="step-number">{"02"}</span>
<T as="h3" k="step1" />
<T as="p" k="stepdesc1" />
</article>
<article className="process-step reveal">
<span className="step-number">{"03"}</span>
<T as="h3" k="step2" />
<T as="p" k="stepdesc2" />
</article>
<article className="process-step reveal">
<span className="step-number">{"04"}</span>
<T as="h3" k="step3" />
<T as="p" k="stepdesc3" />
</article>
</div>
</section>;
}
function CalculatorSection() {
  return <section className="calculator-section section" id="calculators">
<div className="calc-intro">
<div className="section-heading reveal">
<T as="p" k="calceyebrow" className="eyebrow" />
<T as="h2" k="calctitle" />
<T as="p" k="calcdesc" className="section-desc" />
</div>
<T as="p" k="illustrative" className="notice" />
</div>
<Calculator />
</section>;
}
function EligibilitySection() {
  return <section className="eligibility-section section" id="eligibility">
<div className="section-heading reveal">
<T as="p" k="eligibleeyebrow" className="eyebrow" />
<T as="h2" k="eligibletitle" />
<T as="p" k="eligibledesc" className="section-desc" />
</div>
<Eligibility />
<T as="p" k="localOnly" className="fine-print centered" />
</section>;
}
function Partners() {
  return <section className="partners section">
<div className="partners-heading">
<T as="h2" k="partnerTitle" />
<T as="p" k="partnerNote" className="fine-print" />
</div>
<div className="partner-grid">
<T as="div" k="partner1" className="placeholder-tile" />
<T as="div" k="partner2" className="placeholder-tile" />
<T as="div" k="partner3" className="placeholder-tile" />
<T as="div" k="partner4" className="placeholder-tile" />
<T as="div" k="partner5" className="placeholder-tile" />
<T as="div" k="partner6" className="placeholder-tile" />
<T as="div" k="partner7" className="placeholder-tile" />
<T as="div" k="partner8" className="placeholder-tile" />
</div>
</section>;
}
function About() {
  return <section className="about-section section" id="about">
<div className="about-art" aria-hidden="true">
<span className="about-monogram">{"ش"}</span>
<div className="about-art-text">{"RAS AL KHAIMAH"}<br />{"ROOTED HERE."}<br />{"LOOKING FORWARD."}</div>
<span className="about-art-year">{"رؤية أوضح لغدك"}</span>
</div>
<div>
<div className="section-heading reveal">
<T as="p" k="abouteyebrow" className="eyebrow" />
<T as="h2" k="abouttitle" />
</div>
<T as="p" k="aboutStory" className="about-story" />
<T as="h3" k="areasTitle" />
<ul className="areas">
<T as="li" k="area0" />
<T as="li" k="area1" />
<T as="li" k="area2" />
<T as="li" k="area3" />
<T as="li" k="area4" />
<T as="li" k="area5" />
<T as="li" k="area6" />
<T as="li" k="area7" />
<T as="li" k="area8" />
<T as="li" k="area9" />
<T as="li" k="area10" />
</ul>
</div>
</section>;
}
function Team() {
  return <section className="team-section section">
<div className="inline-heading">
<T as="h2" k="teamTitle" />
<T as="p" k="teamNote" />
</div>
<div className="team-grid">
<article className="team-card">
<div className="portrait-placeholder" aria-hidden="true">{"♙"}</div>
<T as="h3" k="teamPlaceholder" />
<T as="p" k="teamDetails" />
</article>
<article className="team-card">
<div className="portrait-placeholder" aria-hidden="true">{"♙"}</div>
<T as="h3" k="teamPlaceholder" />
<T as="p" k="teamDetails" />
</article>
<article className="team-card">
<div className="portrait-placeholder" aria-hidden="true">{"♙"}</div>
<T as="h3" k="teamPlaceholder" />
<T as="p" k="teamDetails" />
</article>
</div>
</section>;
}
function ReviewsSection() {
  return <section className="reviews-section section" id="reviews">
<div className="reviews-heading">
<p className="eyebrow">
<T as="span" k="voices" />
</p>
<T as="h2" k="reviewTitle" />
<T as="a" k="googleReviews" className="text-link light" href="https://maps.app.goo.gl/LHT29o7UFcm6khU69" />
</div>
<Reviews />
</section>;
}
function FAQ() {
  return <section className="faq-section section" id="faq">
<div className="section-heading reveal">
<T as="p" k="faqeyebrow" className="eyebrow" />
<T as="h2" k="faqtitle" />
</div>
<T as="p" k="faqDraft" className="fine-print" />
<div className="faq-list">
<details>
<summary>
<span className="faq-number">{"01"}</span>
<T as="span" k="faqQ0" />
<span className="faq-plus" aria-hidden="true">{"+"}</span>
</summary>
<T as="p" k="faqA0" />
</details>
<details>
<summary>
<span className="faq-number">{"02"}</span>
<T as="span" k="faqQ1" />
<span className="faq-plus" aria-hidden="true">{"+"}</span>
</summary>
<T as="p" k="faqA1" />
</details>
<details>
<summary>
<span className="faq-number">{"03"}</span>
<T as="span" k="faqQ2" />
<span className="faq-plus" aria-hidden="true">{"+"}</span>
</summary>
<T as="p" k="faqA2" />
</details>
<details>
<summary>
<span className="faq-number">{"04"}</span>
<T as="span" k="faqQ3" />
<span className="faq-plus" aria-hidden="true">{"+"}</span>
</summary>
<T as="p" k="faqA3" />
</details>
<details>
<summary>
<span className="faq-number">{"05"}</span>
<T as="span" k="faqQ4" />
<span className="faq-plus" aria-hidden="true">{"+"}</span>
</summary>
<T as="p" k="faqA4" />
</details>
<details>
<summary>
<span className="faq-number">{"06"}</span>
<T as="span" k="faqQ5" />
<span className="faq-plus" aria-hidden="true">{"+"}</span>
</summary>
<T as="p" k="faqA5" />
</details>
<details>
<summary>
<span className="faq-number">{"07"}</span>
<T as="span" k="faqQ6" />
<span className="faq-plus" aria-hidden="true">{"+"}</span>
</summary>
<T as="p" k="faqA6" />
</details>
<details>
<summary>
<span className="faq-number">{"08"}</span>
<T as="span" k="faqQ7" />
<span className="faq-plus" aria-hidden="true">{"+"}</span>
</summary>
<T as="p" k="faqA7" />
</details>
</div>
</section>;
}
function Contact() {
  return <section className="contact-section section" id="contact">
<div>
<div className="section-heading reveal">
<T as="p" k="contacteyebrow" className="eyebrow" />
<T as="h2" k="contacttitle" />
</div>
<T as="p" k="contactDesc" />
<div className="contact-details">
<a className="contact-phone" dir="ltr" href="tel:+971557010000">{"+971 55 701 0000 ↗"}</a>
<a href="mailto:info@shahinbs.com">{"info@shahinbs.com"}</a>
<p>
<span dir="ltr">{"07 50 13 70 6"}</span>{" · "}<T as="span" k="verify" />
</p>
<p>
<T as="span" k="hours" />
</p>
</div>
<div className="map-placeholder">
<span aria-hidden="true">{"⌖"}</span>
<T as="p" k="mapLabel" className="eyebrow" />
<T as="address" k="address" />
</div>
<T as="a" k="contactWhatsApp" className="text-link" href="https://wa.me/971557010000" />
</div>
<ContactForm />
</section>;
}
export function Home() {
  return <main id="main">
<Hero />
<TrustStrip />
<Services />
<Process />
<CalculatorSection />
<EligibilitySection />
<Partners />
<About />
<Team />
<ReviewsSection />
<FAQ />
<Contact />
</main>;
}
export function Footer() {
  return <footer>
<div className="footer-top">
<div>
<p className="footer-wordmark">{"AL SHAHIN"}<span>{"✦"}</span>
</p>
<p>{"Al Shahin Banking Services and Consultations"}</p>
<T as="p" k="footerLine" />
</div>
<div className="footer-links">
<T as="a" k="navservices" className="text-link" href="/#services" />
<T as="a" k="navcontact" className="text-link" href="/#contact" />
<a href="mailto:info@shahinbs.com">{"info@shahinbs.com"}</a>
<div className="socials">
<a href="https://www.facebook.com/profile.php?id=100091348860853" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
<span aria-hidden="true">{"f"}</span>
<span>{"Facebook"}</span>
</a>
<a href="https://x.com/ShaheenBanking" target="_blank" rel="noopener noreferrer" aria-label="X">
<span aria-hidden="true">{"𝕏"}</span>
<span>{"X"}</span>
</a>
<a href="https://www.tiktok.com/@shahin10011" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
<span aria-hidden="true">{"♪"}</span>
<span>{"TikTok"}</span>
</a>
<a href="https://www.instagram.com/alshaheenconsultingandbanking/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
<span aria-hidden="true">{"◎"}</span>
<span>{"Instagram"}</span>
</a>
</div>
</div>
</div>
<div className="disclosure">
<T as="p" k="disclosure" />
</div>
<div className="footer-bottom">
<span>{"© 2026 Al Shahin Banking Services and Consultations"}</span>
<T as="span" k="mock" />
</div>
</footer>;
}
function Service0() {
  return <main id="main">
<section className="detail-hero section">
<div>
<T as="a" k="backServices" className="text-link" href="/#services" />
<T as="p" k="detailEyebrow" className="eyebrow" />
<T as="h1" k="service3" />
<T as="p" k="detailLine3" className="detail-lead" />
<T as="p" k="detailDesc3" />
<div className="hero-ctas">
<T as="a" k="discussService" className="button" href="https://wa.me/971557010000" />
<T as="a" k="checkEligibility" className="text-link" href="/#eligibility" />
</div>
</div>
<div className="detail-art" aria-hidden="true">
<SourceImage src="/assets/skyline.svg" alt="" width="800" height="600" />
<span>{"04"}</span>
</div>
</section>
<section className="detail-content section">
<div>
<T as="h2" k="whoHeading" />
<T as="p" k="who3" />
<T as="p" k="detailDraft" className="notice" />
</div>
<div>
<T as="h2" k="prepare" />
<ul className="detail-checklist">
<T as="li" k="prep0" />
<T as="li" k="prep1" />
<T as="li" k="prep2" />
<T as="li" k="prep3" />
</ul>
<T as="p" k="noDocs" className="fine-print" />
</div>
</section>
<section className="detail-cta section">
<T as="h2" k="ready" />
<T as="a" k="startChat" className="button" href="https://wa.me/971557010000" />
<T as="p" k="approval" className="fine-print" />
</section>
</main>;
}
function Service1() {
  return <main id="main">
<section className="detail-hero section">
<div>
<T as="a" k="backServices" className="text-link" href="/#services" />
<T as="p" k="detailEyebrow" className="eyebrow" />
<T as="h1" k="service4" />
<T as="p" k="detailLine4" className="detail-lead" />
<T as="p" k="detailDesc4" />
<div className="hero-ctas">
<T as="a" k="discussService" className="button" href="https://wa.me/971557010000" />
<T as="a" k="checkEligibility" className="text-link" href="/#eligibility" />
</div>
</div>
<div className="detail-art" aria-hidden="true">
<SourceImage src="/assets/skyline.svg" alt="" width="800" height="600" />
<span>{"05"}</span>
</div>
</section>
<section className="detail-content section">
<div>
<T as="h2" k="whoHeading" />
<T as="p" k="who4" />
<T as="p" k="detailDraft" className="notice" />
</div>
<div>
<T as="h2" k="prepare" />
<ul className="detail-checklist">
<T as="li" k="prep0" />
<T as="li" k="prep1" />
<T as="li" k="prep2" />
<T as="li" k="prep3" />
</ul>
<T as="p" k="noDocs" className="fine-print" />
</div>
</section>
<section className="section nafis-block" id="nafis">
<T as="h2" k="service5" />
<T as="p" k="benefit5" />
<T as="p" k="nafisNote" className="notice" />
</section>
<section className="detail-cta section">
<T as="h2" k="ready" />
<T as="a" k="startChat" className="button" href="https://wa.me/971557010000" />
<T as="p" k="approval" className="fine-print" />
</section>
</main>;
}
function Service2() {
  return <main id="main">
<section className="detail-hero section">
<div>
<T as="a" k="backServices" className="text-link" href="/#services" />
<T as="p" k="detailEyebrow" className="eyebrow" />
<T as="h1" k="service2" />
<T as="p" k="detailLine2" className="detail-lead" />
<T as="p" k="detailDesc2" />
<div className="hero-ctas">
<T as="a" k="discussService" className="button" href="https://wa.me/971557010000" />
<T as="a" k="checkEligibility" className="text-link" href="/#eligibility" />
</div>
</div>
<div className="detail-art" aria-hidden="true">
<SourceImage src="/assets/skyline.svg" alt="" width="800" height="600" />
<span>{"03"}</span>
</div>
</section>
<section className="detail-content section">
<div>
<T as="h2" k="whoHeading" />
<T as="p" k="who2" />
<T as="p" k="detailDraft" className="notice" />
</div>
<div>
<T as="h2" k="prepare" />
<ul className="detail-checklist">
<T as="li" k="prep0" />
<T as="li" k="prep1" />
<T as="li" k="prep2" />
<T as="li" k="prep3" />
</ul>
<T as="p" k="noDocs" className="fine-print" />
</div>
</section>
<section className="detail-cta section">
<T as="h2" k="ready" />
<T as="a" k="startChat" className="button" href="https://wa.me/971557010000" />
<T as="p" k="approval" className="fine-print" />
</section>
</main>;
}
function Service3() {
  return <main id="main">
<section className="detail-hero section">
<div>
<T as="a" k="backServices" className="text-link" href="/#services" />
<T as="p" k="detailEyebrow" className="eyebrow" />
<T as="h1" k="service0" />
<T as="p" k="detailLine0" className="detail-lead" />
<T as="p" k="detailDesc0" />
<div className="hero-ctas">
<T as="a" k="discussService" className="button" href="https://wa.me/971557010000" />
<T as="a" k="checkEligibility" className="text-link" href="/#eligibility" />
</div>
</div>
<div className="detail-art" aria-hidden="true">
<SourceImage src="/assets/skyline.svg" alt="" width="800" height="600" />
<span>{"01"}</span>
</div>
</section>
<section className="detail-content section">
<div>
<T as="h2" k="whoHeading" />
<T as="p" k="who0" />
<T as="p" k="detailDraft" className="notice" />
</div>
<div>
<T as="h2" k="prepare" />
<ul className="detail-checklist">
<T as="li" k="prep0" />
<T as="li" k="prep1" />
<T as="li" k="prep2" />
<T as="li" k="prep3" />
</ul>
<T as="p" k="noDocs" className="fine-print" />
</div>
</section>
<section className="detail-cta section">
<T as="h2" k="ready" />
<T as="a" k="startChat" className="button" href="https://wa.me/971557010000" />
<T as="p" k="approval" className="fine-print" />
</section>
</main>;
}
function Service4() {
  return <main id="main">
<section className="detail-hero section">
<div>
<T as="a" k="backServices" className="text-link" href="/#services" />
<T as="p" k="detailEyebrow" className="eyebrow" />
<T as="h1" k="service1" />
<T as="p" k="detailLine1" className="detail-lead" />
<T as="p" k="detailDesc1" />
<div className="hero-ctas">
<T as="a" k="discussService" className="button" href="https://wa.me/971557010000" />
<T as="a" k="checkEligibility" className="text-link" href="/#eligibility" />
</div>
</div>
<div className="detail-art" aria-hidden="true">
<SourceImage src="/assets/skyline.svg" alt="" width="800" height="600" />
<span>{"02"}</span>
</div>
</section>
<section className="detail-content section">
<div>
<T as="h2" k="whoHeading" />
<T as="p" k="who1" />
<T as="p" k="detailDraft" className="notice" />
</div>
<div>
<T as="h2" k="prepare" />
<ul className="detail-checklist">
<T as="li" k="prep0" />
<T as="li" k="prep1" />
<T as="li" k="prep2" />
<T as="li" k="prep3" />
</ul>
<T as="p" k="noDocs" className="fine-print" />
</div>
</section>
<section className="detail-cta section">
<T as="h2" k="ready" />
<T as="a" k="startChat" className="button" href="https://wa.me/971557010000" />
<T as="p" k="approval" className="fine-print" />
</section>
</main>;
}
const detailPages = {
  "open-bank-account": Service0,
  "personal-loan": Service1,
  "project-financing": Service2,
  "real-estate-financing": Service3,
  "salary-financing": Service4
};
export function ServicePage({
  slug
}) {
  const Page = detailPages[slug];
  return Page ? <Page /> : <Home />;
}
