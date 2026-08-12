import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export default function WizardTrustBadges() {
  return (
    <div className="flex items-center justify-center gap-6 flex-wrap">
      <div className="flex items-center gap-2 text-navy-soft">
        <Lock className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Secure Encryption</span>
      </div>
      <div className="flex items-center gap-2 text-navy-soft">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">100% Privacy Guaranteed</span>
      </div>
    </div>
  );
}