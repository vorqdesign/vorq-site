"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Using Simple Icons CDN for brand logos
const tools = [
    { name: "Next.js", slug: "nextdotjs", color: "white" },
    { name: "TypeScript", slug: "typescript", color: "3178C6" },
    { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
    { name: "Framer", slug: "framer", color: "white" },
    { name: "Vercel", slug: "vercel", color: "white" },
    { name: "GreenSock", slug: "greensock", color: "88CE02" },
    { name: "Figma", slug: "figma", color: "F24E1E" },
    { name: "Webflow", slug: "webflow", color: "4353FF" },
    { name: "Shopify", slug: "shopify", color: "96BF48" },
    { name: "Wix", slug: "wix", color: "white" },
    { name: "React", slug: "react", color: "61DAFB" },
    { name: "Node.js", slug: "nodedotjs", color: "339933" },
    { name: "Prisma", slug: "prisma", color: "white" },
];

export function ToolStack() {
    const sectionRef = useRef<HTMLElement>(null);
    const spiralRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current || !spiralRef.current) return;

            const items = gsap.utils.toArray(".tool-item") as HTMLElement[];

            // Configuration
            const radius = 650;
            const depthSpacing = 250;
            // We want items to start "behind" us or spread out in front, and move "in"
            // Let's arrange them from Z=0 to Z=Total (Positive)
            // Then move container naturally deep?
            // Actually, let's keep Z positive and move container negative.

            // Re-ordering items to loop correctly might be needed, but let's just reverse the Z placement.
            items.forEach((item, i) => {
                const angle = i * 45;
                const z = i * depthSpacing; // Positive Z (Coming towards camera / Behind camera)

                gsap.set(item, {
                    z: z,
                    x: radius * Math.cos((angle * Math.PI) / 180),
                    y: radius * Math.sin((angle * Math.PI) / 180),
                    rotationZ: angle,
                });
            });

            const totalTravel = items.length * depthSpacing + 1000;

            // Re-usable update function for Depth of Field effect
            const updateDepthOfField = () => {
                const containerZ = gsap.getProperty(spiralRef.current, "z") as number;

                items.forEach((item, i) => {
                    const initialZ = i * depthSpacing; // Positive
                    const currentZ = initialZ + containerZ; // Container moves negative, so Z decreases

                    // currentZ logic:
                    // > 500: Behind camera/Just entering (Too close/invisible)
                    // 500 to -1000: Visible sweet spot
                    // < -1000: Fading into distance

                    if (currentZ > 1000) {
                        // Too far behind / hasn't entered
                        gsap.set(item, { opacity: 0 });
                    } else if (currentZ > 200) {
                        // Entrance Fade In (200 to 1000 range)
                        // Map 1000 -> 0 opacity, 200 -> 1 opacity
                        const opacity = gsap.utils.clamp(0, 1, 1 - (currentZ - 200) / 800);
                        gsap.set(item, { opacity: opacity, filter: "blur(0px)" });
                    } else if (currentZ > -2500) {
                        // Full visibility range (200 down to -2500)
                        // But let's fade out at the end (-1500 to -2500)
                        if (currentZ < -1500) {
                            const fadeOut = gsap.utils.clamp(0, 1, 1 - (-currentZ - 1500) / 1000);
                            const blur = (1 - fadeOut) * 20;
                            gsap.set(item, { opacity: fadeOut, filter: `blur(${blur}px)` });
                        } else {
                            gsap.set(item, { opacity: 1, filter: "blur(0px)" });
                        }
                    } else {
                        // Too far away
                        gsap.set(item, { opacity: 0 });
                    }
                });
            };

            // Initial call to set state
            updateDepthOfField();

            // Animate INWARD (Container Z goes negative)
            gsap.to(spiralRef.current, {
                z: -totalTravel, // Move deep into screen
                rotationZ: -360, // Spin opposite way for feel?
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400%",
                    scrub: 1,
                    pin: true,
                    onUpdate: updateDepthOfField
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Duplicate list multiple times
    const displayTools = [...tools, ...tools, ...tools, ...tools];

    return (
        <section
            ref={sectionRef}
            className="h-screen w-full bg-[#050608] text-white relative overflow-hidden flex items-center justify-center -mt-[1px]"
            style={{ perspective: "800px" }}
        >
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                {/* Removed center backdrop blur */}

                <h2 className="text-5xl md:text-8xl font-bold text-center tracking-tighter text-white mb-4 relative z-10">
                    Tools We Use
                </h2>
                <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide relative z-10">
                    The modern stack
                </p>
            </div>

            {/* 3D Spiral Container */}
            <div
                ref={spiralRef}
                className="relative w-full h-full flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
            >
                {displayTools.map((tool, i) => (
                    <div
                        key={`${tool.name}-${i}`}
                        className="tool-item absolute flex items-center justify-center w-40 h-40 md:w-56 md:h-56"
                        title={tool.name}
                    >
                        {/* Using Simple Icons CDN */}
                        <img
                            src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
                            alt={tool.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/80 to-black pointer-events-none z-30" />
        </section>
    );
}
// End of file
