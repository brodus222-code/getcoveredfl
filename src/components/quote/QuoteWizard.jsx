import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Briefcase, ShoppingBag, Shield } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { trackUetEvent } from '@/lib/uetTrack';

import StepZipCode from '@/components/quote/StepZipCode';
import StepHouseholdInfo from '@/components/quote/StepHouseholdInfo';
import StepAges from '@/components/quote/StepAges';
import StepIncome from '@/components/quote/StepIncome';
import StepTimingReason from '@/components/quote/StepTimingReason';
import StepContactInfo from '@/components/quote/StepContactInfo';
import StepConfirmation from '@/components/quote/StepConfirmation';
import SkipFormBanner from '@/components/quote/SkipFormBanner';
import WizardTrustBadges from '@/components/quote/WizardTrustBadges';
import CarrierLogos from '@/components/landing/CarrierLogos';

const TOTAL_STEPS = 6;

const STEP_NAMES = {
  1: 'zip_code',
  2: 'household_info',
  3: 'ages',
  4: 'timing_reason',
  5: 'income',
  6: 'contact_info',
  7: 'confirmation',
};

// Shared quote wizard — owns the step state, lead submission, and on-wizard
// chrome (progress bar, ZIP chip, step 1 trust extras). Pages wrap it in their
// own header/footer/background so the same wizard can power multiple landings.
export default function QuoteWizard() {
  const [searchParams] = useSearchParams();
  const initialZip = searchParams.get('zip') || '';
  const hasInitialZip = initialZip.length === 5;
  const source = searchParams.get('source') || '';

  const [currentStep, setCurrentStep] = useState(hasInitialZip ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    zip_code: initialZip,
    household_size: null,
    ages: [],
    estimated_income: null,
    start_coverage: '',
    lead_reason: '',
    full_name: '',
    phone: '',
    email: '',
    sms_opt_in: false,
  });

  const completedRef = useRef(false);
  const stepRef = useRef(currentStep);

  // Track each step view so funnel drop-off can be measured, and fire a
  // completion event when the user reaches the confirmation screen.
  useEffect(() => {
    stepRef.current = currentStep;
    if (currentStep >= 1 && currentStep <= TOTAL_STEPS) {
      base44.analytics.track({
        eventName: 'quote_step_view',
        properties: { step: currentStep, step_name: STEP_NAMES[currentStep] },
      });
      trackUetEvent('quote_step_view', {
        event_label: `step_${currentStep}_${STEP_NAMES[currentStep]}`,
      });
    }
    if (currentStep === TOTAL_STEPS + 1) {
      completedRef.current = true;
      base44.analytics.track({ eventName: 'quote_complete' });
    }
  }, [currentStep]);

  // On unmount, if the user left without completing, record the step they
  // abandoned at.
  useEffect(() => {
    return () => {
      if (!completedRef.current && stepRef.current <= TOTAL_STEPS) {
        base44.analytics.track({
          eventName: 'quote_funnel_abandon',
          properties: { step: stepRef.current, step_name: STEP_NAMES[stepRef.current] },
        });
      }
    };
  }, []);

  const formDataRef = useRef(formData);

  const updateFormData = (updates) => {
    const prev = formDataRef.current;
    // Track the first time each field receives a value — measures per-field
    // interaction rate against the step_view events already being recorded.
    Object.entries(updates).forEach(([key, value]) => {
      const wasEmpty =
        prev[key] == null ||
        prev[key] === '' ||
        (Array.isArray(prev[key]) && prev[key].length === 0);
      const hasValue =
        value != null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0);
      if (wasEmpty && hasValue) {
        base44.analytics.track({
          eventName: 'quote_field_interaction',
          properties: {
            field: key,
            step: currentStep,
            step_name: STEP_NAMES[currentStep],
          },
        });
      }
    });
    const next = { ...prev, ...updates };
    formDataRef.current = next;
    setFormData(next);
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
      start_coverage: formData.start_coverage,
      lead_reason: formData.lead_reason,
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      sms_opt_in: formData.sms_opt_in,
      status: 'new',
    };

    await base44.entities.Lead.create(leadData);

    // Brief processing delay for UX — gives the form a "working on it" feel
    await new Promise((resolve) => setTimeout(resolve, 1500));

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

      // Fire Facebook Pixel Contact conversion event.
      // Sent with no parameters — the pixel is under Meta "Core Setup"
      // restrictions, which discard custom parameters anyway.
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact');
      }
    }

    // Agent notification and confirmation email are both sent server-side by
    // workflows (entity-create trigger) — no client-side function calls needed.

    setIsSubmitting(false);
    setCurrentStep(TOTAL_STEPS + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepZipCode data={formData} onChange={updateFormData} onNext={nextStep} />;
      case 2: return <StepHouseholdInfo data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 3: return <StepAges data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 4: return <StepTimingReason data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 5: return <StepIncome data={formData} onChange={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 6: return <StepContactInfo data={formData} onChange={updateFormData} onSubmit={handleSubmit} onBack={prevStep} isSubmitting={isSubmitting} />;
      case 7: return <StepConfirmation data={formData} />;
      default: return null;
    }
  };

  return (
    <>
      {currentStep <= TOTAL_STEPS && (
        <div className="max-w-3xl mx-auto px-6 pt-6 text-center text-sm text-navy-soft">
          Step {currentStep} of {TOTAL_STEPS}
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

      {source && currentStep <= TOTAL_STEPS && (
        <div className="max-w-3xl mx-auto px-6 pt-6">
          <div className="inline-flex items-center gap-2 bg-primary-soft text-primary px-4 py-2 rounded-full text-sm font-semibold">
            {source === 'selfemployed' && <Briefcase className="w-4 h-4" />}
            {source === 'marketplace' && <ShoppingBag className="w-4 h-4" />}
            {source === 'ppo' && <Shield className="w-4 h-4" />}
            {source === 'selfemployed' && 'Self-Employed Health Insurance Quote'}
            {source === 'marketplace' && 'ACA Marketplace Quote'}
            {source === 'ppo' && 'Private PPO Quote'}
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-6 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        {currentStep === 1 && (
          <div className="mt-10">
            <CarrierLogos compact />
          </div>
        )}
        {(currentStep === 1 || currentStep === 2) && (

          <div className="mt-10">
            <SkipFormBanner />
          </div>
        )}
        {currentStep > 1 && currentStep <= TOTAL_STEPS && (
          <div className="mt-8">
            <WizardTrustBadges />
          </div>
        )}
      </main>
    </>
  );
}