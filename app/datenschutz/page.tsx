import type { Metadata } from "next";
import LegalLayout, { Section } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 DSGVO — DSGVO-konforme Datenschutzerklärung.",
  alternates: {
    canonical: "https://webdesignbyivan.de/datenschutz",
  },
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      subtitle="Stand: 2. Juli 2026"
    >
      <Section title="1. Verantwortlicher im Sinne der DSGVO">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p>
          Ivan Vilar Gomes
          <br />
          Dingbänger Weg 436
          <br />
          48161 Münster
          <br />
          E-Mail:{" "}
          <a
            href="mailto:ivanvilargomes@gmail.com"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            ivanvilargomes@gmail.com
          </a>
        </p>
      </Section>

      <Section title="2. Allgemeines zur Datenverarbeitung">
        <p>
          Der Schutz deiner personenbezogenen Daten ist mir wichtig. Diese
          Website ist so gestaltet, dass beim reinen Besuch{" "}
          <strong className="text-[var(--color-ink)]">
            keine nicht notwendigen Cookies
          </strong>{" "}
          gesetzt und keine Analyse- oder Tracking-Dienste geladen werden.
        </p>
        <p>
          Eine Ausnahme besteht ausschließlich dann, wenn du im Cookie-Banner
          aktiv einwilligst: In diesem Fall wird das Konversions-Tracking von
          Google Ads geladen (siehe Ziffer 8). Ohne deine Einwilligung findet{" "}
          <strong className="text-[var(--color-ink)]">
            kein Tracking und keine Profilbildung
          </strong>{" "}
          statt.
        </p>
      </Section>

      <Section title="3. Einwilligung, Cookies & Widerruf">
        <p>
          Sogenannte „notwendige" Speichervorgänge, die für den technischen
          Betrieb der Website erforderlich sind, erfolgen auf Grundlage von § 25
          Abs. 2 TDDDG ohne Einwilligung. Dazu zählt insbesondere die lokale
          Speicherung deiner Cookie-Entscheidung selbst, damit der Banner dir
          nicht bei jedem Besuch erneut angezeigt wird.
        </p>
        <p>
          Das Setzen bzw. Auslesen{" "}
          <strong className="text-[var(--color-ink)]">
            nicht notwendiger Cookies
          </strong>{" "}
          (Google Ads) erfolgt ausschließlich nach deiner ausdrücklichen
          Einwilligung im Cookie-Banner (§ 25 Abs. 1 TDDDG in Verbindung mit
          Art. 6 Abs. 1 lit. a DSGVO).
        </p>
        <p>
          Du kannst deine Einwilligung{" "}
          <strong className="text-[var(--color-ink)]">
            jederzeit mit Wirkung für die Zukunft widerrufen
          </strong>{" "}
          oder ändern — über den Link{" "}
          <em>„Cookie-Einstellungen"</em> im Seitenfuß. Die Rechtmäßigkeit der
          bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
        </p>
        <p className="text-sm text-[var(--color-ink-dim)]">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG
          (einwilligungsbedürftige Cookies); Art. 6 Abs. 1 lit. f DSGVO, § 25
          Abs. 2 TDDDG (notwendige Speicherung).
        </p>
      </Section>

      <Section title="4. Hosting">
        <p>
          Diese Website wird gehostet bei der Vercel Inc., 340 S Lemon Ave
          #4133, Walnut, CA 91789, USA. Sofern in der Hosting-Konfiguration
          eine EU-Region (z. B. Frankfurt) ausgewählt ist, erfolgt die
          Datenverarbeitung primär innerhalb der EU. Für etwaige Datentransfers
          in die USA gelten die Standardvertragsklauseln der EU-Kommission
          (Art. 46 Abs. 2 lit. c DSGVO) sowie das EU-US Data Privacy Framework.
        </p>
        <p>
          Datenschutzhinweise von Vercel:{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            vercel.com/legal/privacy-policy
          </a>
        </p>
        <p className="text-sm text-[var(--color-ink-dim)]">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an einer zuverlässigen und sicheren Bereitstellung der Website).
        </p>
      </Section>

      <Section title="5. Server-Logfiles">
        <p>
          Beim Aufruf dieser Website werden durch den Hosting-Provider
          automatisch technische Informationen in sogenannten Logfiles
          gespeichert:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>IP-Adresse des anfragenden Endgeräts</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>verwendeter Browser und Betriebssystem</li>
          <li>aufgerufene URL und Referrer-URL</li>
          <li>HTTP-Statuscode und übertragene Datenmenge</li>
        </ul>
        <p>
          Diese Daten werden zur Sicherstellung des technischen Betriebs, zur
          Fehleranalyse und zur Abwehr von Angriffen verarbeitet. Eine
          Zusammenführung dieser Daten mit anderen Datenquellen findet nicht
          statt.
        </p>
        <p className="text-sm text-[var(--color-ink-dim)]">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Speicherdauer: in der
          Regel wenige Tage, längstens 30 Tage.
        </p>
      </Section>

      <Section title="6. Kontaktformular">
        <p>
          Wenn du das Kontaktformular nutzt, werden die von dir eingegebenen
          Daten (Name, E-Mail-Adresse, optional Telefonnummer, Angaben zum
          Projekttyp und deine Nachricht) an meinen Server übermittelt
          und dort verarbeitet, um dir eine Anfrage-E-Mail zukommen zu lassen.
          Eine dauerhafte Speicherung der Formulardaten in einer Datenbank auf
          dieser Website findet nicht statt; die Daten werden ausschließlich zur
          Zustellung und Beantwortung deiner Anfrage verarbeitet.
        </p>
        <p>
          Zum Schutz vor Missbrauch (Spam) wird beim Absenden kurzfristig deine
          IP-Adresse verarbeitet (Begrenzung der Anfragezahl pro Zeitraum) und
          eine technische Prüfung der Anfrage-Herkunft durchgeführt.
        </p>
        <p>
          Für den E-Mail-Versand setze ich den Dienst{" "}
          <strong className="text-[var(--color-ink)]">Resend</strong> (Resend,
          Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA) als
          Auftragsverarbeiter im Sinne des Art. 28 DSGVO ein. Mit Resend besteht
          ein Auftragsverarbeitungsvertrag. Eine etwaige Übermittlung in die USA
          wird durch die Standardvertragsklauseln der EU-Kommission (Art. 46
          Abs. 2 lit. c DSGVO) abgesichert. Datenschutzhinweise von Resend:{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            resend.com/legal/privacy-policy
          </a>
          .
        </p>
        <p>
          Die übermittelten Daten werden so lange gespeichert, wie es zur
          Beantwortung deiner Anfrage erforderlich ist bzw. gesetzliche
          Aufbewahrungsfristen bestehen.
        </p>
        <p className="text-sm text-[var(--color-ink-dim)]">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
          Maßnahmen) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
          der Beantwortung von Anfragen sowie am Schutz vor Missbrauch).
        </p>
      </Section>

      <Section title="7. Kontaktaufnahme per WhatsApp, Telefon & E-Mail">
        <p>
          Auf der Website biete ich neben dem Formular auch die direkte
          Kontaktaufnahme per <strong className="text-[var(--color-ink)]">WhatsApp</strong>,
          Telefon und E-Mail an. Diese Schaltflächen sind reine Verlinkungen —
          es werden dabei keine Skripte von Dritten in die Website eingebunden.
        </p>
        <p>
          Wenn du den WhatsApp-Button nutzt, wirst du zum Dienst WhatsApp
          weitergeleitet und die Kommunikation läuft über die WhatsApp Ireland
          Ltd. bzw. die Meta Platforms, Inc. (USA). Es gelten dann deren
          Datenschutzbestimmungen:{" "}
          <a
            href="https://www.whatsapp.com/legal/privacy-policy-eea"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            whatsapp.com/legal/privacy-policy-eea
          </a>
          . Kontaktierst du mich per Telefon oder E-Mail, verarbeite ich die von
          dir übermittelten Angaben ausschließlich zur Bearbeitung deiner
          Anfrage.
        </p>
        <p className="text-sm text-[var(--color-ink-dim)]">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b und lit. f DSGVO. Die
          Entscheidung, diesen Kanal zu nutzen, triffst du selbst.
        </p>
      </Section>

      <Section title="8. Google Ads (Konversionsmessung)">
        <p>
          <strong className="text-[var(--color-ink)]">Nur nach deiner
          Einwilligung</strong> binde ich das Konversions-Tracking von Google
          Ads ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow
          Street, Dublin 4, Irland („Google").
        </p>
        <p>
          Der Dienst hilft mir zu erkennen, ob Besucher, die über eine
          Google-Werbeanzeige auf die Website gelangt sind, anschließend eine
          Anfrage senden (Konversion). Dazu wird nach deiner Einwilligung das
          Skript <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">gtag.js</code>{" "}
          von Google nachgeladen, es werden Cookies auf deinem Endgerät
          gespeichert und Daten (u. a. deine IP-Adresse, Informationen zum
          Browser sowie ein Konversionsereignis) an Google übermittelt und dort
          verarbeitet. Ich erhalte von Google ausschließlich anonymisierte,
          statistische Auswertungen und kann dich darüber nicht persönlich
          identifizieren.
        </p>
        <p>
          Eine Datenübermittlung an die Google LLC in die USA ist dabei nicht
          ausgeschlossen. Google ist unter dem EU-US Data Privacy Framework
          zertifiziert; ergänzend gelten die Standardvertragsklauseln der
          EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO).
        </p>
        <p>
          Du kannst deine Einwilligung jederzeit über die{" "}
          <em>„Cookie-Einstellungen"</em> im Seitenfuß mit Wirkung für die
          Zukunft widerrufen. Weitere Informationen zum Datenschutz bei Google:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            policies.google.com/privacy
          </a>
          .
        </p>
        <p className="text-sm text-[var(--color-ink-dim)]">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG
          (Einwilligung). Ohne Einwilligung wird dieser Dienst nicht geladen.
        </p>
      </Section>

      <Section title="9. Schriftarten (Self-hosted)">
        <p>
          Diese Website verwendet die Schriftarten „Inter" und „Space Grotesk".
          Diese werden{" "}
          <strong className="text-[var(--color-ink)]">
            ausschließlich von meinem eigenen Server
          </strong>{" "}
          ausgeliefert (via{" "}
          <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">
            next/font
          </code>
          ) und nicht von externen Anbietern wie Google Fonts geladen. Es
          findet{" "}
          <strong className="text-[var(--color-ink)]">
            keine Datenübertragung
          </strong>{" "}
          an Drittanbieter beim Laden der Schriftarten statt.
        </p>
      </Section>

      <Section title="10. Projekt-Vorschauen">
        <p>
          Im Bereich „Projekte" werden Vorschauen meiner bisherigen
          Webdesign-Projekte angezeigt. Diese Vorschauen sind statische
          Bildschirmfotos (Screenshots), die direkt von meiner Domain
          ausgeliefert werden.
        </p>
        <p>
          Das bedeutet: Beim reinen Anschauen einer Vorschau findet{" "}
          <strong className="text-[var(--color-ink)]">
            keine Verbindung
          </strong>{" "}
          von deinem Browser zu den Servern der Projekt-Domains statt.
        </p>
        <p>
          Erst wenn du auf die Schaltfläche{" "}
          <em>„Live öffnen"</em> klickst, wirst du in einem neuen Browser-Tab
          auf die jeweils verlinkte Seite weitergeleitet. Es gelten dann die
          Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
        <p className="text-sm text-[var(--color-ink-dim)]">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an der Darstellung eigener Referenzen).
        </p>
      </Section>

      <Section title="11. Eingesetzte Technologien">
        <p>
          Diese Website nutzt serverseitig oder als{" "}
          <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">
            npm
          </code>
          -Paket installierte Open-Source-Bibliotheken (u. a. Next.js, React,
          Framer Motion, Three.js, Lenis). Zur Laufzeit wird{" "}
          <strong className="text-[var(--color-ink)]">
            kein Drittanbieter-Skript nachgeladen
          </strong>
          {" "}— mit der einzigen Ausnahme des Google-Ads-Skripts, das
          ausschließlich nach deiner Einwilligung geladen wird (siehe Ziffer 8).
        </p>
      </Section>

      <Section title="12. Deine Rechte als betroffene Person">
        <p>
          Sofern personenbezogene Daten von dir verarbeitet werden, stehen dir
          nach DSGVO insbesondere folgende Rechte zu:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung („Recht auf Vergessenwerden", Art. 17 DSGVO)</li>
          <li>
            Einschränkung der Verarbeitung (Art. 18 DSGVO)
          </li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>
            Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)
          </li>
          <li>
            Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft
            (Art. 7 Abs. 3 DSGVO)
          </li>
          <li>
            Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)
          </li>
        </ul>
        <p>
          Zur Geltendmachung deiner Rechte genügt eine formlose Nachricht per
          E-Mail an{" "}
          <a
            href="mailto:ivanvilargomes@gmail.com"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            ivanvilargomes@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section title="13. Beschwerderecht bei der Aufsichtsbehörde">
        <p>
          Unbeschadet anderweitiger Rechtsbehelfe steht dir das Recht zu, dich
          jederzeit bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für
          mich als in Münster ansässige verantwortliche Stelle ist die
          folgende Behörde zuständig:
        </p>
        <p>
          <strong className="text-[var(--color-ink)]">
            Landesbeauftragte für Datenschutz und Informationsfreiheit
            Nordrhein-Westfalen
          </strong>
          <br />
          Kavalleriestraße 2–4
          <br />
          40213 Düsseldorf
          <br />
          Telefon: +49 211 38424-0
          <br />
          E-Mail:{" "}
          <a
            href="mailto:poststelle@ldi.nrw.de"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            poststelle@ldi.nrw.de
          </a>
          <br />
          Web:{" "}
          <a
            href="https://www.ldi.nrw.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            ldi.nrw.de
          </a>
        </p>
      </Section>

      <Section title="14. Aktualität und Änderung dieser Datenschutzerklärung">
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand{" "}
          <strong className="text-[var(--color-ink)]">2. Juli 2026</strong>.
          Durch Weiterentwicklung der Website oder geänderte gesetzliche bzw.
          behördliche Vorgaben kann es notwendig werden, diese Erklärung
          anzupassen. Die jeweils aktuelle Fassung ist stets unter dieser URL
          abrufbar.
        </p>
      </Section>
    </LegalLayout>
  );
}
