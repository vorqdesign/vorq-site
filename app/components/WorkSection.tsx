"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projects, type Project } from "../content";
import { Reveal } from "./Motion";

function WorkCard({ p, priority }: { p: Project; priority: boolean }) {
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const domain = new URL(p.href).hostname.replace(/^www\./, "");

  return (
    <a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      className="group block"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <div
        className="shell relative overflow-hidden md:cursor-none"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
      >
        <div className="flex items-center gap-3 px-2 pb-2 pt-1 md:pb-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
          </span>
          <span className="mx-auto rounded-full bg-white px-4 py-1 font-mono text-[11px] text-ink/50">{domain}</span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-white">
          <Image
            src={p.image}
            alt={`${p.title} homepage`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <motion.span
          aria-hidden="true"
          style={{ x: sx, y: sy }}
          animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-0 top-0 -ml-12 -mt-12 hidden h-24 w-24 place-items-center rounded-full bg-accent text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white md:grid"
        >
          Visit site
        </motion.span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-2xl font-medium tracking-[-0.02em] md:text-[32px] md:leading-tight">
            {p.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </h3>
          <p className="mt-1.5 text-muted">{p.summary}</p>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ink/45">
            {p.kind} · {p.tools.join(" · ")}
          </p>
        </div>
        <span className="mt-1 shrink-0 rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium text-white">
          Live in {p.timeline}
        </span>
      </div>
    </a>
  );
}

export function WorkSection() {
  if (!projects.length) return null;

  return (
    <section id="work" className="section-pad scroll-mt-24 bg-white">
      <div className="vorq-container">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-accent">Selected work</p>
            <h2 className="mt-4 text-[clamp(40px,6vw,88px)] leading-[0.98] tracking-[-0.045em]">
              Recent
              <br />
              launches.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.12}>
              <WorkCard p={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
