import type { Metadata } from "next";
import BookWidget from "../components/BookWidget";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a call with Vorq. Tell us the work, the deadline, and the budget. Fixed scope and price within 24 hours.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a call — Vorq",
    description: "Fixed scope and price within 24 hours.",
    url: "/book",
  },
};

export default function BookPage() {
  return (
    <main id="content" className="book">
      <div className="book-grid">
        <div className="book-copy">
          <h1>Book a call</h1>
          <p>
            Tell us the work, the deadline, and the budget. A fixed price comes back within 24 hours.
          </p>
          <p>
            Same-day reply. Most projects go live in under a week.
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <BookWidget />
      </div>
    </main>
  );
}
