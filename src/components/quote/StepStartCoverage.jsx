import React, { useRef } from 'react';
import { Clock, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const startOptions = [
  { id: 'asap', title: 'As soon as possible' },
  { id: 'few_weeks', title: 'Within the next few weeks' },
  { id: 'not_sure', title: "I'm not sure yet" },
];

const ADVANCE_DELAY = 380;

export default function StepStartCoverage({ data, onChange, onNext, onBack }) {
  const timerRef = useRef(null);

  const handleSelect = (option) => {
    onChange({ start_coverage: option.id });
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-soft text-primary mb-6">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          When are you hoping to start coverage?
        </h2>
      </div>

      <div className="space-y-3 mb-6">
        {startOptions.map((option) => {
          const selected = data.start_coverage === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                selected
                  ? 'border-primary bg-primary-soft shadow-soft'
                  : 'border-sand-deep/60 bg-white hover:border-primary/40 hover:bg-sand/50'
              }`}
            >
              <span className="flex-1 font-medium text-navy">{option.title}</span>
              {selected && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
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
          className="flex-1 inline-flex items-center justify-center gap-1 py-5 text-lg font-medium rounded-2xl border-2 border-sand-deep text-navy-soft hover:bg-sand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!data.start_coverage}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}