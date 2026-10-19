"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { product, projects, services, site } from "@/lib/content";
import { useLockScroll } from "../useLockScroll";
import styles from "./field.module.css";

type Point = { x: number; y: number };

const layouts = {
  wide: {
    spots: {
      home: { x: 0, y: 0 },
      work: { x: -1220, y: -744 },
      prices: { x: 1040, y: -20 },
      book: { x: 0, y: 860 },
    },
    projects: [
      { x: -1540, y: -888 },
      { x: -1220, y: -888 },
      { x: -900, y: -888 },
      { x: -1380, y: -600 },
    ],
    forge: { x: -1060, y: -600 },
  },
  narrow: {
    spots: {
      home: { x: 0, y: 0 },
      work: { x: 0, y: -760 },
      prices: { x: 0, y: 820 },
      book: { x: 0, y: 1640 },
    },
    projects: [
      { x: 0, y: -760 },
      { x: 0, y: -1360 },
      { x: 0, y: -1960 },
      { x: 0, y: -2560 },
    ],
    forge: { x: 0, y: -3160 },
  },
} as const;

export default function Field() {
  useLockScroll();
  const rootRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cam = useRef<Point>({ x: 0, y: 0 });
  const target = useRef<Point>({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const pointer = useRef({ x: 0.5, y: 0.45 });
  const coordRef = useRef<HTMLSpanElement>(null);
  const layoutRef = useRef<(typeof layouts)[keyof typeof layouts]>(layouts.wide);
  const [mode, setMode] = useState<"wide" | "narrow" | null>(null);
  const [zone, setZone] = useState<keyof (typeof layouts)["wide"]["spots"]>("home");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const world = worldRef.current;
    const root = rootRef.current;
    if (!canvas || !world || !root) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let running = true;

    const paint = (time: number) => {
      if (!running) return;
      if (!drag.current) {
        const k = reduce ? 1 : 0.16;
        cam.current.x += (target.current.x - cam.current.x) * k;
        cam.current.y += (target.current.y - cam.current.y) * k;
      }
      const w = root.clientWidth;
      const h = root.clientHeight;
      world.style.transform = `translate3d(${-cam.current.x}px, ${-cam.current.y}px, 0)`;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const t = reduce ? 0 : time / 1000;
      const px = pointer.current.x;
      const py = pointer.current.y;
      const shift = cam.current.x / 1400;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#07060c";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const reach = Math.max(w, h);
      const blobs = [
        { x: w * (0.28 + px * 0.22), y: h * (0.34 + py * 0.16), c: "176, 96, 255", r: reach * 0.52 },
        { x: w * (0.74 - shift * 0.18), y: h * (0.66 + Math.sin(t * 0.35) * 0.05), c: "48, 130, 255", r: reach * 0.46 },
        { x: w * (0.52 + Math.cos(t * 0.28) * 0.08), y: h * (0.26 + Math.sin(t * 0.22) * 0.04), c: "255, 150, 64", r: reach * 0.34 },
      ];
      for (const blob of blobs) {
        const g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        g.addColorStop(0, `rgba(${blob.c}, 0.95)`);
        g.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "rgba(244, 239, 230, 0.07)";
      ctx.lineWidth = 1;
      const gap = 88;
      const originX = w / 2 - cam.current.x;
      const originY = h / 2 - cam.current.y;
      const x0 = originX - Math.ceil(originX / gap) * gap;
      const y0 = originY - Math.ceil(originY / gap) * gap;
      ctx.beginPath();
      for (let x = x0; x <= w; x += gap) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = y0; y <= h; y += gap) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
      if (coordRef.current) {
        coordRef.current.textContent = `${Math.round(cam.current.x)} , ${Math.round(cam.current.y)}`;
      }
      frame = requestAnimationFrame(paint);
    };
    frame = requestAnimationFrame(paint);

    const applyMode = () => {
      const next = window.innerWidth > 800 ? "wide" : "narrow";
      layoutRef.current = layouts[next];
      setMode(next);
    };
    applyMode();
    window.addEventListener("resize", applyMode);
    const onKey = (event: KeyboardEvent) => {
      const step = event.shiftKey ? 280 : 160;
      if (event.key === "ArrowLeft") target.current = { ...target.current, x: target.current.x - step };
      if (event.key === "ArrowRight") target.current = { ...target.current, x: target.current.x + step };
      if (event.key === "ArrowUp") target.current = { ...target.current, y: target.current.y - step };
      if (event.key === "ArrowDown") target.current = { ...target.current, y: target.current.y + step };
    };
    window.addEventListener("keydown", onKey);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", applyMode);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function jump(name: keyof (typeof layouts)["wide"]["spots"]) {
    target.current = layoutRef.current.spots[name];
    setZone(name);
  }

  const layout = mode ? layouts[mode] : null;

  return (
    <div
      ref={rootRef}
      className={styles.root}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("a,button")) return;
        drag.current = {
          x: event.clientX,
          y: event.clientY,
          cx: cam.current.x,
          cy: cam.current.y,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
        };
        if (!drag.current) return;
        const next = {
          x: drag.current.cx - (event.clientX - drag.current.x),
          y: drag.current.cy - (event.clientY - drag.current.y),
        };
        cam.current = next;
        target.current = next;
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <p className={styles.hint}>
        Drag the field
        <span ref={coordRef}>0 , 0</span>
      </p>
      <div ref={worldRef} className={styles.world}>
        <article className={`${styles.node} ${styles.home}`} style={{ left: 0, top: 0 }}>
          <p className={styles.kicker}>Vorq</p>
          <h1>
            Websites
            <br />
            and MVPs.
          </h1>
          <p>Priyanshu Bhardwaj and Ravi Pratap Singh. The work, the prices, and a way to book are placed in this field.</p>
        </article>

        {layout
          ? projects.map((project, index) => (
          <a
            key={project.href}
            className={`${styles.node} ${styles.card}`}
            style={{ left: layout.projects[index].x, top: layout.projects[index].y }}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.shot}>
              <Image src={project.image} alt={project.alt} fill sizes="340px" />
            </div>
            <h2>{project.title}</h2>
            <p className={styles.meta}>
              {project.kind} · {project.timeline}
            </p>
          </a>
        ))
          : null}

        {layout ? (
        <a
          className={`${styles.node} ${styles.card}`}
          style={{ left: layout.forge.x, top: layout.forge.y }}
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>{product.name}</h2>
          <p>{product.headline}</p>
        </a>
        ) : null}

        {layout ? (
        <section className={`${styles.node} ${styles.price}`} style={{ left: layout.spots.prices.x, top: layout.spots.prices.y }} aria-label="Prices">
          <p className={styles.kicker}>Prices</p>
          <h2>Published ranges</h2>
          <ul>
            {services.map((service) => (
              <li className={styles.row} key={service.id}>
                <span>{service.name}</span>
                <span>{service.price}</span>
              </li>
            ))}
          </ul>
          <p>Fixed scope. You own the code.</p>
        </section>
        ) : null}

        {layout ? (
        <div className={`${styles.node} ${styles.book}`} style={{ left: layout.spots.book.x, top: layout.spots.book.y }}>
          <p className={styles.kicker}>Start</p>
          <h2>Book a call</h2>
          <p>Tell us the work, the deadline, and the budget. A fixed price comes back within 24 hours.</p>
          <p>
            <Link href={site.bookPath}>Open the calendar</Link>
            {" · "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        ) : null}
      </div>

      <div className={styles.compass} role="toolbar" aria-label="Move through the field">
        {(Object.keys(layouts.wide.spots) as (keyof (typeof layouts)["wide"]["spots"])[]).map((name) => (
          <button key={name} type="button" data-on={zone === name} onClick={() => jump(name)}>
            {name === "home" ? "Vorq" : name[0].toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
