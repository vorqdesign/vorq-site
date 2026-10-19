import Image from "next/image";
import Link from "next/link";
import ShaderLoop from "./components/ShaderLoop";
import {
  contactNote,
  customWork,
  intro,
  product,
  projects,
  services,
  site,
} from "@/lib/content";

export default function HomePage() {
  return (
    <main id="content">
      <header className="intro">
        <h1>{intro.title}</h1>
        <p>{intro.body}</p>
      </header>

      <section id="work" aria-labelledby="work-title">
        <h2 id="work-title" className="sr-only">
          Work
        </h2>

        {projects.map((project, index) => (
          <figure className="piece" key={project.href}>
            <a
              className="bleed"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={project.image}
                alt={`${project.alt}. Opens in a new tab.`}
                width={1440}
                height={960}
                priority={index === 0}
                sizes="100vw"
              />
            </a>
            <figcaption>
              <div className="caption-top">
                <h3>{project.title}</h3>
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  {project.href.replace(/^https:\/\/(www\.)?/, "")}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <p className="meta">
                {project.kind}
                {" · "}
                {project.timeline}
                {" · "}
                {project.tools.join(", ")}
              </p>
              <p className="summary">{project.summary}</p>
            </figcaption>
          </figure>
        ))}

        <figure className="piece">
          <ShaderLoop />
          <figcaption>
            <div className="caption-top">
              <h3>{product.name}</h3>
              <a href={product.href} target="_blank" rel="noopener noreferrer">
                gradient-forge-nu.vercel.app
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <p className="meta">A Vorq product</p>
            <p className="summary">
              {product.headline} {product.summary}
            </p>
          </figcaption>
        </figure>
      </section>

      <section id="prices" className="prices" aria-labelledby="prices-title">
        <h2 id="prices-title">Prices</h2>
        <div className="price-list">
          {services.map((service) => (
            <article className="price" key={service.id}>
              <h3>{service.name}</h3>
              <p className="amount">{service.price}</p>
              <p className="tagline">{service.tagline}</p>
              <p className="includes">{service.includes.join(" · ")}</p>
            </article>
          ))}
        </div>
        <p className="price-note">
          <strong>{customWork.title}</strong> {customWork.body}
        </p>
      </section>

      <section className="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </h2>
        <p>{contactNote}</p>
        <p>
          <Link href={site.bookPath}>Book a call</Link>
        </p>
      </section>
    </main>
  );
}
