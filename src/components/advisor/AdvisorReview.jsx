import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdvisorReview({ steps, answers, onEdit, onSubmit, busy, error }) {
  const [consent, setConsent] = useState(false);
  return <div className="space-y-5">
    <div><h2 className="text-2xl font-bold text-navy">Review your call request</h2><p className="text-navy-soft mt-2">Your preferred time is a request, not a confirmed appointment. An agent will follow up to confirm availability.</p></div>
    <dl className="divide-y divide-border">{steps.map((step, index) => <div key={step.key} className="flex items-start justify-between gap-4 py-3 text-sm"><div className="min-w-0"><dt className="text-muted-foreground">{step.text}</dt><dd className="font-semibold mt-1 break-words">{step.options?.find(([id]) => id === answers[step.key])?.[1] || (answers[step.key] === '' ? 'Not provided' : String(answers[step.key] ?? 'Not provided'))}{step.key === 'preferred_call_time' ? ' ET' : ''}</dd></div><button disabled={busy} onClick={() => onEdit(index)} className="text-primary underline shrink-0 p-2" aria-label={`Edit: ${step.text}`}>Edit</button></div>)}</dl>
    <label className="flex gap-3 items-start text-sm leading-relaxed"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} disabled={busy} className="mt-1 w-5 h-5 shrink-0 accent-primary" /><span>I am at least 18 and request that HealthLink Insurance Agency LLC and its licensed agents contact me at the phone number and email provided about my insurance inquiry. Consent is not required to purchase. <Link to="/Privacy" className="underline" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> · <Link to="/Terms" className="underline" target="_blank" rel="noopener noreferrer">Terms</Link>.</span></label>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <button onClick={() => consent && onSubmit()} disabled={!consent || busy} className="w-full bg-accent hover:bg-accent-deep text-accent-foreground font-bold py-4 rounded-xl disabled:cursor-not-allowed">{busy ? 'Sending your request…' : 'Request my agent call'}</button>
  </div>;
}