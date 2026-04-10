import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle2, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

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
      data: { full_name: name, phone, email: 'callback-request@getcoveredfl.com', zip_code: 'N/A', coverage_type: 'callback_request' }
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Phone className="w-5 h-5" />
            Have an Agent Call You
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center gap-4">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
            <p className="text-lg font-semibold text-gray-900">Got it! We'll call you shortly.</p>
            <p className="text-sm text-gray-500">A licensed Florida agent will reach out to {name} at {phone}.</p>
            <Button onClick={onClose} className="mt-2">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Your Name</label>
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Best Phone Number</label>
              <Input
                type="tel"
                placeholder="(555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className="h-12"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !name.trim() || phone.replace(/\D/g, '').length < 10}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white h-12 text-base font-semibold"
            >
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</> : 'Have an Agent Call Me'}
            </Button>
            <p className="text-xs text-gray-400 text-center">Licensed Florida agent — no call centers.</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}