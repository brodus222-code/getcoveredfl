import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { advisorDate } from '@/components/advisor/questions';

export default function AdvisorAnswer({ step, onAnswer, disabled, error, initialValue = '' }) {
  const [value, setValue] = useState(String(initialValue));
  if (step.options) return <div className="grid sm:grid-cols-2 gap-3">{step.options.map(([id, label]) => <button type="button" key={id} disabled={disabled} onClick={() => onAnswer(id)} className="text-left bg-card border border-border hover:border-accent focus-visible:ring-2 focus-visible:ring-ring rounded-xl px-5 py-4 text-navy font-semibold disabled:opacity-60">{label}<ArrowRight className="inline float-right w-4 h-4 mt-1 text-accent" /></button>)}</div>;
  return <form key={step.key} onSubmit={(event) => { event.preventDefault(); onAnswer(value.trim(), () => setValue('')); }} className="space-y-3">
    <label className="sr-only" htmlFor="advisor-answer">{step.text}</label>
    <div className="flex flex-col sm:flex-row gap-3"><input id="advisor-answer" required value={value} onChange={(e) => setValue(e.target.value)} type={step.type} min={step.type === 'date' ? advisorDate() : step.min} max={step.max} maxLength={step.maxLength} inputMode={step.inputMode} placeholder={step.placeholder} disabled={disabled} className="flex-1 min-w-0 bg-card border border-border rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-ring" /><button type="submit" disabled={disabled} className="bg-accent hover:bg-accent-deep text-accent-foreground rounded-xl px-6 py-3 font-bold disabled:opacity-60">Continue <ArrowRight className="inline w-4 h-4 ml-1" /></button></div>
    {step.skip && <button type="button" disabled={disabled} onClick={() => onAnswer('')} className="text-primary font-semibold text-sm underline underline-offset-4">{step.skip}</button>}
    {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
  </form>;
}