"use client";

import { useSyncExternalStore } from "react";

const indiaTime = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
const everyMinute = (cb: () => void) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};

/** Studio local time; renders nothing on the server so hydration never disagrees. */
export function StudioClock() {
  const time = useSyncExternalStore(everyMinute, () => indiaTime.format(new Date()), () => null);
  if (!time) return null;
  return (
    <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45">
      India · <span className="tabular-nums text-ink/70">{time}</span> IST
    </span>
  );
}
