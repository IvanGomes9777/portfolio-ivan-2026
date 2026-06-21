# Compliance-Audit — portfolio-ivan-2026

**Stand:** 21. Juni 2026
**Geprüft gegen:** 4 Richtlinien-Dokumente
1. Rechtstexte & Website-Compliance (DE/DSGVO)
2. Responsive Design (Mobile-First)
3. SEO- & GEO-Projektrichtlinien
4. Web Security & GDPR/DSGVO Guide (Next.js)

> Kein Rechtsrat. Dieser Report dokumentiert den technischen Soll/Ist-Abgleich.
> Finale Rechtstexte gehören aus seriösem Generator/Anwalt.

---

## Zusammenfassung

Das Projekt war bereits auf hohem Stand (saubere Security-Header, self-hosted
Fonts, CSRF + Rate-Limit + Honeypot, umfangreiches JSON-LD-`@graph`, Impressum
nach § 5 DDG, eigenständige Datenschutzerklärung & AGB). Der **kritische Befund**
war ein Widerspruch: Google Ads (gtag.js) lud ungated ohne Einwilligung, während
die Datenschutzerklärung „kein Tracking / keine Cookies" zusicherte.

Behoben in diesem Durchgang (Vorschlag 1 + Quick-Wins). Größere offene Punkte
sind unten als „Offen / Empfehlung" markiert.

---

## 1. Rechtstexte & Compliance

| Punkt | Status | Anmerkung |
|---|---|---|
| Impressum § 5 DDG (nicht TMG) | ✅ | korrekt auf DDG umgestellt, § 18 Abs. 2 MStV vorhanden |
| Kein Verweis auf EU-OS-Plattform | ✅ | nicht vorhanden (zum 20.07.2025 eingestellt) |
| Kleinunternehmer-Hinweis § 19 UStG | ✅ | vorhanden |
| Datenschutzerklärung eigenständig, Art. 13 | ✅ | separat verlinkt, vollständige Betroffenenrechte + Aufsichtsbehörde |
| **DS-Erklärung bildet echte Tools ab** | ✅ **(behoben)** | Google-Ads-Abschnitt + US-Transfer + Einwilligung ergänzt; falsche Absolutaussage entfernt |
| **Consent vor nicht-essenziellem Laden (§ 25 TDDDG)** | ✅ **(behoben)** | gtag lädt erst nach Einwilligung; Banner mit gleichwertigem Ablehnen/Akzeptieren |
| Widerruf so einfach wie Erteilung | ✅ **(behoben)** | „Cookie-Einstellungen"-Link in Footer + LegalLinks öffnet Banner erneut |
| AGB (Werkvertrag, B2B) | ✅ | vorhanden unter /agb |
| AVV mit (Sub-)Dienstleistern | ⚠️ Offen | organisatorisch, kein Code: Vercel-DPA, GoDaddy-DPA, Resend-AVV abschließen/ablegen; AVV-Muster für Kundenprojekte (siehe Doku) |

## 2. Cookies & Consent (Detail)

- ✅ Aktive Einwilligung, kein Vorab-Setzen.
- ✅ „Akzeptieren" und „Ablehnen" gleichwertig (gleiche Größe/Position, Ebene 1) — VG Hannover 19.03.2025.
- ✅ Tracking lädt **erst** nach Consent (kein Skript im `<head>` vor Bestätigung).
- ✅ Widerruf jederzeit über Footer-Link.
- ⚠️ Granularität: aktuell nur eine nicht-essenzielle Kategorie (Google Ads), daher binäre Auswahl ausreichend. Bei späteren Diensten (Maps/Analytics) auf Kategorien erweitern.
- ⚠️ Consent-Log: aktuell nur lokale Speicherung der Entscheidung. Ein serverseitiges Log mit Zeitstempel/Version ist für eine Solo-Portfolio-Seite optional, für Nachweispflicht aber sauberer.

## 3. SEO / GEO

| Punkt | Status | Anmerkung |
|---|---|---|
| `<title>`/Description/OG/Twitter | ✅ | per Metadata, Template gepflegt |
| Self-referencing Canonical | ✅ | je Seite gesetzt |
| `<html lang="de">` | ✅ | |
| JSON-LD `@graph` (Person, LocalBusiness, WebSite, Service, FAQPage) | ✅ | sehr stark, mit `@id`-Verknüpfung & Offer-Preisen |
| SSR/SSG, statische Generierung | ✅ | alle indexierbaren Seiten static |
| Sitemap + robots | ✅ | |
| **KI-Crawler explizit erlaubt** | ✅ **(neu)** | GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended |
| **`llms.txt`** | ✅ **(neu)** | unter /llms.txt |
| `BreadcrumbList`-Schema | ⚠️ Offen | für Unterseiten (/preise, /projekte) noch sinnvoll |
| FAQ answer-first, 40–80 Wörter | ⚠️ Empfehlung | FAQ vorhanden; Längen periodisch gegen 40–80-Wörter-Regel prüfen |

## 4. Web Security

| Punkt | Status |
|---|---|
| Security Headers (CSP, HSTS, X-CTO, Referrer-Policy, Permissions-Policy, frame-ancestors) | ✅ stark |
| CSRF-Schutz | ✅ `lib/csrf.ts` |
| Rate Limiting | ✅ `lib/rate-limit.ts` |
| Honeypot / Spam-Schutz | ✅ in Contact-Flow |
| Input-Validierung/Sanitizing | ✅ `lib/validation.ts` |
| `poweredByHeader` aus | ✅ |
| CSP: `'unsafe-inline'` für script/style | ⚠️ bekannt/dokumentiert | Nonce-basierte CSP als nächster Upgrade-Schritt (Kommentar in `next.config.mjs`) |

## 5. Responsive Design

- ✅ Fluid-Typografie via `clamp()` (`globals.css`), `svh`-Höhen, `overflow-x: clip`.
- ✅ Mobile-First Tailwind v4.
- ⚠️ Empfehlung: bei künftigen Sektionen Container Queries als Default; Touch-Ziele ≥ 44 px konsequent prüfen.

---

## Geänderte/neue Dateien in diesem Durchgang

- `lib/consent.ts` — Consent-State (localStorage) + Events.
- `components/ConsentScripts.tsx` — gtag.js lädt erst nach Einwilligung.
- `components/CookieConsent.tsx` — § 25-konformes Banner.
- `components/CookieSettingsButton.tsx` — Widerruf/erneut öffnen.
- `components/Footer.tsx`, `components/LegalLinks.tsx` — Cookie-Einstellungen-Link.
- `app/layout.tsx` — ungated gtag entfernt, Consent-Loader + Banner eingebunden.
- `app/datenschutz/page.tsx` — Google Ads / US-Transfer / Einwilligung; falsche Absolutaussage korrigiert.
- `lib/gtag.ts` — `GOOGLE_ADS_ID` exportiert.
- `app/robots.ts` — KI-Crawler explizit erlaubt.
- `public/llms.txt` — neu.

## Offene Punkte (nicht im Code lösbar / bewusst nicht angefasst)

1. **AVV/DPA-Dokumente** mit Vercel, GoDaddy, Resend abschließen & ablegen; AVV-Muster für Kundenprojekte.
2. **Echte Produktiv-Domain**: Schema/Sitemap/llms.txt nutzen `portfolio-ivan-2026.vercel.app`. Bei Umzug auf `webdesignbyivan.de` zentral umstellen.
3. **BreadcrumbList-Schema** für Unterseiten ergänzen.
4. Optional **serverseitiges Consent-Log** für Nachweispflicht.
5. Optional **Nonce-basierte CSP** statt `'unsafe-inline'`.
