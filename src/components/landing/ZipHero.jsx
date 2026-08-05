import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Phone, ArrowRight, Headphones } from 'lucide-react';

export default function ZipHero({ badgeText, heading, subheading, onAgentClick }) {
  const [zipInput, setZipInput] = useState('');
  const navigate = useNavigate();

  const handleZipSubmit = (e) => {
    e.preventDefault();
    const zip = zipInput.replace(/\D/g, '').slice(0, 5);
    if (zip.length === 5) {
      navigate(`/Quote?zip=${zip}`);
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
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-8 md:pt-16 md:pb-12 text-center">
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
        <form onSubmit={handleZipSubmit} className="max-w-md mx-auto">
          {/* Progress line */}
          <div className="flex h-1.5 rounded-full overflow-hidden mb-6 bg-gray-200">
            <div className="w-1/2 bg-accent" />
          </div>

          <div className="space-y-3">
            <input
              type="tel"
              inputMode="numeric"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="Enter Your ZIP Code..."
              className="w-full px-5 py-4 text-lg rounded-2xl bg-white border border-gray-300 text-[#1A2432] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent font-medium"
              aria-label="ZIP code"
            />
            <button
              type="submit"
              disabled={zipInput.length !== 5}
              className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-4 rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              See My Options
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Bottom utility bar */}
      <div className="bg-[#1A2432] text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1A2432]" />
            </div>
            <div className="text-left">
              <div className="text-xs text-white/70">Licensed Advisor Available</div>
              <div className="text-sm font-bold font-heading">(855) 634-5343</div>
            </div>
          </div>

          <CallButton className="animate-call-pulse" />
        </div>
      </div>
    </section>
  );
}