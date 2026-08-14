import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Phone, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { trackUetEvent } from '@/lib/uetTrack';

export default function ZipHero({ badgeText, heading, subheading, onAgentClick, heroImage, belowButton, belowImage, leftAlignForm, zipPlaceholder = 'Enter Your ZIP Code...', buttonText = 'Start My Quote', helperText, source }) {
  const [zipInput, setZipInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const zipStartedRef = useRef(false);

  const handleZipChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipInput(val);
    if (!zipStartedRef.current && val.length > 0) {
      zipStartedRef.current = true;
      base44.analytics.track({
        eventName: 'landing_zip_enter',
        properties: { source_page: location.pathname },
      });
      trackUetEvent('landing_zip_enter', { event_label: location.pathname });
    }
  };

  const handleZipSubmit = (e) => {
    e.preventDefault();
    const zip = zipInput.replace(/\D/g, '').slice(0, 5);
    if (zip.length === 5) {
      base44.analytics.track({
        eventName: 'landing_quote_start',
        properties: { source_page: location.pathname, zip_code: zip },
      });
      trackUetEvent('landing_quote_start', { event_label: location.pathname });
      navigate(`/Quote?zip=${zip}${source ? `&source=${source}` : ''}`);
    }
  };

  const CallButton = ({ className = '' }) => (
    onAgentClick ? (
      <button
        onClick={onAgentClick}
        className={`inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-5 py-2.5 rounded-xl transition-all ${className}`}
      >
        <Phone className="w-4 h-4" />
        Call Now
      </button>
    ) : (
      <a
        href="tel:+18556345343"
        className={`inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-5 py-2.5 rounded-xl transition-all ${className}`}
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
    )
  );

  return (
    <section className="bg-sand">
      {/* Hero content */}
      <div className={`mx-auto px-5 sm:px-6 pt-10 pb-8 md:pt-16 md:pb-12 text-center ${heroImage ? 'max-w-6xl lg:text-left' : 'max-w-3xl'}`}>
        <div className={heroImage ? 'lg:flex lg:items-center lg:gap-12' : ''}>
        <div className={heroImage ? 'lg:flex-1' : ''}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FDF1D3] rounded-full px-4 py-2 mb-6">
          <Calendar className="w-4 h-4 text-accent-deep" />
          <span className="text-sm font-semibold text-[#1A2432]">{badgeText}</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 tracking-tight font-heading text-[#1A2432] text-balance">
          {heading}
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-[#1A2432]/60 mb-8 max-w-xl mx-auto leading-relaxed">
          {subheading}
        </p>

        {/* Form */}
        <form onSubmit={handleZipSubmit} className={`max-w-md mx-auto ${leftAlignForm ? 'lg:mx-0' : ''}`}>
          {/* Progress line */}
          <div className="flex h-1.5 rounded-full overflow-hidden mb-6 bg-gray-200">
            <div className="w-1/2 bg-accent" />
          </div>

          {helperText && (
            <p className="text-sm text-[#1A2432]/60 mb-4 leading-relaxed">{helperText}</p>
          )}
          <div className="space-y-3">
            <input
              type="tel"
              inputMode="numeric"
              value={zipInput}
              onChange={handleZipChange}
              placeholder={zipPlaceholder}
              className="w-full px-5 py-4 text-lg rounded-2xl bg-white border border-gray-300 text-[#1A2432] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent font-medium"
              aria-label="ZIP code"
            />
            <button
              type="submit"
              disabled={zipInput.length !== 5}
              className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-4 rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
            >
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
        {belowButton}
        </div>
        {heroImage && (
          <div className="hidden lg:block lg:flex-1">
            <img
              src={heroImage}
              alt="Florida health insurance"
              className="w-full h-[420px] object-cover rounded-3xl shadow-soft"
            />
            {belowImage}
          </div>
        )}
        </div>
      </div>

    </section>
  );
}