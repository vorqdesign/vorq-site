"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Slices Overlay for Page Transition */}
            <div className="fixed inset-0 z-[100] grid grid-cols-5 h-screen w-screen pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ height: "100%" }}
                        animate={{ height: "0%" }}
                        transition={{
                            duration: 0.6,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.1 + i * 0.05, // Slightly faster stagger for pages
                        }}
                        className="bg-[#111] w-full relative border-r border-[#222]/20 last:border-r-0"
                    />
                ))}
            </div>

            {children}
        </>
    );
}
