"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getConsent,
  setConsent,
  OPEN_SETTINGS_EVENT,
} from "@/lib/consent";

// § 25 TDDDG / DSGVO-compliant consent banner.
//
// Design decisions tied to the legal requirements:
//  - "Ablehnen" and "Akzeptieren" are equally prominent on the first level
//    (same size/weight/position) — no dark pattern (VG Hannover, 19.03.2025).
//  - Nothing non-essential loads before a choice is made: gtag.js is gated in
//    <ConsentScripts/> and only renders once consent === "granted".
//  - The choice can be revoked any time via the "Cookie-Einstellungen" footer
//    link, which re-opens this banner (OPEN_SETTINGS_EVENT).
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only auto-show when the visitor has not decided yet.
    if (getConsent() === null) setVisible(true);

    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const decide = (value: "granted" | "denied") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-surface)]/95 p-5 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
    >
      <h2 className="text-sm font-semibold text-[var(--color-ink)]">
        Cookies & Statistik
      </h2>
      <p className="mt-2 text-xs leading-relaxed text-[var(--color-ink-soft)]">
        Diese Website funktioniert ohne Tracking. Nur wenn du zustimmst, lade ich
        den Google-Dienst für Werbe-/Conversion-Messung (gtag.js), der dabei
        Cookies setzen und Daten an Google (USA) übertragen kann. Du kannst deine
        Wahl jederzeit im Footer unter{" "}
        <span className="text-[var(--color-ink)]">„Cookie-Einstellungen"</span>{" "}
        ändern. Mehr dazu in der{" "}
        <Link
          href="/datenschutz"
          className="text-[var(--color-accent-soft)] underline hover:text-[var(--color-ink)]"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => decide("denied")}
          className="flex-1 rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition hover:bg-white/5"
        >
          Ablehnen
        </button>
        <button
          type="button"
          onClick={() => decide("granted")}
          className="flex-1 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[var(--color-accent-soft)]"
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
}
