"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CalendarPlus, Check, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { booking } from "./config";
import { site } from "../../../app/content";
import { openSlots, slotEnd } from "./availability";
import { googleCalendarUrl, icsFile, type Invite } from "./invite";

// The current minute, client-only: the server renders a placeholder so hydration never disagrees.
const everyMinute = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};
const useMinute = () => useSyncExternalStore(everyMinute, () => Math.floor(Date.now() / 60_000) * 60_000, () => null);

const dayKey = (d: Date, timeZone: string) => new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
const fmt = (d: Date, timeZone: string, o: Intl.DateTimeFormatOptions) => d.toLocaleString("en-US", { timeZone, ...o });
const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ease = [0.22, 1, 0.36, 1] as const;
const step = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.3, ease } };

type Stage = "pick" | "details" | "done" | "email";

export function Scheduler({ scope, onBooked }: { scope?: string; onBooked: () => void }) {
  const minute = useMinute();
  const timeZone = useMemo(() => (minute ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC"), [minute]);
  const slots = useMemo(() => (minute ? openSlots(new Date(minute), booking) : []), [minute]);

  // Slots grouped by the visitor's own calendar day.
  const byDay = useMemo(() => {
    const map = new Map<string, Date[]>();
    for (const s of slots) {
      const k = dayKey(s, timeZone);
      map.set(k, [...(map.get(k) ?? []), s]);
    }
    return map;
  }, [slots, timeZone]);

  const firstDay = byDay.keys().next().value as string | undefined;
  const [picked, setPicked] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null); // "YYYY-MM"
  const [slot, setSlot] = useState<Date | null>(null);
  const [stage, setStage] = useState<Stage>("pick");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const day = picked ?? firstDay ?? null;
  const shownMonth = month ?? (day ? day.slice(0, 7) : null);

  if (!minute || !shownMonth) {
    return (
      <div className="grid min-h-[520px] place-items-center p-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">Loading times</span>
      </div>
    );
  }

  // Month grid, Monday first.
  const [y, m] = shownMonth.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => `${shownMonth}-${String(i + 1).padStart(2, "0")}`)];
  const monthLabel = first.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  const shift = (n: number) => {
    const d = new Date(Date.UTC(y, m - 1 + n, 1));
    setMonth(d.toISOString().slice(0, 7));
  };
  const months = [...byDay.keys()].map((k) => k.slice(0, 7));
  const canPrev = months[0] < shownMonth;
  const canNext = months[months.length - 1] > shownMonth;

  const invite = (s: Date): Invite => ({
    start: s,
    end: slotEnd(s, booking),
    title: "VORQ intro call",
    details: `30-minute call with VORQ.\n${booking.meetingUrl ? `Join: ${booking.meetingUrl}` : "We'll email the video link before the call."}${scope ? `\nScope: ${scope}` : ""}`,
    organizer: site.email,
    location: booking.meetingUrl || undefined,
  });
  const istTime = (s: Date) => fmt(s, "Asia/Kolkata", { hour: "numeric", minute: "2-digit" });
  const localTime = (s: Date) => fmt(s, timeZone, { hour: "numeric", minute: "2-digit" });
  const offset = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(new Date(minute))
    .find((p) => p.type === "timeZoneName")?.value;
  const localLong = (s: Date) => fmt(s, timeZone, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });

  async function submit(form: HTMLFormElement) {
    if (!slot) return;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slot: slot.toISOString(), timeZone }),
      });
      if (res.ok) {
        setStage("done");
        onBooked();
      } else if (res.status === 503) {
        setStage("email"); // email isn't set up yet: hand over a ready-to-send email instead
      } else {
        setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Couldn't reach us. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {stage === "pick" && (
        <motion.div key="pick" {...step} className="grid gap-6 p-5 md:grid-cols-[1.15fr_1fr] md:p-8">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium tracking-[-0.02em]">{monthLabel}</p>
              <div className="flex gap-1.5">
                <button onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous month" className="grid h-9 w-9 place-items-center rounded-full bg-mist transition-colors hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-mist disabled:hover:text-ink">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => shift(1)} disabled={!canNext} aria-label="Next month" className="grid h-9 w-9 place-items-center rounded-full bg-mist transition-colors hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-mist disabled:hover:text-ink">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">
              {WEEK.map((w) => (
                <span key={w} className="pb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40">
                  {w}
                </span>
              ))}
              {cells.map((c, i) => {
                if (!c) return <span key={`blank-${i}`} />;
                const open = byDay.has(c);
                const on = c === day;
                return (
                  <button
                    key={c}
                    disabled={!open}
                    onClick={() => {
                      setPicked(c);
                      setSlot(null);
                    }}
                    aria-pressed={on}
                    aria-label={new Date(`${c}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" })}
                    className={`relative aspect-square rounded-full text-[15px] transition-colors ${
                      on ? "bg-accent text-white" : open ? "bg-accent/[0.08] font-medium text-accent hover:bg-accent/20" : "text-ink/25"
                    }`}
                  >
                    {Number(c.slice(8))}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-medium tracking-[-0.02em]">
              {day ? new Date(`${day}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: "UTC" }) : "Pick a day"}
            </p>
            <p className="mt-1 text-[13px] text-muted">
              Times in your zone · {timeZone.replace(/_/g, " ")} {offset && `(${offset})`}
            </p>
            <div className="mt-4 grid max-h-[340px] grid-cols-2 gap-2 overflow-y-auto pr-1">
              {(day ? byDay.get(day) ?? [] : []).map((s) => (
                <button
                  key={s.toISOString()}
                  onClick={() => {
                    setSlot(s);
                    setStage("details");
                  }}
                  className="rounded-xl bg-mist px-3 py-2.5 text-left transition-colors hover:bg-ink hover:text-white"
                >
                  <span className="block text-[15px] font-medium">{localTime(s)}</span>
                  {/* Compare times, not zone names: Asia/Calcutta and Asia/Kolkata are the same zone. */}
                  {localTime(s) !== istTime(s) && (
                    <span className="block font-mono text-[10px] uppercase tracking-[0.08em] opacity-50">{istTime(s)} IST</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {stage === "details" && slot && (
        <motion.form
          key="details"
          {...step}
          onSubmit={(e) => {
            e.preventDefault();
            submit(e.currentTarget);
          }}
          className="flex flex-col gap-4 p-5 md:p-8"
        >
          <button type="button" onClick={() => setStage("pick")} className="flex w-fit items-center gap-2 text-[14px] text-ink/60 hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Change time
          </button>
          <div className="rounded-2xl bg-mist p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">Your call</p>
            <p className="mt-1 text-lg font-medium">{localLong(slot)}</p>
            <p className="text-[14px] text-muted">{istTime(slot)} IST · 30 minutes · video call</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[14px] text-ink/70">Name</span>
              <input name="name" required maxLength={100} autoComplete="name" className="mt-1.5 w-full rounded-xl bg-mist px-4 py-3 outline-none ring-accent focus:ring-2" />
            </label>
            <label className="block">
              <span className="text-[14px] text-ink/70">Email</span>
              <input name="email" type="email" required maxLength={200} autoComplete="email" className="mt-1.5 w-full rounded-xl bg-mist px-4 py-3 outline-none ring-accent focus:ring-2" />
            </label>
          </div>
          <label className="block">
            <span className="text-[14px] text-ink/70">Company or website <span className="text-ink/40">(optional)</span></span>
            <input name="company" maxLength={200} className="mt-1.5 w-full rounded-xl bg-mist px-4 py-3 outline-none ring-accent focus:ring-2" />
          </label>
          <label className="block">
            <span className="text-[14px] text-ink/70">What are we building?</span>
            <textarea
              name="notes"
              rows={4}
              maxLength={2000}
              defaultValue={scope ? `Scope: ${scope}\n` : ""}
              placeholder="The project, the deadline and the budget."
              className="mt-1.5 w-full resize-none rounded-xl bg-mist px-4 py-3 outline-none ring-accent focus:ring-2"
            />
          </label>
          {/* Honeypot for bots; hidden from people and screen readers. */}
          <input name="company_site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          {error && <p className="rounded-xl bg-[#fdecec] px-4 py-3 text-[14px] text-[#b42318]">{error}</p>}
          <button type="submit" disabled={sending} className="btn btn-dark mt-1 w-full disabled:opacity-60">
            {sending ? "Booking…" : "Confirm booking"}
          </button>
        </motion.form>
      )}

      {(stage === "done" || stage === "email") && slot && (
        <motion.div key="done" {...step} className="flex flex-col items-start gap-5 p-5 md:p-8">
          <span className={`grid h-12 w-12 place-items-center rounded-full ${stage === "done" ? "bg-[#e8f8ef] text-[#0b7a45]" : "bg-accent/10 text-accent"}`}>
            <Check className="h-6 w-6" strokeWidth={2.5} />
          </span>
          <div>
            <h2 className="text-[clamp(28px,3vw,40px)] leading-[1.05] tracking-[-0.035em]">
              {stage === "done" ? "You're booked." : "Almost there."}
            </h2>
            <p className="mt-2 text-lg">{localLong(slot)}</p>
            <p className="mt-1 text-muted">
              {stage === "done"
                ? booking.meetingUrl
                  ? "Your invite is on its way. Accept it to add the call and its video link to your calendar."
                  : "A confirmation is on its way to your inbox. We'll send the video link before the call."
                : "Send us this email to lock in the time. It's already written for you."}
            </p>
          </div>
          {stage === "email" && (
            <a
              className="btn btn-dark"
              href={`mailto:${site.email}?subject=${encodeURIComponent(`Call request: ${istTime(slot)} IST, ${fmt(slot, "Asia/Kolkata", { month: "short", day: "numeric" })}`)}&body=${encodeURIComponent(
                `Hi VORQ,\n\nI'd like to book a call for ${localLong(slot)} (${istTime(slot)} IST).${scope ? `\nScope: ${scope}` : ""}\n\nThanks!`,
              )}`}
            >
              Send the email
            </a>
          )}
          <div className="flex flex-wrap gap-2">
            <a href={googleCalendarUrl(invite(slot))} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
              <CalendarPlus className="h-4 w-4" /> Google Calendar
            </a>
            <a
              href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsFile(invite(slot)))}`}
              download="vorq-call.ics"
              className="btn btn-outline btn-sm"
            >
              <Download className="h-4 w-4" /> Apple / Outlook
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
