# Audit-Bericht: Sicherheit · Datenschutz/DSGVO · SEO · GEO

**Projekt:** Portfolio Ivan Gomes (Next.js 16, Vercel)
**Produktions-URLs:** https://webdesignbyivan.de (Custom Domain, hinter Cloudflare) · https://portfolio-ivan-2026.vercel.app (identisches Deployment)
**Audit-Datum:** 2. Juli 2026
**Prüfumfang:** Statische Code-Analyse des Repos, `npm audit`, Live-Prüfung beider Domains (HTTP-Header, robots.txt, sitemap.xml, Rechtsseiten, Kontakt-API, Proxy-Endpoint)

---

## Executive Summary

**Gesamtbewertung: Gut bis sehr gut — mit zwei strategischen Ausreißern.**

Die Codebasis ist sicherheitstechnisch überdurchschnittlich sauber: keine bekannten Schwachstellen in Abhängigkeiten, keine Secrets im Code oder in der Git-Historie, ein vorbildlich gehärtetes Kontaktformular (CSRF-Check, Rate-Limit, Honeypot, Header-Injection-Schutz, HTML-Escaping, generische Fehlermeldungen) und ein vollständiger Security-Header-Satz inkl. CSP, der live verifiziert wurde. Auch Impressum, Datenschutzerklärung und Cookie-Consent (Opt-in vor Google Ads, Consent Mode v2) sind auf einem Niveau, das viele Agentur-Websites nicht erreichen.

**Top-Risiken:**

1. **SEO (Hoch):** Die gesamte Site kanonisiert auf die falsche Domain. `metadataBase`, alle `canonical`-Tags, Sitemap und robots-`Host` zeigen auf `portfolio-ivan-2026.vercel.app`, obwohl die Produktivdomain `webdesignbyivan.de` live ist. Google wird angewiesen, die vercel.app-URL zu indexieren — die eigene Domain verschenkt damit ihr komplettes Ranking-Potenzial. Zusätzlich existiert keine Weiterleitung vercel.app → Custom Domain (Duplicate Content).
2. **GEO (Hoch):** Cloudflare blockiert auf der Produktivdomain per verwaltetem robots.txt sämtliche relevanten AI-Crawler (GPTBot, ClaudeBot, Google-Extended, CCBot u. a.) und signalisiert `ai-train=no`. Das steht in direktem Widerspruch zum beworbenen Leistungsversprechen „SEO & GEO optimiert“ — die Site ist für ChatGPT, Claude & Co. faktisch unsichtbar.
3. **Sicherheit (Mittel):** Der Endpoint `/api/proxy` ist live erreichbar und funktionsfähig, wird aber von keiner Komponente mehr genutzt — tote Angriffsfläche, die entfernt werden sollte. Die zugehörige Ziffer 10 der Datenschutzerklärung beschreibt zudem einen nicht mehr existierenden Sachverhalt.

---

## 1. Sicherheit

### 1.1 `npm audit` — keine bekannten Schwachstellen

- **Schweregrad:** Info (positiv)
- **Fundort:** `package.json`, `package-lock.json`
- **Beschreibung:** `npm audit` meldet **0 Schwachstellen** (0 critical / 0 high / 0 moderate / 0 low) bei 143 Paketen. Abhängigkeiten sind aktuell (Next 16, React 19, Resend 6).
- **Empfehlung:** Beibehalten; `npm audit` in CI oder als regelmäßige Routine verankern.

### 1.2 Keine Secrets im Repo oder in der Git-Historie

- **Schweregrad:** Info (positiv)
- **Fundort:** gesamtes Repo, `.env.local.example`, Git-Historie
- **Beschreibung:** Es wurden keine hartkodierten API-Keys gefunden. `RESEND_API_KEY` wird ausschließlich aus `process.env` gelesen (`app/api/contact/route.ts:72`). `.env.local.example` enthält nur den Platzhalter `re_`. Die Git-Historie (alle Commits) enthält keine echten `.env`-Dateien und keine `re_…`-Keys. Die Google-Ads-ID (`AW-18190212856`, `components/CookieConsent.tsx:18`) und das Conversion-Label sind öffentlich sichtbare Client-IDs — kein Geheimnis.
- **Empfehlung:** Keine Maßnahme nötig.

### 1.3 `.gitignore` deckt nacktes `.env` nicht ab

- **Schweregrad:** Niedrig
- **Fundort:** `.gitignore:4` (`.env*.local`)
- **Beschreibung:** Ignoriert werden nur `.env*.local`-Varianten. Eine versehentlich angelegte Datei `.env` oder `.env.production` würde committet werden.
- **Empfehlung:** Muster auf `.env*` erweitern und `!.env.local.example` (bzw. `!.env*.example`) explizit erlauben.

### 1.4 Kontakt-API: vorbildlich gehärtet

- **Schweregrad:** Info (positiv)
- **Fundort:** `app/api/contact/route.ts`, `lib/validation.ts`, `lib/csrf.ts`, `lib/rate-limit.ts`, `lib/contact-email.ts`
- **Beschreibung:** Alle klassischen Kontaktformular-Risiken sind adressiert:
  - **CSRF:** Origin/Referer-Prüfung (`lib/csrf.ts`); live verifiziert — POST ohne Origin sowie mit `Origin: https://evil.example` liefern beide `403`.
  - **Rate-Limiting:** 5 Requests/Minute/IP mit `Retry-After`-Header.
  - **Spam:** Honeypot-Feld `company`, das Bots gegenüber still „erfolgreich“ quittiert wird (`route.ts:60-62`).
  - **E-Mail-Header-Injection:** E-Mail/Telefon werden auf `\r\n` geprüft (`validation.ts:76-81`), Kontrollzeichen inkl. U+2028/U+2029 werden entfernt, alle Felder längenbegrenzt.
  - **HTML-Injection in die Mail:** alle Nutzereingaben laufen durch `escapeHtml()` (`lib/contact-email.ts:16-23`); `wunsch`/`auftraggeber` werden gegen Whitelists geprüft statt reflektiert.
  - **Fehler-Leakage:** Provider-/Serverfehler werden nur serverseitig geloggt, Clients erhalten generische deutsche Meldungen.
  - **Auth:** Für ein öffentliches Kontaktformular ist keine Authentifizierung nötig; der Endpoint löst ausschließlich eine Mail an den festen Empfänger aus.
- **Empfehlung:** Keine Maßnahme nötig. Optional (Info): Das In-Memory-Rate-Limit gilt pro Serverless-Instanz (im Code dokumentiert); bei tatsächlichem Missbrauch auf Upstash/Redis wechseln.

### 1.5 `/api/proxy`: aktiver, aber ungenutzter Endpoint (tote Angriffsfläche)

- **Schweregrad:** Mittel
- **Fundort:** `app/api/proxy/route.ts`; live: `https://webdesignbyivan.de/api/proxy?url=…` → HTTP 200
- **Beschreibung:** Der SSR-Proxy für eingebettete Projekt-Vorschauen wird von **keiner Komponente mehr referenziert** — `components/DemoProjects.tsx` und `components/ProjectShowcase.tsx` nutzen inzwischen statische Screenshots (`public/screenshots/*.webp`) plus externe Links. Der Endpoint ist aber weiterhin deployed und funktionsfähig (live getestet). Das SSRF-Risiko ist durch die Host-Allowlist (5 feste vercel.app-Hosts) gut begrenzt und ein Rate-Limit (120/min/IP) existiert. Restrisiken:
  - Bandbreiten-/Kostenverstärkung (jeder Request lädt fremde Ressourcen über das eigene Vercel-Konto).
  - Fremder HTML-Inhalt wird unter der eigenen Domain ausgeliefert, wobei CSP-/X-Frame-Options-Header des Upstreams **entfernt** und `Access-Control-Allow-Origin: *` gesetzt werden. Wird eines der gelisteten vercel.app-Projekte kompromittiert oder gelöscht (vercel.app-Subdomains können nach Löschung von Dritten neu registriert werden), liefert die eigene Domain fremden Schadinhalt aus.
  - Die CSP der Hauptseite wird für diese Route bewusst ausgenommen (`next.config.mjs`).
- **Empfehlung:** Route komplett entfernen (samt Ausnahme in `next.config.mjs` und Ziffer 10 der Datenschutzerklärung, siehe 2.4). Falls sie künftig wieder gebraucht wird: aus der Git-Historie wiederherstellbar.

### 1.6 CSP mit `'unsafe-inline'` für Skripte

- **Schweregrad:** Niedrig
- **Fundort:** `next.config.mjs:31` (script-src), live auf beiden Domains verifiziert
- **Beschreibung:** `script-src 'self' 'unsafe-inline' …` schwächt die CSP als XSS-Verteidigungslinie ab. Der Trade-off ist im Code sauber dokumentiert (Next.js-Inline-Bootstrap, kein `dangerouslySetInnerHTML` mit Nutzerinhalten, React-Auto-Escaping) — das Restrisiko ist real niedrig. Alle übrigen Header sind vorhanden und live bestätigt: HSTS (2 Jahre, preload), `X-Frame-Options: DENY` + `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `poweredByHeader: false`. Keine gefährlichen Einstellungen (`ignoreBuildErrors`, ESLint-Ignore, `images.remotePatterns`-Wildcards) vorhanden.
- **Empfehlung:** Mittelfristig auf Nonce-basierte CSP via Middleware umstellen (im Code bereits als „natural next upgrade“ notiert). Nach Entfernung von `/api/proxy` (1.5) die Header-Ausnahme `/((?!api/proxy).*)` auf `/(.*)` vereinfachen.

### 1.7 XSS / dangerouslySetInnerHTML / Redirects / Env-Exposition

- **Schweregrad:** Info (positiv)
- **Fundort:** `app/layout.tsx:263-266`; repo-weit
- **Beschreibung:** Einziger `dangerouslySetInnerHTML`-Einsatz ist das JSON-LD-Skript mit rein statischen, im Repo definierten Daten — kein Nutzerinput. Keine unsicheren Redirects. Externe Links mit `target="_blank"` tragen durchgehend `rel="noopener noreferrer"`. Kein Server-Secret wird über `NEXT_PUBLIC_*` an den Client geleakt (einzige Nutzung: `NEXT_PUBLIC_BASE_URL` — eine öffentliche URL).
- **Empfehlung:** Keine Maßnahme nötig.

### 1.8 `scripts/`-Verzeichnis und `.claude/launch.json`

- **Schweregrad:** Info
- **Fundort:** `scripts/screenshots.mjs`, `scripts/optimize-screenshots.mjs`, `.claude/launch.json`
- **Beschreibung:** Reine Build-Hilfen (Playwright-Screenshots der eigenen Demo-Projekte, Sharp-Optimierung). Keine Credentials, keine sensiblen Daten. `.claude/launch.json` verrät lediglich einen lokalen Windows-Pfad (`C:/Users/ivan/...`) — kosmetisch.
- **Empfehlung:** Optional `.claude/` in `.gitignore` aufnehmen.

### 1.9 Live-Beobachtung: `Access-Control-Allow-Origin: *` auf HTML-Seiten

- **Schweregrad:** Info
- **Fundort:** Live-Header beider Domains (nicht im Repo konfiguriert)
- **Beschreibung:** Die HTML-Antworten tragen `access-control-allow-origin: *`. Der Header stammt nicht aus `next.config.mjs`, sondern von der Plattform/CDN-Ebene. Für rein öffentliche Inhalte ohne Cookies/Sessions ist das unkritisch, aber unnötig.
- **Empfehlung:** In den Vercel-/Cloudflare-Einstellungen prüfen und entfernen, sofern nicht benötigt.

---

## 2. Datenschutz / DSGVO

### 2.1 Impressum (§ 5 DDG) — vollständig

- **Schweregrad:** Info (positiv)
- **Fundort:** `app/impressum/page.tsx`; live: https://webdesignbyivan.de/impressum (HTTP 200)
- **Beschreibung:** Enthält Name, ladungsfähige Anschrift, E-Mail **und** Telefonnummer (zweiter Kommunikationsweg), Hinweis auf Kleinunternehmerregelung (§ 19 UStG — daher keine USt-IdNr. erforderlich), Verantwortlicher nach § 18 Abs. 2 MStV, VSBG-Erklärung, Haftungs- und Urheberrechtshinweise. Aus dem Footer jeder Seite verlinkt.
- **Empfehlung:** Keine Maßnahme nötig.

### 2.2 Datenschutzerklärung — sehr vollständig

- **Schweregrad:** Info (positiv)
- **Fundort:** `app/datenschutz/page.tsx`; live: https://webdesignbyivan.de/datenschutz (HTTP 200)
- **Beschreibung:** Deckt ab: Verantwortlicher, allgemeine Grundsätze, Einwilligung/Widerruf (§ 25 TDDDG, Art. 7 Abs. 3 DSGVO), Hosting bei Vercel inkl. Drittlandtransfer (SCC + EU-US DPF), Server-Logfiles mit Speicherdauer, Kontaktformular inkl. **Resend als Auftragsverarbeiter (Art. 28 DSGVO)** mit US-Transfer-Absicherung (Art. 46 Abs. 2 lit. c), WhatsApp/Telefon/E-Mail-Kontakt, Google Ads Conversion-Tracking (nur nach Einwilligung, DPF/SCC), **self-hosted Fonts via `next/font`** (kein Google-Fonts-Problem nach LG München I, 3 O 17493/20), Betroffenenrechte Art. 15–21 + 77 DSGVO, zuständige Aufsichtsbehörde (LDI NRW) und Stand/Änderungsklausel. Rechtsgrundlagen sind pro Abschnitt benannt.
- **Empfehlung:** Verifizieren, dass mit Resend tatsächlich ein AV-Vertrag/DPA abgeschlossen wurde (Resend bietet ein Standard-DPA an) — die Erklärung behauptet dies bereits.

### 2.3 Cookie-Consent: sauberes Opt-in vor Google Ads

- **Schweregrad:** Info (positiv)
- **Fundort:** `components/CookieConsent.tsx`, `lib/consent.ts`, `lib/gtag.ts`, `components/ConsentSettingsLink.tsx`
- **Beschreibung:** Ohne Einwilligung wird **kein** Drittanbieter-Skript geladen und kein nicht-notwendiges Cookie gesetzt (nur `localStorage`-Eintrag `cookie-consent-v1` zur Speicherung der Entscheidung — nach § 25 Abs. 2 TDDDG zulässig). `gtag.js` wird erst nach aktivem „Akzeptieren“ injiziert, mit Consent Mode v2 (Default: alles `denied`). „Ablehnen“ ist gleichrangig gestaltet (kein Nudging), Widerruf jederzeit über „Cookie-Einstellungen“ im Footer (Art. 7 Abs. 3 DSGVO). Die Conversion (`trackContactConversion`) no-opt ohne Consent. Banner-Text nennt Zweck, Empfänger (Google, USA-Transfer) und verlinkt die Datenschutzerklärung.
- **Empfehlung:** Keine Maßnahme nötig. Kein weitergehender Cookie-Banner erforderlich, da sonst keine Cookies/Tracker existieren.

### 2.4 Datenschutzerklärung Ziffer 10 beschreibt entfernte Proxy-Vorschauen

- **Schweregrad:** Niedrig
- **Fundort:** `app/datenschutz/page.tsx:285-312` („Eingebettete Projekt-Vorschauen“ via `/api/proxy`)
- **Beschreibung:** Die Erklärung behauptet, Projekt-Vorschauen würden über einen serverseitigen Proxy geladen („keine direkte Verbindung … zu den Servern der Projekt-Domains“). Tatsächlich zeigen `DemoProjects`/`ProjectShowcase` heute statische Screenshots; „Live öffnen“/„Demo öffnen“ sind normale externe Links in neuen Tabs. Die Beschreibung ist damit veraltet (eine Über-Deklaration, kein Verstoß — aber die Erklärung soll die tatsächliche Verarbeitung abbilden, Art. 13 DSGVO).
- **Empfehlung:** Ziffer 10 umformulieren: statische Vorschaubilder, externe Verlinkung mit Hinweis auf die Datenschutzbestimmungen der Zielseiten. Idealerweise zusammen mit der Entfernung von `/api/proxy` (Finding 1.5).

### 2.5 Kontaktformular: Datenschutzhinweis vorhanden

- **Schweregrad:** Info (positiv)
- **Fundort:** `components/CTA.tsx:382-392`
- **Beschreibung:** Direkt unter dem Formular steht ein Zweckbindungshinweis mit Link zur Datenschutzerklärung. Eine Pflicht-Checkbox ist bei Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. b/f DSGVO nicht erforderlich (Einwilligung ist hier nicht die Rechtsgrundlage) — die Umsetzung ist korrekt. Daten gehen an Resend (USA) — in der Datenschutzerklärung transparent gemacht (siehe 2.2).
- **Empfehlung:** Keine Maßnahme nötig.

### 2.6 Private Wohnadresse und Geokoordinaten im JSON-LD

- **Schweregrad:** Info
- **Fundort:** `app/layout.tsx:98-105, 126-138` (Person- und LocalBusiness-Schema)
- **Beschreibung:** Straße, PLZ und Geokoordinaten werden maschinenlesbar publiziert. Da die Anschrift ohnehin im Impressum stehen muss, entsteht kein neues Rechtsrisiko — es erhöht aber die maschinelle Auffindbarkeit der Privatadresse (Scraping). Die Geokoordinaten sind das Stadtzentrum von Münster, nicht die Hausadresse — gut so.
- **Empfehlung:** Bewusst so lassen (Local-SEO-Vorteil) oder `streetAddress` im Schema weglassen; Abwägungssache.

---

## 3. Impressum / Rechtliches (AGB)

### 3.1 AGB vorhanden und für das Geschäftsmodell sinnvoll

- **Schweregrad:** Info (positiv)
- **Fundort:** `app/agb/page.tsx`; live: https://webdesignbyivan.de/agb (HTTP 200)
- **Beschreibung:** Die Site ist kein reines Portfolio, sondern vertreibt Webdesign-Dienstleistungen (Pakete, Zahlungsoptionen, Kontaktformular als Lead-Kanal) — AGB sind daher zweckmäßig, wenn auch nicht gesetzlich verpflichtend. Es wird nichts direkt online verkauft (kein Checkout), Verträge kommen erst per individuellem Angebot in Textform zustande. Verbraucher-Konstellation (§ 13 BGB) inkl. Widerrufsrecht ist berücksichtigt; das Formular fragt den Status Unternehmer/Verbraucher explizit ab.
- **Empfehlung:** Keine Maßnahme nötig. Hinweis: rechtliche Endprüfung von AGB gehört zu einem Anwalt — dieses Audit ist keine Rechtsberatung.

### 3.2 AGB-Text referenziert „Paketpreise auf der Website“, die entfernt wurden

- **Schweregrad:** Niedrig
- **Fundort:** `app/agb/page.tsx:42-43` („Angaben auf der Website (z. B. Paketpreise) sind unverbindlich…“)
- **Beschreibung:** Preise wurden laut Git-Historie (Commit #105) von der Website entfernt; die AGB-Formulierung läuft ins Leere.
- **Empfehlung:** Formulierung anpassen (z. B. „Angaben auf der Website zu Paketen und Leistungen sind unverbindlich“).

---

## 4. Cookies

- **Schweregrad:** Info (positiv)
- **Beschreibung:** Zustandsaufnahme: Ohne Einwilligung werden **keine Cookies** gesetzt; einziger Speicherzugriff ist der `localStorage`-Key `cookie-consent-v1` (notwendig, § 25 Abs. 2 TDDDG). Nach Einwilligung setzt Google Ads (gtag.js) Cookies — das ist korrekt einwilligungsbasiert umgesetzt (siehe 2.3). Der Banner ist damit **erforderlich und vorhanden**; wäre Google Ads nicht im Einsatz, wäre gar kein Banner nötig.
- **Empfehlung:** Bei künftiger Aufnahme weiterer Dienste (Analytics, Embeds) den Consent-Scope-Key versionieren (`cookie-consent-v2`) — der Mechanismus dafür ist in `lib/consent.ts` bereits vorbereitet.

---

## 5. SEO

### 5.1 Kanonisierung auf die falsche Domain (wichtigstes SEO-Finding)

- **Schweregrad:** Hoch
- **Fundort:** `app/layout.tsx:23` (`BASE_URL = "https://portfolio-ivan-2026.vercel.app"`), `app/sitemap.ts:3`, `app/robots.ts:12-13`, `app/faq/page.tsx:6`, `app/projekte/page.tsx:7`, `app/impressum/page.tsx:9`, `app/datenschutz/page.tsx:9`, `app/agb/page.tsx:9`, `lib/contact-email.ts:32`; live verifiziert: `<link rel="canonical" href="https://portfolio-ivan-2026.vercel.app"/>` wird **auf webdesignbyivan.de** ausgeliefert; Sitemap und robots-`Host`/`Sitemap` zeigen ebenfalls auf vercel.app.
- **Beschreibung:** Die Produktivdomain `webdesignbyivan.de` ist live (Cloudflare vor Vercel), aber sämtliche Canonical-Signale erklären die vercel.app-Preview-URL zur Hauptadresse. Konsequenz: Google indexiert bevorzugt `portfolio-ivan-2026.vercel.app`; die eigene Marke/Domain sammelt keine Rankings, Backlinks auf webdesignbyivan.de werden fehlgeleitet. Zusätzlich sind beide Domains ohne Redirect parallel erreichbar (Duplicate Content). Auch OG-URLs und das Logo in der Anfrage-Mail nutzen die vercel-URL.
- **Empfehlung (konkret):**
  1. `BASE_URL` überall auf `https://webdesignbyivan.de` umstellen — am besten einmalig zentral (z. B. `lib/site.ts` oder `NEXT_PUBLIC_BASE_URL` mit Fallback) statt 8 hartkodierter Kopien.
  2. In Vercel eine permanente Weiterleitung (308) von `portfolio-ivan-2026.vercel.app` auf `https://webdesignbyivan.de` konfigurieren (Domain als Redirect-Ziel setzen).
  3. Property für webdesignbyivan.de in der Google Search Console anlegen und die neue Sitemap einreichen.

### 5.2 Metadaten, Sitemap, robots, Struktur — sehr gut

- **Schweregrad:** Info (positiv)
- **Fundort:** `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`
- **Beschreibung:** Title-Template, aussagekräftige Descriptions, `metadataBase`, Open Graph (de_DE, Bild 1200×630), Twitter Card, `robots`-Meta, generiertes OG-Image, `sitemap.ts` mit allen 6 Routen, `robots.ts` (Disallow nur `/api/`), `<html lang="de">`, genau ein `<h1>` pro Seite (sichtbar im Hero bzw. `sr-only` via `PageShell`), saubere Alt-Attribute, semantische Struktur. JSON-LD siehe 6.2.
- **Empfehlung:** `keywords`-Meta (`layout.tsx:33-47`) ist für Google wirkungslos — kann bleiben oder entfallen. Auf den Rechtsseiten ist `robots: { follow: false }` gesetzt; das ist unnötig restriktiv (interne Links von dort schaden nicht) — optional auf `follow: true` ändern.

### 5.3 Performance-Details mit SEO-Bezug

- **Schweregrad:** Niedrig
- **Fundort:** `components/LaptopMockup.tsx:17`, `components/Navbar.tsx:108`, `components/DemoProjects.tsx`, `components/ProjectShowcase.tsx` (`<img>` statt `next/image`); `public/laptop_realistic.png` (296 KB PNG); `components/Hero.tsx:11` (three.js)
- **Beschreibung:** Screenshots sind bereits als WebP optimiert (≤ 228 KB) — gut. Es wird aber durchgängig `<img>` statt `next/image` verwendet (kein Lazy-Loading/Responsive-Srcset automatisch), und `laptop_realistic.png` ist ein 296-KB-PNG. Three.js/`@react-three/fiber` wird korrekt per `dynamic(..., { ssr: false })` nachgeladen, belastet das Client-Bundle aber dennoch spürbar.
- **Empfehlung:** `laptop_realistic.png` nach WebP/AVIF konvertieren; für Above-the-fold-Bilder `next/image` mit `priority` erwägen; Core Web Vitals nach Deployment mit PageSpeed Insights gegenprüfen.

---

## 6. GEO (Generative Engine Optimization)

### 6.1 Cloudflare blockiert alle AI-Crawler auf der Produktivdomain

- **Schweregrad:** Hoch (gemessen am eigenen Anspruch „SEO & GEO optimiert“)
- **Fundort:** Live: https://webdesignbyivan.de/robots.txt (Cloudflare „Managed content“ / Content Signals); Repo-`app/robots.ts` enthält diese Blöcke **nicht**
- **Beschreibung:** Cloudflare stellt der von Next.js generierten robots.txt einen verwalteten Block voran, der **GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended, Bytespider, Amazonbot und meta-externalagent komplett aussperrt** und `Content-Signal: ai-train=no, use=reference` setzt. Damit können ChatGPT, Claude, Gemini-Grounding & Co. die Site weder crawlen noch als Quelle zitieren — das Gegenteil dessen, was die Site ihren Kunden verkauft („SEO & GEO optimiert“, eigenes FAQ-Thema GEO). Diskrepanz Repo ↔ Live: der Code erlaubt alle Bots, Cloudflare überschreibt das.
- **Empfehlung:** Im Cloudflare-Dashboard unter *AI Crawl Control / Bots* das Blockieren von AI-Crawlern und die „managed robots.txt“ (Content Signals) deaktivieren — oder bewusst differenzieren (z. B. `ai-train=no`, aber `ai-input=yes` und GPTBot/ClaudeBot/PerplexityBot erlauben, damit AI-Suche zitieren kann, ohne Training zu erlauben).

### 6.2 Strukturierte Daten & maschinenlesbarer Inhalt — stark

- **Schweregrad:** Info (positiv)
- **Fundort:** `app/layout.tsx:90-253` (JSON-LD `@graph`), `lib/faq.ts`, live im HTML verifiziert
- **Beschreibung:** Person-, LocalBusiness/ProfessionalService- (inkl. areaServed, Öffnungszeiten, serviceType), WebSite-, Service- (mit OfferCatalog der 4 Pakete) und FAQPage-Schema aus derselben Datenquelle wie das sichtbare FAQ (Konsistenzgebot erfüllt). Die Entität „Ivan Vilar Gomes, Freelance Web Developer aus Münster“ ist klar definiert. Der Inhalt ist serverseitig gerendert (Text + JSON-LD im HTML-Quelltext nachweisbar, kein Canvas-only) — sehr gut für Answer Engines. Einziger Haken: Alle `@id`/URLs verweisen auf die vercel.app-Domain (siehe 5.1).
- **Empfehlung:** Nach dem Domain-Fix (5.1) sind die Schemas automatisch korrekt.

### 6.3 Kein `llms.txt`

- **Schweregrad:** Niedrig
- **Fundort:** `public/` (nicht vorhanden); live: https://webdesignbyivan.de/llms.txt → 404
- **Beschreibung:** Eine `llms.txt` (kompakte Markdown-Zusammenfassung: wer, was, Leistungen, Region, Kontakt, wichtigste URLs) fehlt. Der Standard ist jung, aber kostengünstig umzusetzen und passt zum GEO-Verkaufsargument.
- **Empfehlung:** `public/llms.txt` (optional zusätzlich `llms-full.txt`) mit Kurzprofil, Leistungspaketen und FAQ-Kernaussagen anlegen — erst sinnvoll, nachdem die AI-Crawler-Blockade (6.1) aufgehoben ist.

---

## 7. Live-Check: Abweichungen Repo ↔ Produktion

| Punkt | Repo | Live | Bewertung |
|---|---|---|---|
| Security-Header | vollständig definiert | identisch auf beiden Domains ausgeliefert | OK |
| robots.txt | alle Bots erlaubt, `/api/` disallow | Cloudflare blockiert zusätzlich alle AI-Crawler | **Abweichung — Finding 6.1** |
| Canonical/Sitemap | vercel.app-URLs | vercel.app-URLs auch auf webdesignbyivan.de | **Falsch konfiguriert — Finding 5.1** |
| `/api/proxy` | im Code vorhanden, ungenutzt | erreichbar (HTTP 200) | **Entfernen — Finding 1.5** |
| Kontakt-API-Schutz | CSRF/Rate-Limit im Code | 403 bei fehlendem/fremdem Origin bestätigt | OK |
| Rechtsseiten | /impressum, /datenschutz, /agb, /faq | alle HTTP 200 | OK |
| `ACAO: *` auf HTML | nicht konfiguriert | vorhanden (Plattform/CDN) | Info — Finding 1.9 |
| www-Subdomain | — | 307 → https://webdesignbyivan.de | OK |

---

## 8. Priorisierte Maßnahmenliste

| Prio | Schweregrad | Maßnahme | Fundort | Aufwand |
|---|---|---|---|---|
| 1 | Hoch | `BASE_URL` überall auf `https://webdesignbyivan.de` umstellen (zentralisieren); 308-Redirect vercel.app → Custom Domain in Vercel; Search-Console-Property + Sitemap neu einreichen | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, alle `page.tsx`-Canonicals, `lib/contact-email.ts` | ~1 h |
| 2 | Hoch | Cloudflare AI-Crawler-Blockade & managed robots.txt deaktivieren bzw. bewusst konfigurieren (GEO-Versprechen einlösen) | Cloudflare-Dashboard (webdesignbyivan.de) | ~15 min |
| 3 | Mittel | Ungenutzten Endpoint `/api/proxy` entfernen; CSP-Header-Ausnahme in `next.config.mjs` auflösen | `app/api/proxy/route.ts`, `next.config.mjs` | ~30 min |
| 4 | Niedrig | Datenschutzerklärung Ziffer 10 an reale Umsetzung anpassen (Screenshots + externe Links statt Proxy) | `app/datenschutz/page.tsx:285-312` | ~20 min |
| 5 | Niedrig | `.gitignore` auf `.env*` erweitern (+ Beispiel-Datei whitelisten) | `.gitignore` | 5 min |
| 6 | Niedrig | `llms.txt` in `public/` anlegen (nach Maßnahme 2) | `public/llms.txt` | ~30 min |
| 7 | Niedrig | AGB-Formulierung „Paketpreise auf der Website“ korrigieren | `app/agb/page.tsx:42` | 10 min |
| 8 | Niedrig | `laptop_realistic.png` → WebP/AVIF; `next/image` für zentrale Bilder erwägen | `public/`, Mockup-Komponenten | ~1 h |
| 9 | Niedrig | Nonce-basierte CSP statt `'unsafe-inline'` (Middleware) | `next.config.mjs` | ~2–4 h |
| 10 | Info | Resend-DPA-Abschluss verifizieren; `ACAO: *` auf HTML prüfen; `follow: false` auf Rechtsseiten überdenken; Rate-Limit ggf. auf Redis, falls Missbrauch auftritt | div. | laufend |

---

*Hinweis: Dieses Audit ist eine technische und strukturelle Prüfung, keine Rechtsberatung. Für die finale Absicherung von Impressum, Datenschutzerklärung und AGB empfiehlt sich eine anwaltliche Prüfung.*
