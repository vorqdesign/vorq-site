import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, team, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Vorq is Priyanshu Bhardwaj and Ravi Pratap Singh. We design and build the work.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Studio — Vorq",
    description: "Priyanshu Bhardwaj and Ravi Pratap Singh.",
    url: "/team",
  },
};

export default function TeamPage() {
  return (
    <main id="content" className="studio">
      <header className="intro">
        <h1>Priyanshu Bhardwaj and Ravi Pratap Singh</h1>
        <p>No layers and no middlemen. We design and build the work.</p>
      </header>

      <section className="people" aria-label="People">
        {team.map((member, index) => (
          <article className="member" key={member.name}>
            <div className="portrait">
              <Image
                src={member.image}
                alt={member.name}
                fill
                priority={index === 0}
                sizes="(max-width: 800px) 100vw, 22rem"
              />
            </div>
            <h2>{member.name}</h2>
            <p className="meta">{member.role}</p>
            <p>{member.bio}</p>
          </article>
        ))}
      </section>

      <section className="values" aria-labelledby="values-title">
        <h2 id="values-title">Values</h2>
        {values.map((value) => (
          <article className="value" key={value.title}>
            <h3>{value.title}</h3>
            <p>{value.body}</p>
          </article>
        ))}
      </section>

      <p className="studio-close">
        <Link href={site.bookPath}>Book a call</Link>
        {" · "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </main>
  );
}
