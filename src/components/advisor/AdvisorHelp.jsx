import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';

export default function AdvisorHelp({ stage, onQuestion }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);
  const sending = useRef(false);
  const ask = async (event) => {
    event.preventDefault();
    if (sending.current || !question.trim() || count >= 5) return;
    sending.current = true; setBusy(true); setError(''); setAnswer('');
    try {
      const result = await base44.functions.invoke('answerAdvisorQuestion', { question: question.trim(), stage });
      if (!result.data?.answer) throw new Error('No answer returned');
      setAnswer(result.data.answer); setCount((n) => n + 1); onQuestion(question.trim());
    } catch (e) {
      setError('AI help is unavailable right now. You can continue your request or call (855) 634-5343.');
    } finally { sending.current = false; setBusy(false); }
  };
  return <details className="border-t border-border pt-5 mt-6">
    <summary className="cursor-pointer text-primary font-semibold py-2">Have an insurance question? Ask the AI guide</summary>
    <p className="text-xs text-muted-foreground mt-2">General information only, not licensed advice. Please don’t share medical records, Social Security numbers, or payment details.</p>
    <form onSubmit={ask} className="mt-3 space-y-3">
      <label htmlFor="advisor-help" className="sr-only">Your insurance question</label>
      <textarea id="advisor-help" value={question} onChange={(e) => setQuestion(e.target.value)} required maxLength={240} rows={2} placeholder="For example: How is a PPO different from an HMO?" className="w-full bg-background border rounded-xl p-3 text-base focus-visible:ring-2 focus-visible:ring-ring" disabled={busy || count >= 5} />
      <button disabled={busy || count >= 5} className="bg-primary text-primary-foreground rounded-lg px-4 py-3 font-semibold disabled:opacity-60">{busy ? 'Thinking…' : 'Ask the guide'}</button>
      {count >= 5 && <p className="text-sm text-muted-foreground">Your licensed agent can answer more questions during your call.</p>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {answer && <p role="status" className="bg-sand border-l-2 border-accent p-4 text-sm leading-relaxed">{answer}</p>}
    </form>
  </details>;
}