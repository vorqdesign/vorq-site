import Script from "next/script";
import VorqNav from "../components/VorqNav";
import { VorqFooter } from "../components/VorqFooter";
import { DrawnCircle, Reveal } from "../components/Motion";
import { site } from "../content";
import { BookingPanel } from "./BookingPanel";
import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Book a free call",
  description: "Book a free 30-minute call with VORQ. Tell us what you're building and get a fixed scope and a fixed price within 24 hours.",
  path: "/book",
});

export default async function BookPage({ searchParams }: { searchParams: Promise<{ scope?: string; est?: string }> }) {
  const { scope, est } = await searchParams;
  const estimate = Number(est) || undefined;
  // The builder's scope rides along as the first Calendly answer, so the call starts with context.
  const calendly = scope ? `${site.calendly}&a1=${encodeURIComponent(`Scope: ${scope}`)}` : site.calendly;

  return (
    <>
      <VorqNav />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      <main className="pb-24 pt-[120px] md:pb-32 md:pt-[150px]">
        <div className="vorq-container">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-accent">Free · 30 minutes</p>
              <h1 className="mt-4 text-[clamp(56px,8vw,120px)] leading-[0.92] tracking-[-0.05em]">
                Book a{" "}
                <span className="relative inline-block px-2">
                  call
                  <DrawnCircle />
                </span>
              </h1>
            </div>
            <p className="max-w-sm text-lg leading-relaxed text-muted">
              Pick a time that suits you. Bring the work, the deadline and the budget, and leave with a clear next step.
            </p>
          </Reveal>
          <BookingPanel calendly={calendly} scope={scope} estimate={estimate} />
        </div>
      </main>
      <VorqFooter />
    </>
  );
}
