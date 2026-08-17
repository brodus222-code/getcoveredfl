import React from 'react';
import { ShieldCheck } from 'lucide-react';

// Reassurance card shown under the first wizard step — tells the user their
// info stays in-house and is never sold to lead buyers.
export default function PrivacyAssuranceCard() {
  return (
    <div className="flex items-start gap-3 bg-sand/70 border border-sand-deep/60 rounded-2xl px-4 py-4">
      <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <p className="text-sm text-navy-soft leading-relaxed">
        <strong className="text-navy">We never sell your information.</strong> Every request is
        handled in-house by our own licensed Florida agents — never passed to a call center or
        lead buyer.
      </p>
    </div>
  );
}