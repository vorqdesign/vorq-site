import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, team, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Vorq is Priyanshu Bhardwaj and Ravi Pratap Singh — a design and engineering studio. No layers, no middlemen.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Studio — Vorq",
    description:
      "Priyanshu Bhardwaj and Ravi Pratap Singh. No layers, no middlemen.",
    url: "/team",
  },
};

export default function TeamPage() {
  return (
    <main id="content">
      <section className="studio-hero wrap">
        <p className="kicker">The studio</p>
        <h1>
          We act <em>as one.</em>
        </h1>
        <p className="studio-dek">
          No layers and no middlemen. Two designers and developers, on the work with you.
        </p>
      </section>

      <section className="wrap" aria-label="People">
        <div className="team-grid">
          {team.map((member, index) => (
            <article key={member.name} className="member">
              <div className="portrait">
                <Image
                  className="portrait-img"
                  src={member.image}
                  alt={member.name}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 960px) 92vw, 440px"
                />
              </div>
              <h2>{member.name}</h2>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section values" aria-labelledby="values-title">
        <div className="wrap">
          <p className="kicker">What we stand for</p>
          <h2 className="section-title" id="values-title">
            Studio values.
          </h2>
          <div className="value-list">
            {values.map((value, index) => (
              <article key={value.title} className="value">
                <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap studio-close">
        <p>Start with the work, the deadline, and the budget.</p>
        <Link className="btn" href={site.bookPath}>
          Book a call
        </Link>
      </div>
    </main>
  );
}
