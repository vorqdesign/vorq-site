// Self-check for the booking hours. Run: node ideas/booking-tool/prototype/check-booking.mts
import assert from "node:assert/strict";
import { booking } from "./config.ts";
import { isOpenSlot, openSlots } from "./availability.ts";

const ist = (d: Date) => new Date(d.getTime() + booking.utcOffsetMinutes * 60_000).toISOString().slice(0, 16);
const noNotice = { ...booking, noticeHours: 0 };

// Monday 20 Oct 2026, 12:00 IST (06:30 UTC).
const monday = new Date("2026-10-20T06:30:00Z");
const slots = openSlots(monday, noNotice);

// Mon to Sat: 9 pm to 2 am IST is ten 30-minute slots, the last starting 1:30 am.
const mon = slots.filter((s) => ist(s) >= "2026-10-20T21:00" && ist(s) < "2026-10-21T02:00");
assert.equal(mon.length, 10);
assert.equal(ist(mon[0]), "2026-10-20T21:00");
assert.equal(ist(mon.at(-1)!), "2026-10-21T01:30");

// Nothing between 2 am and 9 pm on a weekday.
assert.equal(slots.filter((s) => ist(s) >= "2026-10-21T02:00" && ist(s) < "2026-10-21T21:00").length, 0);

// Sunday 25 Oct: 10 am to 2 am is thirty-two slots.
const sun = slots.filter((s) => ist(s) >= "2026-10-25T10:00" && ist(s) < "2026-10-26T02:00");
assert.equal(sun.length, 32);
assert.equal(ist(sun[0]), "2026-10-25T10:00");

// Saturday night runs into Sunday morning without a gap or a double count.
const satNight = slots.filter((s) => ist(s) >= "2026-10-24T21:00" && ist(s) < "2026-10-25T02:00");
assert.equal(satNight.length, 10);

// Notice period: at 8 pm IST with 4 hours' notice, the first slot is midnight.
const evening = openSlots(new Date("2026-10-20T14:30:00Z"), booking);
assert.equal(ist(evening[0]), "2026-10-21T00:00");

// The server check only accepts real slot starts.
assert.ok(isOpenSlot(mon[0].toISOString(), noNotice, monday));
assert.ok(!isOpenSlot("2026-10-21T08:00:00.000Z", noNotice, monday)); // 1:30 pm IST, closed
assert.ok(!isOpenSlot("2026-10-20T15:45:00.000Z", noNotice, monday)); // 9:15 pm, not a slot start

console.log("booking hours: all checks pass");
