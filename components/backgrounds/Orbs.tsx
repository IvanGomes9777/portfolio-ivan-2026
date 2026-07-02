"use client";

// Five floating gradient orbs. All layout/animation values live in
// globals.css (.bg3d-orb-*) so the SSR HTML carries no inline styles.
const ORB_COUNT = 5;

export default function Orbs() {
  return (
    <div
      className="bg3d-orbs absolute inset-0 overflow-hidden pointer-events-none bg-[var(--color-bg)]"
      aria-hidden
    >
      {/* deep mesh wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255, 255, 255,0.10),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(255, 255, 255,0.10),transparent_55%)]" />

      {Array.from({ length: ORB_COUNT }, (_, i) => (
        <div
          key={i}
          className={`bg3d-orb bg3d-orb-${i + 1} absolute rounded-full will-change-transform`}
        />
      ))}

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,7,10,0.55)_100%)]" />
    </div>
  );
}
