import { card, label, mist, stack } from "../og";
import { kindColor, posts } from "./posts";

export { size, contentType } from "../og";
export const alt = "The VORQ journal: case studies and notes from the studio.";

export default function Image() {
  return card({
    eyebrow: "Journal",
    title: ["Notes from\nthe studio."],
    description: "Case studies and plain advice on building landing pages, web apps, dashboards and mobile apps.",
    art: (
      <div style={stack}>
        <div style={{ ...label, padding: "14px 14px 6px" }}>Latest</div>
        {posts.slice(0, 3).map((p) => (
          <div key={p.slug} style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", gap: 10, background: mist, borderRadius: 20, padding: "0 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, ...label, fontSize: 13 }}>
              <div style={{ width: 8, height: 8, borderRadius: 8, background: kindColor[p.kind] }} />
              {p.kind}
            </div>
            <div style={{ fontSize: 21, fontWeight: 500, lineHeight: 1.2, letterSpacing: -0.4 }}>{p.title}</div>
          </div>
        ))}
      </div>
    ),
  });
}
