"use client";

const orbs = [
  { x: "12%", y: "18%", size: 420, color: "rgba(139,92,246,0.42)", dur: 24, delay: 0, anim: "float-orb-a", z: 80 },
  { x: "82%", y: "14%", size: 300, color: "rgba(99,102,241,0.34)", dur: 28, delay: 2, anim: "float-orb-b", z: 140 },
  { x: "85%", y: "72%", size: 480, color: "rgba(168,85,247,0.36)", dur: 32, delay: 4, anim: "float-orb-a", z: -60 },
  { x: "16%", y: "82%", size: 340, color: "rgba(139,92,246,0.30)", dur: 26, delay: 6, anim: "float-orb-c", z: 40 },
  { x: "52%", y: "48%", size: 220, color: "rgba(196,181,253,0.22)", dur: 30, delay: 3, anim: "float-orb-b", z: 180 },
];

export default function Orbs() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none bg-[var(--color-bg)]"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      aria-hidden
    >
      {/* deep mesh wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(168,85,247,0.10),transparent_55%)]" />

      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            marginLeft: -o.size / 2,
            marginTop: -o.size / 2,
            background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
            filter: "blur(38px)",
            transform: `translateZ(${o.z}px)`,
            animation: `${o.anim} ${o.dur}s ease-in-out ${o.delay}s infinite`,
          }}
        />
      ))}

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,7,10,0.55)_100%)]" />
    </div>
  );
}
