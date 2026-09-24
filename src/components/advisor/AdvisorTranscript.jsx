import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export default function AdvisorTranscript({ steps, answers, replies, questions, activeIndex, busy }) {
  const endRef = useRef(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), [activeIndex, replies, questions, busy]);
  return (
    <div className="space-y-5" aria-live="polite">
      <div className="flex gap-3 items-start"><div className="shrink-0 bg-primary-soft p-2 rounded-full text-primary"><Sparkles className="w-4 h-4" /></div><p className="bg-sand border-l-2 border-accent rounded-r-2xl rounded-bl-2xl px-4 py-3 text-navy max-w-xl">Hi, I’m your virtual coverage guide. I’ll learn a little about your needs, then help you request a call with a licensed Florida agent. You can ask me questions along the way.</p></div>
      {steps.slice(0, activeIndex).map((step, index) => <React.Fragment key={step.key}>
        <div className="flex gap-3 items-start"><div className="shrink-0 bg-primary-soft p-2 rounded-full text-primary"><Sparkles className="w-4 h-4" /></div><p className="bg-sand border-l-2 border-accent rounded-r-2xl rounded-bl-2xl px-4 py-3 text-navy max-w-xl">{step.text}</p></div>
        <div className="flex justify-end"><p className="bg-navy text-white rounded-l-2xl rounded-tr-2xl px-4 py-3 max-w-lg break-words">{step.options?.find(([value]) => value === answers[step.key])?.[1] || (step.key === 'ages' ? `${answers.ages} years old` : step.key === 'preferred_call_time' ? `${answers.preferred_call_time} ET` : answers[step.key] ?? 'Not sure')}</p></div>
        {replies[step.key] && <p className="ml-11 text-sm text-navy-soft max-w-xl">{replies[step.key]}</p>}
      </React.Fragment>)}
      {questions.map((item, index) => <div key={index} className="space-y-2"><div className="flex justify-end"><p className="bg-navy text-white rounded-l-2xl rounded-tr-2xl px-4 py-3 max-w-lg break-words">{item.question}</p></div><p className="ml-11 bg-sand border-l-2 border-accent px-4 py-3 rounded-r-2xl text-navy max-w-xl">{item.answer}</p></div>)}
      {busy && <p className="ml-11 text-sm text-navy-soft" role="status">Your advisor is thinking…</p>}
      <div ref={endRef} />
    </div>
  );
}