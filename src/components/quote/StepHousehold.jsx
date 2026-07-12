import React, { useRef } from 'react';
import { Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const householdOptions = [1, 2, 3, 4, 5];
const ADVANCE_DELAY = 380;

export default function StepHousehold({ data, onChange, onNext, onBack }) {
  const timerRef = useRef(null);

  const handleSelect = (size) => {
    onChange({ household_size: size });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onNext(), ADVANCE_DELAY);
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
          <Users className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          How many people are in your household?
        </h2>
        <p className="text-navy-soft">
          This helps us check eligibility and available savings.
        </p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-5 gap-3">
          {householdOptions.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSelect(size)}
              className={`relative h-16 rounded-2xl font-bold text-lg transition-all duration-200 ${
                data.household_size === size
                  ? 'bg-gradient-to-br from-primary to-primary-deep text-white shadow-glow-primary scale-105'
                  : 'bg-sand text-navy hover:bg-sand-deep/60 border border-sand-deep/50'
              }`}
            >
              {size}{size === 5 ? '+' : ''}
            </button>
          ))}
        </div>
        <p className="text-sm text-navy-soft mt-4 text-center">
          Tap your household size to continue
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 inline-flex items-center justify-center gap-1 py-5 text-lg font-medium rounded-2xl border-2 border-sand-deep text-navy-soft hover:bg-sand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!data.household_size}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}