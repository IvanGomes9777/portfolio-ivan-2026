"use client";

// Stable pseudo-random star field (avoid SSR mismatch by hardcoding positions)
const stars = [
  { x: 6,  y: 12, dur: 3.4, delay: 0.2 },
  { x: 14, y: 38, dur: 4.1, delay: 1.1 },
  { x: 22, y: 72, dur: 3.0, delay: 2.4 },
  { x: 31, y: 22, dur: 4.6, delay: 0.6 },
  { x: 39, y: 58, dur: 3.7, delay: 3.2 },
  { x: 46, y: 88, dur: 4.2, delay: 1.8 },
  { x: 55, y: 16, dur: 3.3, delay: 2.0 },
  { x: 63, y: 44, dur: 4.4, delay: 0.4 },
  { x: 71, y: 78, dur: 3.6, delay: 2.7 },
  { x: 79, y: 28, dur: 4.0, delay: 1.4 },
  { x: 87, y: 64, dur: 3.5, delay: 3.6 },
  { x: 94, y: 20, dur: 4.5, delay: 0.9 },
  { x: 18, y: 8,  dur: 3.8, delay: 2.2 },
  { x: 42, y: 92, dur: 4.3, delay: 1.6 },
  { x: 68, y: 6,  dur: 3.2, delay: 3.0 },
  { x: 88, y: 92, dur: 4.1, delay: 0.5 },
];

export default function Aurora() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none bg-[var(--color-bg)]"
      style={{ perspective: "900px" }}
      aria-hidden
    >
      {/* base radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(ellipse_at_20%_20%,rgba(168,85,247,0.12),transparent_55%)]" />

      {/* Aurora waves — multiple offset gradient bands */}
      <div
        className="absolute inset-x-[-20%] top-[18%] h-[42%] will-change-transform"
        style={{
          background:
            "linear-gradient(110deg, transparent 0%, rgba(167,139,250,0.45) 35%, rgba(139,92,246,0.55) 55%, transparent 85%)",
          filter: "blur(70px)",
          transform: "rotateX(35deg) rotateZ(-2deg)",
          animation: "aurora-drift-a 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-x-[-20%] top-[32%] h-[38%] will-change-transform"
        style={{
          background:
            "linear-gradient(80deg, rgba(99,102,241,0.40) 5%, transparent 40%, rgba(168,85,247,0.45) 75%, transparent 100%)",
          filter: "blur(80px)",
          transform: "rotateX(-20deg) rotateZ(4deg)",
          animation: "aurora-drift-b 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-x-[-20%] top-[8%] h-[26%] will-change-transform"
        style={{
          background:
            "linear-gradient(100deg, transparent 10%, rgba(196,181,253,0.32) 50%, transparent 90%)",
          filter: "blur(60px)",
          transform: "rotateX(15deg)",
          animation: "aurora-drift-a 19s ease-in-out 1.5s infinite",
        }}
      />

      {/* Starfield */}
      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: 2,
              height: 2,
              boxShadow: "0 0 4px rgba(255,255,255,0.8)",
              animation: `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[var(--color-bg)] via-[rgba(139,92,246,0.10)] to-transparent" />
    </div>
  );
}
