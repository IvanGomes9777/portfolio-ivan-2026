import type { Metadata } from "next";
import SubPageShell from "@/components/SubPageShell";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";

const BASE_URL = "https://portfolio-ivan-2026.vercel.app";

export const metadata: Metadata = {
  title: "Preise & Pakete",
  description:
    "Transparente Festpreise für deine Website: Starter ab 1.500 €, Standard ab 2.500 €, Premium ab 3.500 €. Flexible Zahlungsoptionen und Ratenzahlung möglich.",
  alternates: { canonical: `${BASE_URL}/preise` },
  openGraph: {
    title: "Webdesign Preise & Pakete | Ivan Gomes",
    description:
      "Klare Pakete als Richtwert: Starter, Standard und Premium — mit flexiblen Zahlungsoptionen. Der finale Preis je nach Umfang.",
    url: `${BASE_URL}/preise`,
    type: "website",
    locale: "de_DE",
  },
};

export default function PreisePage() {
  return (
    <SubPageShell>
      <h1 className="sr-only">Webdesign-Preise &amp; Pakete</h1>
      <div className="relative isolate">
        <Pricing />
      </div>
      <div id="kontakt" className="relative isolate">
        <CTA />
      </div>
    </SubPageShell>
  );
}
