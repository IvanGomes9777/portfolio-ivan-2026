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
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: "6934 / 4014" }}
    >
      <img
        src="/laptop_realistic.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
      />
      <div
        className="absolute overflow-hidden bg-black"
        style={{ top: "9.1%", bottom: "17.1%", left: "11.9%", right: "11.9%" }}
      >
        {children}
      </div>
    </div>
  );
}
