"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles, BadgePercent } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import MagneticButton from "./MagneticButton";
import SplitText from "./SplitText";

const HeroShader = dynamic(() => import("./HeroShader"), { ssr: false });
const LightningEffect = dynamic(() => import("./LightningEffect"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative w-full h-full min-h-[100svh] flex items-center justify-center px-4 pt-32 pb-24 overflow-hidden">
      {/* WebGL shader background */}
      <HeroShader />

      {/* Lightning strikes */}
      <LightningEffect />

      {/* background grid (above shader, subtle) */}
      <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none opacity-40" />

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur-md text-xs text-[var(--color-ink-soft)] mb-8">
          <Sparkles className="size-3 text-[var(--color-accent)]" />
          <span>Verfügbar für neue Projekte</span>
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
        </motion.div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-[-0.04em] leading-[1.02]">
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
          className="mt-7 max-w-2xl mx-auto text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed"
        >
          Ich bin Webdesigner & Entwickler und helfe lokalen Unternehmen dabei, durch
          maßgeschneiderte, performante Websites digital sichtbar zu werden — und
          Kunden zu gewinnen.
        </motion.p>

        {/* Launch offer — limited discount for the first customers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.98, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 backdrop-blur-md text-sm text-[var(--color-ink)] shadow-[0_0_30px_rgba(139,92,246,0.25)]">
            <BadgePercent className="size-4 shrink-0 text-[var(--color-accent)]" />
            <span className="leading-snug">
              <span className="font-medium text-[var(--color-accent-soft)]">
                Eröffnungsaktion:
              </span>{" "}
              Die ersten 10 Kunden sichern sich einen exklusiven Rabatt.
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton strength={0.35}>
            <a
              href="#kontakt"
              data-cursor-hover
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-accent-strong)] text-white text-sm font-medium pulse-glow hover:bg-[var(--color-accent)] transition-colors"
            >
              <span>Kostenloses Erstgespräch sichern</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <a
              href="#projekte"
              data-cursor-hover
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[var(--color-line)] hover:border-[var(--color-line-strong)] bg-white/[0.02] hover:bg-white/[0.05] text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-all"
            >
              Projekte ansehen
            </a>
          </MagneticButton>
        </motion.div>

        {/* meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[var(--color-ink-dim)] uppercase tracking-[0.18em]"
        >
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
