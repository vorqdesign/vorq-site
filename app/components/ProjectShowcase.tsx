"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ... imports
import Link from "next/link"; // Ensure Link is imported
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "NeoBank Finance",
        category: "Fintech Dashboard",
        description: "A complete overhaul of the banking experience with real-time data visualization and AI-driven insights.",
        backgroundColor: "#0F2027", // Solid color
        textColor: "#ffffff",
        tags: ["Next.js", "D3.js", "Tailwind"],
        badge: { text: "New Release", icon: "🔥" },
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Placeholder
        thumbnailUrl: "/thumbnail.png",
        link: "/projects/neobank"
    },
    {
        id: 2,
        title: "Lumina Fashion",
        category: "E-Commerce App",
        description: "Minimalist mobile-first shopping experience focusing on high-end luxury fashion brands.",
        backgroundColor: "#CFDEF3", // Solid color
        textColor: "#111827",
        tags: ["React Native", "Shopify", "Framer Motion"],
        badge: { text: "Best Design", icon: "🏆" },
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Placeholder
        thumbnailUrl: "/thumbnail.png",
        link: "/projects/lumina"
    },
    {
        id: 3,
        title: "Nexus AI Control",
        category: "SaaS Platform",
        description: "Enterprise-grade node-based workflow automation tool for machine learning pipelines.",
        backgroundColor: "#000000", // Solid color
        accent: "0 0 40px rgba(0, 255, 170, 0.2)",
        textColor: "#ffffff",
        tags: ["Vue", "WebGL", "Python"],
        badge: { text: "AI Powered", icon: "✨" },
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Placeholder
        thumbnailUrl: "/thumbnail.png",
        link: "/projects/nexus"
    },
    {
        id: 4,
        title: "Aerospace Direct",
        category: "Booking System",
        description: "Global flight booking engine processing millions of requests with sub-second latency.",
        backgroundColor: "#141E30", // Solid color
        textColor: "#ffffff",
        tags: ["React", "Go", "Redis"],
        badge: { text: "High Scale", icon: "🚀" },
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", // Placeholder
        thumbnailUrl: "/thumbnail.png",
        link: "/projects/aerospace"
    },
    {
        id: 5,
        title: "Explore All Projects",
        category: "Archive",
        description: "View our complete portfolio of digital experiences and case studies.",
        backgroundColor: "#ffffff",
        textColor: "#ffffff",
        tags: ["Case Studies", "Experiments", "Concepts"],
        badge: { text: "View Archive", icon: "📂" },
        // Explore card handles its own structure, but keeping fields for type safety/consistency if needed
        videoUrl: "",
        thumbnailUrl: "",
        link: "/archive"
    },
];
// ...

function ProjectCardContent({ project, index }: { project: typeof projects[0], index: number }) {
    // Check if this is the "Explore" card (id 5)
    if (project.id === 5) {
        return <ExploreCardContent />;
    }

    const cardRef = useRef<HTMLAnchorElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current || !cursorRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(cursorRef.current, {
            x: x,
            y: y,
            duration: 0.1,
            ease: "power2.out"
        });
    };

    const handleMouseEnter = () => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, overwrite: true });
        }
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name !== 'AbortError') {
                        console.log("Video play failed", error);
                    }
                });
            }
            gsap.to(videoRef.current, { opacity: 1, duration: 0.5, overwrite: true });
        }
    };

    const handleMouseLeave = () => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, overwrite: true });
        }
        if (videoRef.current) {
            gsap.to(videoRef.current, {
                opacity: 0,
                duration: 0.5,
                overwrite: true,
                onComplete: () => {
                    if (videoRef.current) {
                        try {
                            videoRef.current.pause();
                        } catch (e) { /* ignore */ }
                    }
                }
            });
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-4 md:p-8 bg-white border-r border-[#f0f0f0]">
            {/* Main Visual Area (Clickable) */}
            {/* We use Link to navigate */}
            <Link
                href={project.link}
                ref={cardRef}
                className="relative flex-1 w-full rounded-lg overflow-hidden group/card cursor-none block"
                style={{ backgroundColor: project.backgroundColor }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Custom Floating Cursor */}
                <div
                    ref={cursorRef}
                    className="absolute top-0 left-0 w-32 h-32 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm uppercase tracking-widest pointer-events-none z-50 opacity-0 scale-0 origin-center -translate-x-1/2 -translate-y-1/2 shadow-xl"
                >
                    Click to Open
                </div>

                {/* Inner Video/Thumbnail Container */}
                <div className="absolute inset-4 md:inset-16 bg-black/20 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10 shadow-2xl">
                    {/* Thumbnail Image (Always visible initially) */}
                    <div className="absolute inset-0 z-10">
                        <Image
                            src={project.thumbnailUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority={index < 2}
                        />
                    </div>

                    {/* Video (Visible on Hover) */}
                    <video
                        ref={videoRef}
                        src={project.videoUrl}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover absolute inset-0 z-20 opacity-0 transition-opacity duration-300 pointer-events-none"
                    />
                </div>

                {/* Floating Badge (Top Left) outside video container */}
                <div className="absolute top-5 left-5 z-30 bg-white backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                    <span className="text-lg">{project.badge.icon}</span>
                    <span className="text-md font-medium text-gray-900 tracking-wide">{project.badge.text}</span>
                </div>
            </Link>

            {/* Bottom Content Area */}
            <div className="mt-8 flex flex-col gap-6">

                {/* Tags Row */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                    <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                        {project.category}
                    </span>
                </div>

                {/* Title */}
                <div className="flex items-end justify-between">
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none tracking-tight">
                        {project.title}
                    </h3>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center gap-6 text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        <span>Live Deployment</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        <span>{project.category}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export function ProjectShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !leftColRef.current || !rightColRef.current) return;

            const mm = gsap.matchMedia();

            // DESKTOP ANIMATION (Pinned Split Scroll)
            mm.add("(min-width: 768px)", () => {
                const animatingProjects = projects.slice(1);

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: `+=${(animatingProjects.length + 0.5) * 100}%`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                animatingProjects.forEach((_, i) => {
                    const realIndex = i + 1;
                    tl.to(`.project-card-${realIndex}`, {
                        y: "0%",
                        ease: "none",
                        duration: 1
                    });
                });

                tl.to({}, { duration: 0.5 });
            });

            // MOBILE ANIMATION (Simple Fade Up) - Optional, or leave natural scroll
            // For now, simpler is better as requested.

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split projects into Left and Right lists for rendering
    // Left: Header + Projects 1, 3, 5...
    // Right: Projects 0, 2, 4...

    return (
        <section ref={containerRef} className="min-h-screen h-auto md:h-screen w-full flex flex-col md:flex-row overflow-hidden bg-white relative font-[family-name:var(--font-archivo)]">

            {/* LEFT COLUMN */}
            <div ref={leftColRef} className="w-full md:w-1/2 h-auto md:h-full relative border-r border-gray-100 flex flex-col md:block">
                {/* Header Card (Mobile: Relative top block. Desktop: Absolute base layer) */}
                <div className="relative md:absolute inset-0 flex flex-col justify-center p-6 md:p-24 bg-white z-0 shrink-0 h-auto md:min-h-0">
                    <h2 className="vorq-h1 mb-4 md:mb-6 text-5xl md:text-8xl">
                        Selected <span className="text-[#FF5722]">Work</span>
                    </h2>
                    <p className="vorq-subtitle text-lg md:text-2xl text-gray-500 max-w-lg mt-4 md:mt-8 leading-relaxed">
                        A curation of our most ambitious projects. We build digital products that define industries.
                    </p>
                    <div className="mt-8 md:mt-12 flex items-center gap-4">
                        <div className="w-16 h-[1px] bg-black/20"></div>
                        <span className="text-sm font-semibold tracking-widest uppercase text-black/40">Scroll to Explore</span>
                    </div>
                </div>

                {/* Left Side Projects */}
                {/* Mobile: Show ALL projects in stack. Desktop: Show only ODD indices (1, 3, 5...) */}
                {projects.map((project, index) => {
                    const isEven = index % 2 === 0;
                    const visibilityClass = isEven ? "block md:hidden" : "block";

                    // Mobile: Relative stack, aspect ratio for "card" look, no translation.
                    // Desktop: Absolute, translated down.

                    return (
                        <div
                            key={project.id}
                            className={`project-card-${index} relative md:absolute w-full md:w-full h-auto aspect-[4/5] md:aspect-auto md:h-full ${visibilityClass} translate-y-0 md:translate-y-[100%] mb-12 md:mb-0 last:mb-0 border border-gray-200 rounded-3xl md:border-none md:rounded-none overflow-hidden shadow-sm md:shadow-none`}
                            style={{
                                zIndex: index + 1,
                            }}
                        >
                            <div className="w-full h-full md:absolute md:inset-0">
                                <ProjectCardContent project={project} index={index} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT COLUMN (Hidden on Mobile) */}
            <div ref={rightColRef} className="hidden md:block w-1/2 h-full relative">
                {/* Right Side Projects (Even indices: 0, 2...) */}
                {projects.map((project, index) => {
                    if (index % 2 !== 0) return null; // Skip odd

                    // Index 0 is initially visible (y: 0), others start translated (y: 100%)
                    const isInitial = index === 0;

                    return (
                        <div
                            key={project.id}
                            className={`project-card-${index} absolute inset-0 w-full h-full ${isInitial ? '' : 'translate-y-[100%]'}`}
                            style={{
                                zIndex: index + 1,
                            }}
                        >
                            <ProjectCardContent project={project} index={index} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}


function ExploreCardContent() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-12 md:p-24 bg-white border-r border-[#f0f0f0] text-center relative overflow-hidden">

            <div className="relative z-10 max-w-2xl flex flex-col items-end gap-8 text-right ml-auto">
                <span className="text-3xl md:text-5xl font-light text-gray-900 leading-tight font-[family-name:var(--font-archivo)]">
                    We build a strong digital presence for SaaS products.
                    <span className="text-3xl md:text-5xl font-light text-[#FF5722] leading-tight font-[family-name:var(--font-archivo)]">
                        See how we've helped our customers achieve their goals.
                    </span>
                </span>

                <div className="vorq-glow-wrapper relative mt-8 before:!opacity-0 hover:before:!opacity-50 before:transition-all before:duration-500">
                    <button className="vorq-btn-primary px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 group relative z-10 w-auto">
                        Explore All Projects
                        <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </div>
    );
}


