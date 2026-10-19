import Image from "next/image";
import Link from "next/link";
import {
  customWork,
  hero,
  principles,
  product,
  projects,
  services,
  site,
  steps,
  testimonials,
} from "@/lib/content";

export default function HomePage() {
  return (
    <main id="content">
      <section className="hero wrap">
        <div className="hero-grid">
          <div className="rise">
            <p className="kicker">{hero.kicker}</p>
            <h1>
              {hero.titleLead}
              <em>{hero.titleEmphasis}</em>
            </h1>
            <p className="hero-dek">{hero.dek}</p>
            <div className="hero-actions">
              <Link className="btn" href={site.bookPath}>
                Book a call
              </Link>
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>

          <aside className="hero-product" aria-label="Vorq product">
            {/* TODO: Replace this decorative field with a real Gradient Forge still when one is available. */}
            <div className="forge-field" aria-hidden="true" />
            <div className="hero-product-copy">
              <p className="kicker">{product.kicker}</p>
              <h2>{product.name}</h2>
              <p>{product.headline}</p>
              <p>{product.summary}</p>
              <a className="text-link" href={product.href} target="_blank" rel="noopener noreferrer">
                Open Gradient Forge
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Services</p>
              <h2 className="section-title" id="services-title">
                Published prices. Custom work.
              </h2>
            </div>
            <p className="lede">
              We got tired of agencies quoting $5,000 for a landing page. These are the ranges. Larger work is scoped before anyone starts.
            </p>
          </div>
          <div className="services">
            {services.map((service, index) => (
              <article
                key={service.id}
                className={service.featured ? "service service-core" : "service"}
              >
                <p className="kicker">
                  {String(index + 1).padStart(2, "0")}
                  {service.featured ? " · Core offer" : ""}
                </p>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-price">{service.price}</p>
                <p className="service-tagline">{service.tagline}</p>
                <ul>
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="text-link service-go" href={site.bookPath}>
                  {service.cta}
                </Link>
              </article>
            ))}
          </div>
          <div className="custom-row">
            <div>
              <h3>{customWork.title}</h3>
              <p>{customWork.body}</p>
            </div>
            <a className="btn btn-line" href={`mailto:${site.email}`}>
              Email the studio
            </a>
          </div>
          <p className="stack-note">Typical stack · Next.js · React · Framer · Supabase</p>
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Selected work</p>
              <h2 className="section-title" id="work-title">
                In the world, and one product of our own.
              </h2>
            </div>
            <p className="lede">
              Client projects shipped by the studio, plus Gradient Forge, which we build and run ourselves.
            </p>
          </div>
          <div className="work-grid">
            {projects.map((project) => (
              <article key={project.title} className="work-card">
                <a
                  className="work-link"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="work-media">
                    <Image
                      className="work-img"
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 960px) 92vw, 40vw"
                    />
                  </div>
                  <div className="work-body">
                    <p className="work-kind">{project.kind}</p>
                    <h3 className="work-title">{project.title}</h3>
                    <p className="work-summary">{project.summary}</p>
                    <div className="work-meta">
                      <span>{project.tools.join(" · ")}</span>
                      <span>{project.timeline}</span>
                    </div>
                    <span className="work-go">
                      View project
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
          <a className="product-row" href={product.href} target="_blank" rel="noopener noreferrer">
            <p className="kicker">Product</p>
            <strong>{product.name}</strong>
            <span>
              Open
              <span className="sr-only"> Gradient Forge in a new tab</span>
            </span>
            <span className="product-desc">{product.headline}</span>
          </a>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Studio</p>
              <h2 className="section-title" id="principles-title">
                A small team, on the work.
              </h2>
            </div>
            <p className="lede">
              <Link className="text-link" href="/team">
                Meet the studio
              </Link>
            </p>
          </div>
          <div className="principle-grid">
            {principles.map((item, index) => (
              <article key={item.title} className="principle">
                <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process" aria-labelledby="process-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Process</p>
              <h2 className="section-title" id="process-title">
                Four steps. A fixed price.
              </h2>
            </div>
            <p className="lede">You always know what happens next, and what it costs.</p>
          </div>
          <ol className="process-list">
            {steps.map((step, index) => (
              <li key={step.title} className="process-item">
                <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="quotes-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Clients</p>
              <h2 className="section-title" id="quotes-title">
                In their words.
              </h2>
            </div>
          </div>
          <div className="quote-grid">
            {testimonials.map((item) => (
              <figure key={item.name} className="quote">
                <blockquote>
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption>
                  <span>{item.name}</span>
                  <span>{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <div className="wrap contact-grid">
          <div>
            <p className="kicker">Contact</p>
            <h2 className="section-title" id="contact-title">
              Tell us what you need.
            </h2>
            <p className="lede">
              An email or a thirty-minute call. Share the work, the deadline, and the budget. You get a fixed scope and price within 24 hours.
            </p>
          </div>
          <div className="contact-actions">
            <Link className="btn btn-paper" href={site.bookPath}>
              Book a call
            </Link>
            <address>
              <a className="contact-email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </address>
          </div>
        </div>
      </section>
    </main>
  );
}
