"use client";

import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, Zap, ShieldCheck, Lock, Search, FileCheck } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import { usePanelProgress } from "./PanelProgress";
import Orbs from "./backgrounds/Orbs";

export default function Promise() {
  const ref = useRef<HTMLDivElement>(null);
  const panelProgress = usePanelProgress(ref);
  // Drive the timeline bar within this panel's slice (0.25 = enter complete, 0.75 = before exit)
  const barWidth = useTransform(panelProgress, [0.25, 0.8], ["0%", "100%"]);

  return (
    <>
      <Orbs />
      <section className="px-4 py-16 md:py-12 max-w-6xl w-full mx-auto" ref={ref}>
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-4"
      >
        {/* main promise card */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-8 relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-soft)] p-8 md:p-10 group"
        >
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.25),transparent_60%)] group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_60%)]" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-5">
              <Clock className="size-3.5" />
              <span>Das Versprechen</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.05] font-medium">
              Deine neue Website —
              <br />
              <span className="bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-accent-soft)] to-[var(--color-ink)] bg-clip-text text-transparent">
                startklar in 2 bis 4 Wochen.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed">
              Je nach Absprache und Projektumfang kann es mal schneller gehen oder etwas
              länger dauern — aber Flexibilität und absolute Termintreue stehen an
              erster Stelle.
            </p>

            {/* animated timeline */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between text-xs text-[var(--color-ink-dim)] uppercase tracking-[0.2em]">
                <span>Woche 1</span>
                <span>Woche 2</span>
                <span>Woche 3</span>
                <span>Launch</span>
              </div>
              <div className="relative h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  style={{ width: barWidth }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-accent-strong)] via-[var(--color-accent)] to-[var(--color-accent-soft)] shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                />
                <motion.div
                  style={{ left: barWidth }}
                  className="absolute -top-1 size-3.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* side cards */}
        <div className="md:col-span-4 grid gap-4">
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 group hover:border-[var(--color-line-strong)] transition-colors"
          >
            <Zap className="size-5 text-[var(--color-accent)] mb-3" />
            <div className="font-display text-xl md:text-2xl tracking-tight">Performant</div>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Geladen, bevor der Daumen zuckt. 95+ Lighthouse-Score als Standard.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 group hover:border-[var(--color-line-strong)] transition-colors"
          >
            <ShieldCheck className="size-5 text-[var(--color-accent)] mb-3" />
            <div className="font-display text-xl md:text-2xl tracking-tight">Termintreu</div>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Verbindliche Deadlines. Klare Kommunikation. Keine bösen Überraschungen.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 group hover:border-[var(--color-line-strong)] transition-colors"
          >
            <Lock className="size-5 text-[var(--color-accent)] mb-3" />
            <div className="font-display text-xl md:text-2xl tracking-tight">Sicher</div>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Sauber und sicher entwickelt — geschützt vor Spam, Angriffen und
              Datenlecks. Sicherheit ist von Anfang an mit dabei.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 group hover:border-[var(--color-line-strong)] transition-colors"
          >
            <FileCheck className="size-5 text-[var(--color-accent)] mb-3" />
            <div className="font-display text-xl md:text-2xl tracking-tight">DSGVO-konform</div>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Datenschutz nach deutschem Recht — von Cookie-Banner bis Impressum.
              Deine Website ist rechtssicher und DSGVO-konform.
            </p>
          </motion.div>
        </div>

        {/* SEO & GEO — inklusive bei jeder Website */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-12 relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 flex flex-col sm:flex-row sm:items-center gap-4 group hover:border-[var(--color-line-strong)] transition-colors"
        >
          <div className="absolute -top-16 -right-16 size-48 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_60%)] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          <div className="relative inline-flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center justify-center size-11 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)]">
              <Search className="size-5 text-[var(--color-accent)]" />
            </span>
            <div>
              <div className="font-display text-xl tracking-tight">SEO &amp; GEO inklusive</div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-dim)]">
                Gefunden werden
              </div>
            </div>
          </div>
          <p className="relative text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Jede Website wird für klassische Suchmaschinen (SEO) und KI-Antwortmaschinen
            (GEO) optimiert — damit dich Kunden in Münster und ganz Deutschland finden:
            heute bei Google, morgen in ChatGPT &amp; Co.
          </p>
        </motion.div>
      </motion.div>
      </section>
    </>
  );
}
