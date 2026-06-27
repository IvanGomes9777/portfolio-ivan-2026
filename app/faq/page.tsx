import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import PageShell from "@/components/PageShell";

const BASE_URL = "https://portfolio-ivan-2026.vercel.app";

export const metadata: Metadata = {
  title: "FAQ – Häufige Fragen",
  description:
    "Antworten auf die häufigsten Fragen rund um Webdesign & Entwicklung: Ablauf, Lieferzeit, Zahlungsmöglichkeiten, DSGVO, SEO & GEO und mehr.",
  alternates: { canonical: `${BASE_URL}/faq` },
  openGraph: {
    title: "FAQ – Häufige Fragen | Ivan Gomes",
    description:
      "Die wichtigsten Antworten auf einen Blick — von Ablauf und Zahlung bis Datenschutz und Suchmaschinen-Optimierung.",
    url: `${BASE_URL}/faq`,
    type: "website",
    locale: "de_DE",
  },
};

export default function FaqPage() {
  return (
    <PageShell
      srHeading="FAQ – Häufige Fragen"
      panels={[
        { id: "faq",     label: "FAQ",     content: <FAQ /> },
        { id: "kontakt", label: "Kontakt", content: <CTA /> },
      ]}
    />
  );
}
