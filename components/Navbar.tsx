"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Phone } from "lucide-react";

// Phone from the Impressum (+49 176 60847103) as an RFC 3966 tel: target.
const PHONE_TEL = "tel:+4917660847103";
const PHONE_DISPLAY = "+49 176 60847103";

// Route links use Next <Link>; the in-page "#kontakt" anchor is handled by
// HorizontalScroll's hash logic on whichever page is active (every page ends
// with a Kontakt panel).
const links: { href: string; label: string; dot?: string }[] = [
  { href: "/projekte", label: "Projekte" },
  { href: "#kontakt", label: "Kontakt" },
];

function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  // Internal routes get client-side navigation; hash links stay plain anchors
  // so HorizontalScroll can intercept and smooth-scroll to the section.
  if (href.startsWith("/")) {
    return (
      <Link href={href} data-cursor-hover className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} data-cursor-hover className={className} onClick={onClick}>
      {children}
    </a>
  );
}

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
          <Link
            href="/"
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
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 text-sm text-[var(--color-ink-soft)]">
            {links.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-full hover:text-[var(--color-ink)] hover:bg-white/5 transition inline-flex items-center gap-1.5"
              >
                {l.label}
                {l.dot && <span className={`size-1.5 rounded-full ${l.dot}`} />}
              </NavLink>
            ))}
          </div>

          {/* Desktop call button */}
          <a
            href={PHONE_TEL}
            data-cursor-hover
            aria-label={`Anrufen: ${PHONE_DISPLAY}`}
            className="hidden md:inline-flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-full border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:border-[var(--color-line-strong)] hover:bg-white/5 transition-colors"
          >
            <Phone className="size-3.5" />
            <span>Anrufen</span>
          </a>

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
                    <NavLink
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
                    </NavLink>
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
                className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[var(--color-accent-strong)] text-black text-base font-medium pointer-events-auto"
              >
                <span>Kostenloses Erstgespräch</span>
                <ArrowRight className="size-4" />
              </motion.a>

              <motion.a
                href={PHONE_TEL}
                onClick={closeMenu}
                aria-label={`Anrufen: ${PHONE_DISPLAY}`}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.08 + (links.length + 1) * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-3 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink)] text-base font-medium pointer-events-auto"
              >
                <Phone className="size-4" />
                <span>Direkt anrufen</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
