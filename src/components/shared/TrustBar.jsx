import React from 'react';
import { Star, ShieldCheck, Lock, BadgeCheck } from 'lucide-react';

const defaultItems = [
  { icon: BadgeCheck, label: 'Licensed Florida Agents' },
  { icon: Star, label: '100% Free to Use' },
  { icon: ShieldCheck, label: 'No Obligation' },
  { icon: Lock, label: 'Secure & Private' },
];

export default function TrustBar({ items = defaultItems, dark = false }) {
  return (
    <div className={`w-full ${dark ? 'bg-white/10 backdrop-blur-sm' : 'bg-sand-deep/50'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-3 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-sm font-medium">
        {items.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className={`flex items-center gap-2 ${dark ? 'text-white/90' : 'text-navy-soft'}`}
          >
            <Icon className={`w-4 h-4 ${dark ? 'text-accent' : 'text-primary'}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}