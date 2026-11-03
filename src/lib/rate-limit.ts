// In-memory sliding-window limiter. On serverless this is best-effort per instance;
// for strict limits use Upstash Redis / Vercel KV with the same function signature.
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 10 * 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();

  if (rateLimitMap.size > 5000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetAt) rateLimitMap.delete(k);
    }
  }

  const record = rateLimitMap.get(key);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  if (record.count >= maxRequests) return { allowed: false, remaining: 0 };

  record.count += 1;
  return { allowed: true, remaining: maxRequests - record.count };
}

export function resetRateLimit(key: string) {
  rateLimitMap.delete(key);
}

export function getClientIp(req: Request): string {
  // Vercel sets x-real-ip itself (not spoofable by the client); prefer it.
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "127.0.0.1";
}
