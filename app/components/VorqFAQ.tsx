"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs, site } from "../content";

export function VorqFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad scroll-mt-24 bg-white">
      <div className="vorq-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-accent">FAQ</p>
          <h2 className="mt-4 text-[clamp(40px,5vw,72px)] leading-[0.98] tracking-[-0.045em]">
            Questions,
            <br />
            answered.
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
            Anything else? Write to{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
              {site.email}
            </a>{" "}
            or{" "}
            <Link href="/book" className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
              book a call
            </Link>
            .
          </p>
        </div>

        <div className="shell space-y-2">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`panel transition-shadow duration-300 ${isOpen ?"" : "hover:shadow-md"}`}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                  >
                    <span className="text-lg font-medium tracking-[-0.01em] md:text-[22px]">{item.q}</span>
                    <span
                      className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-ink text-white" : "bg-mist text-ink"
                      }`}
                      aria-hidden="true"
                    >
                      <span className="absolute h-[2px] w-3 rounded bg-current" />
                      <span
                        className={`absolute h-3 w-[2px] rounded bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl px-6 pb-6 text-[17px] leading-relaxed text-muted md:px-8 md:pb-8">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
