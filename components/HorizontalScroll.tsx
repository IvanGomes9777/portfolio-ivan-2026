"use client";

import { ReactNode, useEffect, useRef } from "react";
import { MotionValue, useMotionValue } from "framer-motion";
import { PanelProgressContext } from "./PanelProgress";
import PanelIndicator from "./PanelIndicator";

type Panel = { id: string; label: string; content: ReactNode };

export default function HorizontalScroll({ panels }: { panels: Panel[] }) {
  const outerRef = useRef<HTMLElement>(null);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const globalProgress = useMotionValue(0);
  const panelProgresses = useRef<MotionValue<number>[]>([]);
  const n = panels.length;

  useEffect(() => {
    let raf = 0;
    let lastP = -1;

    const update = () => {
      const outer = outerRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      const elTop = window.scrollY + rect.top;
      const distance = outer.offsetHeight - window.innerHeight;
      if (distance <= 0) return;

      const raw = (window.scrollY - elTop) / distance;
      const p = raw < 0 ? 0 : raw > 1 ? 1 : raw;
      if (p === lastP) return;
      lastP = p;

      globalProgress.set(p);

      // Per-panel transform: page-turn style.
      // panelP: 0 = behind (in depth), 0.5 = active center, 1 = lifted off the top.
      // Edge panels start/end at 0.5.
      const span = 1 / (n - 1);
      for (let i = 0; i < n; i++) {
        const center = i / (n - 1);
        const rawPanel = (p - center) / span;
        const clamped = rawPanel < -1 ? -1 : rawPanel > 1 ? 1 : rawPanel;
        const panelP = (clamped + 1) / 2;

        const mv = panelProgresses.current[i];
        if (mv) mv.set(panelP);

        const el = innerRefs.current[i];
        if (!el) continue;

        let translateY = 0;
        let translateZ = 0;
        let rotateX = 0;
        let scale = 1;
        let opacity = 1;
        let blur = 0;

        if (panelP < 0.5) {
          // Incoming: emerge from depth, fade up
          const t = panelP * 2; // 0 → 1
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          scale = 0.62 + 0.38 * eased;
          opacity = eased;
          translateZ = -500 * (1 - eased);
          blur = 8 * (1 - eased);
        } else if (panelP > 0.5) {
          // Outgoing: lift up + tilt back like a turning page
          const t = (panelP - 0.5) * 2; // 0 → 1
          const eased = t * t; // ease-in quad
          translateY = -100 * eased;
          rotateX = -28 * eased;
          scale = 1 - 0.04 * eased;
          opacity = 1 - eased;
          blur = 4 * eased;
        }

        el.style.transform = `translate3d(0, ${translateY}vh, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
        // Only the centered panel receives pointer events
        el.style.pointerEvents = panelP > 0.42 && panelP < 0.58 ? "auto" : "none";
      }
    };

    const tick = () => {
      update();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    type LenisLike = { on: (e: "scroll", cb: () => void) => void; off: (e: "scroll", cb: () => void) => void };
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) lenis.on("scroll", update);

    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (lenis) lenis.off("scroll", update);
    };
  }, [n, globalProgress]);

  // Hash-based anchor handling
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href")?.slice(1);
      if (!hash) return;
      const idx = panels.findIndex((p) => p.id === hash);
      if (idx < 0 || !outerRef.current) return;
      e.preventDefault();

      const rect = outerRef.current.getBoundingClientRect();
      const docTop = window.scrollY + rect.top;
      const totalDistance = outerRef.current.offsetHeight - window.innerHeight;
      const segment = n > 1 ? totalDistance / (n - 1) : 0;
      const targetY = docTop + idx * segment;

      const lenis = (window as unknown as { __lenis?: { scrollTo: (v: number, o?: { duration?: number; easing?: (t: number) => number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(targetY, {
          duration: 1.6,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [panels, n]);

  return (
    <PanelMotionValuesProvider count={n} into={panelProgresses}>
      <section
        ref={outerRef}
        style={{ height: `${n * 100}vh` }}
        className="relative hidden md:block"
      >
        <div
          className="sticky top-0 h-screen w-screen overflow-hidden"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}
        >
          {panels.map((p, i) => (
            <div
              key={p.id}
              id={p.id}
              ref={(el) => {
                innerRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform flex items-center justify-center"
              style={{
                zIndex: n - i,
                transformStyle: "preserve-3d",
                transformOrigin: "50% 0%",
              }}
            >
              <PanelProgressContext.Provider value={panelProgresses.current[i]!}>
                <div className="relative w-full h-full flex items-center justify-center">
                  {p.content}
                </div>
              </PanelProgressContext.Provider>
            </div>
          ))}
          <PanelIndicator
            progress={globalProgress}
            total={n}
            labels={panels.map((p) => p.label)}
          />
        </div>
      </section>

      {/* Mobile: vertical fallback */}
      <div className="md:hidden">
        {panels.map((p) => (
          <section key={p.id} id={p.id}>
            {p.content}
          </section>
        ))}
      </div>
    </PanelMotionValuesProvider>
  );
}

function PanelMotionValuesProvider({
  count,
  into,
  children,
}: {
  count: number;
  into: React.MutableRefObject<MotionValue<number>[]>;
  children: ReactNode;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <PanelMotionValueSlot key={i} index={i} into={into} total={count} />
      ))}
      {children}
    </>
  );
}

function PanelMotionValueSlot({
  index,
  into,
  total,
}: {
  index: number;
  into: React.MutableRefObject<MotionValue<number>[]>;
  total: number;
}) {
  const initial = index === 0 ? 0.5 : index === total - 1 ? 0 : 0;
  const mv = useMotionValue(initial);
  into.current[index] = mv;
  return null;
}
