import React from 'react';
import CityLanding from '@/pages/CityLanding';
import { getCityBySlug } from '@/data/floridaCities';

export default function StPetersburgHealthInsurance() {
  return <CityLanding city={getCityBySlug('st-petersburg')} />;
}