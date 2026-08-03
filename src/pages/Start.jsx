import React from 'react';
import Quote from './Quote';

// Alternate landing page (option B) — sends traffic straight to the quote
// wizard at its own URL so it can be A/B-tested against the homepage-driven flow.
export default function Start() {
  return <Quote />;
}