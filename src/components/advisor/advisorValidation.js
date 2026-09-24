import { advisorDate, advisorTime } from '@/components/advisor/questions';

export function validateAdvisorAnswer(step, value, answers) {
  if (!value && step.skip) return '';
  if (!String(value).trim()) return 'Please enter an answer to continue.';
  if (step.options && !step.options.some(([id]) => id === value)) return 'Please select an option.';
  if (step.key === 'zip_code' && !/^\d{5}$/.test(value)) return 'Please enter a 5-digit ZIP code.';
  if (step.type === 'number' && (!Number.isInteger(Number(value)) || Number(value) < step.min || Number(value) > step.max)) return `Please enter a whole number from ${step.min} to ${step.max}.`;
  if (step.key === 'household_size' && Number(value) < (answers.coverage_members === 'whole_family' ? 3 : 2)) return 'Please include everyone who needs coverage.';
  if (step.key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
  if (step.key === 'phone' && !/^(1)?\d{10}$/.test(value.replace(/\D/g, ''))) return 'Please enter a valid US phone number.';
  if (step.key === 'preferred_call_date' && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < advisorDate())) return 'Please choose today or a future date in Eastern Time.';
  if (step.key === 'preferred_call_time' && (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value) || (answers.preferred_call_date === advisorDate() && value <= advisorTime()))) return 'Please choose a future time in Eastern Time.';
  return '';
}

export function buildAdvisorLead(answers, questions) {
  const lead = { ...answers, ages: [Number(answers.ages)], household_size: Number(answers.household_size), lead_source: 'ai_advisor', status: 'new', sms_opt_in: false };
  if (answers.estimated_income !== '' && answers.estimated_income != null) lead.estimated_income = Number(answers.estimated_income);
  else delete lead.estimated_income;
  lead.notes = [answers.notes, questions.length ? `Visitor questions:\n${questions.join('\n')}` : '', `Preferred call: ${answers.preferred_call_date} at ${answers.preferred_call_time} ET — requested, not confirmed.`].filter(Boolean).join('\n\n');
  return lead;
}