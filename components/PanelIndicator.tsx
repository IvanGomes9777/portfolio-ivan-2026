"use client";

import { motion, MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";

export default function PanelIndicator({
  progress,
  total,
  labels,
}: {
  progress: MotionValue<number>;
  total: number;
  labels: string[];
}) {
  const [current, setCurrent] = useState(0);

  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))));
    setCurrent(idx);
  });

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-4 px-4 py-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/70 backdrop-blur-xl opacity-50">
      <span className="font-display text-xs tracking-[0.2em] text-[var(--color-ink-soft)] tabular-nums">
        <span className="text-[var(--color-ink)]">{String(current + 1).padStart(2, "0")}</span>
        <span className="text-[var(--color-ink-dim)]"> / {String(total).padStart(2, "0")}</span>
      </span>

      <div className="relative h-[2px] w-32 rounded-full bg-white/[0.08] overflow-hidden">
        <motion.div
          style={{ width: barWidth }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-accent-strong)] to-[var(--color-accent-soft)]"
        />
      </div>

      <span className="text-[0.625rem] uppercase tracking-[0.25em] text-[var(--color-ink-dim)] hidden md:inline">
        {labels[current]}
      </span>

      <span className="text-[0.625rem] uppercase tracking-[0.25em] text-[var(--color-ink-dim)] flex items-center gap-1.5">
        Scroll
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          →
        </motion.span>
      </span>
    </div>
  );
}
