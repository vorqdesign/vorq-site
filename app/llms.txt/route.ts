import { posts } from "../blog/posts";
import { extras, faqs, included, services, site, steps, tools, usd } from "../content";
import { description } from "../seo";

export const dynamic = "force-static";

/** The studio's facts as plain Markdown for AI assistants (llmstxt.org), generated from the same content as the site. */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${description}`,
    "",
    "VORQ is an independent studio based in India, working with founders and teams worldwide. Design and engineering happen in the same hands, mostly in code. Every project gets a fixed scope and a fixed price within 24 hours of the brief.",
    "",
    "## Builds and starting prices (USD)",
    "",
    ...services.map((s) => `- **${s.name}**, from ${usd(s.price)}, usually ${s.weeks[0]}–${s.weeks[1]} weeks. ${s.tagline} Includes: ${s.includes.join("; ")}. ${s.unit}.`),
    "",
    "Prices are starting points, not limits. The final price depends on requirements and complexity.",
    "",
    "## Every project includes",
    "",
    ...included.map((i) => `- ${i}`),
    "",
    "## Add-ons and extras",
    "",
    ...extras.map((x) => `- ${x.name} (${x.group}), from ${usd(x.price)}${"monthly" in x ? " a month" : ""}: ${x.body}`),
    "",
    "## Process",
    "",
    ...steps.map((s, i) => `${i + 1}. **${s.title}** (${s.when}): ${s.body}`),
    "",
    "## FAQ",
    "",
    ...faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## VORQ Lab",
    "",
    ...tools.map((t) => `- [${t.name}](${site.url}/lab/${t.slug}): ${t.pitch} ${t.pricing}.`),
    "",
    "## Journal",
    "",
    ...posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.excerpt}`),
    "",
    "## Contact",
    "",
    `- [Book a free 30-minute call](${site.url}/book)`,
    `- Email: ${site.email}`,
    `- [Terms](${site.url}/terms) · [Privacy](${site.url}/privacy)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
