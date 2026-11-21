import { ImageResponse } from "next/og";

export const alt = "Mohammed Fawaz — Full Stack Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card for LinkedIn, X and messaging apps. Restyled with the new brand in B2.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0B0F23",
          color: "#F0F0FF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
          Fawaz<span style={{ color: "#8B5CF6" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            Mohammed Fawaz
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#A78BFA" }}>
            Full Stack Developer
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#A6A1C2" }}>
            React · Next.js · Node.js microservices · Docker · AWS
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#A6A1C2" }}>fawazv.online</div>
      </div>
    ),
    size
  );
}
