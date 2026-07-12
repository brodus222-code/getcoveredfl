import React, { useRef } from 'react';
import { Heart, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const questions = [
  { key: 'currently_insured', question: 'Are you currently insured?' },
  { key: 'takes_prescriptions', question: 'Do you take any regular prescriptions?' },
  { key: 'prefers_specific_network', question: 'Do you prefer a specific doctor or hospital network?' },
];

const ADVANCE_DELAY = 450;

export default function StepHealth({ data, onChange, onNext, onBack }) {
  const timerRef = useRef(null);

  const allAnswered = questions.every((q) => data[q.key] !== null && data[q.key] !== undefined);

  const handleSelect = (key, value) => {
    const updated = { [key]: value };
    onChange(updated);

    const newData = { ...data, ...updated };
    const fullyAnswered = questions.every((q) => newData[q.key] !== null && newData[q.key] !== undefined);

    if (fullyAnswered) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onNext(), ADVANCE_DELAY);
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
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          A few quick questions
        </h2>
        <p className="text-navy-soft">
          This helps us match you with the right plans.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {questions.map((q) => (
          <div key={q.key} className="space-y-3">
            <p className="font-medium text-navy">{q.question}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ].map((option) => {
                const selected = data[q.key] === option.value;
                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => handleSelect(q.key, option.value)}
                    className={`relative py-4 px-6 rounded-2xl font-medium transition-all duration-200 ${
                      selected
                        ? 'bg-gradient-to-br from-primary to-primary-deep text-white shadow-glow-primary'
                        : 'bg-sand text-navy hover:bg-sand-deep/60 border border-sand-deep/50'
                    }`}
                  >
                    {option.label}
                    {selected && (
                      <span className="absolute top-2 right-2">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
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
          disabled={!allAnswered}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}