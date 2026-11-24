import { ImageResponse } from "next/og";

export const alt = "Mohammed Fawaz — Developer, Content Creator & AI Workflows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Load a Google font as TTF for Satori (next/og). `spec` is the css2 family
// spec, e.g. "Host+Grotesk:wght@400". Falls back to the default sans-serif.
async function loadGoogleFont(spec: string, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${spec}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

// Sage & Tomato brand (Kitchen Table layout)
const PAPER = "#F6F3EC";
const CARD = "#FFFDF8";
const INK = "#1B1E19";
const SAGE = "#A9BDA3";
const TOMATO = "#D9432B";
const LIVE = "#2F7A3E";

// Share card for LinkedIn, X and messaging apps.
export default async function OpenGraphImage() {
  const serifText = "Mohammed Fawaz";
  const sansText =
    "Fawaz.Full-stack developer · Kerala, IndiaDeveloper · content creator · AI agent workflowsOpen to work6 projects built2 live demosfawazv.online·";
  const [serif, sans, sansBold] = await Promise.all([
    loadGoogleFont("Instrument+Serif", serifText),
    loadGoogleFont("Host+Grotesk:wght@400", sansText),
    loadGoogleFont("Host+Grotesk:wght@600", sansText),
  ]);
  const fonts = [
    ...(serif ? [{ name: "Instrument Serif", data: serif, weight: 400 as const, style: "normal" as const }] : []),
    ...(sans ? [{ name: "Host Grotesk", data: sans, weight: 400 as const, style: "normal" as const }] : []),
    ...(sansBold ? [{ name: "Host Grotesk", data: sansBold, weight: 600 as const, style: "normal" as const }] : []),
  ];
  const sansFamily = sans ? "Host Grotesk" : "sans-serif";
  const serifFamily = serif ? "Instrument Serif" : "serif";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PAPER, padding: 30, fontFamily: sansFamily }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: SAGE,
            borderRadius: 30,
            padding: "46px 56px",
            color: INK,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 600, letterSpacing: -1 }}>
              Fawaz<span style={{ color: TOMATO }}>.</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 23,
                background: CARD,
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 999, background: LIVE }} />
              Open to work · Kerala, India
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "flex-end", fontFamily: serifFamily, fontSize: 132, lineHeight: 1, letterSpacing: -3 }}>
              <span>Mohammed&nbsp;</span>
              <span style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                <span>Fawaz</span>
                <svg
                  width="292"
                  height="30"
                  viewBox="0 0 200 20"
                  style={{ position: "absolute", left: -10, bottom: -14 }}
                >
                  <path d="M2 13 C 60 3, 130 5, 198 12" fill="none" stroke={TOMATO} strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <div style={{ display: "flex", fontSize: 38, color: "rgba(27,30,25,0.8)", letterSpacing: -0.5 }}>
              Developer · content creator · AI agent workflows
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24 }}>
            <div style={{ display: "flex", gap: 28 }}>
              <span style={{ display: "flex", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>6</span> projects built
              </span>
              <span style={{ display: "flex", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>2</span> live demos
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
