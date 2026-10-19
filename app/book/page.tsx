import type { Metadata } from "next";
import BookWidget from "../components/BookWidget";
import { bookPerks, bookQuote, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a free discovery call with Vorq. Tell us the work, the deadline, and the budget. Fixed scope and price within 24 hours.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a call — Vorq",
    description:
      "Book a free discovery call with Vorq. Fixed scope and price within 24 hours.",
    url: "/book",
  },
};

export default function BookPage() {
  return (
    <main id="content" className="book">
      <div className="wrap book-grid">
        <div className="book-copy rise">
          <p className="kicker">Free discovery call</p>
          <h1>
            Book a <em>call.</em>
          </h1>
          <p className="book-dek">
            Tell us what you need. We’ll scope it, price it, and reply within 24 hours. No commitment.
          </p>
          <ul className="perks">
            {bookPerks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          <figure className="book-quote">
            <blockquote>
              <p>{bookQuote.quote}</p>
            </blockquote>
            <figcaption>— {bookQuote.name}</figcaption>
          </figure>
          <p className="book-dek">
            Prefer email?{" "}
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
        <BookWidget />
      </div>
    </main>
  );
}
