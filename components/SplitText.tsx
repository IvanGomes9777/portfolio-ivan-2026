"use client";

import { motion, Variants } from "framer-motion";

export default function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const word: Variants = {
    hidden: { y: "100%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-baseline pb-[0.12em]"
        >
          <motion.span
            variants={word}
            className={`inline-block ${wordClassName}`}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
