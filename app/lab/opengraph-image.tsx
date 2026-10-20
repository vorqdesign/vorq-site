import { card, ForgeArt } from "../og";

export { size, contentType } from "../og";
export const alt = "VORQ Lab: tools we build, ship and sell, starting with Gradient Forge.";

export default function Image() {
  return card({
    eyebrow: "VORQ Lab",
    title: ["Tools we build,\nship and sell."],
    description: "Micro-SaaS for people who build for the web, starting with Gradient Forge.",
    art: <ForgeArt caption="Gradient Forge · Live" />,
  });
}
