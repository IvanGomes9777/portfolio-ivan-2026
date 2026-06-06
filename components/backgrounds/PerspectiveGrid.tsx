"use client";

export default function PerspectiveGrid() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none bg-[var(--color-bg)]"
      style={{ perspective: "700px", perspectiveOrigin: "50% 35%" }}
      aria-hidden
    >
      {/* Top horizon glow */}
      <div className="absolute left-1/2 top-[28%] -translate-x-1/2 w-[80%] h-[28%] bg-[radial-gradient(ellipse,rgba(139,92,246,0.45),transparent_70%)] blur-3xl pointer-events-none" />

      {/* Floor grid: rotated plane receding into distance */}
      <div
        className="absolute left-1/2 top-[55%] w-[260%] h-[150%] -translate-x-1/2 will-change-[background-position]"
        style={{
          transformOrigin: "50% 0%",
          transform: "rotateX(62deg)",
          backgroundImage:
            "linear-gradient(to right, rgba(167,139,250,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(167,139,250,0.22) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          animation: "grid-flow 6s linear infinite",
        }}
      />

      {/* Ceiling grid (mirrored) */}
      <div
        className="absolute left-1/2 bottom-[55%] w-[260%] h-[150%] -translate-x-1/2 opacity-60"
        style={{
          transformOrigin: "50% 100%",
          transform: "rotateX(-62deg)",
          backgroundImage:
            "linear-gradient(to right, rgba(167,139,250,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(167,139,250,0.14) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to top, transparent 0%, black 30%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0%, black 30%, black 80%, transparent 100%)",
        }}
      />

      {/* Horizon line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50 shadow-[0_0_30px_rgba(139,92,246,0.6)]" />

      {/* Side fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,7,10,0.65)_100%)]" />
    </div>
  );
}
