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
      className={`relative aspect-[9/19] mx-auto rounded-[2.4rem] border-[7px] border-zinc-800 bg-black p-[3px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)] ${className}`}
    >
      {/* Side button */}
      <div className="absolute -right-[8px] top-[18%] w-[3px] h-[42px] bg-zinc-800 rounded-r" />
      {/* Volume buttons */}
      <div className="absolute -left-[8px] top-[14%] w-[3px] h-[28px] bg-zinc-800 rounded-l" />
      <div className="absolute -left-[8px] top-[22%] w-[3px] h-[40px] bg-zinc-800 rounded-l" />

      {/* Bezel highlight */}
      <div className="absolute inset-0 rounded-[2.4rem] pointer-events-none bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

      {/* Screen */}
      <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-black">
        {/* Dynamic Island / notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[42%] h-[18px] bg-black rounded-full z-10" />
        {children}
      </div>
    </div>
  );
}
