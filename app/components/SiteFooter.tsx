import Link from "next/link";
import { nav, product, site } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-panel">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="mark light" aria-hidden="true" />
              Vorq
            </Link>
            <p>
              Priyanshu Bhardwaj and Ravi Pratap Singh.
              <br />
              Websites and MVPs.
            </p>
          </div>
          <div className="footer-cols">
            <nav aria-label="Footer">
              <p>Studio</p>
              {nav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div>
              <p>Contact</p>
              <Link href={site.bookPath}>Book a call</Link>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={product.href} target="_blank" rel="noopener noreferrer">
                {product.name}
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vorq</p>
        </div>
      </div>
    </footer>
  );
}
