// Consent state for non-essential cookies / tracking (§ 25 TDDDG, Art. 6 Abs. 1
// lit. a DSGVO). The stored decision itself is strictly necessary to remember the
// user's choice and is therefore allowed without prior consent.
//
// The banner UI, the Google Ads loader and the withdrawal trigger all read/write
// through this module so there is a single source of truth for the decision.

export type ConsentValue = "granted" | "denied";

// Versioned key: bump the suffix if the set of tracked purposes changes, so all
// visitors are asked again for the new scope.
const STORAGE_KEY = "cookie-consent-v1";

// Fired after the decision changes (detail = new value).
export const CONSENT_EVENT = "cookie-consent-change";
// Fired to (re)open the banner — used by the "Cookie-Einstellungen" links so the
// user can withdraw or change consent at any time (Art. 7 Abs. 3 DSGVO).
export const OPEN_CONSENT_EVENT = "cookie-consent-open";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage may be unavailable (private mode / blocked) — the decision then
    // simply isn't persisted and the banner reappears next visit. That is safe.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
