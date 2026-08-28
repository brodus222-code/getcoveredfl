import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Is the $89 a month real?',
    a: 'Yes — that is an example of what a healthy Florida adult can pay for a private PPO plan. Your price depends on your ZIP code, age, tobacco use, and the plan you choose, so the only way to know your real number is to check.',
  },
  {
    q: 'How is this different from an ACA Marketplace plan?',
    a: 'Private PPO plans are sold outside the Marketplace. They are priced on age and plan design rather than income, offer broad nationwide networks with no referrals, and can be started year-round — but they are not eligible for premium tax credits.',
  },
  {
    q: 'Can I keep my own doctors?',
    a: 'Usually yes. Private PPOs use large national provider networks, and you can see specialists directly without a referral. Tell your agent which doctors matter and they will check the networks before you enroll.',
  },
  {
    q: 'Can I enroll any time of year?',
    a: 'Yes. Private PPO plans do not require an open enrollment window or a qualifying life event. Coverage can often start as soon as the first of next month.',
  },
  {
    q: 'Does it cost anything to use this?',
    a: 'No. Our service is free. Agents are paid by the carrier, so your price is the same as going direct — with help included.',
  },
  {
    q: 'What about pre-existing conditions?',
    a: 'Coverage for pre-existing conditions varies by plan and carrier, and some private plans use medical underwriting. A licensed agent will compare your private and Marketplace options side by side so you know exactly what is covered.',
  },
];

export default function PpoRatesFaq() {
  return (
    <section className="py-14 md:py-20 bg-sand">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 font-heading text-center text-balance">
          Questions about the $89 rate
        </h2>
        <Accordion type="single" collapsible className="border-t border-sand-deep">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="bg-white border-b border-x border-sand-deep px-5"
            >
              <AccordionTrigger className="text-left font-semibold text-navy hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-navy-soft leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}