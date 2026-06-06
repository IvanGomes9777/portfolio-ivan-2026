"use client";

import { ReactNode } from "react";

export default function LaptopMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Screen frame */}
      <div className="relative aspect-[16/10] rounded-[14px] border border-zinc-700/70 bg-zinc-900 p-[6px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]">
        {/* Reflection / bezel highlight */}
        <div className="absolute inset-0 rounded-[14px] pointer-events-none bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

        {/* Camera notch */}
        <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-10 h-[3px] bg-zinc-700/60 rounded-full z-10 flex items-center justify-center">
          <span className="size-[3px] rounded-full bg-zinc-500/80" />
        </div>

        {/* Screen content */}
        <div className="relative w-full h-full rounded-[8px] overflow-hidden bg-black">
          {children}
        </div>
      </div>

      {/* Base / hinge */}
      <div className="relative h-[10px] mx-[-3.5%]" aria-hidden>
        <div
          className="absolute inset-0 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900"
          style={{ clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0 100%)" }}
        />
        {/* Trackpad indentation */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[20%] h-[3px] bg-zinc-700/80 rounded-b" />
      </div>
    </div>
  );
}
