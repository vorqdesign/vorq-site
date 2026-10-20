import Image from "next/image";
import type { WorkItem } from "@/lib/content";

export default function Work({ items }: { items: readonly WorkItem[] }) {
  if (items.length === 0) {
    return (
      <section id="work" className="work" aria-labelledby="work-title">
        <h2 id="work-title" className="sr-only">
          Work
        </h2>
        <p className="work-note">New work coming.</p>
      </section>
    );
  }

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <h2 id="work-title">Work</h2>
      <div className="work-list">
        {items.map((item) => (
          <article key={item.href}>
            <div className="work-shot">
              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 40vw" />
            </div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              Open
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
