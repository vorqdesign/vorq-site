"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Page transition: five slices lift off the new page */}
            <div className="fixed inset-0 z-[100] grid grid-cols-5 pointer-events-none" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scaleY: 1 }}
                        animate={{ scaleY: 0 }}
                        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.05 + i * 0.04 }}
                        className="origin-top bg-[#111]"
                    />
                ))}
            </div>
            {children}
        </>
    );
}
