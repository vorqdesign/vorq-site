import { stack } from "../content";

export function StackStrip() {
  const row = [...stack, ...stack];
  return (
    <section className="section-pad bg-white" aria-label="Tools we build with">
      <div className="vorq-container">
        <div className="shell">
          <p className="px-4 pb-3 pt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45">The stack</p>
          <div className="overflow-hidden rounded-[22px] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="marquee flex w-max items-center gap-2 py-1">
              {row.map((t, i) => (
                <li key={i} aria-hidden={i >= stack.length} className="panel flex shrink-0 items-center gap-3 rounded-full px-5 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.simpleicons.org/${t.slug}`}
                    alt=""
                    width={22}
                    height={22}
                    loading="lazy"
                    className="h-[22px] w-[22px]"
                  />
                  <span className="text-lg font-medium tracking-[-0.02em]">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
