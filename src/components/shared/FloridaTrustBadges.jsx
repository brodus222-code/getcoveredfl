import React from 'react';
import { Award, MapPin, BadgeCheck } from 'lucide-react';

const BADGES = [
  { icon: Award, label: 'FL Licensed' },
  { icon: MapPin, label: 'Florida Agents' },
  { icon: BadgeCheck, label: '100% Free' },
];

// Trust badges shown at the two highest-impact conversion points: directly
// under the landing ZIP CTA and under the wizard form. Single row on all sizes.
export default function FloridaTrustBadges({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 sm:gap-2 flex-nowrap ${className}`}>
      {BADGES.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1 sm:gap-1.5 bg-accent-soft border-l-2 border-accent text-accent-deep px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-sm font-semibold whitespace-nowrap"
        >
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          {label}
        </span>
      ))}
    </div>
  );
}