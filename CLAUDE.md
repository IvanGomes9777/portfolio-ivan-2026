# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

A single-page **marketing portfolio site** for Ivan Vilar Gomes, a freelance
web developer & designer based in Münster, Germany. The site sells website
packages (Starter / Standard / Premium) to local businesses, showcases demo
projects, and captures leads through a contact form.

The entire user-facing copy is in **German** — keep all visible text, form
labels, email content, and legal pages in German. Code, comments, commit
messages, and identifiers are in English/German as already present (comments
are mostly English, some domain terms stay German).

## Tech stack

- **Next.js 16** (App Router, Turbopack) — `app/` directory
- **React 19** + **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `app/globals.css`, no `tailwind.config.js`)
- **Framer Motion** (`framer-motion`) for animation
- **Lenis** for smooth scrolling
- **@react-three/fiber** + **three** for the WebGL hero shader / 3D backgrounds
- **Resend** for transactional email (contact form)
- **lucide-react** for icons
- Deployed on **Vercel**. Production URL: `https://portfolio-ivan-2026.vercel.app`

## Commands

```bash
npm run dev      # local dev server on http://localhost:3000 (Turbopack)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

There is **no test suite** and no CI test step — verify changes by running
`npm run build` (catches type errors) and checking the dev server visually.
Node 22+ is expected.

## Environment variables

Copy `.env.local.example` → `.env.local`. None are required to render the
site; they only affect the contact API:

- `RESEND_API_KEY` — required for the contact form to actually send mail. Without it the API returns a 503 (the rest of the site works fine).
- `RESEND_FROM` — optional custom from-address (defaults to Resend's onboarding sender).
- `ALLOWED_ORIGINS` — optional extra comma-separated origins allowed past the CSRF check (same-origin is always allowed).

Never hardcode secrets — read them from `process.env` inside the route only.

## Architecture & layout

```
app/
  layout.tsx          Root layout: fonts (next/font), <head> metadata, JSON-LD structured data
  page.tsx            Homepage — composes section components inside <HorizontalScroll>
  globals.css         Tailwind import + @theme design tokens + keyframes/utilities
  opengraph-image.tsx Dynamic OG image
  robots.ts / sitemap.ts   SEO route handlers
  icon.png / apple-icon.png   Favicons
  impressum/ datenschutz/ agb/   Legal pages (German), each a page.tsx using <LegalLayout>
  api/
    contact/route.ts  POST — validates + rate-limits + sends the lead email via Resend
    proxy/route.ts    GET  — same-origin proxy that embeds the live demo sites in iframes
components/           All UI; section components + shared primitives + backgrounds/
lib/                  Framework-free helpers (validation, csrf, rate-limit, motion, faq)
docs/                 Research notes (German legal-compliance reference) — not shipped
public/               Static images
```

### The homepage scroll model

`app/page.tsx` renders one `<HorizontalScroll>` with an array of `panels`. This
component (`components/HorizontalScroll.tsx`) is the heart of the page:

- **Desktop (`md+`)**: a tall sticky section drives a 3D "page-turn" transition between panels as you scroll vertically. Scroll progress is computed manually in a `requestAnimationFrame` loop and exposed per-panel via `PanelProgressContext`.
- **Mobile**: panels collapse into a plain stacked vertical layout (`md:hidden` fallback), and `<Footer>` renders.
- Anchor links (`<a href="#id">`) are intercepted and animated via Lenis; panel `id`s are the scroll targets.

Section components (Hero, Promise, Process, DemoProjects, ProjectShowcase,
Found, Fit, Pricing, FAQ, CTA) read their reveal progress with
`usePanelProgress()` from `components/PanelProgress.tsx`, which returns the
context value on desktop or a local `useScroll` fallback on mobile.

Smooth scrolling is set up globally in `components/SmoothScroll.tsx` (wraps the
app in `layout.tsx`); it stashes the Lenis instance on `window.__lenis` so
other components can call `scrollTo`. It honors `prefers-reduced-motion`.

## Conventions

- **Path alias**: import with `@/` (maps to repo root), e.g. `@/components/Hero`, `@/lib/faq`.
- **Client vs server**: section/interactive components start with `"use client"`. API routes set `runtime = "nodejs"` and `dynamic = "force-dynamic"`. Keep components server by default unless they need hooks/interactivity.
- **Styling**: Tailwind utility classes + CSS custom properties from the `@theme` block (e.g. `text-[var(--color-ink-soft)]`, `font-display`). The palette is a dark violet/ink theme — reuse the existing `--color-*` tokens and `--radius-*` rather than inventing new hex values. Custom keyframes/utilities live in `globals.css`.
- **Animation**: prefer the shared variants in `lib/motion.ts` (`fadeUp`, `fadeIn`, `stagger`, `scaleIn`, `easeOut`) for consistency.
- **Icons**: `lucide-react`.
- **Legal pages** use the shared `<LegalLayout>` wrapper.

## Important data invariants

- **FAQ** lives in `lib/faq.ts` as the single source of truth. It feeds both the visible `<FAQ>` section **and** the `FAQPage` JSON-LD in `app/layout.tsx`. Edit it in one place; structured data must always match visible content.
- **Pricing** appears in three coupled places that must stay consistent: the visible `<Pricing>` component, the `serviceSchema` OfferCatalog in `app/layout.tsx`, and the FAQ answer about cost. Update all three together when prices change.
- **SEO/GEO** is a core concern of this site. `app/layout.tsx` carries extensive metadata, keywords, and a `@graph` of JSON-LD (Person, LocalBusiness, WebSite, Service, FAQPage). When changing offerings, locality, or contact info, update the structured data too.
- **Demo project URLs**: the embeddable demo sites are allow-listed in `app/api/proxy/route.ts` (`ALLOWED_HOSTS`) and referenced in `components/DemoProjects.tsx` / `ProjectShowcase.tsx`. A demo can only be proxied/embedded if its host is in that set.

## Security model (don't weaken without reason)

This site is security-hardened; preserve these properties when editing:

- **CSP and security headers** are defined in `next.config.mjs` and applied to every route **except** `/api/proxy` (which serves third-party HTML and manages its own headers). Read the comments there before touching the CSP.
- **Contact API** (`app/api/contact/route.ts`) layers: same-origin CSRF check (`lib/csrf.ts`), in-memory rate limit of 5/min/IP (`lib/rate-limit.ts`), a hidden `company` honeypot field, server-side validation + sanitization (`lib/validation.ts`, the source of truth — all caps/format checks happen here), and HTML-escaping of all values in the email body. Error messages are generic; real causes are `console.error`'d server-side only.
- **Proxy API** (`app/api/proxy/route.ts`) only fetches hosts in `ALLOWED_HOSTS`, strips upstream CSP/`X-Frame-Options`, rewrites asset URLs back through itself, and rate-limits 120/min/IP. Adding a new demo means adding its host here.

## Working in this repo

- Match the existing file's style, comment density, and German/English split.
- Reuse design tokens and motion variants instead of duplicating values.
- After changes, run `npm run build` to catch type errors (strict TS, no emit).
- Keep visible copy in German; keep prices, FAQ, and structured data in sync.
