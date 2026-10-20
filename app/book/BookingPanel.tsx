"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Clock, Video, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { StudioClock } from "../components/StudioClock";
import { site, usd } from "../content";

const expect = [
  { title: "Pick a time", body: "30 minutes, free, on a video call. Times show in your time zone." },
  { title: "Tell us the project", body: "What you need, the deadline and the budget. No long forms." },
  { title: "Get a fixed quote", body: "A fixed scope and a fixed price within 24 hours of the call." },
];

const next = [
  { title: "Check your inbox", body: "The invite and a calendar link are on their way." },
  { title: "We read your brief", body: "We look at your scope before the call, so it starts with answers." },
  { title: "Your quote, in 24 hours", body: "A fixed scope and a fixed price, within a day of talking." },
];

const perks = ["Same-day response", "Fixed price within 24 hours", "Built from scratch", "You own the code"];

/** A month of empty days shown while Calendly loads, so the frame never flashes blank. */
function CalendarSkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col gap-6 p-6 md:p-10" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="h-4 w-36 animate-pulse rounded-full bg-ink/10" />
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-full bg-ink/[0.06]" />
          <div className="h-8 w-8 rounded-full bg-ink/[0.06]" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }, (_, i) => (
          <div
            key={i}
            className={`aspect-square animate-pulse rounded-full ${i % 7 > 0 && i % 7 < 6 && i > 7 && i < 30 ? "bg-accent/10" : "bg-ink/[0.04]"}`}
            style={{ animationDelay: `${(i % 7) * 60}ms` }}
          />
        ))}
      </div>
      <div className="mt-auto flex justify-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">Loading the calendar</span>
      </div>
    </div>
  );
}

export function BookingPanel({ calendly, scope, estimate }: { calendly: string; scope?: string; estimate?: number }) {
  const [loaded, setLoaded] = useState(false);
  const [booked, setBooked] = useState(false);

  // Calendly reports its progress with postMessage.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com" || typeof e.data?.event !== "string") return;
      if (e.data.event === "calendly.event_type_viewed") setLoaded(true);
      if (e.data.event === "calendly.event_scheduled") setBooked(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const steps = booked ? next : expect;

  return (
    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
      {/* The embed comes first on phones, where the calendar is the point. */}
      <div className="order-1 lg:order-2">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-3 pt-1.5">
            <div className="flex flex-wrap items-center gap-2 text-[13px] text-ink/70">
              {[
                { Icon: Clock, label: "30 min" },
                { Icon: Video, label: "Video call" },
                { Icon: Wallet, label: "Free" },
              ].map(({ Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-black/[0.05]">
                  <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>
            <StudioClock />
          </div>
          <div className="panel relative min-h-[700px] overflow-hidden">
            <AnimatePresence>
              {!loaded && (
                <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 z-0">
                  <CalendarSkeleton />
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className="calendly-inline-widget relative z-10 w-full"
              data-url={calendly}
              data-resize="true"
              style={{ minWidth: 320, height: 700 }}
            />
          </div>
        </div>
      </div>

      <div className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
        {scope && (
          <div className="shell mb-4">
            <div className="panel flex items-start justify-between gap-4 px-2.5 py-5 sm:px-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">Your scope</p>
                <p className="mt-2 text-lg font-medium leading-snug">{scope}</p>
                {estimate ? <p className="mt-1 text-muted">Estimate from {usd(estimate)}</p> : null}
              </div>
              <Link href="/#scope" className="shrink-0 text-[14px] underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
                Edit
              </Link>
            </div>
          </div>
        )}

        <div className="shell">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={booked ? "next" : "expect"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="panel px-3 py-6 sm:px-6 md:p-7"
            >
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">
                {booked && (
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-[#0b7a45] text-white">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                )}
                {booked ? "You're booked" : "What to expect"}
              </p>
              <ol className="mt-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4 border-t border-black/[0.06] py-4 first:border-t-0 first:pt-0">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist font-mono text-[11px] text-ink/60">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block font-medium tracking-[-0.01em]">{s.title}</span>
                      <span className="mt-0.5 block text-[15px] leading-relaxed text-muted">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
          <ul className="well mt-2 grid gap-2.5 px-2.5 sm:px-5 py-4 text-[14px] text-ink/70 sm:grid-cols-2">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-accent">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 px-1 text-muted">
          Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
            {site.email}
          </a>
        </p>
      </div>
    </div>
  );
}
