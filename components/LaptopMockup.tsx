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
      <div className="relative w-full" style={{ aspectRatio: "16 / 11" }}>
        {/* Base — slightly wider silver bar with subtle taper */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[106%] h-[4.5%] bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 rounded-b-[7px] shadow-[0_10px_22px_-10px_rgba(0,0,0,0.6)]">
          {/* Bottom edge shadow line */}
          <div className="absolute inset-x-[4%] bottom-0 h-[1px] bg-black/30 rounded-full" />
        </div>

        {/* Hinge notch */}
        <div className="absolute bottom-[4.5%] left-1/2 -translate-x-1/2 w-[9%] h-[2.2%] bg-gradient-to-b from-zinc-500 via-zinc-600 to-zinc-700 rounded-b-[3px]" />

        {/* Lid */}
        <div className="absolute inset-x-0 top-0 h-[91%] rounded-[14px] bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 p-[3px] shadow-[0_24px_48px_-18px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.25)]">
          {/* Black bezel */}
          <div className="relative w-full h-full rounded-[11px] bg-[#0a0a0a] overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            {/* Glossy top-left reflection */}
            <div className="absolute top-0 left-0 w-[55%] h-[35%] pointer-events-none rounded-tl-[11px] bg-gradient-to-br from-white/[0.18] via-white/[0.04] to-transparent" />

            {/* Camera dot */}
            <div className="absolute top-[1.8%] left-1/2 -translate-x-1/2 size-[3px] rounded-full bg-zinc-800 ring-[0.5px] ring-zinc-600/40 z-20" />

            {/* Screen content */}
            <div className="absolute inset-[3.5%] top-[5%] rounded-[2px] overflow-hidden bg-black">
              {children}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-white/[0.05]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
