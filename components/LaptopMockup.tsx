"use client";

import { ReactNode } from "react";
import Image from "next/image";

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
      <Image
        src="/laptop_realistic.webp"
        alt="Laptop mit Vorschau einer responsiven Website"
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-contain select-none pointer-events-none"
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
