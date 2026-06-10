"use client";

import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  BadgePercent,
  Wallet,
  CreditCard,
  CalendarClock,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

type PaymentOption = {
  icon: typeof Wallet;
  title: string;
  highlight: string;
  desc: string;
};

const paymentOptions: PaymentOption[] = [
  {
    icon: Wallet,
    title: "Anzahlung + Ratenzahlung",
    highlight: "30% Anzahlung, dann 6× monatliche Raten",
    desc: "Starte mit einer kleinen Anzahlung und verteile den Rest bequem über sechs Monate.",
  },
  {
    icon: CreditCard,
    title: "Volle Zahlung sofort",
    highlight: "100% im Voraus, keine Gebühren",
    desc: "Bezahle den kompletten Betrag direkt — unkompliziert und ohne zusätzliche Kosten.",
  },
  {
    icon: CalendarClock,
    title: "In 2 Monaten zahlen",
    highlight: "Jetzt starten, in 2 Monaten zahlen",
    desc: "Wir legen los und du zahlst den vollen Betrag erst in zwei Monaten — dann ist alles erledigt.",
  },
];

type Tier = {
  name: string;
  desc: string;
  priceOld: string;
  priceNew: string;
  features: string[];
  cta: string;
  highlight: boolean;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    desc: "Simple Website – alle Infos auf einer Seite",
    priceOld: "€1.900",
    priceNew: "€1.500",
    features: [
      "One-Pager – alles auf einer Seite (Sections)",
      "Responsive Design",
      "Kontaktformular",
      "Google Business Integration",
      "4 Wochen Support",
    ],
    cta: "Details im Erstgespräch",
    highlight: false,
  },
  {
    name: "Standard",
    desc: "Premium Website – mehr Design & Features",
    priceOld: "€3.100",
    priceNew: "€2.500",
    features: [
      "One-Pager – alles auf einer Seite (Sections)",
      "Premium Design & Polishing",
      "Responsive Design",
      "SEO & GEO optimiert",
      "Google Maps Integration",
      "Kontaktformular",
      "4 Wochen Support",
    ],
    cta: "Details im Erstgespräch",
    highlight: true,
  },
  {
    name: "Premium",
    desc: "Website + Booking System – komplettes Business-Tool",
    priceOld: "€4.400",
    priceNew: "€3.500",
    features: [
      "Mehrseitige Website mit echten Unterseiten (Multi-Page, kein One-Pager)",
      "Premium Design & Polishing",
      "SEO & GEO optimiert",
      "Booking System für Termine",
      "Admin Dashboard",
      "E-Mail Automation",
      "Google Maps & Integrationen",
      "8 Wochen Support",
    ],
    cta: "Details im Erstgespräch",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative overflow-x-clip px-4 py-10 md:py-8 max-w-6xl w-full mx-auto">
      {/* ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_60%)] opacity-30 pointer-events-none" />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        {/* heading */}
        <motion.div variants={fadeUp} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-4">
            <BadgePercent className="size-3 text-[var(--color-accent)]" />
            <span>Transparente Festpreise</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] font-medium leading-[1.05]">
            Website-Preise
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Klare Pakete als Richtwert. Such dir aus, was zu deinem Business
            passt — der finale Preis kann je nach Aufwand, Umfang und
            individuellen Wünschen variieren.
          </p>
        </motion.div>

        {/* pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              className={`group relative flex flex-col rounded-[var(--radius-md)] bg-[var(--color-surface)] p-6 md:p-7 transition-shadow duration-300 ${
                tier.highlight
                  ? "glow-accent"
                  : "glow-soft hover:shadow-[0_0_0_1px_var(--color-accent-glow),0_0_50px_-12px_var(--color-accent-glow)]"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] text-[11px] font-medium tracking-wide uppercase">
                  Beliebteste Wahl
                </div>
              )}

              {/* title */}
              <h3
                className={`font-display text-xl font-bold tracking-tight ${
                  tier.highlight
                    ? "text-[var(--color-accent-strong)]"
                    : "text-[var(--color-ink)]"
                }`}
              >
                {tier.name}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-ink-soft)] leading-snug">
                {tier.desc}
              </p>

              {/* price */}
              <div className="mt-5 flex items-end gap-2">
                <span className="mb-1.5 text-sm font-medium text-[var(--color-ink-soft)]">
                  ab
                </span>
                <span className="font-display text-3xl md:text-4xl font-bold text-[var(--color-accent)]">
                  {tier.priceNew}
                </span>
                <span className="mb-1 text-sm text-[var(--color-ink-dim)] line-through">
                  {tier.priceOld}
                </span>
              </div>

              {/* features */}
              <ul className="mt-5 space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[13px] md:text-sm text-[var(--color-ink-soft)] leading-snug"
                  >
                    <Check className="size-4 shrink-0 mt-0.5 text-[var(--color-accent)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* button */}
              <a
                href="#kontakt"
                data-cursor-hover
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                  tier.highlight
                    ? "bg-[var(--color-accent)] text-[var(--color-bg)] pulse-glow hover:bg-[var(--color-accent-soft)]"
                    : "border border-[var(--color-accent)] text-[var(--color-accent)] hover:shadow-[0_0_0_1px_var(--color-accent-glow),0_0_30px_-8px_var(--color-accent-glow)]"
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* payment options */}
        <motion.div variants={fadeUp} className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-4">
            <Wallet className="size-3 text-[var(--color-accent)]" />
            <span>Flexible Zahlungsoptionen</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl lg:text-3xl tracking-[-0.03em] font-medium leading-[1.05]">
            Zahlung, die zu dir passt
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Wähle die Zahlungsweise, die am besten zu deinem Budget passt — fair,
            transparent und ohne versteckte Kosten.
          </p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                variants={fadeUp}
                className="group relative flex flex-col rounded-[var(--radius-md)] bg-[var(--color-surface)] glow-soft p-6 md:p-7 transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--color-accent-glow),0_0_50px_-12px_var(--color-accent-glow)]"
              >
                <span className="inline-flex items-center justify-center size-11 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-2)] text-[var(--color-accent)]">
                  <Icon className="size-5" />
                </span>
                <h4 className="mt-4 font-display text-lg font-bold tracking-tight text-[var(--color-ink)]">
                  {option.title}
                </h4>
                <p className="mt-2 text-sm font-medium text-[var(--color-accent)]">
                  {option.highlight}
                </p>
                <p className="mt-2 text-[13px] md:text-sm text-[var(--color-ink-soft)] leading-snug">
                  {option.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* info box */}
        <motion.div
          variants={fadeUp}
          className="mt-6 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border-l-4 border-[var(--color-accent)] p-5 md:p-6"
        >
          <p className="font-medium text-[var(--color-accent)]">
            🎉 Eröffnungsaktion: 20% Rabatt auf alle Pakete!
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Nur für die ersten 10 Kunden. Danach gelten die Normalpreise. Lass
            mich in einem kostenlosen Gespräch deine Anforderungen verstehen,
            dann gebe ich dir ein exaktes Angebot.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-6 flex justify-center">
          <a
            href="#kontakt"
            data-cursor-hover
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] px-8 py-3 text-sm font-medium pulse-glow hover:bg-[var(--color-accent-soft)] transition-colors"
          >
            <span>Kostenloses Erstgespräch buchen</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
