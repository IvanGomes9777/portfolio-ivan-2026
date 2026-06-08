// In-memory sliding-window rate limiter.
//
// Note: state lives per server instance. On serverless/multi-instance hosting
// (e.g. Vercel) each instance keeps its own window, so the effective global
// limit can be higher than configured under heavy fan-out. For a contact form
// this is an acceptable, dependency-free baseline; swap in a shared store
// (Upstash/Redis) if you need a hard cross-instance guarantee.

type Hit = { count: number; reset: number };

const buckets = new Map<string, Hit>();

// Opportunistic cleanup so the map can't grow unbounded.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, hit] of buckets) {
    if (hit.reset <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // epoch ms when the window resets
};

/**
 * Fixed-window limiter. Allows `limit` requests per `windowMs` per `key`.
 * Default: 5 requests / 60s — matches the project's security requirement.
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.reset <= now) {
    const reset = now + windowMs;
    buckets.set(key, { count: 1, reset });
    return { success: true, limit, remaining: limit - 1, reset };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);
  return {
    success: existing.count <= limit,
    limit,
    remaining,
    reset: existing.reset,
  };
}

/**
 * Best-effort client IP from proxy headers. Vercel/most proxies set
 * `x-forwarded-for` (client is the first entry). Falls back to a constant so a
 * missing header degrades to a shared bucket rather than throwing.
 */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}
