import Link from "next/link";
import VorqNav from "../components/VorqNav";
import { VorqFooter } from "../components/VorqFooter";
import { Reveal } from "../components/Motion";
import { FeaturedTool } from "../components/ToolsSection";
import { site, tools } from "../content";
import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Lab: tools for people who build for the web",
  description: "Micro-SaaS tools built and sold by VORQ, starting with Gradient Forge, a shader background studio for Next.js.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <>
      <VorqNav />
      <main className="pb-24 pt-[120px] md:pb-32 md:pt-[150px]">
        <section className="vorq-container">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-accent">VORQ Lab</p>
              <h1 className="mt-4 text-[clamp(52px,8vw,128px)] leading-[0.92] tracking-[-0.05em]">
                Tools we build,
                <br />
                ship and sell.
              </h1>
            </div>
            <div className="max-w-sm">
              <p className="text-lg leading-relaxed text-muted">
                Micro-SaaS for people who build for the web. Each one runs on the same craft as our client work, and
                each one is a product you can use today.
              </p>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45">
                {tools.length} {tools.length === 1 ? "tool" : "tools"} live
              </p>
            </div>
          </Reveal>
        </section>

        <section className="vorq-container mt-16 space-y-24 md:mt-24">
          {tools.map((t) => (
            <FeaturedTool key={t.slug} tool={t} detailHref={`/lab/${t.slug}`} />
          ))}
        </section>

        <section className="vorq-container mt-24 md:mt-36">
          <Reveal className="shell">
            <div className="panel-ink grid gap-8 px-4 py-8 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-end md:p-14">
              <div>
                <p className="eyebrow text-accent-soft">Next in the Lab</p>
                <h2 className="mt-4 text-[clamp(32px,4vw,56px)] leading-[1] tracking-[-0.04em]">
                  Want the next tool first, or one built for your product?
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <a href={`mailto:${site.email}?subject=Lab%20early%20access`} className="btn btn-white">
                  Get early access
                </a>
                <Link href="/book?scope=Custom%20tool" className="btn btn-ghost-dark">
                  Build a custom tool
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <VorqFooter />
    </>
  );
}
