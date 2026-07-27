import { useEffect } from 'react';

// Fires a Bing UET "phone_call_click" event whenever any tel: link is clicked
// anywhere on the site. Uses a single delegated document-level listener so it
// works across every page/component without per-link wiring. Configure a
// matching conversion goal in Microsoft Ads (event action = phone_call_click)
// to count these as conversions.

export default function PhoneCallTracker() {
  useEffect(() => {
    const handler = (e) => {
      let el = e.target;
      while (el && el !== document.body && el.tagName !== 'A') {
        el = el.parentElement;
      }
      if (el && el.tagName === 'A' && typeof el.href === 'string' && el.href.startsWith('tel:')) {
        if (typeof window !== 'undefined') {
          window.uetq = window.uetq || [];
          window.uetq.push('event', 'phone_call_click', {
            event_category: 'engagement',
            event_label: 'click_to_call',
            event_value: 0,
          });
        }
      }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return null;
}