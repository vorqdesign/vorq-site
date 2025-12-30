"use client";

import { useState, useEffect, useRef } from "react";

export default function VorqNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
    { label: "Contact Us", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        // Hide navbar when scrolling down (after 100px)
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        className={`w-full bg-white fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="vorq-container">
          <div className="flex items-center justify-between py-6">
            {/* Logo */}
            <a href="/" className="vorq-logo">
              <span className="font-bold text-4xl" style={{ fontFamily: "'Sekuya', serif" }}>VORQ</span>
            </a>

            <div className="flex gap-12">
              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} className="vorq-nav-link">
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Desktop CTA Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                <a href="#quote" className="vorq-btn-secondary">
                  Request a Quote
                </a>
                <a href="#book" className="vorq-btn-primary">
                  Book a Call
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#111111] hover:text-[#000000] transition-colors duration-150"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-[#dddddd] pt-4">
              <div className="flex flex-col gap-4">

                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="vorq-nav-link py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[#dddddd]">
                  <a href="#quote" className="vorq-btn-secondary text-center">
                    Request a Quote
                  </a>
                  <a href="#book" className="vorq-btn-primary text-center">
                    Book a Call
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
