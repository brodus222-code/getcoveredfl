import React from 'react';
import { CheckCircle2, Phone } from 'lucide-react';

export default function OnlineAdvisorConfirmation({ info }) {
  return (
    <div className="bg-card border-t-2 border-accent shadow-soft rounded-b-2xl p-8 text-center space-y-4 max-w-xl mx-auto" role="status">
      <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
      <h2 className="text-2xl font-bold text-navy">Your details are on their way</h2>
      <p className="text-navy-soft">Thanks, {info.full_name}. A licensed Florida agent will review your needs and reach out at {info.phone} or {info.email}.</p>
      <a href="tel:+18556345343" className="inline-flex items-center gap-2 text-primary font-semibold py-3">
        <Phone className="w-4 h-4" /> Prefer to call now? (855) 634-5343
      </a>
    </div>
  );
}