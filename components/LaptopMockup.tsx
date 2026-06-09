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
    <div className={`relative w-full aspect-square ${className}`}>
      <img
        src="/laptop_realistic.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
      />
      <div
        className="absolute overflow-hidden bg-black"
        style={{ top: "29.5%", bottom: "33.5%", left: "17%", right: "17%" }}
      >
        {children}
      </div>
    </div>
  );
}
