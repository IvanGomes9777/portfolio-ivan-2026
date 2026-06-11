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
  // vercel.live: Vercel's preview comment / live feedback widget (preview
  // deployments only — script is not injected in production).
  // googletagmanager.com / google-analytics.com: Google Tag Manager loader +
  // any GA4/Ads tags fired through the container (script, tracking pixels,
  // measurement beacons, and the <noscript> fallback iframe).
  "script-src 'self' 'unsafe-inline' https://vercel.live https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self' data: https://vercel.live",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src 'self' https://vercel.live https://www.googletagmanager.com",
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
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "off" },
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
