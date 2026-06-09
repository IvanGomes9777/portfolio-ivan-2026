"use client";

import { ReactNode } from "react";

/**
 * MacBook Air display mockup (CSS-only, no external assets).
 * Shows only the laptop display (lid) — aluminium edge, uniform black
 * bezels with a larger bottom chin and the "MacBook Air" wordmark, and a
 * small centred camera dot. No keyboard / base deck. The screen stays
 * flat (front-on) so iframes / images render crisply at any size.
 */
export default function LaptopMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* ===== Lid / display ===== */}
      {/* Aluminium lid edge — thin metallic frame around the panel */}
      <div className="relative aspect-[16/10] rounded-[12px] bg-gradient-to-b from-zinc-400 via-zinc-500 to-zinc-600 p-[1.5px] shadow-[0_28px_55px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(0,0,0,0.35)]">
        {/* Metallic sheen along the top edge */}
        <div className="absolute inset-x-0 top-0 h-[12%] rounded-t-[12px] pointer-events-none bg-gradient-to-b from-white/30 to-transparent" />

        {/* Black bezel surrounding the screen (larger chin at the bottom) */}
        <div className="relative w-full h-full rounded-[10px] bg-[#0a0a0a] px-[3.6%] pt-[4%] pb-[7%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          {/* Camera dot */}
          <div className="absolute top-[1.6%] left-1/2 -translate-x-1/2 size-[3px] rounded-full bg-zinc-800 ring-[0.5px] ring-zinc-600/40 z-20" />

          {/* Screen content */}
          <div className="relative w-full h-full rounded-[3px] overflow-hidden bg-black">
            {children}
            {/* Subtle screen glare */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-white/[0.05]" />
          </div>

          {/* "MacBook Air" wordmark in the chin */}
          <div className="hidden sm:flex absolute inset-x-0 bottom-[1.6%] items-center justify-center pointer-events-none">
            <span className="text-zinc-500 font-medium tracking-tight text-[6px] md:text-[8px] leading-none">
              MacBook Air
            </span>
          </div>
        </div>

        {/* Soft contact shadow under the display */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-[82%] h-3 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45),transparent_70%)]" />
      </div>
    </div>
  );
}
