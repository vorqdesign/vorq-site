import Image from "next/image";
import Link from "next/link";
import Reveal from "./components/Reveal";
import StatsRow from "./components/StatsRow";
import { contactNote, customWork, intro, product, projects, services, site, steps } from "@/lib/content";

const serviceShots: Record<string, { src: string; alt: string }> = {
  redesign: { src: projects[1].image, alt: projects[1].alt },
  website: { src: projects[0].image, alt: projects[0].alt },
  mvp: { src: projects[3].image, alt: projects[3].alt },
};

const cases = [projects[0], projects[1]];

export default function HomePage() {
  return (
    <main id="content">
      <header className="hero">
        <h1>
          <span>Websites & MVPs</span>
          <span className="line2">
            designed and <em>built.</em>
          </span>
        </h1>
        <p>{intro.body}</p>
        <div className="hero-actions">
          <Link className="btn ink" href={site.bookPath}>
            Book a call <span aria-hidden="true">↗</span>
          </Link>
          <a className="btn ghost" href="#work">
            See our work
          </a>
        </div>
      </header>

      <section id="work" className="gallery" aria-label="Work">
        {projects.map((project) => (
          <a key={project.href} href={project.href} target="_blank" rel="noopener noreferrer">
            <span className="shot">
              <Image src={project.image} alt={project.alt} fill sizes="(max-width: 800px) 82vw, 42vw" />
            </span>
            <span className="tag">
              <strong>{project.title}</strong>
              <span>
                {project.kind} · {project.timeline}
              </span>
            </span>
          </a>
        ))}
      </section>
      <p className="forge-line">
        <a href={product.href} target="_blank" rel="noopener noreferrer">
          {product.name}
        </a>
        {" — "}
        {product.headline}
      </p>

      <section id="services" className="services-wrap" aria-labelledby="services-title">
        <div className="services">
          <Reveal>
            <div className="services-head">
              <p className="eyebrow">What we do</p>
              <h2 id="services-title">One studio. Three offers.</h2>
              <p>Fixed scope. You own the code. Most projects go live in under a week.</p>
            </div>
          </Reveal>
          <div className="service-grid">
            {services.map((service) => {
              const shot = serviceShots[service.id];
              return (
                <Reveal key={service.id}>
                  <article className="service">
                    {shot ? (
                      <div className="service-shot">
                        <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 800px) 100vw, 30vw" />
                      </div>
                    ) : null}
                    <div className="service-body">
                      <div className="service-top">
                        <h3>{service.name}</h3>
                        <p className="service-price">{service.price}</p>
                      </div>
                      <p>{service.tagline}</p>
                      <ul>
                        {service.includes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <p className="custom">
            <strong>{customWork.title}</strong> {customWork.body}
          </p>
        </div>
      </section>

      <StatsRow />

      <section className="cases" aria-labelledby="cases-title">
        <Reveal>
          <div className="cases-head">
            <div>
              <p className="eyebrow dark">Selected work</p>
              <h2 id="cases-title">
                Work we <em>shipped.</em>
              </h2>
            </div>
            <p>Live sites. The screenshots are the homepages as they are now.</p>
          </div>
        </Reveal>
        {cases.map((project, index) => (
          <Reveal key={project.href}>
            <article className={`case${index % 2 ? " flip" : ""}`}>
              <div className="case-shot">
                <Image src={project.image} alt={project.alt} fill sizes="(max-width: 800px) 100vw, 720px" />
              </div>
              <div className="case-copy">
                <div>
                  <p className="case-meta">
                    {project.kind} · {project.timeline}
                  </p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <a className="btn quiet" href={project.href} target="_blank" rel="noopener noreferrer">
                  Open live site <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section id="process" className="process" aria-labelledby="process-title">
        <Reveal>
          <div className="process-head">
            <div>
              <p className="eyebrow dark">How we work</p>
              <h2 id="process-title">
                From brief
                <br />
                to launch.
              </h2>
            </div>
            <p>{contactNote}</p>
          </div>
        </Reveal>
        <div className="steps">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 40}>
              <article className={index === steps.length - 1 ? "step last" : "step"}>
                <p className="num">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="pricing" className="closing" aria-labelledby="closing-title">
        <div className="glow" aria-hidden="true" />
        <p className="eyebrow">Start</p>
        <h2 id="closing-title">
          <span>Have a project in mind?</span>
          <em>Let’s make it unmissable.</em>
        </h2>
        <p>{contactNote}</p>
        <div className="hero-actions">
          <Link className="btn paper" href={site.bookPath}>
            Book a call <span aria-hidden="true">↗</span>
          </Link>
          <a className="btn line" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </section>
    </main>
  );
}
