import React, { useRef } from 'react';
import { Shield, RefreshCw, Clock, UserPlus, Building2, DollarSign, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const coverageOptions = [
  { id: 'aca_marketplace', icon: Shield, title: 'ACA Marketplace Plans' },
  { id: 'cobra_alternatives', icon: RefreshCw, title: 'COBRA Alternatives' },
  { id: 'short_term_gap', icon: Clock, title: 'Short-Term or Gap Coverage' },
  { id: 'first_time_coverage', icon: UserPlus, title: 'First-Time Coverage' },
  { id: 'ppo_broad_network', icon: Building2, title: 'PPO & Broad Network Plans' },
  { id: 'most_affordable', icon: DollarSign, title: 'Most Affordable Options' },
];

const ADVANCE_DELAY = 380;

export default function StepCoverage({ data, onChange, onNext, onBack }) {
  const timerRef = useRef(null);

  const handleSelect = (coverageType) => {
    onChange({ coverage_type: coverageType });
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
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          What type of coverage are you looking for?
        </h2>
        <p className="text-navy-soft">
          Select the option that best fits your needs.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {coverageOptions.map((option) => {
          const selected = data.coverage_type === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                selected
                  ? 'border-primary bg-primary-soft shadow-soft'
                  : 'border-sand-deep/60 bg-white hover:border-primary/40 hover:bg-sand/50'
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  selected ? 'bg-primary text-white' : 'bg-primary-soft text-primary'
                }`}
              >
                <option.icon className="w-5 h-5" />
              </div>
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
          disabled={!data.coverage_type}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}