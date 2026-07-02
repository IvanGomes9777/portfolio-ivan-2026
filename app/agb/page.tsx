import type { Metadata } from "next";
import LegalLayout, { Section } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "AGB",
  description:
    "Allgemeine Geschäftsbedingungen — Ivan Vilar Gomes, Freelance Web Developer & Designer aus Münster.",
  alternates: {
    canonical: "https://webdesignbyivan.de/agb",
  },
  robots: { index: true, follow: true },
};

export default function AgbPage() {
  return (
    <LegalLayout
      title="Allgemeine Geschäftsbedingungen"
      subtitle="Stand: Juni 2026"
    >
      <Section title="1. Geltungsbereich und Vertragspartner">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge
          über Web-Design- und Entwicklungsleistungen zwischen Ivan Vilar Gomes
          (nachfolgend „Anbieter“) und dem Auftraggeber. Das Angebot richtet
          sich in erster Linie an Unternehmer im Sinne des § 14 BGB
          (Gewerbetreibende, Selbständige und sonstige unternehmerisch tätige
          Auftraggeber).
        </p>
        <p>
          Schließt ein Verbraucher im Sinne des § 13 BGB einen Vertrag, gelten
          die zwingenden Verbraucherschutzvorschriften — insbesondere das
          Widerrufsrecht nach Abschnitt 5 — ergänzend und vorrangig.
          Abweichende Bedingungen des Auftraggebers werden nur wirksam, wenn der
          Anbieter ihnen ausdrücklich in Textform zustimmt.
        </p>
      </Section>

      <Section title="2. Leistungen und Angebot">
        <p>
          Der konkrete Leistungsumfang ergibt sich aus dem individuellen
          Angebot, das im Anschluss an das kostenlose Erstgespräch erstellt
          wird. Angaben auf der Website (z. B. zu Leistungspaketen und
          Zahlungsoptionen) sind unverbindlich und stellen kein bindendes
          Angebot dar. Ein Vertrag kommt erst mit der
          beidseitigen Bestätigung des individuellen Angebots in Textform
          zustande.
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
        <p>
          Ist der Auftraggeber Verbraucher und soll mit der Umsetzung bereits
          vor Ablauf der Widerrufsfrist (Abschnitt 5) begonnen werden, setzt der
          Beginn ein ausdrückliches Verlangen des Verbrauchers voraus. Die in
          Abschnitt 5 beschriebenen Folgen eines Widerrufs bleiben hiervon
          unberührt.
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

      <Section title="5. Widerrufsrecht für Verbraucher">
        <p>
          Verbrauchern (§ 13 BGB) steht bei im Fernabsatz oder außerhalb von
          Geschäftsräumen geschlossenen Verträgen das folgende gesetzliche
          Widerrufsrecht zu. Unternehmern (§ 14 BGB) steht kein Widerrufsrecht
          zu.
        </p>
        <p className="font-medium text-[var(--color-ink)]">Widerrufsbelehrung</p>
        <p>
          <strong>Widerrufsrecht.</strong> Sie haben das Recht, binnen vierzehn
          Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die
          Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Ivan Vilar Gomes,
          Dingbänger Weg 436, 48161 Münster, E-Mail:{" "}
          <a
            href="mailto:ivanvilargomes@gmail.com"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            ivanvilargomes@gmail.com
          </a>
          , Telefon: +49 176 60847103) mittels einer eindeutigen Erklärung
          (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren
          Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür
          das untenstehende Muster-Widerrufsformular verwenden, das jedoch nicht
          vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass
          Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf
          der Widerrufsfrist absenden.
        </p>
        <p>
          <strong>Folgen des Widerrufs.</strong> Wenn Sie diesen Vertrag
          widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten
          haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
          zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses
          Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir
          dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
          eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas
          anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
          Rückzahlung Entgelte berechnet. Haben Sie verlangt, dass die
          Leistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns
          einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem
          Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts
          hinsichtlich dieses Vertrags unterrichten, bereits erbrachten
          Leistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen
          Leistungen entspricht.
        </p>
        <p>
          <strong>Vorzeitiges Erlöschen.</strong> Das Widerrufsrecht erlischt
          bei einem Vertrag über die Erbringung von Dienstleistungen, wenn der
          Anbieter die Leistung vollständig erbracht hat und mit der Ausführung
          erst begonnen hat, nachdem der Verbraucher dazu seine ausdrückliche
          Zustimmung gegeben und gleichzeitig seine Kenntnis davon bestätigt hat,
          dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung durch
          den Anbieter verliert.
        </p>
        <p className="font-medium text-[var(--color-ink)]">
          Muster-Widerrufsformular
        </p>
        <p>
          (Wenn Sie den Vertrag widerrufen wollen, können Sie dieses Formular
          ausfüllen und an uns zurücksenden.)
        </p>
        <p>
          An Ivan Vilar Gomes, Dingbänger Weg 436, 48161 Münster, E-Mail:
          ivanvilargomes@gmail.com:
          <br />
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
          Vertrag über die Erbringung der folgenden Dienstleistung (*)
          <br />
          — Bestellt am (*)/erhalten am (*)
          <br />
          — Name des/der Verbraucher(s)
          <br />
          — Anschrift des/der Verbraucher(s)
          <br />
          — Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
          <br />
          — Datum
          <br />
          (*) Unzutreffendes streichen.
        </p>
      </Section>

      <Section title="6. Fertigstellung und Abnahme">
        <p>
          Nach Fertigstellung fordert der Anbieter den Auftraggeber zur Abnahme
          auf. Die Abnahme gilt als erfolgt, wenn der Auftraggeber sie nicht
          innerhalb einer vom Anbieter gesetzten angemessenen Frist unter Angabe
          mindestens eines Mangels verweigert (§ 640 Abs. 2 BGB). Ist der
          Auftraggeber Verbraucher, treten diese Rechtsfolgen nur ein, wenn der
          Anbieter zusammen mit der Aufforderung zur Abnahme in Textform auf die
          Folgen einer nicht erklärten oder ohne Angabe von Mängeln verweigerten
          Abnahme hingewiesen hat. Mängel sind in Textform anzuzeigen. Eine
          Abnahme liegt auch dann vor, wenn der Auftraggeber die Website
          uneingeschränkt und dauerhaft produktiv nutzt.
        </p>
      </Section>

      <Section title="7. Nutzungsrechte">
        <p>
          Mit vollständiger Bezahlung des vereinbarten Honorars erhält der
          Auftraggeber die zur vertragsgemäßen Nutzung erforderlichen
          Nutzungsrechte an den erstellten Werken. Rechte an eingesetzten
          Drittinhalten (z. B. Lizenzbilder, Schriften) richten sich nach den
          jeweiligen Lizenzbedingungen.
        </p>
      </Section>

      <Section title="8. Haftung">
        <p>
          Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit
          sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der
          Gesundheit. Bei einfacher Fahrlässigkeit haftet der Anbieter nur bei
          Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht), deren
          Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst
          ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig
          vertrauen darf; in diesem Fall ist die Haftung auf den
          vertragstypischen, vorhersehbaren Schaden begrenzt.
        </p>
        <p>
          Die Haftung nach dem Produkthaftungsgesetz sowie aus der Übernahme
          einer Garantie bleibt von den vorstehenden Beschränkungen unberührt.
        </p>
      </Section>

      <Section title="9. Schlussbestimmungen">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
          UN-Kaufrechts. Ist der Auftraggeber Kaufmann, juristische Person des
          öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist
          ausschließlicher Gerichtsstand für alle Streitigkeiten aus dem
          Vertragsverhältnis der Sitz des Anbieters; gegenüber Verbrauchern gilt
          diese Gerichtsstandsvereinbarung nicht.
        </p>
        <p>
          Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die
          Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der
          unwirksamen Bestimmung treten die gesetzlichen Vorschriften.
          Änderungen und Ergänzungen bedürfen der Textform.
        </p>
      </Section>
    </LegalLayout>
  );
}
