import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VorqNav from "../../components/VorqNav";
import { VorqFooter } from "../../components/VorqFooter";
import { Reveal } from "../../components/Motion";
import ShareButtons from "../../components/ShareButtons";
import { Cover } from "../Cover";
import { Meta, PostCard } from "../PostCard";
import { posts } from "../posts";
import { site } from "../../content";
import { JsonLd, orgId, pageMeta } from "../../seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, article: { publishedTime: post.date } });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Keep reading: same kind first, then the newest of the rest.
  const others = posts.filter((p) => p.slug !== post.slug);
  const more = [...others.filter((p) => p.kind === post.kind), ...others.filter((p) => p.kind !== post.kind)].slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          articleSection: post.kind,
          timeRequired: `PT${post.minutes}M`,
          url: `${site.url}/blog/${post.slug}`,
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          image: `${site.url}/blog/${post.slug}/opengraph-image`,
          author: { "@id": orgId },
          publisher: { "@id": orgId },
        }}
      />
      <VorqNav />
      <main className="pb-24 pt-[120px] md:pb-32 md:pt-[150px]">
        <article>
          <Reveal className="vorq-container">
            <Link href="/blog" className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45 transition-colors hover:text-ink">
              Journal
            </Link>
            <div className="mt-6">
              <Meta post={post} />
            </div>
            <h1 className="mt-5 max-w-5xl text-[clamp(40px,6vw,88px)] leading-[0.98] tracking-[-0.045em]">{post.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-3 text-[15px]">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-wordmark text-[13px] text-white">V</span>
                <span>
                  <span className="block font-medium">VORQ Studio</span>
                  <span className="block text-muted">Design engineering</span>
                </span>
              </p>
              <ShareButtons title={post.title} />
            </div>
          </Reveal>

          <Reveal className="vorq-container mt-10 md:mt-14">
            <div className="shell">
              <div className="panel relative aspect-[16/10] overflow-hidden md:aspect-[21/9]">
                <Cover id={post.cover} priority />
              </div>
            </div>
          </Reveal>

          {post.facts && (
            <Reveal className="vorq-container mt-4">
              <div className="shell">
                <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {post.facts.map((f) => (
                    <div key={f.label} className="panel px-2.5 py-5 sm:px-5">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">{f.label}</dt>
                      <dd className="mt-2 text-lg font-medium tracking-[-0.02em]">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                {post.links && (
                  <div className="flex flex-wrap gap-2 px-3 pb-1 pt-3">
                    {post.links.map((l) =>
                      l.href.startsWith("http") ? (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                          {l.label}
                        </a>
                      ) : (
                        <Link key={l.href} href={l.href} className="btn btn-outline btn-sm">
                          {l.label}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          )}

          <div className="vorq-container mt-14 md:mt-20">
            <div className="article mx-auto max-w-[720px]">{post.body}</div>
          </div>
        </article>

        <Reveal className="vorq-container mt-20 md:mt-28">
          <div className="shell">
            <div className="panel-ink grid gap-8 px-4 py-8 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-end md:p-14">
              <div>
                <p className="eyebrow text-accent-soft">Work with us</p>
                <h2 className="mt-4 text-[clamp(32px,4vw,56px)] leading-[1] tracking-[-0.04em]">Have something like this in mind?</h2>
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
          </div>
        </Reveal>

        <section className="vorq-container mt-20 md:mt-28">
          <h2 className="text-[clamp(28px,3vw,44px)] leading-[1.02] tracking-[-0.04em]">Keep reading</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </main>
      <VorqFooter />
    </>
  );
}
