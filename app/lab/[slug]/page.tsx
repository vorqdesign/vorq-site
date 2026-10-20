import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import VorqNav from "../../components/VorqNav";
import { VorqFooter } from "../../components/VorqFooter";
import { Reveal } from "../../components/Motion";
import { ToolStage } from "../../components/ToolsSection";
import { site, tools } from "../../content";
import { JsonLd, orgId, pageMeta } from "../../seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  return tool ? pageMeta({ title: `${tool.name}: ${tool.tagline}`, description: tool.pitch, path: `/lab/${tool.slug}` }) : {};
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@type": "SoftwareApplication",
          name: tool.name,
          description: tool.pitch,
          url: tool.href,
          applicationCategory: "DesignApplication",
          operatingSystem: "Web",
          publisher: { "@id": orgId },
          mainEntityOfPage: `${site.url}/lab/${tool.slug}`,
          offers: tool.plans.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "USD",
          })),
        }}
      />
      <VorqNav />
      <main className="pb-24 pt-[120px] md:pb-32 md:pt-[150px]">
        <section className="vorq-container">
          <Reveal>
            <Link href="/lab" className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45 hover:text-ink">
              VORQ Lab
            </Link>
            <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <h1 className="text-[clamp(52px,8vw,128px)] leading-[0.92] tracking-[-0.05em]">{tool.name}</h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{tool.pitch}</p>
              </div>
              <div className="flex flex-col gap-4 md:items-end">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#e8f8ef] px-3 py-1 text-[12px] font-medium text-[#0b7a45]">{tool.status}</span>
                  <span className="text-muted">{tool.pricing}</span>
                </div>
                <div className="flex gap-3">
                  <a href={tool.href} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                    Visit site
                  </a>
                  <a href={tool.cta.href} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
                    {tool.cta.label}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="shell mt-12 md:mt-16">
            <div className="panel relative aspect-[4/5] overflow-hidden bg-night sm:aspect-[16/9]">
              <ToolStage tool={tool} />
            </div>
          </Reveal>
        </section>

        <section className="vorq-container mt-24 md:mt-36">
          <Reveal>
            <p className="eyebrow text-accent">How it works</p>
            <h2 className="mt-4 text-[clamp(40px,5vw,72px)] leading-[0.98] tracking-[-0.045em]">
              {tool.steps.map((s) => s.title).join(", ")}.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {tool.steps.map((s, i) => (
              <li key={s.title} className="h-full">
                <Reveal delay={i * 0.08} className="shell h-full">
                  <div className="panel h-full px-3.5 py-7 sm:px-7 md:p-9">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-mist font-mono text-[12px] text-ink/60">0{i + 1}</span>
                    <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em] md:text-[28px]">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section className="vorq-container mt-24 md:mt-36">
          <Reveal>
            <p className="eyebrow text-accent">Pricing</p>
            <h2 className="mt-4 text-[clamp(40px,5vw,72px)] leading-[0.98] tracking-[-0.045em]">Free, or Pro.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {tool.plans.map((plan, i) => {
              const pro = i === tool.plans.length - 1;
              return (
                <Reveal key={plan.name} delay={i * 0.08} className="shell h-full">
                  <div className={`flex h-full flex-col p-7 md:p-10 ${pro ? "panel-ink" : "panel"}`}>
                    <p className="text-lg font-medium">{plan.name}</p>
                    <p className="mt-6 text-[56px] leading-none tracking-[-0.05em] md:text-[68px]">{plan.price}</p>
                    {plan.note && <p className={`mt-2 ${pro ? "text-white/50" : "text-muted"}`}>{plan.note}</p>}
                    <ul className="mb-10 mt-8 space-y-3.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-[15px]">
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${pro ? "bg-accent text-white" : "bg-mist text-accent"}`}
                          >
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          <span className={pro ? "text-white/80" : "text-ink/80"}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tool.cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`btn mt-auto w-full ${pro ? "btn-white" : "btn-dark"}`}
                    >
                      {tool.cta.label}
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>
          {tool.credit && <p className="mt-6 text-sm text-ink/45">{tool.credit}</p>}
        </section>

        <section className="vorq-container mt-24 md:mt-36">
          <Reveal className="shell">
            <div className="panel-ink grid gap-8 px-4 py-8 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-end md:p-14">
              <div>
                <p className="eyebrow text-accent-soft">Built by VORQ</p>
                <h2 className="mt-4 text-[clamp(32px,4vw,56px)] leading-[1] tracking-[-0.04em]">
                  Want this level of craft in your own product?
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Link href="/book" className="btn btn-white">
                  Book a call
                </Link>
                <Link href="/#scope" className="btn btn-ghost-dark">
                  Get a price
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
