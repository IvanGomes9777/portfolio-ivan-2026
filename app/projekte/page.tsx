import type { Metadata } from "next";
import ProjectShowcase from "@/components/ProjectShowcase";
import DemoProjects from "@/components/DemoProjects";
import CTA from "@/components/CTA";
import PageShell from "@/components/PageShell";

const BASE_URL = "https://portfolio-ivan-2026.vercel.app";

export const metadata: Metadata = {
  title: "Projekte & Referenzen",
  description:
    "Ausgewählte Web-Projekte live im Netz und sofort verfügbare Demo-Websites für lokale Unternehmen — von Friseur über Gebäudereinigung bis Tattoo-Studio. Direkt im Browser ansehen.",
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
    <PageShell
      srHeading="Projekte & Referenzen"
      panels={[
        { id: "projekte", label: "Projekte", content: <ProjectShowcase /> },
        { id: "demos",    label: "Demos",    content: <DemoProjects /> },
        { id: "kontakt",  label: "Kontakt",  content: <CTA /> },
      ]}
    />
  );
}
