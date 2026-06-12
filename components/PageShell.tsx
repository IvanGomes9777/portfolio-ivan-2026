import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LegalLinks from "./LegalLinks";
import HorizontalScroll from "./HorizontalScroll";

export type Panel = { id: string; label: string; content: ReactNode };

// Shared page chrome used by every route (home, /projekte, /preise). Each page
// keeps the signature horizontal page-turn (HorizontalScroll) for its own set
// of sections, plus the navbar, the mobile footer and the desktop legal-links
// corner widget.
export default function PageShell({
  panels,
  srHeading,
}: {
  panels: Panel[];
  /** Visually-hidden <h1> for the page (SEO — each route gets one). */
  srHeading?: string;
}) {
  return (
    <>
      <Navbar />
      <main>
        {srHeading && <h1 className="sr-only">{srHeading}</h1>}
        <HorizontalScroll panels={panels} />
      </main>
      {/* Footer only on mobile (vertical) — on desktop the LegalLinks corner
          widget handles legal access. */}
      <div className="md:hidden">
        <Footer />
      </div>
      <LegalLinks />
    </>
  );
}
