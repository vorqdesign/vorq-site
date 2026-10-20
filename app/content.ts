/**
 * Every public fact on the site lives here. Nothing in this file is invented:
 * projects, prices and the quote come from Vorq's own records.
 * Add a client, quote or number only when it is real and approved.
 * VORQ presents as a studio: never name or picture the people behind it.
 */

export const site = {
  name: "VORQ",
  url: "https://www.vorq.agency",
  email: "hello@vorq.agency",
  // Calendly hides its own event panel; the booking page shows the details itself.
  calendly:
    "https://calendly.com/vorqdesign/30min?hide_event_type_details=1&hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=0b0b0c&primary_color=8b3dff",
} as const;


export const heroKeywords = [
  { label: "landing pages", color: "#2f6bff" },
  { label: "web apps", color: "#8b3dff" },
  { label: "dashboards", color: "#00a37a" },
  { label: "mobile apps", color: "#ff5a1f" },
] as const;

export const statement =
  "Most websites look fine and sell nothing. We engineer the ones people remember, and the ones that turn visitors into customers.";

/** The three things the statement promises, each shown with a small live demo on the home page. */
export const pillars = [
  {
    title: "Remembered",
    body: "Motion, interaction and WebGL moments designed in code, so the site feels alive instead of templated.",
  },
  {
    title: "Fast",
    body: "Server-rendered Next.js, optimised images and fonts, and a Core Web Vitals pass before every launch.",
  },
  {
    title: "Converts",
    body: "Clear structure, one main action per page and analytics wired from day one, so you can see what works.",
  },
] as const;

export type Project = {
  title: string;
  href: string;
  kind: string;
  summary: string;
  timeline: string;
  tools: string[];
  image: string;
};

/** The Work section, its nav link and footer column all hide while this is empty. */
export const projects: Project[] = [];

/** `note` shows under each link in the mobile menu. */
export const nav = [
  ...(projects.length ? [{ label: "Work", href: "/#work", note: "Recent launches" }] : []),
  { label: "Lab", href: "/lab", note: "Tools we build and sell" },
  { label: "Services", href: "/#services", note: "Packages and pricing" },
  { label: "Process", href: "/#process", note: "From brief to launch" },
  { label: "FAQ", href: "/#faq", note: "Questions, answered" },
  { label: "Blog", href: "/blog", note: "Case studies and notes" },
];

/**
 * Vorq's own products. Each entry gets a card on the home page and in /lab,
 * plus its own page at /lab/[slug], so shipping a new micro-SaaS is one object here.
 * Facts come from each tool's own site.
 */
export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  pitch: string;
  href: string;
  cta: { label: string; href: string };
  status: "Live" | "Beta";
  pricing: string;
  poster: string;
  steps: { title: string; body: string }[];
  plans: { name: string; price: string; note?: string; features: string[] }[];
  credit?: string;
};

export const tools: Tool[] = [
  {
    slug: "gradient-forge",
    name: "Gradient Forge",
    tagline: "Shader backgrounds for Next.js",
    pitch: "Design an animated shader background on a live canvas, then copy it into your React or Next.js project.",
    href: "https://gradient-forge-nu.vercel.app",
    cta: { label: "Open the studio", href: "https://gradient-forge-nu.vercel.app/studio" },
    status: "Live",
    pricing: "Free to try · Pro $8/mo",
    poster: "/captures/forge-poster.jpg",
    steps: [
      { title: "Pick", body: "Start from a preset, or switch to any of 11 shader types, from mesh gradients to metal, rays and dither." },
      { title: "Tweak", body: "Change colour, shape and motion on the live canvas. The address bar keeps your settings, so every look is a link." },
      { title: "Copy", body: "Copy a React component, or export a PNG or a three-second video." },
    ],
    plans: [
      {
        name: "Free",
        price: "$0",
        features: ["All 11 shader types", "Iris, Tide, Ember and Briar presets", "React, PNG and video export", "Watermark on PNG and video"],
      },
      {
        name: "Pro",
        price: "$8/mo",
        note: "or $60 a year",
        features: ["Eight curated Pro presets", "No watermark on exports", "Clean React snippet", "Commercial use while subscribed"],
      },
    ],
    credit: "Rendering by Paper Shaders (Apache-2.0). Gradient Forge is independent and not affiliated with Paper.",
  },
];

/**
 * Pricing: starting prices for a premium design engineering studio, set Oct 2026
 * at roughly half of US/EU studio rates (purchasing-power pricing).
 * Every project still gets its own fixed quote within 24 hours of the brief.
 * `weeks` feeds the timeline estimate in the scope builder.
 */
export const services = [
  {
    id: "landing",
    name: "Landing Page",
    price: 750,
    weeks: [1, 2],
    tagline: "A single landing page or a full website, engineered to convert.",
    ideal: "Launches, waitlists, fundraising rounds and company sites",
    unit: "Pages beyond 10 · $300 each",
    includes: [
      "Landing pages and websites up to 10 pages",
      "Designed in code, Figma when it helps",
      "Next.js + Tailwind, typed end to end",
      "Scroll and interaction motion",
      "Core Web Vitals pass",
      "SEO, analytics and forms wired up",
    ],
    featured: false,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    price: 3000,
    weeks: [3, 6],
    tagline: "Admin panels, analytics and internal tools people actually like using.",
    ideal: "Teams that run on their data",
    unit: "Extra views · $250 each",
    includes: [
      "Data-dense UI and charts",
      "Tables, filters and search",
      "Roles and permissions",
      "Connected to your API or database",
      "Component library in code",
    ],
    featured: false,
  },
  {
    id: "webapp",
    name: "Web App",
    price: 5000,
    weeks: [4, 8],
    tagline: "A product people sign up for, use every day and pay for.",
    ideal: "Founders shipping a product to real users",
    unit: "Extra screens · $200 each",
    includes: [
      "Product and UX design",
      "Next.js + Supabase",
      "Auth, database and Stripe billing",
      "CI, previews and production deploy",
      "Full code handoff",
    ],
    featured: true,
  },
  {
    id: "mobile",
    name: "Mobile App",
    price: 6500,
    weeks: [6, 10],
    tagline: "One codebase for iOS and Android, with the feel of a native app.",
    ideal: "Products that belong on the home screen",
    unit: "Extra screens · $250 each",
    includes: [
      "iOS and Android with React Native + Expo",
      "Gestures, haptics and offline support",
      "Auth and push notifications",
      "App Store and Play Store submission",
      "Full code handoff",
    ],
    featured: false,
  },
] as const;

/** Terms that come with every project, shown under the rate card. */
export const included = [
  "Fixed quote within 24 hours",
  "Live preview link from day one",
  "Two revision rounds",
  "Repo, deploy and accounts handed over",
  "30 days of fixes after launch",
  "50% to start, 50% at launch",
] as const;

/**
 * Everything beyond the four core builds, grouped by when a founder needs it.
 * `addon` entries also appear in the scope builder.
 */
export const extras = [
  { group: "Add to any build", name: "Motion & WebGL", body: "Shaders, 3D and scroll-driven scenes that make a site memorable.", price: 2500, addon: true },
  { group: "Add to any build", name: "AI features", body: "Chat, semantic search or an agent wired into your product.", price: 3000, addon: true },
  { group: "Add to any build", name: "Payments & billing", body: "Stripe subscriptions, checkout and a customer portal.", price: 1500, addon: true },
  { group: "Add to any build", name: "Interactive demo", body: "A guided, clickable tour of your product, right on the page.", price: 2000, addon: true },
  { group: "Add to any build", name: "Design system in code", body: "React components, tokens and docs your team can build with.", price: 4500, addon: true },
  { group: "Launch", name: "Launch video", body: "A motion video built in code, cut for X, LinkedIn and Product Hunt.", price: 1500, addon: false },
  { group: "Launch", name: "Docs site", body: "Developer docs with search, versioning and copyable code.", price: 2500, addon: false },
  { group: "Launch", name: "Email templates", body: "Transactional and newsletter emails that render everywhere.", price: 1000, addon: false },
  { group: "Launch", name: "Browser extension", body: "A Chrome and Firefox extension, built and published.", price: 3500, addon: false },
  { group: "Grow", name: "Conversion sprint", body: "Analytics, funnels and A/B tests, then the fixes that move the numbers.", price: 2000, addon: false },
  { group: "Grow", name: "Performance sprint", body: "Core Web Vitals, bundle and image audit, with the fixes shipped.", price: 1250, addon: false },
  { group: "Grow", name: "Programmatic SEO", body: "Hundreds of genuinely useful pages generated from your data.", price: 3000, addon: false },
  { group: "Grow", name: "Rebuild & migration", body: "Move a slow or no-code site onto a fast Next.js codebase.", price: 3000, addon: false },
  { group: "Ongoing", name: "Engineering retainer", body: "A standing monthly slot for features, pages and fixes.", price: 2000, addon: false, monthly: true },
] as const;

export const extraGroups = [...new Set(extras.map((x) => x.group))];

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export const steps = [
  {
    title: "Brief us",
    when: "Day 0",
    body: "Email or book a short call. Tell us what you need, the deadline and the budget. No long forms.",
  },
  {
    title: "We scope it",
    when: "Within 24 hours",
    body: "A fixed scope and a fixed price within 24 hours. You approve, or we adjust. No surprise invoices.",
  },
  {
    title: "We build it",
    when: "Preview from day one",
    body: "Designed and engineered together, with a live preview link from day one.",
  },
  {
    title: "You go live",
    when: "Handoff + 30 days of fixes",
    body: "We deploy, connect your domain and hand over the codebase. Support is there if you want it.",
  },
] as const;

export const principles = [
  {
    title: "Fixed prices, up front",
    body: "Every scope has a published starting price and a fixed quote within 24 hours. No hourly billing, no surprise invoices.",
  },
  {
    title: "Weeks, not quarters",
    body: "Landing pages in two weeks, full products in one to two months. Never a six-month agency marathon while your runway burns.",
  },
  {
    title: "Designed in code",
    body: "What you approve in the browser is what ships. No gap between a pretty mockup and the real thing.",
  },
  {
    title: "You own everything",
    body: "Full handoff of the code, the repo and the deploy. No lock-in, and no subscription needed to keep it running.",
  },
] as const;

export const stack = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "GSAP", slug: "greensock" },
  { name: "Three.js", slug: "threedotjs" },
  { name: "Supabase", slug: "supabase" },
  { name: "Stripe", slug: "stripe" },
  { name: "Expo", slug: "expo" },
  { name: "Vercel", slug: "vercel" },
  { name: "Figma", slug: "figma" },
] as const;

export const quote = {
  text: "Exceptional design skills matched by robust engineering.",
  name: "Aranyo Ray",
  role: "Co-founder, SamaWritten",
} as const;

export const faqs = [
  {
    q: "What is a design engineering studio?",
    a: "We design and build in the same hands, mostly in code. That means motion, interaction and performance are part of the design from day one, and nothing gets lost in a handoff between a designer and a developer.",
  },
  {
    q: "What does it cost?",
    a: "Landing pages and websites of up to 10 pages start at $750, dashboards at $3,000, web apps at $5,000 and mobile apps at $6,500. These are starting points, not limits: the final price depends on your requirements and complexity. Every project gets a fixed scope and a fixed price within 24 hours of your brief. We take 50% to start and 50% at launch.",
  },
  {
    q: "How long does a project take?",
    a: "A landing page usually takes 1–2 weeks, a dashboard 3–6 weeks, a web app 4–8 weeks and a mobile app 6–10 weeks. You’ll have a dated timeline before we start and a live preview link from day one.",
  },
  {
    q: "We already have designs. Can you build them?",
    a: "Yes. Send the Figma file and we’ll engineer it properly, adding the motion, responsive behaviour and states that static designs usually leave out.",
  },
  {
    q: "Which technologies do you use?",
    a: "Next.js, React and TypeScript for every build. Tailwind for styling, Motion and GSAP for animation, Three.js and shaders for WebGL, Supabase and Stripe for products, React Native and Expo for mobile, and Vercel to ship.",
  },
  {
    q: "Which time zones do you work with?",
    a: "We’re based in India and work with clients across North America, Europe and Asia. We plan overlapping hours and put key calls on your schedule.",
  },
  {
    q: "What happens after launch?",
    a: "You own the code and the deploy. If you want us to stay on for features, pages or fixes, we can do that as small fixed projects or a monthly retainer.",
  },
] as const;
