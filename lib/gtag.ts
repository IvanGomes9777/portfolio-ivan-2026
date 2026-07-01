// Google Ads conversion tracking helper.
//
// The base Google tag (gtag.js) is loaded once in app/layout.tsx. This module
// fires the conversion *event* — the second half of the snippet Google Ads
// provides — at the moment a real conversion happens (a successful contact
// form submission). It must NOT run on every page load, otherwise Google Ads
// would count a conversion for each visit instead of each lead.

// Conversion action "send_to": <Conversion-ID>/<Conversion-Label>.
// The base gtag.js is loaded for account AW-18190212856 (see app/layout.tsx);
// the matching lead conversion in that account is "Lead-Formular senden
// (webdesignbyivan.de/)" with label 8q7uCLfrhsUcEPi94uFD. The label must belong
// to the same account ID — pairing AW-18190212856 with a label from another
// account makes Google Ads report "Conversion-Aktion nicht erkannt".
const CONVERSION_SEND_TO = "AW-18190212856/8q7uCLfrhsUcEPi94uFD";

// gtag / dataLayer are injected by CookieConsent — but only AFTER the visitor
// has consented (§ 25 TDDDG). Until then window.gtag is undefined, so the
// conversion call below simply no-ops and nothing is sent to Google.
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Reports a successful contact-form submission as a Google Ads conversion.
// Safe to call before consent / before gtag.js has loaded — it no-ops in that
// case, so a lead from a visitor who declined tracking is never reported.
export function trackContactConversion(): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", "conversion", {
    send_to: CONVERSION_SEND_TO,
    transaction_id: "",
  });
}
