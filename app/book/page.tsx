"use client";

import Script from "next/script";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import LandingInteractions from "../components/LandingInteractions";
import { motion } from "framer-motion";

const perks = [
    { 
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" className="book-perk-svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ), 
        label: "Same-day response" 
    },
    { 
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="book-perk-svg">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8l-4 8h8l-4-8z" fill="currentColor" />
            </svg>
        ), 
        label: "Fixed price guarantee" 
    },
    { 
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="book-perk-svg">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ), 
        label: "Built from scratch" 
    },
    { 
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="book-perk-svg">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2s-7 7-9.5 5.5Z" />
                <path d="M8 5.44a17.58 17.58 0 0 0-4.5 4.5" />
            </svg>
        ), 
        label: "7-day avg. delivery" 
    },
];

export default function BookPage() {
    return (
        <main className="min-h-screen bg-[#f5f3ee] relative overflow-hidden flex flex-col">
            <div id="cursor" />
            <div id="cursor-ring"><span id="cursor-label" /></div>

            <SiteNav />

            {/* Load Calendly widget */}
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
            />

            {/* Decorative orb — top right */}
            <div
                className="pointer-events-none"
                style={{
                    position: "absolute",
                    top: "-120px",
                    right: "-80px",
                    width: "560px",
                    height: "560px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle at 40% 40%, rgba(232,184,75,0.10) 0%, rgba(217,79,30,0.07) 55%, transparent 80%)",
                    zIndex: 0,
                }}
            />

            {/* ── MAIN CONTENT ── */}
            <div className="book-wrap">
                <div className="book-grid">

                    {/* ── LEFT COLUMN ── */}
                    <div className="book-left">

                        {/* Eyebrow */}
                        <motion.div
                            className="book-tag"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="book-tag-line" />
                            Free discovery call
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            className="book-h1"
                            initial={{ opacity: 0, y: 36 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Book a<br />
                            <em>Call.</em>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="book-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Tell us what you need. We&apos;ll scope it, price it, and
                            get back to you within 24&nbsp;hours. No commitment required.
                        </motion.p>

                        {/* Perks */}
                        <motion.div
                            className="book-perks"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {perks.map((p) => (
                                <div key={p.label} className="book-perk">
                                    <span className="book-perk-icon">{p.icon}</span>
                                    <span className="book-perk-label">{p.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Testimonial quote */}
                        <motion.div
                            className="book-quote"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="book-quote-mark">"</div>
                            <p className="book-quote-text">
                                The team at VORQ didn&apos;t just build a website,
                                they built our entire digital engine.
                            </p>
                            <p className="book-quote-author">— HillMan Media</p>
                        </motion.div>
                    </div>

                    {/* ── RIGHT COLUMN: Calendly ── */}
                    <motion.div
                        className="book-right"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Loading spinner */}
                        <div className="book-spinner-wrap">
                            <div className="book-spinner" />
                        </div>

                        <div
                            className="calendly-inline-widget"
                            data-url="https://calendly.com/vorqdesign/30min?primary_color=d94f1e&hide_gdpr_banner=1&background_color=f5f3ee&text_color=0e0d0b"
                            style={{ minWidth: "320px", height: "700px", width: "100%", position: "relative", zIndex: 10 }}
                        />
                    </motion.div>

                </div>
            </div>

            <SiteFooter />
            <LandingInteractions />
        </main>
    );
}
