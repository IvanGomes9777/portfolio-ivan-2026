import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Content-Security-Policy for the app's own pages.
//
// Notes on the chosen directives:
//  - 'unsafe-inline' for script/style is required because Next.js injects inline
//    bootstrap/flight scripts and the UI uses many inline style attributes +
//    Tailwind. Since the app renders no user-controlled HTML (no
//    dangerouslySetInnerHTML, React auto-escapes), the residual XSS risk is low.
//    A stricter nonce-based policy would need a custom middleware and is the
//    natural next upgrade.
//  - fonts are self-hosted by next/font, so font-src 'self' is enough.
//  - frame-ancestors 'none' replaces/strengthens X-Frame-Options (anti-clickjacking).
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // Third-party origins:
  //  - vercel.live: Vercel's preview comment / live feedback widget (preview
  //    deployments only — not injected in production).
  //  - Google Ads conversion tracking (gtag.js): the base tag is loaded from
  //    googletagmanager.com; the conversion event pings googleadservices.com /
  //    googleads.g.doubleclick.net / google.com (pixels + fetch). All are
  //    Google-owned. Note: Google may also fire remarketing "ga-audiences"
  //    pixels to country-specific domains (google.de etc.) which are NOT in
  //    this list — those are non-essential and do not affect conversion counts.
  "script-src 'self' 'unsafe-inline' https://vercel.live https://www.googletagmanager.com https://www.googleadservices.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://*.doubleclick.net https://www.googleadservices.com",
  "font-src 'self' data: https://vercel.live",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://www.google.com https://*.doubleclick.net https://challenges.cloudflare.com",
  "frame-src 'self' https://vercel.live https://td.doubleclick.net https://challenges.cloudflare.com",
  "upgrade-insecure-requests",
].join("; ");

// Applied to all app pages and the contact API. Deliberately NOT applied to
// /api/proxy, which serves embeddable third-party HTML and manages its own
// headers — a strict CSP / frame-ancestors there would break the previews.
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=(), payment=(self), fullscreen=(self)",
  },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // Cross-origin isolation. COOP allows popups (e.g. OAuth/PayPal windows);
  // CORP stays 'cross-origin' because the app intentionally loads third-party
  // resources (Google Ads/Analytics, Vercel) and /api/proxy serves embeddable
  // content.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // hide the X-Powered-By: Next.js fingerprint
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        // Every route EXCEPT /api/proxy (negative lookahead).
        source: "/((?!api/proxy).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
