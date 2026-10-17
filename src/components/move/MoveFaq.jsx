import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MoveFaq({ faqs }) {
  return (
    <Accordion type="single" collapsible className="bg-card border border-border px-5">
      {faqs.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger className="text-left text-navy font-semibold">{f.q}</AccordionTrigger>
          <AccordionContent className="text-navy-soft">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}