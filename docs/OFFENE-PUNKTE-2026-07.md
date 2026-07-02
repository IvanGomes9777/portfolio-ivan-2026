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
- [x] **PR #113 gemerged** (2. Juli 2026) — Domain-Fix & Co. sind in Produktion (ehem. Punkt 2)
- [x] Punkt 5: `laptop_realistic.png` (296 KB) → `laptop_realistic.webp` (13 KB, 2000 px), `LaptopMockup` auf `next/image` umgestellt
- [x] Punkt 7: Rechtsseiten auf `robots: { index: true, follow: true }` umgestellt
- [x] Punkt 8 (teilweise): CI-Workflow `.github/workflows/ci.yml` mit `npm audit --audit-level=high` (bei Push/PR + wöchentlich), Typecheck und Build

## Manuell zu erledigen (außerhalb des Codes)

| # | Prio | Aufgabe | Wo |
|---|------|---------|-----|
| 1 | Hoch | **Cloudflare AI-Crawler-Blockade aufheben:** Unter *AI Crawl Control / Bots* das Blockieren von GPTBot, ClaudeBot, Google-Extended, CCBot etc. sowie die „managed robots.txt" (Content Signals, `ai-train=no`) deaktivieren — oder bewusst nur Training verbieten und Zitieren erlauben. Ohne diesen Schritt ist die Site für ChatGPT/Perplexity unsichtbar und die `llms.txt` wirkungslos. | Cloudflare-Dashboard (webdesignbyivan.de) |
| 3 | Hoch | **Google Search Console:** Property für `webdesignbyivan.de` anlegen (falls fehlt) und `https://webdesignbyivan.de/sitemap.xml` neu einreichen | Search Console |
| 4 | Info | Resend-DPA-Abschluss einmal verifizieren; `ACAO: *` auf HTML-Antworten im Vercel-Projekt prüfen | Resend/Vercel-Dashboard |

## Offene optionale Code-Verbesserungen (niedrige Priorität)

| # | Aufgabe | Fundort | Aufwand |
|---|---------|---------|---------|
| 6 | Nonce-basierte CSP statt `'unsafe-inline'` (Middleware). **Bewusst zurückgestellt:** Nonces erzwingen in Next.js dynamisches Rendering pro Request — aktuell sind alle Inhaltsseiten statisch vorgerendert. Der Performance-/SEO-Nachteil überwiegt derzeit das geringe Rest-XSS-Risiko (kein User-Content, kein `dangerouslySetInnerHTML`). Neu bewerten, falls die Site ohnehin auf dynamisches Rendering wechselt. | `next.config.mjs` | ~2–4 h |
| 8b | Rate-Limit bei echtem Missbrauch auf Redis/Upstash umstellen | `app/api/contact` | bei Bedarf |

---

*Hinweis: Technische Prüfung, keine Rechtsberatung — Rechtstexte im Zweifel anwaltlich prüfen lassen.*
