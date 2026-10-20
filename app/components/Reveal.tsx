"use client";

import { useEffect, useRef } from "react";

function inView(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const height = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < height + 80 && rect.bottom > -80;
}

export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window) || inView(node)) return;

    document.documentElement.classList.add("js");
    node.dataset.reveal = "pending";

    const show = () => {
      node.dataset.show = "true";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        show();
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px 120px 0px" },
    );
    observer.observe(node);

    const onScroll = () => {
      if (inView(node)) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // If the observer never fires and nothing scrolls, still show the section.
    const failsafe = window.setTimeout(show, 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
