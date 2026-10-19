"use client";

import { useEffect, useRef, useState } from "react";

export default function ShaderLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) video.pause();
      else if (video.paused) video.play().catch(() => {});
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <div className="bleed">
        <video
          ref={videoRef}
          src="/captures/forge.mp4"
          poster="/captures/forge-poster.jpg"
          width={1280}
          height={728}
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          aria-label="Mesh shader recorded from the live Gradient Forge studio"
        />
      </div>
      <p className="shader-actions">
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            if (video.paused) video.play().catch(() => {});
            else video.pause();
          }}
        >
          {paused ? "Play" : "Pause"} shader
        </button>
      </p>
    </>
  );
}
