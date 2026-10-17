import React from 'react';
import { CheckCircle } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import LandingFooter from '@/components/shared/LandingFooter';
import MobileCallBar from '@/components/shared/MobileCallBar';
import MoveHero from '@/components/move/MoveHero';
import MoveSection from '@/components/move/MoveSection';
import ProofChecklist from '@/components/move/ProofChecklist';
import SavingsExample from '@/components/move/SavingsExample';
import NumberedList from '@/components/move/NumberedList';
import MoveFaq from '@/components/move/MoveFaq';
import MoveRateForm from '@/components/move/MoveRateForm';
import MoveLinks from '@/components/move/MoveLinks';
import usePageSeo from '@/hooks/usePageSeo';
import { newJersey as g } from '@/data/moveGuides';

export default function MovingFromNewJersey() {
  usePageSeo({ title: g.seoTitle, description: g.metaDescription, faqs: g.faqs });
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SiteHeader staticLogo />
      <MoveHero guide={g} />
      <MoveSection title={g.intro.title}>
        <ul className="space-y-3">
          {g.intro.points.map((p) => (
            <li key={p} className="flex gap-3 text-navy-soft"><CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />{p}</li>
          ))}
        </ul>
      </MoveSection>
      <MoveSection title={g.checklistTitle} sand><ProofChecklist /></MoveSection>
      <MoveSection title={g.savings.title}><SavingsExample savings={g.savings} /></MoveSection>
      <MoveSection title={g.mistakes.title} sand><NumberedList items={g.mistakes.items} /></MoveSection>
      <MoveSection title="Frequently Asked Questions"><MoveFaq faqs={g.faqs} /></MoveSection>
      <MoveRateForm guide={g} />
      <MoveLinks crossLink={g.crossLink} />
      <LandingFooter />
      <MobileCallBar />
    </div>
  );
}