"use client";

const planes = [
  { x: "8%",  y: "12%", w: 220, h: 138, rot: -14, z: -180, dur: 22, delay: 0,   tint: "rgba(255, 255, 255,0.10)" },
  { x: "78%", y: "18%", w: 280, h: 175, rot:  18, z: -260, dur: 26, delay: 1.5, tint: "rgba(255, 255, 255,0.08)" },
  { x: "85%", y: "68%", w: 200, h: 125, rot: -20, z: -140, dur: 20, delay: 3,   tint: "rgba(255, 255, 255,0.09)" },
  { x: "6%",  y: "74%", w: 260, h: 163, rot:  16, z: -220, dur: 28, delay: 4.5, tint: "rgba(255, 255, 255,0.08)" },
  { x: "45%", y: "8%",  w: 160, h: 100, rot:   8, z: -340, dur: 24, delay: 2,   tint: "rgba(196,181,253,0.06)" },
  { x: "55%", y: "88%", w: 180, h: 112, rot: -10, z: -300, dur: 30, delay: 6,   tint: "rgba(255, 255, 255,0.07)" },
];

export default function FloatingPlanes() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none bg-[var(--color-bg)]"
      style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
      aria-hidden
    >
      {/* base mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255, 255, 255,0.10),transparent_55%)]" />

      {/* floating tilted rectangles, like distant browser frames */}
      {planes.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-2xl border border-white/[0.06] backdrop-blur-md will-change-transform"
          style={{
            width: p.w,
            height: p.h,
            left: p.x,
            top: p.y,
            background: `linear-gradient(135deg, ${p.tint}, transparent 70%)`,
            transformStyle: "preserve-3d",
            transform: `translateZ(${p.z}px) rotateZ(${p.rot}deg)`,
            animation: `plane-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
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
