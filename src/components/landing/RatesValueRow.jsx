import React from 'react';
import { Clock, BadgeDollarSign, UserCheck, ShieldCheck } from 'lucide-react';

const items = [
  { icon: Clock, title: '2 minutes', desc: 'Six quick questions — no long application.' },
  { icon: BadgeDollarSign, title: '$0 to use', desc: 'Our help is completely free. No fees, ever.' },
  { icon: UserCheck, title: 'Licensed agent', desc: 'A real Florida agent, not a call center.' },
  { icon: ShieldCheck, title: 'Private', desc: 'We never sell your information.' },
];

export default function RatesValueRow() {
  return (
    <section className="py-12 md:py-16 bg-white border-y border-sand-deep">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center border-t-2 border-accent pt-5">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-navy text-white mb-3">
              <Icon className="w-6 h-6" />
            </div>
            <p className="font-semibold text-navy font-heading">{title}</p>
            <p className="text-sm text-navy-soft mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}