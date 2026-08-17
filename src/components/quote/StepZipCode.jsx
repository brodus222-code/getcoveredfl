import React from 'react';
import { Input } from '@/components/ui/input';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import FloridaTrustBadges from '@/components/shared/FloridaTrustBadges';
import PrivacyAssuranceCard from '@/components/quote/PrivacyAssuranceCard';

export default function StepZipCode({ data, onChange, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.zip_code && data.zip_code.length === 5) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Intro block */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading text-balance">
          Compare Florida's Top Health Plans
        </h1>
        <div className="inline-flex items-center gap-2 bg-turquoise-soft text-primary-deep text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          Licensed Florida Agents
        </div>
        <p className="text-navy-soft leading-relaxed">
          Enter your ZIP below to see the ACA Marketplace and private plans available in your
          area — free help from a local licensed agent.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-navy mb-1 font-heading">
        Enter your ZIP code
      </h2>
      <p className="text-sm text-navy-soft mb-4">
        We'll check which plans are available in your area.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={5}
          placeholder="Zip Code"
          value={data.zip_code || ''}
          onChange={(e) => onChange({ zip_code: e.target.value.replace(/\D/g, '').slice(0, 5) })}
          className="text-center text-2xl py-6 h-16 font-semibold tracking-widest bg-white border-2 border-sand-deep focus:border-primary focus:ring-primary rounded-2xl"
        />

        <button
          type="submit"
          disabled={!data.zip_code || data.zip_code.length !== 5}
          className="w-full bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-colors"
        >
          Continue
        </button>
      </form>

      <FloridaTrustBadges className="mt-4" />

      <div className="mt-5">
        <PrivacyAssuranceCard />
      </div>

      <a
        href="tel:+18556345343"
        className="mt-5 w-full inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold py-4 rounded-2xl hover:bg-primary-soft transition-colors"
      >
        <Phone className="w-4 h-4" />
        Call Now: (855) 634-5343
      </a>
    </motion.div>
  );
}