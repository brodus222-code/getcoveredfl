import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Is the $56 a month real?',
    a: 'Yes — that is an example of what a qualifying Florida resident can pay after federal premium tax credits are applied. Your price depends on your ZIP code, age, household size, and income, so the only way to know your real number is to check.',
  },
  {
    q: 'How do I find out my exact rate?',
    a: 'Enter your ZIP code and answer six quick questions. A licensed Florida agent reviews your subsidy eligibility and sends you your actual plan options and pricing — usually within one business day.',
  },
  {
    q: 'Does it cost anything to use this?',
    a: 'No. Our service is free. Agents are paid by the insurance carrier, so the price you get through us is the same as going direct — with help included.',
  },
  {
    q: 'Can I enroll outside Open Enrollment?',
    a: 'Often yes. Losing coverage, moving, a job change, marriage, or a new baby can open a Special Enrollment Period. We will tell you if you qualify.',
  },
  {
    q: 'Which carriers do you work with?',
    a: 'We compare plans across the major Florida carriers on and off the Marketplace, including Florida Blue, Ambetter, Aetna, Cigna, UnitedHealthcare, and Molina.',
  },
];

export default function RatesFaq() {
  return (
    <section className="py-14 md:py-20 bg-sand">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 font-heading text-center text-balance">
          Questions about the $56 rate
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