import React from 'react';
import { BadgeCheck, Lock, Users } from 'lucide-react';

const proofPoints = [
  {
    icon: BadgeCheck,
    title: 'Florida Licensed',
    detail: 'Agency license L131967 · NPN 21554495',
  },
  {
    icon: Users,
    title: 'Real Agent Guidance',
    detail: 'One licensed agent helps compare your options.',
  },
  {
    icon: Lock,
    title: 'Your Information Stays Private',
    detail: 'We never sell your personal information.',
  },
];

export default function QuoteConfidencePanel() {
  return (
    <aside className="mt-8 bg-sand border-t-2 border-accent p-5" aria-label="Why Florida shoppers trust GetCoveredFL">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-deep mb-4">
        Request with confidence
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {proofPoints.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="flex items-start gap-3 sm:block">
            <Icon className="w-5 h-5 text-primary flex-shrink-0 sm:mb-2" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-navy">{title}</p>
              <p className="text-xs leading-relaxed text-navy-soft mt-1">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}