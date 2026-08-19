import React from 'react';
import CityLanding from '@/pages/CityLanding';
import { getCityBySlug } from '@/data/floridaCities';

export default function SpaceCoastHealthInsurance() {
  return <CityLanding city={getCityBySlug('space-coast')} />;
}