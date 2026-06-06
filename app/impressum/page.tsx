import type { Metadata } from "next";
import LegalLayout, { Section } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Impressum — Ivan · Webdesign & Entwicklung",
  description: "Anbieterkennzeichnung gemäß § 5 DDG.",
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum" subtitle="Angaben gemäß § 5 DDG">
      <Section title="Anbieter">
        <p>
          Ivan Vilar Gomes
          <br />
          Dingbänger Weg 436
          <br />
          48161 Münster
          <br />
          Deutschland
        </p>
      </Section>

      <Section title="Kontakt">
        <p>
          E-Mail:{" "}
          <a
            href="mailto:ivanvilargomes@gmail.com"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            ivanvilargomes@gmail.com
          </a>
          <br />
          Telefon: +49 176 60847103
        </p>
      </Section>

      <Section title="Umsatzsteuer">
        <p>
          Gemäß § 19 UStG wird auf den ausgewiesenen Rechnungsbeträgen keine
          Umsatzsteuer erhoben (Kleinunternehmerregelung).
        </p>
      </Section>

      <Section title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          Ivan Vilar Gomes
          <br />
          Anschrift wie unter Anbieter angegeben.
        </p>
      </Section>

      <Section title="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-soft)] hover:underline"
          >
            ec.europa.eu/consumers/odr
          </a>
          .
          <br />
          Meine E-Mail-Adresse findest du oben.
        </p>
      </Section>

      <Section title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
        <p>
          Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Section>

      <Section title="Haftung für Inhalte">
        <p>
          Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden entsprechender Rechtsverletzungen werde ich diese
          Inhalte umgehend entfernen.
        </p>
      </Section>

      <Section title="Haftung für Links">
        <p>
          Mein Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich.
        </p>
        <p>
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
          mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
          Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
          Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
          Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werde ich derartige Links
          umgehend entfernen.
        </p>
      </Section>

      <Section title="Urheberrecht">
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
        <p>
          Downloads und Kopien dieser Seite sind nur für den privaten, nicht
          kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite
          nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
          beachtet.
        </p>
      </Section>
    </LegalLayout>
  );
}
