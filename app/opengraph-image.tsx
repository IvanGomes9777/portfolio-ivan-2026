import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Ivan Gomes — Freelance Web Developer & Designer aus Münster";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07070a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Purple glow — top right */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(99,102,241,0.15) 40%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Purple glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Location badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.4)",
            borderRadius: "100px",
            padding: "10px 24px",
            color: "#c4b5fd",
            fontSize: "20px",
            marginBottom: "36px",
          }}
        >
          📍 Münster, Deutschland · Freelancer
        </div>

        {/* Name */}
        <div
          style={{
            color: "#f4f4f6",
            fontSize: "80px",
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: "16px",
            letterSpacing: "-2px",
          }}
        >
          Ivan Gomes
        </div>

        {/* Title */}
        <div
          style={{
            color: "#b8b8c4",
            fontSize: "34px",
            fontWeight: 400,
            marginBottom: "52px",
            letterSpacing: "-0.5px",
          }}
        >
          Freelance Web Developer & Designer
        </div>

        {/* Purple divider */}
        <div
          style={{
            width: "72px",
            height: "4px",
            background: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
            borderRadius: "4px",
            marginBottom: "52px",
            display: "flex",
          }}
        />

        {/* Tech tags */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Next.js", "React", "Webdesign", "Tailwind CSS", "SEO"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "10px 22px",
                  color: "#b8b8c4",
                  fontSize: "22px",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* URL bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "52px",
            right: "80px",
            color: "#6e6e7a",
            fontSize: "20px",
            letterSpacing: "0.5px",
          }}
        >
          portfolio-ivan-2026.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
