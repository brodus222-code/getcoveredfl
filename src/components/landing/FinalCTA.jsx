import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

export default function FinalCTA() {
  const navigate = useNavigate();
  const [zip, setZip] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (zip.length === 5) navigate(`/Quote?zip=${zip}`);
  };

  return (
    <section className="relative py-14 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-deep to-navy" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-turquoise/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight font-heading text-balance"
        >
          Ready to see what you qualify for?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto"
        >
          Enter your ZIP code to see plans and prices in minutes. It's free, fast, and there's no obligation.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6"
        >
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            placeholder="Enter your ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
            className="flex-1 px-5 py-5 text-lg font-medium text-navy bg-white rounded-2xl shadow-lg placeholder:text-navy-soft/50 outline-none ring-2 ring-transparent focus:ring-accent"
          />
          <button
            type="submit"
            disabled={zip.length !== 5}
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-5 text-lg rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            Get My Quotes
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.form>

        <a
          href="tel:+18556345343"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
        >
          <Phone className="w-5 h-5" />
          Or Call Now: (855) 634-5343
        </a>
      </div>
    </section>
  );
}