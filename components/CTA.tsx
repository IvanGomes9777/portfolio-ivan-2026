"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Send, Check, AlertCircle } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Aurora from "./backgrounds/Aurora";

const EMAIL = "ivanvilargomes@gmail.com";

type Wunsch = "" | "neu" | "relaunch";
type Status = "idle" | "sending" | "success" | "error";

export default function CTA() {
  const [form, setForm] = useState<{ name: string; email: string; msg: string; wunsch: Wunsch }>({
    name: "",
    email: "",
    msg: "",
    wunsch: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

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
          msg: form.msg,
          wunsch: form.wunsch,
        }),
      });
      const data = (await res.json()) as { success: boolean; message?: string };

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", msg: "", wunsch: "" });
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

                <div className="mt-7 inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                  <Mail className="size-4" />
                  <span>{EMAIL}</span>
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
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field
                          label="Name"
                          value={form.name}
                          onChange={(v) => setForm({ ...form, name: v })}
                          placeholder="Dein Name"
                          required
                          disabled={status === "sending"}
                        />
                        <Field
                          label="E-Mail"
                          type="email"
                          value={form.email}
                          onChange={(v) => setForm({ ...form, email: v })}
                          placeholder="du@unternehmen.de"
                          required
                          disabled={status === "sending"}
                        />
                      </div>

                      <WunschSelect
                        value={form.wunsch}
                        onChange={(v) => setForm({ ...form, wunsch: v })}
                        disabled={status === "sending"}
                      />
                      <Field
                        label="Nachricht"
                        multiline
                        value={form.msg}
                        onChange={(v) => setForm({ ...form, msg: v })}
                        placeholder="Erzähl kurz, was du brauchst — Branche, Ziel, vielleicht ein Beispiel."
                        required
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

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
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
