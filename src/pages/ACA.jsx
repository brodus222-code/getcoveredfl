import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Shield, CheckCircle, Phone, Star, ArrowRight } from 'lucide-react';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

const benefits = [
  "$0 monthly premium plans available in Florida",
  "Covers doctor visits, hospital stays & prescriptions",
  "Dental & vision add-ons available",
  "No penalty for switching plans",
  "Enrollment open year-round for qualifying events",
];

const faqs = [
  {
    q: "Who qualifies for a $0 ACA plan?",
    a: "Many Florida residents earning between 100%–400% of the federal poverty level qualify for subsidies that can bring their monthly premium to $0.",
  },
  {
    q: "Is this a government website?",
    a: "No. We are an independent, licensed Florida insurance agency — not affiliated with any government program.",
  },
  {
    q: "How fast can I get covered?",
    a: "Coverage can start as soon as the first of next month in most cases. Our agents can walk you through enrollment in one short call.",
  },
  {
    q: "What if I missed open enrollment?",
    a: "Life events like job loss, moving, or having a baby trigger a Special Enrollment Period. Call us to check if you qualify.",
  },
];

export default function ACA() {
  const [openFaq, setOpenFaq] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sky-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-teal-600" />
            <span className="text-lg font-bold text-blue-900">GetCoveredFL</span>
          </Link>
          <a
            href="tel:+18555925924"
            className="hidden sm:flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition-colors"
          >
            <Phone className="w-4 h-4" />
            (855) 592-5924
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-sky-100 py-6 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white flex flex-col md:flex-row items-center">
          {/* Image */}
          <div className="md:w-2/5 w-full flex-shrink-0">
            <img
              src="https://media.base44.com/images/public/696f51421917c989be527824/f29d4326f_Floridaeligibility2.png"
              alt="Florida ACA eligibility"
              className="w-full h-full object-cover object-top"
              style={{ maxHeight: '340px' }}
            />
          </div>

          {/* Text */}
          <div className="flex-1 px-8 py-10 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-2">ACA Marketplace Plans · Florida</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 leading-snug mb-3">
              You may qualify for{' '}
              <span className="text-green-500">$0/month</span>{' '}
              health coverage
            </h1>
            <hr className="w-full border-gray-200 my-4" />
            <p className="text-gray-600 text-base mb-6 leading-relaxed max-w-md">
              Most Florida residents don't realize their savings change when income or household info changes —{' '}
              <strong className="text-gray-800">even slightly.</strong> Let us check in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link to={createPageUrl('Quote')}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center">
                  Check My Eligibility
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              {/* Desktop callback */}
              <button
                onClick={() => setModalOpen(true)}
                className="hidden md:flex items-center gap-2 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold text-base px-6 py-4 rounded-xl transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                Call Me Instead
              </button>
              {/* Mobile click to call */}
              <a
                href="tel:+18555925924"
                className="md:hidden flex items-center gap-2 justify-center border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold text-base px-6 py-4 rounded-xl transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                Call Me Instead
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Independent licensed Florida agency — not a government site.
            </p>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-blue-700 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-white text-sm font-medium">
          {["Licensed Florida Agents", "100% Free to Use", "No Obligation", "Instant Eligibility Check"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">What's included in ACA Marketplace plans?</h2>
          <p className="text-gray-500 mb-10">All ACA plans must cover these essential benefits by law.</p>
          <div className="space-y-4 text-left">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 bg-sky-50 border border-sky-100 rounded-xl px-5 py-4">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA mid-page */}
      <section className="bg-gradient-to-br from-blue-600 to-teal-600 py-14 px-4 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to see what you qualify for?</h2>
        <p className="text-blue-100 mb-8 max-w-lg mx-auto">
          It takes less than 2 minutes. A licensed agent will review your results and help you enroll.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl('Quote')}>
            <button className="bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-xl shadow-md hover:bg-sky-50 transition-colors duration-200">
              Start With My ZIP Code
            </button>
          </Link>
          <a href="tel:+18555925924">
            <button className="border-2 border-white text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition-colors duration-200 flex items-center gap-2 justify-center">
              <Phone className="w-5 h-5" />
              (855) 592-5924
            </button>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 font-semibold text-gray-900 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <span className="text-blue-600 text-xl font-bold ml-4">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 bg-sky-50 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-xs">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-teal-400" />
          <span className="text-white font-semibold">GetCoveredFL</span>
        </div>
        <p className="max-w-xl mx-auto mb-2">
          HealthLink Insurance Agency LLC is an independent licensed insurance agency in Florida. We are not affiliated with or endorsed by the federal or state government, Healthcare.gov, or any government program.
        </p>
        <p>© {new Date().getFullYear()} HealthLink Insurance Agency LLC. All rights reserved.</p>
      </footer>

      <MobileCallBar />
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}