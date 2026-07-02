"use client";

// Aurora bands + stable star field. All per-element values live in
// globals.css (.bg3d-aurora-*, .bg3d-star-*) so the SSR HTML carries no
// inline styles (and no SSR mismatch, positions are hardcoded CSS).
const STAR_COUNT = 16;

export default function Aurora() {
  return (
    <div
      className="bg3d-aurora absolute inset-0 overflow-hidden pointer-events-none bg-[var(--color-bg)]"
      aria-hidden
    >
      {/* base radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(255, 255, 255,0.18),transparent_60%),radial-gradient(ellipse_at_20%_20%,rgba(255, 255, 255,0.12),transparent_55%)]" />

      {/* Aurora waves — multiple offset gradient bands */}
      <div className="bg3d-aurora-wave-1 absolute inset-x-[-20%] top-[18%] h-[42%] will-change-transform" />
      <div className="bg3d-aurora-wave-2 absolute inset-x-[-20%] top-[32%] h-[38%] will-change-transform" />
      <div className="bg3d-aurora-wave-3 absolute inset-x-[-20%] top-[8%] h-[26%] will-change-transform" />

      {/* Starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: STAR_COUNT }, (_, i) => (
          <span
            key={i}
            className={`bg3d-star bg3d-star-${i + 1} absolute rounded-full bg-white`}
          />
        ))}
      </div>

      {/* horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[var(--color-bg)] via-[rgba(255, 255, 255,0.10)] to-transparent" />
    </div>
  );
}
