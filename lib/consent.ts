// Consent state management for non-essential cookies/scripts (Google Ads).
//
// § 25 TDDDG: anything non-essential may only be loaded AFTER the user opts in.
// We therefore store the user's decision and only inject gtag.js once consent is
// "granted". The decision itself is stored in localStorage — that storage is
// "unbedingt erforderlich" for the consent mechanism to work (§ 25 Abs. 2 Nr. 2)
// and is therefore exempt from the consent requirement.

export const CONSENT_KEY = "cookie-consent-v1";

export type ConsentValue = "granted" | "denied";

// Fired on the window whenever the stored consent value changes, so the script
// gate can react live (no page reload needed) right after the banner is used.
export const CONSENT_EVENT = "consentchange";

// Fired to (re)open the consent banner, e.g. from the "Cookie-Einstellungen"
// footer link — fulfils the "Widerruf so einfach wie die Erteilung" requirement.
export const OPEN_SETTINGS_EVENT = "open-cookie-settings";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
