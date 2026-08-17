import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import CallbackModal from './CallbackModal';

export default function SkipFormBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-3xl bg-turquoise-soft/50 border border-turquoise-soft px-6 py-7 text-center">
        <h3 className="text-xl font-bold text-navy mb-1 font-heading">
          Don't want to fill this out?
        </h3>
        <p className="text-lg text-navy-soft mb-2">
          We can <strong className="text-primary">call you</strong> instead.
        </p>
        <p className="text-sm text-navy-soft mb-5 leading-relaxed">
          A licensed agent can review your info and walk you through your options in minutes.
        </p>

        <a
          href="tel:+18556345343"
          className="md:hidden inline-flex items-center gap-2 bg-primary-deep hover:bg-primary text-white font-semibold px-6 py-3.5 rounded-2xl transition-colors text-sm"
        >
          <Phone className="w-4 h-4" />
          Have an Agent Call Me
        </a>
        <button
          onClick={() => setModalOpen(true)}
          className="hidden md:inline-flex items-center gap-2 bg-primary-deep hover:bg-primary text-white font-semibold px-6 py-3.5 rounded-2xl transition-colors text-sm"
        >
          <Phone className="w-4 h-4" />
          Have an Agent Call Me
        </button>
      </div>

      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}