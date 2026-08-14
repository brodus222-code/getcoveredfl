// Pushes a custom event to Bing UET (Microsoft Ads) so post-click engagement
// is visible in the ad platform alongside the automatic pageLoad event.
// Mirrors the same events already sent to base44.analytics.track.
export function trackUetEvent(action, params = {}) {
  if (typeof window === 'undefined') return;
  window.uetq = window.uetq || [];
  window.uetq.push('event', action, {
    event_category: 'engagement',
    event_label: params.event_label || action,
    event_value: 0,
    ...params,
  });
}