import React from 'react';

const BADGES = [
  { src: 'https://media.base44.com/images/public/696f51421917c989be527824/a0a4a8764_badge_easy_enrollment.png', alt: 'Easy Enrollment' },
  { src: 'https://media.base44.com/images/public/696f51421917c989be527824/d66b3657b_badge_personalized_support.png', alt: 'Personalized Support' },
  { src: 'https://media.base44.com/images/public/696f51421917c989be527824/17ac7eb6e_badge_secure_private.png', alt: 'Secure & Private' },
];

// Florida-themed trust badges. Placed at the two highest-impact conversion
// points: directly under the landing ZIP CTA and under the wizard form.
export default function FloridaTrustBadges({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 flex-wrap ${className}`}>
      {BADGES.map((b) => (
        <img
          key={b.alt}
          src={b.src}
          alt={b.alt}
          loading="lazy"
          className="h-10 sm:h-11 w-auto"
        />
      ))}
    </div>
  );
}