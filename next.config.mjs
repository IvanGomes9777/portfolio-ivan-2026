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
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self'",
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
