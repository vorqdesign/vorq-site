import Link from "next/link";
import VorqNav from "./components/VorqNav";
import { VorqFooter } from "./components/VorqFooter";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <VorqNav />
      <main className="pb-24 pt-[120px] md:pb-32 md:pt-[150px]">
        <section className="vorq-container">
          <p className="eyebrow text-accent">404</p>
          <h1 className="mt-4 text-[clamp(52px,8vw,120px)] leading-[0.92] tracking-[-0.05em]">
            This page
            <br />
            doesn’t exist.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">It may have moved, or the link has a typo. These go somewhere real:</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-dark">Home</Link>
            <Link href="/book" className="btn btn-outline">Book a call</Link>
            <Link href="/blog" className="btn btn-outline">Journal</Link>
          </div>
        </section>
      </main>
      <VorqFooter />
    </>
  );
}
