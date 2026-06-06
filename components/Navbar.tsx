"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex items-center gap-6 px-5 py-2.5 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-line)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <span className="size-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
          <span>ivan.dev</span>
        </a>
        <div className="hidden md:flex items-center gap-1 text-sm text-[var(--color-ink-soft)]">
          <a className="px-3 py-1.5 rounded-full hover:text-[var(--color-ink)] hover:bg-white/5 transition" href="#prozess">Prozess</a>
          <a className="px-3 py-1.5 rounded-full hover:text-[var(--color-ink)] hover:bg-white/5 transition" href="#projekte">Projekte</a>
          <a className="px-3 py-1.5 rounded-full hover:text-[var(--color-ink)] hover:bg-white/5 transition" href="#kontakt">Kontakt</a>
        </div>
        <a
          href="#kontakt"
          className="text-sm px-3.5 py-1.5 rounded-full bg-white text-black font-medium hover:bg-[var(--color-accent-soft)] transition-colors"
        >
          Gespräch buchen
        </a>
      </nav>
    </motion.header>
  );
}
