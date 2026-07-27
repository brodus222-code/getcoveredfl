import React, { useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { DollarSign, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MIN_INCOME = 0;
const MAX_INCOME = 250000;
const STEP_INCOME = 1000;
const DEFAULT_INCOME = 60000;

export default function StepIncome({ data, onChange, onNext, onBack }) {
  // Populate the slider at 60,000 when this step loads without a value
  useEffect(() => {
    if (!data.estimated_income) {
      onChange({ estimated_income: DEFAULT_INCOME });
    }
  }, []);

  const formatIncome = (value) => {
    if (!value && value !== 0) return '';
    return Number(value).toLocaleString();
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
          <DollarSign className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          What's your estimated household income?
        </h2>
        <p className="text-navy-soft">
          This helps determine which plans and savings you may qualify for.
        </p>
      </div>

      <div className="mb-2">
        <div className="text-center mb-8">
          <span className="text-4xl md:text-5xl font-bold text-navy font-heading">
            ${formatIncome(data.estimated_income)}
          </span>
        </div>
        <Slider
          value={[data.estimated_income || DEFAULT_INCOME]}
          min={MIN_INCOME}
          max={MAX_INCOME}
          step={STEP_INCOME}
          onValueChange={(value) => onChange({ estimated_income: value[0] })}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-navy-soft mt-2">
          <span>${MIN_INCOME.toLocaleString()}</span>
          <span>${MAX_INCOME.toLocaleString()}</span>
        </div>
        <p className="text-sm text-navy-soft mt-3 text-center">
          Annual household income before taxes
        </p>
      </div>

      <div className="flex gap-3 mt-8">
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
          disabled={data.estimated_income === '' || data.estimated_income === null}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}