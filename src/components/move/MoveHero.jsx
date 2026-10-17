import React from 'react';
import { CalendarClock } from 'lucide-react';

export default function MoveHero({ guide }) {
  return (
    <section className="bg-navy text-white border-b-2 border-accent">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-14 md:py-20">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent border border-accent/40 px-3 py-1.5 mb-5">
          <CalendarClock className="w-4 h-4" />
          {guide.badge}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight text-balance">
          {guide.h1} <span className="text-accent">{guide.h1Accent}</span>
        </h1>
        <p className="mt-6 text-lg text-white/80 max-w-2xl border-l-2 border-accent pl-4">{guide.hook}</p>
        <a href="#rate-check" className="inline-block mt-8 bg-accent text-accent-foreground font-semibold px-6 py-3 hover:bg-accent-deep transition-colors">
          {guide.ctaTitle}
        </a>
      </div>
    </section>
  );
}