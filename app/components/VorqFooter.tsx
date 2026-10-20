"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, CalendarDays, Mail } from "lucide-react";
import { projects, services, site, tools, usd } from "../content";
import { useTypewriter } from "./useTypewriter";

// Each headline word comes with the brief it implies; the ticket follows the typewriter.
const briefs = [
  ...services.map((s) => ({
    word: `your ${s.name.toLowerCase()}`,
    scope: s.name,
    deadline: `${s.weeks[0]}–${s.weeks[1]} weeks`,
    budget: `From ${usd(s.price)}`,
  })),
  { word: "something great", scope: "Custom scope", deadline: "Your call", budget: "Quoted in 24 hours" },
];
const words = briefs.map((b) => b.word);

// The three ways in, in order of how much they commit the visitor.
const actions = [
  { title: "Book a free call", body: "30 minutes, on your schedule.", href: "/book", Icon: CalendarDays },
  { title: "Get a price", body: "Build your scope, see the estimate.", href: "/#scope", Icon: Calculator },
  { title: "Email us", body: site.email, href: `mailto:${site.email}`, Icon: Mail },
];

const columns = [
  {
    title: "Work",
    links: projects.map((p) => ({ label: p.title, href: p.href, external: true })),
  },
  {
    title: "Lab",
    links: [{ label: "All tools", href: "/lab" }, ...tools.map((t) => ({ label: t.name, href: `/lab/${t.slug}` }))],
  },
  {
    title: "Studio",
    links: [
      { label: "Pricing", href: "/#services" },
      { label: "Scope builder", href: "/#scope" },
      { label: "Process", href: "/#process" },
      { label: "FAQ", href: "/#faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

// The giant wordmark is drawn in the site's ///////// hatch.
const hatchText = {
  backgroundImage: "repeating-linear-gradient(135deg, #0b0b0c 0 2px, transparent 2px 9px)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

/** The brief a visitor would send us, as a perforated ticket. */
function BriefTicket({ index }: { index: number }) {
  const b = briefs[index];
  const fields = [
    ["Scope", b.scope],
    ["Deadline", b.deadline],
    ["Budget", b.budget],
  ];
  return (
    <div className="relative w-full max-w-[360px] rotate-[2.5deg] rounded-[20px] bg-white text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] transition-transform duration-500 hover:rotate-0">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45">Project brief</p>
          <p className="font-wordmark text-[18px] leading-none">VORQ</p>
        </div>
        <dl className="mt-5">
          {fields.map(([label, value]) => (
            <div key={label} className="border-t border-black/[0.07] py-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">{label}</dt>
              <dd className="mt-1 h-7 overflow-hidden text-lg font-medium tracking-[-0.02em]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={value}
                    className="block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {value}
                  </motion.span>
                </AnimatePresence>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Perforation, with notches cut in the colour of the card behind. */}
      <div className="relative mx-5 border-t-2 border-dashed border-black/15" aria-hidden="true">
        <span className="absolute -left-[31px] -top-[11px] h-5 w-5 rounded-full bg-ink" />
        <span className="absolute -right-[31px] -top-[11px] h-5 w-5 rounded-full bg-ink" />
      </div>

      <div className="flex items-end justify-between gap-4 p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">Fixed quote</p>
          <p className="mt-1 font-medium">Within 24 hours</p>
        </div>
        <span
          aria-hidden="true"
          className="h-10 w-24"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #0b0b0c 0 2px, transparent 2px 4px, #0b0b0c 4px 5px, transparent 5px 8px, #0b0b0c 8px 11px, transparent 11px 13px)",
          }}
        />
      </div>
    </div>
  );
}

export function VorqFooter() {
  const { index, text } = useTypewriter(words);

  return (
    <footer className="bg-white pt-4">
      <div className="vorq-container">
        {/* Call to action */}
        <div className="shell">
          <div className="panel-ink relative isolate grid items-center gap-12 overflow-hidden px-3 sm:px-6 py-12 md:px-12 md:py-16 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.07)_0_1px,transparent_1px_8px)] [mask-image:radial-gradient(60%_90%_at_88%_50%,#000_20%,transparent_75%)]"
            />
            <div>
              <p className="eyebrow text-white/45">Start a project</p>
              <h2 className="mt-8 text-[clamp(40px,5.4vw,88px)] leading-[1] tracking-[-0.045em]">
                <span className="sr-only">Let&apos;s build something great together.</span>
                <span aria-hidden="true" className="block">
                  Let&apos;s build
                </span>
                <span aria-hidden="true" className="flex h-[1.15em] items-center whitespace-nowrap">
                  <span className="text-white/35">{"{"}</span>
                  <span className="font-quirk px-[0.06em] text-[0.82em] tracking-normal text-accent-soft">{text}</span>
                  <span className="h-[0.8em] w-[3px] animate-pulse bg-current" />
                  <span className="text-white/35">{"}"}</span>
                </span>
                <span aria-hidden="true" className="block">
                  together.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-white/60">
                Send the work, the deadline and the budget. You get a fixed scope and a fixed price within 24 hours.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end lg:pr-4">
              <BriefTicket index={index} />
            </div>
          </div>

          <ul className="mt-2 grid gap-2 md:grid-cols-3">
            {actions.map(({ title, body, href, Icon }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="panel group flex h-full items-center gap-4 px-2 py-4 sm:px-4 transition-colors duration-200 hover:bg-mist md:p-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mist transition-colors duration-200 group-hover:bg-ink group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-xl font-medium tracking-[-0.02em]">{title}</span>
                    <span className="mt-0.5 block text-[15px] text-muted">{body}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer proper: the studio on the left, the links grouped on the right. */}
        <div className="shell mt-4">
          <div className="panel flex flex-col gap-12 px-3 py-6 sm:px-6 md:p-10 lg:flex-row lg:justify-between">
            <div className="max-w-sm">
              <p className="font-wordmark text-[40px] leading-none">VORQ</p>
              <p className="mt-4 leading-relaxed text-muted">
                Independent design engineering studio. Websites, products and tools of our own.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-block text-lg font-medium underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
              >
                {site.email}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:flex sm:gap-20 lg:gap-24">
              {columns
                .filter((col) => col.links.length)
                .map((col) => (
                  <div key={col.title}>
                    <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink/40">{col.title}</p>
                    <ul className="mt-5 space-y-3">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          {"external" in l ? (
                            <a href={l.href} target="_blank" rel="noreferrer" className="text-ink/70 transition-colors hover:text-ink">
                              {l.label}
                            </a>
                          ) : (
                            <Link href={l.href} className="text-ink/70 transition-colors hover:text-ink">
                              {l.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div className="well mt-2 flex flex-col gap-1 px-2.5 sm:px-5 py-3.5 text-sm text-ink/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} VORQ. Based in India, building with founders everywhere.</p>
            <p className="flex gap-5">
              <Link href="/terms" className="transition-colors hover:text-ink">Terms</Link>
              <Link href="/privacy" className="transition-colors hover:text-ink">Privacy</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-hidden" aria-hidden="true">
        <p
          className="select-none text-center font-wordmark text-[25vw] leading-[0.8] tracking-[-0.02em] translate-y-[18%]"
          style={hatchText}
        >
          VORQ
        </p>
      </div>
    </footer>
  );
}
