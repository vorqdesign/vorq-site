"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useSpring, useTransform } from "framer-motion";
import { extras, services, usd } from "../content";
import { Reveal } from "./Motion";

const addons = extras.filter((x) => x.addon);
const retainer = extras.find((x) => "monthly" in x)!;
const pop = {
  initial: { opacity: 0, y: 10, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 6, scale: 0.98 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

function Money({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 140, damping: 24 });
  const text = useTransform(spring, (v) => usd(Math.round(v / 50) * 50));
  useEffect(() => spring.set(value), [spring, value]);
  return <motion.span className="tabular-nums">{text}</motion.span>;
}

/** The wireframe of whatever is being scoped, assembling as options change. */
function Blueprint({ base, picked, support }: { base: string; picked: string[]; support: boolean }) {
  const motionOn = picked.includes("Motion & WebGL");
  const ai = picked.includes("AI features");
  const system = picked.includes("Design system in code");
  const billing = picked.includes("Payments & billing");
  const demo = picked.includes("Interactive demo");
  const bar = "rounded-full bg-ink/15";
  const hero = motionOn
    ? "shimmer bg-accent bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.16)_0_2px,transparent_2px_10px)]"
    : "bg-ink/[0.06]";

  return (
    <div className="relative flex h-[340px] flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] md:h-[380px]">
      <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        </span>
        <span className="mx-auto rounded-full bg-mist px-4 py-1 font-mono text-[11px] text-ink/50">
          {base === "landing" ? "yourstartup.com" : base === "mobile" ? "yourstartup · iOS + Android" : "app.yourstartup.com"}
        </span>
        <AnimatePresence>
          {support && (
            <motion.span {...pop} className="flex items-center gap-1.5 rounded-full bg-[#e8f8ef] px-2.5 py-1 text-[11px] font-medium text-[#0b7a45]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              Monthly care
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={base} {...pop} className="flex flex-1 flex-col gap-3 p-4">
          {base === "dashboard" && (
            <div className="flex flex-1 gap-3">
              <div className="flex w-1/5 flex-col gap-2 rounded-xl bg-ink/[0.04] p-2.5">
                <div className="h-2 w-2/3 rounded-full bg-ink" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className={`${bar} h-1.5`} />
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="grid grid-cols-3 gap-2">
                  {["Revenue", "Users", "Churn"].map((k) => (
                    <div key={k} className="rounded-xl bg-ink/[0.04] p-2.5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40">{k}</p>
                      <div className="mt-1.5 h-2 w-2/3 rounded-full bg-ink/40" />
                    </div>
                  ))}
                </div>
                <div className={`relative flex-1 overflow-hidden rounded-xl ${motionOn ? hero : "bg-ink/[0.04]"}`}>
                  <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <path
                      d="M0 50 C30 44 45 30 70 34 S110 14 140 20 S180 6 200 8"
                      fill="none"
                      stroke={motionOn ? "#fff" : "#0b0b0c"}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-2 rounded-full bg-ink/[0.07]" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {base === "webapp" && (
            <>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-14 rounded-full bg-ink" />
                <div className="ml-3 h-6 flex-1 rounded-lg bg-ink/[0.05]" />
                <div className="h-6 w-6 rounded-full bg-ink/15" />
              </div>
              <div className="grid flex-1 grid-cols-3 gap-2">
                {["To do", "Doing", "Done"].map((col, c) => (
                  <div key={col} className={`flex flex-col gap-2 rounded-xl p-2 ${c === 1 && motionOn ? hero : "bg-ink/[0.04]"}`}>
                    <p className={`font-mono text-[9px] uppercase tracking-[0.1em] ${c === 1 && motionOn ? "text-white/70" : "text-ink/40"}`}>
                      {col}
                    </p>
                    {Array.from({ length: 3 - c }, (_, i) => (
                      <div key={i} className="rounded-lg bg-white p-2 ring-1 ring-black/[0.05]">
                        <div className="h-1.5 w-3/4 rounded-full bg-ink/40" />
                        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-ink/15" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {base === "mobile" && (
            <div className="flex flex-1 items-center justify-center gap-5">
              {[0, 1].map((p) => (
                <div key={p} className="flex h-full max-h-[300px] w-[120px] flex-col gap-2 rounded-[22px] bg-white p-2.5 ring-[3px] ring-ink/80">
                  <div className="mx-auto h-1.5 w-10 rounded-full bg-ink/80" />
                  <div className="mt-1 h-2 w-2/3 rounded-full bg-ink" />
                  <div className={`flex-1 rounded-xl ${p === 0 ? hero : "bg-ink/[0.05]"}`} />
                  {p === 1 &&
                    [0, 1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-md bg-ink/10" />
                        <div className="h-1.5 flex-1 rounded-full bg-ink/15" />
                      </div>
                    ))}
                  <div className="mt-auto grid grid-cols-4 gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`h-1.5 rounded-full ${i === 0 ? "bg-ink" : "bg-ink/15"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {base === "landing" && (
            <>
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-14 rounded-full bg-ink" />
                <div className="flex gap-1.5">
                  {["Product", "Pricing", "Blog"].map((p) => (
                    <span key={p} className="rounded-full bg-ink/[0.05] px-2 py-0.5 font-mono text-[9px] uppercase text-ink/50">
                      {p}
                    </span>
                  ))}
                  <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[9px] uppercase text-white">Book</span>
                </div>
              </div>
              <div className="mt-2 h-3 w-3/5 rounded-full bg-ink" />
              <div className={`${bar} h-2 w-2/5`} />
              <div className="h-5 w-24 rounded-full bg-ink" />
              <div className={`flex-1 rounded-xl ${hero}`} />
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-10 rounded-lg bg-ink/[0.05]" />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {motionOn && (
          <motion.span
            {...pop}
            className="absolute left-4 top-14 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium shadow-sm"
          >
            <Sparkles className="h-3 w-3 text-accent" /> Motion & WebGL
          </motion.span>
        )}
        {system && (
          <motion.div
            {...pop}
            className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl bg-white p-2 shadow-[0_8px_24px_-10px_rgb(0_0_0/0.3)] ring-1 ring-black/[0.06]"
          >
            {["#0b0b0c", "#8b3dff", "#45e6ff", "#ff6f9c"].map((c) => (
              <span key={c} className="h-5 w-5 rounded-md" style={{ background: c }} />
            ))}
            <span className="px-1 text-sm font-medium">Aa</span>
            <span className="rounded-md bg-ink px-2 py-1 text-[10px] font-semibold uppercase text-white">Button</span>
          </motion.div>
        )}
        {billing && (
          <motion.div
            {...pop}
            className="absolute right-3 top-14 w-40 rounded-xl bg-white p-2.5 shadow-[0_8px_24px_-10px_rgb(0_0_0/0.3)] ring-1 ring-black/[0.06]"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40">Checkout</p>
            <div className="mt-1.5 h-5 rounded-md bg-mist" />
            <div className="mt-1.5 rounded-md bg-ink py-1 text-center text-[10px] font-semibold uppercase text-white">Subscribe</div>
          </motion.div>
        )}
        {demo && (
          <motion.div {...pop} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-30" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-ink" />
            </span>
            <span className="absolute left-6 top-1/2 w-36 -translate-y-1/2 rounded-lg bg-ink px-2.5 py-1.5 text-[10px] text-white">
              Step 1 of 4 · Create a project
            </span>
          </motion.div>
        )}
        {ai && (
          <motion.div
            {...pop}
            className="absolute bottom-3 right-3 w-44 rounded-2xl bg-white p-2.5 shadow-[0_8px_24px_-10px_rgb(0_0_0/0.3)] ring-1 ring-black/[0.06]"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40">Assistant</p>
            <div className="mt-1.5 rounded-xl bg-mist px-2.5 py-1.5 text-[11px] text-ink/70">How can I help?</div>
            <div className="mt-1.5 flex gap-1 px-1" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const choice = "flex cursor-pointer items-center gap-3 rounded-2xl p-4 ring-1 transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent";

export function ScopeBuilder() {
  const [base, setBase] = useState<string>(services[1].id);
  const [picked, setPicked] = useState<string[]>(["Motion & WebGL"]);
  const [support, setSupport] = useState(false);

  const service = services.find((s) => s.id === base)!;
  const chosen = addons.filter((a) => picked.includes(a.name));
  const total = service.price + chosen.reduce((sum, a) => sum + a.price, 0);
  const weeks = [service.weeks[0] + chosen.length, service.weeks[1] + chosen.length];
  const scope = [service.name, ...chosen.map((a) => a.name), ...(support ? ["Retainer"] : [])].join(" + ");
  const toggle = (name: string) => setPicked((p) => (p.includes(name) ? p.filter((n) => n !== name) : [...p, name]));

  return (
    <section id="scope" className="section-pad scroll-mt-24 bg-white">
      <div className="vorq-container">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-accent">Scope builder</p>
            <h2 className="mt-4 text-[clamp(40px,6vw,88px)] leading-[0.98] tracking-[-0.045em]">
              Watch it
              <br />
              take shape.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            Pick a build, add the engineering, and see the product and the price come together.
          </p>
        </Reveal>

        <Reveal>
          <div className="shell grid gap-2 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Controls */}
            <div className="panel px-2.5 py-5 sm:px-5 md:p-8">
              <fieldset>
                <legend className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45">01 · The build</legend>
                <div className="mt-3 grid gap-2">
                  {services.map((s) => {
                    const on = base === s.id;
                    return (
                      <label key={s.id} className={`${choice} ${on ? "bg-ink text-white ring-ink" : "bg-mist ring-transparent hover:ring-line"}`}>
                        <input type="radio" name="base" checked={on} onChange={() => setBase(s.id)} className="sr-only" />
                        <span className={`h-4 w-4 shrink-0 rounded-full ring-2 ${on ? "bg-accent ring-white" : "ring-ink/20"}`} aria-hidden="true" />
                        <span className="flex-1 font-medium">{s.name}</span>
                        <span className={`font-mono text-[13px] ${on ? "text-white/60" : "text-ink/50"}`}>{usd(s.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-7">
                <legend className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45">02 · Add engineering</legend>
                <div className="mt-3 grid gap-2">
                  {addons.map((a) => {
                    const on = picked.includes(a.name);
                    return (
                      <label key={a.name} className={`${choice} ${on ? "bg-accent/[0.07] ring-accent" : "bg-mist ring-transparent hover:ring-line"}`}>
                        <input type="checkbox" checked={on} onChange={() => toggle(a.name)} className="sr-only" />
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-md transition-colors ${on ? "bg-accent text-white" : "bg-white ring-1 ring-line"}`}
                          aria-hidden="true"
                        >
                          {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </span>
                        <span className="flex-1 font-medium">{a.name}</span>
                        <span className="font-mono text-[13px] text-ink/50">+{usd(a.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-7">
                <legend className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45">03 · After launch</legend>
                <label className={`${choice} mt-3 ${support ? "bg-accent/[0.07] ring-accent" : "bg-mist ring-transparent hover:ring-line"}`}>
                  <input type="checkbox" checked={support} onChange={() => setSupport(!support)} className="sr-only" />
                  <span className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${support ? "bg-accent" : "bg-ink/15"}`} aria-hidden="true">
                    <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${support ? "translate-x-5" : "translate-x-1"}`} />
                  </span>
                  <span className="flex-1 font-medium">{retainer.name}</span>
                  <span className="font-mono text-[13px] text-ink/50">+{usd(retainer.price)}/mo</span>
                </label>
              </fieldset>
            </div>

            {/* Live preview and the quote */}
            <div className="flex flex-col gap-2">
              <div className="panel p-2">
                <Blueprint base={base} picked={picked} support={support} />
              </div>
              <div className="panel-ink flex-1 px-3 py-6 sm:px-6 md:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/45">Estimate</p>
                    <p className="mt-3 text-[clamp(44px,4.6vw,64px)] leading-none tracking-[-0.05em]" aria-live="polite">
                      <Money value={total} />
                    </p>
                    <p className="mt-2 text-sm text-white/50">
                      {weeks[0]}–{weeks[1]} weeks
                      {support && <span className="text-accent-soft"> · then {usd(retainer.price)}/mo</span>}
                    </p>
                  </div>
                  <Link href={`/book?scope=${encodeURIComponent(scope)}&est=${total}`} className="btn btn-white btn-sm hidden shrink-0 sm:inline-flex">
                    Book a call
                  </Link>
                </div>

                <ul className="mt-6 font-mono text-[13px]">
                  <AnimatePresence initial={false}>
                    {[{ name: service.name, price: service.price }, ...chosen].map((line) => (
                      <motion.li
                        key={line.name}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <span className="flex justify-between border-t border-white/10 py-2.5 text-white/70">
                          <span>{line.name}</span>
                          <span>{usd(line.price)}</span>
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <Link href={`/book?scope=${encodeURIComponent(scope)}&est=${total}`} className="btn btn-white mt-4 w-full sm:hidden">
                  Book a call about this
                </Link>
                <p className="mt-4 text-sm leading-relaxed text-white/40">
                  An estimate, not an invoice. The final price depends on your requirements and complexity, and you
                  get a fixed quote within 24 hours of the call.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
