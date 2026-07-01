"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Sparkles, BadgePercent } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import MagneticButton from "./MagneticButton";
import SplitText from "./SplitText";

const HeroShader = dynamic(() => import("./HeroShader"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative w-full h-full min-h-[100svh] flex items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* WebGL shader background */}
      <HeroShader />

      {/* Brand logo watermark — screen blend drops the image's dark background
          so only the neon emblem glows behind the content. Fades in as the
          intro overlay finishes, so the logo appears to settle into the hero. */}
      <motion.img
        src="/logo-web.webp"
        alt="Ivan Gomes – Freelance Webdesign & Entwicklung aus Münster"
        decoding="async"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ delay: 1.9, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 w-[min(140vw,1300px)] max-w-none h-auto -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-screen pointer-events-none select-none [mask-image:radial-gradient(circle,black_38%,transparent_72%)]"
      />

      {/* background grid (above shader, subtle) */}
      <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none opacity-40" />

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur-md text-xs text-[var(--color-ink-soft)] mb-6">
          <Sparkles className="size-3 text-[var(--color-accent)]" />
          <span>Verfügbar für neue Projekte</span>
          <span className="size-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
        </motion.div>

        <h1 className="font-display text-fluid-hero font-medium tracking-[-0.04em] leading-[1.04]">
          <SplitText text="Websites, die" />{" "}
          <span className="relative inline-block overflow-hidden align-baseline pb-[0.12em]">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="inline-block bg-gradient-to-br from-[var(--color-accent-soft)] via-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent italic"
            >
              wirken
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
              className="absolute -inset-x-2 bottom-2 h-[2px] origin-left bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-60"
            />
          </span>
          <br />
          <SplitText text="für lokale Unternehmen." delay={0.35} />
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed"
        >
          Als Freelance Webdesigner & Entwickler aus Münster baue ich für
          lokale Unternehmen maßgeschneiderte, performante Websites, die
          wirken: digital sichtbar machen und{" "}
          <span className="font-semibold text-[var(--color-accent-soft)]">
            gezielt neue Kunden gewinnen
          </span>
          .
        </motion.p>

        {/* Launch offer — limited discount for the first customers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.98, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex justify-center"
        >
          <motion.div
            // Gentle "breathing" glow that pulses to draw the eye.
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 255, 255,0.20)",
                "0 0 38px rgba(255, 255, 255,0.50)",
                "0 0 20px rgba(255, 255, 255,0.20)",
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
            className="relative inline-flex items-center gap-2.5 overflow-hidden px-4 py-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 backdrop-blur-md text-sm text-[var(--color-ink)]"
          >
            {/* Shine sweep that periodically races across the pill. */}
            <motion.span
              aria-hidden
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                repeatDelay: 3.2,
                ease: "easeInOut",
                delay: 2,
              }}
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            <motion.span
              // Icon does a quick celebratory wiggle on every shine pass.
              animate={{ rotate: [0, -12, 12, -8, 0], scale: [1, 1.15, 1] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                repeatDelay: 3.4,
                ease: "easeInOut",
                delay: 2,
              }}
              className="shrink-0 text-[var(--color-accent)]"
            >
              <BadgePercent className="size-4" />
            </motion.span>
            <span className="relative leading-snug">
              <span className="font-medium text-[var(--color-accent-soft)]">
                Eröffnungsaktion: 20% Rabatt
              </span>{" "}
              — <span className="font-semibold">nur für die ersten 10 Kunden!</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton strength={0.35}>
            <a
              href="#kontakt"
              data-cursor-hover
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-accent-strong)] text-black text-sm font-medium pulse-glow hover:bg-[var(--color-accent)] transition-colors"
            >
              <span>Kostenloses Erstgespräch sichern</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <Link
              href="/projekte"
              data-cursor-hover
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[var(--color-line)] hover:border-[var(--color-line-strong)] bg-white/[0.02] hover:bg-white/[0.05] text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-all"
            >
              Projekte ansehen
            </Link>
          </MagneticButton>
        </motion.div>

        {/* meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-xs text-[var(--color-ink-dim)] uppercase tracking-[0.18em]"
        >
          <span>Mehr Kundenanfragen</span>
          <span className="size-1 rounded-full bg-[var(--color-ink-dim)]" />
          <span>Maßgeschneidert</span>
          <span className="size-1 rounded-full bg-[var(--color-ink-dim)]" />
          <span>Performant</span>
          <span className="size-1 rounded-full bg-[var(--color-ink-dim)]" />
          <span>2 – 4 Wochen Lieferzeit</span>
          <span className="size-1 rounded-full bg-[var(--color-ink-dim)]" />
          <span>Festpreis – keine Nachkalkulation</span>
          <span className="size-1 rounded-full bg-[var(--color-ink-dim)]" />
          <span>Responsive</span>
        </motion.div>
      </motion.div>

    </section>
  );
}
