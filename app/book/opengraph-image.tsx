import { card, RowsArt } from "../og";

export { size, contentType } from "../og";
export const alt = "Book a free 30-minute call with VORQ. A fixed scope and price within 24 hours.";

export default function Image() {
  return card({
    eyebrow: "Book a call",
    color: "#2f6bff",
    title: ["Book a free\n30-minute call."],
    description: "Tell us what you’re building. A fixed scope and a fixed price within 24 hours.",
    art: (
      <RowsArt
        heading="What happens"
        rows={[
          { color: "#2f6bff", name: "Call", value: "30 min", note: "Free, no commitment" },
          { color: "#8b3dff", name: "Quote", value: "24 h", note: "Fixed scope, fixed price" },
          { color: "#00a37a", name: "Build", value: "Day 1", note: "Live preview link" },
        ]}
      />
    ),
  });
}
