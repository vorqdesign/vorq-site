"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe } from "lucide-react";

const footerLinks = {
  cases: [
    { label: "Fitonist", href: "#" },
    { label: "Brainforest", href: "#" },
    { label: "Cybervergent", href: "#" },
    { label: "Nopan", href: "#" },
    { label: "Ramos", href: "#" },
  ],
  services: [
    { label: "SaaS Landing Pages", href: "#" },
    { label: "Marketing Sites", href: "#" },
    { label: "Dashboards & Web UI", href: "#" },
    { label: "Webflow Development", href: "#" },
    { label: "Next.js Development", href: "#" },
    { label: "Framer Development", href: "#" },
  ],
  about: [
    { label: "Our approach", href: "#" },
    { label: "Team", href: "#" },
    { label: "Why VORQ", href: "#" },
    { label: "Blog", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "Dribbble",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
  },
  {
    name: "Behance",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.211.924 2.405 2.967 2.405 1.146 0 2.13-.583 2.456-1.376h2.333zm-2.379-4.2c-.085-1.089-.86-2.02-2.365-2.02-1.59 0-2.36.966-2.46 2.02h4.825zM9.676 15.044c0 1.278-.877 2.277-2.627 2.277H2V5.043h4.906c1.818 0 3.075.896 3.075 2.693 0 1.094-.567 1.929-1.409 2.379.997.351 1.604 1.251 1.604 2.376v2.553zm-3.756-7.22H4.512v2.814h1.408c.766 0 1.326-.396 1.326-1.282 0-.886-.56-1.532-1.326-1.532zm.267 5.087H4.512v3.213h1.675c.97 0 1.511-.561 1.511-1.607 0-.932-.541-1.606-1.511-1.606z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const footerCardConfig = {
  titlePrefix: "Let's build",
  titleSuffix: "together",
  keywords: [
    {
      id: "something",
      label: "something great",
      color: "#FF5722",
    },
    {
      id: "future",
      label: "the future",
      color: "#8B5CF6",
    },
    {
      id: "dreams",
      label: "your dreams",
      color: "#22C55E",
    },
    {
      id: "success",
      label: "your success",
      color: "#0066FF",
    },
  ],
};

export function VorqFooter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentKeyword = footerCardConfig.keywords[currentIndex];
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
          setCurrentIndex((prev) => (prev + 1) % footerCardConfig.keywords.length);
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

  return (
    <footer className="bg-white pt-8">
      <div className="vorq-container">
        {/* Hero Card Section */}
        <div className="bg-[#0D0D0D] rounded-[32px] py-8 px-4 lg:p-12 lg:py-20  mb-16 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 max-w-xl">
              <h2 className="text-white text-4xl lg:text-5xl font-medium leading-tight mb-6">
                Build with us
              </h2>
              <p className="text-[#9CA3AF] text-base mb-8">
                We've helped ambitious founders ship SaaS landing pages,
                dashboards, and interactive products that convert.
              </p>
              <div className="flex gap-2 lg:gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#FF5722] text-white text-md lg:text-lg font-medium px-8 py-4 rounded-2xl hover:bg-[#E64A19] transition-colors duration-200"
                >
                  Start a project
                </a>
                <a
                  href="/book"
                  className="inline-flex items-center justify-center bg-[#2A2A2A] text-white text-md lg:text-lg font-medium px-8 py-4 rounded-2xl hover:bg-[#3A3A3A] transition-colors duration-200"
                >
                  Book a call
                </a>
              </div>
            </div>

            {/* Right Content - Dynamic Heading */}
            <div className="flex-1 flex items-center justify-center lg:justify-end">
              <div className="text-center lg:text-right">
                <h3 className="text-white text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight">
                  <span>{footerCardConfig.titlePrefix}</span>
                  <br />
                  <span
                    className="inline-block"
                    style={{ color: currentKeyword.color, minWidth: "200px" }}
                  >
                    {"{"}
                    <span className="inline-block text-left lg:text-right" style={{ minWidth: "20px" }}>
                      {displayText}
                      <span className="animate-pulse">|</span>
                    </span>
                    {"}"}
                  </span>
                  <br />
                  <span>{footerCardConfig.titleSuffix}</span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-12 mb-16 px-5 lg:px-10">
          {/* Left Side - Link Columns */}
          <div className="flex flex-wrap gap-16 lg:gap-24">
            {/* Cases Column */}
            <div>
              <h3 className="text-black text-xl lg:text-sm font-medium mb-5">Cases</h3>
              <ul className="flex flex-col gap-1 lg:gap-3">
                {footerLinks.cases.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#6B7280] text-lg lg:text-sm font-normal hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-black text-xl lg:text-sm font-medium mb-5">Services</h3>
              <ul className="flex flex-col gap-1 lg:gap-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#6B7280] text-lg lg:text-sm font-normal hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us Column */}
            <div>
              <h3 className="text-black text-xl lg:text-sm font-medium mb-5">About us</h3>
              <ul className="flex flex-col gap-1 lg:gap-3">
                {footerLinks.about.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#6B7280] text-lg lg:text-sm font-normal hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Email & Social & Book Button */}
          <div className="flex flex-col items-start lg:items-end gap-6 lg:gap-8">
            <div className="flex flex-col items-start lg:items-end">
              <a
                href="mailto:hello@vorq.agency"
                className="text-black text-3xl lg:text-5xl font-medium transition-opacity duration-200 mb-3 lg:mb-6 hover:underline"
              >
                hello@vorq.agency
              </a>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-[#333] transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Book a call Button (Moved here) */}
            <a
              href="#book"
              className="inline-flex items-center gap-2 bg-[#FF5722] text-white text-lg font-medium px-6 py-3 rounded-full hover:bg-[#E64A19] transition-colors duration-200"
            >
              Book a call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E5E5E5]">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-[#6B7280] text-sm font-normal">
            <style jsx>{`
              @keyframes globe-tilt {
                0% { transform: rotate(-35deg); }
                50% { transform: rotate(35deg); }
                100% { transform: rotate(-35deg); }
              }
            `}</style>
            <Globe
              className="w-5 h-5 text-[#6B7280] hover:text-[#FF5722] transition-colors"
              style={{ animation: "globe-tilt 2.5s ease-in-out infinite" }}
            />
            <p>
              Copyright © {new Date().getFullYear()} VORQ. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Large VORQ Text - Half Visible */}
      <div className="overflow-hidden mt-16">
        <div
          className="text-center select-none pointer-events-none"
          style={{
            fontFamily: "'Sekuya', serif",
            width: '100%',
            fontSize: 'clamp(100px, 25vw, 400px)',
            fontWeight: 400,
            lineHeight: 0.8,
            color: '#000000',
          }}
        >
          VORQ
        </div>
      </div>
    </footer>
  );
}
