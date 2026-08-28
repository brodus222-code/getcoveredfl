import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const questions = [
  { q: 'How much is health insurance in Florida?', a: 'Your monthly price depends on age, ZIP code, household size, income, tobacco use, and plan type. Eligible Marketplace households may receive premium tax credits that reduce the amount they pay each month.' },
  { q: 'Can I get a $0 monthly premium plan?', a: '$0 monthly premium Marketplace plans may be available to people who qualify for enough financial assistance. Availability and eligibility vary, and deductibles, copays, and other out-of-pocket costs still apply.' },
  { q: 'Is your service really free?', a: 'Yes. Comparing options and speaking with a licensed agent costs you nothing, and there is no obligation to enroll.' },
  { q: 'What if I missed Open Enrollment?', a: 'You may qualify for a Special Enrollment Period after certain life events, including losing other coverage, moving, getting married, or having a baby. Private plan availability may also differ.' },
  { q: 'Can you check whether my doctor is covered?', a: 'Yes. Share the doctors, hospitals, and prescriptions that matter to you so a licensed agent can check plan networks and benefits before you enroll.' },
];

export default function AffordableFaq() {
  return (
    <section className="bg-sand py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-deep mb-3">Common Questions</p><h2 className="text-3xl md:text-4xl font-bold font-heading text-navy">Florida coverage, explained clearly</h2></div>
        <Accordion type="single" collapsible className="border-t border-sand-deep">
          {questions.map(({ q, a }, index) => <AccordionItem key={q} value={`question-${index}`} className="border-sand-deep"><AccordionTrigger className="py-5 text-left text-lg font-bold text-navy hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-5 text-base leading-7 text-navy-soft">{a}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>
  );
}