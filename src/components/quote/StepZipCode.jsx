import React from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-soft text-primary mb-6">
          <MapPin className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          What's your ZIP code?
        </h2>
        <p className="text-navy-soft">
          We'll show plans and prices available in your area.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={5}
          placeholder="Enter ZIP code"
          value={data.zip_code || ''}
          onChange={(e) => onChange({ zip_code: e.target.value.replace(/\D/g, '').slice(0, 5) })}
          className="text-center text-2xl py-6 h-16 font-semibold tracking-widest border-2 border-sand-deep focus:border-primary focus:ring-primary rounded-2xl"
        />

        <button
          type="submit"
          disabled={!data.zip_code || data.zip_code.length !== 5}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-navy-soft mb-2">Prefer to speak with someone?</p>
        <a
          href="tel:+18555925924"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-deep transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call Now: (855) 592-5924
        </a>
      </div>
    </motion.div>
  );
}