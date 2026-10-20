"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { heroKeywords } from "../content";
import { MorphText } from "./MorphText";
import { StudioClock } from "./StudioClock";
import { morphDistance, WORD_SPAN } from "./logoMorph";
import { materials, type Material } from "./Wordmark3D";

// three.js only loads in the browser, after the page is interactive.
const Wordmark3D = dynamic(() => import("./Wordmark3D"), { ssr: false });

const labels = heroKeywords.map((k) => k.label);
const keywordColors = heroKeywords.map((k) => k.color);
const ease = [0.22, 1, 0.36, 1] as const;

const logos = [
  { src: "/next.svg", alt: "Next.js", className: "w-14 md:w-[68px]" },
  { src: "/motion.svg", alt: "Motion", className: "w-10 md:w-12" },
  { src: "/gsap.svg", alt: "GSAP", className: "w-10 md:w-12" },
];

function Logo({ i }: { i: number }) {
  const l = logos[i];
  return (
    <span className="mx-1 inline-flex -translate-y-[2px] items-center align-middle">
      <Image src={l.src} alt={l.alt} width={100} height={20} className={`${l.className} h-auto`} />
    </span>
  );
}

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  };
}

type Geo = { cx: number; cy: number; w: number; h: number; nx: number; ny: number; nw: number; d: number };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * The 3D wordmark lives in a fixed layer. At the top it sits exactly over the hero stage;
 * as the page scrolls it shrinks and glides into the navbar's logo slot, then hands over
 * to the flat nav logo and stops rendering.
 */
type Telemetry = { current: { x: number; y: number } };

function MorphingWordmark({
  geo,
  onReady,
  material,
  telemetryRef,
}: {
  geo: Geo;
  onReady: () => void;
  material: Material;
  telemetryRef: Telemetry;
}) {
  const { scrollY } = useScroll();
  const pausedRef = useRef(false);
  // Position eases in and out; scale leads, so the word shrinks before it reaches the top edge.
  const k = useTransform(scrollY, (y) => easeInOut(clamp01(y / geo.d)));
  const x = useTransform(() => lerp(geo.cx, geo.nx, k.get()) - geo.w / 2);
  const y = useTransform(() => lerp(geo.cy - scrollY.get(), geo.ny, k.get()) - geo.h / 2);
  const scale = useTransform(scrollY, (v) => lerp(1, geo.nw / (geo.w * WORD_SPAN), easeOut(clamp01(v / geo.d))));
  const opacity = useTransform(scrollY, [geo.d * 0.94, geo.d], [1, 0]);
  useMotionValueEvent(scrollY, "change", (v) => (pausedRef.current = v >= geo.d));

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, scale, opacity, width: geo.w, height: geo.h }}
      className="pointer-events-none fixed left-0 top-0 z-[55]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0"
      >
        <Wordmark3D onReady={onReady} pausedRef={pausedRef} material={material} telemetryRef={telemetryRef} />
      </motion.div>
    </motion.div>
  );
}

// Selection handles: where each sits on the artboard edge, and how far to pull it onto the line.
const handles = [
  ["left-0 top-0", "-50%, -50%"],
  ["left-1/2 top-0", "-50%, -50%"],
  ["right-0 top-0", "50%, -50%"],
  ["left-0 top-1/2", "-50%, -50%"],
  ["right-0 top-1/2", "50%, -50%"],
  ["bottom-0 left-0", "-50%, 50%"],
  ["bottom-0 left-1/2", "-50%, 50%"],
  ["bottom-0 right-0", "50%, 50%"],
] as const;

const deg = (rad: number) => `${((rad * 180) / Math.PI).toFixed(1)}°`;

/** A design-tool inspector for the live wordmark: real rotation readouts, a material switch, the code. */
function Inspector({
  material,
  setMaterial,
  telemetryRef,
  size,
}: {
  material: Material;
  setMaterial: (m: Material) => void;
  telemetryRef: Telemetry;
  size: string;
}) {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      if (xRef.current) xRef.current.textContent = deg(telemetryRef.current.x);
      if (yRef.current) yRef.current.textContent = deg(telemetryRef.current.y);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [telemetryRef]);

  const row = "flex items-center justify-between gap-3 border-t border-black/[0.06] py-2.5";
  return (
    <div className="panel flex h-full flex-col p-4 text-[13px]">
      <div className="flex items-center justify-between pb-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">Inspector</span>
        <StudioClock />
      </div>
      <div className={row}>
        <span className="text-ink/50">Layer</span>
        <span className="font-mono text-[12px]">Wordmark3D</span>
      </div>
      <div className={row}>
        <span className="text-ink/50">Material</span>
        <span className="flex rounded-full bg-mist p-0.5" role="radiogroup" aria-label="Wordmark material">
          {(Object.keys(materials) as Material[]).map((m) => (
            <button
              key={m}
              role="radio"
              aria-checked={material === m}
              onClick={() => setMaterial(m)}
              className={`rounded-full px-2.5 py-1 text-[12px] transition-colors ${
                material === m ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
              }`}
            >
              {m}
            </button>
          ))}
        </span>
      </div>
      <div className={row}>
        <span className="text-ink/50">Rotate X</span>
        <span ref={xRef} className="font-mono text-[12px] tabular-nums">
          0.0°
        </span>
      </div>
      <div className={row}>
        <span className="text-ink/50">Rotate Y</span>
        <span ref={yRef} className="font-mono text-[12px] tabular-nums">
          0.0°
        </span>
      </div>
      <div className={row}>
        <span className="text-ink/50">Size</span>
        <span className="font-mono text-[12px] tabular-nums">{size}</span>
      </div>
      <pre className="mt-auto overflow-hidden rounded-xl bg-ink p-3 font-mono text-[11px] leading-relaxed text-white/75">
        <code>
          <span className="text-white/40">{"<"}</span>Wordmark3D{"\n"}
          {"  "}material=<span className="text-white">&quot;{material.toLowerCase()}&quot;</span>
          {"\n"}
          {"  "}follow=<span className="text-white">&quot;cursor&quot;</span>
          {"\n"}
          <span className="text-white/40">{"/>"}</span>
        </code>
      </pre>
    </div>
  );
}

export function VorqHero() {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const artboardRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [material, setMaterial] = useState<Material>("Iris");
  const telemetryRef = useRef({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const shadow = useTransform(scrollY, (v) => 1 - clamp01(v / (geo?.d ?? 1)));

  useEffect(() => {
    const measure = () => {
      const board = artboardRef.current;
      const logo = document.getElementById("nav-logo");
      if (!board || !logo) return;
      const r = board.getBoundingClientRect();
      // The nav is fixed at the top-left, so offsets inside it are viewport coordinates.
      setGeo({
        cx: r.left + r.width / 2,
        cy: r.top + window.scrollY + r.height / 2,
        w: r.width,
        h: r.height,
        nx: logo.offsetLeft + logo.offsetWidth / 2,
        ny: logo.offsetTop + logo.offsetHeight / 2,
        nw: logo.offsetWidth,
        d: morphDistance(),
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const corner = "absolute h-4 w-4 border-ink/25";

  return (
    <section className="section-pad relative overflow-hidden bg-white pt-5 md:pt-6">
      <div className="vorq-container">
        {/*
          The stage: a hatched frame with crop marks and spec labels, holding the wordmark's place.
          The flat word shows until the 3D one is live; the frame fades as the word lifts into the nav.
        */}
        <div className="relative aspect-[1.4/1] sm:aspect-[2.2/1] lg:aspect-[3/1]">
          <motion.div aria-hidden="true" style={{ opacity: shadow }} className="absolute inset-0">
            <div className="hatch absolute inset-0 rounded-[32px]" />
            <span className={`${corner} left-4 top-4 border-l border-t`} />
            <span className={`${corner} right-4 top-4 border-r border-t`} />
            <span className={`${corner} bottom-4 left-4 border-b border-l`} />
            <span className={`${corner} bottom-4 right-4 border-b border-r`} />
            <div className="absolute bottom-[10%] left-1/2 h-[10%] w-[56%] -translate-x-1/2 rounded-[50%] bg-black/10 blur-2xl" />
          </motion.div>

          <motion.div style={{ opacity: shadow }} className="absolute inset-0 flex flex-col justify-between p-6 md:p-9">
            <div className="flex items-start justify-between gap-4">
              <p className="flex items-center gap-2.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] text-ink/70 ring-1 ring-black/[0.05] md:text-[13px]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Independent design engineering studio
              </p>
              <span className="hidden pt-1.5 sm:block lg:hidden">
                <StudioClock />
              </span>
            </div>
            <div
              className="flex items-end justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45 lg:pr-[300px]"
              aria-hidden="true"
            >
              <span className="hidden sm:block">Web · Mobile · Tools</span>
              <span className="ml-auto flex items-center gap-3">
                Scroll
                <span className="relative h-px w-10 overflow-hidden bg-ink/15">
                  <span className="absolute inset-y-0 left-0 w-1/2 animate-[scrollhint_1.8s_ease-in-out_infinite] bg-ink" />
                </span>
              </span>
            </div>
          </motion.div>

          {/* The artboard the wordmark sits on, selected the way it would be in a design tool. */}
          <div
            ref={artboardRef}
            className="absolute bottom-12 left-4 right-4 top-16 md:bottom-[92px] md:left-9 md:right-9 md:top-[76px] lg:right-[332px]"
          >
            <motion.div style={{ opacity: shadow }} className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
              <div className="absolute inset-0 border border-ink/30" />
              {handles.map(([pos, shift]) => (
                <span
                  key={pos}
                  className={`absolute ${pos} h-[7px] w-[7px] border border-ink/60 bg-white`}
                  style={{ transform: `translate(${shift})` }}
                />
              ))}
              <span className="absolute -top-6 right-0 rounded-[4px] bg-ink px-1.5 py-0.5 font-mono text-[10px] text-white">Wordmark3D</span>
              {geo && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-[4px] bg-ink px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-white">
                  {Math.round(geo.w)} × {Math.round(geo.h)}
                </span>
              )}
            </motion.div>
            <p
              aria-hidden="true"
              className={`absolute inset-0 grid place-items-center font-wordmark text-[15vw] leading-none transition-opacity duration-700 lg:text-[13.5vw] 2xl:text-[195px] ${
                ready ? "opacity-0" : "opacity-100"
              }`}
            >
              VORQ
            </p>
          </div>

          <motion.div style={{ opacity: shadow }} className="absolute bottom-6 right-6 top-6 hidden w-[284px] lg:block">
            <Inspector
              material={material}
              setMaterial={setMaterial}
              telemetryRef={telemetryRef}
              size={geo ? `${Math.round(geo.w)} × ${Math.round(geo.h)}` : "—"}
            />
          </motion.div>
        </div>
        {geo && <MorphingWordmark geo={geo} onReady={onReady} material={material} telemetryRef={telemetryRef} />}

        <div className="mt-10 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
          <h1 className="text-[clamp(38px,5vw,76px)] font-normal leading-[1] tracking-[-0.045em]">
            <span className="sr-only">We design and build {labels.join(", ")} that actually convert.</span>
            <motion.span {...rise(0.3)} aria-hidden="true" className="block">
              We design &amp; build
            </motion.span>
            <motion.span {...rise(0.4)} aria-hidden="true" className="my-[0.08em] block">
              <MorphText words={labels} colors={keywordColors} className="h-[1.2em] font-quirk tracking-normal" />
            </motion.span>
            <motion.span {...rise(0.5)} aria-hidden="true" className="block">
              that actually convert.
            </motion.span>
          </h1>

          {/* The pitch, set like a pricing card: the offer on a panel, the promises in the well. */}
          <motion.div {...rise(0.6)} className="shell self-start">
            <div className="panel p-6 md:p-7">
              <p className="text-[17px] leading-[1.75] text-muted">
                Design engineering for ambitious founders. We design in code and ship custom <Logo i={0} /> builds with
                production-grade motion in <Logo i={1} /> and <Logo i={2} />.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-12 sm:flex-row">
                <div className="relative w-full sm:w-auto">
                  <Link href="/book" className="btn btn-dark w-full sm:w-auto">
                    Book a call
                  </Link>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-8 right-2 hidden -rotate-6 font-hand text-[24px] leading-none text-[#ff4f8b] sm:block"
                  >
                    It&apos;s free!
                  </span>
                </div>
                <Link href="/#scope" className="btn btn-outline w-full sm:w-auto">
                  Get a price
                </Link>
              </div>
            </div>
            <ul className="well mt-2 grid grid-cols-1 gap-x-4 gap-y-2.5 px-5 py-4 text-[14px] text-ink/70 sm:grid-cols-2">
              {["Fixed-price projects", "Quote in 24 hours", "Live preview, day one", "You own the code"].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-ink">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
