"use client";

import { useState } from "react";
import { Reveal } from "../components/Motion";
import { FeaturedPost, PostCard } from "./PostCard";
import { kinds, posts, type Kind } from "./posts";

export function Journal() {
  const [filter, setFilter] = useState<Kind | "All">("All");
  const list = filter === "All" ? posts : posts.filter((p) => p.kind === filter);
  const [lead, ...rest] = list;
  const tabs: (Kind | "All")[] = ["All", ...kinds];

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="radiogroup" aria-label="Filter posts">
        {tabs.map((t) => {
          const count = t === "All" ? posts.length : posts.filter((p) => p.kind === t).length;
          const on = filter === t;
          return (
            <button
              key={t}
              role="radio"
              aria-checked={on}
              onClick={() => setFilter(t)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[14px] transition-colors ${
                on ? "bg-ink text-white" : "bg-mist text-ink/70 hover:text-ink"
              }`}
            >
              {t === "Case study" ? "Case studies" : t}
              <span className={`font-mono text-[11px] ${on ? "text-white/50" : "text-ink/40"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {lead && (
        <Reveal key={`${filter}-lead`} className="mt-8">
          <FeaturedPost post={lead} />
        </Reveal>
      )}

      {rest.length > 0 && (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={`${filter}-${p.slug}`} delay={(i % 3) * 0.06} className="h-full">
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
