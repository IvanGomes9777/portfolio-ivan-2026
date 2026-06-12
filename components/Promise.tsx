"use client";

import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, Zap, ShieldCheck, Lock, Search, FileCheck, BadgeEuro, Check, CreditCard, ArrowRight, Globe } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import { usePanelProgress } from "./PanelProgress";
import Orbs from "./backgrounds/Orbs";

// Short commitments shown under the Festpreis promise.
const commitments = [
  "Kostenloses Erstgespräch",
  "Ein fester Ansprechpartner",
  "Du behältst die volle Kontrolle",
];

export default function Promise() {
  const ref = useRef<HTMLDivElement>(null);
  const panelProgress = usePanelProgress(ref);
  // Drive the timeline bar within this panel's slice (0.25 = enter complete, 0.75 = before exit)
  const barWidth = useTransform(panelProgress, [0.25, 0.8], ["0%", "100%"]);

  return (
    <>
      <Orbs />
      <section className="px-4 py-6 md:py-5 max-w-6xl w-full mx-auto" ref={ref}>
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-3"
      >
        {/* main promise card */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-8 relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-soft)] p-5 md:p-7 group"
        >
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.25),transparent_60%)] group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_60%)]" />
          </div>

          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3">
              <Clock className="size-3.5" />
              <span>Das Versprechen</span>
            </div>

            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] leading-[1.05] font-medium">
              Deine neue Website —
              <br />
              <span className="bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-accent-soft)] to-[var(--color-ink)] bg-clip-text text-transparent">
                startklar in 2 bis 4 Wochen.
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Je nach Absprache und Projektumfang kann es mal schneller gehen oder etwas
              länger dauern — aber Flexibilität und absolute Termintreue stehen an
              erster Stelle.
            </p>

            {/* animated timeline */}
            <div className="mt-5 space-y-2">
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

            {/* Festpreis promise — fills the remaining card height */}
            <div className="mt-5 pt-5 border-t border-[var(--color-line)] flex flex-1 flex-col justify-center gap-4">
              <div className="flex items-start gap-3.5">
                <span className="inline-flex items-center justify-center size-11 shrink-0 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)]">
                  <BadgeEuro className="size-5 text-[var(--color-accent)]" />
                </span>
                <div>
                  <div className="font-display text-xl md:text-2xl tracking-[-0.02em] font-medium">
                    Festpreis — garantiert.
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                    Der Preis, den wir vereinbaren, ist der Preis, den du zahlst.
                    Keine versteckten Kosten, kein Stundenlohn, keine Nachkalkulation.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {commitments.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 text-xs text-[var(--color-ink-soft)]"
                  >
                    <Check className="size-3.5 text-[var(--color-accent)]" />
                    {c}
                  </span>
                ))}
              </div>

              {/* Ratenzahlung hint — full options live in the pricing section */}
              <a
                href="/preise"
                data-cursor-hover
                className="group inline-flex items-center gap-2 text-sm text-[var(--color-accent-soft)] hover:text-[var(--color-accent)] transition-colors"
              >
                <CreditCard className="size-4 shrink-0" />
                <span>Lieber in Raten zahlen? Geht auch — Optionen bei den Preisen</span>
                <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* side cards */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3">
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 group hover:border-[var(--color-line-strong)] transition-colors"
          >
            <Zap className="size-5 text-[var(--color-accent)] mb-2" />
            <div className="font-display text-lg md:text-xl tracking-tight">Performant</div>
            <p className="mt-1 text-[13px] text-[var(--color-ink-soft)] leading-snug">
              Geladen, bevor der Daumen zuckt. 95+ Lighthouse-Score als Standard.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 group hover:border-[var(--color-line-strong)] transition-colors"
          >
            <ShieldCheck className="size-5 text-[var(--color-accent)] mb-2" />
            <div className="font-display text-lg md:text-xl tracking-tight">Termintreu</div>
            <p className="mt-1 text-[13px] text-[var(--color-ink-soft)] leading-snug">
              Verbindliche Deadlines. Klare Kommunikation. Keine bösen Überraschungen.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 group hover:border-[var(--color-line-strong)] transition-colors"
          >
            <Lock className="size-5 text-[var(--color-accent)] mb-2" />
            <div className="font-display text-lg md:text-xl tracking-tight">Sicher</div>
            <p className="mt-1 text-[13px] text-[var(--color-ink-soft)] leading-snug">
              Sauber entwickelt — geschützt vor Spam, Angriffen und Datenlecks. Von Anfang an mit dabei.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 group hover:border-[var(--color-line-strong)] transition-colors"
          >
            <FileCheck className="size-5 text-[var(--color-accent)] mb-2" />
            <div className="font-display text-lg md:text-xl tracking-tight">DSGVO-konform</div>
            <p className="mt-1 text-[13px] text-[var(--color-ink-soft)] leading-snug">
              Datenschutz nach deutschem Recht — von Cookie-Banner bis Impressum. Rechtssicher.
            </p>
          </motion.div>
        </div>

        {/* SEO & GEO + Domain — two compact cards side by side */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-6 relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 group hover:border-[var(--color-line-strong)] transition-colors"
        >
          <div className="absolute -top-16 -right-16 size-48 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_60%)] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          <div className="relative flex items-center gap-3 mb-2.5">
            <span className="inline-flex items-center justify-center size-10 shrink-0 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)]">
              <Search className="size-5 text-[var(--color-accent)]" />
            </span>
            <div>
              <div className="font-display text-lg tracking-tight">SEO &amp; GEO</div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-dim)]">
                Ab dem Standard-Paket
              </div>
            </div>
          </div>
          <p className="relative text-[13px] text-[var(--color-ink-soft)] leading-snug">
            Optimiert für klassische Suchmaschinen (SEO) und KI-Antwortmaschinen (GEO) —
            damit dich Kunden in Münster und ganz Deutschland finden: heute bei Google,
            morgen in ChatGPT &amp; Co.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="md:col-span-6 relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 group hover:border-[var(--color-line-strong)] transition-colors"
        >
          <div className="absolute -top-16 -left-16 size-48 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.16),transparent_60%)] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          <div className="relative flex items-center gap-3 mb-2.5">
            <span className="inline-flex items-center justify-center size-10 shrink-0 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)]">
              <Globe className="size-5 text-[var(--color-accent)]" />
            </span>
            <div>
              <div className="font-display text-lg tracking-tight">Domain &amp; DNS-Setup</div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-dim)]">
                Ich kümmere mich drum
              </div>
            </div>
          </div>
          <p className="relative text-[13px] text-[var(--color-ink-soft)] leading-snug">
            Du suchst dir eine Domain aus (z.&nbsp;B. mein-salon.de) und kaufst sie bei
            einem Anbieter deiner Wahl — die technische Einrichtung (DNS) übernehme ich.
            Nach wenigen Stunden ist deine Website online und erreichbar.
          </p>
        </motion.div>
      </motion.div>
      </section>
    </>
  );
}
