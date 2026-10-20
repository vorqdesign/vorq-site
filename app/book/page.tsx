"use client";

import Script from "next/script";
import VorqNav from "../components/VorqNav";
import { VorqFooter } from "../components/VorqFooter";

export default function BookPage() {
    return (
        <main className="min-h-screen bg-white relative overflow-hidden flex flex-col">
            <VorqNav />

            {/* Load Calendly script using Next.js Script for better performance */}
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
            />

            {/* Background enhancement */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#A855F7] opacity-[0.06] blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Main Content Container - Split Layout */}
            <div className="flex-1 vorq-container mt-30">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN: Text & Context */}
                    <div className="flex flex-col justify-center text-left relative lg:sticky lg:top-40">
                        <div className="relative inline-block mb-8">
                            <h1 className="vorq-h1 text-5xl md:text-7xl lg:text-8xl leading-tight">
                                Book a <br />
                                <span className="text-[#A855F7] relative inline-block">
                                    Call
                                    {/* Hand-drawn purple circle loop */}
                                    <svg
                                        className="absolute -top-6 -left-4 w-[130%] h-[150%] pointer-events-none z-0 opacity-90"
                                        viewBox="0 0 200 100"
                                        fill="none"
                                    >
                                        <path
                                            d="M 50 15 C 100 5 180 10 180 50 C 180 90 120 95 60 90 C 20 85 10 50 30 30 C 45 15 80 15 100 25"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </h1>

                            {/* Sparkle Decoration */}
                            <div className="absolute -top-8 right-10 w-8 h-8 text-[#FF5722] opacity-80 animate-pulse">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                </svg>
                            </div>
                        </div>

                        <p className="vorq-subtitle text-lg md:text-2xl text-gray-600 max-w-lg mb-12 leading-relaxed">
                            Ready to transform your vision into reality? Schedule a discovery call with our dedicated team.
                        </p>

                        <div className="relative pl-8 border-l-2 border-[#A855F7]/30">
                            <p className="text-gray-500 italic mb-2">"The team at Vorq didn't just build a website, they built our entire digital engine."</p>
                            <p className="font-semibold text-gray-900">— HillMan Media</p>
                        </div>

                        {/* Arrow Illustration pointing to the right (desktop) or down (mobile) */}
                        <div className="absolute bottom-[-20px] right-20 lg:right-[-40px] lg:top-[60%] w-24 h-24 lg:w-32 lg:h-32 pointer-events-none opacity-60 hidden md:block">
                            <svg
                                viewBox="0 0 256 256"
                                className="w-full h-full text-[#A855F7] transform rotate-[90deg] lg:rotate-[10deg]"
                            >
                                <g transform="scale(2.5) translate(5,5)">
                                    <path
                                        d="M 17.418 0.016 c 0.036 0.004 0.071 0.005 0.107 0.011 c 0.979 0.13 1.738 0.959 1.738 1.973 v 9.704 c 0 1.104 -0.895 2 -2 2 s -2 -0.895 -2 -2 V 6.385 c -4.224 4.317 -6.945 9.85 -7.78 15.943 c -1.029 7.506 0.929 14.955 5.508 20.987 c 3.769 4.966 8.869 8.338 14.429 10.001 c 1.111 -8.229 5.362 -16.031 12.483 -21.437 c 10.258 -7.788 18.323 -6.538 22.112 -3.101 c 3.889 3.527 4.116 9.518 0.581 15.262 c -1.712 2.782 -4.223 5.44 -7.464 7.9 c -6.883 5.225 -15.387 7.457 -23.949 6.285 c -0.019 -0.002 -0.036 -0.005 -0.055 -0.007 c 0.11 5.796 1.988 11.61 5.754 16.57 c 4.579 6.031 11.232 9.919 18.734 10.946 c 7.503 1.027 14.956 -0.929 20.987 -5.507 c 0 0 0 0 0.001 -0.001 c 2.845 -2.159 5.024 -4.451 6.476 -6.811 c 0.579 -0.94 1.81 -1.234 2.751 -0.655 c 0.94 0.578 1.235 1.81 0.655 2.751 c -1.712 2.783 -4.223 5.441 -7.464 7.901 c -0.001 0.001 -0.003 0.002 -0.004 0.003 c -6.882 5.223 -15.385 7.453 -23.944 6.281 c -8.561 -1.172 -16.153 -5.608 -21.377 -12.49 c -4.491 -5.915 -6.659 -12.896 -6.57 -19.798 c -6.889 -1.848 -12.939 -5.9 -17.321 -11.673 c -4.316 -5.685 -6.59 -12.477 -6.59 -19.492 c 0 -1.478 0.101 -2.967 0.305 -4.456 C 4.447 15.02 7.419 8.865 12.019 4 H 7.559 c -1.104 0 -2 -0.895 -2 -2 s 0.895 -2 2 -2 h 9.704 C 17.316 0 17.366 0.012 17.418 0.016 z M 52.713 48.754 c 2.845 -2.16 5.024 -4.451 6.476 -6.81 c 1.283 -2.085 1.925 -4.122 1.925 -5.911 c 0 -1.721 -0.595 -3.212 -1.787 -4.293 c -2.864 -2.598 -9.233 -2.577 -17.008 3.324 c -6.339 4.812 -10.082 11.791 -10.983 19.128 C 38.646 55.295 46.375 53.565 52.713 48.754 z"
                                        fill="currentColor"
                                    />
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Calendly Widget */}
                    <div className="w-full relative top-10 min-h-[600px] flex items-center justify-center">
                        {/* Decorative Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#A855F7]/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

                        {/* Loading Spinner - Absolute centered. Will be covered by widget when loaded (z-0 vs widget z-10 default) */}
                        <div className="absolute inset-0 flex items-center justify-center z-0">
                            <div className="w-12 h-12 border-4 border-[#A855F7]/20 border-t-[#A855F7] rounded-full animate-spin"></div>
                        </div>

                        <div
                            className="calendly-inline-widget w-full relative z-10"
                            data-url="https://calendly.com/vorqdesign/30min?primary_color=a855f7&hide_gdpr_banner=1"
                            style={{ minWidth: "360px", height: "1000px" }}
                        />
                    </div>

                </div>
            </div>

            <VorqFooter />
        </main>
    );
}
