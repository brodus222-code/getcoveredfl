import React from 'react';
import { MapPin, SlidersHorizontal, Headset } from 'lucide-react';

const steps = [
  { number: '01', icon: MapPin, title: 'Enter Your ZIP Code', text: 'See coverage options available where you live in Florida.' },
  { number: '02', icon: SlidersHorizontal, title: 'Tell Us What You Need', text: 'Answer a few quick questions about your household and budget.' },
  { number: '03', icon: Headset, title: 'Compare With an Agent', text: 'Review prices, benefits, and networks with a licensed Florida agent.' },
];

export default function AffordableSteps() {
  return (
    <section className="bg-sand py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-deep mb-3">A Clearer Way to Shop</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy text-balance">Affordable coverage in 3 simple steps</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map(({ number, icon: Icon, title, text }) => (
            <article key={number} className="border-t-2 border-accent pt-6">
              <div className="flex items-center justify-between mb-6"><span className="text-sm font-bold tracking-widest text-accent-deep">{number}</span><Icon className="w-7 h-7 text-primary" strokeWidth={1.8} /></div>
              <h3 className="text-xl font-bold font-heading text-navy mb-3">{title}</h3>
              <p className="text-navy-soft leading-7">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}