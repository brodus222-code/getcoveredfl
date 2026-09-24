import React from 'react';
import { CheckCircle2, Phone } from 'lucide-react';

export default function AdvisorConfirmation({ answers }) {
  return <div className="text-center py-8 space-y-5" role="status">
    <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
    <h2 className="text-2xl font-bold text-navy">Your call request is received</h2>
    <p className="text-navy-soft">Thanks, {answers.full_name}. A licensed Florida agent will review your needs and follow up to confirm availability.</p>
    <div className="bg-sand border-l-2 border-accent p-5 text-navy"><p className="text-sm font-semibold">Preferred call time</p><p className="font-bold mt-2">{answers.preferred_call_date} at {answers.preferred_call_time} Eastern Time</p><p className="text-sm mt-2">Requested—not a confirmed appointment.</p></div>
    <p className="text-sm text-navy-soft break-words">We’ll use {answers.phone} or {answers.email} to follow up.</p>
    <a href="tel:+18556345343" className="inline-flex items-center gap-2 text-primary font-semibold py-3"><Phone className="w-4 h-4" /> Prefer to call? (855) 634-5343</a>
  </div>;
}