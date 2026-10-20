import Image from "next/image";
import Link from "next/link";
import Reveal from "./components/Reveal";
import StatsRow from "./components/StatsRow";
import Work from "./components/Work";
import { contactNote, customWork, intro, services, site, steps, tools, work } from "@/lib/content";

export default function HomePage() {
  return (
    <main id="content">
      <header className="hero">
        <h1>
          <span>Tools, and the</span>
          <span className="line2">
            sites we <em>build.</em>
          </span>
        </h1>
        <p>{intro.body}</p>
        <div className="hero-actions">
          <Link className="btn ink" href={site.bookPath}>
            Book a call <span aria-hidden="true">↗</span>
          </Link>
          <a className="btn ghost" href="#tools">
            See the tool
          </a>
        </div>
      </header>

      <section id="tools" className="tools" aria-labelledby="tools-title">
        <Reveal>
          <div className="tools-head">
            <div>
              <p className="eyebrow dark">Tools</p>
              <h2 id="tools-title">
                Built by <em>Vorq.</em>
              </h2>
            </div>
            <p>Live tools from the studio.</p>
          </div>
        </Reveal>
        {tools.map((tool) => (
          <article className="tool" key={tool.href}>
            <a className="tool-frame" href={tool.try} target="_blank" rel="noopener noreferrer">
              <span className="shot">
                <Image src={tool.image} alt={tool.alt} fill sizes="(max-width: 800px) 100vw, 1120px" priority />
              </span>
              <span className="tag">
                <strong>{tool.name}</strong>
                <span>Try it</span>
              </span>
            </a>
            <Reveal>
              <div className="tool-copy">
                <div>
                  <h3>{tool.name}</h3>
                  <p>{tool.pitch}</p>
                  <p className="tool-note">{tool.note}</p>
                </div>
                <a className="btn quiet" href={tool.try} target="_blank" rel="noopener noreferrer">
                  Try it <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          </article>
        ))}
      </section>

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
            {services.map((service) => (
              <Reveal key={service.id}>
                <article className="service">
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
            ))}
          </div>
          <p className="custom">
            <strong>{customWork.title}</strong> {customWork.body}
          </p>
        </div>
      </section>

      <StatsRow />
      <Work items={work} />

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
