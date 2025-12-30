"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneCall, PencilRuler, Code2, Rocket, LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Step configuration with all animation details
interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  PrimaryIcon: LucideIcon;
  particleCount: number;
  particleDuration: [number, number];
  particleSpawnRate: number;
  particleSizeRange: [number, number];
  lineDurations: [number, number, number];
}

const stepsConfig: StepConfig[] = [
  {
    id: 1,
    title: "Discovery Call",
    subtitle: "We understand your product",
    description:
      "We dive deep into your vision, goals, and technical requirements. Through detailed conversations, we identify opportunities, challenges, and the best approach for your project.",
    color: "#3B82F6",
    PrimaryIcon: PhoneCall,
    particleCount: 20,
    particleDuration: [4, 6],
    particleSpawnRate: 0.1,
    particleSizeRange: [2, 8],
    lineDurations: [3, 3.5, 4],
  },
  {
    id: 2,
    title: "Design & Wireframes",
    subtitle: "You see the direction",
    description:
      "We create high-fidelity designs and interactive wireframes that bring your vision to life. Every pixel is intentional, every interaction is purposeful.",
    color: "#EC4899",
    PrimaryIcon: PencilRuler,
    particleCount: 20,
    particleDuration: [4, 6],
    particleSpawnRate: 0.1,
    particleSizeRange: [2, 8],
    lineDurations: [3, 3.5, 4],
  },
  {
    id: 3,
    title: "Development & Motion",
    subtitle: "We build and animate",
    description:
      "Our engineers bring designs to life with clean, performant code. We implement smooth animations and interactive elements that make your product feel alive and responsive.",
    color: "#10B981",
    PrimaryIcon: Code2,
    particleCount: 20,
    particleDuration: [3.5, 5.5],
    particleSpawnRate: 0.08,
    particleSizeRange: [2, 8],
    lineDurations: [2.5, 3, 3.5],
  },
  {
    id: 4,
    title: "Launch & Support",
    subtitle: "You go live, we stay close",
    description:
      "We handle deployment, monitoring, and ongoing support. Your success is our success. We're here to celebrate wins and optimize performance continuously.",
    color: "#F59E0B",
    PrimaryIcon: Rocket,
    particleCount: 22,
    particleDuration: [4, 6],
    particleSpawnRate: 0.09,
    particleSizeRange: [3, 10],
    lineDurations: [3, 3.5, 4],
  },
];

// Pre-generated particle data interface
interface ParticleData {
  id: number;
  duration: number;
  delay: number;
  size: number;
  startX: number;
  startY: number;
  yDrift: number;
}

// Generate particle data on client only
function generateParticleData(config: StepConfig): ParticleData[] {
  const particles: ParticleData[] = [];
  const [minDuration, maxDuration] = config.particleDuration;
  const [minSize, maxSize] = config.particleSizeRange;

  for (let i = 0; i < config.particleCount; i++) {
    particles.push({
      id: i,
      duration: minDuration + Math.random() * (maxDuration - minDuration),
      delay: i * config.particleSpawnRate,
      size: minSize + Math.random() * (maxSize - minSize),
      startX: Math.random() * 100,
      startY: 20 + Math.random() * 60,
      yDrift: Math.random() * 40 - 20,
    });
  }

  return particles;
}

// Particle Component
interface ParticleProps {
  color: string;
  data: ParticleData;
}

function Particle({ color, data }: ParticleProps) {
  const particleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!particleRef.current) return;

    const tl = gsap.timeline({ repeat: -1, delay: data.delay });

    tl.fromTo(
      particleRef.current,
      { x: -50, y: 0, opacity: 0 },
      {
        x: 400,
        y: data.yDrift,
        opacity: 0.6,
        duration: data.duration / 2,
        ease: "none",
      },
    ).to(particleRef.current, {
      opacity: 0,
      duration: data.duration / 2,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, [data]);

  return (
    <div
      ref={particleRef}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: data.size,
        height: data.size,
        backgroundColor: color,
        left: `${data.startX}%`,
        top: `${data.startY}%`,
        filter: `drop-shadow(0 0 4px ${color})`,
        opacity: 0,
      }}
    />
  );
}

// Particle System Component - Client Only
interface ParticleSystemProps {
  config: StepConfig;
}

function ParticleSystem({ config }: ParticleSystemProps) {
  const [particleData, setParticleData] = useState<ParticleData[] | null>(null);

  useEffect(() => {
    // Only generate particles on client side to avoid hydration mismatch
    setParticleData(generateParticleData(config));
  }, [config]);

  if (!particleData) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((data) => (
        <Particle key={data.id} color={config.color} data={data} />
      ))}
    </div>
  );
}

// Flow Lines Component
interface FlowLinesProps {
  color: string;
  durations: [number, number, number];
}

function FlowLines({ color, durations }: FlowLinesProps) {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const linePositions = [30, 50, 70];

  useLayoutEffect(() => {
    lineRefs.current.forEach((line, index) => {
      if (!line) return;

      gsap.fromTo(
        line,
        { x: -200 },
        {
          x: 400,
          duration: durations[index],
          repeat: -1,
          ease: "none",
        },
      );
    });
  }, [durations]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {linePositions.map((top, index) => (
        <div
          key={index}
          ref={(el) => {
            lineRefs.current[index] = el;
          }}
          className="absolute w-full h-px"
          style={{
            top: `${top}%`,
            backgroundColor: color,
            opacity: 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Primary Icon Component
interface PrimaryIconProps {
  Icon: LucideIcon;
  color: string;
  isRocket?: boolean;
}

function PrimaryIconDisplay({ Icon, color, isRocket }: PrimaryIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!iconRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    // Pulse animation
    tl.to(iconRef.current, {
      scale: 1.05,
      duration: 1.5,
      ease: "sine.inOut",
    }).to(iconRef.current, {
      scale: 1,
      duration: 1.5,
      ease: "sine.inOut",
    });

    // Rocket lift-off effect
    if (isRocket) {
      gsap.to(iconRef.current, {
        y: -5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [isRocket]);

  return (
    <div
      ref={iconRef}
      className="flex items-center justify-center rounded-2xl"
      style={{
        width: 80,
        height: 80,
        boxShadow: `0 0 20px 8px ${color}40`,
        backgroundColor: `${color}15`,
      }}
    >
      <Icon size={48} color={color} />
    </div>
  );
}

// Icon Assembly Component (Primary only - no companions)
interface IconAssemblyProps {
  config: StepConfig;
}

function IconAssembly({ config }: IconAssemblyProps) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Primary Icon */}
      <PrimaryIconDisplay Icon={config.PrimaryIcon} color={config.color} isRocket={config.id === 4} />
    </div>
  );
}

// Main Horizontal Scroll Section Component
export function HorizontalScrollSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container) return;

      // Calculate horizontal scroll distance
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Intro Circle Animation (Scrubbed)
      const introCircle = container.querySelector(".intro-circle-path") as SVGPathElement;
      if (introCircle) {
        const length = introCircle.getTotalLength();
        gsap.set(introCircle, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(introCircle, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "top top",
            scrub: 1,
          },
        });
      }

      // Step animations
      stepsRef.current.forEach((step) => {
        if (!step) return;

        const underlinePath = step.querySelector(".step-underline-path") as SVGPathElement;
        const iconAssembly = step.querySelector(".icon-assembly");
        const textContent = step.querySelector(".text-content");

        // Setup underline path
        if (underlinePath) {
          const len = underlinePath.getTotalLength();
          gsap.set(underlinePath, { strokeDasharray: len, strokeDashoffset: len });
        }

        // Icon Assembly entrance
        if (iconAssembly) {
          gsap.from(iconAssembly, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              containerAnimation: tween,
              start: "left center+=300",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Text content slide in
        if (textContent) {
          gsap.from(textContent, {
            x: -50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              containerAnimation: tween,
              start: "left center+=250",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Underline Flourish (SCRUBBED)
        if (underlinePath) {
          gsap.to(underlinePath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              containerAnimation: tween,
              start: "left center+=100",
              end: "center center",
              scrub: 1,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#050608] relative min-h-screen flex flex-col justify-center overflow-hidden font-[family-name:var(--font-archivo)]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-[at_center] from-white/5 to-transparent opacity-40 pointer-events-none" />

      <div ref={trackRef} className="flex flex-nowrap h-screen items-center relative z-10 px-8 md:px-16">
        {/* Intro Section */}
        <div className="min-w-[85vw] md:min-w-[40vw] pr-12 flex flex-col justify-center shrink-0 border-r border-white/5 mr-16">
          <div className="relative inline-block mb-6">
            <h2 className="text-6xl md:text-8xl font-bold text-white relative z-10 leading-tight">
              Here&apos;s
              <br />
              How We
              <br />
              <span className="relative inline-block px-2">
                Work
                {/* Hand-drawn purple circle loop */}
                <svg
                  className="absolute -top-3 -left-2 w-[115%] h-[130%] pointer-events-none z-0"
                  viewBox="0 0 200 100"
                  fill="none"
                >
                  <path
                    className="intro-circle-path opacity-90"
                    d="M 50 15 C 100 5 180 10 180 50 C 180 90 120 95 60 90 C 20 85 10 50 30 30 C 45 15 80 15 100 25"
                    stroke="#A855F7"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-xl max-w-sm">A seamless journey from chaos to clarity.</p>
        </div>

        {/* Steps */}
        {stepsConfig.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => {
              stepsRef.current[index] = el;
            }}
            className="min-w-[95vw] md:min-w-[70vw] lg:min-w-[80vw] h-[80vh] flex items-center justify-between px-4 md:px-16 relative shrink-0"
          >
            {/* Background gradient for this step */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 70% 50%, ${step.color}30 0%, transparent 50%)`,
              }}
            />

            {/* Flow Lines */}
            <FlowLines color={step.color} durations={step.lineDurations} />

            {/* Particle System */}
            <ParticleSystem config={step} />

            {/* Large Watermark Number */}
            <div
              className="absolute -top-32 -left-12 text-[14rem] md:text-[18rem] font-bold select-none pointer-events-none leading-none"
              style={{ color: `${step.color}08` }}
            >
              0{step.id}
            </div>

            {/* Text Content - Left Side (Full on mobile, 40% on desktop) */}
            <div className="text-content relative z-10 w-full md:w-2/5 max-w-2xl flex flex-col justify-center mb-8 md:mb-0">
              <div className="flex items-center gap-4 mb-4 md:hidden">
                {/* Mobile Icon */}
                <PrimaryIconDisplay Icon={step.PrimaryIcon} color={step.color} isRocket={step.id === 4} />
                <h4 className="text-lg font-medium tracking-wide" style={{ color: step.color }}>
                  Step 0{step.id}
                </h4>
              </div>

              <h4 className="hidden md:block text-xl font-medium tracking-wide mb-4" style={{ color: step.color }}>
                Step 0{step.id}
              </h4>

              <h3 className="text-3xl md:text-6xl font-bold text-white mb-6 relative inline-block">
                {step.title}
                {/* Underline Flourish */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-6 pointer-events-none opacity-80"
                  viewBox="0 0 200 20"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    className="step-underline-path"
                    d="M 5 15 Q 100 25 195 10"
                    stroke={step.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </h3>

              <p className="text-base md:text-2xl text-gray-400 leading-relaxed max-w-[280px] md:max-w-lg">
                <span className="text-white font-medium">{step.subtitle}</span> — {step.description}
              </p>
            </div>

            {/* Icon Assembly - Right Side (Hidden on mobile, 60% on desktop) */}
            <div className="icon-assembly hidden md:flex w-3/5 items-center justify-center relative">
              <IconAssembly config={step} />
            </div>
          </div>
        ))}

        {/* Outro Section */}
        <div className="min-w-[50vw] md:min-w-[30vw] flex flex-col justify-center items-center shrink-0 ml-5 pr-32 md:pr-48">
          <h3 className="text-5xl md:text-6xl font-bold text-white mb-8 text-center">
            Ready to
            <br />
            Launch?
          </h3>
          <button className="px-10 py-5 bg-[#FF5722] text-white rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300">
            Start Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default HorizontalScrollSection;
