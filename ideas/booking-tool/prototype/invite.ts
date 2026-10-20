// Calendar invites for a booked call: an .ics file and a Google Calendar link.

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

export type Invite = {
  start: Date;
  end: Date;
  title: string;
  details: string;
  organizer: string;
  /** The guest. With one, the file is a real invitation (accept / decline); without, a plain event. */
  attendee?: { name: string; email: string };
  location?: string;
};

export function icsFile({ start, end, title, details, organizer, attendee, location }: Invite): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VORQ//Booking//EN",
    `METHOD:${attendee ? "REQUEST" : "PUBLISH"}`,
    "BEGIN:VEVENT",
    `UID:${stamp(start)}-${attendee?.email ?? "guest"}@vorq.agency`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape(title)}`,
    `DESCRIPTION:${escape(details)}`,
    location && `LOCATION:${escape(location)}`,
    location && `URL:${location}`,
    `ORGANIZER;CN=VORQ:mailto:${organizer}`,
    // Parameter values are quoted, not escaped, per RFC 5545.
    attendee && `ATTENDEE;CN="${attendee.name.replace(/"/g, "")}";ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${attendee.email}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function googleCalendarUrl({ start, end, title, details, location }: Invite): string {
  const q = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${stamp(start)}/${stamp(end)}`, details });
  if (location) q.set("location", location);
  return `https://calendar.google.com/calendar/render?${q}`;
}
