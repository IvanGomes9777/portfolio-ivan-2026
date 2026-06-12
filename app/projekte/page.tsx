import type { Metadata } from "next";
import SubPageShell from "@/components/SubPageShell";
import ProjectShowcase from "@/components/ProjectShowcase";
import DemoProjects from "@/components/DemoProjects";
import CTA from "@/components/CTA";

const BASE_URL = "https://portfolio-ivan-2026.vercel.app";

export const metadata: Metadata = {
  title: "Projekte & Referenzen",
  description:
    "Ausgewählte Web-Projekte und sofort verfügbare Demo-Websites für lokale Unternehmen — von Friseur über Gebäudereinigung bis Tattoo-Studio. Live im Browser ansehen.",
  alternates: { canonical: `${BASE_URL}/projekte` },
  openGraph: {
    title: "Projekte & Referenzen | Ivan Gomes",
    description:
      "Echte Projekte live im Netz und fertige Demo-Websites, bereit für deine Marke. Moderne, performante Websites für lokale Unternehmen.",
    url: `${BASE_URL}/projekte`,
    type: "website",
    locale: "de_DE",
  },
};

export default function ProjektePage() {
  return (
    <SubPageShell>
      <h1 className="sr-only">Projekte &amp; Referenzen</h1>
      <div className="relative isolate">
        <ProjectShowcase />
      </div>
      <div className="relative isolate">
        <DemoProjects />
      </div>
      <div id="kontakt" className="relative isolate">
        <CTA />
      </div>
    </SubPageShell>
  );
}
