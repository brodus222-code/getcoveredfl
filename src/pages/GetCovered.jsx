import React, { useState } from 'react';
import { Shield, Phone, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

const INCOME_RANGES = [
  'Under $20,000',
  '$20,000 – $40,000',
  '$40,000 – $60,000',
  '$60,000 – $80,000',
  '$80,000 – $100,000',
  'Over $100,000',
];

function Confirmation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl px-10 py-12 max-w-sm mx-4 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-9 h-9 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">You're all set!</h2>
        <p className="text-gray-600 leading-relaxed">
          Got it — your agent will call you in the next <strong>2–3 minutes.</strong>
        </p>
      </div>
    </div>
  );
}

export default function GetCovered() {
  const [form, setForm] = useState({ full_name: '', zip_code: '', phone: '', email: '', household_size: '', income_range: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const formatPhone = (v) => {
    const d = v.replace(/\D/g, '');
    if (d.length < 4) return d;
    if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
  };

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = 'Name is required';
    if (!form.zip_code || form.zip_code.length !== 5) e.zip_code = 'Enter a valid ZIP';
    if (!form.phone || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitting(true);
    const leadData = { ...form, status: 'new' };
    await base44.entities.Lead.create(leadData);
    await base44.functions.invoke('notifyAgentNewLead', { data: leadData });
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0 font-sans">
      {submitted && <Confirmation />}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-teal-500" />
            <span className="text-lg font-bold text-navy-900" style={{ color: '#0A3D5C' }}>GetCoveredFL</span>
          </div>
          <a href="tel:+18555925924" className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">(855) 592-5924</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-5" style={{ background: 'linear-gradient(135deg, #e0f7f5 0%, #f0fbff 60%, #ffffff 100%)' }}>
        {/* Palm silhouettes */}
        <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none select-none text-teal-400" style={{ fontSize: '160px', lineHeight: 1 }}>🌴</div>
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none select-none text-teal-400" style={{ fontSize: '160px', lineHeight: 1 }}>🌴</div>

        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-teal-600 mb-3">Florida Health Coverage</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4" style={{ color: '#0A3D5C' }}>
            Get Covered Florida<br />Health Plans
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            Check your eligibility for <strong className="text-green-500">$0</strong> or low-cost Marketplace coverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
            <button
              onClick={scrollToForm}
              className="flex items-center justify-center gap-2 text-white font-bold px-8 py-4 text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: '#2EC4B6', borderRadius: '100px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}
            >
              Check My Eligibility <ArrowRight className="w-4 h-4" />
            </button>
            {/* Desktop callback */}
            <button
              onClick={() => setModalOpen(true)}
              className="hidden md:flex items-center justify-center gap-2 font-semibold px-8 py-4 text-base border-2 transition-all duration-200 hover:bg-gray-50"
              style={{ color: '#0A84FF', borderColor: '#0A84FF', borderRadius: '100px' }}
            >
              <Phone className="w-4 h-4" />
              Skip the Form — Have an Agent Call Me
            </button>
            {/* Mobile click to call */}
            <a
              href="tel:+18555925924"
              className="md:hidden flex items-center justify-center gap-2 font-semibold px-8 py-4 text-base border-2 transition-all duration-200"
              style={{ color: '#0A84FF', borderColor: '#0A84FF', borderRadius: '100px' }}
            >
              <Phone className="w-4 h-4" />
              Skip the Form — Have an Agent Call Me
            </a>
          </div>
          <p className="text-xs text-gray-400">Independent licensed Florida agency — not a government site.</p>
        </div>
      </section>

      {/* Panel 1 — Eligibility */}
      <section className="py-10 px-5 bg-sky-50">
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-md bg-white flex flex-col md:flex-row items-center">
          <div className="md:w-2/5 w-full flex-shrink-0">
            <img
              src="https://media.base44.com/images/public/696f51421917c989be527824/edd9dd31f_Floridaeligibility2.png"
              alt="You may qualify for $0 plans"
              className="w-full h-full object-cover object-top"
              style={{ maxHeight: '300px' }}
            />
          </div>
          <div className="flex-1 px-8 py-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: '#0A3D5C' }}>
              You may qualify for <span className="text-green-500">$0</span>
              <br />or low-cost <span style={{ color: '#0A3D5C' }}>Marketplace plans</span>
            </h2>
            <hr className="border-gray-200 my-4" />
            <p className="text-gray-600 mb-6 leading-relaxed">
              Most Florida residents don't realize their savings change when income or household info changes — <strong>even slightly.</strong>
            </p>
            <button
              onClick={scrollToForm}
              className="text-white font-bold px-8 py-4 text-base transition-all duration-200 hover:opacity-90"
              style={{ background: '#0A84FF', borderRadius: '100px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}
            >
              Check My Eligibility
            </button>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-14 px-5 bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2" style={{ color: '#0A3D5C' }}>
            See Your Options in Minutes
          </h2>
          <p className="text-center text-gray-500 mb-8">Fill out the quick form below and a licensed agent will review your results.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { field: 'full_name', placeholder: 'Full Name', type: 'text' },
              { field: 'zip_code', placeholder: 'ZIP Code', type: 'text', inputMode: 'numeric', maxLength: 5 },
              { field: 'phone', placeholder: 'Phone Number', type: 'tel' },
              { field: 'email', placeholder: 'Email Address', type: 'email' },
            ].map(({ field, placeholder, type, inputMode, maxLength }) => (
              <div key={field}>
                <input
                  type={type}
                  inputMode={inputMode}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  value={form[field]}
                  onChange={(e) => {
                    const val = field === 'phone' ? formatPhone(e.target.value) : field === 'zip_code' ? e.target.value.replace(/\D/g, '').slice(0, 5) : e.target.value;
                    update(field, val);
                  }}
                  className={`w-full px-5 py-4 text-base border-2 rounded-2xl outline-none transition-colors ${errors[field] ? 'border-red-400' : 'border-gray-200 focus:border-teal-400'}`}
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <select
                value={form.household_size}
                onChange={(e) => update('household_size', e.target.value)}
                className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-2xl outline-none focus:border-teal-400 transition-colors text-gray-700 bg-white"
              >
                <option value="">Household Size</option>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
              </select>

              <select
                value={form.income_range}
                onChange={(e) => update('income_range', e.target.value)}
                className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-2xl outline-none focus:border-teal-400 transition-colors text-gray-700 bg-white"
              >
                <option value="">Income Range</option>
                {INCOME_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-white font-bold py-4 text-lg transition-all duration-200 hover:opacity-90 disabled:opacity-60"
              style={{ background: '#2EC4B6', borderRadius: '100px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}
            >
              {submitting ? 'Submitting...' : 'Check My Eligibility'}
            </button>

            {/* Desktop callback */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="hidden md:flex w-full items-center justify-center gap-2 font-semibold py-4 text-base border-2 transition-all duration-200 hover:bg-gray-50"
              style={{ color: '#0A84FF', borderColor: '#0A84FF', borderRadius: '100px' }}
            >
              <Phone className="w-4 h-4" />
              Call Me Instead
            </button>
            {/* Mobile call */}
            <a
              href="tel:+18555925924"
              className="md:hidden flex w-full items-center justify-center gap-2 font-semibold py-4 text-base border-2 transition-all duration-200"
              style={{ color: '#0A84FF', borderColor: '#0A84FF', borderRadius: '100px' }}
            >
              <Phone className="w-4 h-4" />
              Call Me Instead
            </a>
          </form>

          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
            <Lock className="w-3 h-3" />
            Your information is secure and never shared.
          </div>
        </div>
      </section>

      {/* Panel 2 — Call Me Instead */}
      <section className="py-10 px-5 bg-sky-50">
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-md bg-white">
          <div className="bg-gradient-to-br from-sky-100 to-teal-50 flex flex-col sm:flex-row items-center gap-6 p-6">
            <div className="flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&auto=format"
                alt="Phone calling"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold mb-1" style={{ color: '#0A3D5C' }}>Don't want to fill this out?</h3>
              <p className="text-xl text-gray-700 font-normal mb-2">We can <strong style={{ color: '#0A3D5C' }}>call you</strong> instead.</p>
              <p className="text-sm text-gray-600 mb-4">A licensed Florida agent can review your info and walk you through your options in minutes.</p>
              {/* Mobile */}
              <a
                href="tel:+18555925924"
                className="md:hidden inline-flex items-center gap-2 text-white font-semibold px-6 py-3 text-sm transition-colors duration-200"
                style={{ background: '#0A84FF', borderRadius: '100px' }}
              >
                <Phone className="w-4 h-4" />
                Skip the Form — Have an Agent Call Me
              </a>
              {/* Desktop */}
              <button
                onClick={() => setModalOpen(true)}
                className="hidden md:inline-flex items-center gap-2 text-white font-semibold px-6 py-3 text-sm transition-colors duration-200 hover:opacity-90"
                style={{ background: '#0A84FF', borderRadius: '100px' }}
              >
                <Phone className="w-4 h-4" />
                Skip the Form — Have an Agent Call Me
              </button>
            </div>
          </div>
          <div className="bg-gray-50 border-t border-gray-100 px-6 py-2 text-center text-xs text-gray-500">
            Licensed Florida agent — no call centers.
          </div>
        </div>
      </section>

      {/* Panel 3 — Fix Marketplace Account */}
      <section className="py-10 px-5 bg-white">
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-md bg-white border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-8">
            <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-teal-100 flex items-center justify-center text-5xl">
              🛠️
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold mb-1" style={{ color: '#0A3D5C' }}>Is your Marketplace account wrong?</h3>
              <p className="text-gray-600 mb-4">We can fix it for free. Wrong income, wrong household size, or wrong plan — our agents handle corrections every day.</p>
              {/* Mobile */}
              <a
                href="tel:+18555925924"
                className="md:hidden inline-flex items-center gap-2 text-white font-semibold px-6 py-3 text-sm transition-colors duration-200"
                style={{ background: '#2EC4B6', borderRadius: '100px' }}
              >
                <Phone className="w-4 h-4" />
                Get Help Fixing My Account
              </a>
              {/* Desktop */}
              <button
                onClick={() => setModalOpen(true)}
                className="hidden md:inline-flex items-center gap-2 text-white font-semibold px-6 py-3 text-sm transition-colors duration-200 hover:opacity-90"
                style={{ background: '#2EC4B6', borderRadius: '100px' }}
              >
                <Phone className="w-4 h-4" />
                Get Help Fixing My Account
              </button>
            </div>
          </div>
          <div className="bg-gray-50 border-t border-gray-100 px-6 py-2 text-center text-xs text-gray-500">
            We never share or sell your information.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-5 text-center text-xs">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-teal-400" />
          <span className="text-white font-semibold">GetCoveredFL</span>
        </div>
        <p className="mb-3">© 2026 HealthLink Insurance Agency LLC | Licensed Florida Agency | All rights reserved.</p>
        <div className="flex justify-center gap-4 text-gray-500">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          <span>·</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Licensing Info</a>
        </div>
      </footer>

      <MobileCallBar />
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}