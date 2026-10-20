import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";

/**
 * The shared share-card for every page: the site's hatched shell with a white
 * panel inside, and an optional second card on the right.
 * Images render at build time; fonts and pictures are read from disk once.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Literal paths, so the build traces only these files.
const [archivo400, archivo500, mono, sekuya, forgeJpg] = await Promise.all([
  readFile(join(process.cwd(), "assets/og/archivo-400.ttf")),
  readFile(join(process.cwd(), "assets/og/archivo-500.ttf")),
  readFile(join(process.cwd(), "assets/og/geist-mono-500.ttf")),
  readFile(join(process.cwd(), "assets/og/sekuya.ttf")),
  readFile(join(process.cwd(), "public/tools/gradient-forge.jpg")),
]);
const forge = `data:image/jpeg;base64,${forgeJpg.toString("base64")}`;

export const ink = "#0b0b0c";
export const mist = "#f4f4f2";
const muted = "#6b6b70";
const hatch = "repeating-linear-gradient(135deg, rgba(11,11,12,0.09) 0px, rgba(11,11,12,0.09) 1px, transparent 1px, transparent 9px)";

/** A title made of words, any of which can carry a colour. "\n" starts a new line. */
type Segment = string | [text: string, color: string];

type Card = {
  eyebrow: string;
  /** Colour of the dot in front of the eyebrow. */
  color?: string;
  title: Segment[];
  description?: string;
  art?: ReactNode;
};

export const panel = { display: "flex", background: "white", borderRadius: 32, border: "1px solid rgba(11,11,12,0.06)" } as const;
export const well = { display: "flex", background: mist, borderRadius: 20 } as const;
export const label = { fontFamily: "Mono", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: "rgba(11,11,12,0.45)" } as const;

export function card({ eyebrow, color = "#8b3dff", title, description, art }: Card) {
  const length = title.reduce<number>((n, s) => n + (typeof s === "string" ? s : s[0]).length, 0);
  const fontSize = (art ? [66, 58, 50] : [96, 82, 70])[length < 34 ? 0 : length < 60 ? 1 : 2];
  const words = title.flatMap((s) => {
    const [text, c] = typeof s === "string" ? [s, ink] : s;
    return text.split(/ |(?=\n)|(?<=\n)/).filter(Boolean).map((w) => [w, c] as const);
  });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", gap: 14, padding: 14, background: mist, backgroundImage: hatch, color: ink, fontFamily: "Archivo" }}>
        <div style={{ ...panel, flex: 1, flexDirection: "column", padding: "44px 52px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "Sekuya", fontSize: 44, lineHeight: 1 }}>VORQ</div>
            <div style={{ ...label, fontSize: 15 }}>vorq.agency</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignSelf: "flex-start", alignItems: "center", gap: 10, background: mist, borderRadius: 999, padding: "8px 16px 8px 14px", ...label, color: "rgba(11,11,12,0.7)" }}>
            <div style={{ width: 9, height: 9, borderRadius: 9, background: color }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 22, fontSize, fontWeight: 500, lineHeight: 1.02, letterSpacing: -fontSize * 0.04 }}>
            {words.map(([w, c], i) =>
              w === "\n" ? (
                <div key={i} style={{ width: "100%" }} />
              ) : (
                <span key={i} style={{ color: c, marginRight: fontSize * 0.24 }}>
                  {w}
                </span>
              ),
            )}
          </div>
          {description && (
            <div style={{ marginTop: 22, fontSize: 25, lineHeight: 1.4, color: muted, maxWidth: art ? 560 : 860 }}>{description}</div>
          )}
        </div>
        {art && <div style={{ ...panel, width: 380, padding: 12 }}>{art}</div>}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo400, weight: 400 },
        { name: "Archivo", data: archivo500, weight: 500 },
        { name: "Mono", data: mono, weight: 500 },
        { name: "Sekuya", data: sekuya, weight: 400 },
      ],
    },
  );
}

/** The Gradient Forge studio, cropped to its preset panel. */
export function ForgeArt({ caption }: { caption: string }) {
  return (
    <div style={{ display: "flex", flex: 1, position: "relative", borderRadius: 22, overflow: "hidden" }}>
      {/* 1440×900 scaled to the card's height, pinned to the right edge. */}
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img src={forge} width={968} height={605} style={{ position: "absolute", top: 0, right: -40 }} />
      <div style={{ position: "absolute", left: 14, bottom: 14, display: "flex", alignItems: "center", gap: 10, background: "white", borderRadius: 999, padding: "9px 16px 9px 14px", ...label, color: ink }}>
        <div style={{ width: 9, height: 9, borderRadius: 9, background: "#00a37a" }} />
        {caption}
      </div>
    </div>
  );
}

/** Stacks the right-hand card's children; satori lays fragments out as one row. */
export const stack = { display: "flex", flex: 1, flexDirection: "column", gap: 8 } as const;

/** Rows of mist wells, each with a coloured dot, a name and a value. */
export function RowsArt({ heading, rows }: { heading: string; rows: { color: string; name: string; value: string; note?: string }[] }) {
  return (
    <div style={stack}>
      <div style={{ ...label, padding: "14px 14px 6px" }}>{heading}</div>
      {rows.map((r) => (
        <div key={r.name} style={{ ...well, flex: 1, flexDirection: "column", justifyContent: "center", padding: "0 22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, fontWeight: 500, letterSpacing: -0.5 }}>
              <div style={{ width: 12, height: 12, borderRadius: 4, background: r.color }} />
              {r.name}
            </div>
            <div style={{ fontSize: 26, fontWeight: 500, letterSpacing: -0.8 }}>{r.value}</div>
          </div>
          {r.note && <div style={{ marginTop: 6, marginLeft: 24, fontSize: 17, color: muted }}>{r.note}</div>}
        </div>
      ))}
    </div>
  );
}
