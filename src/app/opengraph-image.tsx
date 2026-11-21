import { ImageResponse } from "next/og";

export const alt = "Mohammed Fawaz — Full Stack Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Load a Google font as TTF for Satori (next/og). Falls back to the default
// sans-serif if the font cannot be fetched at build time.
async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

// Sage & Tomato brand (Marker layout)
const PAPER = "#F6F3EC";
const OAT = "#ECE7DC";
const INK = "#1B1E19";
const MUTED = "#5D6358";
const SAGE = "#A9BDA3";
const MARKER = "#E8694F";
const TOMATO = "#D9432B";
const LIVE = "#2F7A3E";

// Share card for LinkedIn, X and messaging apps.
export default async function OpenGraphImage() {
  const words = "Fawaz.Mohammed FawazFull stack developerNode.js services React Next.js Docker AWSOpen to work Kerala, India fawazv.online·5 projects shipped2 live demos";
  const [bold, regular] = await Promise.all([
    loadGoogleFont("Host Grotesk", 600, words),
    loadGoogleFont("Host Grotesk", 400, words),
  ]);
  const fonts = [
    ...(bold ? [{ name: "Host Grotesk", data: bold, weight: 600 as const, style: "normal" as const }] : []),
    ...(regular ? [{ name: "Host Grotesk", data: regular, weight: 400 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          padding: 28,
          fontFamily: fonts.length ? "Host Grotesk" : "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(27,30,25,0.12)",
            borderRadius: 28,
            padding: "48px 56px",
            color: INK,
            background: PAPER,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>
              Fawaz<span style={{ color: TOMATO }}>.</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 23,
                background: OAT,
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 999, background: LIVE }} />
              Open to work · Kerala, India
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", alignItems: "flex-end", fontSize: 118, fontWeight: 600, letterSpacing: -6, lineHeight: 1 }}>
              <span>Mohammed&nbsp;</span>
              <span style={{ display: "flex", position: "relative", padding: "0 10px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 18,
                    bottom: 4,
                    background: MARKER,
                    borderRadius: 14,
                    transform: "rotate(-1.2deg)",
                  }}
                />
                <span style={{ position: "relative" }}>Fawaz</span>
              </span>
            </div>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 400, color: MUTED, letterSpacing: -1 }}>
              Full stack developer · Node.js services, React on top
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: MUTED,
              borderTop: "1px solid rgba(27,30,25,0.14)",
              paddingTop: 22,
            }}
          >
            <div style={{ display: "flex", gap: 28 }}>
              <span style={{ display: "flex", gap: 8 }}>
                <span style={{ color: INK, fontWeight: 600 }}>5</span> projects shipped
              </span>
              <span style={{ display: "flex", gap: 8 }}>
                <span style={{ color: INK, fontWeight: 600 }}>2</span> live demos
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: SAGE }} />
                Docker · AWS
              </span>
            </div>
            <span>fawazv.online</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
