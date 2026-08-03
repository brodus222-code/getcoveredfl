import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Phone, ArrowRight } from 'lucide-react';

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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-deep to-navy text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-turquoise/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
      </div>

      {/* Mobile layout — compact, centered */}
      <div className="relative max-w-3xl mx-auto px-6 pt-8 pb-8 md:hidden text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-white/90">{badgeText}</span>
        </div>

        <h1 className="text-4xl font-bold leading-[1.05] mb-5 tracking-tight font-heading text-balance">
          {heading}
        </h1>

        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>

        <form onSubmit={handleZipSubmit} className="max-w-md mx-auto mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="tel"
                inputMode="numeric"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="Zip Code"
                className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl bg-white text-navy placeholder:text-navy-soft/50 focus:outline-none focus:ring-2 focus:ring-accent font-medium"
                aria-label="ZIP code"
              />
            </div>
            <button
              type="submit"
              disabled={zipInput.length !== 5}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-4 rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 whitespace-nowrap"
            >
              Get Quotes
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="flex gap-3 justify-center mt-4">
          <a
            href="tel:+18556345343"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium animate-call-pulse"
          >
            <Phone className="w-5 h-5" />
            Call Me Instead
          </a>
        </div>
      </div>

      {/* Desktop layout — two-column */}
      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14 md:pt-20 md:pb-16 hidden md:block">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — copy + agent CTA */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white/90">{badgeText}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] mb-5 tracking-tight font-heading text-balance">
              {heading}
            </h1>

            <p className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
              {subheading}
            </p>

            <div className="flex gap-3">
              {onAgentClick ? (
                <button
                  onClick={onAgentClick}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all animate-call-pulse"
                >
                  <Phone className="w-5 h-5" />
                  Call for instant quotes — (855) 634-5343
                </button>
              ) : (
                <a
                  href="tel:+18556345343"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all animate-call-pulse"
                >
                  <Phone className="w-5 h-5" />
                  Call for instant quotes — (855) 634-5343
                </a>
              )}
            </div>
          </div>

          {/* Right — ZIP form card */}
          <div className="md:justify-self-end w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
              <h3 className="text-xl font-bold mb-2 font-heading">Get Your Free Quotes</h3>
              <p className="text-white/70 text-sm mb-6">Enter your ZIP code to see plans in your area.</p>
              <form onSubmit={handleZipSubmit} className="space-y-3">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    placeholder="Zip Code"
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl bg-white text-navy placeholder:text-navy-soft/50 focus:outline-none focus:ring-2 focus:ring-accent font-medium"
                    aria-label="ZIP code"
                  />
                </div>
                <button
                  type="submit"
                  disabled={zipInput.length !== 5}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-4 rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  Get Quotes
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}