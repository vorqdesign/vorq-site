import { principles, services, usd } from "../content";
import { Reveal } from "./Motion";

const webApp = services.find((s) => s.id === "webapp")!;

function Receipt() {
  const rows = [
    [webApp.name, usd(webApp.price)],
    ["Revision rounds", "Included"],
    ["Hourly billing", "None"],
  ];
  return (
    <div className="w-full max-w-[320px] rounded-2xl bg-white p-5 font-mono text-[13px] ring-1 ring-black/[0.06]">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between py-1 text-ink/50">
          <span>{k}</span>
          <span>{v}</span>
        </div>
      ))}
      <div className="my-3 border-t border-dashed border-ink/15" />
      <div className="flex justify-between text-ink">
        <span>Total, fixed</span>
        <span>{usd(webApp.price)}</span>
      </div>
    </div>
  );
}

function Weeks() {
  const stages = ["Design", "Design", "Build", "Build", "Live"];
  return (
    <div className="grid w-full max-w-[320px] grid-cols-5 gap-1.5">
      {stages.map((stage, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="relative h-16 w-full overflow-hidden rounded-lg bg-white ring-1 ring-black/[0.06]">
            <div className="absolute inset-0 bg-accent" style={{ opacity: 0.3 + i * 0.175 }} />
            <span className="absolute inset-x-0 bottom-1.5 text-center font-mono text-[10px] uppercase text-white mix-blend-normal">
              {stage}
            </span>
          </div>
          <span className="font-mono text-[11px] text-ink/40">Wk {i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function Layouts() {
  const block = "rounded-[4px] bg-ink/10";
  return (
    <div className="flex w-full max-w-[320px] gap-2">
      <div className="flex h-24 flex-1 flex-col gap-1.5 rounded-xl bg-white p-2.5 ring-1 ring-black/[0.06]">
        <div className={`${block} h-2 w-1/2`} />
        <div className="flex-1 rounded-[4px] bg-accent/70" />
        <div className="flex gap-1.5">
          <div className={`${block} h-3 flex-1`} />
          <div className={`${block} h-3 flex-1`} />
        </div>
      </div>
      <div className="flex h-24 flex-1 gap-1.5 rounded-xl bg-white p-2.5 ring-1 ring-black/[0.06]">
        <div className={`${block} w-1/3`} />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className={`${block} h-2 w-3/4`} />
          <div className={`${block} h-2 w-1/2`} />
          <div className="mt-auto h-6 rounded-[4px] bg-[#45e6ff]/70" />
        </div>
      </div>
      <div className="grid h-24 flex-1 grid-cols-2 gap-1.5 rounded-xl bg-white p-2.5 ring-1 ring-black/[0.06]">
        <div className="col-span-2 rounded-[4px] bg-[#ff6f9c]/60" />
        <div className={block} />
        <div className={block} />
      </div>
    </div>
  );
}

function Ownership() {
  return (
    <ul className="w-full max-w-[320px] space-y-2 font-mono text-[13px]">
      {["Source code", "Repository", "Domain & deploy"].map((item) => (
        <li key={item} className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 ring-1 ring-black/[0.06]">
          <span className="text-ink/55">{item}</span>
          <span className="text-accent">Yours</span>
        </li>
      ))}
    </ul>
  );
}

const visuals = [Receipt, Weeks, Layouts, Ownership];

export function WhyVorqSection() {
  return (
    <section className="section-pad bg-white">
      <div className="vorq-container">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow text-accent">Why VORQ</p>
          <h2 className="mt-4 text-[clamp(40px,6vw,88px)] leading-[0.98] tracking-[-0.045em]">
            Agency craft.
            <br />
            <span className="text-ink/35">Without the agency.</span>
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((p, i) => {
            const Visual = visuals[i];
            return (
              <Reveal key={p.title} delay={(i % 2) * 0.08} className="h-full">
                <div className="shell flex h-full flex-col">
                  <div className="panel p-2">
                    <div className="grid h-52 place-items-center rounded-2xl bg-mist/70 px-6">
                      <Visual />
                    </div>
                    <div className="flex items-center justify-between px-4 pb-3 pt-5">
                      <h3 className="text-[28px] font-medium leading-none tracking-[-0.035em]">{p.title}</h3>
                      <span className="font-mono text-[12px] text-ink/40">0{i + 1}</span>
                    </div>
                  </div>
                  <p className="well mt-2 flex-1 px-2.5 sm:px-5 py-5 text-[15px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
