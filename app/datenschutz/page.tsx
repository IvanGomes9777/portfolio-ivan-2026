import type { Metadata } from "next";
import LegalLayout, { Section, Sub } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 DSGVO — DSGVO-konforme Datenschutzerklärung.",
  alternates: {
    canonical: "https://portfolio-ivan-2026.vercel.app/datenschutz",
  },
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      subtitle="Stand: 6. Juni 2026"
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
          Diese Website verarbeitet personenbezogene Daten nur, soweit dies zur
          Bereitstellung der Website und zur Beantwortung deiner Anfragen
          erforderlich ist. Es findet{" "}
          <strong className="text-[var(--color-ink)]">kein Tracking</strong>,{" "}
          <strong className="text-[var(--color-ink)]">keine Analytics</strong>{" "}
          und{" "}
          <strong className="text-[var(--color-ink)]">
            keine Profilbildung
          </strong>{" "}
          statt. Es werden{" "}
          <strong className="text-[var(--color-ink)]">keine Cookies</strong>{" "}
          gesetzt und keine Daten in deinem Browser-Speicher abgelegt.
        </p>
      </Section>

      <Section title="3. Hosting">
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

      <Section title="4. Server-Logfiles">
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

      <Section title="5. Kontaktaufnahme">
        <p>
          Das Kontaktformular auf dieser Website öffnet beim Absenden lediglich
          dein E-Mail-Programm mit einer vorausgefüllten Nachricht (mailto:).
          Es findet{" "}
          <strong className="text-[var(--color-ink)]">
            keine serverseitige Speicherung
          </strong>{" "}
          der eingegebenen Daten auf dieser Website statt.
        </p>
        <p>
          Wenn du mir per E-Mail schreibst (direkt oder über das Formular),
          werden die von dir freiwillig übermittelten Daten (Name, E-Mail,
          Nachricht) ausschließlich zur Bearbeitung deiner Anfrage verwendet
          und so lange gespeichert, wie es zur Beantwortung erforderlich ist
          bzw. gesetzliche Aufbewahrungsfristen bestehen.
        </p>
        <p className="text-sm text-[var(--color-ink-dim)]">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
          Maßnahmen) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
          der Beantwortung von Anfragen).
        </p>
      </Section>

      <Section title="6. Schriftarten (Self-hosted)">
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

      <Section title="7. Eingebettete Projekt-Vorschauen">
        <p>
          Im Bereich „Projekte" werden Vorschauen meiner bisherigen
          Webdesign-Projekte angezeigt. Diese Vorschauen werden über einen
          eigenen serverseitigen Proxy (
          <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">
            /api/proxy
          </code>
          ) geladen und direkt von meiner Domain ausgeliefert.
        </p>
        <p>
          Das bedeutet: Beim reinen Anschauen einer Vorschau findet{" "}
          <strong className="text-[var(--color-ink)]">
            keine direkte Verbindung
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

      <Section title="8. Eingesetzte Technologien">
        <p>
          Diese Website nutzt ausschließlich serverseitig oder als{" "}
          <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">
            npm
          </code>
          -Paket installierte Open-Source-Bibliotheken (u. a. Next.js, React,
          Framer Motion, Three.js, Lenis). Es werden{" "}
          <strong className="text-[var(--color-ink)]">
            keine externen CDNs
          </strong>{" "}
          oder Drittanbieter-Skripte zur Laufzeit nachgeladen.
        </p>
      </Section>

      <Section title="9. Deine Rechte als betroffene Person">
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

      <Section title="10. Beschwerderecht bei der Aufsichtsbehörde">
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

      <Section title="11. Aktualität und Änderung dieser Datenschutzerklärung">
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand{" "}
          <strong className="text-[var(--color-ink)]">6. Juni 2026</strong>.
          Durch Weiterentwicklung der Website oder geänderte gesetzliche bzw.
          behördliche Vorgaben kann es notwendig werden, diese Erklärung
          anzupassen. Die jeweils aktuelle Fassung ist stets unter dieser URL
          abrufbar.
        </p>
      </Section>
    </LegalLayout>
  );
}
