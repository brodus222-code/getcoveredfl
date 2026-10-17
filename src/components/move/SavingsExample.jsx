import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SavingsExample({ savings }) {
  const ex = savings.example;
  return (
    <>
      {savings.paragraphs?.map((p) => <p key={p} className="text-navy-soft mb-4">{p}</p>)}
      {ex && (
        <div className="bg-navy text-white p-6 flex flex-col sm:flex-row items-center gap-6 border-t-2 border-accent">
          <div className="text-sm text-white/70 sm:w-40">{ex.profile}</div>
          <div className="text-center">
            <div className="text-white/70 text-sm">{ex.from}</div>
            <div className="text-2xl font-bold line-through decoration-accent">{ex.fromPrice}</div>
          </div>
          <ArrowRight className="w-6 h-6 text-accent" />
          <div className="text-center">
            <div className="text-white/70 text-sm">{ex.to}</div>
            <div className="text-3xl font-bold text-accent">{ex.toPrice}</div>
          </div>
        </div>
      )}
      <p className="text-sm text-muted-foreground mt-3">{savings.note}</p>
    </>
  );
}