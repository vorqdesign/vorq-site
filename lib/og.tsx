import { ImageResponse } from "next/og";

export const ogAlt = "Vorq — websites and MVPs for early-stage teams";
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f4f0e8",
          color: "#1c1915",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: -0.5,
          }}
        >
          <div style={{ display: "flex" }}>Vorq</div>
          <div style={{ display: "flex", color: "#9a3412" }}>
            Design and engineering
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.02,
            letterSpacing: -2.5,
            maxWidth: 920,
          }}
        >
          Websites and MVPs for early-stage teams.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 26,
            color: "#5c564e",
          }}
        >
          <div style={{ display: "flex" }}>vorq.agency</div>
          <div style={{ display: "flex" }}>Book a call</div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
