import VorqNav from "../components/VorqNav";
import { VorqFooter } from "../components/VorqFooter";
import { Reveal } from "../components/Motion";
import { Journal } from "./Journal";
import { pageMeta } from "../seo";

export const metadata = pageMeta({
  title: "Journal: case studies and notes from the studio",
  description: "Case studies, engineering notes and plain advice on building landing pages, dashboards, web apps and mobile apps.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <VorqNav />
      <main className="pb-24 pt-[120px] md:pb-32 md:pt-[150px]">
        <section className="vorq-container">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-accent">Journal</p>
              <h1 className="mt-4 text-[clamp(52px,8vw,128px)] leading-[0.92] tracking-[-0.05em]">
                Notes from
                <br />
                the studio.
              </h1>
            </div>
            <p className="max-w-sm text-lg leading-relaxed text-muted">
              Case studies, engineering notes and plain advice on building for the web.
            </p>
          </Reveal>
          <Journal />
        </section>
      </main>
      <VorqFooter />
    </>
  );
}
