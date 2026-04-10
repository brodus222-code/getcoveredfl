import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

import ProgressBar from '@/components/quote/ProgressBar';
import StepZipCode from '@/components/quote/StepZipCode';
import StepHousehold from '@/components/quote/StepHousehold';
import StepAges from '@/components/quote/StepAges';
import StepIncome from '@/components/quote/StepIncome';
import StepCoverage from '@/components/quote/StepCoverage';
import StepHealth from '@/components/quote/StepHealth';
import StepContact from '@/components/quote/StepContact';
import StepConfirmation from '@/components/quote/StepConfirmation';
import MobileCallBar from '@/components/shared/MobileCallBar';
import SkipFormBanner from '@/components/quote/SkipFormBanner';

const TOTAL_STEPS = 7;

export default function Quote() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    zip_code: '',
    household_size: null,
    ages: [],
    estimated_income: null,
    coverage_type: '',
    currently_insured: null,
    takes_prescriptions: null,
    prefers_specific_network: null,
    full_name: '',
    phone: '',
    email: ''
  });
  
  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };
  
  const nextStep = () => {
    if (currentStep < TOTAL_STEPS + 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const leadData = {
      zip_code: formData.zip_code,
      household_size: formData.household_size,
      ages: formData.ages,
      estimated_income: formData.estimated_income,
      coverage_type: formData.coverage_type,
      currently_insured: formData.currently_insured,
      takes_prescriptions: formData.takes_prescriptions,
      prefers_specific_network: formData.prefers_specific_network,
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      status: 'new'
    };
    
    await base44.entities.Lead.create(leadData);
    await base44.functions.invoke('notifyAgentNewLead', { data: leadData });

    setIsSubmitting(false);
    setCurrentStep(TOTAL_STEPS + 1);
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepZipCode 
            data={formData} 
            onChange={updateFormData} 
            onNext={nextStep} 
          />
        );
      case 2:
        return (
          <StepHousehold 
            data={formData} 
            onChange={updateFormData} 
            onNext={nextStep} 
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepAges 
            data={formData} 
            onChange={updateFormData} 
            onNext={nextStep} 
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <StepIncome 
            data={formData} 
            onChange={updateFormData} 
            onNext={nextStep} 
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <StepCoverage 
            data={formData} 
            onChange={updateFormData} 
            onNext={nextStep} 
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <StepHealth 
            data={formData} 
            onChange={updateFormData} 
            onNext={nextStep} 
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <StepContact 
            data={formData} 
            onChange={updateFormData} 
            onSubmit={handleSubmit}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      case 8:
        return <StepConfirmation data={formData} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Home")} className="flex items-center gap-2">
              <Shield className="w-7 h-7 text-teal-600" />
              <span className="text-lg font-bold text-gray-900">GetCoveredFL</span>
            </Link>
            
            {currentStep <= TOTAL_STEPS && (
              <Link 
                to={createPageUrl("Home")} 
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Progress Bar */}
      {currentStep <= TOTAL_STEPS && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
        </div>
      )}
      
      {/* Form Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {currentStep <= TOTAL_STEPS && <SkipFormBanner />}
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>
      
      <MobileCallBar />
    </div>
  );
}