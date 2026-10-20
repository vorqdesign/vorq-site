"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

interface ServiceItem {
    id: number;
    title: string;
    span: string; // Tailwind class for grid span
    videoUrl: string;
}

const services: ServiceItem[] = [
    {
        id: 1,
        title: "SaaS Landing Pages",
        span: "md:col-span-2",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        id: 2,
        title: "Marketing Sites",
        span: "md:col-span-1",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
        id: 3,
        title: "Dashboards & Web UI",
        span: "md:col-span-1",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
        id: 4,
        title: "Webflow Development",
        span: "md:col-span-1",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
        id: 5,
        title: "Next.js Development",
        span: "md:col-span-1",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        id: 6,
        title: "Framer Development",
        span: "md:col-span-1",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
        id: 7,
        title: "Shopify Store Setup",
        span: "md:col-span-2",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
        id: 8,
        title: "Website Redesign & Migration",
        span: "md:col-span-2",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
        id: 9,
        title: "Performance Optimization & SEO",
        span: "md:col-span-1",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    }
];

export function ServicesGrid() {
    return (
        <section className="bg-[#050608] py-24 px-0 md:px-0 font-[family-name:var(--font-archivo)]">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex justify-between items-end mb-16 px-2">
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        Our <span className="text-[#A855F7]">Services</span>
                    </h2>
                    <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
                        <span className="font-medium">View All</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-white/10">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service }: { service: ServiceItem }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            // videoRef.current.currentTime = 0; // Removed to prevent potential conflict with pending play
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    // Suppress AbortError which happens when pausing interrupts playing
                    if (error.name === 'AbortError' || error.message.includes('interrupted')) {
                        // silently ignore
                    } else {
                        console.log("Video playback failed", error);
                    }
                });
            }
            gsap.to(videoRef.current, { opacity: 0.6, duration: 0.5, overwrite: true });
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            gsap.to(videoRef.current, {
                opacity: 0,
                duration: 0.3,
                overwrite: true,
                onComplete: () => {
                    if (videoRef.current) {
                        try {
                            videoRef.current.pause();
                        } catch (e) {
                            // ignore pause errors
                        }
                    }
                }
            });
        }
    };

    // Mobile Auto-play logic
    useEffect(() => {
        // Only run on devices that don't support hover (touch devices)
        if (window.matchMedia("(hover: none)").matches) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            handleMouseEnter();
                        } else {
                            handleMouseLeave();
                        }
                    });
                },
                { threshold: 0.6 } // Trigger when 60% visible
            );

            const card = videoRef.current?.parentElement?.parentElement;
            if (card) {
                observer.observe(card);
            }

            return () => {
                if (card) observer.unobserve(card);
            };
        }
    }, []);

    return (
        <div
            className={`${service.span} relative group h-[300px] md:h-[400px] border-r border-b border-white/10 overflow-hidden bg-[#050608]`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Hover Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    src={service.videoUrl}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-0"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 pointer-events-none">
                {/* Top Left Icon/Circle */}
                <div className="w-3 h-3 rounded-full border border-white/40 group-hover:bg-[#A855F7] group-hover:border-[#A855F7] transition-colors duration-300"></div>

                {/* Bottom Title */}
                <h3 className="text-2xl md:text-3xl font-medium text-white/80 group-hover:text-white transition-colors duration-300 transform group-hover:-translate-y-2">
                    {service.title}
                </h3>
            </div>
        </div>
    );
}
