import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MoveRateForm({ guide }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ moveDate: '', originZip: '', flZip: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: k === 'moveDate' ? e.target.value : e.target.value.replace(/\D/g, '').slice(0, 5) });

  const submit = (e) => {
    e.preventDefault();
    navigate(`/Quote?zip=${form.flZip}&source=${guide.source}`);
  };

  return (
    <section id="rate-check" className="bg-navy py-14 px-5 sm:px-6 border-t-2 border-accent">
      <form onSubmit={submit} className="max-w-xl mx-auto bg-background p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-navy font-heading">{guide.ctaTitle}</h2>
        <p className="text-sm font-semibold text-accent-deep uppercase tracking-wide">{guide.ctaSub}</p>
        <div><Label htmlFor="moveDate">Moving date</Label><Input id="moveDate" type="date" required value={form.moveDate} onChange={set('moveDate')} /></div>
        <div><Label htmlFor="originZip">{guide.originLabel}</Label><Input id="originZip" inputMode="numeric" required minLength={5} value={form.originZip} onChange={set('originZip')} /></div>
        <div><Label htmlFor="flZip">New Florida ZIP</Label><Input id="flZip" inputMode="numeric" required pattern="3\d{4}" title="Enter a Florida ZIP code" value={form.flZip} onChange={set('flZip')} /></div>
        <button type="submit" className="w-full bg-accent text-accent-foreground font-semibold py-3 hover:bg-accent-deep transition-colors">See My Florida Rate</button>
      </form>
    </section>
  );
}