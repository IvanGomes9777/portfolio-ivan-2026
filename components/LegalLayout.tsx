"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LegalLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100svh] px-4 py-24 sm:py-32 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-ink-dim)] hover:text-[var(--color-ink-soft)] transition-colors mb-10"
        >
          <ArrowLeft className="size-3" />
          Zurück zur Startseite
        </Link>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] font-medium leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-sm text-[var(--color-ink-dim)] uppercase tracking-[0.2em]">
            {subtitle}
          </p>
        )}

        <div className="mt-12 space-y-10 text-[var(--color-ink-soft)] leading-relaxed text-[15px]">
          {children}
        </div>
      </motion.div>
    </main>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl md:text-2xl text-[var(--color-ink)] tracking-[-0.02em] font-medium">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function Sub({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-display text-base text-[var(--color-ink)] tracking-tight font-medium">
        {title}
      </h3>
      {children}
    </div>
  );
}
