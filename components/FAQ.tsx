"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import { faq } from "@/lib/faq";

export default function FAQ() {
  return (
    <section className="relative px-4 py-[clamp(1.25rem,4.2vh,3.5rem)] max-w-5xl w-full mx-auto">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* heading */}
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-5">
            <HelpCircle className="size-3 text-[var(--color-accent)]" />
            <span>Häufige Fragen</span>
          </div>
          <h2 className="font-display text-fluid-h2lg tracking-[-0.03em] font-medium leading-[1.05]">
            Fragen &amp;{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent italic">
              Antworten.
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed">
            Die wichtigsten Antworten auf einen Blick — von Ablauf und Preisen bis
            Datenschutz.
          </p>
        </motion.div>

        {/* FAQ grid */}
        <div className="mt-[clamp(1rem,2.6vh,2rem)] grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {faq.map((item) => (
            <motion.div
              key={item.question}
              variants={fadeUp}
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/70 p-4 hover:border-[var(--color-line-strong)] transition-colors"
            >
              <h3 className="font-display text-base md:text-lg font-medium tracking-tight text-[var(--color-ink)]">
                {item.question}
              </h3>
              <p className="mt-1.5 text-[0.8125rem] md:text-sm text-[var(--color-ink-soft)] leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
