import moment from 'moment';

// Pure helpers that turn a raw list of Lead records into chart-ready data.

export const COVERAGE_LABELS = {
  aca_marketplace: 'ACA Marketplace',
  cobra_alternatives: 'COBRA Alternative',
  short_term_gap: 'Short-term / Gap',
  first_time_coverage: 'First-time Coverage',
  ppo_broad_network: 'PPO Broad Network',
  most_affordable: 'Most Affordable',
  callback_request: 'Callback Request',
};

export const REASON_LABELS = {
  lost_coverage: 'Lost Coverage',
  job_change: 'Job Change',
  moved: 'Moved',
  family_changes: 'Family Changes',
  none: 'Not Specified',
};

export const TIMING_LABELS = {
  asap: 'ASAP',
  few_weeks: 'In a Few Weeks',
  not_sure: 'Not Sure',
};

export const STATUS_ORDER = ['new', 'contacted', 'quoted', 'enrolled', 'closed'];

export function filterByDays(leads, days) {
  if (!days) return leads;
  const cutoff = moment.utc().subtract(days, 'days');
  return leads.filter((l) => l.created_date && moment.utc(l.created_date).isAfter(cutoff));
}

export function countBy(leads, key, labels) {
  const counts = {};
  leads.forEach((l) => {
    const raw = l[key];
    const k = raw === undefined || raw === null || raw === '' ? 'unknown' : String(raw);
    counts[k] = (counts[k] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([k, count]) => ({ name: labels?.[k] || (k === 'unknown' ? 'Unknown' : k), count }))
    .sort((a, b) => b.count - a.count);
}

export function boolBreakdown(leads, key) {
  let yes = 0, no = 0, unknown = 0;
  leads.forEach((l) => {
    if (l[key] === true) yes += 1;
    else if (l[key] === false) no += 1;
    else unknown += 1;
  });
  return { yes, no, unknown, total: leads.length };
}

export function leadsPerDay(leads, days = 30) {
  const buckets = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = moment.utc().subtract(i, 'days').format('YYYY-MM-DD');
    buckets[d] = 0;
  }
  leads.forEach((l) => {
    if (!l.created_date) return;
    const d = moment.utc(l.created_date).format('YYYY-MM-DD');
    if (d in buckets) buckets[d] += 1;
  });
  return Object.entries(buckets).map(([date, count]) => ({
    date,
    label: moment.utc(date).format('MMM D'),
    count,
  }));
}

export function leadsByHour(leads) {
  const buckets = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    label: moment().hour(h).minute(0).format('h A'),
    count: 0,
  }));
  leads.forEach((l) => {
    if (!l.created_date) return;
    buckets[moment.utc(l.created_date).hour()].count += 1;
  });
  return buckets;
}

export function leadsByWeekday(leads) {
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const buckets = names.map((label) => ({ label, count: 0 }));
  leads.forEach((l) => {
    if (!l.created_date) return;
    buckets[moment.utc(l.created_date).day()].count += 1;
  });
  return buckets;
}

export function statusFunnel(leads) {
  return STATUS_ORDER.map((status) => ({
    status,
    count: leads.filter((l) => l.status === status).length,
  }));
}

export function incomeBuckets(leads) {
  const ranges = [
    { label: '< $20k', min: 0, max: 20000 },
    { label: '$20k–40k', min: 20000, max: 40000 },
    { label: '$40k–60k', min: 40000, max: 60000 },
    { label: '$60k–80k', min: 60000, max: 80000 },
    { label: '$80k–120k', min: 80000, max: 120000 },
    { label: '$120k+', min: 120000, max: Infinity },
  ].map((r) => ({ ...r, count: 0 }));
  leads.forEach((l) => {
    const v = Number(l.estimated_income);
    if (!Number.isFinite(v)) return;
    const r = ranges.find((x) => v >= x.min && v < x.max);
    if (r) r.count += 1;
  });
  return ranges.map(({ label, count }) => ({ label, count }));
}

export function ageBuckets(leads) {
  const ranges = [
    { label: '18–25', min: 18, max: 26 },
    { label: '26–34', min: 26, max: 35 },
    { label: '35–44', min: 35, max: 45 },
    { label: '45–54', min: 45, max: 55 },
    { label: '55–64', min: 55, max: 65 },
    { label: '65+', min: 65, max: Infinity },
  ].map((r) => ({ ...r, count: 0 }));
  leads.forEach((l) => {
    const age = Array.isArray(l.ages) && l.ages.length
      ? Number(l.ages[0])
      : (l.birth_year ? new Date().getFullYear() - Number(l.birth_year) : NaN);
    if (!Number.isFinite(age)) return;
    const r = ranges.find((x) => age >= x.min && age < x.max);
    if (r) r.count += 1;
  });
  return ranges.map(({ label, count }) => ({ label, count }));
}

export function topZips(leads, limit = 10) {
  const counts = {};
  leads.forEach((l) => {
    if (!l.zip_code) return;
    counts[l.zip_code] = (counts[l.zip_code] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([zip, count]) => ({ zip, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function agentBreakdown(leads) {
  const counts = {};
  leads.forEach((l) => {
    const key = (l.assigned_agent_email || '').trim() || 'Unassigned';
    if (!counts[key]) counts[key] = { agent: key, total: 0, enrolled: 0 };
    counts[key].total += 1;
    if (l.status === 'enrolled') counts[key].enrolled += 1;
  });
  return Object.values(counts).sort((a, b) => b.total - a.total);
}

export function summary(leads) {
  const total = leads.length;
  const enrolled = leads.filter((l) => l.status === 'enrolled').length;
  const contacted = leads.filter((l) => l.status !== 'new').length;
  const qualified = leads.filter((l) => l.qualified !== false).length;
  const withEmailSent = leads.filter((l) => l.confirmation_email_sent).length;
  const smsOptIn = leads.filter((l) => l.sms_opt_in).length;
  const assigned = leads.filter((l) => (l.assigned_agent_email || '').trim()).length;
  const incomes = leads.map((l) => Number(l.estimated_income)).filter(Number.isFinite);
  const households = leads.map((l) => Number(l.household_size)).filter(Number.isFinite);
  const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const pct = (n) => (total ? Math.round((n / total) * 100) : 0);

  return {
    total,
    enrolled,
    enrolledRate: pct(enrolled),
    contactRate: pct(contacted),
    qualifiedRate: pct(qualified),
    unqualified: total - qualified,
    emailSentRate: pct(withEmailSent),
    smsOptInRate: pct(smsOptIn),
    assignedRate: pct(assigned),
    avgIncome: Math.round(avg(incomes)),
    avgHousehold: Math.round(avg(households) * 10) / 10,
  };
}