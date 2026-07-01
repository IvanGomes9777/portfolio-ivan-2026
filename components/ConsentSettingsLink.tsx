"use client";

import { openConsentSettings } from "@/lib/consent";

// Reopens the cookie banner so visitors can withdraw or change their consent at
// any time (Art. 7 Abs. 3 DSGVO). Rendered in the footer and the desktop
// legal-links corner widget.
export default function ConsentSettingsLink({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      data-cursor-hover
      className={className}
    >
      Cookie-Einstellungen
    </button>
  );
}
