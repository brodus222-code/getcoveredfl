import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SubmitBox({ onSubmit, submitting, error }) {
  const [consent, setConsent] = useState(false);
  return (
    <div className="border-t border-border pt-4 space-y-3">
      <label className="flex gap-3 items-start text-xs leading-relaxed text-navy-soft">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} disabled={submitting} className="mt-0.5 w-4 h-4 shrink-0 accent-primary" />
        <span>I am at least 18 and request that HealthLink Insurance Agency LLC and its licensed agents contact me at the phone number and email provided about my insurance inquiry. Consent is not required to purchase. <Link to="/Privacy" target="_blank" className="underline">Privacy</Link> · <Link to="/Terms" target="_blank" className="underline">Terms</Link>.</span>
      </label>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <button onClick={onSubmit} disabled={!consent || submitting} className="w-full bg-accent hover:bg-accent-deep text-accent-foreground font-bold py-3 rounded-xl disabled:cursor-not-allowed">
        {submitting ? 'Sending…' : 'Send to a licensed agent'}
      </button>
    </div>
  );
}