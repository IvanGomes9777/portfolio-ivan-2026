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
      <section className="px-4 py-[clamp(1.25rem,4.2vh,3.5rem)] max-w-7xl w-full mx-auto" ref={ref}>
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
        <h2 className="font-display text-fluid-h2lg tracking-[-0.03em] font-medium leading-[1.05]">
          Vier Schritte vom{" "}
          <span className="italic text-[var(--color-ink-soft)]">ersten Hallo</span> zum Launch.
        </h2>
      </motion.div>

      {/* Timeline — a single render of each step so its heading and description
          exist only once in the DOM (no desktop/mobile text duplication). The
          layout adapts responsively: a horizontal 4-step grid on desktop, a
          vertical stack on mobile. */}
      <div className="relative pl-12 md:pl-0">
        {/* base line — vertical (mobile) / horizontal (desktop) */}
        <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-[var(--color-line)]" />
        <div className="hidden md:block absolute left-0 right-0 top-[28px] h-px bg-[var(--color-line)]" />
        {/* progress line — grows with scroll progress */}
        <motion.div
          style={{ height: lineWidth }}
          className="md:hidden absolute left-3 top-0 w-px bg-gradient-to-b from-[var(--color-accent-strong)] via-[var(--color-accent)] to-transparent shadow-[0_0_20px_rgba(255, 255, 255,0.6)]"
        />
        <motion.div
          style={{ width: lineWidth }}
          className="hidden md:block absolute left-0 top-[28px] h-px bg-gradient-to-r from-[var(--color-accent-strong)] via-[var(--color-accent)] to-[var(--color-accent-soft)] shadow-[0_0_20px_rgba(255, 255, 255,0.7)]"
        />

        <div className="relative flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-6">
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
      className="relative flex flex-col items-start text-left md:items-center md:text-center"
    >
      {/* Mobile marker — a dot sitting on the vertical timeline */}
      <span className="md:hidden absolute -left-[34px] top-1.5 size-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_16px_rgba(255, 255, 255,0.9)]" />

      {/* Desktop marker — a circle node on the horizontal timeline */}
      <motion.div
        style={{ scale: nodeScale }}
        className="hidden md:flex relative size-14 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)] backdrop-blur-md items-center justify-center z-10"
      >
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255, 255, 255,0.4),transparent_70%)]"
        />
        <Icon className="relative size-5 text-[var(--color-accent)]" />
      </motion.div>

      {/* Text — rendered once, shared by both layouts */}
      <div className="mt-1.5 md:mt-5 md:max-w-[240px] md:mx-auto">
        <div className="flex items-center gap-2 font-display text-xs tracking-[0.3em] text-[var(--color-accent)] md:justify-center">
          <span>{step.n}</span>
          {/* Icon inline on mobile (desktop shows it inside the circle above) */}
          <Icon className="size-3.5 md:hidden" />
        </div>
        <h3 className="mt-2 font-display text-xl md:text-lg lg:text-xl tracking-[-0.02em] font-medium">
          {step.title}
        </h3>
        <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed text-sm md:text-xs lg:text-sm">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}
