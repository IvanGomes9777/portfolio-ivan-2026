import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Shared chrome for the standalone sub-pages (/projekte, /preise, /wartung).
// The home page uses the horizontal page-turn (HorizontalScroll); these pages
// instead stack the same section components vertically with the normal navbar
// and a full footer, so each has its own URL, metadata and shareable link.
export default function SubPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-32 pb-2 flex flex-col gap-2">{children}</main>
      <Footer />
    </>
  );
}
