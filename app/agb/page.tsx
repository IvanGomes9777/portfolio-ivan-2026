import type { Metadata } from "next";
import LegalLayout, { Section } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "AGB",
  description:
    "Allgemeine Geschäftsbedingungen — Ivan Vilar Gomes, Freelance Web Developer & Designer aus Münster.",
  alternates: {
    canonical: "https://portfolio-ivan-2026.vercel.app/agb",
  },
  robots: { index: true, follow: false },
};

export default function AgbPage() {
  return (
    <LegalLayout
      title="Allgemeine Geschäftsbedingungen"
      subtitle="Stand: Juni 2026"
    >
      <Section title="1. Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge
          über Web-Design- und Entwicklungsleistungen zwischen Ivan Vilar Gomes
          (nachfolgend „Anbieter“) und dem Auftraggeber. Abweichende Bedingungen
          des Auftraggebers werden nur wirksam, wenn der Anbieter ihnen
          ausdrücklich schriftlich zustimmt.
        </p>
      </Section>

      <Section title="2. Leistungen und Angebot">
        <p>
          Der konkrete Leistungsumfang ergibt sich aus dem individuellen
          Angebot, das im Anschluss an das kostenlose Erstgespräch erstellt
          wird. Angaben auf der Website (z. B. Paketpreise) sind unverbindlich
          und stellen kein bindendes Angebot dar. Ein Vertrag kommt erst mit der
          beidseitigen Bestätigung des individuellen Angebots zustande.
        </p>
      </Section>

      <Section title="3. Preise, Zahlung und Anzahlung">
        <p>
          Es gelten die im individuellen Angebot vereinbarten Preise. Zur
          Auswahl stehen flexible Zahlungsoptionen: 30 % Anzahlung plus 6
          monatliche Raten, die volle Zahlung sofort ohne Gebühren oder die
          Zahlung in 2 monatlichen Raten.
        </p>
        <p>
          <strong>
            Unabhängig von der gewählten Zahlungsoption wird das Projekt erst
            nach Eingang einer Anzahlung gestartet.
          </strong>{" "}
          Der Eingang der Anzahlung ist die Voraussetzung dafür, dass mit der
          Umsetzung begonnen wird. Gemäß § 19 UStG (Kleinunternehmerregelung)
          wird keine Umsatzsteuer ausgewiesen.
        </p>
      </Section>

      <Section title="4. Mitwirkung des Auftraggebers">
        <p>
          Der Auftraggeber stellt alle für die Umsetzung erforderlichen Inhalte
          (Texte, Bilder, Logos, Zugänge) rechtzeitig und in geeigneter Form
          bereit. Verzögerungen, die auf fehlende Mitwirkung zurückzuführen
          sind, verlängern vereinbarte Fristen entsprechend.
        </p>
      </Section>

      <Section title="5. Fertigstellung und Abnahme">
        <p>
          Nach Fertigstellung wird dem Auftraggeber die Leistung zur Abnahme
          vorgelegt. Die Abnahme gilt als erfolgt, wenn der Auftraggeber nicht
          innerhalb von 14 Tagen schriftlich konkrete Mängel anzeigt oder die
          Website produktiv nutzt.
        </p>
      </Section>

      <Section title="6. Nutzungsrechte">
        <p>
          Mit vollständiger Bezahlung des vereinbarten Honorars erhält der
          Auftraggeber die zur vertragsgemäßen Nutzung erforderlichen
          Nutzungsrechte an den erstellten Werken. Rechte an eingesetzten
          Drittinhalten (z. B. Lizenzbilder, Schriften) richten sich nach den
          jeweiligen Lizenzbedingungen.
        </p>
      </Section>

      <Section title="7. Haftung">
        <p>
          Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit
          sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der
          Gesundheit. Bei einfacher Fahrlässigkeit haftet der Anbieter nur bei
          Verletzung einer wesentlichen Vertragspflicht und begrenzt auf den
          vertragstypischen, vorhersehbaren Schaden.
        </p>
      </Section>

      <Section title="8. Schlussbestimmungen">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine
          Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der
          übrigen Bestimmungen unberührt. Änderungen und Ergänzungen bedürfen
          der Textform.
        </p>
      </Section>
    </LegalLayout>
  );
}
