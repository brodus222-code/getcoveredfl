import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { trackUetEvent } from '@/lib/uetTrack';

export default function AffordableZipForm({ compact = false }) {
  const [zip, setZip] = useState('');
  const started = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 5);
    setZip(value);
    if (!started.current && value) {
      started.current = true;
      base44.analytics.track({ eventName: 'landing_zip_enter', properties: { source_page: location.pathname } });
      trackUetEvent('landing_zip_enter', { event_label: location.pathname });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (zip.length !== 5) return;
    base44.analytics.track({ eventName: 'landing_quote_start', properties: { source_page: location.pathname, zip_code: zip } });
    trackUetEvent('landing_quote_start', { event_label: location.pathname });
    navigate(`/Quote?zip=${zip}&source=affordable`);
  };

  return (
    <form onSubmit={handleSubmit} className={compact ? 'max-w-xl mx-auto' : 'max-w-md'}>
      <label htmlFor={compact ? 'affordable-zip-bottom' : 'affordable-zip'} className="block text-sm font-semibold text-white/80 mb-3">Enter your ZIP code below to compare plans.</label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input id={compact ? 'affordable-zip-bottom' : 'affordable-zip'} type="tel" inputMode="numeric" value={zip} onChange={handleChange} placeholder="ZIP Code" className="min-h-14 flex-1 rounded-xl border border-white/20 bg-white px-5 text-lg font-semibold text-navy placeholder:text-navy-soft/60 focus:outline-none focus:ring-2 focus:ring-accent" />
        <button type="submit" disabled={zip.length !== 5} className="min-h-14 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 font-bold text-white shadow-glow-accent transition-colors duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed">
          Start My Quote <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-white/65"><LockKeyhole className="w-3.5 h-3.5" /> Free, secure, and no obligation. We never sell your information.</p>
    </form>
  );
}