"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "../content";
import { morphDistance } from "./logoMorph";
import { StudioClock } from "./StudioClock";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * `overHero` (home page only): the nav starts invisible while the big 3D wordmark owns the hero,
 * fades in as that wordmark travels up, and its own logo appears the moment the wordmark lands.
 */
export default function VorqNav({ overHero = false }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(overHero ? 0 : 1);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const d = overHero ? morphDistance() : 0;
      setProgress(overHero ? clamp01(y / d) : 1);
      setScrolled(y > 8);
      // On the home page, give the freshly landed logo a moment before hide-on-scroll kicks in.
      setHidden(y > d + (overHero ? 600 : 120) && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overHero]);

  const docked = progress >= 1 || open;
  const reveal = open ? 1 : clamp01((progress - 0.7) / 0.3);
  const logoIn = open ? 1 : clamp01((progress - 0.94) / 0.06);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-300 ease-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        !docked ? "bg-transparent" : scrolled || open ? "bg-white/85 backdrop-blur-xl shadow-[0_1px_0_rgb(0_0_0/0.06)]" : "bg-white"
      }`}
    >
      <div className="vorq-container flex h-[72px] md:h-[88px] items-center justify-between gap-8">
        <Link
          id="nav-logo"
          href="/"
          style={{ opacity: logoIn }}
          className="font-wordmark text-[28px] md:text-[34px] leading-none"
          aria-label="VORQ home"
        >
          VORQ
        </Link>

        <nav
          style={{ opacity: reveal }}
          className={`hidden lg:flex items-center gap-9 ${reveal < 0.5 ? "pointer-events-none" : ""}`}
          aria-label="Main"
        >
          {nav.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink/70 hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ opacity: reveal }} className={`flex items-center gap-3 ${reveal < 0.5 ? "pointer-events-none" : ""}`}>
          <Link href="/book" className="btn btn-dark btn-sm hidden sm:inline-flex">
            Book a call
          </Link>
          <button
            className="lg:hidden -mr-2 grid h-11 w-11 place-items-center"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-[2px] w-6 bg-ink transition-transform duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-[2px] w-6 bg-ink transition-transform duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-x-0 top-[72px] md:top-[88px] h-[calc(100dvh-72px)] md:h-[calc(100dvh-88px)] overflow-y-auto bg-white"
          >
            <div className="vorq-container flex min-h-full flex-col gap-3 pb-8 pt-2">
              <nav aria-label="Mobile" className="shell">
                <ul className="panel px-1.5 py-1">
                  {nav.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="border-t border-black/[0.06] first:border-t-0"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors hover:bg-mist"
                      >
                        <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                        <span className="flex-1">
                          <span className="block text-[28px] font-medium leading-none tracking-[-0.03em]">{link.label}</span>
                          <span className="mt-1.5 block text-[13px] text-muted">{link.note}</span>
                        </span>
                        <span className="h-2 w-2 rounded-full bg-ink/10 transition-colors group-hover:bg-accent" aria-hidden="true" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * nav.length, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="shell"
              >
                <div className="panel-ink p-5">
                  <p className="eyebrow text-white/45">Start a project</p>
                  <p className="mt-3 text-[22px] leading-tight tracking-[-0.02em]">Free 30-minute call. A fixed quote within 24 hours.</p>
                  <div className="mt-5 grid gap-2">
                    <Link href="/book" onClick={() => setOpen(false)} className="btn btn-white btn-sm w-full">
                      Book a free call
                    </Link>
                    <Link href="/#scope" onClick={() => setOpen(false)} className="btn btn-ghost-dark btn-sm w-full">
                      Get a price
                    </Link>
                  </div>
                </div>
              </motion.div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-3">
                <a href={`mailto:${site.email}`} className="text-[15px] underline decoration-ink/20 underline-offset-4">
                  {site.email}
                </a>
                <StudioClock />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
