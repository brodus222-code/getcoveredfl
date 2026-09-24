import React, { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { DETAIL_FIELDS, displayValue, isReady } from '@/components/online-advisor/fields';
import DetailsEditor from '@/components/online-advisor/DetailsEditor';
import SubmitBox from '@/components/online-advisor/SubmitBox';

export default function QuoteDetailsPanel({ flow }) {
  const [editing, setEditing] = useState(false);
  const required = DETAIL_FIELDS.filter((f) => f.required);
  const done = required.filter((f) => flow.info[f.key]).length;
  const ready = isReady(flow.info);

  return (
    <aside className="bg-card border-t-2 border-accent shadow-soft rounded-b-2xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-navy">Your quote details</h2>
          <p className="text-xs text-navy-soft mt-1">{done} of {required.length} required details captured</p>
        </div>
        <button onClick={() => setEditing(!editing)} className="text-xs font-semibold text-primary underline py-1">{editing ? 'Done' : 'Edit'}</button>
      </div>
      {editing ? <DetailsEditor info={flow.info} onChange={flow.updateInfo} disabled={flow.submitting} /> : (
        <ul className="space-y-2">
          {DETAIL_FIELDS.map((f) => (
            <li key={f.key} className="flex items-start gap-2 text-sm">
              {flow.info[f.key] ? <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" /> : <Circle className="w-4 h-4 text-border mt-0.5 shrink-0" />}
              <span className="text-navy-soft shrink-0">{f.label}:</span>
              <span className="font-medium text-navy break-words min-w-0">{flow.info[f.key] ? displayValue(f.key, flow.info[f.key]) : f.required ? 'Needed' : '—'}</span>
            </li>
          ))}
        </ul>
      )}
      {ready ? <SubmitBox onSubmit={flow.submit} submitting={flow.submitting} error={flow.submitError} /> : (
        <p className="text-xs text-navy-soft bg-sand p-3 rounded-lg">Chat with the guide to fill these in. Once the required details are in, you can send them to a licensed agent.</p>
      )}
    </aside>
  );
}