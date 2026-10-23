import React, { useEffect, useMemo, useRef, useState } from 'react';
import { T, useLanguage, serviceSlugs, whatsappMessage } from './UI.jsx';
import { amortise, validateEnquiry } from '../lib/finance.js';
import { useAnimatedNumber } from '../hooks/motion.js';
import { useUpdateFeedback } from '../hooks/interactions.js';

const defaults = { personal: { amount: 150000, years: 4, rate: 5.5 }, mortgage: { amount: 1000000, years: 20, rate: 4.5 } };
export function Calculator() {
  const { tr, number, money } = useLanguage();
  const [mode, setMode] = useState('personal'), [values, setValues] = useState(defaults.personal);
  const result = useMemo(() => amortise(values.amount, values.rate, values.years), [values]);
  const animatedPayment = useAnimatedNumber(result.payment);
  const resultPanel = useRef(null);
  useUpdateFeedback(resultPanel, result.payment);
  const tabs = useRef([]);
  const chartLine = result.balances.map((balance, i) => `${i === 0 ? 'M' : 'L'}${i * 400 / 24},${8 + (1 - balance / values.amount) * 65}`).join(' ');
  const setCalculator = next => { setMode(next); setValues(defaults[next]); };
  const message = `${tr('waIntro')}\n${tr('loanType')}: ${tr(mode === 'personal' ? 'personalTab' : 'mortgageTab')}\n${tr('amountlabel')}: ${money(values.amount)}\n${tr('period')}: ${values.years} ${tr('yearsUnit')}\n${tr('annualRate')}: ${values.rate}%\n${tr('estimateLabel')}: ${money(result.payment)}\n${tr('calcCaveat')}`;
  return <div className="calculator-card">
    <div role="tablist" aria-label={tr('navcalculators')}>
      {['personal', 'mortgage'].map((name, i) => <button key={name} ref={el => tabs.current[i] = el} type="button" id={`tab-${name}`} role="tab" aria-selected={name === mode} aria-controls="calc-panel" tabIndex={name === mode ? 0 : -1} onClick={() => setCalculator(name)} onKeyDown={e => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 1 : 1 - i;
        tabs.current[next]?.focus(); setCalculator(next ? 'mortgage' : 'personal');
      }}>{tr(name === 'personal' ? 'personalTab' : 'mortgageTab')}</button>)}
    </div>
    <div id="calc-panel" role="tabpanel" aria-labelledby={`tab-${mode}`}>
      <div className="calc-fields">
        {[
          ['amount', 10000, mode === 'mortgage' ? 5000000 : 500000, mode === 'mortgage' ? 25000 : 5000],
          ['years', 1, mode === 'mortgage' ? 30 : 7, 1], ['rate', 0, 20, .1],
        ].map(([id, min, max, step]) => {
          if (id === 'amount' && mode === 'mortgage') min = 100000;
          const formatted = id === 'amount' ? `${number(values[id])} ${tr('amountUnit')}` : id === 'years' ? `${number(values[id])} ${tr('yearsUnit')}` : `${number(values[id], 1)}%`;
          return <div className="range-field" key={id}>
            <div><label htmlFor={id}>{tr(`${id}label`)}</label><output htmlFor={id} id={`${id}-value`}>{formatted}</output></div>
            <input id={id} type="range" min={min} max={max} step={step} value={values[id]} style={{ '--range-progress': `${(values[id] - min) / (max - min) * 100}%` }} aria-valuetext={formatted} onChange={e => setValues(v => ({ ...v, [id]: Number(e.target.value) }))} />
            <div className="range-ends"><span>{number(min)}</span><span>{number(max)}</span></div>
          </div>;
        })}
      </div>
      <div className="calc-result" ref={resultPanel}>
        <T as="p" k="monthly" className="eyebrow" />
        <p className="monthly-number"><small>{tr('amountUnit')}</small> <span aria-hidden="true">{number(animatedPayment, 2)}</span><output className="sr-only" id="payment" aria-live="polite">{money(result.payment)}</output></p>
        <svg id="amort-chart" viewBox="0 0 400 85" role="img" aria-label={tr('chartLabel')}><path id="amort-area" d={`${chartLine} L400,85 L0,85Z`} /><path id="amort-line" d={chartLine} /></svg>
        <div className="calc-totals"><span>{tr('totalInterest')}<strong id="total-interest">{money(result.interest)}</strong></span><span>{tr('totalPayment')}<strong id="total-payment">{money(result.total)}</strong></span></div>
        <T as="p" k="calcCaveat" className="fine-print" />
        <a className="button button-full send-result" href={whatsappMessage(message)}>{tr('sendResult')}</a>
      </div>
    </div>
  </div>;
}

const questions = [Array.from({ length: 5 }, (_, i) => `service${i}`), ['employed', 'self', 'otherEmployment'], ['income1', 'income2', 'income3', 'income4'], ['english', 'arabic']];
const summaryLabels = ['fieldService', 'flowQ1', 'flowQ2', 'fieldLanguage'];
export function Eligibility() {
  const { tr, number } = useLanguage();
  const [step, setStep] = useState(0), [answers, setAnswers] = useState(['', '', '', '']);
  const heading = useRef(null), firstRender = useRef(true);
  useEffect(() => { if (firstRender.current) { firstRender.current = false; return; } heading.current?.focus({ preventScroll: true }); }, [step]);
  return <div className="eligibility-card">
    <div className="flow-top"><span id="flow-count">{step < 4 ? tr('stepOf').replace('{n}', number(step + 1)) : tr('flowSummary')}</span><div className="flow-dots" aria-hidden="true">{[0, 1, 2, 3].map(i => <i key={i} className={i <= step ? 'active' : ''} />)}</div></div>
    <div id="flow-body" aria-live="polite" className="flow-panel" key={step}>
      <h3 ref={heading} tabIndex={-1}>{tr(step < 4 ? `flowQ${step}` : 'flowSummary')}</h3>
      {step < 4 ? <fieldset className="flow-options"><legend className="sr-only">{tr(`flowQ${step}`)}</legend>{questions[step].map(key => <label className="flow-option" key={key}><input type="radio" name={`flow-${step}`} value={key} checked={answers[step] === key} onChange={() => setAnswers(old => old.map((value, i) => i === step ? key : value))} /><span>{tr(key)}</span></label>)}</fieldset> : <>
        <dl className="flow-summary">{answers.map((key, i) => <div key={i}><dt>{tr(summaryLabels[i])}</dt><dd>{tr(key)}</dd></div>)}</dl>
        <T as="p" k="flowDisclaimer" className="fine-print" />
        <a className="button button-full" href={whatsappMessage(`${tr('waFlow')}\n${answers.map((key, i) => `${tr(summaryLabels[i])}: ${tr(key)}`).join('\n')}`)}>{tr('flowSend')}</a>
        <button className="text-link" type="button" onClick={() => { setAnswers(['', '', '', '']); setStep(0); }}>{tr('restart')}</button>
      </>}
    </div>
    <div className="flow-actions"><button id="flow-back" className="text-link" type="button" disabled={step === 0} onClick={() => setStep(s => s - 1)}>{tr('back')}</button>{step < 4 && <button id="flow-next" className="button" type="button" disabled={!answers[step]} onClick={() => setStep(s => s + 1)}>{tr('continue')}</button>}</div>
  </div>;
}

const reviewAuthors = [
  { name: 'L Alneyadi', initial: 'L', color: 'purple' },
  { name: 'Ilm X', initial: 'I', color: 'olive' },
  { name: 'Shaima Bloshi', initial: 'S', color: 'green' },
];

export function Reviews() {
  const { tr, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const change = offset => setIndex(i => (i + offset + 3) % 3);
  return <div className="review-carousel" role="region" aria-roledescription="carousel" aria-label={tr('navreviews')} onKeyDown={e => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault(); change((e.key === 'ArrowRight' ? 1 : -1) * (lang === 'ar' ? -1 : 1));
  }}><span className="quote-mark" aria-hidden="true">“</span><div id="review-copy" aria-live="polite">
      <figure className="client-review flow-panel" key={index}>
        <figcaption className="review-author">
          <span className={`review-avatar ${reviewAuthors[index].color}`} aria-hidden="true">{reviewAuthors[index].initial}</span>
          <bdi className="review-author-name">{reviewAuthors[index].name}</bdi>
        </figcaption>
        <span className="review-stars" role="img" aria-label={tr('reviewRating')}><span aria-hidden="true">★★★★★</span></span>
        <blockquote className="review-text"><T as="p" k={`review${index}`} /></blockquote>
      </figure>
      <T as="p" k="reviewNote" className="review-note" />
    </div>
    <div className="carousel-controls"><button id="review-prev" type="button" aria-label={tr('previousReview')} onClick={() => change(-1)}>←</button><span id="review-count">{String(index + 1).padStart(2, '0')} / 03</span><button id="review-next" type="button" aria-label={tr('nextReview')} onClick={() => change(1)}>→</button></div>
  </div>;
}

const emptyForm = { name: '', phone: '', service: '', language: 'English', time: '0', message: '', consent: false };
export function ContactForm() {
  const { tr } = useLanguage();
  const [values, setValues] = useState(emptyForm), [errors, setErrors] = useState({}), [attempted, setAttempted] = useState(false), [success, setSuccess] = useState(false);
  const form = useRef(null), status = useRef(null);
  const update = e => {
    const next = { ...values, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value };
    setValues(next); setSuccess(false); if (attempted) setErrors(validateEnquiry(next));
  };
  const attrs = name => ({ id: `contact-${name}`, name, value: values[name], onChange: update, 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `error-${name}` : undefined });
  const error = name => <span className="field-error" id={`error-${name}`}>{errors[name] ? tr(errors[name]) : ''}</span>;
  const submit = e => {
    e.preventDefault(); setAttempted(true);
    const nextErrors = validateEnquiry(values); setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) { setSuccess(false); form.current.elements.namedItem(first)?.focus(); }
    else { setSuccess(true); requestAnimationFrame(() => status.current?.focus()); }
  };
  return <form ref={form} method="dialog" id="contact-form" className="contact-form" noValidate onSubmit={submit}>
    <T as="h3" k="formTitle" /><T as="p" k="formNote" className="fine-print" />
    <div className="form-grid">
      {['name', 'phone'].map(name => <div className="field" key={name}><label htmlFor={`contact-${name}`}>{tr(`field${name}`)}</label><input {...attrs(name)} type={name === 'phone' ? 'tel' : 'text'} required autoComplete="off" maxLength={name === 'name' ? 100 : 30} />{error(name)}</div>)}
      <div className="field"><label htmlFor="contact-service">{tr('fieldService')}</label><select {...attrs('service')} required><option value="">{tr('choose')}</option>{serviceSlugs.map((slug, i) => <option value={slug} key={slug}>{tr(`service${i}`)}</option>)}</select>{error('service')}</div>
      <div className="field"><label htmlFor="contact-language">{tr('fieldLanguage')}</label><select {...attrs('language')}><option value="English">English</option><option value="Arabic">العربية</option></select></div>
      <div className="field field-full"><label htmlFor="contact-time">{tr('fieldTime')}</label><select {...attrs('time')}>{[0, 1, 2].map(i => <option value={String(i)} key={i}>{tr(`time${i}`)}</option>)}</select></div>
      <div className="field field-full"><label htmlFor="contact-message">{tr('fieldMessage')}</label><textarea {...attrs('message')} rows="3" maxLength="2000" /></div>
    </div>
    <label className="consent"><input type="checkbox" id="contact-consent" name="consent" checked={values.consent} onChange={update} required aria-invalid={Boolean(errors.consent)} aria-describedby="error-consent" />{tr('consent')}</label>{error('consent')}
    <button className="button button-full" type="submit">{tr('submit')}</button>
    <div id="form-status" role="status" tabIndex={-1} ref={status}>{success ? tr('formSuccess') : ''}</div>
  </form>;
}
