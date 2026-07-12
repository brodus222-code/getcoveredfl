import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { DollarSign, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StepIncome({ data, onChange, onNext, onBack }) {
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    onChange({ estimated_income: value ? parseInt(value) : '' });
  };

  const formatIncome = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && data.estimated_income) {
      e.preventDefault();
      onNext();
    }
  };

  useEffect(() => {
    const input = document.getElementById('income-input');
    if (input) input.focus();
  }, []);

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
          <DollarSign className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          What's your estimated household income?
        </h2>
        <p className="text-navy-soft">
          This helps determine which plans and savings you may qualify for.
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-navy-soft/60 font-medium">
            $
          </span>
          <Input
            id="income-input"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={formatIncome(data.estimated_income)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="text-center text-2xl py-6 h-16 pl-10 font-semibold border-2 border-sand-deep focus:border-primary focus:ring-primary rounded-2xl"
          />
        </div>
        <p className="text-sm text-navy-soft mt-3 text-center">
          Annual household income before taxes
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
          disabled={!data.estimated_income}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}