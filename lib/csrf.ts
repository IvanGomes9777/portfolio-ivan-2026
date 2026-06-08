// Origin-based CSRF protection for state-changing JSON API routes.
//
// For a stateless JSON API the most reliable CSRF defense is to verify the
// request actually originated from our own page. Browsers attach an `Origin`
// header to all cross-site POST/PUT/DELETE requests and forbid scripts from
// forging it, so comparing it against our own host (plus any explicitly
// allowed origins) blocks classic cross-site form/fetch attacks. A forged
// `<form>` auto-submitted from evil.com carries `Origin: https://evil.com`
// and is rejected; a same-site fetch carries our own origin and passes.

function hostFrom(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

/**
 * Returns true when the request demonstrably comes from our own site.
 *
 * Allowed origins, in order of preference:
 *  - the request's own Host header (same-origin — the normal case)
 *  - any host listed in ALLOWED_ORIGINS (comma-separated env, optional)
 */
export function isSameOrigin(req: Request): boolean {
  const selfHost =
    req.headers.get("host") ?? hostFrom(req.headers.get("x-forwarded-host"));

  const allowed = new Set<string>();
  if (selfHost) allowed.add(selfHost);
  for (const entry of (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)) {
    const h = hostFrom(entry) ?? entry;
    allowed.add(h);
  }

  // Prefer Origin; fall back to Referer (some privacy setups strip Origin on
  // same-origin requests, but a Referer is still present).
  const originHost = hostFrom(req.headers.get("origin"));
  if (originHost) return allowed.has(originHost);

  const refererHost = hostFrom(req.headers.get("referer"));
  if (refererHost) return allowed.has(refererHost);

  // No Origin and no Referer on a state-changing request is not a normal
  // browser submission — reject it.
  return false;
}
