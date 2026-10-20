import { card } from "../../og";
import { formatDate, kindColor, posts } from "../posts";

export { size, contentType } from "../../og";
export const alt = "A post from the VORQ journal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug)!;
  return card({
    eyebrow: `${post.kind} · ${formatDate(post.date)} · ${post.minutes} min read`,
    color: kindColor[post.kind],
    title: [post.title],
  });
}
