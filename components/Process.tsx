"use client";

import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenLine, Code2, Rocket } from "lucide-react";
import { usePanelProgress } from "./PanelProgress";
import PerspectiveGrid from "./backgrounds/PerspectiveGrid";

const steps = [
  {
    n: "01",
    icon: MessageSquare,
    title: "Das Erstgespräch",
    desc:
      "Anforderungen analysieren, Ziele definieren, Potenzial aufdecken. Ein offenes Gespräch — kein Pitch, kein Druck.",
  },
  {
    n: "02",
    icon: PenLine,
    title: "Struktur & Design",
    desc:
      "Maßgeschneidertes Konzept, strukturiert und designt exakt nach den Vorstellungen deines Unternehmens.",
  },
  {
    n: "03",
    icon: Code2,
    title: "Die Fertigstellung",
    desc:
      "Saubere, schnelle und vollständig responsive Entwicklung — performant auf jedem Gerät und in jedem Browser.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Launch & Übergabe",
    desc:
      "Deine Website geht live. Inklusive vollständiger Übergabe — du behältst jederzeit die volle Kontrolle.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const panelProgress = usePanelProgress(ref);
  // Horizontal line fills from 0% → 100% across the panel's active range
  const lineWidth = useTransform(panelProgress, [0.25, 0.85], ["0%", "100%"]);
  // Each step lights up when the progress crosses its threshold
  const thresholds = steps.map((_, i) => 0.25 + ((i + 1) / steps.length) * 0.55);

  return (
    <>
      <PerspectiveGrid />
      <section className="px-4 py-16 md:py-12 max-w-7xl w-full mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-5">
          <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
          <span>So arbeite ich</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] font-medium leading-[1.05]">
          Vier Schritte vom{" "}
          <span className="italic text-[var(--color-ink-soft)]">ersten Hallo</span> zum Launch.
        </h2>
      </motion.div>

      {/* Horizontal timeline (desktop) */}
      <div className="hidden md:block relative">
        {/* base line */}
        <div className="absolute left-0 right-0 top-[28px] h-px bg-[var(--color-line)]" />
        {/* progress line */}
        <motion.div
          style={{ width: lineWidth }}
          className="absolute left-0 top-[28px] h-px bg-gradient-to-r from-[var(--color-accent-strong)] via-[var(--color-accent)] to-[var(--color-accent-soft)] shadow-[0_0_20px_rgba(139,92,246,0.7)]"
        />

        <div className="relative grid grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const threshold = thresholds[i];
            return (
              <StepNode
                key={step.n}
                step={step}
                Icon={Icon}
                panelProgress={panelProgress}
                threshold={threshold}
                index={i}
              />
            );
          })}
        </div>
      </div>

      {/* Vertical timeline (mobile fallback) */}
      <div className="md:hidden relative pl-12">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-[var(--color-line)]" />
        <motion.div
          style={{ height: lineWidth }}
          className="absolute left-3 top-0 w-px bg-gradient-to-b from-[var(--color-accent-strong)] via-[var(--color-accent)] to-transparent shadow-[0_0_20px_rgba(139,92,246,0.6)]"
        />
        <div className="space-y-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className="relative"
              >
                <div className="absolute -left-[34px] top-1.5 size-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_16px_rgba(139,92,246,0.9)]" />
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  <span>{step.n}</span>
                  <Icon className="size-3.5" />
                </div>
                <h3 className="mt-1.5 font-display text-xl tracking-[-0.02em] font-medium">{step.title}</h3>
                <p className="mt-1.5 text-[var(--color-ink-soft)] leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
      </section>
    </>
  );
}

function StepNode({
  step,
  Icon,
  panelProgress,
  threshold,
  index,
}: {
  step: { n: string; title: string; desc: string };
  Icon: React.ComponentType<{ className?: string }>;
  panelProgress: import("framer-motion").MotionValue<number>;
  threshold: number;
  index: number;
}) {
  const opacity = useTransform(panelProgress, [threshold - 0.1, threshold], [0.35, 1]);
  const nodeScale = useTransform(panelProgress, [threshold - 0.05, threshold], [0.85, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* node */}
      <motion.div
        style={{ scale: nodeScale }}
        className="relative size-14 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)] backdrop-blur-md flex items-center justify-center z-10"
      >
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.4),transparent_70%)]"
        />
        <Icon className="relative size-5 text-[var(--color-accent)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="mt-5 max-w-[240px] mx-auto">
        <div className="font-display text-xs tracking-[0.3em] text-[var(--color-accent)]">
          {step.n}
        </div>
        <h3 className="mt-2 font-display text-lg md:text-xl tracking-[-0.02em] font-medium">
          {step.title}
        </h3>
        <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed text-xs md:text-sm">
          {step.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}
