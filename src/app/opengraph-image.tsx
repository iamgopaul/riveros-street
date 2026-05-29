import { ImageResponse } from "next/og";

export const alt = "Rivero's Street — Comida Venezolana Callejera · Freeport, FL";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card. Generated at build time (no external assets).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(900px 500px at 50% 38%, rgba(225,29,42,0.28), transparent 70%)",
          color: "#f5f5f5",
          padding: "72px 80px",
          fontFamily: "monospace",
        }}
      >
        {/* hazard bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            backgroundImage:
              "repeating-linear-gradient(45deg, #e11d2a 0 22px, #050505 22px 44px)",
          }}
        />

        {/* top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "rgba(245,245,245,0.65)",
          }}
        >
          <span style={{ color: "#e11d2a" }}>EST. 2024</span>
          <span>·</span>
          <span>Freeport, FL</span>
        </div>

        {/* wordmark */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.92 }}>
          <span style={{ fontSize: 150, fontWeight: 800, letterSpacing: -2 }}>RIVERO&apos;S</span>
          <span style={{ fontSize: 150, fontWeight: 800, letterSpacing: -2, color: "#e11d2a" }}>STREET</span>
          <span
            style={{
              marginTop: 28,
              fontSize: 30,
              letterSpacing: 2,
              color: "rgba(245,245,245,0.7)",
            }}
          >
            Comida Venezolana Callejera
          </span>
        </div>

        {/* footer tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 10,
            textTransform: "uppercase",
          }}
        >
          <span>Eat</span>
          <span style={{ color: "#e11d2a" }}>·</span>
          <span>Wear</span>
          <span style={{ color: "#e11d2a" }}>·</span>
          <span>Live</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
