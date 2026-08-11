import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { base44 } from '@/api/base44Client';

import ProgressBar from '@/components/quote/ProgressBar';
import StepZipCode from '@/components/quote/StepZipCode';
import StepHousehold from '@/components/quote/StepHousehold';
import StepAges from '@/components/quote/StepAges';
// StepIncome temporarily removed — re-enable when Facebook Pixel review is complete
// import StepIncome from '@/components/quote/StepIncome';
import StepCoverage from '@/components/quote/StepCoverage';
import StepContact from '@/components/quote/StepContact';
import StepConfirmation from '@/components/quote/StepConfirmation';
import SkipFormBanner from '@/components/quote/SkipFormBanner';
import CarrierLogos from '@/components/landing/CarrierLogos';

const TOTAL_STEPS = 5;

// Shared quote wizard — owns the step state, lead submission, and on-wizard
// chrome (progress bar, ZIP chip, step 1 trust extras). Pages wrap it in their
// own header/footer/background so the same wizard can power multiple landings.
export default function QuoteWizard() {
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

    // Fire Bing UET custom event for conversion tracking (with enhanced conversions PII)
    if (typeof window !== 'undefined') {
      window.uetq = window.uetq || [];
      // Pass hashed-eligible PII for enhanced conversions (UET tag auto-hashes before sending)
      window.uetq.push('set', {
        pid: {
          em: formData.email || '',
          ph: formData.phone || '',
        },
      });
      window.uetq.push('event', 'lead_submit', {
        event_category: 'form',
        event_label: 'quote_request',
        event_value: 0,
      });
    }

    // Agent notification and confirmation email are both sent server-side by
    // workflows (entity-create trigger) — no client-side function calls needed.

    setIsSubmitting(false);
    setCurrentStep(TOTAL_STEPS + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepZipCode data={formData} onChange={updateFormData} onNext={nextStep} />;
      case 2: return <StepHousehold data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 3: return <StepAges data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 4: return <StepCoverage data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 5: return <StepContact data={formData} onChange={updateFormData} onSubmit={handleSubmit} onBack={prevStep} isSubmitting={isSubmitting} />;
      case 6: return <StepConfirmation data={formData} />;
      default: return null;
    }
  };

  return (
    <>
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

      <main className="max-w-3xl mx-auto px-6 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        {currentStep === 1 && (
          <>
            <div className="mt-10">
              <CarrierLogos />
            </div>
            <div className="mt-10">
              <SkipFormBanner />
            </div>
          </>
        )}
      </main>
    </>
  );
}