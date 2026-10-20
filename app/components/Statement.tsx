"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { pillars, statement } from "../content";
import { Reveal } from "./Motion";

const words = statement.split(" ");

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block pr-[0.25em]">
      {word}
    </motion.span>
  );
}

/** Remembered: a pill that leans toward the pointer on a spring. */
function MagneticDemo() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14 });
  const sy = useSpring(y, { stiffness: 220, damping: 14 });
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.span
        style={{ x: sx, y: sy }}
        className="rounded-full bg-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_30px_-10px_rgb(139_61_255/0.7)]"
      >
        Move your cursor
      </motion.span>
    </div>
  );
}

/** Fast: a page that resolves from skeleton to content in a blink, on a loop. */
function LoadDemo() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setLoaded((v) => !v), loaded ? 2600 : 900);
    return () => clearTimeout(id);
  }, [loaded]);
  const block = "rounded-md transition-colors duration-300";
  return (
    <div className="absolute inset-0 flex flex-col gap-2.5 p-5">
      <div className="h-1 overflow-hidden rounded-full bg-ink/5">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={false}
          animate={{ width: loaded ? "100%" : "0%" }}
          transition={{ duration: loaded ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className={`${block} mt-1 h-3 w-2/3 ${loaded ? "bg-ink" : "bg-ink/10"}`} />
      <div className={`${block} h-3 w-1/2 ${loaded ? "bg-ink/40" : "bg-ink/10"}`} />
      <div className={`${block} mt-1 flex-1 ${loaded ? "bg-accent" : "bg-ink/10"}`} />
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">{loaded ? "Loaded" : "Loading"}</p>
    </div>
  );
}

/** Converts: a cursor finds the one main button and a call gets booked. */
function ConvertDemo() {
  const loop = { duration: 3.4, repeat: Infinity, ease: "easeInOut" as const };
  return (
    <div className="absolute inset-0 p-5">
      <div className="h-3 w-3/4 rounded-md bg-ink" />
      <div className="mt-2.5 h-3 w-1/2 rounded-md bg-ink/30" />
      <motion.div
        animate={{ scale: [1, 1, 0.92, 1, 1] }}
        transition={{ ...loop, times: [0, 0.48, 0.55, 0.62, 1] }}
        className="mt-5 inline-flex rounded-full bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
      >
        Book a call
      </motion.div>
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute left-0 top-0 h-6 w-6 drop-shadow"
        animate={{ x: [230, 230, 64, 64, 230], y: [120, 120, 82, 82, 120] }}
        transition={{ ...loop, times: [0, 0.15, 0.48, 0.75, 1] }}
        aria-hidden="true"
      >
        <path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#0b0b0c" strokeWidth="1.5" strokeLinejoin="round" />
      </motion.svg>
      <motion.div
        animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 8] }}
        transition={{ ...loop, times: [0, 0.56, 0.62, 0.9, 1] }}
        className="absolute bottom-5 right-5 rounded-full bg-[#e8f8ef] px-3 py-1.5 text-[12px] font-medium text-[#0b7a45]"
      >
        Call booked
      </motion.div>
    </div>
  );
}

const demos = [MagneticDemo, LoadDemo, ConvertDemo];

/** The promise, lit word by word on scroll, then backed by three live demos. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });

  return (
    <section className="section-pad bg-white">
      <div className="vorq-container">
        <p className="eyebrow text-accent">Why it matters</p>
        <p
          ref={ref}
          className="mt-5 max-w-5xl text-[clamp(30px,4vw,60px)] font-normal leading-[1.08] tracking-[-0.04em]"
        >
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Demo = demos[i];
            return (
              <Reveal key={p.title} delay={i * 0.08} className="h-full">
                <div className="shell flex h-full flex-col">
                  <div className="panel p-2">
                    <div className="relative h-48 overflow-hidden rounded-2xl bg-mist/60">
                      <Demo />
                    </div>
                    <div className="flex items-center justify-between px-4 pb-3 pt-5">
                      <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-[28px]">{p.title}</h3>
                      <span className="font-mono text-[12px] text-ink/40">0{i + 1}</span>
                    </div>
                  </div>
                  <p className="well mt-2 flex-1 px-5 py-5 text-[15px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
