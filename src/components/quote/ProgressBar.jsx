import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-sm font-medium text-navy-soft">
          Step <span className="text-navy font-bold">{currentStep}</span> of {totalSteps}
        </span>
        <span className="text-sm font-semibold text-primary">
          {Math.round(progress)}% complete
        </span>
      </div>
      <div className="h-2.5 bg-sand-deep rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-turquoise to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}