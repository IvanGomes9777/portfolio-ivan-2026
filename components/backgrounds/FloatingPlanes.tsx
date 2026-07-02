"use client";

// Floating tilted rectangles, like distant browser frames. Per-plane values
// live in globals.css (.bg3d-plane-*) so the SSR HTML carries no inline styles.
const PLANE_COUNT = 6;

export default function FloatingPlanes() {
  return (
    <div
      className="bg3d-planes absolute inset-0 overflow-hidden pointer-events-none bg-[var(--color-bg)]"
      aria-hidden
    >
      {/* base mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255, 255, 255,0.10),transparent_55%)]" />

      {Array.from({ length: PLANE_COUNT }, (_, i) => (
        <div
          key={i}
          className={`bg3d-plane bg3d-plane-${i + 1} absolute rounded-2xl border border-white/[0.06] backdrop-blur-md will-change-transform`}
        >
          {/* faux browser dots */}
          <div className="flex gap-1 p-2 opacity-50">
            <span className="size-1 rounded-full bg-white/30" />
            <span className="size-1 rounded-full bg-white/20" />
            <span className="size-1 rounded-full bg-white/20" />
          </div>
        </div>
      ))}

      {/* spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(7,7,10,0.65)_100%)]" />
    </div>
  );
}
