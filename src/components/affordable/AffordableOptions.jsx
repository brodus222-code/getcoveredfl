import React from 'react';
import { CircleDollarSign, Building2, Stethoscope, CalendarCheck } from 'lucide-react';

const options = [
  { icon: CircleDollarSign, title: 'ACA Savings', text: 'Premium tax credits can lower monthly Marketplace costs for eligible households.' },
  { icon: Building2, title: 'Multiple Carriers', text: 'Compare plans from established insurers serving communities across Florida.' },
  { icon: Stethoscope, title: 'Doctors and Prescriptions', text: 'Check provider networks and prescription benefits before selecting coverage.' },
  { icon: CalendarCheck, title: 'Enrollment Guidance', text: 'Understand Open Enrollment and Special Enrollment options with licensed help.' },
];

export default function AffordableOptions() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-deep mb-4">What Makes Coverage Affordable?</p>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-navy leading-tight text-balance mb-5">The right price starts with the right comparison.</h2>
          <p className="text-lg text-navy-soft leading-8">The lowest premium is not always the lowest total cost. We help you weigh monthly price against deductibles, prescriptions, and access to care.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-sand-deep border border-sand-deep">
          {options.map(({ icon: Icon, title, text }) => (
            <article key={title} className="bg-sand p-7 md:p-9">
              <Icon className="w-8 h-8 text-primary mb-7" strokeWidth={1.7} />
              <h3 className="text-xl font-bold font-heading text-navy mb-3">{title}</h3>
              <p className="text-navy-soft leading-7">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}