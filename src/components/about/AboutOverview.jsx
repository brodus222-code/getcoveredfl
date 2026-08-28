import React from 'react';

const sections = [
  {
    title: 'What We Do',
    paragraphs: [
      'GetCoveredFL is a free online quoting and lead management platform built to make finding health insurance in Florida simple and stress-free. We help individuals, families, and self-employed Floridians compare ACA Marketplace plans, short-term coverage, and private PPO options side by side. Our guided quote wizard walks you through a few quick questions — ZIP code, household size, ages, and estimated income — then matches you with licensed agents who can walk you through your options and help you enroll.',
      'Beyond quoting, we provide educational resources through our coverage guide and regularly published insurance news blog, so you can make informed decisions about your health coverage. Everything we offer is completely free to use, with no obligation to enroll.',
    ],
  },
  {
    title: "Who It's For",
    paragraphs: [
      "GetCoveredFL is designed for Florida residents who need health insurance but aren't sure where to start. Whether you're uninsured and looking for your first plan, self-employed and shopping for private coverage, transitioning off COBRA, or simply wanting to explore more affordable alternatives to your current plan, our platform and licensed agents are here to help. We serve individuals and families across all of Florida, from Miami to Jacksonville to the Panhandle.",
      "If you're navigating a qualifying life event — like losing employer coverage, getting married, or moving — we can help you understand your special enrollment options and find a plan that fits your budget and needs.",
    ],
  },
  {
    title: 'Who Builds It',
    paragraphs: [
      'GetCoveredFL is built and operated by HealthLink Insurance Agency LLC, an independent licensed Florida insurance agency (FL Lic# L131967, NPN# 21554495). Our Agent of Record, Nick Loucks (FL Lic# G233885, NPN# 21137267), leads a team of licensed agents dedicated to helping Floridians find the right coverage at the right price. We are not affiliated with Healthcare.gov, CMS, or any government agency — we are an independent agency that works directly with major insurance carriers including Blue Cross Blue Shield, UnitedHealthcare, Aetna, and Cigna to bring you a broad selection of plans.',
    ],
  },
];

export default function AboutOverview() {
  return (
    <section className="relative overflow-hidden bg-sand py-16 md:py-20">
      <div aria-hidden="true" className="absolute -right-24 top-12 w-96 h-96 rounded-full border border-accent/15" />
      <div aria-hidden="true" className="absolute -right-10 top-28 w-64 h-64 rounded-full border border-primary/10" />
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 md:gap-12">
        {sections.map((section) => (
          <article key={section.title} className="border-t-2 border-accent pt-5">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-navy mb-5">{section.title}</h2>
            <div className="space-y-4 text-[15px] leading-7 text-navy-soft">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}