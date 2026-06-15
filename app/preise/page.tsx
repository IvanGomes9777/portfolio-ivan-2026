import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import Maintenance from "@/components/Maintenance";
import ContentMaintenance from "@/components/ContentMaintenance";
import CTA from "@/components/CTA";
import PageShell from "@/components/PageShell";

const BASE_URL = "https://portfolio-ivan-2026.vercel.app";

export const metadata: Metadata = {
  title: "Preise & Wartung",
  description:
    "Transparente Festpreise für deine Website (ab €500 für die digitale Visitenkarte) plus monatliche Wartungs- und Content-Pflege-Pakete — Updates, Backups, Sicherheit, Support sowie Bild- und Text-Änderungen. Flexible Zahlungsoptionen.",
  alternates: { canonical: `${BASE_URL}/preise` },
  openGraph: {
    title: "Preise & Wartung | Ivan Gomes",
    description:
      "Klare Website-Pakete und monatliche Wartung für lokale Unternehmen. Transparente Festpreise, flexible Zahlung, laufende Betreuung nach dem Launch.",
    url: `${BASE_URL}/preise`,
    type: "website",
    locale: "de_DE",
  },
};

export default function PreisePage() {
  return (
    <PageShell
      srHeading="Preise & Wartung"
      panels={[
        { id: "preise",  label: "Preise",  content: <Pricing /> },
        { id: "wartung", label: "Wartung", content: <Maintenance /> },
        { id: "content", label: "Content-Pflege", content: <ContentMaintenance /> },
        { id: "kontakt", label: "Kontakt", content: <CTA /> },
      ]}
    />
  );
}
