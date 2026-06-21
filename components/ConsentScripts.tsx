"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  getConsent,
  type ConsentValue,
} from "@/lib/consent";
import { GOOGLE_ADS_ID } from "@/lib/gtag";

// Loads the Google tag (gtag.js) for Google Ads conversion tracking — but ONLY
// after the visitor has actively consented (§ 25 TDDDG). Before consent, nothing
// is written to or read from the device by Google: the <Script> tags are simply
// not rendered. Reacts live to consent changes via the consentchange event, so
// accepting in the banner starts tracking without a reload.
export default function ConsentScripts() {
  const [consent, setConsentState] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsentState(getConsent());
    const handler = (e: Event) => {
      setConsentState((e as CustomEvent<ConsentValue>).detail);
    };
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  if (consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
