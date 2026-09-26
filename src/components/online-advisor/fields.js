export const DETAIL_FIELDS = [
  { key: 'coverage_members', label: 'Who needs coverage', required: true },
  { key: 'household_size', label: 'People covered' },
  { key: 'zip_code', label: 'ZIP code', required: true, editable: true },
  { key: 'age', label: 'Primary age', required: true, editable: true },
  { key: 'coverage_type', label: 'Coverage interest' },
  { key: 'start_coverage', label: 'Start date' },
  { key: 'estimated_income', label: 'Household income', editable: true },
  { key: 'full_name', label: 'Full name', required: true, editable: true },
  { key: 'email', label: 'Email', required: true, editable: true },
  { key: 'phone', label: 'Phone', required: true, editable: true },
];

export const LABELS = {
  just_me: 'Just me', me_spouse: 'Me + spouse', me_kids: 'Me + kids', whole_family: 'Whole family',
  most_affordable: 'Most affordable', aca_marketplace: 'ACA Marketplace', ppo_broad_network: 'Broad-network PPO',
  cobra_alternatives: 'COBRA alternative', short_term_gap: 'Short-term gap', first_time_coverage: 'First-time coverage',
  asap: 'As soon as possible', few_weeks: 'In a few weeks', not_sure: 'Not sure yet',
};

const ENUMS = {
  coverage_members: ['just_me', 'me_spouse', 'me_kids', 'whole_family'],
  coverage_type: ['most_affordable', 'aca_marketplace', 'ppo_broad_network', 'cobra_alternatives', 'short_term_gap', 'first_time_coverage'],
  start_coverage: ['asap', 'few_weeks', 'not_sure'],
};

export const displayValue = (key, value) => (key === 'estimated_income' && value ? `$${Number(value).toLocaleString()}` : LABELS[value] || value);

export function cleanInfo(raw) {
  const out = {};
  DETAIL_FIELDS.forEach(({ key }) => {
    const value = String(raw?.[key] ?? '').trim().slice(0, 120);
    if (value && (!ENUMS[key] || ENUMS[key].includes(value))) out[key] = value;
  });
  return out;
}

export const isReady = (info) => DETAIL_FIELDS.every((f) => !f.required || info[f.key]);

export function validateInfo(info) {
  if (!/^\d{5}$/.test(info.zip_code || '')) return 'Please enter a valid 5-digit ZIP code.';
  const age = Number(info.age);
  if (!Number.isInteger(age) || age < 18 || age > 100) return 'Please enter an age from 18 to 100.';
  if (!String(info.full_name || '').trim()) return 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email || '')) return 'Please enter a valid email address.';
  if (!/^1?\d{10}$/.test(String(info.phone || '').replace(/\D/g, ''))) return 'Please enter a valid US phone number.';
  if (info.estimated_income && !/^\d+$/.test(String(info.estimated_income).replace(/[$,]/g, ''))) return 'Please enter income as a number, or leave it blank.';
  return '';
}

export function buildLead(info, summary, messages) {
  const visitorLines = messages.filter((m) => m.role === 'user').slice(-10).map((m) => `- ${m.content.slice(0, 300)}`);
  const income = String(info.estimated_income || '').replace(/[$,]/g, '');
  const lead = {
    zip_code: info.zip_code, full_name: info.full_name.trim(), email: info.email.trim(), phone: info.phone,
    coverage_members: info.coverage_members, ages: [Number(info.age)],
    household_size: info.coverage_members === 'just_me' ? 1 : Number(info.household_size) || undefined,
    coverage_type: info.coverage_type, start_coverage: info.start_coverage,
    estimated_income: income ? Number(income) : undefined,
    lead_source: 'ai_advisor', status: 'new', sms_opt_in: false,
    notes: ['Source: Online AI advisor chat (/advisor).', summary, visitorLines.length ? `Visitor messages:\n${visitorLines.join('\n')}` : ''].filter(Boolean).join('\n\n'),
  };
  Object.keys(lead).forEach((k) => lead[k] === undefined && delete lead[k]);
  return lead;
}