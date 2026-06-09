"use client";

import { ReactNode } from "react";

/**
 * iPhone Pro mockup (CSS-only, no external assets).
 * Recreates the look of an iPhone Pro: a thin titanium frame, uniform
 * black bezels, rounded corners, the Dynamic Island pill near the top
 * and the action / volume / power side buttons. Scales fluidly across
 * breakpoints. The screen content renders crisply at any size.
 */
export default function PhoneMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] mx-auto rounded-[1.4rem] sm:rounded-[2rem] md:rounded-[2.6rem] bg-gradient-to-br from-zinc-400 via-zinc-600 to-zinc-500 p-[2px] sm:p-[3px] md:p-[4px] shadow-[0_22px_45px_-18px_rgba(0,0,0,0.75),0_0_0_1px_rgba(0,0,0,0.4)] ${className}`}
    >
      {/* Titanium frame edge highlight */}
      <div className="absolute inset-0 rounded-[1.4rem] sm:rounded-[2rem] md:rounded-[2.6rem] pointer-events-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]" />

      {/* Side buttons — hidden on very small mockups */}
      {/* Action button + volume (left) */}
      <div className="hidden sm:block absolute -left-[2px] top-[16%] w-[2px] h-[26px] bg-zinc-600 rounded-l" />
      <div className="hidden sm:block absolute -left-[2px] top-[24%] w-[2px] h-[34px] bg-zinc-600 rounded-l" />
      <div className="hidden sm:block absolute -left-[2px] top-[32%] w-[2px] h-[34px] bg-zinc-600 rounded-l" />
      {/* Power button (right) */}
      <div className="hidden sm:block absolute -right-[2px] top-[26%] w-[2px] h-[48px] bg-zinc-600 rounded-r" />

      {/* Black bezel */}
      <div className="relative w-full h-full rounded-[1.2rem] sm:rounded-[1.7rem] md:rounded-[2.3rem] bg-black p-[2px] sm:p-[2.5px] md:p-[3px]">
        {/* Screen */}
        <div className="relative w-full h-full rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black">
          {children}

          {/* Dynamic Island */}
          <div className="absolute top-[1.2%] left-1/2 -translate-x-1/2 w-[30%] sm:w-[32%] md:w-[34%] h-[9px] sm:h-[14px] md:h-[20px] bg-black rounded-full z-20 flex items-center justify-end pr-[6%]">
            <span className="size-[3px] sm:size-[4px] md:size-[5px] rounded-full bg-zinc-800 ring-[0.5px] ring-zinc-700/50" />
          </div>

          {/* Subtle screen glare */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-white/[0.05]" />
        </div>
      </div>
    </div>
  );
}
