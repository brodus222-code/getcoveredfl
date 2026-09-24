import React from 'react';
import { DETAIL_FIELDS } from '@/components/online-advisor/fields';

export default function DetailsEditor({ info, onChange, disabled }) {
  return (
    <div className="space-y-3">
      {DETAIL_FIELDS.filter((f) => f.editable).map((f) => (
        <div key={f.key}>
          <label htmlFor={`oa-${f.key}`} className="text-xs font-medium text-navy-soft">{f.label}{f.required ? '' : ' (optional)'}</label>
          <input
            id={`oa-${f.key}`}
            value={info[f.key] || ''}
            onChange={(e) => onChange(f.key, e.target.value)}
            disabled={disabled}
            maxLength={120}
            type={f.key === 'email' ? 'email' : f.key === 'phone' ? 'tel' : 'text'}
            inputMode={['zip_code', 'age', 'estimated_income'].includes(f.key) ? 'numeric' : undefined}
            className="mt-1 w-full h-10 rounded-lg border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      ))}
    </div>
  );
}