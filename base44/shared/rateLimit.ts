const calls = new Map();
const WINDOW = 3600000;

// Simple per-IP hourly limit for public AI endpoints.
export function allowCall(req, limit) {
  const ip = req.headers.get('cf-connecting-ip') || 'anonymous';
  const now = Date.now();
  const recent = (calls.get(ip) || []).filter((time) => now - time < WINDOW);
  if (recent.length >= limit) return false;
  calls.set(ip, [...recent, now]);
  if (calls.size > 5000) {
    for (const [key, times] of calls) {
      if (!times.some((time) => now - time < WINDOW)) calls.delete(key);
    }
  }
  return true;
}