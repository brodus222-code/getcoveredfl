export const advisorQuestions = [
  { key: 'coverage_members', text: 'Who are we finding coverage for?', options: [['just_me', 'Just me'], ['me_spouse', 'Me + spouse'], ['me_kids', 'Me + kids'], ['whole_family', 'Whole family']] },
  { key: 'household_size', text: 'How many people need coverage?', type: 'number', placeholder: 'Number of people', min: 1, max: 20, conditional: true },
  { key: 'zip_code', text: 'What Florida ZIP code should we look in?', type: 'text', placeholder: '5-digit ZIP code', inputMode: 'numeric', maxLength: 5 },
  { key: 'coverage_type', text: 'What kind of coverage interests you most?', options: [['most_affordable', 'Most affordable'], ['aca_marketplace', 'ACA Marketplace'], ['ppo_broad_network', 'Broad-network PPO'], ['cobra_alternatives', 'COBRA alternative'], ['first_time_coverage', 'Not sure yet']] },
  { key: 'start_coverage', text: 'When would you like coverage to start?', options: [['asap', 'As soon as possible'], ['few_weeks', 'In a few weeks'], ['not_sure', 'Not sure yet']] },
  { key: 'ages', text: 'How old is the primary person who needs coverage?', type: 'number', placeholder: 'Age', min: 18, max: 100 },
  { key: 'estimated_income', text: 'About how much is your household’s annual income?', type: 'number', placeholder: 'Estimated amount in dollars', min: 0, max: 10000000, skip: 'I’m not sure' },
  { key: 'notes', text: 'Anything else you want a licensed agent to know?', type: 'text', placeholder: 'Optional: plan preferences or questions', maxLength: 500, skip: 'Nothing else' },
  { key: 'preferred_call_date', text: 'What date would you prefer an agent to call?', type: 'date' },
  { key: 'preferred_call_time', text: 'What time would you prefer? All times are Eastern.', type: 'time' },
  { key: 'full_name', text: 'What’s your full name?', type: 'text', placeholder: 'First and last name', maxLength: 100 },
  { key: 'email', text: 'What email can we use to follow up?', type: 'email', placeholder: 'you@example.com', maxLength: 254 },
  { key: 'phone', text: 'What number should the agent call?', type: 'tel', placeholder: '(555) 555-5555', maxLength: 20 },
];

export const advisorDate = () => {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const part = (type) => parts.find((p) => p.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
};

export const advisorTime = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date());