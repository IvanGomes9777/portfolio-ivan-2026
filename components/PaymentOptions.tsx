"use client";

import { motion } from "framer-motion";
import { Wallet, CreditCard, CalendarClock } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

type PaymentOption = {
  icon: typeof Wallet;
  title: string;
  highlight: string;
  desc: string;
};

// Payment options without any concrete figures — the exact amounts and rates
// are discussed individually in the free first call (and shared as a separate
// price document on request).
const paymentOptions: PaymentOption[] = [
  {
    icon: Wallet,
    title: "Anzahlung + Ratenzahlung",
    highlight: "Kleine Anzahlung, Rest bequem in monatlichen Raten",
    desc: "Starte mit einer überschaubaren Anzahlung und verteile den Rest entspannt über mehrere Monate.",
  },
  {
    icon: CreditCard,
    title: "Volle Zahlung sofort",
    highlight: "Kompletter Betrag im Voraus — ohne Gebühren",
    desc: "Bezahle den vereinbarten Betrag direkt — unkompliziert und ohne zusätzliche Kosten.",
  },
  {
    icon: CalendarClock,
    title: "In Monatsraten zahlen",
    highlight: "Jetzt starten, in mehreren Monatsraten zahlen",
    desc: "Ich lege los und du zahlst den Betrag bequem in monatlichen Raten — ohne lange Bindung.",
  },
];

export default function PaymentOptions() {
  return (
    <section className="relative overflow-x-clip px-4 py-[clamp(1rem,3vh,2rem)] max-w-5xl w-full mx-auto">
      {/* ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_60%)] opacity-20 pointer-events-none" />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        {/* heading */}
        <motion.div variants={fadeUp} className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-3">
            <Wallet className="size-3 text-[var(--color-accent)]" />
            <span>Flexible Zahlungsoptionen</span>
          </div>
          <h2 className="font-display text-fluid-h2 tracking-[-0.03em] font-medium leading-[1.05]">
            Zahlung,{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent italic">
              wie es zu dir passt.
            </span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Ob auf einmal oder in Raten — wir finden die passende Lösung. Den
            genauen Betrag und die konkreten Konditionen besprechen wir
            unverbindlich im kostenlosen Erstgespräch.
          </p>
        </motion.div>

        {/* options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                variants={fadeUp}
                className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)]/70 p-4 hover:border-[var(--color-line-strong)] transition-colors"
              >
                <span className="inline-flex items-center justify-center size-10 shrink-0 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-2)] text-[var(--color-accent)]">
                  <Icon className="size-5" />
                </span>
                <div>
                  <div className="text-[0.9375rem] font-medium text-[var(--color-ink)] leading-tight">
                    {option.title}
                  </div>
                  <div className="mt-1 text-[0.8125rem] font-medium text-[var(--color-accent-soft)] leading-snug">
                    {option.highlight}
                  </div>
                  <div className="mt-2 text-xs text-[var(--color-ink-soft)] leading-snug">
                    {option.desc}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* PayPal note */}
        <motion.div variants={fadeUp} className="mt-4">
          <p className="flex items-center justify-center gap-1.5 text-center text-sm leading-snug">
            <CreditCard className="size-4 shrink-0 text-[var(--color-accent)]" />
            <span className="font-medium text-[var(--color-accent)]">
              Zahlung auch bequem per PayPal möglich
            </span>
          </p>
        </motion.div>

        {/* info box */}
        <motion.div
          variants={fadeUp}
          className="mt-3 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border-l-4 border-[var(--color-accent)] px-4 py-2.5"
        >
          <p className="text-[0.8125rem] text-[var(--color-ink-soft)] leading-relaxed">
            Unabhängig von der gewählten Zahlungsoption wird das Projekt erst nach
            Eingang einer Anzahlung gestartet.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
