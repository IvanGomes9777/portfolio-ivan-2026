"use client";

import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Wrench,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

type Plan = {
  name: string;
  price: string;
  desc: string;
  idealFor?: string;
  features: string[];
  highlight: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: "Standard",
    price: "150 €",
    desc: "Rundum-Schutz für deine Website — sicher, aktuell und schnell.",
    features: [
      "Wöchentliche Updates von System, Plugins & Komponenten",
      "Tägliche automatisierte Backups (bis zu 90 Tage Speicherung)",
      "Tägliche Sicherheitsscans & Malware-Überwachung",
      "Performance-Monitoring & Überwachung der Ladezeiten",
      "Priorisierter Support — Bearbeitung in 48 Stunden",
      "Inhaltliche Pflege — bis zu 10 Std./Monat (≈ 20–40 kleine Änderungen: Texte, Bilder, Anpassungen)",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "250 €",
    desc: "Maximale Absicherung für geschäftskritische Websites.",
    idealFor:
      "Ideal für komplexere Websites mit Buchungssystemen, Online-Shops, größere Unternehmen oder Seiten mit hohem Traffic — wenn Ausfallzeiten teuer werden.",
    features: [
      "Wöchentliche Updates von System, Plugins & Komponenten",
      "Tägliche automatisierte Backups (bis zu 90 Tage Speicherung)",
      "Tägliche Sicherheitsscans & Malware-Überwachung",
      "Performance-Monitoring & Überwachung der Ladezeiten",
      "Priorisierter Support — Bearbeitung in 24 Stunden",
      "SEO-Optimierung & Suchmaschinen-Monitoring",
      "Staging-Umgebung für sichere Tests vor dem Livegang",
      "Inhaltliche Pflege & erweiterte Anpassungen — bis zu 15 Std./Monat (≈ 30–60 Änderungen)",
    ],
    highlight: true,
    badge: "Rundum sorglos",
  },
];

export default function Maintenance() {
  return (
    <section className="relative overflow-x-clip px-4 py-10 md:py-8 max-w-5xl w-full mx-auto">
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
        <motion.div variants={fadeUp} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-4">
            <Wrench className="size-3 text-[var(--color-accent)]" />
            <span>Wartung & Pflege</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] font-medium leading-[1.05]">
            Nach dem Launch{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent italic">
              lasse ich dich nicht allein.
            </span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Deine Website ist online — und ich sorge dafür, dass sie sicher,
            schnell und aktuell bleibt. Optionale monatliche Pakete, jederzeit
            kündbar.
          </p>
        </motion.div>

        {/* plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`group relative flex flex-col rounded-[var(--radius-md)] bg-[var(--color-surface)] p-5 md:p-6 transition-shadow duration-300 ${
                plan.highlight
                  ? "glow-accent"
                  : "glow-soft hover:shadow-[0_0_0_1px_var(--color-accent-glow),0_0_50px_-12px_var(--color-accent-glow)]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] text-[11px] font-medium tracking-wide uppercase whitespace-nowrap">
                  <ShieldCheck className="size-3" />
                  {plan.badge}
                </div>
              )}

              {/* title */}
              <h3
                className={`font-display text-xl font-bold tracking-tight ${
                  plan.highlight
                    ? "text-[var(--color-accent-strong)]"
                    : "text-[var(--color-ink)]"
                }`}
              >
                {plan.name}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-ink-soft)] leading-snug">
                {plan.desc}
              </p>

              {/* price */}
              <div className="mt-4 flex items-end gap-1.5">
                <span className="font-display text-3xl md:text-4xl font-bold text-[var(--color-accent)]">
                  {plan.price}
                </span>
                <span className="mb-1.5 text-sm font-medium text-[var(--color-ink-soft)]">
                  / Monat
                </span>
              </div>

              {plan.idealFor && (
                <div className="mt-4 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-line)] px-3.5 py-2.5 text-xs text-[var(--color-ink-soft)] leading-snug">
                  {plan.idealFor}
                </div>
              )}

              {/* features */}
              <ul className="mt-4 space-y-1.5 flex-1">
                {plan.features.map((f) => (
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
                className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  plan.highlight
                    ? "bg-[var(--color-accent)] text-[var(--color-bg)] pulse-glow hover:bg-[var(--color-accent-soft)]"
                    : "border border-[var(--color-accent)] text-[var(--color-accent)] hover:shadow-[0_0_0_1px_var(--color-accent-glow),0_0_30px_-8px_var(--color-accent-glow)]"
                }`}
              >
                Paket anfragen
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* footnote */}
        <motion.div
          variants={fadeUp}
          className="mt-5 flex items-center justify-center gap-2 text-xs text-[var(--color-ink-dim)]"
        >
          <Clock className="size-3.5 text-[var(--color-accent)]" />
          <span>
            Content-Pflege (Bilder & Texte) ist hier bereits inklusive — ein
            separates Content-Paket brauchst du dann nicht. Wartung ist optional,
            du entscheidest nach dem Launch.
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
