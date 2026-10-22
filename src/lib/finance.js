/** Illustrative reducing-balance amortisation; excludes insurance and all fees. */
export function amortise(principal, annualRate, years) {
  const months = years * 12, rate = annualRate / 1200;
  if (!(principal > 0) || !(years > 0) || annualRate < 0 || ![principal, annualRate, years].every(Number.isFinite)) throw new RangeError('Invalid calculator inputs');
  const payment = rate === 0 ? principal / months : principal * rate / -Math.expm1(-months * Math.log1p(rate));
  const total = payment * months;
  const balances = Array.from({ length: 25 }, (_, i) => {
    const elapsed = Math.round(months * i / 24);
    return rate === 0 ? Math.max(0, principal * (1 - elapsed / months)) : Math.max(0, principal * (1 + rate) ** elapsed - payment * Math.expm1(elapsed * Math.log1p(rate)) / rate);
  });
  return { payment, total, interest: Math.max(0, total - principal), balances };
}

export function validateEnquiry(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'required';
  const digits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) errors.phone = 'required';
  else if (!/^[+\d\s().-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15) errors.phone = 'phoneError';
  if (!values.service) errors.service = 'required';
  if (!values.consent) errors.consent = 'consentError';
  return errors;
}
