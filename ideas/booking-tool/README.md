# Idea: a design-native booking and call tool (VORQ Lab)

Parked on 20 Oct 2026. vorq.agency uses Calendly for now. This folder keeps the idea and the working prototype for when we pick it up as a VORQ Lab tool, the same way Gradient Forge is one.

## The problem

Booking tools are easy or customizable, never both.

- **Calendly** is easy, but the page is Calendly's. Brand colours and removing the "Powered by" ribbon need a paid plan, and the layout never changes.
- **Cal.com** is open source and themeable, but deep changes mean self-hosting or fighting settings. Not easy for non-developers.
- **SavvyCal, Zcal and similar** look nicer and allow some branding, but the layout is still theirs.
- **Video APIs (Daily, LiveKit, Whereby, Cloudflare RealtimeKit)** give you branded call rooms, but they are developer building blocks with no booking side.

Nobody gives you a booking page **and** a call room that look exactly like your site (your fonts, colours, radius, layout) on your own domain, in a few minutes.

## The product

Your booking page and your call room, in your design, on your domain.

1. **Tune it visually.** A studio like Gradient Forge's: fonts, colours, corner radius, layout (month, week or list), copy.
2. **Ship it two ways.** Copy a React component into your site, or use a hosted page on your own domain.
3. **Custom hours that real people have.** Late-night windows, windows that cross midnight, different days, holidays, notice periods. (Ours: Mon–Sat 9 pm–2 am IST, Sunday 10 am–2 am.)
4. **Real invites.** Accept/decline calendar invitations to both sides, plus Google and Apple/Outlook buttons.
5. **A branded call room** at `yourdomain.com/call/…`: camera check, the call, and a side panel with the visitor's brief.
6. **Context in the call.** Whatever the visitor filled in (scope, budget, notes) is on screen when the call starts.

## Who it's for

The same people who hire VORQ: founders, designers, agencies, consultants and creators who care how they look and feel every off-brand touchpoint.

## What already exists (in `prototype/`)

Built and tested while it lived on vorq.agency's `/book` page:

| File | What it does |
|---|---|
| `config.ts` | Booking hours in IST, slot length, notice period, days ahead, closed dates, meeting link. |
| `availability.ts` | Turns the hours into open slots. Windows past midnight belong to the day they start on. Pure, shared by client and server. |
| `check-booking.mts` | Self-check for the slot maths. Run `node ideas/booking-tool/prototype/check-booking.mts`. |
| `Scheduler.tsx` | The picker in VORQ's design: month calendar, times in the visitor's zone with IST beside them, details form, confirmation with calendar buttons. Falls back to a pre-filled email when sending isn't set up. |
| `book-route.ts` | The booking endpoint (was `app/api/book/route.ts`). Validates input, re-checks the slot, honeypot for bots, plain-text emails through Resend with an `.ics` invitation to both sides. |
| `invite.ts` | `.ics` invitations (accept/decline, attendee, location) and Google Calendar links. |
| `.env.example` | `RESEND_API_KEY`, `BOOKING_FROM`, `BOOKING_TO`. |

To revive it on vorq.agency: move the files back under `app/` (`book-route.ts` → `app/api/book/route.ts`), point the imports at `app/content.ts`, and render `<Scheduler />` in `app/book/BookingPanel.tsx` instead of the Calendly embed.

## MVP for the Lab version

1. Hours editor (the config above, as a UI) and theme editor.
2. **Google Calendar busy-time check.** Without it double bookings happen; this is table stakes.
3. Invites and reminders by email.
4. Call rooms through a video provider (see below), created per booking and expiring after the call.
5. Copy-as-component plus a hosted page with custom domain.

Later: Outlook calendars, team round-robin, paid bookings (Stripe), routing forms, reschedule and cancel links, webhooks.

## Video providers (checked 20 Oct 2026, confirm before choosing)

| Provider | Custom UI | Free usage | After | Notes |
|---|---|---|---|---|
| Daily | Full (React hooks) or themed prebuilt | Reported 10,000 participant-min/month (third-party sources) | ~$0.004 / participant-min | Most proven for "room per booking". |
| LiveKit | Full (open-source React components) | Free Build plan | Ship $50/mo | Can self-host later. |
| Cloudflare RealtimeKit | Full (UI kit + SDK) | Free in beta | $0.002 / participant-min after beta | We already use Cloudflare; still beta. |
| Whereby Embedded | Partial (branded embed) | 2,000 min/month, limited white-label | $9.99/mo + $0.004/min | Easiest, least custom. |

At studio volume (a few two-person, 30-minute calls a week) every option is free or close to it. Video cost scales with usage, so pass it through in Pro.

## Pricing idea

Same shape as Gradient Forge:

- **Free:** one calendar, hosted page, small VORQ badge.
- **Pro, about $9–15/month:** no badge, custom domain, branded call rooms, copy-as-component, more calendars.

## Risks

- **Crowded category.** "Prettier booking" alone won't win against Calendly and Cal.com. The pitch is the whole on-brand flow: page, invite and room.
- **Plumbing must be boring.** Calendar sync, time zones and email deliverability have to just work; one broken booking loses a customer.
- **Support load.** Scheduling touches people's real days, so bugs are urgent.

## How to validate before building more

1. Use it on vorq.agency ourselves, with the branded call room.
2. Post the booking page and call room as a build-in-public thread on X, with a waitlist.
3. Build the Lab version only if the waitlist is real. Gradient Forge's audience is the first place to ask.

## Open questions

- Product name. Working title only; pick something short that sits next to Gradient Forge.
- Copy-as-component first, or hosted page first?
- Which video provider, and do we hide it entirely or credit it?
