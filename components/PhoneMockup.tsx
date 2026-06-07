"use client";

import { ReactNode } from "react";

export default function PhoneMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19] mx-auto rounded-[1.2rem] sm:rounded-[1.8rem] md:rounded-[2.4rem] border-[3px] sm:border-[5px] md:border-[7px] border-zinc-800 bg-black p-[2px] sm:p-[3px] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)] ${className}`}
    >
      {/* Side buttons — hidden on very small mockups */}
      <div className="hidden sm:block absolute -right-[8px] top-[18%] w-[3px] h-[42px] bg-zinc-800 rounded-r" />
      <div className="hidden sm:block absolute -left-[8px] top-[14%] w-[3px] h-[28px] bg-zinc-800 rounded-l" />
      <div className="hidden sm:block absolute -left-[8px] top-[22%] w-[3px] h-[40px] bg-zinc-800 rounded-l" />

      {/* Bezel highlight */}
      <div className="absolute inset-0 rounded-[1.2rem] sm:rounded-[1.8rem] md:rounded-[2.4rem] pointer-events-none bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

      {/* Screen */}
      <div className="relative w-full h-full rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2.1rem] overflow-hidden bg-black">
        {/* Dynamic Island / notch — scales down on small */}
        <div className="absolute top-1 sm:top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-[36%] sm:w-[40%] md:w-[42%] h-[8px] sm:h-[12px] md:h-[18px] bg-black rounded-full z-10" />
        {children}
      </div>
    </div>
  );
}
