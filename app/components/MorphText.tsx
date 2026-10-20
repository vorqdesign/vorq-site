"use client";

import { useEffect, useId, useRef } from "react";

const MORPH = 1.1; // seconds a word takes to melt into the next
const HOLD = 2; // seconds each word rests

/**
 * Words that melt into each other. Two stacked spans cross-fade through blur, and an
 * SVG threshold filter hardens the overlap into one liquid shape while they melt.
 * `words` and `colors` must be stable references.
 */
export function MorphText({
  words,
  colors,
  className = "",
}: {
  words: readonly string[];
  /** Optional colour per word, matched by index. */
  colors?: readonly string[];
  className?: string;
}) {
  const filterId = useId().replace(/:/g, "");
  const wrap = useRef<HTMLSpanElement>(null);
  const outgoing = useRef<HTMLSpanElement>(null);
  const incoming = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const a = outgoing.current;
    const b = incoming.current;
    const w = wrap.current;
    if (!a || !b || !w) return;

    const show = (el: HTMLSpanElement, i: number) => {
      el.textContent = words[i];
      if (colors) el.style.color = colors[i % colors.length];
    };
    show(a, 0);
    show(b, 1 % words.length);

    // Reduced motion: swap whole words, no melting.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      b.style.opacity = "0";
      let index = 0;
      const id = setInterval(() => {
        index = (index + 1) % words.length;
        show(a, index);
      }, (MORPH + HOLD) * 1000);
      return () => clearInterval(id);
    }

    // The threshold filter only runs mid-melt, so resting words stay crisp.
    const liquid = (on: boolean) => {
      w.style.filter = on ? `url(#${filterId}) blur(0.6px)` : "none";
    };
    const blur = (f: number) => (f <= 0 ? 100 : Math.min(8 / f - 8, 100));
    const paint = (fraction: number) => {
      b.style.filter = `blur(${blur(fraction)}px)`;
      b.style.opacity = `${Math.pow(fraction, 0.4)}`;
      a.style.filter = `blur(${blur(1 - fraction)}px)`;
      a.style.opacity = `${Math.pow(1 - fraction, 0.4)}`;
    };
    paint(0);

    // Driven by the clock, not by counting frames, so a throttled tab never stalls it.
    const cycle = HOLD + MORPH;
    const start = performance.now();
    let shown = 0;
    let melting = false;
    let frame = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const t = (now - start) / 1000;
      const current = Math.floor(t / cycle) % words.length;
      const within = t % cycle;

      if (current !== shown) {
        shown = current;
        show(a, current);
        show(b, (current + 1) % words.length);
      }
      if (within < HOLD) {
        if (melting) {
          melting = false;
          paint(0);
          liquid(false);
        }
        return;
      }
      if (!melting) {
        melting = true;
        liquid(true);
      }
      paint(Math.min(1, (within - HOLD) / MORPH));
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [words, colors, filterId]);

  return (
    <span className={`relative block ${className}`} aria-hidden="true">
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id={filterId}>
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
      <span ref={wrap} className="absolute inset-0">
        <span ref={outgoing} className="absolute inset-0 flex items-center whitespace-nowrap" />
        <span ref={incoming} className="absolute inset-0 flex items-center whitespace-nowrap" />
      </span>
    </span>
  );
}
