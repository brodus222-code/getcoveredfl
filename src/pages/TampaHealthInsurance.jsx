import React from 'react';
import CityLanding from '@/pages/CityLanding';
import { getCityBySlug } from '@/data/floridaCities';

export default function TampaHealthInsurance() {
  return <CityLanding city={getCityBySlug('tampa')} />;
}