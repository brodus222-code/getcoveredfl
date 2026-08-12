import React from 'react';
import { ShieldCheck, Handshake, Award, ThumbsUp } from 'lucide-react';

const badges = [
  {
    icon: ShieldCheck,
    title: 'Trusted & Secure',
    lines: ['Secure encryption', 'HIPAA compliant', 'Your data is safe'],
    ring: 'from-blue-500 to-blue-600',
  },
  {
    icon: Handshake,
    title: 'Certified Partner',
    lines: ['Verified carrier network', 'Nationwide coverage', 'Top insurers included'],
    ring: 'from-green-500 to-green-600',
  },
  {
    icon: Award,
    title: 'Top-Rated Coverage',
    lines: ['A+ rating', 'BBB accredited business', 'Customer recommended'],
    ring: 'from-amber-400 to-yellow-500',
  },
  {
    icon: ThumbsUp,
    title: 'Guaranteed Satisfaction',
    lines: ['Expert support', '24/7 assistance', 'Hassle-free claims'],
    ring: 'from-sky-400 to-blue-500',
  },
];

export default function TrustBadgesGrid() {
  return (
    <section className="py-10 md:py-14 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="flex flex-col items-center text-center rounded-3xl border-2 border-sand-deep/50 bg-gradient-to-b from-white to-sky-50/40 px-5 py-6 shadow-soft"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${b.ring} flex items-center justify-center mb-4 shadow-md`}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>
                <h3 className="text-sm font-bold text-navy uppercase tracking-wide font-heading mb-3">
                  {b.title}
                </h3>
                <ul className="space-y-1">
                  {b.lines.map((l) => (
                    <li key={l} className="text-xs text-navy-soft font-medium leading-relaxed">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}