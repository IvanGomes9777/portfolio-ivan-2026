"use client";

import { openConsentSettings } from "@/lib/consent";

// Re-opens the consent banner so visitors can change/revoke their choice at any
// time — required so that withdrawing consent is as easy as giving it.
export default function CookieSettingsButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button type="button" {...props} onClick={openConsentSettings}>
      Cookie-Einstellungen
    </button>
  );
}
