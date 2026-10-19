import Link from "next/link";
import { nav, site } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link href="/" className="wordmark">
            Vorq
          </Link>
          <p>A design and engineering studio for early-stage teams.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href={site.bookPath}>Book a call</Link>
          {/* TODO: Add real social profile URLs. The previous icons linked to "#". */}
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} Vorq</p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </footer>
  );
}
