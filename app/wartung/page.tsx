import type { Metadata } from "next";
import SubPageShell from "@/components/SubPageShell";
import Maintenance from "@/components/Maintenance";
import CTA from "@/components/CTA";

const BASE_URL = "https://portfolio-ivan-2026.vercel.app";

export const metadata: Metadata = {
  title: "Website-Wartung & Pflege",
  description:
    "Monatliche Wartungspakete für deine Website: Updates, tägliche Backups, Sicherheits-Monitoring und Performance-Überwachung. Standard ab 150 €, Premium ab 250 € pro Monat.",
  alternates: { canonical: `${BASE_URL}/wartung` },
  openGraph: {
    title: "Website-Wartung & Pflege | Ivan Gomes",
    description:
      "Damit deine Website sicher, schnell und aktuell bleibt: monatliche Wartungspakete mit Updates, Backups, Sicherheit und Performance-Monitoring.",
    url: `${BASE_URL}/wartung`,
    type: "website",
    locale: "de_DE",
  },
};

export default function WartungPage() {
  return (
    <SubPageShell>
      <h1 className="sr-only">Website-Wartung &amp; Pflege</h1>
      <div className="relative isolate">
        <Maintenance />
      </div>
      <div id="kontakt" className="relative isolate">
        <CTA />
      </div>
    </SubPageShell>
  );
}
