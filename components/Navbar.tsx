"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "#prozess", label: "Prozess" },
  { href: "#demos", label: "Demos", dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]" },
  { href: "#projekte", label: "Projekte" },
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

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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
            className="flex items-center gap-2 text-sm font-medium tracking-tight"
          >
            <span className="size-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
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
            onClick={() => setOpen((v) => !v)}
            className="md:hidden ml-auto inline-flex items-center justify-center size-8 rounded-full hover:bg-white/5 transition-colors text-[var(--color-ink)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
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
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            />

            {/* panel */}
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full flex flex-col items-stretch justify-center px-6 pt-24 pb-10"
            >
              <ul className="flex flex-col gap-1">
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
                      onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.08 + links.length * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[var(--color-accent-strong)] text-white text-base font-medium"
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
