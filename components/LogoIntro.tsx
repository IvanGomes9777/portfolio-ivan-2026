"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Full-screen intro that shows the brand logo large and centered on first
 * load, then shrinks/lifts it away to reveal the page — the logo appears to
 * "dive" into the hero, where a matching watermark settles in.
 *
 * The logo image ships with its own dark background, so `mix-blend-screen`
 * over the site background drops that black and leaves only the neon emblem.
 */
export default function LogoIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lock scroll while the intro plays so nothing moves underneath.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const hold = reduce ? 400 : 1900;
    const t = setTimeout(() => setShow(false), hold);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Make sure scrolling is restored the moment we start exiting.
  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="logo-intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* soft radial glow behind the logo */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute size-[80vw] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.22),transparent_60%)] blur-2xl"
          />

          <motion.img
            src="/webdesignbyivan.png"
            alt="Webdesign by Ivan"
            initial={{ scale: 0.88, opacity: 0, filter: "blur(14px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.46, opacity: 0, y: -50, filter: "blur(6px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[min(94vw,860px)] h-auto object-contain mix-blend-screen drop-shadow-[0_0_50px_rgba(139,92,246,0.4)] [mask-image:radial-gradient(ellipse_72%_78%_at_50%_48%,black_55%,transparent_88%)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
