import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-teal-600">
          {Math.round(progress)}% complete
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}