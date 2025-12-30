"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const heroConfig = {
  titlePrefix: "We design & build",
  titleSuffix: "that actually converts",
  keywords: [
    {
      id: "saas",
      label: "SaaS landing pages",
      color: "#0066FF",
    },
    {
      id: "marketing",
      label: "marketing sites",
      color: "#00B4D8",
    },
    {
      id: "dashboard",
      label: "dashboards",
      color: "#06FFA5",
    },
    {
      id: "webui",
      label: "web UI designs",
      color: "#FF6B35",
    },
  ],
};

export function VorqHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentKeyword = heroConfig.keywords[currentIndex];
  const fullText = currentKeyword.label;

  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseBeforeDelete = 2000;
  const pauseBeforeNext = 500;

  const handleTypewriter = useCallback(() => {
    if (!isDeleting) {
      // Typing
      if (displayText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait then start deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseBeforeDelete);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next keyword
        const timeout = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % heroConfig.keywords.length);
          setIsDeleting(false);
        }, pauseBeforeNext);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, isDeleting, fullText]);

  useEffect(() => {
    const cleanup = handleTypewriter();
    return cleanup;
  }, [handleTypewriter]);

  // Reset displayText when currentIndex changes
  useEffect(() => {
    setDisplayText("");
  }, [currentIndex]);

  const renderSubtitleWithLogos = () => {
    return (
      <>
        We build premium websites and interactive products for ambitious founders. From rapid{" "}
        <span className="inline-flex items-center align-middle mx-1 translate-y-[-2px]">
          <Image src="/webflow.svg" alt="Webflow" width={100} height={16} className="w-16 md:w-24 h-auto" />
        </span>{" "}and{" "}
        <span className="inline-flex items-center align-middle mx-1 translate-y-[-2px]">
          <Image src="/framer.svg" alt="framer" width={100} height={16} className="w-16 md:w-24 h-auto" />
        </span>{" "}
        launches to custom{" "}
        <span className="inline-flex items-center align-middle mx-1 translate-y-[-2px]">
          <Image src="/next.svg" alt="Next.js" width={80} height={14} className="w-14 md:w-20 h-auto" />
        </span>{" "}
        applications with production-grade animations using{" "}
        <span className="inline-flex items-center align-middle mx-1 translate-y-[-2px]">
          <Image src="/motion.svg" alt="Framer Motion" width={60} height={14} className="w-10 md:w-16 h-auto" />
        </span>{" "}
        and{" "}
        <span className="inline-flex items-center align-middle mx-1 translate-y-[-2px]">
          <Image src="/gsap.svg" alt="GSAP" width={60} height={14} className="w-10 md:w-16 h-auto" />
        </span>
        —we handle the design, code, and delivery.
      </>
    );
  };

  // Find longest keyword for layout stability
  const longestKeyword = heroConfig.keywords.reduce((a, b) => a.label.length > b.label.length ? a : b).label;

  return (
    <section className="pt-36 md:pt-26 lg:pt-36 pb-10 md:pb-14 lg:pb-12">
      <div className="vorq-container">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto px-0 md:px-0">
          {/* H1 Heading */}
          <h1 className="vorq-h1 mb-6 flex flex-col items-center gap-2">
            <span className="text-6xl md:text-7xl lg:text-8xl">{heroConfig.titlePrefix}</span>

            <span className="inline-flex justify-center items-center text-4xl md:text-7xl lg:text-8xl leading-tight" style={{ color: currentKeyword.color }}>
              {"{"}
              {/* Fixed Minimal Height Container to reduce jumps */}
              <span className="inline-flex items-center justify-center min-h-[4.5rem] md:min-h-[6rem] lg:min-h-[7rem] mx-1 transition-all duration-300">
                <span className="inline-block text-center break-words max-w-[120vw]">
                  {displayText}
                  <span className="animate-pulse align-middle">|</span>
                </span>
              </span>
              {"}"}
            </span>

            <span className="text-6xl md:text-7xl lg:text-8xl">{heroConfig.titleSuffix}</span>
          </h1>

          {/* Subtitle */}
          <p className="vorq-subtitle max-w-3xl mb-10 text-lg md:text-xl lg:text-2xl leading-relaxed">
            {renderSubtitleWithLogos()}
          </p>

          {/* Button Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a href="#projects" className="vorq-btn-secondary w-full sm:w-auto">
              Explore Projects
            </a>
            <div className="vorq-glow-wrapper relative">
              <a href="#book" className="vorq-btn-primary w-full sm:w-auto relative z-10">
                Book a Call
              </a>

              {/* "It's FREE" Callout - Desktop Only */}
              <div className="hidden lg:block absolute left-[102%] top-1/2 -translate-y-1/2 w-48 pointer-events-none">
                <div className="relative -mt-6">
                  {/* Pink Text */}
                  <span
                    className="absolute -top-4 left-4 font-handwriting text-[#ff6f9c] font-bold text-xl whitespace-nowrap block"
                    style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
                  >
                    It's FREE!
                  </span>

                  {/* User Provided Complex Arrow SVG */}
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 256 256"
                    xmlSpace="preserve"
                    className="w-20 h-20 text-[#ff6f9c] transform rotate-270 translate-y-2"
                  >
                    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                      <path
                        d="M 17.418 0.016 c 0.036 0.004 0.071 0.005 0.107 0.011 c 0.979 0.13 1.738 0.959 1.738 1.973 v 9.704 c 0 1.104 -0.895 2 -2 2 s -2 -0.895 -2 -2 V 6.385 c -4.224 4.317 -6.945 9.85 -7.78 15.943 c -1.029 7.506 0.929 14.955 5.508 20.987 c 3.769 4.966 8.869 8.338 14.429 10.001 c 1.111 -8.229 5.362 -16.031 12.483 -21.437 c 10.258 -7.788 18.323 -6.538 22.112 -3.101 c 3.889 3.527 4.116 9.518 0.581 15.262 c -1.712 2.782 -4.223 5.44 -7.464 7.9 c -6.883 5.225 -15.387 7.457 -23.949 6.285 c -0.019 -0.002 -0.036 -0.005 -0.055 -0.007 c 0.11 5.796 1.988 11.61 5.754 16.57 c 4.579 6.031 11.232 9.919 18.734 10.946 c 7.503 1.027 14.956 -0.929 20.987 -5.507 c 0 0 0 0 0.001 -0.001 c 2.845 -2.159 5.024 -4.451 6.476 -6.811 c 0.579 -0.94 1.81 -1.234 2.751 -0.655 c 0.94 0.578 1.235 1.81 0.655 2.751 c -1.712 2.783 -4.223 5.441 -7.464 7.901 c -0.001 0.001 -0.003 0.002 -0.004 0.003 c -6.882 5.223 -15.385 7.453 -23.944 6.281 c -8.561 -1.172 -16.153 -5.608 -21.377 -12.49 c -4.491 -5.915 -6.659 -12.896 -6.57 -19.798 c -6.889 -1.848 -12.939 -5.9 -17.321 -11.673 c -4.316 -5.685 -6.59 -12.477 -6.59 -19.492 c 0 -1.478 0.101 -2.967 0.305 -4.456 C 4.447 15.02 7.419 8.865 12.019 4 H 7.559 c -1.104 0 -2 -0.895 -2 -2 s 0.895 -2 2 -2 h 9.704 C 17.316 0 17.366 0.012 17.418 0.016 z M 52.713 48.754 c 2.845 -2.16 5.024 -4.451 6.476 -6.81 c 1.283 -2.085 1.925 -4.122 1.925 -5.911 c 0 -1.721 -0.595 -3.212 -1.787 -4.293 c -2.864 -2.598 -9.233 -2.577 -17.008 3.324 c -6.339 4.812 -10.082 11.791 -10.983 19.128 C 38.646 55.295 46.375 53.565 52.713 48.754 z"
                        style={{ stroke: "none", fill: "currentColor", fillRule: "nonzero", opacity: 1 }}
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
