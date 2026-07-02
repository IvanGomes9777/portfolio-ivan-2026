# Offene Punkte nach dem Audit (Juli 2026)

Basiert auf dem Audit-Bericht `docs/AUDIT-2026-07-SECURITY-DATENSCHUTZ-SEO.md`.
Stand: 2. Juli 2026 · Produktivdomain: https://webdesignbyivan.de

## Bereits umgesetzt (PR „Deep-Audit", Branch `claude/repo-security-compliance-audit-xb8szm`)

- [x] Domain-Kanonisierung: alle URLs (metadataBase, Canonicals, Sitemap, robots-Host, JSON-LD, E-Mail-Assets) zeigen über `lib/site.ts` auf `webdesignbyivan.de`; 308-Redirect vercel.app → Custom Domain
- [x] Ungenutzten Endpoint `/api/proxy` entfernt inkl. CSP-Header-Ausnahme
- [x] Datenschutzerklärung Ziffer 10 an reale Screenshot-Vorschauen angepasst, Stand-Datum aktualisiert
- [x] AGB Ziffer 2: Verweis auf entfernte „Paketpreise" korrigiert
- [x] `public/llms.txt` angelegt (GEO)
- [x] `.gitignore` auf `.env*` erweitert

## Manuell zu erledigen (außerhalb des Codes)

| # | Prio | Aufgabe | Wo |
|---|------|---------|-----|
| 1 | Hoch | **Cloudflare AI-Crawler-Blockade aufheben:** Unter *AI Crawl Control / Bots* das Blockieren von GPTBot, ClaudeBot, Google-Extended, CCBot etc. sowie die „managed robots.txt" (Content Signals, `ai-train=no`) deaktivieren — oder bewusst nur Training verbieten und Zitieren erlauben. Ohne diesen Schritt ist die Site für ChatGPT/Perplexity unsichtbar und die `llms.txt` wirkungslos. | Cloudflare-Dashboard (webdesignbyivan.de) |
| 2 | Hoch | **PR mergen**, damit Domain-Fix & Co. in Produktion gehen | GitHub |
| 3 | Hoch | **Google Search Console:** Property für `webdesignbyivan.de` anlegen (falls fehlt) und `https://webdesignbyivan.de/sitemap.xml` neu einreichen | Search Console |
| 4 | Info | Resend-DPA-Abschluss einmal verifizieren; `ACAO: *` auf HTML-Antworten im Vercel-Projekt prüfen | Resend/Vercel-Dashboard |

## Optionale Code-Verbesserungen (niedrige Priorität)

| # | Aufgabe | Fundort | Aufwand |
|---|---------|---------|---------|
| 5 | `laptop_realistic.png` (296 KB) → WebP/AVIF; zentrale Bilder auf `next/image` umstellen | `public/`, Mockup-Komponenten | ~1 h |
| 6 | Nonce-basierte CSP statt `'unsafe-inline'` (Middleware) | `next.config.mjs` | ~2–4 h |
| 7 | `follow: false` auf den Rechtsseiten überdenken | `app/impressum`, `app/datenschutz`, `app/agb` | 10 min |
| 8 | Laufend: `npm audit` regelmäßig bzw. in CI verankern; Rate-Limit bei echtem Missbrauch auf Redis/Upstash umstellen | Prozess | laufend |

---

*Hinweis: Technische Prüfung, keine Rechtsberatung — Rechtstexte im Zweifel anwaltlich prüfen lassen.*
