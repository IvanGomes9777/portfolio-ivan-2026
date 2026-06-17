"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";
import PanelIndicator from "./PanelIndicator";

type Panel = { id: string; label: string; content: ReactNode };

type LenisLike = {
  on: (e: "scroll", cb: () => void) => void;
  off: (e: "scroll", cb: () => void) => void;
  scrollTo: (
    target: number | HTMLElement,
    o?: { offset?: number; duration?: number; easing?: (t: number) => number },
  ) => void;
};

// Simple vertical layout: every section just stacks and scrolls. The page-wide
// Lenis instance (SmoothScroll) provides the smooth-scroll feel; this component
// only stacks the panels, smooth-scrolls in-page hash links, and feeds a slim
// progress indicator. Tall sections simply grow and scroll — nothing is ever
// clipped or letterboxed.
export default function HorizontalScroll({ panels }: { panels: Panel[] }) {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const progress = useMotionValue(0);
  const n = panels.length;

  // Drive the bottom indicator from the page's vertical scroll position.
  useEffect(() => {
    const update = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let idx = 0;
      let frac = 0;
      for (let i = 0; i < n; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;
        const top = window.scrollY + el.getBoundingClientRect().top;
        const bottom = top + el.offsetHeight;
        if (center >= bottom) {
          idx = Math.min(n - 1, i + 1);
          frac = 0;
        } else if (center >= top) {
          idx = i;
          frac = (center - top) / Math.max(1, bottom - top);
          break;
        }
      }
      const raw = n > 1 ? (idx + frac) / (n - 1) : 0;
      progress.set(raw > 1 ? 1 : raw < 0 ? 0 : raw);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) lenis.on("scroll", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (lenis) lenis.off("scroll", update);
    };
  }, [n, progress]);

  // Smooth-scroll for in-page hash anchors (e.g. navbar / CTA "#kontakt").
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const a = t?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href")?.slice(1);
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;
      e.preventDefault();
      const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
      if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.2, easing });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {panels.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className="scroll-mt-24 min-h-screen flex flex-col items-center justify-center"
        >
          {p.content}
        </section>
      ))}

      <PanelIndicator
        progress={progress}
        total={n}
        labels={panels.map((p) => p.label)}
      />
    </>
  );
}
