import { booking } from "./config";
import { site } from "../../../app/content";
import { isOpenSlot, slotEnd } from "./availability";
import { icsFile } from "./invite";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Books a call: validates the request, re-checks the slot against the booking hours,
 * then emails the studio and the visitor through Resend.
 * Without RESEND_API_KEY it answers 503 and the page falls back to a pre-filled email.
 * ponytail: no slot locking or rate limit; add a store (Supabase, KV) once double bookings happen.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });

  // Honeypot: real people never see this field.
  if (text(body.company_site, 200)) return Response.json({ ok: true });

  const slot = text(body.slot, 40);
  const name = text(body.name, 100);
  const email = text(body.email, 200);
  const company = text(body.company, 200);
  const notes = text(body.notes, 2000);
  const timeZone = text(body.timeZone, 64) || "UTC";

  if (!name || !EMAIL.test(email)) {
    return Response.json({ error: "Add your name and a valid email." }, { status: 400 });
  }
  if (!isOpenSlot(slot, booking)) {
    return Response.json({ error: "That time is no longer available. Pick another slot." }, { status: 409 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM;
  if (!key || !from) return Response.json({ error: "Booking email is not set up yet." }, { status: 503 });

  const start = new Date(slot);
  const end = slotEnd(start, booking);
  const studio = process.env.BOOKING_TO || site.email;
  const when = (tz: string) =>
    start.toLocaleString("en-US", { timeZone: tz, dateStyle: "full", timeStyle: "short" });
  const ist = `${when("Asia/Kolkata")} IST`;
  let local = ist;
  try {
    local = `${when(timeZone)} (${timeZone})`;
  } catch {}

  const summary = [
    `Name: ${name}`,
    `Email: ${email}`,
    company && `Company or site: ${company}`,
    `When: ${local}`,
    `Studio time: ${ist}`,
    notes && `\nProject:\n${notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  const link = booking.meetingUrl;
  const joining = link ? `Join: ${link}` : "We'll email the video link before the call.";
  const invite = icsFile({
    start,
    end,
    title: `VORQ intro call with ${name}`,
    details: `30-minute call with VORQ.\n${joining}\n\n${summary}`,
    organizer: studio,
    attendee: { name, email },
    location: link || undefined,
  });
  const attachments = [{ filename: "invite.ics", content: Buffer.from(invite).toString("base64") }];

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, ...payload }),
    });

  const [toStudio, toVisitor] = await Promise.all([
    send({ to: studio, reply_to: email, subject: `New call: ${name}, ${ist}`, text: `${summary}\n\n${joining}`, attachments }),
    send({
      to: email,
      reply_to: studio,
      subject: "Your call with VORQ is booked",
      text: `Hi ${name},\n\nYou're booked for ${local}.\n${joining}\n\nThe invite is attached; accept it to add the call to your calendar. To change the time, just reply to this email.\n\nVORQ`,
      attachments,
    }),
  ]);

  if (!toStudio.ok) return Response.json({ error: "We couldn't send the booking. Please try again." }, { status: 502 });
  return Response.json({ ok: true, confirmationSent: toVisitor.ok });
}
