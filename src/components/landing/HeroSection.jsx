import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Phone, Star, Lock, Clock } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  const [zip, setZip] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (zip.length === 5) {
      navigate(`/Quote?zip=${zip}`);
    } else {
      setError(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-deep to-navy text-white">
      {/* Decorative coastal elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-turquoise/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-white/5 to-transparent rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20"
          >
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/90">Florida's Trusted Health Insurance Guide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6 tracking-tight font-heading text-balance"
          >
            Find Affordable Health Insurance in Florida
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl"
          >
            Compare plans, unlock subsidies, and find coverage that fits your budget — in under 2 minutes. Plans from $0/month available.
          </motion.p>

          {/* ZIP capture form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 mb-6 max-w-lg"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                placeholder="Enter your ZIP code"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
                  setError(false);
                }}
                className={`w-full px-5 py-5 text-lg font-medium text-navy bg-white rounded-2xl shadow-lg placeholder:text-navy-soft/50 outline-none ring-2 transition-all ${error ? 'ring-destructive' : 'ring-transparent focus:ring-accent'}`}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-5 text-lg rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Get My Quotes
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.form>

          {error && (
            <p className="text-sm text-accent-soft mb-4 -mt-2">Please enter a valid 5-digit ZIP code.</p>
          )}

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75"
          >
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-accent text-accent" />
              No fees
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-accent text-accent" />
              No obligation
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              2-minute process
            </span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent" />
              Secure
            </span>
          </motion.div>

          {/* Phone alternative */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-sm text-white/60 mb-2">Prefer to talk to someone now?</p>
            <a
              href="tel:+18555925924"
              className="inline-flex items-center gap-3 text-white hover:text-accent transition-colors group"
            >
              <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-white/15 flex items-center justify-center transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-white/60">Licensed agents available</div>
                <div className="text-lg font-bold font-heading">(855) 592-5924</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}