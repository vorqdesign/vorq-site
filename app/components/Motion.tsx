"use client";

import { MotionConfig, motion } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** The hand-drawn loop that circles a word; draws itself once in view. */
export function DrawnCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute -left-3 -top-[18%] h-[140%] w-[125%] ${className}`}
      viewBox="0 0 200 100"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M 50 15 C 100 5 180 10 180 50 C 180 90 120 95 60 90 C 20 85 10 50 30 30 C 45 15 80 15 100 25"
        stroke="var(--color-accent)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
