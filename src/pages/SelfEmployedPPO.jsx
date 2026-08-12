import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Lock, ShieldCheck, Network, UserCheck, CalendarClock, Plane } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';
import HeroCarrierLogos from '@/components/landing/HeroCarrierLogos';
import HeroTrustBubble from '@/components/landing/HeroTrustBubble';
import { carriers } from '@/components/landing/CarrierLogos';

const benefits = [
  {
    icon: Network,
    title: 'Keep your Doctors',
    body: 'See any doctor in Florida and the country — no gatekeepers, no referrals required.',
  },
  {
    icon: UserCheck,
    title: 'Specialists without a referral',
    body: 'Go straight to the specialist you need. No primary-care gatekeeper standing between you and your care.',
  },
  {
    icon: CalendarClock,
    title: 'Enroll year-round',
    body: 'No waiting for open enrollment. Start coverage when it makes sense for you and your business.',
  },
  {
    icon: Plane,
    title: 'Travels with you',
    body: 'Your coverage is yours — not tied to an employer. Keep it between gigs, clients, and side hustles.',
  },
];

export default function SelfEmployedPPO() {
  const [zipInput, setZipInput] = React.useState('');
  const navigate = useNavigate();

  const handleZipSubmit = (e) => {
    e.preventDefault();
    const zip = zipInput.replace(/\D/g, '').slice(0, 5);
    if (zip.length === 5) {
      navigate(`/Quote?zip=${zip}`);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      {/* Hero */}
      <section className="bg-sand">
        <div className="mx-auto px-5 sm:px-6 pt-10 pb-8 md:pt-16 md:pb-12 max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 tracking-tight font-heading text-[#1A2432] text-balance">
            Premium Health Coverage, <span className="text-accent">No Employer Required.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#1A2432]/60 mb-8 max-w-xl mx-auto leading-relaxed">
            Stop settling for restrictive networks. Discover the freedom of an open-access PPO built specifically for self-employed Floridians.
          </p>

          <form onSubmit={handleZipSubmit} className="max-w-md mx-auto">
            <div className="mb-6 text-center text-sm font-semibold text-[#1A2432]/70">
              Start by entering your ZIP code.
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
                className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-4 rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
              >
                See My Options
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1A2432]/70 pt-1">
                <ShieldCheck className="w-4 h-4 text-accent-deep" />
                <span>Licensed by the Florida Department of Insurance</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1A2432]/70 pt-1">
                <Lock className="w-4 h-4 text-accent-deep" />
                <span>HIPAA Compliant • Secure & Private</span>
              </div>
            </div>
          </form>

          {/* Trust bubble */}
          <div className="mt-6 max-w-md mx-auto">
            <HeroTrustBubble />
          </div>

          {/* Carrier logos */}
          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-[#607D8B] mb-3">
              Compare plans from top carriers
            </p>
            <div className="flex items-center justify-center flex-wrap gap-3">
              {carriers.map((c) => (
                <div
                  key={c.name}
                  className="bg-white rounded-xl border border-sand-deep/60 px-3 py-2 flex items-center justify-center"
                >
                  <img
                    src={c.src}
                    alt={`${c.name} logo`}
                    title={c.name}
                    className={`h-6 w-auto object-contain opacity-80 ${c.offset || ''}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Built for 1099 life
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading text-balance">
            Coverage that travels with you — not tied to an employer
          </h2>
          <p className="text-navy-soft mb-10">The advantages self-employed Floridians get with an open-access PPO instead of settling for a narrow network.</p>
          <div className="grid sm:grid-cols-2 gap-5 text-left">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-sand border border-sand-deep/40 rounded-2xl px-5 py-5"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2 font-heading">{b.title}</h3>
                  <p className="text-sm text-navy-soft leading-relaxed">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <MobileCallBar />
    </div>
  );
}