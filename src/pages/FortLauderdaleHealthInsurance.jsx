import React from 'react';
import CityLanding from '@/pages/CityLanding';
import { getCityBySlug } from '@/data/floridaCities';

export default function FortLauderdaleHealthInsurance() {
  return <CityLanding city={getCityBySlug('fort-lauderdale')} />;
}