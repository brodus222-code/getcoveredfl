import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { User, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StepAges({ data, onChange, onNext, onBack }) {
  const householdSize = data.household_size || 1;
  const ages = data.ages || [];

  // Auto-focus first age input on mount
  useEffect(() => {
    const firstInput = document.getElementById('age-input-0');
    if (firstInput) firstInput.focus();
  }, []);

  const handleAgeChange = (index, value) => {
    const newAges = [...ages];
    newAges[index] = value ? parseInt(value) : '';
    onChange({ ages: newAges });
  };

  const allAgesValid = ages.length === householdSize && ages.every((age) => age && age > 0 && age < 120);

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (allAgesValid) {
        onNext();
      } else {
        const nextInput = document.getElementById(`age-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
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
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          What are the ages of the people in your household?
        </h2>
        <p className="text-navy-soft">
          Just the ages — no names needed.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {Array.from({ length: householdSize }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-sm font-medium text-navy-soft w-20">
              Person {index + 1}
            </span>
            <Input
              id={`age-input-${index}`}
              type="number"
              inputMode="numeric"
              min="0"
              max="120"
              placeholder="Age"
              value={ages[index] || ''}
              onChange={(e) => handleAgeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="flex-1 text-center text-lg py-5 h-14 font-medium border-2 border-sand-deep focus:border-primary focus:ring-primary rounded-2xl"
            />
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
          disabled={!allAgesValid}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}