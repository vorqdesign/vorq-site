import type { MetadataRoute } from "next";
import { posts } from "./blog/posts";
import { site, tools } from "./content";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = posts.map((p) => p.date).sort().at(-1);
  const page = (path: string, priority: number, lastModified = latest) => ({ url: `${site.url}${path}`, lastModified, priority });
  return [
    page("", 1),
    page("/book", 0.9),
    page("/lab", 0.8),
    ...tools.map((t) => page(`/lab/${t.slug}`, 0.8)),
    page("/blog", 0.7),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.6, p.date)),
    page("/terms", 0.2, "2026-10-20"),
    page("/privacy", 0.2, "2026-10-20"),
  ];
}
