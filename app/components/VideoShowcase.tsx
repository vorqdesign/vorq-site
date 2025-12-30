"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const videoContainer = videoContainerRef.current;
    const video = videoRef.current;

    if (!section || !videoContainer || !video) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. PLAYBACK CONTROL (Runs on ALL screen sizes)
      ScrollTrigger.create({
        trigger: videoContainer,
        start: "top bottom", // When top of video enters bottom of viewport
        end: "bottom top",   // When bottom of video leaves top of viewport
        onEnter: () => {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => { }); // Catch AbortError
          }
        },
        onLeave: () => {
          // Wrap in try-catch or just call pause, but since we catch play error above, 
          // the abort error will be suppressed there. 
          // However, best practice is to check if we can pause.
          // But simple pause() is usually fine if play() catch is present.
          video.pause();
        },
        onEnterBack: () => {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => { });
          }
        },
        onLeaveBack: () => video.pause(),
      });

      // 2. DESKTOP ANIMATION (Pinned Scale/Radius)
      mm.add("(min-width: 768px)", () => {
        // Set initial state - scaled down with more rounded corners
        gsap.set(videoContainer, {
          scale: 0.75,
          borderRadius: "48px",
          transformOrigin: "center center",
        });

        // Create scroll-triggered animation
        gsap.to(videoContainer, {
          scale: 1,
          borderRadius: "24px",
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            end: "top 0%",
            scrub: 0.8,
            toggleActions: "play none none reverse",
          },
          ease: "power2.out",
        });
      });

      // MOBILE: No layout animation, but Playback Control above still applies.

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-20 bg-[#ffffff]"
    >
      <div className="vorq-container">
        {/* Video Container */}
        <div
          ref={videoContainerRef}
          className="relative w-full mx-auto aspect-video bg-[#111111] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Continuous Loop Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover absolute inset-0 z-10"
            muted
            loop
            playsInline
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />

          {/* Optional overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
}
