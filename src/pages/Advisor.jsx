import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import LandingFooter from '@/components/shared/LandingFooter';
import MobileCallBar from '@/components/shared/MobileCallBar';
import AdvisorTranscript from '@/components/advisor/AdvisorTranscript';
import AdvisorAnswer from '@/components/advisor/AdvisorAnswer';
import AdvisorHelp from '@/components/advisor/AdvisorHelp';
import AdvisorReview from '@/components/advisor/AdvisorReview';
import AdvisorConfirmation from '@/components/advisor/AdvisorConfirmation';
import useAdvisor from '@/components/advisor/useAdvisor';

export default function Advisor() {
  const flow = useAdvisor();
  return <div className="min-h-screen bg-sand pb-24 md:pb-0">
    <SiteHeader staticLogo />
    <header className="bg-navy text-primary-foreground border-b-2 border-accent px-5 py-9 text-center">
      <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">GetCoveredFL · Virtual coverage guide</p>
      <h1 className="text-2xl sm:text-3xl font-bold">Let’s find your next step in coverage.</h1>
      <p className="mt-3 text-primary-foreground/80 text-sm sm:text-base">A few guided questions. AI help when you need it. A licensed agent for the decisions.</p>
    </header>
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-card border-t-2 border-accent shadow-soft rounded-b-2xl p-5 sm:p-8">
        {flow.done ? <AdvisorConfirmation answers={flow.answers} /> : flow.step ? <>
          <div className="flex items-center justify-between text-xs text-navy-soft mb-5"><span className="font-semibold uppercase tracking-wide">Your coverage conversation</span><span>Question {flow.index + 1} of {flow.steps.length}</span></div>
          <div className="max-h-64 overflow-y-auto pr-2 mb-6" aria-label="Conversation so far"><AdvisorTranscript steps={flow.steps} answers={flow.answers} activeIndex={flow.index} replies={{}} questions={[]} busy={false} /></div>
          <div className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold text-navy mb-4">{flow.step.text}</h2>
            {flow.step.key.startsWith('preferred_call') && <p className="text-sm text-navy-soft mb-4">All dates and times are Eastern. This is a preferred time only; an agent will confirm availability.</p>}
            {flow.step.key === 'notes' && <p className="text-sm text-navy-soft mb-4">Please don’t include medical records, Social Security numbers, or payment details.</p>}
            <AdvisorAnswer key={flow.step.key} step={flow.step} initialValue={flow.answers[flow.step.key] ?? ''} onAnswer={flow.answer} disabled={flow.busy} error={flow.error} />
            {flow.index > 0 && <button onClick={() => flow.goTo(flow.index - 1)} className="inline-flex items-center gap-2 py-3 mt-3 text-sm font-semibold text-navy-soft"><ArrowLeft className="w-4 h-4" /> Back</button>}
          </div>
          <AdvisorHelp stage={flow.step.key} onQuestion={flow.rememberQuestion} />
        </> : <AdvisorReview steps={flow.steps} answers={flow.answers} onEdit={flow.goTo} onSubmit={flow.submit} busy={flow.busy} error={flow.error} />}
      </div>
      <p className="flex items-center justify-center gap-2 text-xs text-navy-soft mt-5"><ShieldCheck className="w-4 h-4 shrink-0" /> We never sell your information. Free, no obligation.</p>
      <p className="text-center text-xs text-navy-soft mt-3">AI provides general information, not quotes or eligibility decisions. A licensed agent verifies plan details.</p>
    </main>
    <LandingFooter /><MobileCallBar />
  </div>;
}