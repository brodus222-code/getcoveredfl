import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { User, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StepAges({ data, onChange, onNext, onBack }) {
  const age = (data.ages && data.ages[0]) || '';

  useEffect(() => {
    const input = document.getElementById('primary-age-input');
    if (input) input.focus();
  }, []);

  const handleAgeChange = (value) => {
    const parsed = value ? parseInt(value) : '';
    onChange({ ages: parsed ? [parsed] : [] });
  };

  const ageValid = age && age > 0 && age < 120;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (ageValid) onNext();
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-soft text-primary mb-6">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          What's your age?
        </h2>
        <p className="text-navy-soft">
          Age of the primary applicant.
        </p>
      </div>

      <div className="mb-6">
        <Input
          id="primary-age-input"
          type="number"
          inputMode="numeric"
          min="0"
          max="120"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => handleAgeChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-center text-2xl py-6 h-16 font-medium border-2 border-sand-deep focus:border-primary focus:ring-primary rounded-xl"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 inline-flex items-center justify-center gap-1 py-5 text-lg font-medium rounded-xl border-2 border-sand-deep text-navy-soft hover:bg-sand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!ageValid}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-xl shadow-glow-primary transition-all hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}