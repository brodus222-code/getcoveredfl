import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Send, Phone, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';

// Merged step: name + email + phone + SMS opt-in on one screen.
// Replaces the old two-step name → contact flow. This is the final step
// before submission — the onSubmit callback fires the lead creation.
export default function StepContactInfo({ data, onChange, onSubmit, onBack, isSubmitting }) {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => phone.replace(/\D/g, '').length >= 10;

  // Progressive disclosure: phone + SMS opt-in appear once email has 5+ characters
  const showPhone = (data.email || '').length >= 5;

  useEffect(() => {
    const input = document.getElementById('contact-name');
    if (input) input.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!data.full_name?.trim()) newErrors.full_name = 'Please enter your name';
    if (!data.email || !validateEmail(data.email)) newErrors.email = 'Please enter a valid email address';
    if (!data.phone || !validatePhone(data.phone)) newErrors.phone = 'Please enter a valid phone number';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  };

  const formatPhone = (value) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-soft text-accent mb-6">
          <Send className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-heading">
          Get your free quote
        </h2>
        <p className="text-navy-soft">
          Enter your contact info and we'll show your plan options.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <Input
            id="contact-name"
            type="text"
            placeholder="Full Name"
            value={data.full_name || ''}
            onChange={(e) => {
              onChange({ full_name: e.target.value });
              if (errors.full_name) setErrors({ ...errors, full_name: null });
            }}
            className={`w-full text-lg py-5 h-14 font-medium border-2 rounded-2xl ${errors.full_name ? 'border-destructive focus:border-destructive' : 'border-sand-deep focus:border-primary'}`}
          />
          {errors.full_name && <p className="text-sm text-destructive mt-1">{errors.full_name}</p>}
        </div>

        <div>
          <Input
            id="contact-email"
            type="email"
            placeholder="Email Address"
            value={data.email || ''}
            onChange={(e) => {
              onChange({ email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            className={`w-full py-5 h-14 text-lg border-2 rounded-2xl ${errors.email ? 'border-destructive focus:border-destructive' : 'border-sand-deep focus:border-primary'}`}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
        </div>

        <AnimatePresence>
          {showPhone && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 overflow-hidden"
            >
              <div>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={data.phone || ''}
                  onChange={(e) => {
                    onChange({ phone: formatPhone(e.target.value) });
                    if (errors.phone) setErrors({ ...errors, phone: null });
                  }}
                  className={`w-full py-5 h-14 text-lg border-2 rounded-2xl ${errors.phone ? 'border-destructive focus:border-destructive' : 'border-sand-deep focus:border-primary'}`}
                />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <Checkbox
                  checked={!!data.sms_opt_in}
                  onCheckedChange={(checked) => onChange({ sms_opt_in: checked })}
                  className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div>
                  <span className="text-sm font-medium text-navy">
                    Text me updates about my insurance options.{' '}
                    <span className="text-navy-soft font-normal">(Optional)</span>
                  </span>
                  <span className="text-xs text-navy-soft leading-snug block mt-1">
                    By checking this box I consent to SMS messages from getcoveredfl.com about my inquiry into insurance. Msg &amp; data rates may apply. Reply STOP to opt out
                  </span>
                </div>
              </label>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-1 py-5 text-lg font-medium rounded-2xl border-2 border-sand-deep text-navy-soft hover:bg-sand transition-colors"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white py-5 text-lg font-bold rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Searching for plans...
              </>
            ) : (
              'See My Plans & Prices'
            )}
          </button>
        </div>
      </form>

      <p className="text-xs text-navy-soft/70 text-center leading-relaxed mt-4">
        By submitting this form, you confirm you are at least 18 years old and give your express written consent for HealthLink Insurance Agency LLC and its licensed agents to contact you at the phone number and email you provided. This may include calls, texts, or prerecorded messages using automated technology. Message and data rates may apply. Your consent is not required to make a purchase. See our Privacy Policy and Terms for details.
      </p>

      <div className="text-center mb-6 mt-4">
        <a
          href="tel:+18556345343"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-deep transition-colors"
        >
          <Phone className="w-4 h-4" />
          Or Call Now: (855) 634-5343
        </a>
      </div>
    </motion.div>
  );
}