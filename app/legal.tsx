import type { ReactNode } from "react";
import VorqNav from "./components/VorqNav";
import { VorqFooter } from "./components/VorqFooter";
import { Reveal } from "./components/Motion";

/** Shared layout for Terms and Privacy: the headline, the short version in cards, then the full text. */
export function LegalPage({ title, updated, summary, children }: { title: string; updated: string; summary: string[]; children: ReactNode }) {
  return (
    <>
      <VorqNav />
      <main className="pb-24 pt-[120px] md:pb-32 md:pt-[150px]">
        <Reveal className="vorq-container">
          <p className="eyebrow text-accent">Legal</p>
          <h1 className="mt-4 text-[clamp(52px,8vw,120px)] leading-[0.92] tracking-[-0.05em]">{title}</h1>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45">Last updated {updated}</p>
        </Reveal>

        <Reveal className="vorq-container mt-10 md:mt-14">
          <div className="shell">
            <p className="px-3 pb-3 pt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink/45">The short version</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {summary.map((s, i) => (
                <li key={s} className="panel flex gap-4 px-3 py-5 sm:px-5">
                  <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="vorq-container mt-14 md:mt-20">
          <div className="article mx-auto max-w-[720px]">{children}</div>
        </div>
      </main>
      <VorqFooter />
    </>
  );
}
