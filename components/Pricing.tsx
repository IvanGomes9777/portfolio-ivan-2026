"use client";

import { motion } from "framer-motion";
import {
  Check,
  BadgePercent,
  Wallet,
  CreditCard,
  CalendarClock,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import InfoTooltip from "./InfoTooltip";

// Optional explainer tooltips for specific feature lines.
const featureInfo: Record<string, string> = {
  "Basis-SEO (Meta-Tags, Sitemap, schnelle Ladezeiten)":
    "Basis-SEO heißt: Deine Website ist technisch sauber gebaut, schnell und so strukturiert, dass Google und KI-Suchmaschinen sie problemlos lesen — inklusive Meta-Daten, Sitemap und mobiler Optimierung. So wirst du für deinen Namen und naheliegende Suchen gefunden. Die gezielte Optimierung auf umkämpfte Suchbegriffe und die KI-Sichtbarkeit (GEO) sind ab dem Standard-Paket enthalten.",
  "Volle SEO & GEO Optimierung":
    "Volle SEO & GEO heißt: Ich recherchiere, wonach deine Kunden tatsächlich suchen, und richte Inhalte, Struktur und Daten gezielt darauf aus — inklusive lokaler Optimierung und erweiterter strukturierter Daten. Dazu kommt GEO: deine Inhalte werden so aufbereitet, dass auch KI-Suchmaschinen wie ChatGPT dein Unternehmen verstehen und empfehlen können.",
};

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
    title: "In 2 Monatsraten zahlen",
    highlight: "Jetzt starten, in 2 Monatsraten zahlen",
    desc: "Ich lege los und du zahlst den Betrag bequem in zwei monatlichen Raten — ohne lange Bindung.",
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
      "Google Business Profil + Maps",
      "Basis-SEO (Meta-Tags, Sitemap, schnelle Ladezeiten)",
      "4 Wochen Support",
      "Details im Erstgespräch",
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
      "Alles aus dem Starter-Paket",
      "Premium Design & Polishing",
      "Volle SEO & GEO Optimierung",
      "Google Maps Integration",
      "4 Wochen Support",
      "Details im Erstgespräch",
    ],
    cta: "Details im Erstgespräch",
    highlight: true,
  },
  {
    name: "Premium",
    desc: "Website + Booking System – komplettes Business-Tool",
    priceOld: "€5.600",
    priceNew: "€4.500",
    features: [
      "Alles aus dem Standard-Paket",
      "Mehrseitige Website mit echten Unterseiten (statt One-Pager)",
      "Booking System für Termine",
      "Admin Dashboard",
      "E-Mail Automation",
      "Erweiterte Integrationen",
      "8 Wochen Support",
      "Details im Erstgespräch",
    ],
    cta: "Details im Erstgespräch",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative overflow-x-clip px-4 py-6 md:py-6 max-w-6xl w-full mx-auto">
      {/* ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_60%)] opacity-25 pointer-events-none" />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        {/* heading */}
        <motion.div variants={fadeUp} className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-3">
            <BadgePercent className="size-3 text-[var(--color-accent)]" />
            <span>Transparente Festpreise</span>
          </div>
          <h2 className="font-display text-fluid-h2 tracking-[-0.03em] font-medium leading-[1.05]">
            <span className="bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent">
              Website-Preise
            </span>
          </h2>
          <p className="mt-2 max-w-lg mx-auto text-xs md:text-sm text-[var(--color-ink-soft)] leading-snug">
            Klare Pakete als Richtwert. Such dir aus, was zu deinem Business
            passt — der finale Preis kann je nach Aufwand, Umfang und
            individuellen Wünschen variieren.
          </p>
        </motion.div>

        {/* pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              className={`group relative flex flex-col rounded-[var(--radius-md)] bg-[var(--color-surface)] p-4 md:p-5 transition-shadow duration-300 ${
                tier.highlight
                  ? "glow-accent"
                  : "glow-soft hover:shadow-[0_0_0_1px_var(--color-accent-glow),0_0_50px_-12px_var(--color-accent-glow)]"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] text-[0.6875rem] font-medium tracking-wide uppercase">
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
              <p className="mt-1 text-[0.8125rem] text-[var(--color-ink-soft)] leading-snug">
                {tier.desc}
              </p>

              {/* price */}
              <div className="mt-3 flex items-end gap-2">
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
              <ul className="mt-3 space-y-1 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs md:text-[0.8125rem] text-[var(--color-ink-soft)] leading-snug"
                  >
                    <Check className="size-4 shrink-0 mt-0.5 text-[var(--color-accent)]" />
                    <span>
                      {f}
                      {featureInfo[f] && (
                        <>
                          {" "}
                          <InfoTooltip text={featureInfo[f]} label={f} />
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* button */}
              <a
                href="#kontakt"
                data-cursor-hover
                className={`mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
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

        {/* payment options — compact strip */}
        <motion.div variants={fadeUp} className="mt-4">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-ink-dim)] mb-2">
            <Wallet className="size-3.5 text-[var(--color-accent)]" />
            <span>Flexible Zahlungsoptionen</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {paymentOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.title}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/70 p-3 hover:border-[var(--color-line-strong)] transition-colors"
                >
                  <span className="inline-flex items-center justify-center size-8 shrink-0 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-2)] text-[var(--color-accent)]">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <div className="text-[0.8125rem] font-medium text-[var(--color-ink)] leading-tight">
                      {option.title}
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--color-ink-soft)] leading-snug">
                      {option.highlight}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-center text-xs text-[var(--color-ink-soft)] leading-snug">
            Unabhängig von der gewählten Zahlungsoption wird das Projekt erst
            nach Eingang einer Anzahlung gestartet.
          </p>
        </motion.div>

        {/* info box */}
        <motion.div
          variants={fadeUp}
          className="mt-3 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border-l-4 border-[var(--color-accent)] px-4 py-2.5"
        >
          <p className="text-[0.8125rem] leading-relaxed">
            <span className="font-medium text-[var(--color-accent)]">
              🎉 Eröffnungsaktion: 20% Rabatt
            </span>{" "}
            <span className="text-[var(--color-ink-soft)]">
              — nur für die ersten 10 Kunden. Im kostenlosen Erstgespräch gibt’s
              dein exaktes Angebot.
            </span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
