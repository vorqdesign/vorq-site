/**
 * Public facts carried from the existing Vorq site, plus Gradient Forge
 * as described on its own site. Do not add clients, quotes, metrics,
 * logos, or people that are not already recorded here.
 *
 * TODO: Social profiles on the old site pointed at "#". Add real URLs
 * before rendering icons.
 * TODO: /blog was linked in the footer and has no route or posts.
 * TODO: Delivery language conflicted across the old site (3-day average
 * in the hero, 7-day average on the booking page and marquee, “under a
 * week” / “under 10 days” in the studio notes, and per-project times
 * from 6 hours to 4 days). Reconcile one figure. The page says most
 * projects go live in under a week. The old “7-day average” perk is
 * not shown.
 * TODO: The quote attributed to Ravi Pratap Singh states that conversion
 * rates doubled. Confirm it is approved to publish as a client result.
 * It is not shown.
 * TODO: The HillMan Media quote names a company and no person. Confirm
 * it is approved. No HillMan project is in the work list. It is not shown.
 * SamaWritten’s live homepage (Oct 2026) leads with vitals, medical ID,
 * and contact check-ins. The older “cardiac wearable / 20+ conditions”
 * line is no longer what the site shows, so the caption follows the live page.
 * TODO: A “Lighthouse 95+” claim appeared only in the old marquee, with
 * no report in the repo. It is not shown.
 */

export const site = {
  name: "Vorq",
  url: "https://www.vorq.agency",
  email: "hello@vorq.agency",
  bookPath: "/book",
  description:
    "Vorq is Priyanshu Bhardwaj and Ravi Pratap Singh. We design and build websites, redesigns, and MVPs for early-stage teams. Published prices. You own the code.",
} as const;

export const calendlyUrl =
  "https://calendly.com/vorqdesign/30min?primary_color=141414&hide_gdpr_banner=1&background_color=ffffff&text_color=141414";

export const intro = {
  title: "We design and build websites and MVPs.",
  body: "Priyanshu Bhardwaj and Ravi Pratap Singh. Fixed scope, published prices, and you own the code.",
} as const;

export const contactNote =
  "Send the work, the deadline, and the budget. You get a fixed scope and a fixed price within 24 hours. Most projects go live in under a week. You own the code.";

export const product = {
  name: "Gradient Forge",
  kicker: "A Vorq product",
  headline: "Shader backgrounds for Next.js.",
  summary:
    "A studio for designing animated shader backgrounds and copying them into a React or Next.js project. Tune a live shader, then copy the component.",
  href: "https://gradient-forge-nu.vercel.app",
} as const;

export const services = [
  {
    id: "redesign",
    name: "Redesign",
    price: "$20–50",
    tagline: "Modernise your existing site. Faster, sharper, more persuasive.",
    featured: false,
    includes: [
      "Full visual refresh",
      "Mobile-first layout",
      "Performance pass",
      "Up to 5 pages",
      "1 revision round",
    ],
    cta: "Book a redesign",
  },
  {
    id: "website",
    name: "Website Design",
    price: "$50–100",
    tagline: "A new site built from scratch. Designed to convert, built to last.",
    includes: [
      "Custom design + dev",
      "Next.js or Framer",
      "Animations included",
      "SEO-optimised",
      "1 revision round",
    ],
    cta: "Book a website",
    featured: true,
  },
  {
    id: "mvp",
    name: "MVP Build",
    price: "$100–500",
    tagline: "Ship your idea fast. Full-stack or frontend, scoped to your stage.",
    includes: [
      "Scoped to requirements",
      "Next.js + Supabase",
      "Auth, DB, API routes",
      "Deployed & handed off",
      "Code ownership",
    ],
    cta: "Book an MVP",
    featured: false,
  },
] as const;

export const customWork = {
  title: "Need something bigger?",
  body: "A larger scope, ongoing work, or a specific brief. We’ll name the number together before anyone starts.",
} as const;

export const projects = [
  {
    title: "SamaWritten",
    href: "https://www.samawritten.com",
    kind: "Vitals and medical ID",
    summary: "Vitals, medical ID, and contact check-ins.",
    timeline: "Delivered in 2 days",
    tools: ["Next.js", "Framer", "AI"],
    image: "/captures/sama.jpg",
    alt: "SamaWritten homepage: vitals, medical ID, and contact check-ins",
  },
  {
    title: "Aranyoing",
    href: "https://www.aranyoing.com",
    kind: "Portfolio redesign",
    summary:
      "High-end minimalist portfolio redesign. Complete layout overhaul with premium motion and responsive performance.",
    timeline: "Redesigned in 6 hrs",
    tools: ["React", "GSAP", "UI/UX"],
    image: "/captures/aranyoing.jpg",
    alt: "Aranyo Ray portfolio homepage",
  },
  {
    title: "Open Dev Society",
    href: "https://opendevsociety.vercel.app",
    kind: "Community platform",
    summary:
      "Main website development for the global open-source community. Building the future of dev culture together.",
    timeline: "Delivered in 4 days",
    tools: ["Next.js", "Community", "Open source"],
    image: "/captures/ods.jpg",
    alt: "Open Dev Society homepage",
  },
  {
    title: "Kine UI",
    href: "https://kine-ui.vercel.app",
    kind: "Open source MVP",
    summary:
      "Spatial computing UI library for full production spatial interfaces. Redefining interactions in 3D environments.",
    timeline: "Delivered in 2 days",
    tools: ["Spatial UI", "Google Pipeline", "Open source"],
    image: "/captures/kine.jpg",
    alt: "Kine UI homepage, a spatial computing component library",
  },
] as const;

export const principles = [
  {
    title: "Prices for the work",
    body: "We’ve seen $8,000 quotes for a four-page site. That number is overhead, not craft. Vorq prices the work, and the ranges on this page are the ranges.",
  },
  {
    title: "No templates",
    body: "Every component is written for the project. The site is custom, down to the layout.",
  },
  {
    title: "Short cycles",
    body: "Most projects go live in under a week. You are not sitting in a six-week agency sprint while the runway burns.",
  },
  {
    title: "You own the code",
    body: "Full handoff. No vendor lock-in, and no subscription required to keep the site running.",
  },
] as const;

export const steps = [
  {
    title: "Brief us",
    body: "Email hello@vorq.agency or book a short call. Share what you need, the deadline, and the budget. No long form.",
  },
  {
    title: "We scope it",
    body: "A fixed scope and a fixed price within 24 hours. You approve, or we adjust. No surprise invoices halfway through.",
  },
  {
    title: "We build it",
    body: "Design, development, then revisions. A live preview link from day one, so the work is never a black box.",
  },
  {
    title: "You go live",
    body: "We deploy, connect the domain, and hand over the codebase. Ongoing support is available if you want it.",
  },
] as const;

export const testimonials = [
  {
    quote: "Exceptional design skills matched by robust engineering.",
    name: "Aranyo Ray",
    role: "Co-founder, SamaWritten",
  },
  {
    quote:
      "The team understood our vision immediately. They didn’t just build what we asked for; they improved upon it. Our conversion rates have doubled since the redesign.",
    name: "Ravi Pratap Singh",
    role: "Founder, Open Dev Society",
  },
] as const;

export const bookQuote = {
  quote:
    "The team at VORQ didn’t just build a website, they built our entire digital engine.",
  name: "HillMan Media",
} as const;

export const bookPerks = [
  "Same-day response",
  "Fixed price guarantee",
  "Built from scratch",
  "7-day average delivery",
] as const;

export const team = [
  {
    name: "Priyanshu Bhardwaj",
    role: "Co-Founder · Designer & Developer",
    image: "/cofounder1.jpg",
    bio: "Handling end-to-end execution. From initial concept and design systems to the final line of code and deployment.",
  },
  {
    name: "Ravi Pratap Singh",
    role: "Co-Founder · Designer & Developer",
    image: "/cofounder2.jpg",
    bio: "Obsessed with details. Every pixel has to be right, and every interaction has to respond.",
  },
] as const;

export const values = [
  {
    title: "Obsessive quality",
    body: "We don’t ship until it’s pixel-perfect. Good enough is never good enough for us.",
  },
  {
    title: "Radical transparency",
    body: "We build in the open and keep clients involved at every step of the process.",
  },
  {
    title: "Always learning",
    body: "Technology moves fast. We move faster, and keep exploring new tools and techniques.",
  },
  {
    title: "Design driven",
    body: "Design is how it works, not only how it looks. The experience comes first.",
  },
] as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Prices", href: "/#prices" },
  { label: "Studio", href: "/team" },
] as const;
