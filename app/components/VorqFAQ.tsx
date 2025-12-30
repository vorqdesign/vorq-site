"use client";

import { useState } from "react";

const faqItems = [
  {
    id: 1,
    question: "What makes VORQ different from other agencies?",
    answer:
      "VORQ is a small, focused team that designs and builds premium websites and interfaces specifically for ambitious founders. We combine product thinking with clean visual design and solid front‑end engineering, so what you launch is both beautiful and ready for real users."
  },
  {
    id: 2,
    question: "What exactly does VORQ do?",
    answer:
      "Right now we specialize in four core areas: web UI design, SaaS landing pages, marketing sites, and dashboards. We also handle basic website development in Webflow or Next.js, with light backend setup when needed, so you don’t have to coordinate multiple vendors."
  },
  {
    id: 3,
    question: "How does your process work from idea to launch?",
    answer:
      "We keep it simple: discovery, structure, design, build, launch. We start with a short workshop to understand your product and goals, then move into wireframes, high‑fidelity UI, and front‑end development. You see progress in clear stages, with feedback rounds at each step."
  },
  {
    id: 4,
    question: "Which tools and technologies do you use?",
    answer:
      "For design, we work primarily in Figma. For development, we use Webflow for faster marketing sites and Next.js for custom builds. For motion and interactions, we use Framer Motion and GSAP to create production‑grade animations that still perform well."
  },
  {
    id: 5,
    question: "Do you also write copy and help with content?",
    answer:
      "Yes, we can support basic copy and structure for your pages, especially around positioning and section hierarchy. For deeper brand storytelling or long‑form content, we collaborate with copywriters but always ensure the words and design work together."
  },
  {
    id: 6,
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope, but as a guideline: a focused SaaS or marketing landing page usually takes 2–4 weeks, a small marketing site 3–6 weeks, and a dashboard or more complex UI 4–8 weeks. We’ll give you a clear timeline before we start."
  },
  {
    id: 7,
    question: "How will we communicate during the project?",
    answer:
      "We keep communication straightforward: one shared channel for quick messages, a project board for tasks, and regular check‑ins on video to review work. You’ll always know what we’re working on and what’s coming next—no disappearing acts."
  },
  {
    id: 8,
    question: "Which time zones do you work with?",
    answer:
      "We’re based in India but work with clients across multiple time zones. We plan overlapping hours for North America, Europe, and Asia, and align key calls around your schedule so collaboration stays smooth."
  },
  {
    id: 9,
    question: "What happens after launch—do you offer ongoing support?",
    answer:
      "Yes. After launch, we can stay on for design and development support, small improvements, and new sections or pages. We can work on a monthly retainer or well‑defined mini‑projects, depending on what makes more sense for your team."
  }
];


export function VorqFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-white"
      style={{ fontFamily: "var(--font-archivo), 'Archivo', sans-serif" }}
    >
      <div className="vorq-container">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-20 xl:gap-32">
          {/* Left Sidebar - Sticky with CSS */}
          <div className="lg:w-[30%] lg:flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-3xl lg:text-6xl font-semibold text-[#000000]">FAQs</h2>
            <p className="mt-4 text-lg font-normal text-[#666666] leading-relaxed">
              Everything you need to know about our approach, process, and results.
            </p>
          </div>

          {/* Right Content Area - Scrolls */}
          <div className="flex-1">
            {/* Accordion Items */}
            <div className="flex flex-col gap-4">
              {faqItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-[#F5F5F5] rounded-2xl overflow-hidden transition-shadow duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center gap-5 px-6 py-5 md:px-8 md:py-5 text-left"
                    aria-expanded={openIndex === index}
                  >
                    {/* Arrow Icon */}
                    <span
                      className={`text-[#000000] transition-transform duration-300 ease-in-out flex-shrink-0 ${openIndex === index ? "rotate-90" : ""
                        }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>

                    {/* Question Text */}
                    <span className="text-lg md:text-4xl text-[#000000] leading-snug">
                      {item.question}
                    </span>
                  </button>

                  {/* Answer Content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 md:px-8 md:pb-7 pl-16 md:pl-[68px] text-base md:text-lg font-normal text-[#555555] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-10 bg-[#1A1A1A] rounded-3xl p-8 md:p-10 lg:px-12 lg:py-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
                {/* Text Content */}
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">
                    Still have questions?
                  </h3>
                  <p className="mt-3 text-base md:text-lg font-normal text-white/80 leading-relaxed">
                    Let&apos;s talk and we&apos;ll help you figure it out
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-3 bg-[#FF5722] text-[#fff] text-base font-semibold px-8 py-4 rounded-full transition-colors duration-200 whitespace-nowrap"
                >
                  Get in touch
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
