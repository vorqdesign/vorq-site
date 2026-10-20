"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const brandingWords = ["Vision", "Originality", "Reality", "Quality"];

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        // 1. Counter Logic
        if (counter < 100) {
            const timeout = setTimeout(() => {
                setCounter((prev) => prev + 1);
            }, 20); // 20ms * 100 = 2000ms total roughly
            return () => clearTimeout(timeout);
        } else {
            // 2. Finished loading
            setTimeout(() => {
                setIsLoading(false);
                document.body.style.cursor = "default";
                document.body.style.overflow = "auto";
            }, 500);
        }
    }, [counter]);

    useEffect(() => {
        // Word cycler
        if (isLoading) {
            const wordInterval = setInterval(() => {
                setCurrentWord((prev) => (prev + 1) % brandingWords.length);
            }, 400);
            return () => clearInterval(wordInterval);
        }
    }, [isLoading]);

    // Lock scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
                    {/* The 5 Columns */}
                    <div className="absolute inset-0 grid grid-cols-5 h-full w-full pointer-events-none">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ height: "100%" }}
                                exit={{ height: "0%" }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.76, 0, 0.24, 1], // "Awwwards" easing
                                    delay: i * 0.1, // Stagger
                                }}
                                className="bg-[#111] w-full relative border-r border-[#222]/50 last:border-r-0"
                            />
                        ))}
                    </div>

                    {/* Content Overlay - Absolute on top of columns */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center z-10 text-white"
                    >
                        {/* Central Info */}
                        <div className="flex flex-col items-center overflow-hidden">
                            <h1 className="text-8xl md:text-9xl font-black mix-blend-difference mb-4 font-[family-name:var(--font-sekuya)]">
                                VORQ
                            </h1>
                            <div className="h-8 overflow-hidden relative w-full flex justify-center">
                                <p className="text-sm md:text-lg font-mono uppercase tracking-[0.5em] text-[#A855F7]">
                                    {brandingWords[currentWord]}
                                </p>
                            </div>
                        </div>

                        {/* Big Counter Bottom Right */}
                        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20">
                            <p className="text-6xl md:text-8xl font-black opacity-20 tabular-nums">
                                {counter}%
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
