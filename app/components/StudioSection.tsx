import { quote } from "../content";
import { Reveal } from "./Motion";

export function StudioSection() {
  return (
    <section className="section-pad bg-white">
      <div className="vorq-container">
        <Reveal className="shell">
          <figure className="panel px-3 sm:px-6 py-16 text-center md:px-16 md:py-24">
            <blockquote className="mx-auto max-w-5xl text-[clamp(32px,4.6vw,68px)] leading-[1.05] tracking-[-0.04em]">
              <span className="font-quirk text-accent">“</span>
              {quote.text}
              <span className="font-quirk text-accent">”</span>
            </blockquote>
            <figcaption className="mt-8 text-muted">
              <span className="font-medium text-ink">{quote.name}</span>, {quote.role}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
