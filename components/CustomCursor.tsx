"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 350, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    // Only enable on devices with a fine pointer
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setVisible(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const hov = t.closest("a, button, input, textarea, label, [data-cursor-hover]");
      setHovering(!!hov);
    };
    const onLeave = () => setHovering(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerleave", onLeave);
    document.documentElement.classList.add("cursor-none-md");

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("cursor-none-md");
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="fixed top-0 left-0 z-[100] pointer-events-none"
      aria-hidden
    >
      <motion.div
        animate={{
          width: hovering ? 56 : 14,
          height: hovering ? 56 : 14,
          x: hovering ? -28 : -7,
          y: hovering ? -28 : -7,
          opacity: hovering ? 0.85 : 1,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-full bg-white mix-blend-difference"
      />
    </motion.div>
  );
}
