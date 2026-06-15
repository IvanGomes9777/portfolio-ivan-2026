"use client";

import Link from "next/link";

export default function LegalLinks() {
  return (
    <div className="hidden md:flex fixed bottom-3 right-4 z-30 items-center gap-3 text-[0.625rem] text-[var(--color-ink-dim)] uppercase tracking-[0.18em]">
      <Link
        href="/impressum"
        data-cursor-hover
        className="hover:text-[var(--color-ink-soft)] transition-colors"
      >
        Impressum
      </Link>
      <span className="opacity-40">·</span>
      <Link
        href="/datenschutz"
        data-cursor-hover
        className="hover:text-[var(--color-ink-soft)] transition-colors"
      >
        Datenschutz
      </Link>
      <span className="opacity-40">·</span>
      <Link
        href="/agb"
        data-cursor-hover
        className="hover:text-[var(--color-ink-soft)] transition-colors"
      >
        AGB
      </Link>
    </div>
  );
}
