"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Strike = { id: number; xPercent: number; path: string; flip: boolean };

// Deterministic-ish path generator (uses Math.random, but only at runtime)
function makeBoltPath(): string {
  let x = 50;
  let path = `M ${x} 0`;
  for (let y = 12; y <= 200; y += 10) {
    x += (Math.random() - 0.5) * 26;
    x = Math.max(8, Math.min(92, x));
    path += ` L ${x.toFixed(1)} ${y}`;
    if (Math.random() < 0.22 && y > 40 && y < 170) {
      const bx = x + (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 20);
      const by = y + 18 + Math.random() * 24;
      path += ` M ${x.toFixed(1)} ${y} L ${bx.toFixed(1)} ${by.toFixed(1)} M ${x.toFixed(1)} ${y}`;
    }
  }
  return path;
}

export default function LightningEffect() {
  const [strikes, setStrikes] = useState<Strike[]>([]);
  const [flash, setFlash] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let id = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const newStrike: Strike = {
        id: id++,
        xPercent: 5 + Math.random() * 90,
        path: makeBoltPath(),
        flip: Math.random() > 0.5,
      };
      setStrikes((s) => [...s, newStrike]);
      setFlash((f) => f + 1);

      setTimeout(() => {
        setStrikes((s) => s.filter((x) => x.id !== newStrike.id));
      }, 900);

      const next = 3500 + Math.random() * 4500;
      timeout = setTimeout(spawn, next);
    };

    timeout = setTimeout(spawn, 1800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Screen flash overlay */}
      <AnimatePresence>
        {flash > 0 && (
          <motion.div
            key={flash}
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.08, 0, 0.04, 0] }}
            transition={{ duration: 0.5, times: [0, 0.08, 0.2, 0.32, 1] }}
            onAnimationComplete={() => setFlash((f) => (f > 0 ? 0 : f))}
          />
        )}
      </AnimatePresence>

      {/* Bolts */}
      {strikes.map((s) => (
        <Bolt key={s.id} strike={s} />
      ))}
    </div>
  );
}

function Bolt({ strike }: { strike: Strike }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{
        left: `${strike.xPercent}%`,
        top: "-2%",
        height: "70vh",
        transform: strike.flip ? "scaleX(-1)" : undefined,
      }}
      viewBox="0 0 100 200"
      preserveAspectRatio="xMidYMin meet"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
    >
      <defs>
        <filter id={`glow-${strike.id}`}>
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`bigglow-${strike.id}`}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Halo / outer glow */}
      <motion.path
        d={strike.path}
        stroke="#a78bfa"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.45}
        filter={`url(#bigglow-${strike.id})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.12 }}
      />
      {/* Mid stroke */}
      <motion.path
        d={strike.path}
        stroke="#c4b5fd"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter={`url(#glow-${strike.id})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.1 }}
      />
      {/* Bright core */}
      <motion.path
        d={strike.path}
        stroke="#ffffff"
        strokeWidth={0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.08 }}
      />
    </motion.svg>
  );
}
