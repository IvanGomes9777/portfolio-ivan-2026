"use client";

import { createContext, useContext, RefObject } from "react";
import { MotionValue, useScroll } from "framer-motion";

export const PanelProgressContext = createContext<MotionValue<number> | null>(null);

/**
 * Returns a 0→1 progress for the surrounding panel.
 * - In horizontal mode (wrapped by HorizontalScroll): uses the panel's slice of the global progress.
 * - In vertical mode (mobile fallback): falls back to a local useScroll on the passed ref.
 */
export function usePanelProgress(
  fallbackRef?: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const ctx = useContext(PanelProgressContext);
  const { scrollYProgress } = useScroll({
    target: fallbackRef,
    offset: ["start end", "end start"],
  });
  return ctx ?? scrollYProgress;
}
