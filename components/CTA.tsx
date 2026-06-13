"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Send, Check, AlertCircle, Phone, Plus } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Aurora from "./backgrounds/Aurora";

const EMAIL = "ivanvilargomes@gmail.com";

// WhatsApp: number in international format without "+"/spaces (from the
// Impressum: +49 176 60847103 → 0176 60847103). The prefilled text gives a
// light template so people can message directly — without the contact form.
const WHATSAPP_NUMBER = "4917660847103";
const WHATSAPP_TEXT =
  "Hallo Ivan, ich interessiere mich für eine Website.\n\nName: \nAnliegen: ";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT,
)}`;

type Wunsch = "" | "neu" | "relaunch";
type Paket = "" | "starter" | "standard" | "premium";
type ContentPaket = "" | "monatlich" | "jahr1" | "jahr2";
type Auftraggeber = "" | "unternehmen" | "privat";
type Status = "idle" | "sending" | "success" | "error";

export default function CTA() {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    msg: string;
    wunsch: Wunsch;
    paket: Paket;
    contentPaket: ContentPaket;
    auftraggeber: Auftraggeber;
    // Honeypot — must stay empty for real users.
    company: string;
  }>({
    name: "",
    email: "",
    phone: "",
    msg: "",
    wunsch: "",
    paket: "",
    contentPaket: "",
    auftraggeber: "",
    company: "",
  });
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!form.auftraggeber) {
      setStatus("error");
      setErrorMsg(
        "Bitte gib an, ob du als Unternehmen/Gewerbe oder als Privatperson anfragst.",
      );
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: phoneOpen ? form.phone : "",
          msg: form.msg,
          wunsch: form.wunsch,
          paket: form.paket,
          contentPaket: form.contentPaket,
          auftraggeber: form.auftraggeber,
          company: form.company,
        }),
      });
      const data = (await res.json()) as { success: boolean; message?: string };

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", msg: "", wunsch: "", paket: "", contentPaket: "", auftraggeber: "", company: "" });
        setPhoneOpen(false);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Anfrage konnte nicht gesendet werden.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Verbindungsfehler — bitte später erneut versuchen.");
    }
  };

  return (
    <>
      <Aurora />
      <section className="px-4 py-12 md:py-8 w-full">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rotating-border rounded-[2rem] bg-[var(--color-bg-soft)] p-8 md:p-14 overflow-hidden"
          >
            {/* ambient glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.2),transparent_60%)] pointer-events-none" />

            <div className="relative grid md:grid-cols-5 gap-10 md:gap-14 items-start">
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur text-xs text-[var(--color-ink-soft)] mb-6">
                  <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  <span>Antwort innerhalb von 24 Stunden</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl tracking-[-0.03em] font-medium leading-[1.05]">
                  Lass uns dein Projekt
                  <br />
                  <span className="bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent italic">
                    besprechen.
                  </span>
                </h2>
                <p className="mt-5 text-[var(--color-ink-soft)] leading-relaxed text-sm md:text-base">
                  Sichere dir dein kostenloses Erstgespräch. Unverbindlich, ehrlich —
                  und garantiert ohne Sales-Pitch.
                </p>

                <div className="mt-7 flex flex-col gap-4">
                  {/* Direct WhatsApp — no form needed */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    aria-label="Direkt über WhatsApp schreiben"
                    className="group inline-flex items-center gap-2.5 w-fit px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#04210f] text-sm font-semibold transition-all shadow-[0_0_30px_-10px_rgba(37,211,102,0.7)] hover:shadow-[0_0_44px_-6px_rgba(37,211,102,0.85)]"
                  >
                    <WhatsAppIcon className="size-5 shrink-0" />
                    <span>Direkt über WhatsApp schreiben</span>
                  </a>
                  <p className="text-xs text-[var(--color-ink-dim)] leading-relaxed max-w-xs">
                    Kein Formular nötig — schreib mir direkt mit Namen und
                    Anliegen. Meist antworte ich innerhalb weniger Stunden.
                  </p>

                  {/* Secondary: e-mail */}
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor-hover
                    className="mt-1 inline-flex items-center gap-2 w-fit text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    <Mail className="size-4" />
                    <span>{EMAIL}</span>
                  </a>
                </div>
              </div>

              <div className="md:col-span-3">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative rounded-3xl border border-emerald-400/30 bg-emerald-400/5 p-8 md:p-10 text-center"
                    >
                      <div className="inline-flex items-center justify-center size-14 rounded-full border border-emerald-400/40 bg-emerald-400/10 mb-5">
                        <Check className="size-6 text-emerald-400" />
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl tracking-tight font-medium mb-2">
                        Anfrage gesendet.
                      </h3>
                      <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                        Danke für deine Nachricht — du hörst innerhalb von 24 Stunden
                        von mir.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        data-cursor-hover
                        className="mt-6 inline-flex items-center gap-1.5 text-xs text-[var(--color-ink-dim)] hover:text-[var(--color-ink-soft)] transition-colors"
                      >
                        Noch eine Anfrage senden
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Honeypot: hidden from users (and screen readers), bots fill it. */}
                      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" >
                        <label>
                          Firma (bitte leer lassen)
                          <input
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                          />
                        </label>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field
                          label="Name"
                          value={form.name}
                          onChange={(v) => setForm({ ...form, name: v })}
                          placeholder="Dein Name"
                          required
                          maxLength={80}
                          disabled={status === "sending"}
                        />
                        <Field
                          label="E-Mail"
                          type="email"
                          value={form.email}
                          onChange={(v) => setForm({ ...form, email: v })}
                          placeholder="du@unternehmen.de"
                          required
                          maxLength={254}
                          disabled={status === "sending"}
                        />
                      </div>

                      <AnimatePresence initial={false} mode="wait">
                        {phoneOpen ? (
                          <motion.div
                            key="phone-open"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="relative">
                              <Field
                                label="Telefon"
                                type="tel"
                                value={form.phone}
                                onChange={(v) => setForm({ ...form, phone: v })}
                                placeholder="+49 …"
                                required
                                maxLength={40}
                                disabled={status === "sending"}
                              />
                              <button
                                type="button"
                                data-cursor-hover
                                onClick={() => {
                                  setPhoneOpen(false);
                                  setForm({ ...form, phone: "" });
                                }}
                                className="absolute right-0 top-0 text-[11px] text-[var(--color-ink-dim)] hover:text-[var(--color-ink-soft)] transition-colors uppercase tracking-[0.18em]"
                              >
                                Entfernen
                              </button>
                              <p className="mt-2 text-[11px] text-[var(--color-ink-dim)] inline-flex items-center gap-1.5">
                                <Phone className="size-3" />
                                Ich rufe dich innerhalb von 24 Stunden zurück.
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.button
                            key="phone-toggle"
                            type="button"
                            data-cursor-hover
                            onClick={() => setPhoneOpen(true)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="group w-full text-left inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-dashed border-[var(--color-line)] hover:border-[var(--color-accent)]/40 bg-transparent hover:bg-[var(--color-surface)]/40 text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-all"
                          >
                            <span className="inline-flex items-center justify-center size-6 rounded-full border border-[var(--color-line)] group-hover:border-[var(--color-accent)]/50 transition-colors">
                              <Plus className="size-3.5" />
                            </span>
                            <span>Lieber angerufen werden? Telefonnummer hinzufügen</span>
                          </motion.button>
                        )}
                      </AnimatePresence>

                      <WunschSelect
                        value={form.wunsch}
                        onChange={(v) => setForm({ ...form, wunsch: v })}
                        disabled={status === "sending"}
                      />
                      <PaketSelect
                        value={form.paket}
                        onChange={(v) => setForm({ ...form, paket: v })}
                        disabled={status === "sending"}
                      />
                      <ContentPaketSelect
                        value={form.contentPaket}
                        onChange={(v) => setForm({ ...form, contentPaket: v })}
                        disabled={status === "sending"}
                      />
                      <AuftraggeberSelect
                        value={form.auftraggeber}
                        onChange={(v) => setForm({ ...form, auftraggeber: v })}
                        disabled={status === "sending"}
                      />
                      <Field
                        label="Nachricht"
                        multiline
                        value={form.msg}
                        onChange={(v) => setForm({ ...form, msg: v })}
                        placeholder="Erzähl kurz, was du brauchst — Branche, Ziel, vielleicht ein Beispiel."
                        required
                        maxLength={4000}
                        disabled={status === "sending"}
                      />

                      <div className="pt-2">
                        <MagneticButton strength={0.3}>
                          <button
                            type="submit"
                            data-cursor-hover
                            disabled={status === "sending"}
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-accent-strong)] hover:bg-[var(--color-accent)] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium pulse-glow transition-colors"
                          >
                            {status === "sending" ? (
                              <>
                                <span>Wird gesendet…</span>
                                <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                              </>
                            ) : (
                              <>
                                <span>Anfrage senden</span>
                                <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </>
                            )}
                          </button>
                        </MagneticButton>
                      </div>

                      <AnimatePresence>
                        {status === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-start gap-2 px-3 py-2 rounded-xl border border-rose-400/30 bg-rose-400/5 text-xs text-rose-300"
                          >
                            <AlertCircle className="size-3.5 shrink-0 mt-0.5" />
                            <span>{errorMsg}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <p className="text-xs text-[var(--color-ink-dim)] pt-1 leading-relaxed">
                        Deine Daten werden ausschließlich zur Beantwortung dieser Anfrage
                        verwendet. Details in der{" "}
                        <a
                          href="/datenschutz"
                          className="text-[var(--color-ink-soft)] hover:text-[var(--color-accent-soft)] underline underline-offset-4 decoration-[var(--color-line-strong)]"
                        >
                          Datenschutzerklärung
                        </a>
                        .
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  required = false,
  disabled = false,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
}) {
  const base =
    "w-full bg-[var(--color-surface)]/70 border border-[var(--color-line)] rounded-2xl px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-dim)] focus:outline-none focus:border-[var(--color-accent)]/60 focus:bg-[var(--color-surface)] focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)] disabled:opacity-60 transition-all";

  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-[var(--color-ink-dim)] mb-2">
        {label}
        {required && <span className="text-[var(--color-accent)] ml-1">*</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          className={base + " resize-none"}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          className={base}
        />
      )}
    </label>
  );
}

function WunschSelect({
  value,
  onChange,
  disabled,
}: {
  value: Wunsch;
  onChange: (v: Wunsch) => void;
  disabled?: boolean;
}) {
  const options: { id: Exclude<Wunsch, "">; title: string; sub: string }[] = [
    { id: "neu", title: "Komplett neu", sub: "Noch keine Website vorhanden" },
    { id: "relaunch", title: "Relaunch", sub: "Bestehende Seite modernisieren" },
  ];

  return (
    <div>
      <span className="block text-xs uppercase tracking-[0.2em] text-[var(--color-ink-dim)] mb-2">
        Projekttyp
      </span>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(active ? "" : o.id)}
              data-cursor-hover
              disabled={disabled}
              className={`relative text-left rounded-2xl px-4 py-3 border transition-all overflow-hidden disabled:opacity-60 ${
                active
                  ? "border-[var(--color-accent)]/60 bg-[var(--color-accent)]/10 shadow-[0_0_0_4px_rgba(139,92,246,0.08)]"
                  : "border-[var(--color-line)] bg-[var(--color-surface)]/70 hover:border-[var(--color-line-strong)] hover:bg-[var(--color-surface)]"
              }`}
              aria-pressed={active}
            >
              {active && (
                <motion.span
                  layoutId="wunsch-glow"
                  className="absolute -inset-x-2 -top-2 h-12 bg-[radial-gradient(ellipse,rgba(139,92,246,0.4),transparent_70%)] pointer-events-none"
                  transition={{ type: "spring", damping: 22, stiffness: 280 }}
                />
              )}
              <div className="relative flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div
                    className={`font-display text-sm tracking-tight ${
                      active ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]"
                    }`}
                  >
                    {o.title}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[var(--color-ink-dim)] leading-snug">
                    {o.sub}
                  </div>
                </div>
                <div
                  className={`shrink-0 size-4 rounded-full border-2 transition-all flex items-center justify-center ${
                    active
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                      : "border-[var(--color-line-strong)]"
                  }`}
                >
                  {active && <span className="size-1.5 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AuftraggeberSelect({
  value,
  onChange,
  disabled,
}: {
  value: Auftraggeber;
  onChange: (v: Auftraggeber) => void;
  disabled?: boolean;
}) {
  const options: { id: Exclude<Auftraggeber, "">; title: string; sub: string }[] = [
    { id: "unternehmen", title: "Unternehmen / Gewerbe", sub: "Anfrage als Unternehmer (§ 14 BGB)" },
    { id: "privat", title: "Privatperson", sub: "Anfrage als Verbraucher (§ 13 BGB)" },
  ];

  return (
    <div>
      <span className="block text-xs uppercase tracking-[0.2em] text-[var(--color-ink-dim)] mb-2">
        Ich frage an als
        <span className="text-[var(--color-accent)] ml-1">*</span>
      </span>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(active ? "" : o.id)}
              data-cursor-hover
              disabled={disabled}
              className={`relative text-left rounded-2xl px-4 py-3 border transition-all overflow-hidden disabled:opacity-60 ${
                active
                  ? "border-[var(--color-accent)]/60 bg-[var(--color-accent)]/10 shadow-[0_0_0_4px_rgba(139,92,246,0.08)]"
                  : "border-[var(--color-line)] bg-[var(--color-surface)]/70 hover:border-[var(--color-line-strong)] hover:bg-[var(--color-surface)]"
              }`}
              aria-pressed={active}
            >
              <div className="relative flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div
                    className={`font-display text-sm tracking-tight ${
                      active ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]"
                    }`}
                  >
                    {o.title}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[var(--color-ink-dim)] leading-snug">
                    {o.sub}
                  </div>
                </div>
                <div
                  className={`shrink-0 size-4 rounded-full border-2 transition-all flex items-center justify-center ${
                    active
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                      : "border-[var(--color-line-strong)]"
                  }`}
                >
                  {active && <span className="size-1.5 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PaketSelect({
  value,
  onChange,
  disabled,
}: {
  value: Paket;
  onChange: (v: Paket) => void;
  disabled?: boolean;
}) {
  const options: { id: Exclude<Paket, "">; title: string; price: string }[] = [
    { id: "starter", title: "Starter", price: "€1.500" },
    { id: "standard", title: "Standard", price: "€2.500" },
    { id: "premium", title: "Premium", price: "€3.500" },
  ];

  return (
    <div>
      <span className="block text-xs uppercase tracking-[0.2em] text-[var(--color-ink-dim)] mb-2">
        Paket{" "}
        <span className="text-[var(--color-ink-dim)] normal-case tracking-normal">
          (optional)
        </span>
      </span>
      <div className="grid grid-cols-3 gap-3">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(active ? "" : o.id)}
              data-cursor-hover
              disabled={disabled}
              className={`relative text-left rounded-2xl px-3 py-3 border transition-all overflow-hidden disabled:opacity-60 ${
                active
                  ? "border-[var(--color-accent)]/60 bg-[var(--color-accent)]/10 shadow-[0_0_0_4px_rgba(139,92,246,0.08)]"
                  : "border-[var(--color-line)] bg-[var(--color-surface)]/70 hover:border-[var(--color-line-strong)] hover:bg-[var(--color-surface)]"
              }`}
              aria-pressed={active}
            >
              {active && (
                <motion.span
                  layoutId="paket-glow"
                  className="absolute -inset-x-2 -top-2 h-12 bg-[radial-gradient(ellipse,rgba(139,92,246,0.4),transparent_70%)] pointer-events-none"
                  transition={{ type: "spring", damping: 22, stiffness: 280 }}
                />
              )}
              <div className="relative">
                <div
                  className={`font-display text-sm tracking-tight ${
                    active ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]"
                  }`}
                >
                  {o.title}
                </div>
                <div className="mt-0.5 text-[11px] text-[var(--color-ink-dim)] leading-snug">
                  ab {o.price}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ContentPaketSelect({
  value,
  onChange,
  disabled,
}: {
  value: ContentPaket;
  onChange: (v: ContentPaket) => void;
  disabled?: boolean;
}) {
  const options: { id: Exclude<ContentPaket, "">; title: string; price: string }[] = [
    { id: "monatlich", title: "Monatlich kündbar", price: "75 €/Monat" },
    { id: "jahr1", title: "1 Jahr", price: "55 €/Monat" },
    { id: "jahr2", title: "2 Jahre", price: "45 €/Monat" },
  ];

  return (
    <div>
      <span className="block text-xs uppercase tracking-[0.2em] text-[var(--color-ink-dim)] mb-2">
        Content-Pflege{" "}
        <span className="text-[var(--color-ink-dim)] normal-case tracking-normal">
          (optional)
        </span>
      </span>
      <div className="grid grid-cols-3 gap-3">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(active ? "" : o.id)}
              data-cursor-hover
              disabled={disabled}
              className={`relative text-left rounded-2xl px-3 py-3 border transition-all overflow-hidden disabled:opacity-60 ${
                active
                  ? "border-[var(--color-accent)]/60 bg-[var(--color-accent)]/10 shadow-[0_0_0_4px_rgba(139,92,246,0.08)]"
                  : "border-[var(--color-line)] bg-[var(--color-surface)]/70 hover:border-[var(--color-line-strong)] hover:bg-[var(--color-surface)]"
              }`}
              aria-pressed={active}
            >
              {active && (
                <motion.span
                  layoutId="content-paket-glow"
                  className="absolute -inset-x-2 -top-2 h-12 bg-[radial-gradient(ellipse,rgba(139,92,246,0.4),transparent_70%)] pointer-events-none"
                  transition={{ type: "spring", damping: 22, stiffness: 280 }}
                />
              )}
              <div className="relative">
                <div
                  className={`font-display text-sm tracking-tight ${
                    active ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]"
                  }`}
                >
                  {o.title}
                </div>
                <div className="mt-0.5 text-[11px] text-[var(--color-ink-dim)] leading-snug">
                  {o.price}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
