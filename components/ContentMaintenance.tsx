"use client";

import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  ImageIcon,
  Star,
  Clock,
  Info,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

type ContentPlan = {
  name: string;
  price: string;
  term: string;
  total: string;
  desc: string;
  changes: string;
  features: string[];
  saving?: string;
  highlight: boolean;
  badge?: string;
};

const plans: ContentPlan[] = [
  {
    name: "Monatlich kündbar",
    price: "75 €",
    term: "Keine Mindestlaufzeit — monatlich kündbar mit 1 Monat Frist",
    total: "Je nachdem, wie lange du bleibst",
    desc: "Maximale Flexibilität für alle, die häufig Änderungen brauchen.",
    changes: "10 Änderungen pro Woche (40 im Monat)",
    features: [
      "Bilder hochladen & austauschen",
      "Texte & Inhalte bearbeiten",
      "Öffnungszeiten & Preise aktualisieren",
      "Neue Galerien & Fotos hinzufügen",
      "Turnaround: bis 48 Stunden Bearbeitung",
    ],
    highlight: false,
  },
  {
    name: "1 Jahr Vertrag",
    price: "55 €",
    term: "1 Jahr Mindestvertrag, danach monatlich kündbar (1 Monat Frist)",
    total: "660 € für 12 Monate",
    desc: "Standard für regelmäßige, aber nicht ständige Updates.",
    changes: "5 Änderungen pro Woche (20 im Monat)",
    features: [
      "Bilder hochladen & austauschen",
      "Texte & Inhalte bearbeiten",
      "Öffnungszeiten & Preise aktualisieren",
      "Neue Galerien & Fotos hinzufügen",
      "Turnaround: bis 48 Stunden Bearbeitung",
    ],
    highlight: false,
  },
  {
    name: "2 Jahre Vertrag",
    price: "45 €",
    term: "2 Jahre Mindestvertrag, danach monatlich kündbar (1 Monat Frist)",
    total: "1.080 € für 24 Monate",
    desc: "Beste Preis-Leistung für langfristige Planungssicherheit.",
    changes: "5 Änderungen pro Woche (20 im Monat)",
    saving: "Sparst 120 €/Jahr (240 € über 2 Jahre) gegenüber dem 1-Jahres-Paket",
    features: [
      "Bilder hochladen & austauschen",
      "Texte & Inhalte bearbeiten",
      "Öffnungszeiten & Preise aktualisieren",
      "Neue Galerien & Fotos hinzufügen",
      "Turnaround: bis 48 Stunden Bearbeitung",
    ],
    highlight: true,
    badge: "Beliebt",
  },
];

export default function ContentMaintenance() {
  return (
    <section className="relative overflow-x-clip px-4 py-10 md:py-8 max-w-6xl w-full mx-auto">
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
            <ImageIcon className="size-3 text-[var(--color-accent)]" />
            <span>Content-Pflege</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] font-medium leading-[1.05]">
            Bilder & Texte{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent italic">
              jederzeit ändern.
            </span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Du schickst mir die Änderung — ich setze sie um. Neue Fotos,
            aktualisierte Preise oder frische Texte, flexibel und zuverlässig.
            Wähle das Paket, das zu deinem Update-Rhythmus passt.
          </p>
        </motion.div>

        {/* plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  <Star className="size-3" />
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

              {/* term + total */}
              <p className="mt-2 text-xs text-[var(--color-ink-dim)] leading-snug">
                {plan.term}
              </p>
              <p className="mt-1 text-xs font-medium text-[var(--color-ink-soft)]">
                {plan.total}
              </p>

              {/* changes highlight */}
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-line)] px-3.5 py-2.5 text-xs text-[var(--color-ink-soft)] leading-snug">
                <Check className="size-4 shrink-0 mt-0.5 text-[var(--color-accent)]" />
                <span>{plan.changes}</span>
              </div>

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

              {plan.saving && (
                <div className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full border border-[var(--color-accent)]/40 px-3 py-1 text-[11px] font-medium text-[var(--color-accent)]">
                  🎁 {plan.saving}
                </div>
              )}

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

        {/* what counts as a change */}
        <motion.div
          variants={fadeUp}
          className="mt-5 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border-l-4 border-[var(--color-accent)] px-5 py-4"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent)]">
            <Info className="size-4" />
            <span>Was zählt als 1 Änderung?</span>
          </div>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Eine Änderung ist entweder <strong>1 Bild wechseln</strong> oder{" "}
            <strong>1 Textblock bearbeiten</strong>. Beispiel: „2 neue Bilder +
            neuer Text“ = 3 Änderungen. Nicht enthalten sind Design-Umbauten,
            neue Seiten, SEO-Arbeiten oder Grafik- und Videobearbeitung.
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Reine Content-Pflege — <strong>ohne</strong> technische Wartung
            (Updates, Backups, Sicherheit). Wenn du die komplette Technik
            mitbetreut haben möchtest, ist Content schon in den{" "}
            <strong>Wartung &amp; Pflege</strong>-Paketen enthalten — dann
            brauchst du kein separates Content-Paket.
          </p>
        </motion.div>

        {/* footnote */}
        <motion.div
          variants={fadeUp}
          className="mt-5 flex items-center justify-center gap-2 text-xs text-[var(--color-ink-dim)]"
        >
          <Clock className="size-3.5 text-[var(--color-accent)]" />
          <span>
            Bearbeitung Mo–Fr, 9–17 Uhr · Änderungen per E-Mail oder
            Kontaktformular einreichen · jederzeit Upgrade in ein höheres Paket
            möglich.
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
