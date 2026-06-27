import Hero from "@/components/Hero";
import Promise from "@/components/Promise";
import Process from "@/components/Process";
import Found from "@/components/Found";
import Fit from "@/components/Fit";
import FAQ from "@/components/FAQ";
import PaymentOptions from "@/components/PaymentOptions";
import CTA from "@/components/CTA";
import PageShell from "@/components/PageShell";
import LogoIntro from "@/components/LogoIntro";

export default function Page() {
  return (
    <>
      <LogoIntro />
      <PageShell
        panels={[
          { id: "top",         label: "Intro",       content: <Hero /> },
          { id: "versprechen", label: "Versprechen", content: <Promise /> },
          { id: "prozess",     label: "Prozess",     content: <Process /> },
          { id: "gefunden",    label: "Gefunden",    content: <Found /> },
          { id: "passt",       label: "Passt es?",   content: <Fit /> },
          { id: "faq",         label: "FAQ",         content: <FAQ /> },
          { id: "zahlung",     label: "Zahlung",     content: <PaymentOptions /> },
          { id: "kontakt",     label: "Kontakt",     content: <CTA /> },
        ]}
      />
    </>
  );
}
