
"use client";

import VorqNav from "../components/VorqNav";
import { VorqFooter } from "../components/VorqFooter";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React from "react";


import { useRouter } from "next/navigation";

const assets = {
    rocket: "/images/rock.png",
    freelance: "/images/free.png",
    devtools: "/images/dev.png"
};

export default function BlogPage() {
    const router = useRouter();
    const [cursorVisible, setCursorVisible] = React.useState(false);
    const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });

    const handleCardClick = (slug: string) => {
        router.push(`/blog/${slug}`);
    };

    React.useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => setCursorVisible(false);

    return (
        <main className="min-h-screen bg-white text-black font-[family-name:var(--font-archivo)] selection:bg-teal-500 selection:text-white mt-40 cursor-default">
            {/* Custom Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-24 h-24 bg-black text-white rounded-full flex items-center justify-center pointer-events-none z-[60] shadow-xl"
                animate={{
                    x: cursorPosition.x - 48, // Center horizontally (half of w-24 which is 96px / 2 = 48)
                    y: cursorPosition.y - 48, // Center vertically (half of h-24)
                    scale: cursorVisible ? 1 : 0,
                    opacity: cursorVisible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
                <span className="text-xs font-bold uppercase tracking-widest text-center px-2">Click to Open</span>
            </motion.div>

            <VorqNav />

            <div className="vorq-container mx-auto w-full max-w-7xl pt-32 pb-20 px-4 md:px-8 ">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-gray-900">
                        Blog
                    </h1>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[380px]">

                    {/* 1. Large Teal Card (Top Left) */}
                    <motion.div
                        onClick={() => handleCardClick('building-first-website')}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-[#0d9488] rounded-[2.5rem] p-10 relative overflow-hidden text-white flex flex-col justify-between group cursor-none"
                    >
                        {/* Background abstract shapes if needed */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(0,0,0,0.1)] to-transparent pointer-events-none" />

                        <div className="relative z-10 w-full md:w-[60%]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold uppercase tracking-widest opacity-80">Jan 6, 2026</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tighter mb-4">
                                When’s the Right Time to Build Your First Professional Website?
                            </h2>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-60 mt-8 block">Startup Growth</span>
                        </div>

                        {/* Badge */}
                        <div className="absolute top-8 right-8 bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-10">
                            <span className="text-xl">🔥</span>
                            <span className="text-sm font-bold">Latest Post</span>
                        </div>

                        {/* Rocket Image (Absolute Right) */}
                        <div className="absolute right-[-40px] bottom-[-40px] w-[350px] h-[350px] md:w-[450px] md:h-[450px] pointer-events-none transition-transform duration-500 hover:scale-110">
                            {/* Simple placeholder illustration for now */}
                            <Image
                                src={assets.rocket}
                                alt="Rocket"
                                width={450}
                                height={450}
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>

                    {/* 2. Subscribe Card (Top Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
                    >
                        <h3 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight mb-8">
                            Subscribe to our <span className="text-blue-500">newsletter</span> for industry insights
                        </h3>

                        <div className="w-full max-w-xs space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent border-b border-gray-200 py-3 text-center text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                            />
                            <button className="w-full bg-black text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(45,212,191,0.5)]">
                                Subscribe ↗
                            </button>
                        </div>
                    </motion.div>

                    {/* 3. Pink Card (Bottom Left) */}
                    <motion.div
                        onClick={() => handleCardClick('marketing-for-devtools')}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#f472b6] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden text-white flex flex-col justify-end group cursor-none"
                    >
                        {/* Icons Visual */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] w-full h-full flex justify-center items-center">
                            <div className="relative w-[120%] h-[120%] transition-transform group-hover:scale-105">
                                <Image
                                    src={assets.devtools}
                                    alt="DevTools vs Marketing"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3 block">DevTools Marketing</span>
                            <span className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2 block">Jan 5, 2026</span>
                            <h2 className="text-2xl md:text-3xl font-medium leading-[1.1] tracking-tighter">
                                Most Marketing Sites Don't Work for DevTools
                            </h2>
                        </div>
                    </motion.div>

                    {/* 4. Orange Card (Bottom Right) */}
                    <motion.div
                        onClick={() => handleCardClick('design-team-vs-freelancer')}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-[#fcd34d] rounded-[2.5rem] p-10 relative overflow-hidden text-gray-900 flex flex-col justify-end group cursor-none"
                    >
                        {/* Floating Cards Visual */}
                        <div className="absolute top-[-20px] right-[-20px] md:right-[20px] pointer-events-none w-[200px] h-[200px] md:w-[300px] md:h-[300px] hover:scale-110">
                            <Image
                                src={assets.freelance}
                                alt="Freelance Avatars"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="relative z-10 w-full md:w-[60%]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Startup Growth</span>
                            </div>

                            <div className="mb-auto"></div> {/* Spacer */}

                            <span className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2 block">Jan 2, 2026</span>
                            <h2 className="text-3xl md:text-4xl font-medium leading-[1.1] tracking-tighter mb-4">
                                Design Team or Freelancer: What Works for Startups
                            </h2>
                        </div>

                    </motion.div>

                </div>

            </div>

            <VorqFooter />
        </main>
    );
}
