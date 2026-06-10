"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "#prozess", label: "Prozess" },
  { href: "#demos", label: "Demos", dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]" },
  { href: "#projekte", label: "Projekte" },
  { href: "#preise", label: "Preise" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close menu helper that also unlocks body immediately (so a follow-up
  // scrollIntoView from the global hash handler isn't blocked by overflow:hidden).
  const closeMenu = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <nav
          className={`flex items-center gap-3 md:gap-6 px-3 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-500 ${
            scrolled || open
              ? "bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-line)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          <a
            href="#top"
            data-cursor-hover
            aria-label="Webdesign by Ivan — Startseite"
            className="flex items-center gap-2.5 text-sm font-medium tracking-tight"
          >
            {/* Glowing W emblem cropped from the brand graphic — screen blend
                drops the dark image background so only the neon mark shows. */}
            <span className="relative block size-7 shrink-0 overflow-hidden rounded-md">
              <img
                src="/logo-web.webp"
                alt="Webdesign by Ivan Logo"
                decoding="async"
                className="absolute left-1/2 top-[42%] h-[230%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover mix-blend-screen"
              />
            </span>
            <span>ivan.dev</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 text-sm text-[var(--color-ink-soft)]">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor-hover
                className="px-3 py-1.5 rounded-full hover:text-[var(--color-ink)] hover:bg-white/5 transition inline-flex items-center gap-1.5"
              >
                {l.label}
                {l.dot && <span className={`size-1.5 rounded-full ${l.dot}`} />}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#kontakt"
            data-cursor-hover
            className="hidden md:inline-flex text-sm px-3.5 py-1.5 rounded-full bg-white text-black font-medium hover:bg-[var(--color-accent-soft)] transition-colors"
          >
            Gespräch buchen
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => {
              if (open) closeMenu();
              else setOpen(true);
            }}
            className="md:hidden ml-auto inline-flex items-center justify-center size-9 rounded-full hover:bg-white/5 active:bg-white/10 transition-colors text-[var(--color-ink)] relative z-[60]"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* backdrop */}
            <button
              type="button"
              aria-label="Menü schließen"
              onClick={closeMenu}
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            />

            {/* panel — wrapper does not capture clicks so backdrop stays tappable */}
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full flex flex-col items-stretch justify-center px-6 pt-24 pb-10 pointer-events-none"
            >
              <ul className="flex flex-col gap-1 pointer-events-auto">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.08 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={l.href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between py-4 border-b border-[var(--color-line)] text-2xl font-display tracking-tight text-[var(--color-ink)]"
                    >
                      <span className="inline-flex items-center gap-3">
                        {l.label}
                        {l.dot && (
                          <span className={`size-2 rounded-full ${l.dot}`} />
                        )}
                      </span>
                      <ArrowRight className="size-5 text-[var(--color-ink-dim)] group-hover:text-[var(--color-accent)] transition-colors" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#kontakt"
                onClick={closeMenu}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.08 + links.length * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[var(--color-accent-strong)] text-white text-base font-medium pointer-events-auto"
              >
                <span>Kostenloses Erstgespräch</span>
                <ArrowRight className="size-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
