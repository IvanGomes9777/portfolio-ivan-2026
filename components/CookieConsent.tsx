"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import {
  OPEN_CONSENT_EVENT,
  getStoredConsent,
  setStoredConsent,
  type ConsentValue,
} from "@/lib/consent";

// Google Ads account. The base tag (gtag.js) is loaded ONLY after the visitor
// actively consents — never on page load — so no non-essential cookie is set
// and no data reaches Google before consent (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1
// lit. a DSGVO). Google Consent Mode v2 defaults everything to "denied".
const GA_ID = "AW-18190212856";

// Ensure the gtag command queue exists so consent commands can be queued even
// before gtag.js has finished loading.
function ensureGtag(): void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // gtag.js reads the arguments object off the dataLayer — push it verbatim.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    } as (...args: unknown[]) => void;
  }
}

const PURPOSES = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
] as const;

function updateConsent(state: ConsentValue): void {
  ensureGtag();
  window.gtag!(
    "consent",
    "update",
    Object.fromEntries(PURPOSES.map((p) => [p, state])),
  );
}

// Injects gtag.js exactly once, after consent is granted.
let scriptInjected = false;
function loadGoogleAds(): void {
  ensureGtag();
  if (!scriptInjected) {
    scriptInjected = true;
    // Consent Mode v2: start denied, then grant (we only ever call this on grant).
    window.gtag!(
      "consent",
      "default",
      Object.fromEntries(PURPOSES.map((p) => [p, "denied"])),
    );
    window.gtag!(
      "consent",
      "update",
      Object.fromEntries(PURPOSES.map((p) => [p, "granted"])),
    );
    window.gtag!("js", new Date());
    window.gtag!("config", GA_ID);

    const s = document.createElement("script");
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    s.async = true;
    document.head.appendChild(s);
  } else {
    // Already loaded in this session (e.g. user reopened settings) — re-grant.
    updateConsent("granted");
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (stored === "granted") {
      loadGoogleAds();
    } else if (stored === null) {
      setVisible(true);
    }
    // Reopen when the user clicks a "Cookie-Einstellungen" link.
    const openHandler = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openHandler);
  }, []);

  const accept = useCallback(() => {
    setStoredConsent("granted");
    loadGoogleAds();
    setVisible(false);
  }, []);

  const decline = useCallback(() => {
    setStoredConsent("denied");
    // If the tag was already loaded earlier this session, revoke consent so
    // Consent Mode stops using cookies with immediate effect.
    if (typeof window.gtag === "function") updateConsent("denied");
    setVisible(false);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-Einwilligung"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)]/95 backdrop-blur-xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] sm:inset-x-auto sm:left-4 sm:right-4"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-surface)]">
              <Cookie className="size-4.5 text-[var(--color-accent)]" />
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-base font-medium tracking-tight text-[var(--color-ink)]">
                Cookies &amp; Reichweitenmessung
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                Diese Website ist grundsätzlich cookie-frei. Nur mit deiner
                Einwilligung setze ich <strong className="text-[var(--color-ink)]">Google Ads</strong>{" "}
                ein, um den Erfolg von Werbeanzeigen zu messen
                (Konversions-Tracking). Dabei werden Cookies gesetzt und Daten an
                Google (auch in den USA) übertragen. Du kannst deine Auswahl
                jederzeit über „Cookie-Einstellungen" im Footer widerrufen.
                Mehr dazu in der{" "}
                <Link
                  href="/datenschutz"
                  className="text-[var(--color-accent-soft)] underline underline-offset-2 hover:text-[var(--color-accent)]"
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={accept}
                  data-cursor-hover
                  className="order-1 inline-flex items-center justify-center rounded-full bg-[var(--color-accent-strong)] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[var(--color-accent)] sm:order-2"
                >
                  Akzeptieren
                </button>
                <button
                  type="button"
                  onClick={decline}
                  data-cursor-hover
                  className="order-2 inline-flex items-center justify-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)]/60 px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)] sm:order-1"
                >
                  Ablehnen
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
