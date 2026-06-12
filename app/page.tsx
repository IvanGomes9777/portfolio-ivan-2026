import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Promise from "@/components/Promise";
import Process from "@/components/Process";
import ProjectShowcase from "@/components/ProjectShowcase";
import DemoProjects from "@/components/DemoProjects";
import Found from "@/components/Found";
import Fit from "@/components/Fit";
import Pricing from "@/components/Pricing";
import Maintenance from "@/components/Maintenance";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import HorizontalScroll from "@/components/HorizontalScroll";
import LegalLinks from "@/components/LegalLinks";
import LogoIntro from "@/components/LogoIntro";

export default function Page() {
  return (
    <>
      <LogoIntro />
      <Navbar />
      <main>
        <HorizontalScroll
          panels={[
            { id: "top",         label: "Intro",       content: <Hero /> },
            { id: "versprechen", label: "Versprechen", content: <Promise /> },
            { id: "prozess",     label: "Prozess",     content: <Process /> },
            { id: "demos",       label: "Demos",       content: <DemoProjects /> },
            { id: "projekte",    label: "Projekte",    content: <ProjectShowcase /> },
            { id: "gefunden",    label: "Gefunden",    content: <Found /> },
            { id: "passt",       label: "Passt es?",   content: <Fit /> },
            { id: "preise",      label: "Preise",      content: <Pricing /> },
            { id: "wartung",     label: "Wartung",     content: <Maintenance /> },
            { id: "faq",         label: "FAQ",         content: <FAQ /> },
            { id: "kontakt",     label: "Kontakt",     content: <CTA /> },
          ]}
        />
      </main>
      {/* Footer only on mobile (vertical) — on desktop the LegalLinks corner widget handles legal access */}
      <div className="md:hidden">
        <Footer />
      </div>
      <LegalLinks />
    </>
  );
}
