import Link from "next/link";
import { Cover } from "./Cover";
import { formatDate, type Post } from "./posts";

export function Meta({ post }: { post: Post }) {
  return (
    <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/45">
      <span className={`rounded-full px-2 py-0.5 ${post.kind === "Case study" ? "bg-accent/10 text-accent" : "bg-white text-ink/60"}`}>
        {post.kind}
      </span>
      <span>{formatDate(post.date)}</span>
      <span aria-hidden="true">·</span>
      <span>{post.minutes} min read</span>
    </p>
  );
}

/** The large card for the lead post. */
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group shell grid gap-2 lg:grid-cols-[1.25fr_1fr]">
      <div className="panel relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <Cover id={post.cover} priority />
        </div>
      </div>
      <div className="well flex flex-col justify-between gap-10 p-6 md:p-10">
        <Meta post={post} />
        <div>
          <h2 className="text-[clamp(28px,3vw,44px)] leading-[1.05] tracking-[-0.035em]">{post.title}</h2>
          <p className="mt-4 leading-relaxed text-muted">{post.excerpt}</p>
          <span className="mt-8 inline-flex text-[15px] font-medium underline decoration-ink/20 underline-offset-4 transition-colors group-hover:decoration-ink">
            Read the {post.kind === "Case study" ? "case study" : "post"}
          </span>
        </div>
      </div>
    </Link>
  );
}

/** The standard card in the grid. */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group shell flex h-full flex-col">
      <div className="panel relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <Cover id={post.cover} />
        </div>
      </div>
      <div className="well mt-2 flex flex-1 flex-col p-5 md:p-6">
        <Meta post={post} />
        <h3 className="mt-4 text-xl font-medium leading-snug tracking-[-0.02em] decoration-ink/20 underline-offset-4 group-hover:underline md:text-[22px]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}
