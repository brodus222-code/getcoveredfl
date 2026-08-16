import React from 'react';
import CityLanding from '@/pages/CityLanding';
import { getCityBySlug } from '@/data/floridaCities';

export default function JacksonvilleHealthInsurance() {
  return <CityLanding city={getCityBySlug('jacksonville')} />;
}