"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
    company: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Vorq transformed our outdated platform into a cutting-edge SaaS solution. The attention to detail in the UI and the smoothness of the animations are simply world-class.",
        name: "Sarah Jenkins",
        role: "CTO",
        company: "FinTech Global",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
    },
    {
        id: 2,
        quote: "The team understood our vision immediately. They didn't just build what we asked for; they improved upon it. Our conversion rates have doubled since the redesign.",
        name: "David Chen",
        role: "Head of Product",
        company: "Lumina Commerce",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 3,
        quote: "Working with Vorq was seamless. Their expertise in Next.js and performance optimization helped us achieve a perfect 100 on Lighthouse scores.",
        name: "Elena Rodriguez",
        role: "Founder",
        company: "Nexus AI",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop"
    },
    {
        id: 4,
        quote: "Exceptional design skills matched by robust engineering. They handled our complex migration with zero downtime and improved our SEO rankings significantly.",
        name: "Michael Ross",
        role: "VP of Engineering",
        company: "Aerospace Direct",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
    }
];

export function TestimonialSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slideRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex, isAutoPlaying]);

    // Animations when activeIndex changes
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Text Animation (Fade In Up)
            gsap.fromTo(textRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            // Progress Bar Reset
            gsap.fromTo(progressRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 5, ease: "none", overwrite: true }
            );

        });

        return () => ctx.revert();
    }, [activeIndex]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleManualNext = () => {
        setIsAutoPlaying(false);
        handleNext();
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const handleManualPrev = () => {
        setIsAutoPlaying(false);
        handlePrev();
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const currentTestimonial = testimonials[activeIndex];

    return (
        <section className="relative w-full h-auto min-h-[500px] flex flex-col md:flex-row bg-white overflow-hidden font-[family-name:var(--font-archivo)] mt-24">

            {/* LEFT COLUMN (40%) */}
            <div className="w-full md:w-[40%] bg-[#050608] relative flex flex-col justify-between p-8 md:p-12 text-white overflow-hidden">

                {/* Abstract Background Elements (Meaningful Shapes) */}
                <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                    {/* Dot Grid Pattern - Represents Structure/Data */}
                    <div className="absolute top-0 right-0 p-6 opacity-30">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="text-white">
                            {[0, 20, 40, 60, 80].map(x =>
                                [0, 20, 40, 60, 80].map(y => (
                                    <circle key={`${x}-${y}`} cx={x + 5} cy={y + 5} r="1.5" />
                                ))
                            )}
                        </svg>
                    </div>

                    {/* Concentric Circles - Represents Focus/Target */}
                    <svg className="absolute bottom-[-10%] left-[-10%] w-64 h-64 text-[#A855F7]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="100" cy="100" r="40" strokeOpacity="0.4" />
                        <circle cx="100" cy="100" r="70" strokeOpacity="0.3" />
                        <circle cx="100" cy="100" r="100" strokeOpacity="0.2" />
                        <circle cx="100" cy="100" r="130" strokeOpacity="0.1" strokeDasharray="4 4" />
                    </svg>

                    {/* Geometric Accent Line - Represents Growth/Trajectory */}
                    <svg className="absolute top-1/4 right-0 w-full h-full text-white/20" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M 300 0 L 300 100 L 200 200 L 50 200" strokeDasharray="10 5" />
                        <circle cx="200" cy="200" r="3" fill="currentColor" />
                    </svg>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10">
                    <h2 className="text-sm font-bold tracking-widest uppercase mb-4 opacity-80 pl-1 text-[#A855F7]">Testimonials</h2>
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                        Trusted by <br />
                        <span className="text-white">Industry Leaders</span>
                    </h3>
                </div>

                {/* Navigation Buttons */}
                <div className="relative z-10 flex items-center gap-4 mt-8 md:mt-0">
                    <button
                        onClick={handleManualPrev}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={handleManualNext}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* RIGHT COLUMN (60%) */}
            <div className="w-full md:w-[60%] bg-white flex flex-col justify-center p-8 md:p-16 relative">
                {/* Progress Bar (Top) */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                    <div ref={progressRef} className="h-full bg-[#A855F7] origin-left"></div>
                </div>

                <div ref={textRef} className="max-w-3xl relative z-10">
                    <Quote className="w-10 h-10 text-[#A855F7]/30 mb-6" />

                    <p className="text-xl md:text-3xl font-medium text-gray-900 leading-tight mb-8">
                        &quot;{currentTestimonial.quote}&quot;
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-gray-900">
                                {currentTestimonial.name}
                            </span>
                            <span className="text-base text-gray-500 font-medium">
                                {currentTestimonial.role}, <span className="text-[#A855F7]">{currentTestimonial.company}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Counter (Bottom Right) */}
                <div className="absolute bottom-6 right-8 text-6xl font-black text-gray-100 select-none pointer-events-none">
                    0{currentTestimonial.id}
                </div>
            </div>

        </section>
    );
}
