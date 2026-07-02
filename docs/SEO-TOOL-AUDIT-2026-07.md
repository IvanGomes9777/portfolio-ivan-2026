# SEO-Tool-Audit (Seitenreport-Stil) — Juli 2026

Bewertung und Umsetzung der Punkte aus dem externen SEO-Tool-Audit.
Stand: 2. Juli 2026 · Branch `claude/website-optimization-issues-nbu901`

## Umgesetzt in diesem PR

| Audit-Punkt | Umsetzung |
|---|---|
| Es ist keine BaseURL gesetzt | `<base href="https://webdesignbyivan.de/">` wird gerendert — nur im Produktions-Deployment (`VERCEL_ENV === "production"`), damit Vercel-Previews nicht Assets/API-Calls gegen die Produktivdomain auflösen (`app/layout.tsx`) |
| Kein Copyright gesetzt | `<meta name="copyright" content="Ivan Vilar Gomes">` |
| Keine Audience gesetzt | `<meta name="audience" content="Alle">` |
| EXPIRES-Tag fehlt | `<meta name="expires" content="7 days">` |
| Meta-Element page-topic fehlt | `<meta name="page-topic" content="Webdesign, Webentwicklung, Dienstleistung">` |
| revisit-after fehlt | `<meta name="revisit-after" content="7 days">` |
| Zuviel Inline-CSS (107) | Statische Styles der dekorativen Hintergründe (Orbs, Aurora, PerspectiveGrid, FloatingPlanes) aus `style`-Attributen in CSS-Klassen (`.bg3d-*` in `app/globals.css`) verschoben: **107 → 69** Inline-Styles auf der Startseite |
| HTML-Code sehr groß (116.804 Bytes) | Durch die Inline-CSS-Auslagerung: **113,8 KB → 107,7 KB** (−6,1 KB unkomprimiert; die Styles standen doppelt im Dokument — im DOM und im RSC-Payload) |

Hinweis zu den neuen Meta-Tags: `copyright`, `audience`, `page-topic`,
`revisit-after` und `expires` haben für Google/Bing keine Ranking-Wirkung —
sie beheben ausschließlich die Warnungen deutscher SEO-Audit-Tools und
kosten nur wenige Bytes.

## Bereits vor dem Audit behoben (Audit-Stand war veraltet)

| Audit-Punkt | Status |
|---|---|
| Nutzen Sie Subheadlines (H2–H6) | Bereits vorhanden: Startseite rendert 1× H1, 6× H2, 7× H3 (`components/*.tsx`). Vermutlich lief das Audit gegen einen alten Stand oder hat client-gerenderte Inhalte nicht ausgewertet. |
| Kein Robots-Tag angegeben | Bereits vorhanden: `<meta name="robots" content="index, follow">` via Metadata-API (`app/layout.tsx`, seit PR #114) |

## Bewusst nicht umgesetzt — mit Begründung

### „Die Seite verwendet kein Google- oder Piwik-Analytics"

Die Site lädt den Google-Tag (gtag.js) **absichtlich erst nach aktiver
Einwilligung** (`components/CookieConsent.tsx`, Consent Mode v2). Ein
Audit-Crawler stimmt nie zu und sieht das Tag deshalb nicht — der Befund ist
ein False Positive. Analytics/Tracking ohne Einwilligung zu laden würde
§ 25 TDDDG / Art. 6 DSGVO verletzen und den dokumentierten
Datenschutz-Standard der Site (siehe `docs/AUDIT-2026-07-SECURITY-DATENSCHUTZ-SEO.md`)
zurückdrehen. **Empfehlung: so lassen.** Falls Web-Analyse gewünscht ist,
wäre eine cookielose, einwilligungsfreie Lösung (z. B. selbst gehostetes
Matomo ohne Cookies oder Vercel Analytics) der richtige Weg — als eigene,
bewusste Entscheidung.

### „Reduzieren Sie die Menge an internen Scripten (15)"

Die Script-Tags sind Next.js-Framework-Chunks (Code-Splitting) und
RSC-Payload-Segmente. Ihre Anzahl ist vom Framework vorgegeben; weniger,
dafür größere Bundles würden das Laden verlangsamen statt beschleunigen
(HTTP/2-Multiplexing macht viele kleine Chunks günstig). Eine Reduktion wäre
nur durch Entfernen von Funktionalität möglich.

### „Der gesamte Datentransfer beträgt 279.779 Bytes"

Der Wert ist unkomprimiert gemessen; ausgeliefert wird Brotli/Gzip-komprimiert
über Vercel + Cloudflare. Die größten Posten sind die Framework-Chunks
(React 19, Framer Motion) — die Site erreicht damit trotzdem 95+
Lighthouse-Performance (LCP-kritische Ressourcen sind optimiert: Fonts
preloaded, Bilder als WebP via `next/image`). Weitere Reduktion nur durch
Feature-Verzicht (Animationen).
