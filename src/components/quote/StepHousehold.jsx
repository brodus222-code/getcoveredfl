import React, { useRef } from 'react';
import { User, Heart, Baby, Users, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const householdOptions = [
  { id: 'just_me', icon: User, title: 'Just Me', size: 1 },
  { id: 'me_spouse', icon: Heart, title: 'Me + Spouse', size: 2 },
  { id: 'me_kids', icon: Baby, title: 'Me + Kids', size: 3 },
  { id: 'whole_family', icon: Users, title: 'Whole Family', size: 4 },
];

const ADVANCE_DELAY = 380;

export default function StepHousehold({ data, onChange, onNext, onBack }) {
  const timerRef = useRef(null);

  const handleSelect = (option) => {
    onChange({ household_size: option.size });
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
          <Users className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          Who needs coverage?
        </h2>
        <p className="text-navy-soft">
          Select the option that best describes your household.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {householdOptions.map((option) => {
          const selected = data.household_size === option.size;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 ${
                selected
                  ? 'border-primary bg-primary-soft shadow-soft scale-[1.02]'
                  : 'border-sand-deep/60 bg-white hover:border-primary/40 hover:bg-sand/50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selected ? 'bg-primary text-white' : 'bg-primary-soft text-primary'
                }`}
              >
                <option.icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-navy">{option.title}</span>
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
          className="flex-1 inline-flex items-center justify-center gap-1 py-5 text-lg font-medium rounded-2xl border-2 border-sand-deep text-navy-soft hover:bg-sand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!data.household_size}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}