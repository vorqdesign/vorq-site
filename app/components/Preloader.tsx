"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Vision", "Originality", "Reality", "Quality"];
const DURATION = 1400;

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Set before paint by the script in layout.tsx on repeat visits or reduced motion;
        // globals.css already hides the overlay then.
        if (document.documentElement.dataset.seen) return;

        document.body.style.overflow = "hidden";
        const start = performance.now();
        let frame = 0;
        let done: ReturnType<typeof setTimeout> | undefined;

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / DURATION);
            setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
            if (t < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                done = setTimeout(() => {
                    setLoading(false);
                    document.body.style.overflow = "";
                    try {
                        sessionStorage.setItem("vorq-seen", "1");
                    } catch {}
                }, 250);
            }
        };
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(done);
            document.body.style.overflow = "";
        };
    }, []);

    const word = words[Math.min(words.length - 1, Math.floor(progress / 25))];

    return (
        <AnimatePresence>
            {loading && (
                <div className="preloader fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
                    <div className="absolute inset-0 grid grid-cols-5">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ scaleY: 1 }}
                                exit={{ scaleY: 0 }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.07 }}
                                className="origin-top bg-[#111] border-r border-white/[0.04] last:border-r-0"
                            />
                        ))}
                    </div>

                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 flex items-center justify-center text-white"
                    >
                        <div className="flex flex-col items-center">
                            <p className="font-wordmark text-7xl md:text-9xl">VORQ</p>
                            <p className="mt-4 h-6 font-mono text-xs md:text-sm uppercase tracking-[0.5em] text-accent-soft">
                                {word}
                            </p>
                        </div>
                        <p className="absolute bottom-8 right-8 md:bottom-14 md:right-14 text-6xl md:text-8xl font-black opacity-20 tabular-nums">
                            {progress}%
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
