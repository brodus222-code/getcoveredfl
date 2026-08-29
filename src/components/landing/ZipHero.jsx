import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Phone, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { trackUetEvent } from '@/lib/uetTrack';
import FloridaTrustBadges from '@/components/shared/FloridaTrustBadges';

export default function ZipHero({ badgeText, heading, subheading, onAgentClick, heroImage, belowButton, belowImage, leftAlignForm, zipPlaceholder = 'Enter Your ZIP Code...', buttonText = 'Start My Quote', helperText, source, showCallCta }) {
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
    <section className="bg-navy text-white">
      {/* Hero content */}
      <div className={`mx-auto px-5 sm:px-6 pt-12 pb-10 md:pt-16 md:pb-14 text-center ${heroImage ? 'max-w-6xl lg:text-left' : 'max-w-3xl'}`}>
        <div className={heroImage ? 'lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-14' : ''}>
        <div className={heroImage ? 'lg:flex-1' : ''}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border-l-2 border-accent pl-3 mb-6">
          <Calendar className="w-4 h-4 text-accent" />
          <span className="text-sm font-bold uppercase tracking-wider text-accent">{badgeText}</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5 tracking-tight font-heading text-white text-balance">
          {heading}
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
          {subheading}
        </p>

        {/* Form */}
        <form onSubmit={handleZipSubmit} className={`max-w-md mx-auto ${leftAlignForm ? 'lg:mx-0' : ''}`}>
          {/* Progress line */}
          <div className="flex h-1 overflow-hidden mb-6 bg-white/15">
            <div className="w-1/2 bg-accent" />
          </div>

          {helperText && (
            <p className="text-sm text-white/70 mb-4 leading-relaxed">{helperText}</p>
          )}
          <div className="space-y-3">
            <input
              type="tel"
              inputMode="numeric"
              value={zipInput}
              onChange={handleZipChange}
              placeholder={zipPlaceholder}
              className="w-full px-5 py-4 text-lg rounded-xl bg-white border border-white/20 text-navy placeholder:text-navy-soft/60 focus:outline-none focus:ring-2 focus:ring-accent font-medium"
              aria-label="ZIP code"
            />
            <div className={showCallCta ? 'flex flex-col sm:flex-row gap-3' : ''}>
              <button
                type="submit"
                disabled={zipInput.length !== 5}
                className={`inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-4 rounded-xl shadow-glow-accent transition-all hover:-translate-y-0.5 ${showCallCta ? 'flex-1' : 'w-full'}`}
              >
                {buttonText}
                <ArrowRight className="w-5 h-5" />
              </button>
              {showCallCta && (
                onAgentClick ? (
                  <button
                    type="button"
                    onClick={onAgentClick}
                    className="hidden sm:inline-flex flex-1 items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white font-bold px-6 py-4 rounded-2xl transition-all hover:-translate-y-0.5"
                  >
                    <Phone className="w-5 h-5" />
                    Have an Agent Call Me
                  </button>
                ) : null
              )}
              {showCallCta && (
                <a
                  href="tel:+18556345343"
                  className="sm:hidden inline-flex flex-1 items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white font-bold px-6 py-4 rounded-2xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call (855) 634-5343
                </a>
              )}
            </div>
          </div>
          <FloridaTrustBadges className="mt-5" />
        </form>
        </div>
        {heroImage && (
          <div className="hidden lg:block lg:flex-1 lg:pt-12">
            <img
              src={heroImage}
              alt="Florida health insurance"
              className="w-full h-[500px] object-cover object-center"
            />
            {belowImage}
          </div>
        )}
        </div>
        {belowButton}
      </div>

    </section>
  );
}