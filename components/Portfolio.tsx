"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Akeed Friseur",
    branche: "Friseursalon",
    year: "2026",
    accent: "from-amber-500/30 via-orange-500/20 to-rose-500/10",
    pattern: "barber",
  },
  {
    name: "Mauro Ricardo",
    branche: "Personal Brand",
    year: "2026",
    accent: "from-violet-500/30 via-indigo-500/20 to-blue-500/10",
    pattern: "minimal",
  },
  {
    name: "Reinigung München",
    branche: "Gebäudereinigung",
    year: "2025",
    accent: "from-emerald-500/30 via-teal-500/20 to-cyan-500/10",
    pattern: "grid",
  },
  {
    name: "Studio Linde",
    branche: "Café & Bäckerei",
    year: "2025",
    accent: "from-rose-500/30 via-pink-500/20 to-fuchsia-500/10",
    pattern: "dots",
  },
];

export default function Portfolio() {
  return (
    <section className="px-4 py-16 md:py-12 max-w-6xl w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-6">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>Ausgewählte Arbeiten</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] font-medium leading-[1.05]">
            Projekte, auf die ich
            <br />
            <span className="italic text-[var(--color-ink-soft)]">stolz bin.</span>
          </h2>
        </div>
        <p className="max-w-sm text-[var(--color-ink-soft)] text-sm leading-relaxed">
          Eine kleine Auswahl. Jedes Projekt — von der ersten Skizze bis zum Launch —
          maßgeschneidert für ein lokales Unternehmen.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href="#kontakt"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-line-strong)] transition-all duration-500"
          >
            {/* mockup */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
              <MockupPattern pattern={p.pattern} />

              {/* browser frame mockup */}
              <div className="absolute inset-4 md:inset-5 rounded-xl border border-white/10 bg-[var(--color-bg-soft)]/80 backdrop-blur shadow-2xl overflow-hidden group-hover:scale-[1.03] group-hover:-translate-y-1 transition-transform duration-700 ease-out">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-3 w-2/3 rounded-full bg-white/15" />
                  <div className="h-3 w-1/2 rounded-full bg-white/10" />
                  <div className="mt-4 grid grid-cols-3 gap-1.5">
                    <div className="aspect-square rounded bg-white/8" />
                    <div className="aspect-square rounded bg-white/8" />
                    <div className="aspect-square rounded bg-white/8" />
                  </div>
                </div>
              </div>

              {/* glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.25),transparent_60%)]" />
              </div>
            </div>

            {/* meta */}
            <div className="relative p-5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-display text-base md:text-lg tracking-tight font-medium truncate">
                  {p.name}
                </div>
                <div className="mt-1 text-xs text-[var(--color-ink-dim)] flex items-center gap-2">
                  <span className="truncate">{p.branche}</span>
                  <span className="size-1 shrink-0 rounded-full bg-[var(--color-ink-dim)]" />
                  <span className="shrink-0">{p.year}</span>
                </div>
              </div>
              <div className="size-9 shrink-0 rounded-full border border-[var(--color-line)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/10 transition-all">
                <ArrowUpRight className="size-4 text-[var(--color-ink-soft)] group-hover:text-[var(--color-accent-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>

            {/* hover border glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.5),0_0_40px_-10px_rgba(139,92,246,0.45)]" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function MockupPattern({ pattern }: { pattern: string }) {
  if (pattern === "grid") {
    return (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    );
  }
  if (pattern === "dots") {
    return (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
    );
  }
  if (pattern === "barber") {
    return (
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 6px, transparent 6px 18px)",
        }}
      />
    );
  }
  return null;
}
