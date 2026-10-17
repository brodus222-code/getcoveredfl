import React from 'react';
import { Home, Zap, IdCard, Mail } from 'lucide-react';
import { proofDocs } from '@/data/moveGuides';

const icons = { lease: Home, utility: Zap, license: IdCard, mail: Mail };

export default function ProofChecklist() {
  return (
    <>
      <p className="text-navy-soft mb-6">A permanent move to Florida qualifies when you can show you live here now. Any one of these usually works:</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {proofDocs.map((doc) => {
          const Icon = icons[doc.icon];
          return (
            <div key={doc.label} className="flex items-center gap-4 bg-card border-l-2 border-accent p-4">
              <Icon className="w-6 h-6 text-primary shrink-0" />
              <span className="text-navy font-medium">{doc.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}