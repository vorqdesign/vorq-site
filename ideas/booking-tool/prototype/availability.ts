import type { booking } from "./config";

type Config = typeof booking;

const DAY = 86_400_000;
const MIN = 60_000;

/**
 * Every bookable slot start from `now` to `daysAhead` days out, as UTC instants.
 * Hours are defined in IST; windows that run past midnight belong to the day they start on.
 */
export function openSlots(now: Date, cfg: Config): Date[] {
  const offset = cfg.utcOffsetMinutes * MIN;
  const earliest = now.getTime() + cfg.noticeHours * 60 * MIN;
  // Midnight IST today, as a UTC timestamp.
  const ist = new Date(now.getTime() + offset);
  const today = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()) - offset;

  const out: Date[] = [];
  // Start a day back: yesterday's late window can still be open after midnight.
  for (let d = -1; d <= cfg.daysAhead; d++) {
    const dayStart = today + d * DAY;
    const wall = new Date(dayStart + offset);
    if (cfg.closed.includes(wall.toISOString().slice(0, 10))) continue;
    const window = cfg.hours[wall.getUTCDay()];
    if (!window) continue;
    for (let m = window.start; m + cfg.slotMinutes <= window.end; m += cfg.slotMinutes) {
      const t = dayStart + m * MIN;
      if (t >= earliest) out.push(new Date(t));
    }
  }
  return out;
}

/** True when `iso` is exactly one of the open slot starts right now. The server's check. */
export function isOpenSlot(iso: string, cfg: Config, now = new Date()): boolean {
  return openSlots(now, cfg).some((s) => s.toISOString() === iso);
}

export const slotEnd = (start: Date, cfg: Config) => new Date(start.getTime() + cfg.slotMinutes * MIN);
