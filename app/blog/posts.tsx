import type { ReactNode } from "react";
import { services, usd } from "../content";

/**
 * The journal. Case studies here are about work we can show in full: our own site and our own
 * products. Client case studies get added when the work is shipped and approved for publishing.
 */
export type Cover = "wordmark" | "forge" | "pricing" | "builds" | "code" | "website" | "devtools" | "team";
export type Kind = "Case study" | "Engineering" | "Studio";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  kind: Kind;
  date: string; // ISO date
  minutes: number;
  cover: Cover;
  facts?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  body: ReactNode;
};

export const kinds: Kind[] = ["Case study", "Engineering", "Studio"];

const price = (id: string) => usd(services.find((s) => s.id === id)!.price);

export const posts: Post[] = [
  {
    slug: "building-vorq-site",
    title: "Building vorq.agency: a 3D wordmark that becomes the navbar",
    excerpt:
      "How we built a studio site that shows design engineering instead of claiming it: a live 3D wordmark, a scroll handoff into the nav and a scope builder that prices itself.",
    kind: "Case study",
    date: "2026-10-20",
    minutes: 6,
    cover: "wordmark",
    facts: [
      { label: "Project", value: "Studio website" },
      { label: "Stack", value: "Next.js 16, three.js, Motion" },
      { label: "Styling", value: "Tailwind CSS v4" },
      { label: "Shaders", value: "Custom GLSL, Paper Shaders" },
    ],
    links: [{ label: "You are looking at it", href: "/" }],
    body: (
      <>
        <p>
          A new studio site has one job: show how you work before there is a client list to point at. So we set
          ourselves a rule. Every claim on the page had to be something the page itself proves. If we say we design in
          code, the hero should be designed in code, and you should be able to see it.
        </p>

        <h2>The wordmark is the hero</h2>
        <p>
          The VORQ wordmark is real geometry, not a video or an image. We converted our display face into the format
          three.js reads, and kept only the four letters we draw. The whole font file the browser downloads is about
          3&nbsp;KB. The letters are extruded with a small bevel and painted by a custom shader: a slow, noise-driven
          mesh gradient on the face, darker shaded sides, and a highlight that follows your cursor.
        </p>
        <p>
          Two details matter more than they look. The camera fits the word to the stage with room to spare, so the
          letters never clip when they tilt toward you. And rendering stops when the canvas is off screen, so the page
          stays quiet on laptops.
        </p>

        <h2>Handing the logo to the navbar</h2>
        <p>
          At the top of the home page there is no navbar. As you scroll, the wordmark shrinks and glides into the exact
          slot where the nav logo sits, the links fade in around it, and the flat logo takes over. Under the hood the 3D
          wordmark lives in a fixed layer whose position and scale are derived from two measurements: the stage it
          starts on and the slot it lands in.
        </p>
        <ul>
          <li>
            <strong>Scale leads position.</strong> The word shrinks faster than it travels, so it never pokes above the
            top of the screen mid-flight.
          </li>
          <li>
            <strong>Hand over, then rest.</strong> In the last few pixels the 3D word fades out as the flat logo fades
            in, and the WebGL loop pauses.
          </li>
          <li>
            <strong>Shared numbers.</strong> The hero and the nav read the same scroll distance, so they can never
            disagree about where the handoff is.
          </li>
        </ul>

        <h2>A design tool in the hero</h2>
        <p>
          The stage is laid out like an artboard in a design tool: selection handles, a layer label and the live pixel
          size. Next to it sits an inspector that reads the wordmark&apos;s rotation every frame and lets you switch its
          material. It is a small thing, but it says what we do in one glance: the design and the code are the same
          object.
        </p>

        <h2>A scope builder that prices itself</h2>
        <p>
          Every price on the site comes from one file. The pricing cards, the scope builder, the project brief ticket
          in the footer and the FAQ all read it, so changing a number in one place changes it everywhere. The builder
          draws a live wireframe of what you pick: a landing page, a dashboard, an app board or a pair of phones, with
          your add-ons appearing on it. The estimate then travels to the booking page and into the calendar invite, so
          the first call starts with context.
        </p>

        <h2>One system, everywhere</h2>
        <p>
          The cards across the site share one structure: a hatched shell, a raised white panel and a plain well for
          supporting text. Every section uses the same vertical rhythm. The result is a page that feels designed as a
          whole rather than assembled from sections.
        </p>
        <blockquote>The page is the portfolio. Everything we claim on it, it does.</blockquote>
      </>
    ),
  },
  {
    slug: "gradient-forge",
    title: "Gradient Forge: shipping a shader studio as a micro-SaaS",
    excerpt:
      "Why we built a tool for designing animated shader backgrounds, how the pick, tweak, copy loop works, and how a free tier and an $8 Pro plan fit together.",
    kind: "Case study",
    date: "2026-10-20",
    minutes: 5,
    cover: "forge",
    facts: [
      { label: "Product", value: "Gradient Forge" },
      { label: "Type", value: "Micro-SaaS" },
      { label: "Rendering", value: "Paper Shaders" },
      { label: "Pricing", value: "Free · Pro $8/mo" },
    ],
    links: [
      { label: "Visit Gradient Forge", href: "https://gradient-forge-nu.vercel.app" },
      { label: "Open the studio", href: "https://gradient-forge-nu.vercel.app/studio" },
    ],
    body: (
      <>
        <p>
          Animated shader backgrounds make a page feel alive, but they are awkward to get right in code. You tweak a
          number, reload, squint, and repeat. Designers hand developers screenshots; developers hand back something
          close. Gradient Forge exists to collapse that loop into one screen.
        </p>

        <h2>The loop: pick, tweak, copy</h2>
        <ol>
          <li>
            <strong>Pick.</strong> Start from a preset, or switch to any of the 11 shader types, from mesh gradients to
            metal, rays and dither.
          </li>
          <li>
            <strong>Tweak.</strong> Change colour, shape and motion on a live canvas. The address bar keeps the
            settings, so every look is a shareable link.
          </li>
          <li>
            <strong>Copy.</strong> Take a React component straight into a Next.js project, or export a PNG or a
            three-second video.
          </li>
        </ol>

        <h2>A free tier that is actually useful</h2>
        <p>
          The free tier includes every shader type, four presets and all three exports. Exports carry a small
          watermark, and the React file includes a Gradient Forge line. Pro is $8 a month or $60 a year. It adds eight
          curated presets, removes the watermark and the line, and allows commercial use while the subscription is
          active.
        </p>
        <p>
          The split is deliberate. Everything you need to learn the tool and ship a background is free. Pro is for
          people who use it in client and production work, where a clean export is worth a few dollars.
        </p>

        <h2>Engineering notes</h2>
        <ul>
          <li>
            <strong>State lives in the URL.</strong> No accounts are needed to save or share a look.
          </li>
          <li>
            <strong>Pro is verified server side.</strong> A shared link opens a look, but Pro only turns on after a
            signed payment webhook records an active subscription.
          </li>
          <li>
            <strong>Built on open source.</strong> Rendering uses Paper Shaders under the Apache-2.0 licence, and the
            credit stays on every export. Gradient Forge is independent and not affiliated with Paper.
          </li>
        </ul>

        <h2>Why a studio ships its own products</h2>
        <p>
          Building a product end to end, with pricing, payments and support, keeps us honest about the work we do for
          founders. It is the same craft, pointed at our own problem.
        </p>
      </>
    ),
  },
  {
    slug: "what-to-build-first",
    title: "Landing page, dashboard, web app or mobile app: what to build first",
    excerpt:
      "A plain guide to picking the first thing to build, what each one costs and how long it takes, and the order most products grow in.",
    kind: "Studio",
    date: "2026-10-20",
    minutes: 5,
    cover: "builds",
    body: (
      <>
        <p>
          Most founders do not need everything at once. They need the one thing that unlocks the next step: a signup,
          a pilot, a payment. Here is how we help clients choose.
        </p>

        <h2>Landing page</h2>
        <p>
          Build this first if you are launching, raising or testing demand. One page with a sharp message, a single
          main action and analytics wired in will tell you more than a month of guessing. Ours start at{" "}
          {price("landing")}, from a single page up to a full website of 10 pages, and take one to two weeks.
        </p>

        <h2>Dashboard</h2>
        <p>
          Build this when your users already have data and need to see it: analytics, admin, operations or an
          internal tool. The hard part is not the charts, it is deciding what matters and making dense information calm
          to read. Dashboards start at {price("dashboard")}.
        </p>

        <h2>Web app</h2>
        <p>
          Build this when people need to sign in and do something every day: create, manage, collaborate or pay. This
          is where auth, a database and billing come in, and where product and UX design pay for themselves. Web apps
          start at {price("webapp")} and usually take four to eight weeks.
        </p>

        <h2>Mobile app</h2>
        <p>
          Build this when the product belongs on the home screen: it is used on the go, needs the camera or location,
          or lives on notifications. With React Native and Expo you get iOS and Android from one codebase. Mobile apps
          start at {price("mobile")}.
        </p>

        <h2>The usual order</h2>
        <ol>
          <li>A landing page to find out who cares.</li>
          <li>A web app for the people who signed up.</li>
          <li>A dashboard once there is data worth reading.</li>
          <li>A mobile app when usage moves off the desk.</li>
        </ol>
        <p>
          Not sure where you are? Use the scope builder on our home page, or book a call and we will tell you honestly
          what we would build first, even if it is the smaller job.
        </p>
      </>
    ),
  },
  {
    slug: "fixed-price-quote",
    title: "What a fixed-price quote should include",
    excerpt:
      "Hourly billing turns every question into a cost. Here is what a good fixed quote covers, so you know exactly what you are paying for before anyone starts.",
    kind: "Studio",
    date: "2026-10-20",
    minutes: 4,
    cover: "pricing",
    body: (
      <>
        <p>
          A quote is a promise about scope, time and money. If any one of the three is vague, the other two will drift.
          This is the checklist we hold our own quotes to, and the one we suggest you hold anyone to.
        </p>

        <h2>The scope, in writing</h2>
        <ul>
          <li>Every page, screen or feature, listed by name.</li>
          <li>What is out of scope, so nobody is surprised later.</li>
          <li>How many revision rounds are included, and what counts as one.</li>
        </ul>

        <h2>A dated timeline</h2>
        <p>
          Not “four to six weeks”, but the dates of each milestone: first design, first live preview, launch. A live
          preview link from day one means you never have to take progress on trust.
        </p>

        <h2>One number</h2>
        <p>
          The total, how it is split (we take half to start and half at launch), and the price of anything extra, such
          as an additional page or screen. If the quote cannot name the cost of a change, the cost of a change will be a
          surprise.
        </p>

        <h2>What you own at the end</h2>
        <p>
          The code, the repository, the domain and the deploy should all be yours, with no subscription needed to keep
          the site running. Ask about this before you sign, not after.
        </p>
        <blockquote>A good quote is boring. Every line answers a question before you have to ask it.</blockquote>
      </>
    ),
  },
  {
    slug: "designing-in-code",
    title: "Designing in code: why we skip the handoff",
    excerpt:
      "The gap between a mockup and the shipped product is where motion, states and performance get lost. Designing in the browser closes it.",
    kind: "Engineering",
    date: "2026-10-20",
    minutes: 4,
    cover: "code",
    body: (
      <>
        <p>
          In a traditional process a designer draws the product and a developer rebuilds it. Somewhere between the two,
          details fall out: hover states, loading states, the way a menu should feel when it opens, how the layout
          behaves at every width in between the two that were drawn.
        </p>

        <h2>What gets lost in a handoff</h2>
        <ul>
          <li>
            <strong>Motion.</strong> A static frame cannot describe timing, easing or what happens when you interrupt an
            animation.
          </li>
          <li>
            <strong>States.</strong> Empty, loading, error and success are usually missing from the file.
          </li>
          <li>
            <strong>Real content.</strong> Long names, translated copy and real data break layouts that looked perfect
            with placeholder text.
          </li>
          <li>
            <strong>Performance.</strong> Nobody can feel a slow page in a design tool.
          </li>
        </ul>

        <h2>How we work instead</h2>
        <p>
          We still sketch, and we use Figma when it helps. But the design is decided in the browser, in the real
          components, with real content. What you approve on a preview link is what ships, because it already is the
          thing that ships.
        </p>

        <h2>What it means for you</h2>
        <p>
          Fewer surprises at launch, faster iteration because a change is one edit instead of two, and a component
          library your team can keep building with after we leave.
        </p>
      </>
    ),
  },
  {
    slug: "building-first-website",
    title: "When’s the right time to build your first professional website?",
    excerpt:
      "Not on day one. Here are the signals that tell you it is time to stop patching your homepage and build something that lasts.",
    kind: "Studio",
    date: "2026-01-06",
    minutes: 4,
    cover: "website",
    body: (
      <>
        <p>
          <strong>Spoiler:</strong> not on day one. In the early days your startup is in motion. You are talking to
          users, running demos and changing things fast. The product evolves weekly, and so does your messaging.
        </p>
        <p>
          So your website should be simple and malleable, something you can update before the next investor call. Then
          something shifts:
        </p>
        <ul>
          <li>You start getting traction.</li>
          <li>You stop rewriting your homepage headline every Friday.</li>
          <li>You begin to see what your product is actually valued for.</li>
        </ul>
        <p>That is the signal. It is time to stop patching and start cementing.</p>

        <h2>You have defined the core problem you solve</h2>
        <p>
          Listing features is easy. Defining what you actually do is harder. When you understand the pain your product
          solves and which solutions matter, that is what your homepage should say.
        </p>

        <h2>You know who is buying, and why</h2>
        <p>
          You are done guessing and no longer tweaking your ideal customer before every call. It is clear who buys
          from you, platform engineers, CTOs or enterprise buyers, and what makes them say yes.
        </p>

        <h2>You have real signals: usage, feedback and proof</h2>
        <p>
          The docs are in place and the use cases are clear. You have real feedback, maybe testimonials. Now the site
          is not just inviting people to try it, it is giving them a reason to trust it.
        </p>

        <h2>More than a website: a system</h2>
        <ul>
          <li>Clear positioning and focused messaging.</li>
          <li>Graphics, diagrams and motion that explain how the product works, without overwhelming.</li>
          <li>A foundation for every launch that comes after.</li>
        </ul>
      </>
    ),
  },
  {
    slug: "marketing-for-devtools",
    title: "Most marketing sites don’t work for devtools",
    excerpt:
      "Developers are sceptical buyers. A devtool site should prove the implementation, not sell the promise. Here is what that looks like.",
    kind: "Engineering",
    date: "2026-01-05",
    minutes: 3,
    cover: "devtools",
    body: (
      <>
        <h2>The enterprise polish trap</h2>
        <p>
          Developers are cynical buyers. We know, because we are developers. When a site hides the product behind
          vague talk about synergy and transformation, we leave.
        </p>
        <p>
          The biggest mistake devtool companies make is marketing to CTOs in CIO language while ignoring the engineers
          who actually evaluate the implementation.
        </p>

        <h2>What developers actually care about</h2>
        <ul>
          <li>
            <strong>Docs first.</strong> Can I read the docs before I sign up?
          </li>
          <li>
            <strong>Transparent pricing.</strong> Don&apos;t make me contact sales for the pro tier.
          </li>
          <li>
            <strong>Self-serve onboarding.</strong> Let me run <code>npm install</code> right now.
          </li>
        </ul>
        <blockquote>Your marketing site shouldn&apos;t just sell the promise. It should prove the implementation.</blockquote>

        <h2>Show, don&apos;t just tell</h2>
        <p>
          For a devtool, the hero is not a headline, it is a code snippet. If your product saves configuration, show
          the three lines of config next to the fifty lines of boilerplate. If it is faster, show the benchmark right
          there.
        </p>
        <p>
          Every click, every required field, every “book a demo” button is friction. The best devtool site often looks
          less like a brochure and more like a README with a premium finish.
        </p>
      </>
    ),
  },
  {
    slug: "design-team-vs-freelancer",
    title: "Design team or freelancer: what works for startups",
    excerpt:
      "Freelancers are fast; teams are consistent. Here is the trade-off, and the signal that tells you it is time to switch.",
    kind: "Studio",
    date: "2026-01-02",
    minutes: 3,
    cover: "team",
    body: (
      <>
        <h2>The speed versus consistency trade-off</h2>
        <p>
          Early-stage startups live and die by speed. When you need a landing page yesterday, a talented freelancer is
          often the best bet: fast, project-based and no management overhead. As you grow, the patchwork problem
          appears.
        </p>

        <h3>The freelancer path</h3>
        <ul>
          <li>Extremely fast execution and a lower immediate cost.</li>
          <li>But an inconsistent design system and knowledge that leaves with each person.</li>
        </ul>

        <h3>The design team path</h3>
        <ul>
          <li>Scalable design systems and deep product knowledge.</li>
          <li>But more overhead and a slower start.</li>
        </ul>

        <h2>When to switch</h2>
        <p>
          The switch usually happens around a Series A, or whenever design debt starts slowing development down. If
          your engineers spend more time fixing CSS conflicts because three freelancers used three naming conventions,
          it is time to bring design in-house or work with a dedicated studio.
        </p>
        <p>
          A good design partner doesn&apos;t just paint screens. They build the system: the components, tone and flows
          that let you ship faster for years, even if the first week feels slower.
        </p>
      </>
    ),
  },
];

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
