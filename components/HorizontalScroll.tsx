"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import { MotionValue, motionValue, useMotionValue } from "framer-motion";
import { PanelProgressContext } from "./PanelProgress";
import PanelIndicator from "./PanelIndicator";

type Panel = { id: string; label: string; content: ReactNode };

export default function HorizontalScroll({ panels }: { panels: Panel[] }) {
  const outerRef = useRef<HTMLElement>(null);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const globalProgress = useMotionValue(0);
  const n = panels.length;
  // Create panel MotionValues during HorizontalScroll's own render so they
  // are available when PanelProgressContext.Provider's `value` is evaluated.
  // The previous slot-component pattern populated a ref during the children's
  // render, which is too late — provider values were captured as undefined
  // and every panel fell back to useScroll, which in this sticky-horizontal
  // layout reports a near-constant ~0.5 (target rect == viewport). Result:
  // bars and step indicators never animated.
  const panelProgresses = useMemo<MotionValue<number>[]>(
    () => Array.from({ length: n }, (_, i) => motionValue(i === 0 ? 0.5 : 0)),
    [n],
  );

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

        const mv = panelProgresses[i];
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

  // Tall panels that exceed the viewport get their own vertical scroll, so
  // content is never clipped and never has to be shrunk/letterboxed. Lenis is
  // told to ignore those panels (data-lenis-prevent) so native scrolling works
  // inside them; when the inner scroll reaches its top/bottom edge, a wheel
  // handler hands the gesture back to the deck so the page-turn continues.
  useEffect(() => {
    const lock = { v: false };

    const scrollDeck = (dir: number) => {
      const outer = outerRef.current;
      if (!outer || lock.v) return;
      const totalDistance = outer.offsetHeight - window.innerHeight;
      if (totalDistance <= 0) return;
      const segment = n > 1 ? totalDistance / (n - 1) : 0;
      const rect = outer.getBoundingClientRect();
      const docTop = window.scrollY + rect.top;
      const cur = Math.round((window.scrollY - docTop) / segment);
      const next = Math.min(n - 1, Math.max(0, cur + dir));
      if (next === cur) return;
      lock.v = true;
      const targetY = docTop + next * segment;
      const lenis = (window as unknown as {
        __lenis?: { scrollTo: (t: number, o?: { duration?: number; easing?: (t: number) => number }) => void };
      }).__lenis;
      const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
      if (lenis) lenis.scrollTo(targetY, { duration: 1.2, easing });
      else window.scrollTo({ top: targetY, behavior: "smooth" });
      window.setTimeout(() => { lock.v = false; }, 950);
    };

    const measure = () => {
      scrollRefs.current.forEach((el) => {
        if (!el) return;
        const over = el.scrollHeight > el.clientHeight + 2;
        if (over) el.setAttribute("data-lenis-prevent", "");
        else el.removeAttribute("data-lenis-prevent");
      });
    };

    const cleanups: Array<() => void> = [];
    scrollRefs.current.forEach((el) => {
      if (!el) return;
      const onWheel = (e: WheelEvent) => {
        if (el.scrollHeight <= el.clientHeight + 2) return; // fits — let deck scroll
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) {
          e.preventDefault();
          scrollDeck(e.deltaY > 0 ? 1 : -1);
        }
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      cleanups.push(() => el.removeEventListener("wheel", onWheel));
    });

    measure();
    window.addEventListener("resize", measure);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measure());
      scrollRefs.current.forEach((el) => el && ro!.observe(el));
    }
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(measure).catch(() => {});

    return () => {
      window.removeEventListener("resize", measure);
      if (ro) ro.disconnect();
      cleanups.forEach((c) => c());
    };
  }, [n]);

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
      if (idx < 0) return;

      const outer = outerRef.current;
      const totalDistance = outer ? outer.offsetHeight - window.innerHeight : 0;
      // Desktop horizontal mode is only active when the sticky section is
      // actually rendered (md:block) and has scrollable height. On mobile it
      // is display:none (offsetParent === null) so we fall back to scrolling
      // the visible vertical section into view.
      const desktopActive =
        !!outer && outer.offsetParent !== null && totalDistance > 0;

      const lenis = (
        window as unknown as {
          __lenis?: {
            scrollTo: (
              target: number | HTMLElement,
              o?: { duration?: number; offset?: number; easing?: (t: number) => number },
            ) => void;
          };
        }
      ).__lenis;
      const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

      if (desktopActive) {
        e.preventDefault();
        const rect = outer!.getBoundingClientRect();
        const docTop = window.scrollY + rect.top;
        const segment = n > 1 ? totalDistance / (n - 1) : 0;
        const targetY = docTop + idx * segment;
        if (lenis) lenis.scrollTo(targetY, { duration: 1.6, easing });
        else window.scrollTo({ top: targetY, behavior: "smooth" });
      } else {
        // Mobile / vertical: scroll the actual section into view.
        const el = document.getElementById(hash);
        if (!el) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(el, { duration: 1.2, offset: -72, easing });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [panels, n]);

  return (
    <>
      <section
        ref={outerRef}
        style={{ height: `${n * 100}vh` }}
        className="relative hidden md:block"
      >
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}
        >
          {panels.map((p, i) => (
            <div
              key={p.id}
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
              <PanelProgressContext.Provider value={panelProgresses[i]!}>
                <div
                  ref={(el) => {
                    scrollRefs.current[i] = el;
                  }}
                  className="relative w-full h-full overflow-y-auto overscroll-contain no-scrollbar"
                >
                  <div className="min-h-full flex items-center justify-center">
                    {p.content}
                  </div>
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
          <section key={p.id} id={p.id} className="scroll-mt-20">
            {p.content}
          </section>
        ))}
      </div>
    </>
  );
}
