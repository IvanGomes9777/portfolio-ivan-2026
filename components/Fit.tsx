"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import MagneticButton from "./MagneticButton";
import PerspectiveGrid from "./backgrounds/PerspectiveGrid";

const fits = [
  "Du willst online wachsen und regelmäßig neue Anfragen gewinnen.",
  "Du brauchst eine klare Positionierung, die dein Unternehmen unverwechselbar macht.",
  "Deine Website soll aktiv mitarbeiten und Anfragen bringen — statt nur als digitale Deko zu existieren.",
  "Du willst nicht nur bei Google ranken, sondern auch in ChatGPT, Google AI und Perplexity empfohlen werden.",
];

export default function Fit() {
  return (
    <>
      <PerspectiveGrid />
      <section className="px-4 py-[clamp(1.25rem,4.2vh,3.5rem)] max-w-5xl w-full mx-auto">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* heading */}
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-5">
              <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
              <span>Passt es?</span>
            </div>
            <h2 className="font-display text-fluid-h2lg tracking-[-0.03em] font-medium leading-[1.05]">
              Professionelle Website{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent italic">
                erstellen lassen.
              </span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed">
              Eine ehrliche Einschätzung, bevor wir reden — damit du genau weißt, ob
              wir zueinander passen.
            </p>
          </motion.div>

          {/* fit checklist */}
          <div className="mt-[clamp(1.25rem,3.2vh,2.5rem)] grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fits.map((text) => (
              <motion.div
                key={text}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/70 p-5 hover:border-[var(--color-line-strong)] transition-colors"
              >
                <span className="mt-0.5 inline-flex items-center justify-center size-6 shrink-0 rounded-full border border-white/40 bg-white/10">
                  <Check className="size-3.5 text-white" />
                </span>
                <p className="text-sm md:text-[0.9375rem] text-[var(--color-ink-soft)] leading-relaxed">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* not-ideal note */}
          <motion.div
            variants={fadeUp}
            className="mt-3 flex items-start gap-3 rounded-2xl border border-dashed border-[var(--color-line)] bg-transparent p-5"
          >
            <span className="mt-0.5 inline-flex items-center justify-center size-6 shrink-0 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)]/40">
              <X className="size-3.5 text-[var(--color-ink-dim)]" />
            </span>
            <p className="text-sm md:text-[0.9375rem] text-[var(--color-ink-dim)] leading-relaxed">
              Weniger passend, wenn du mit minimalem Budget schnell eine
              Baukasten-Lösung zusammenklicken möchtest — durchdachtes Design und
              echte Wirkung brauchen den entsprechenden Rahmen.
            </p>
          </motion.div>

          {/* CTA button */}
          <motion.div variants={fadeUp} className="mt-[clamp(1rem,2.6vh,2.5rem)] flex justify-center">
            <MagneticButton strength={0.3}>
              <a
                href="#kontakt"
                data-cursor-hover
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-accent-strong)] hover:bg-[var(--color-accent)] text-black text-sm font-medium pulse-glow transition-colors"
              >
                <span>Kostenlos Erstgespräch buchen</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
