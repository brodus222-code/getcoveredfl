import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { base44 } from '@/api/base44Client';

import SiteHeader from '@/components/shared/SiteHeader';
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
import Footer from '@/components/shared/Footer';
import SkipFormBanner from '@/components/quote/SkipFormBanner';

const TOTAL_STEPS = 7;

export default function Quote() {
  const [searchParams] = useSearchParams();
  const initialZip = searchParams.get('zip') || '';
  const hasInitialZip = initialZip.length === 5;

  const [currentStep, setCurrentStep] = useState(hasInitialZip ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    zip_code: initialZip,
    household_size: null,
    ages: [],
    estimated_income: null,
    coverage_type: '',
    currently_insured: null,
    takes_prescriptions: null,
    prefers_specific_network: null,
    full_name: '',
    phone: '',
    email: '',
  });

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS + 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
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
      status: 'new',
    };

    await base44.entities.Lead.create(leadData);
    await base44.functions.invoke('notifyAgentNewLead', { data: leadData });

    setIsSubmitting(false);
    setCurrentStep(TOTAL_STEPS + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepZipCode data={formData} onChange={updateFormData} onNext={nextStep} />;
      case 2: return <StepHousehold data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 3: return <StepAges data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 4: return <StepIncome data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 5: return <StepCoverage data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 6: return <StepHealth data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 7: return <StepContact data={formData} onChange={updateFormData} onSubmit={handleSubmit} onBack={prevStep} isSubmitting={isSubmitting} />;
      case 8: return <StepConfirmation data={formData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand to-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      {currentStep <= TOTAL_STEPS && (
        <div className="bg-white/90 backdrop-blur-md border-b border-sand-deep/40 sticky top-[72px] z-30">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
        </div>
      )}

      {formData.zip_code && currentStep > 1 && currentStep <= TOTAL_STEPS && (
        <div className="max-w-3xl mx-auto px-6 pt-6 flex justify-center">
          <button
            onClick={() => setCurrentStep(1)}
            className="inline-flex items-center gap-2 bg-primary-soft text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-soft/70 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            ZIP {formData.zip_code} · Change
          </button>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-6 py-10 md:py-12">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        {currentStep === 1 && (
          <div className="mt-10">
            <SkipFormBanner />
          </div>
        )}
      </main>

      <Footer />
      <MobileCallBar />
    </div>
  );
}