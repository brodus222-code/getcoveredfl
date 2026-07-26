import React from 'react';
import { CheckCircle2, Phone, Calendar, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function StepConfirmation({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-deep text-white mb-6 shadow-glow-primary"
      >
        <CheckCircle2 className="w-11 h-11" />
      </motion.div>

      <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4 font-heading">
        You're all set!
      </h2>

      <p className="text-navy-soft mb-8 leading-relaxed">
        A licensed advisor from HealthLink Insurance Agency LLC will review your details and reach out shortly to help you compare plans and choose the best option.
      </p>

      <div className="bg-gradient-to-br from-primary-soft to-turquoise-soft rounded-3xl p-6 mb-8 text-left">
        <p className="text-sm font-semibold text-navy mb-4 uppercase tracking-wider">What happens next</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-navy-soft">A licensed agent calls you within minutes</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-navy-soft">We compare plans in your ZIP code</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-navy-soft">Results sent to {data.email || 'your email'}</span>
          </div>
        </div>
      </div>

      <a
        href="tel:+18556345343"
        className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-deep text-white font-bold py-5 text-lg rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5 mb-4"
      >
        <Phone className="w-5 h-5" />
        Call Now: (855) 634-5343
      </a>

      <Link
        to={createPageUrl('ThankYou')}
        className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl border-2 border-sand-deep text-navy-soft font-medium hover:bg-sand transition-colors"
      >
        View More Information
      </Link>
    </motion.div>
  );
}