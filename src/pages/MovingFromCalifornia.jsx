import React from 'react';
import SiteHeader from '@/components/shared/SiteHeader';
import LandingFooter from '@/components/shared/LandingFooter';
import MobileCallBar from '@/components/shared/MobileCallBar';
import MoveHero from '@/components/move/MoveHero';
import MoveSection from '@/components/move/MoveSection';
import CompareTable from '@/components/move/CompareTable';
import NumberedList from '@/components/move/NumberedList';
import ProofChecklist from '@/components/move/ProofChecklist';
import SavingsExample from '@/components/move/SavingsExample';
import MedicareBridge from '@/components/move/MedicareBridge';
import MoveFaq from '@/components/move/MoveFaq';
import MoveRateForm from '@/components/move/MoveRateForm';
import MoveLinks from '@/components/move/MoveLinks';
import usePageSeo from '@/hooks/usePageSeo';
import { california as g } from '@/data/moveGuides';

export default function MovingFromCalifornia() {
  usePageSeo({ title: g.seoTitle, description: g.metaDescription, faqs: g.faqs });
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SiteHeader staticLogo />
      <MoveHero guide={g} />
      <MoveSection title={g.compare.title}><CompareTable rows={g.compare.rows} /></MoveSection>
      <MoveSection title={g.steps.title} sand><NumberedList items={g.steps.items} /></MoveSection>
      <MoveSection title={g.checklistTitle}><ProofChecklist /></MoveSection>
      <MoveSection title={g.savings.title} sand><SavingsExample savings={g.savings} /></MoveSection>
      <MoveSection title={g.medicare.title}><MedicareBridge medicare={g.medicare} /></MoveSection>
      <MoveSection title="Frequently Asked Questions" sand><MoveFaq faqs={g.faqs} /></MoveSection>
      <MoveRateForm guide={g} />
      <MoveLinks crossLink={g.crossLink} />
      <LandingFooter />
      <MobileCallBar />
    </div>
  );
}