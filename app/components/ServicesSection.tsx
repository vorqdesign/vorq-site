import Link from "next/link";
import { Check } from "lucide-react";
import { extraGroups, extras, included, services, site, usd } from "../content";
import { Reveal } from "./Motion";

type Service = (typeof services)[number];

/** A small sketch of what each scope actually delivers. */
function Sketch({ id }: { id: Service["id"] }) {
  if (id === "landing") {
    return (
      <div className="mx-auto flex h-full w-[58%] flex-col gap-1.5 rounded-lg bg-white p-2.5 ring-1 ring-black/[0.06]">
        <div className="h-1.5 w-1/3 rounded-full bg-ink/15" />
        <div className="mt-1 h-2 w-4/5 rounded-full bg-ink" />
        <div className="h-1.5 w-3/5 rounded-full bg-ink/25" />
        <div className="mt-0.5 h-3 w-1/3 rounded-full bg-accent" />
        <div className="mt-1 flex-1 rounded-md bg-accent/80" />
        <div className="grid grid-cols-3 gap-1">
          <div className="h-4 rounded bg-ink/[0.06]" />
          <div className="h-4 rounded bg-ink/[0.06]" />
          <div className="h-4 rounded bg-ink/[0.06]" />
        </div>
      </div>
    );
  }
  if (id === "webapp") {
    return (
      <div className="flex h-full flex-col gap-1.5 rounded-lg bg-white p-2 ring-1 ring-black/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-8 rounded-full bg-ink" />
          <div className="h-3 flex-1 rounded bg-ink/[0.05]" />
          <div className="h-3 w-3 rounded-full bg-ink/15" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-1.5">
          {[3, 2, 1].map((n, c) => (
            <div key={c} className="flex flex-col gap-1 rounded-md bg-ink/[0.04] p-1">
              {Array.from({ length: n }, (_, i) => (
                <div key={i} className="h-4 rounded bg-white ring-1 ring-black/[0.05]" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (id === "mobile") {
    return (
      <div className="flex h-full items-center justify-center gap-3">
        {[0, 1].map((p) => (
          <div key={p} className="flex h-full w-[64px] flex-col gap-1 rounded-[14px] bg-white p-1.5 ring-2 ring-ink/80">
            <div className="mx-auto h-1 w-5 rounded-full bg-ink/70" />
            <div className="h-1.5 w-2/3 rounded-full bg-ink" />
            <div className={`flex-1 rounded-md ${p === 0 ? "bg-ink/80" : "bg-ink/[0.06]"}`} />
            <div className="grid grid-cols-4 gap-0.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-1 rounded-full ${i === 0 ? "bg-ink" : "bg-ink/15"}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-full gap-1.5 rounded-lg bg-white p-2 ring-1 ring-black/[0.06]">
      <div className="flex w-1/5 flex-col gap-1 rounded-md bg-ink/[0.04] p-1.5">
        <div className="h-1.5 w-2/3 rounded-full bg-accent" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1 rounded-full bg-ink/15" />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="grid grid-cols-3 gap-1.5">
          {["MRR", "Users", "Churn"].map((v) => (
            <div key={v} className="rounded-md bg-ink/[0.04] p-1.5">
              <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-ink/40">{v}</p>
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-ink/40" />
            </div>
          ))}
        </div>
        <div className="relative flex-1 overflow-hidden rounded-md bg-ink/[0.04]">
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M0 50 C30 44 45 30 70 34 S110 14 140 20 S180 6 200 8" fill="none" stroke="#8b3dff" strokeWidth="2" />
            <path d="M0 50 C30 44 45 30 70 34 S110 14 140 20 S180 6 200 8 V60 H0Z" fill="#8b3dff" opacity="0.12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PriceCard({ s, index }: { s: Service; index: number }) {
  return (
    <div className="shell flex h-full flex-col">
      {/* The raised panel: what it is and what it looks like. */}
      <div className="panel p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[12px] text-ink/40">0{index + 1}</span>
          <span className="rounded-full bg-mist px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/55">
            {s.weeks[0]}–{s.weeks[1]} weeks
          </span>
        </div>
        <h3 className="mt-6 text-[30px] font-medium leading-none tracking-[-0.035em]">{s.name}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.tagline}</p>
        <div className="mt-6 h-36 rounded-2xl bg-mist p-3">
          <Sketch id={s.id} />
        </div>
      </div>

      {/* The shell: the price and the plain facts. */}
      <div className="well mt-2 flex flex-1 flex-col px-5 pb-5 pt-6">
        <p className="flex items-baseline gap-2">
          <span className="text-[15px] text-muted">Starts at</span>
          <span className="text-[34px] leading-none tracking-[-0.04em]">{usd(s.price)}</span>
        </p>
        <ul className="mt-5 text-[15px] text-ink/75">
          {s.includes.map((item) => (
            <li key={item} className="border-t border-black/[0.06] py-2.5">
              {item}
            </li>
          ))}
          <li className="border-t border-black/[0.06] py-2.5 text-ink/50">{s.unit}</li>
        </ul>
        <p className="mt-2 text-[13px] text-ink/45">Ideal for {s.ideal.toLowerCase()}.</p>
        <div className="mt-auto pt-6">
          <Link href={`/book?scope=${encodeURIComponent(s.name)}&est=${s.price}`} className="btn btn-dark btn-sm w-full">
            Book a call
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="section-pad scroll-mt-24 bg-white">
      <div className="vorq-container">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-accent">Pricing</p>
            <h2 className="mt-4 text-[clamp(40px,6vw,88px)] leading-[0.98] tracking-[-0.045em]">
              Real scopes.
              <br />
              <span className="text-ink/35">Real prices.</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            Starting points, not limits. Your price follows your requirements and complexity, and you get a fixed scope
            and a fixed quote within 24 hours of your brief.
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} className="h-full">
              <PriceCard s={s} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4">
          <div className="shell mb-4">
            <p className="panel px-5 py-4 text-[15px] leading-relaxed text-ink/70 md:px-6">
              <span className="font-medium text-ink">No hard boundaries.</span> These packages are where most projects
              start. Bigger, smaller or somewhere in between, we shape the scope around what you need and price it on its
              requirements and complexity, agreed before anything starts.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-full bg-mist py-2 pl-2 pr-4 text-[14px] text-ink/75">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-accent">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16 flex flex-col justify-between gap-4 md:mt-24 md:flex-row md:items-end">
          <h3 className="text-[clamp(28px,3vw,44px)] leading-[1.02] tracking-[-0.04em]">More engineering</h3>
          <p className="max-w-md leading-relaxed text-muted">
            On its own or on top of any build. Something bigger or different?{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
              Email us
            </a>{" "}
            and we agree the number before anyone starts.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {extraGroups.map((group, g) => (
            <Reveal key={group} delay={(g % 2) * 0.06} className="shell h-full">
              <p className="px-4 pb-3 pt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45">{group}</p>
              <ul className="panel px-5 py-1">
                {extras
                  .filter((x) => x.group === group)
                  .map((x) => (
                    <li key={x.name} className="flex items-baseline justify-between gap-6 border-t border-black/[0.06] py-4 first:border-t-0">
                      <div>
                        <p className="text-[17px] font-medium tracking-[-0.01em]">{x.name}</p>
                        <p className="mt-0.5 text-[15px] text-muted">{x.body}</p>
                      </div>
                      <p className="shrink-0 font-mono text-[13px] text-ink/60">
                        from {usd(x.price)}
                        {"monthly" in x && "/mo"}
                      </p>
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
