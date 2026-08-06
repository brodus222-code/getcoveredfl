import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle, Phone, ArrowRight, Plus, Minus, Stethoscope, Network, HeartPulse } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import ZipHero from '@/components/landing/ZipHero';
import TrustBar from '@/components/shared/TrustBar';
import CarrierLogos from '@/components/landing/CarrierLogos';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

const benefits = [
  'See any doctor or specialist without a referral — in or out of network',
  'Nationwide PPO networks from top Florida carriers',
  'Lower out-of-pocket costs when you stay in-network',
  'Covers doctor visits, specialists, hospital stays & prescriptions',
  'Dental, vision & telehealth add-ons available',
  'Year-round enrollment — no open-enrollment window required',
];

const reasons = [
  {
    icon: Network,
    title: 'Broad national networks',
    body: 'Private PPOs give you access to large national provider networks, so your doctors travel with you across state lines.',
  },
  {
    icon: Stethoscope,
    title: 'No referrals needed',
    body: 'Skip the gatekeeper. See specialists directly, whenever you need care — without waiting on a primary doctor to approve it.',
  },
  {
    icon: HeartPulse,
    title: 'Out-of-network flexibility',
    body: 'PPOs still pay something when you go out of network, unlike HMOs that offer no coverage outside their network.',
  },
];

const faqs = [
  {
    q: 'What is a private PPO plan?',
    a: 'A private PPO (Preferred Provider Organization) is a health plan sold outside the ACA Marketplace that lets you see in-network and out-of-network doctors without a referral. You pay less in-network, but you always have coverage flexibility.',
  },
  {
    q: 'Who is a private PPO best for?',
    a: 'Private PPOs are ideal for people who want freedom to choose their doctors, travel often, or don\'t qualify for ACA subsidies. They\'re popular with self-employed Floridians and those coming off employer or COBRA coverage.',
  },
  {
    q: 'Can I enroll in a private PPO anytime?',
    a: 'Yes. Unlike ACA Marketplace plans, private PPO and short-term medical plans can be purchased year-round — no open enrollment window or qualifying life event required.',
  },
  {
    q: 'Does a private PPO cover pre-existing conditions?',
    a: 'Coverage for pre-existing conditions varies by plan and carrier. Our licensed agents will compare your options side by side so you know exactly what\'s covered before you enroll.',
  },
  {
    q: 'How is a private PPO different from an ACA plan?',
    a: 'ACA plans guarantee essential benefits and pre-existing condition coverage regardless of health. Private PPOs offer broader networks and year-round enrollment but may medically underwrite. We help you weigh both.',
  },
];

export default function PrivatePPO() {
  const [openFaq, setOpenFaq] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      <ZipHero
        badgeText="Florida Private PPO Plans"
        heading={<>Keep <span className="text-accent">your doctors</span>. Keep your freedom.</>}
        subheading="Private PPO plans give Florida residents broad-network coverage with no referrals and year-round enrollment — built for people who want flexibility over restrictions."
        onAgentClick={() => setModalOpen(true)}
      />

      <TrustBar />
      <CarrierLogos />

      {/* Benefits */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Why Private PPO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading text-balance">
            Flexibility built into every plan
          </h2>
          <p className="text-navy-soft mb-10">The coverage advantages that make private PPOs the go-to for Floridians who want options.</p>
          <div className="space-y-3 text-left">
            {benefits.map((b) => (
              <div
                key={b}
                className="flex items-start gap-3 bg-sand border border-sand-deep/40 rounded-2xl px-5 py-4"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-navy font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons grid */}
      <section className="py-12 md:py-20 px-6 bg-sand">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              PPO vs. the rest
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy font-heading text-balance">
              Built for people who hate being told "no"
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="bg-white rounded-2xl border border-sand-deep/40 p-6 shadow-soft"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2 font-heading">{r.title}</h3>
                  <p className="text-sm text-navy-soft leading-relaxed">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-deep py-12 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-turquoise/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-balance">
            Find the right PPO for your doctors
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Enter your ZIP and we'll match you with private PPO plans that include your providers — in one quick call.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={createPageUrl('Quote')}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
            >
              Start With My ZIP Code
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+18556345343"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              (855) 634-5343
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 px-6 bg-sand">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3 text-center w-full">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10 font-heading">
            Private PPO Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-sand-deep/40 overflow-hidden shadow-soft"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 font-semibold text-navy flex items-center justify-between hover:bg-sand/50 transition-colors"
                >
                  {faq.q}
                  <span className="w-7 h-7 rounded-full bg-primary-soft flex items-center justify-center flex-shrink-0 ml-4">
                    {openFaq === i ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-navy-soft text-sm leading-relaxed border-t border-sand-deep/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
      <MobileCallBar />
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}