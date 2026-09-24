const calls = new Map();

// Simple per-IP hourly limit for public AI endpoints.
export function allowCall(req, limit) {
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'anonymous';
  const now = Date.now();
  const recent = (calls.get(ip) || []).filter((time) => now - time < 3600000);
  if (recent.length >= limit) return false;
  calls.set(ip, [...recent, now]);
  if (calls.size > 5000) calls.clear();
  return true;
}