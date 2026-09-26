import React from 'react';
import { ShieldCheck } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import LandingFooter from '@/components/shared/LandingFooter';
import MobileCallBar from '@/components/shared/MobileCallBar';
import ChatThread from '@/components/online-advisor/ChatThread';
import ChatComposer from '@/components/online-advisor/ChatComposer';
import QuoteDetailsPanel from '@/components/online-advisor/QuoteDetailsPanel';
import OnlineAdvisorConfirmation from '@/components/online-advisor/OnlineAdvisorConfirmation';
import useOnlineAdvisor from '@/components/online-advisor/useOnlineAdvisor';

export default function OnlineAdvisor() {
  const flow = useOnlineAdvisor();
  return (
    <div className="min-h-screen bg-sand pb-24 md:pb-0">
      <SiteHeader staticLogo />
      <header className="bg-navy text-primary-foreground border-b-2 border-accent px-5 py-9 text-center">
        <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">GetCoveredFL · Meet Sunny</p>
        <h1 className="text-2xl sm:text-3xl font-bold">Ask Sunny anything about Florida health coverage.</h1>
        <p className="mt-3 text-primary-foreground/80 text-sm sm:text-base">Get plain-English answers now — then a licensed agent prepares your quote.</p>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {flow.submitted ? <OnlineAdvisorConfirmation info={flow.info} /> : (
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <section className="lg:col-span-2 bg-card border-t-2 border-accent shadow-soft rounded-b-2xl flex flex-col h-[70vh] min-h-[480px] lg:h-[620px]">
              <ChatThread messages={flow.messages} busy={flow.busy} />
              <ChatComposer onSend={flow.send} busy={flow.busy} error={flow.chatError} showStarters={flow.messages.length === 1} />
            </section>
            <QuoteDetailsPanel flow={flow} />
          </div>
        )}
        <p className="flex items-center justify-center gap-2 text-xs text-navy-soft mt-6">
          <ShieldCheck className="w-4 h-4 shrink-0" /> We never sell your information. Free, no obligation.
        </p>
      </main>
      <LandingFooter />
      <MobileCallBar />
    </div>
  );
}