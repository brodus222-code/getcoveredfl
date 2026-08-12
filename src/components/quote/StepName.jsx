import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { User, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StepName({ data, onChange, onNext, onBack }) {
  useEffect(() => {
    const input = document.getElementById('name-input');
    if (input) input.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (data.full_name?.trim()) onNext();
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
          Let's personalize your quote
        </h2>
        <p className="text-navy-soft">
          What is your name?
        </p>
      </div>

      <div className="mb-6">
        <Input
          id="name-input"
          type="text"
          placeholder="Full Name"
          value={data.full_name || ''}
          onChange={(e) => onChange({ full_name: e.target.value })}
          onKeyDown={handleKeyDown}
          className="w-full text-center text-lg py-5 h-14 font-medium border-2 border-sand-deep focus:border-primary focus:ring-primary rounded-2xl"
        />
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
          disabled={!data.full_name?.trim()}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-primary transition-all hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}