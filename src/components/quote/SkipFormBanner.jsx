import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import CallbackModal from './CallbackModal';

export default function SkipFormBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto mb-8 rounded-3xl overflow-hidden shadow-soft border border-sand-deep/40 bg-white">
        <div className="bg-gradient-to-br from-primary-soft to-turquoise-soft flex flex-col sm:flex-row items-center gap-6 p-6">
          <div className="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&auto=format"
              alt="Phone calling"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-navy mb-1 font-heading">Don't want to fill this out?</h3>
            <p className="text-lg text-navy-soft mb-2">
              We can <strong className="text-primary">call you</strong> instead.
            </p>
            <p className="text-sm text-navy-soft mb-4">
              A licensed Florida agent can review your info and walk you through your options in minutes.
            </p>

            <a
              href="tel:+18556345343"
              className="md:hidden inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm shadow-glow-accent"
            >
              <Phone className="w-4 h-4" />
              Have an Agent Call Me
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm shadow-glow-accent"
            >
              <Phone className="w-4 h-4" />
              Have an Agent Call Me
            </button>
          </div>
        </div>

        <div className="bg-sand/60 border-t border-sand-deep/40 px-6 py-2 text-center text-xs text-navy-soft/70">
          Licensed Florida agent — no call centers.
        </div>
      </div>

      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}