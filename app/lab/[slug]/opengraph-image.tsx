import { tools } from "../../content";
import { card, ForgeArt } from "../../og";

export { size, contentType } from "../../og";
export const alt = "A VORQ Lab tool";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug)!;
  return card({
    eyebrow: `VORQ Lab · ${tool.status}`,
    color: "#00a37a",
    title: [[`${tool.name}.`, "#8b3dff"], `${tool.tagline}.`],
    description: tool.pricing,
    art: <ForgeArt caption="Live studio" />,
  });
}
