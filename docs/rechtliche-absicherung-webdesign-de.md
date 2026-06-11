# Rechtliche Absicherung für selbständige Webdesigner (Deutschland)

> **Stand der Recherche: Juni 2026.** Quellen: Gesetzestexte (gesetze-im-internet.de / dejure.org), EUR-Lex, IHK, Anwaltskanzleien (it-recht-kanzlei.de, e-recht24.de, händlerbund, dr-datenschutz.de), Verbraucherzentrale.
>
> ⚠️ **Kein Ersatz für anwaltliche Beratung.** Diese Übersicht ist eine sorgfältig recherchierte Arbeitsgrundlage. Vor produktivem Einsatz von Impressum, Datenschutzerklärung, AGB und Widerrufsbelehrung einen Fachanwalt (IT-/Medienrecht) prüfen lassen. Recht ändert sich — Datumsangaben und „beobachten"-Punkte vor jedem Projekt verifizieren.

Anwendungsfall: Einzelunternehmer / Kleinunternehmer (§ 19 UStG), der über eine eigene Website Website-Erstellung als Dienstleistung anbietet (Pakete, Anzahlung + Raten/Vorkasse, Projektstart nach Anzahlung), überwiegend B2B, teils auch Verbraucher.

---

## 0. Schnell-Checkliste (TL;DR)

- [ ] **Impressum** nach § 5 DDG (nicht mehr TMG!): Name, ladungsfähige Anschrift (kein Postfach), E-Mail **und** Telefon, USt-IdNr nur falls vorhanden.
- [ ] **Kein** OS-Plattform-Link mehr (seit 20.07.2025 abgeschaltet → Entfernen ist Pflicht, sonst Abmahnrisiko).
- [ ] **VSBG-Hinweis** behalten (Schlichtungs-Teilnahme ja/nein); Solo-Selbständige (≤ 10 MA) oft von § 36 befreit.
- [ ] **Datenschutzerklärung** nach Art. 13 DSGVO, in max. 2 Klicks erreichbar, vollständig.
- [ ] **Datenschutzerklärung muss zur echten Technik passen** — jeder eingesetzte Dienst (Maildienst, Hosting, Formular-Backend) muss benannt sein.
- [ ] **Cookie-Banner** nur bei nicht-notwendigen Cookies/Tracking (§ 25 TDDDG). Reine Portfolio-Seite ohne Tracking braucht keinen.
- [ ] **Google Fonts lokal** einbinden (next/font o. ä.), keine dynamische Einbindung.
- [ ] **TLS/SSL** für alle Formulare (Art. 32 DSGVO).
- [ ] **AVV (Art. 28 DSGVO)** mit jedem Auftragsverarbeiter (Hosting, Maildienst); US-Transfer per DPF/SCC absichern.
- [ ] **AGB**: Werkvertrag-Logik, zulässige Anzahlung, korrekte Abnahmeklausel (§ 640 Abs. 2), Textform statt Schriftform, saubere Haftungs- und Schlussklauseln.
- [ ] **Widerrufsbelehrung** für Verbraucher (B2C) inkl. Muster-Widerrufsformular + Regelung zum vorzeitigen Leistungsbeginn.
- [ ] **B2B-Beschränkung** (falls gewünscht): Hinweis + aktive Bestätigung der Unternehmereigenschaft, nicht nur eine Behauptung.

---

## 1. Impressum (§ 5 DDG / § 18 MStV)

| Punkt | Inhalt | Norm |
|-------|--------|------|
| Rechtsgrundlage | Seit **14.05.2024 § 5 DDG** (Digitale-Dienste-Gesetz), ersetzt § 5 TMG 1:1. **Verweise auf „§ 5 TMG" können selbst abmahnbar sein.** | § 5 DDG |
| Erreichbarkeit | „leicht erkennbar, unmittelbar erreichbar, ständig verfügbar" (≈ 2 Klicks, Bezeichnung „Impressum") | § 5 Abs. 1 DDG / § 18 Abs. 1 MStV |
| Name + Anschrift | Vor- und Nachname + **ladungsfähige** Postanschrift. **Postfach reicht nicht.** | § 5 Abs. 1 Nr. 1 DDG |
| Kontakt | E-Mail **Pflicht**; zweiter schneller Kanal (Telefon) praktisch erforderlich (EuGH C-298/07) | § 5 Abs. 1 Nr. 2 DDG |
| USt-IdNr | Nur angeben **wenn tatsächlich erteilt** | § 5 Abs. 1 Nr. 6 DDG, § 27a UStG |
| Steuernummer | **Nicht** ins Impressum (nicht erforderlich, unnötige Offenlegung) | — |
| Wirtschafts-IdNr (W-IdNr) | Nur falls **zugeteilt** (Rollout ab Ende 2024); keine Pflicht, extra zu beantragen | § 5 Abs. 1 Nr. 6 DDG, § 139c AO |
| Handelsregister / Aufsichtsbehörde | Nur falls einschlägig (Freiberufler i. d. R. nicht im HR) | § 5 Abs. 1 Nr. 3, 4 DDG |
| § 18 Abs. 2 MStV (Verantwortlicher) | Nur bei **journalistisch-redaktionellen** Inhalten (z. B. regelmäßiger Blog) | § 18 Abs. 2 MStV |

**⚠️ OS-Plattform — wichtige Änderung 2025:** Die EU-Online-Streitbeilegungsplattform wurde durch **Verordnung (EU) 2024/3228** zum **20.07.2025 abgeschaltet** (neue Beschwerden endeten 20.03.2025). Der früher verpflichtende OS-Link (`ec.europa.eu/consumers/odr`) **muss aus Impressum, AGB und E-Mail-Signaturen entfernt werden** — ein verbleibender toter Link ist jetzt selbst ein Abmahnrisiko (UWG, irreführend).

**VSBG bleibt:** Der Hinweis zur (Nicht-)Teilnahme an Verbraucherschlichtung (§ 36 VSBG) ist davon unberührt. Unternehmen mit **≤ 10 Beschäftigten** sind von der allgemeinen § 36-Pflicht befreit (die § 37-Pflicht im konkreten Streitfall kann bleiben).

**Sanktion:** Unvollständiges Impressum = Ordnungswidrigkeit (§ 21 DDG, Bußgeld bis 50.000 €) + Abmahnung durch Mitbewerber/Verbände. Gilt auch für Social-Media-Profile.

---

## 2. Datenschutz / DSGVO auf der eigenen Website

### 2.1 Datenschutzerklärung (Art. 13 DSGVO)
Praktisch **jede** Website braucht eine (schon wegen IP in Server-Logs). Pflichtinhalte:
- Identität/Kontakt des Verantwortlichen, ggf. DSB (Art. 13 Abs. 1 lit. a–b)
- Zwecke **und Rechtsgrundlage** jeder Verarbeitung (lit. c), berechtigte Interessen bei lit. f
- Empfänger / Auftragsverarbeiter, Drittlandtransfer (lit. e–f)
- Speicherdauer, Betroffenenrechte, **Beschwerderecht bei der Aufsichtsbehörde** (Art. 13 Abs. 2)
- In max. 2 Klicks erreichbar (Footer-Link).

> **🔑 Wichtigster Praxisfehler:** Die Datenschutzerklärung muss den **tatsächlichen** Datenfluss beschreiben. Wenn ein Kontaktformular Daten an einen Server/Maildienst (z. B. Resend, Formspree, eigenes Backend) sendet, darf dort **nicht** „öffnet nur dein Mailprogramm / keine serverseitige Verarbeitung" stehen. Jeder Dienst, der Daten erhält, muss als Auftragsverarbeiter benannt werden.

### 2.2 Cookie-Banner (§ 25 TDDDG, früher TTDSG)
- Seit **14.05.2024** heißt das Gesetz **TDDDG** (Inhalt von § 25 unverändert) — „§ 25 TDDDG" zitieren.
- **Einwilligung vor** dem Setzen/Auslesen nicht notwendiger Cookies/Tracking (§ 25 Abs. 1).
- Ausnahme nur für (a) reine Übertragung und (b) „unbedingt erforderliche" Cookies (§ 25 Abs. 2): Session, Warenkorb, Sicherheit.
- **Folge:** Portfolio-Seite **ohne** Tracking/Analytics/eingebettete Drittmedien braucht **keinen** Banner — nur Dokumentation in der Datenschutzerklärung. Bußgeld bis 300.000 € bei Verstoß.
- (Neu seit 04/2025: EinwV/PIMS — noch nicht praxisreif als Banner-Ersatz.)

### 2.3 Kontaktformular
- Rechtsgrundlage **Art. 6 Abs. 1 lit. b** (vorvertraglich) oder **lit. f** (berechtigtes Interesse). Keine Einwilligung nötig.
- **TLS/SSL Pflicht** (Art. 32 DSGVO) — unverschlüsselte Formulare sind abmahnbar.
- **Datensparsamkeit** (Art. 5 Abs. 1 lit. c): nur Pflichtfelder, die wirklich nötig sind.

### 2.4 Google Fonts (LG München I, 20.01.2022, Az. 3 O 17493/20)
- Dynamisches Laden von Google Fonts überträgt die **IP an Google/USA** → DSGVO-Verstoß, **100 € Schadensersatz** (Art. 82 DSGVO), kein berechtigtes Interesse (lit. f), weil lokales Hosten möglich.
- **Lösung:** Fonts **lokal** einbinden (Next.js: `next/font/google` self-hosted beim Build; sonst Font-Dateien herunterladen + selbst ausliefern).
- Massen-Abmahnwelle 2022/23 später teils als rechtsmissbräuchlich eingestuft (LG München, 30.03.2023, 4 O 13063/22) — Grundsatz bleibt.

### 2.5 US-Hosting / Drittlandtransfer (z. B. Vercel, Resend, Cloudflare)
- **AVV / DPA nach Art. 28 DSGVO** mit jedem Auftragsverarbeiter abschließen.
- US-Transfer: **EU-US Data Privacy Framework (DPF)** (Angemessenheitsbeschluss 07/2023) **oder Standardvertragsklauseln (SCC, Art. 46 DSGVO)**.
- **⚠️ Beobachten:** DPF im Sept. 2025 vom EU-Gericht bestätigt, aber **Revision beim EuGH anhängig (C-703/25 P)**. Empfehlung: **SCC als Fallback** behalten, DPF-Listung des Anbieters prüfen.
- Jeder client-seitige US-Dienst (Analytics, Maps, YouTube/Vimeo-Embeds, externe CDNs) = erneuter Transfer **und** ggf. § 25-TDDDG-Einwilligung.

---

## 3. AGB für Dienstleistungen (Website-Erstellung)

### 3.1 Vertragstyp
- Individuelle Website-Erstellung = **Werkvertrag** (§§ 631 ff. BGB), weil ein **Erfolg** geschuldet ist (BGH, 04.03.2010, III ZR 79/09 zum „Internet-System-Vertrag").
- Erstellung + Hosting + Pflege = **typengemischter Vertrag**, Schwerpunkt Werkvertragsrecht.
- Reine Wartungs-/SEO-Daueraufträge = eher **Dienstvertrag** (§ 611 BGB).
- Folge Werkvertrag: Abnahme (§ 640), Mängelrechte (§ 634), freies Kündigungsrecht des Bestellers (§ 648).

### 3.2 Anzahlung / Vorkasse (§ 307 BGB)
- Gesetzliches Leitbild ist **Zug-um-Zug** (§§ 320, 322) → vollständige Vorleistungspflicht in AGB kann unangemessen benachteiligen.
- **Teil-Anzahlung (z. B. 30–50 %) ist zulässig** und gut begründbar; **100 % Vorkasse gegenüber Verbrauchern** ist riskant (keine feste Prozentgrenze im Gesetz — Einzelfall).
- BGH-Billigung einer Vorleistungsklausel betraf **B2B** mit verbleibendem Druckmittel — nicht auf Verbraucher-Vollvorkasse übertragbar.
- „Projekt startet erst nach Anzahlung" als **Wahloption** (nicht erzwungene Vollvorkasse) ist unkritisch.

### 3.3 Abnahme / fiktive Abnahme (§ 640 BGB)
- Fiktive Abnahme (§ 640 Abs. 2 S. 1): nur nach **Aufforderung + angemessener Frist**, wenn Besteller nicht **unter Angabe mind. eines Mangels** verweigert.
- **Gegenüber Verbrauchern** (§ 640 Abs. 2 S. 2): Fiktion nur, wenn der Unternehmer mit der Aufforderung **in Textform** auf die Folgen hingewiesen hat.
- Reine „Schweigen = Abnahme nach X Tagen"-Klausel ohne diese Voraussetzungen ist angreifbar.

### 3.4 Klauselverbote (§§ 308, 309 BGB)
- **§ 309 Nr. 13: max. Textform** für Erklärungen/Anzeigen des Kunden (Mängel, Kündigung) — **keine Schriftform** verlangen (gilt für Verträge ab 01.10.2016).
- § 309 wirkt direkt nur ggü. Verbrauchern; ggü. Unternehmern mittelbar über § 307.

### 3.5 Haftungsbeschränkung
- **Unwirksam** (§ 309 Nr. 7): Ausschluss für Leben/Körper/Gesundheit (lit. a) und für Vorsatz/grobe Fahrlässigkeit (lit. b).
- **Kardinalpflichten** (wesentliche Vertragspflichten) dürfen bei leichter Fahrlässigkeit nicht ganz ausgeschlossen, nur auf den **vertragstypischen, vorhersehbaren Schaden begrenzt** werden.
- **Produkthaftungsgesetz und Garantien** ausdrücklich „unberührt" lassen — sonst Gesamtunwirksamkeit.

### 3.6 Nutzungsrechte / Urheberrecht
- Nutzungsrechte können einfach/ausschließlich und beschränkt eingeräumt werden (§ 31 UrhG); **Übergang erst mit vollständiger Zahlung** ist wirksam vereinbar.
- Ohne klare Regelung greift die **Zweckübertragungslehre** (§ 31 Abs. 5) → Umfang präzise definieren.
- Software/Code: §§ 69a ff. UrhG. **Drittinhalte** (Stockfotos, Fonts, Plugins) brauchen Lizenzen — sonst haftet der Webdesigner.

### 3.7 Einbeziehung, salvatorische Klausel, Gerichtsstand
- AGB-Einbeziehung B2C: ausdrücklicher Hinweis + zumutbare Kenntnisnahme + Einverständnis (§ 305 Abs. 2); B2B erleichtert (§ 310 Abs. 1).
- **Unwirksame Klausel → dispositives Recht** (§ 306), keine geltungserhaltende Reduktion. Reine Ersetzungs-/„soweit zulässig"-Klauseln können intransparent (§ 307 Abs. 1 S. 2) sein.
- **Gerichtsstand** in AGB nur **unter Kaufleuten** (§ 38 ZPO) — ggü. Verbrauchern unwirksam; ausdrücklich auf Kaufleute beschränken.

---

## 4. Widerrufsrecht für Verbraucher (Fernabsatz, Dienstleistung)

| Punkt | Regel | Norm |
|-------|-------|------|
| Wer | **Nur Verbraucher** (§ 13), **nicht** Unternehmer (§ 14) | § 312g BGB |
| Frist | 14 Tage | § 355 Abs. 2 |
| Fristbeginn (Dienstleistung) | Ab **Vertragsschluss** | § 355 Abs. 2 |
| Fehlende/falsche Belehrung | Frist bis **12 Monate + 14 Tage** | § 356 Abs. 3 |
| Vorzeitiges Erlöschen | Nur bei **vollständiger Leistung + ausdrücklicher Zustimmung + Kenntnis­bestätigung** des Verlusts | § 356 Abs. 4 |
| Wertersatz bei Widerruf nach Beginn | Nur wenn **ausdrückliches Verlangen** nach vorzeitigem Beginn **+ ordnungsgemäße Belehrung** | **§ 357a Abs. 2** (seit 28.05.2022; früher § 357 Abs. 8 — veraltet!) |
| Kein Verlangen/keine Belehrung | Bei Widerruf **kein** Wertersatz, trotz erbrachter Leistung | § 361 Abs. 1 |
| Pflichtangaben / Muster | Belehrung + **Muster-Widerrufsformular** | Art. 246a EGBGB (Anlage 1 + 2) |
| Individuelle Anfertigung | Ausnahme § 312g Abs. 2 Nr. 1 gilt nur für **Waren**, **nicht** für Dienstleistungen → maßgeschneiderte Website **nicht** ausgenommen | § 312g Abs. 2 Nr. 1 |

**Verknüpfung mit der Anzahlung:** Soll vor Ablauf der Widerrufsfrist gestartet werden, braucht es das **ausdrückliche Verlangen** des Verbrauchers; widerruft er, schuldet er Wertersatz nur bei korrekter Belehrung. Sonst: keine Vergütung trotz Arbeit.

**Kündigungsbutton (§ 312k):** nur bei online geschlossenen **Dauerschuldverhältnissen** (Hosting-/Wartungs-Abo), nicht beim einmaligen Erstellungsauftrag.

---

## 5. B2B sauber beschränken (§§ 13/14 BGB)

- Verbraucherstatus knüpft **objektiv** an den Zweck an und lässt sich **nicht per Website-Erklärung wegbedingen**. Bei natürlichen Personen gilt „**im Zweifel Verbraucher**" (BGH VIII ZR 7/09).
- Eine wirksame B2B-Beschränkung braucht (kumulativ, risikomindernd):
  1. **deutlicher Hinweis** auf jeder Angebotsseite („nur an Unternehmer/Gewerbe/Freiberufler"),
  2. **aktive Bestätigung** nahe dem Bestell-/Absende-Button (Checkbox „Ich bestelle als Unternehmer i. S. d. § 14 BGB"),
  3. **Abfrage objektiver Merkmale** (Firma, USt-ID).
- **Grenzen:** Firmenadresse oder fehlende USt allein reichen nicht. Der BGH verwirft starre Schemata — es zählt die Gesamtwürdigung.
- **Folge falscher Einordnung:** echter Verbraucher behält Widerrufsrecht (s. 4); zusätzlich greifen Preisangaben (Endpreis inkl. USt) und **Button-Lösung § 312j** (B2C).

---

## 6. Typische Abmahnfallen für Webdesigner

| Falle | Norm / Fundstelle |
|-------|-------------------|
| Fehlendes/falsches Impressum (inkl. „§ 5 TMG" statt DDG) | § 5 DDG, § 21 DDG |
| Toter OS-Plattform-Link nach 20.07.2025 | VO (EU) 2024/3228, UWG |
| Fehlende/unvollständige Datenschutzerklärung | Art. 13 DSGVO (BGH 27.03.2025: DSGVO-Verstöße über UWG verfolgbar) |
| Google Fonts dynamisch geladen | LG München I, 3 O 17493/20 |
| Kontaktformular ohne TLS/SSL | Art. 32 DSGVO |
| Nicht-notwendige Cookies ohne Consent | § 25 TDDDG |
| Fehlende/falsche Widerrufsbelehrung (B2C) | §§ 312g, 355, 356 BGB |
| Button ohne „zahlungspflichtig bestellen" (B2C) | § 312j Abs. 3/4 BGB (Vertrag unwirksam!) |
| Bilder/Fonts/Stockfotos ohne Lizenz | §§ 97, 13, 69a ff. UrhG |
| Newsletter/Werbung ohne Einwilligung | § 7 Abs. 2/3 UWG (Double-Opt-In als Nachweis) |

**Wer darf abmahnen** (Gesetz zur Stärkung des fairen Wettbewerbs, ab 01.12.2021, § 8 UWG): Mitbewerber nur bei nicht unerheblichem Vertrieb; Verbände nur als „qualifizierte Wirtschaftsverbände" (Liste BfJ). **§ 13 Abs. 4 UWG:** kein Aufwendungsersatz für Mitbewerber bei Informations-/Kennzeichnungs- und DSGVO-Verstößen von Unternehmen < 250 Beschäftigten (gegen Massenabmahnungen).

---

## 7. Quellen

**Gesetze:** §§ 5, 21 DDG; § 18 MStV; §§ 13, 14, 305, 306, 307, 308, 309, 312g, 312j, 312k, 355, 356, 357a, 361, 631, 640, 648 BGB; Art. 246a EGBGB; §§ 31, 69a ff., 97 UrhG; § 38 ZPO; § 7, § 8, § 13 UWG; Art. 5, 6, 13, 28, 32, 44 ff., 82 DSGVO; § 25 TDDDG; § 27a UStG; § 139c AO; VO (EU) 2024/3228.

**Rechtsprechung:** BGH III ZR 79/09 (Werkvertrag); BGH VIII ZR 7/09 („im Zweifel Verbraucher"); BGH 27.03.2025 (DSGVO über UWG); LG München I 3 O 17493/20 (Google Fonts).

**Praxisquellen:** gesetze-im-internet.de, dejure.org, eur-lex.europa.eu, it-recht-kanzlei.de, e-recht24.de, haendlerbund.de, dr-datenschutz.de, IHK (Chemnitz/Osnabrück/Düsseldorf/Pfalz), Verbraucherzentrale, vercel.com/legal/dpa.

---

*Erstellt als wiederverwendbare Arbeitsgrundlage. Vor jedem Einsatz: Datumsangaben und „beobachten"-Punkte (insb. DPF-Status) erneut prüfen. Keine Rechtsberatung.*
