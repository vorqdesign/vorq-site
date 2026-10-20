"use client";

import { useRef } from "react";
import gsap from "gsap";
import { GridScan } from "./GridScan";
import MagnetLines from "./MagnetLines";
import FaultyTerminal from "./FaultyTerminal";
import Dither from "./Dither";

interface WhyVorqItem {
    id: number;
    title: string;
    description: string;
    span: string; // Tailwind class for grid span
    color: string; // Tailwind color class for hover effects
    hoverBg: string; // Tailwind background color for hover
}

const items: WhyVorqItem[] = [
    {
        id: 1,
        title: "The Three Things That Matter",
        description: "Lighthouse 90+, Framer Motion, conversion-focused design.",
        span: "md:col-span-2",
        color: "text-blue-400",
        hoverBg: "group-hover:bg-blue-500/10",
    },
    {
        id: 2,
        title: "Your Team, Not a Factory",
        description: "2+ specialists assigned to you. Direct access.",
        span: "md:col-span-1",
        color: "text-purple-400",
        hoverBg: "group-hover:bg-purple-500/10",
    },
    {
        id: 3,
        title: "Zero Templates. Pure Craft.",
        description: "Custom-built from scratch. Every line written for you.",
        span: "md:col-span-1",
        color: "text-emerald-400",
        hoverBg: "group-hover:bg-emerald-500/10",
    },
    {
        id: 4,
        title: "Global Standard, Local Dedication",
        description: "6+ years team experience. Global quaility.",
        span: "md:col-span-2",
        color: "text-orange-400",
        hoverBg: "group-hover:bg-orange-500/10",
    }
];

export function WhyVorqSection() {
    return (
        <section className="bg-[#050608] py-24 font-[family-name:var(--font-archivo)]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-16">
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        Why <span className="text-[#A855F7]">Vorq?</span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-white/10">
                    {items.map((item) => (
                        <BentoCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function BentoCard({ item }: { item: WhyVorqItem }) {
    return (
        <div className={`${item.span} group relative min-h-[300px] p-8 md:p-12 border-r border-b border-white/10 flex flex-col justify-between bg-[#050608] transition-colors duration-500 overflow-hidden`}>

            {/* Dither for Card 1 */}
            {item.id === 1 && (
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <Dither
                        waveColor={[0.3, 0.4, 0.6]} // Slight Blue tint
                        disableAnimation={false}
                        enableMouseInteraction={true}
                        mouseRadius={0.3}
                        colorNum={4}
                        waveAmplitude={0.3}
                        waveFrequency={3}
                        waveSpeed={0.05}
                    />
                </div>
            )}

            {/* GridScan for Card 2 */}
            {item.id === 2 && (
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <GridScan
                        sensitivity={0.55}
                        lineThickness={1}
                        linesColor="#392e4e"
                        gridScale={0.1}
                        scanColor="#FF9FFC"
                        scanOpacity={0.4}
                        enablePost
                        bloomIntensity={0.6}
                        chromaticAberration={0.002}
                        noiseIntensity={0.01}
                        enableWebcam={false} // Implicitly false based on request context, can enable if desired
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* MagnetLines for Card 3 */}
            {item.id === 3 && (
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none flex items-center justify-center overflow-hidden">
                    <MagnetLines
                        rows={20}
                        columns={20}
                        containerSize="250%"
                        lineColor="#34d399" // Emerald-400
                        lineWidth="1px"
                        lineHeight="20px"
                        baseAngle={0}
                        style={{ margin: "0 auto" }}
                    />
                </div>
            )}

            {/* FaultyTerminal for Card 4 */}
            {item.id === 4 && (
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <FaultyTerminal
                        scale={1.5}
                        gridMul={[2, 1]}
                        digitSize={1.2}
                        timeScale={1}
                        pause={false}
                        scanlineIntensity={1}
                        glitchAmount={1}
                        flickerAmount={1}
                        noiseAmp={1}
                        chromaticAberration={0}
                        dither={0}
                        curvature={0}
                        tint="#fb923c" // Orange-400
                        mouseReact={true}
                        mouseStrength={0.5}
                        pageLoadAnimation={false}
                        brightness={1}
                    />
                </div>
            )}

            {/* Hover Background Glow (Hidden for interactive cards) */}
            {item.id !== 1 && item.id !== 2 && item.id !== 3 && item.id !== 4 && (
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${item.hoverBg}`} />
            )}

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
                {/* Top Number */}
                <span className={`text-lg font-mono opacity-50 group-hover:opacity-100 transition-colors ${item.color}`}>
                    0{item.id}
                </span>

                {/* Bottom Content */}
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:translate-y-[-4px] transition-transform duration-300">
                        {item.title}
                    </h3>
                    <p className="text-gray-400 text-lg opacity-100 transform translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 delay-75">
                        {item.description}
                    </p>
                </div>
            </div>

        </div>
    );
}
