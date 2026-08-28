import React, { useRef } from 'react';
import { DollarSign, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const incomeOptions = [
  { id: 'under_30k', label: 'Under $30K', value: 20000 },
  { id: '30k_60k', label: '$30K – $60K', value: 45000 },
  { id: '60k_100k', label: '$60K – $100K', value: 80000 },
  { id: 'over_100k', label: 'Over $100K', value: 125000 },
];

const ADVANCE_DELAY = 380;

export default function StepIncome({ data, onChange, onNext, onBack }) {
  const timerRef = useRef(null);

  const handleSelect = (option) => {
    onChange({ estimated_income: option.value });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onNext(), ADVANCE_DELAY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-soft text-primary mb-6">
          <DollarSign className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          Estimated household income
        </h2>
        <p className="text-navy-soft max-w-sm mx-auto">
          This checks whether you qualify for ACA subsidies that can lower your monthly premium.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {incomeOptions.map((option) => {
          const selected = data.estimated_income === option.value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className={`relative flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all duration-200 ${
                selected
                  ? 'border-primary bg-primary-soft shadow-soft scale-[1.02]'
                  : 'border-sand-deep/60 bg-white hover:border-primary/40 hover:bg-sand/50'
              }`}
            >
              <span className="text-lg font-bold text-navy">{option.label}</span>
              {selected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          );
        })}
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
          disabled={!data.estimated_income}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-xl shadow-glow-primary transition-all hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}