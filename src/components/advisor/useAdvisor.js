import { useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { advisorQuestions } from '@/components/advisor/questions';
import { buildAdvisorLead, validateAdvisorAnswer } from '@/components/advisor/advisorValidation';

export default function useAdvisor() {
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [questions, setQuestions] = useState([]);
  const sending = useRef(false);
  const steps = advisorQuestions.filter((step) => !step.conditional || answers.coverage_members !== 'just_me');
  const step = steps[index];
  const goTo = (next) => { setError(''); setIndex(next); };
  const answer = (value) => {
    const message = validateAdvisorAnswer(step, value, answers);
    if (message) { setError(message); return; }
    const updates = { [step.key]: value };
    if (step.key === 'coverage_members' && value === 'just_me') updates.household_size = '1';
    setAnswers((previous) => ({ ...previous, ...updates }));
    setError(''); setIndex((previous) => previous + 1);
  };
  const submit = async () => {
    if (sending.current || done) return;
    for (const item of steps) {
      const message = validateAdvisorAnswer(item, answers[item.key] ?? '', answers);
      if (message) { setError(`${item.text} ${message}`); return; }
    }
    sending.current = true; setBusy(true); setError('');
    try {
      await base44.entities.Lead.create(buildAdvisorLead(answers, questions));
      setDone(true);
    } catch (e) {
      setError('Your request could not be sent. Please try again or call (855) 634-5343.');
    } finally { sending.current = false; setBusy(false); }
  };
  const rememberQuestion = (question) => setQuestions((previous) => [...previous, question].slice(-5));
  return { answers, index, steps, step, error, busy, done, answer, goTo, submit, rememberQuestion };
}