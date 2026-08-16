import React from 'react';
import CityLanding from '@/pages/CityLanding';
import { getCityBySlug } from '@/data/floridaCities';

export default function OrlandoHealthInsurance() {
  return <CityLanding city={getCityBySlug('orlando')} />;
}