"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import MagneticButton from "./MagneticButton";
import Orbs from "./backgrounds/Orbs";

export default function Found() {
  return (
    <>
      <Orbs />
      <section className="px-4 py-[clamp(1.25rem,4.2vh,3.5rem)] max-w-6xl w-full mx-auto">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* heading */}
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-5">
              <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
              <span>Sichtbarkeit</span>
            </div>
            <h2 className="font-display text-fluid-h2lg tracking-[-0.03em] font-medium leading-[1.05]">
              3 Wege, wie deine Website{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent italic">
                gefunden wird.
              </span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed">
              Eine schöne Website bringt nichts, wenn sie niemand findet. Deshalb
              sorge ich dafür, dass dich Kunden genau dort finden, wo sie suchen:
              lokal in der Google-Karte, in den klassischen Suchergebnissen — und
              zunehmend auch in KI-Antworten. Basis-SEO ist bei jeder Website
              inklusive, die volle SEO- & GEO-Optimierung ab dem Standard-Paket.
              Gut zu wissen: Sichtbarkeit wächst über Zeit — erste Effekte zeigen
              sich meist nach 2–3 Monaten.
            </p>
          </motion.div>

          {/* three pillars */}
          <div className="mt-[clamp(1.25rem,3.2vh,2.5rem)] grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* SEO */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-soft)] p-5 group hover:border-[var(--color-line-strong)] transition-colors"
            >
              <div className="absolute -top-20 -right-20 size-56 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_60%)] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center justify-center size-11 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)] mb-3">
                  <Search className="size-5 text-[var(--color-accent)]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-display text-fluid-h3 tracking-tight font-medium">
                    SEO
                  </h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-dim)]">
                    Search Engine Optimization
                  </span>
                </div>
                <p className="mt-4 text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed">
                  SEO bedeutet die Optimierung für klassische Suchmaschinen wie Google.
                  Deine Website wird technisch sauber aufgebaut, mit den richtigen
                  Inhalten, Keywords, schnellen Ladezeiten und einer klaren Struktur
                  versehen — damit Google genau versteht, worum es geht. Das Ergebnis:
                  Du erscheinst weiter oben in den Suchergebnissen und wirst gefunden,
                  genau dann, wenn ein potenzieller Kunde nach deiner Leistung sucht.
                </p>
              </div>
            </motion.div>

            {/* Local SEO */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-soft)] p-5 group hover:border-[var(--color-line-strong)] transition-colors"
            >
              <div className="absolute -top-20 -right-20 size-56 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.18),transparent_60%)] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center justify-center size-11 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)] mb-3">
                  <MapPin className="size-5 text-[var(--color-accent)]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-display text-fluid-h3 tracking-tight font-medium">
                    Local SEO
                  </h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-dim)]">
                    Lokal gefunden werden
                  </span>
                </div>
                <p className="mt-4 text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed">
                  Für lokale Unternehmen der entscheidende Hebel: Wer in deiner
                  Stadt nach deiner Leistung sucht, soll dich in der Google-Karte
                  und im „Local Pack" ganz oben sehen. Dafür optimiere ich dein
                  Google-Business-Profil, sorge für einheitliche Unternehmensdaten
                  und eine durchdachte Bewertungs-Strategie — denn gute Bewertungen
                  entscheiden oft darüber, ob ein Kunde bei dir oder beim Nachbarn
                  anruft.
                </p>
              </div>
            </motion.div>

            {/* GEO */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-soft)] p-5 group hover:border-[var(--color-line-strong)] transition-colors"
            >
              <div className="absolute -top-20 -right-20 size-56 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_60%)] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center justify-center size-11 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)] mb-3">
                  <Sparkles className="size-5 text-[var(--color-accent)]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-display text-fluid-h3 tracking-tight font-medium">
                    GEO
                  </h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-dim)]">
                    Generative Engine Optimization
                  </span>
                </div>
                <p className="mt-4 text-sm md:text-base text-[var(--color-ink-soft)] leading-relaxed">
                  GEO bedeutet die Optimierung für KI-Antwortmaschinen wie ChatGPT,
                  Gemini oder Perplexity. Immer mehr Menschen stellen ihre Fragen direkt
                  einer KI, statt zu googeln. GEO sorgt dafür, dass deine Inhalte so
                  strukturiert und formuliert sind, dass diese Systeme dein Unternehmen
                  verstehen, zitieren und aktiv weiterempfehlen — damit du auch in der
                  neuen Generation der Suche sichtbar bleibst und nicht übersehen wirst.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA button */}
          <motion.div variants={fadeUp} className="mt-[clamp(1rem,2.6vh,2.5rem)] flex justify-center">
            <MagneticButton strength={0.3}>
              <a
                href="#kontakt"
                data-cursor-hover
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-accent-strong)] hover:bg-[var(--color-accent)] text-white text-sm font-medium pulse-glow transition-colors"
              >
                <span>Kostenloses Erstgespräch</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
