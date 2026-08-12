import React, { useRef } from 'react';
import { HelpCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const reasonOptions = [
  { id: 'lost_coverage', title: 'Lost or ending coverage' },
  { id: 'job_change', title: 'Job change' },
  { id: 'moved', title: 'Recently moved' },
  { id: 'family_changes', title: 'Family or household changes' },
  { id: 'none', title: 'None of these' },
];

const ADVANCE_DELAY = 380;

export default function StepReason({ data, onChange, onNext, onBack }) {
  const timerRef = useRef(null);

  const handleSelect = (option) => {
    onChange({ lead_reason: option.id });
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
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          What brought you here today?
        </h2>
      </div>

      <div className="space-y-3 mb-6">
        {reasonOptions.map((option) => {
          const selected = data.lead_reason === option.id;
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
          disabled={!data.lead_reason}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}