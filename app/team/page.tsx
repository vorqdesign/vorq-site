"use client";

import VorqNav from "../components/VorqNav";
import { VorqFooter } from "../components/VorqFooter";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const teamMembers = [
    {
        name: "Priyanshu Bhardwaj",
        role: "Co-Founder | Designer & Developer",
        image: "/cofounder1.jpg",
        bio: "Handling end-to-end execution. From initial concept and design systems to the final line of code and deployment.",
        socials: ["Twitter", "LinkedIn"]
    },
    {
        name: "Ravi Pratap Singh",
        role: "Co-Founder | Designer & Developer",
        image: "/cofounder2.jpg",
        bio: "Obsessed with details. Ensuring every pixel is perfect and every interaction feels seamless and responsive.",
        socials: ["Instagram", "Behance"]
    }
];

export default function TeamPage() {
    const containerRef = useRef(null);

    return (
        <main ref={containerRef} className="min-h-screen bg-white text-black font-[family-name:var(--font-archivo)] selection:bg-black selection:text-white">
            <VorqNav />

            {/* Main Content Container - Split Layout */}
            <div className="vorq-container mt-30 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN: Sticky Text */}
                    <div className="flex flex-col justify-center text-left relative lg:sticky lg:top-40 mt-40">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h1 className="vorq-h1 text-[12vw] md:text-[8vw] lg:text-7xl leading-[0.9] font-black tracking-tighter mb-8 uppercase">
                                We act <br />
                                <span className="text-[#A855F7] relative inline-block">as one.</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="vorq-subtitle text-xl md:text-2xl text-[#555] leading-relaxed max-w-lg font-light border-l border-black/10 pl-6"
                        >
                            No layers, no middlemen. Just pure craft. We build in the open and keep our clients involved at every step of the process.
                        </motion.p>
                    </div>

                    {/* RIGHT COLUMN: Team Images (Vertical Stack) */}
                    <div className="w-full flex flex-col gap-24 lg:pt-30">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="group relative w-full flex flex-col items-center"
                            >
                                {/* Arched Image Container */}
                                <div className="relative w-full max-w-[320px] aspect-[3/4] overflow-hidden rounded-t-[12rem] rounded-b-[1rem] bg-[#F4F4F4] transition-transform duration-500 hover:-translate-y-2 shadow-lg hover:shadow-xl">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        unoptimized
                                        priority={i === 0}
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                                    />
                                </div>

                                {/* Content Below */}
                                <div className="mt-8 text-center max-w-sm">
                                    <h2 className="text-3xl font-bold tracking-tight mb-2 text-black">{member.name}</h2>
                                    <p className="text-[#666] font-mono text-xs uppercase tracking-[0.2em] mb-4">
                                        {member.role}
                                    </p>

                                    <p className="text-[#444] text-sm leading-relaxed mb-6 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                        {member.bio}
                                    </p>

                                    <div className="flex gap-4 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {member.socials.map((social) => (
                                            <span key={social} className="text-xs font-mono uppercase text-[#999] hover:text-black transition-colors cursor-pointer tracking-wider border-b border-transparent hover:border-black">
                                                {social}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Values / Culture Section - Full Width Below */}
            <section className="relative z-10 py-24 md:py-40 bg-white border-t border-black/5">
                <div className="vorq-container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
                        <div className="md:w-1/3 md:sticky md:top-32 md:self-start h-fit">
                            <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-black font-[family-name:var(--font-archivo)]">DNA.</h2>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-1 gap-16">
                            {[
                                { title: "Obsessive Quality", desc: "We don't ship until it's pixel-perfect. Good enough is never good enough for us." },
                                { title: "Radical Transparency", desc: "We build in the open and keep our clients involved at every step of the process." },
                                { title: "Always Learning", desc: "Technology moves fast. We move faster. We're constantly exploring new tools and techniques." },
                                { title: "Design Driven", desc: "Design isn't just how it looks, it's how it works. We prioritize user experience above all else." }
                            ].map((item, i) => (
                                <div key={i} className="group border-t border-black/10 pt-8 flex flex-col md:flex-row gap-6 md:gap-12 hover:border-black transition-colors duration-500">
                                    <h3 className="text-2xl md:text-3xl font-bold w-full md:w-1/3">{item.title}</h3>
                                    <p className="text-[#555] text-lg leading-relaxed w-full md:w-2/3">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <VorqFooter />
        </main>
    );
}
