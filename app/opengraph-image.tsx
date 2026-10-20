import { services, usd } from "./content";
import { card, RowsArt } from "./og";

export { size, contentType } from "./og";
export const alt = "VORQ, a design engineering studio for landing pages, web apps, dashboards and mobile apps, with starting prices.";

const colors = { landing: "#2f6bff", dashboard: "#00a37a", webapp: "#8b3dff", mobile: "#ff5a1f" };

export default function Image() {
  return card({
    eyebrow: "Design engineering studio",
    title: ["We design and build", ["landing pages,", colors.landing], ["web apps,", colors.webapp], ["dashboards", colors.dashboard], "and", ["mobile apps.", colors.mobile]],
    description: "Fixed prices. Custom-built. You own the code.",
    art: (
      <RowsArt
        heading="Starting at"
        rows={services.map((s) => ({ color: colors[s.id], name: s.name, value: usd(s.price), note: `${s.weeks[0]}–${s.weeks[1]} weeks` }))}
      />
    ),
  });
}
