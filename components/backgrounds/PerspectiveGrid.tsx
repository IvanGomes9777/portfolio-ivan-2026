"use client";

// Grid planes receding into distance. Static styles live in globals.css
// (.bg3d-grid-*) so the SSR HTML carries no inline styles.
export default function PerspectiveGrid() {
  return (
    <div
      className="bg3d-grid absolute inset-0 overflow-hidden pointer-events-none bg-[var(--color-bg)]"
      aria-hidden
    >
      {/* Top horizon glow */}
      <div className="absolute left-1/2 top-[28%] -translate-x-1/2 w-[80%] h-[28%] bg-[radial-gradient(ellipse,rgba(255, 255, 255,0.45),transparent_70%)] blur-3xl pointer-events-none" />

      {/* Floor grid: rotated plane receding into distance */}
      <div className="bg3d-grid-floor absolute left-1/2 top-[55%] w-[260%] h-[150%] -translate-x-1/2 will-change-[background-position]" />

      {/* Ceiling grid (mirrored) */}
      <div className="bg3d-grid-ceiling absolute left-1/2 bottom-[55%] w-[260%] h-[150%] -translate-x-1/2 opacity-60" />

      {/* Horizon line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50 shadow-[0_0_30px_rgba(255, 255, 255,0.6)]" />

      {/* Side fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,7,10,0.65)_100%)]" />
    </div>
  );
}
