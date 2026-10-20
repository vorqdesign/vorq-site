/**
 * Booking hours, in India Standard Time (UTC+5:30, no daylight saving).
 * Minutes count from midnight IST; an end past 1440 runs into the next day (26 × 60 = 2 am).
 * Weekdays follow JavaScript: 0 is Sunday.
 */
export const booking = {
  utcOffsetMinutes: 330,
  slotMinutes: 30,
  noticeHours: 4, // the soonest someone can book from now
  daysAhead: 28,
  hours: {
    0: { start: 10 * 60, end: 26 * 60 }, // Sunday, 10 am to 2 am
    1: { start: 21 * 60, end: 26 * 60 }, // Monday to Saturday, 9 pm to 2 am
    2: { start: 21 * 60, end: 26 * 60 },
    3: { start: 21 * 60, end: 26 * 60 },
    4: { start: 21 * 60, end: 26 * 60 },
    5: { start: 21 * 60, end: 26 * 60 },
    6: { start: 21 * 60, end: 26 * 60 },
  } as Record<number, { start: number; end: number } | undefined>,
  /** IST dates (YYYY-MM-DD) with no calls at all, for holidays and travel. */
  closed: [] as string[],
  /** The standing video link put in every invite (Google Meet, Zoom or Whereby). Empty: we email it before the call. */
  meetingUrl: "",
};
