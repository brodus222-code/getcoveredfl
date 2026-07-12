import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function CallbackModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatPhone = (value) => {
    const p = value.replace(/\D/g, '');
    if (p.length < 4) return p;
    if (p.length < 7) return `(${p.slice(0, 3)}) ${p.slice(3)}`;
    return `(${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6, 10)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, '').length < 10) return;
    setLoading(true);
    await base44.functions.invoke('notifyAgentNewLead', {
      data: {
        full_name: name,
        phone,
        email: 'callback-request@getcoveredfl.com',
        zip_code: 'N/A',
        coverage_type: 'callback_request',
      },
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-navy font-heading text-xl">
            <div className="w-9 h-9 rounded-xl bg-accent-soft flex items-center justify-center">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            Have an Agent Call You
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-primary" />
            </div>
            <p className="text-lg font-semibold text-navy font-heading">Got it! We'll call you shortly.</p>
            <p className="text-sm text-navy-soft">A licensed Florida agent will reach out to {name} at {phone}.</p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-deep text-white font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-sm font-medium text-navy mb-1.5 block">Your Name</label>
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl border-sand-deep focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy mb-1.5 block">Best Phone Number</label>
              <Input
                type="tel"
                placeholder="(555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className="h-12 rounded-xl border-sand-deep focus:border-primary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !name.trim() || phone.replace(/\D/g, '').length < 10}
              className="w-full bg-accent hover:bg-accent-deep text-white h-12 text-base font-bold rounded-xl transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                'Have an Agent Call Me'
              )}
            </button>
            <p className="text-xs text-navy-soft/70 text-center">Licensed Florida agent — no call centers.</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}