import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} - ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(1000px 600px at 80% -10%, rgba(124,92,255,0.35), transparent), radial-gradient(900px 500px at 0% 120%, rgba(56,225,255,0.30), transparent), #06070b",
          color: "#e8ecf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "1px solid #303750",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#38e1ff",
              background: "#10131c",
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 26, color: "#97a0b5", letterSpacing: 2 }}>
            {site.role.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.05 }}>
            {`I'm ${site.shortName}.`}
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              lineHeight: 1.1,
              backgroundImage: "linear-gradient(90deg,#38e1ff,#7c5cff)",
              backgroundClip: "text",
              color: "transparent",
              maxWidth: 980,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#5d6781" }}>
          olajide.dev · automation & GTM engineering
        </div>
      </div>
    ),
    { ...size },
  );
}
