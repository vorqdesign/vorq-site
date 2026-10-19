import Link from "next/link";
import { nav, site } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/" className="wordmark">
        Vorq
      </Link>
      <nav aria-label="Footer">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href={site.bookPath}>Book a call</Link>
      </nav>
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  );
}
