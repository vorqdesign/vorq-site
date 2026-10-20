import { steps } from "../content";
import { DrawnCircle, Reveal } from "./Motion";

export function ProcessSection() {
  return (
    <section id="process" className="section-pad scroll-mt-24 bg-white">
      <div className="vorq-container">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-accent">Process</p>
            <h2 className="mt-4 text-[clamp(40px,6vw,88px)] leading-[0.98] tracking-[-0.045em]">
              Here&apos;s how
              <br />
              we{" "}
              <span className="relative inline-block px-2">
                work
                <DrawnCircle />
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            From the first message to launch, with a live preview the whole way.
          </p>
        </Reveal>

        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="h-full">
              <Reveal delay={i * 0.06} className="shell flex h-full flex-col">
                <div className="panel flex-1 p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-mist font-mono text-[12px] text-ink/60">
                      0{i + 1}
                    </span>
                    {/* A four-segment track that fills up to this step. */}
                    <span className="flex gap-1" aria-hidden="true">
                      {steps.map((_, j) => (
                        <span key={j} className={`h-1.5 w-5 rounded-full ${j <= i ? "bg-accent" : "bg-ink/10"}`} />
                      ))}
                    </span>
                  </div>
                  <h3 className="mt-10 text-[28px] font-medium leading-none tracking-[-0.035em]">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
                <p className="well mt-2 px-5 py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] text-ink/55">{s.when}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
