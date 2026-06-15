"use client";

import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";

/**
 * Small accessible info tooltip: opens on hover (desktop) and on tap/click
 * (mobile), closes on outside tap or Escape. The popover itself is
 * non-interactive so it never blocks the underlying card.
 */
export default function InfoTooltip({
  text,
  label,
}: {
  text: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex align-middle">
      <button
        type="button"
        aria-label={label ? `Mehr Infos zu ${label}` : "Mehr Infos"}
        aria-expanded={open}
        data-cursor-hover
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-flex items-center justify-center size-4 rounded-full text-[var(--color-ink-dim)] hover:text-[var(--color-accent)] transition-colors"
      >
        <Info className="size-3.5" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-30 mb-2 w-64 max-w-[78vw] -translate-x-1/2 rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-surface-2)] px-3.5 py-3 text-xs font-normal leading-relaxed text-[var(--color-ink-soft)] shadow-[0_8px_30px_rgba(0,0,0,0.45)] pointer-events-none"
        >
          {text}
        </span>
      )}
    </span>
  );
}
