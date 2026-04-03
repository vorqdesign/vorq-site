"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Exceptional design skills matched by robust engineering.",
    name: "Aranyo Ray",
    role: "Co-founder",
    company: "SamaWritten",
  },
  {
    id: 2,
    quote:
      "The team understood our vision immediately. They didn\u2019t just build what we asked for; they improved upon it. Our conversion rates have doubled since the redesign.",
    name: "Ravi Pratap Singh",
    role: "Founder",
    company: "Open Dev Society",
  },
];

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animKey, setAnimKey] = useState(0);
  const [entering, setEntering] = useState(false);

  const current = testimonials[activeIndex];

  const goTo = useCallback((next: number) => {
    setEntering(true);
    setTimeout(() => {
      setActiveIndex(next);
      setAnimKey((k) => k + 1);
      setEntering(false);
    }, 400);
  }, []);

  const handleNext = useCallback(() => {
    goTo((activeIndex + 1) % testimonials.length);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(handleNext, 5000);
    return () => clearInterval(id);
  }, [activeIndex, isAutoPlaying, handleNext]);

  return (
    <section className="testi-section">
      <div className="testi-inner reveal">
        {/* Left — static heading */}
        <div className="testi-left">
          <div className="section-tag">What clients say</div>
          <h2 className="landing-h2">
            Real feedback.
            <br />
            No fluff.
          </h2>
        </div>

        {/* Right — rotating testimonial */}
        <div className="testi-right">
          <div className="testi-progress">
            <div key={animKey} className="testi-progress-bar animate" />
          </div>

          <div className={`testi-slide ${entering ? "entering" : ""}`}>
            <p className="testi-quote-text">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="testi-author">
              <div className="testi-author-avatar">
                {current.name.charAt(0)}
              </div>
              <div>
                <div className="testi-author-name">{current.name}</div>
                <div className="testi-author-role">
                  {current.role},{" "}
                  <span className="testi-company">{current.company}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="testi-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === activeIndex ? "active" : ""}`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  goTo(i);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
