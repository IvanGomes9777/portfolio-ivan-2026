"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

/**
 * Reusable Cloudflare Turnstile widget.
 *
 * Loads the Cloudflare script once and renders the widget explicitly so it
 * re-initialises cleanly after a remount (e.g. when the contact form is shown
 * again after a successful submit). The solved token is handed back via
 * `onVerify`; the consumer forwards it to the server for validation.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          language?: string;
          appearance?: "always" | "execute" | "interaction-only";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

type TurnstileProps = {
  /** Cloudflare Site Key (public, NEXT_PUBLIC_…) */
  siteKey: string;
  /** Called with the token once the challenge is solved. */
  onVerify?: (token: string) => void;
  /** Called when the token expires or the widget errors. */
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
  className?: string;
};

export default function Turnstile({
  siteKey,
  onVerify,
  onExpire,
  theme = "auto",
  className,
}: TurnstileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  // Keep the latest callbacks in refs so the render effect below doesn't tear
  // down and rebuild the widget every time the parent re-renders.
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
  });

  // next/script won't fire onReady again if the script is already on the page
  // (after a remount), so detect an existing global directly.
  useEffect(() => {
    if (window.turnstile) setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !ref.current || !window.turnstile || widgetId.current) return;

    widgetId.current = window.turnstile.render(ref.current, {
      sitekey: siteKey,
      theme,
      language: "de",
      callback: (token) => onVerifyRef.current?.(token),
      "expired-callback": () => onExpireRef.current?.(),
      "error-callback": () => onExpireRef.current?.(),
    });

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [ready, siteKey, theme]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={ref} className={className} />
    </>
  );
}
