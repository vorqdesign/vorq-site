import Image from "next/image";
import Link from "next/link";
import Reveal from "./components/Reveal";
import ShaderLoop from "./components/ShaderLoop";
import { contactNote, customWork, product, projects, services, site } from "@/lib/content";

export default function HomePage() {
  return (
    <main id="content">
      <header className="hero">
        <h1>
          Websites
          <br />
          and MVPs.
        </h1>
        <p>Priyanshu Bhardwaj and Ravi Pratap Singh. Fixed scope. You own the code.</p>
        <Link className="hero-link" href={site.bookPath}>
          Book a call <span aria-hidden="true">→</span>
        </Link>
      </header>

      <section id="work" className="work" aria-labelledby="work-title">
        <h2 id="work-title" className="sr-only">
          Work
        </h2>
        {projects.map((project, index) => (
          <Reveal key={project.href} delay={index * 50}>
            <a className="work-piece" href={project.href} target="_blank" rel="noopener noreferrer">
              <div className="work-top">
                <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{project.title}</h2>
                <span className="work-open">
                  Open
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </div>
              <div className="work-frame">
                <div className="work-shot">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="(max-width: 800px) 100vw, 1240px"
                  />
                </div>
              </div>
              <p className="work-line">
                {project.kind}
                {" · "}
                {project.timeline}
              </p>
            </a>
          </Reveal>
        ))}
      </section>

      <section className="forge" aria-labelledby="forge-title">
        <ShaderLoop />
        <div className="forge-copy">
          <h2 id="forge-title">{product.name}</h2>
          <p>{product.headline}</p>
          <p>
            <a href={product.href} target="_blank" rel="noopener noreferrer">
              Open the studio
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>

      <section id="prices" className="prices" aria-labelledby="prices-title">
        <h2 id="prices-title">Prices</h2>
        <div>
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
          {customWork.title} {customWork.body}
        </p>
      </section>

      <section className="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </h2>
        <p>{contactNote}</p>
      </section>
    </main>
  );
}
