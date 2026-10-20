import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const sekuya = await readFile(join(process.cwd(), "assets/og/sekuya.ttf"));

/** Home-screen icon: the wordmark's V on ink. */
export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0b0c", color: "white", fontFamily: "Sekuya", fontSize: 120, paddingTop: 8 }}>
      V
    </div>,
    { ...size, fonts: [{ name: "Sekuya", data: sekuya, weight: 400 }] },
  );
}
