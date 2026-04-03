"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector("nav") as HTMLElement | null;
      if (!nav) return;
      if (window.scrollY > 60) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Set initial state
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    { id: "01", name: "Work", href: "/#work" },
    { id: "02", name: "Pricing", href: "/#pricing" },
    { id: "03", name: "Process", href: "/#process" },
    { id: "04", name: "Team", href: "/team" },
    { id: "05", name: "Book a Call", href: "/book", highlight: true },
  ];


  return (
    <>
      <nav>
        <a href="/" className="nav-logo">
          VORQ
        </a>

        <div className="nav-breadcrumb">
          <button 
            className={`nav-menu-toggle ${isMenuOpen ? "nav-menu-toggle--open" : ""}`}
            onClick={toggleMenu}
            data-cursor={isMenuOpen ? "Close" : "Menu"}
          >
            <div className="breadcrumb-icon">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>

        <div className="nav-right">
          <a href="/#work" className="nav-link">
            Work
          </a>
          <a href="/#pricing" className="nav-link">
            Pricing
          </a>
          <a href="/#process" className="nav-link">
            Process
          </a>
          <a href="/team" className="nav-link">
            Team
          </a>
          <a href="/book" className="nav-btn" data-cursor="Let's connect">
            Book a Call
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay — Refined & Airy */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="nav-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="nav-mobile-close" onClick={toggleMenu} data-cursor="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="nav-mobile-links">
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={link.highlight ? "nav-mobile-btn" : "nav-mobile-link"}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  data-index={link.id}
                >
                  {!link.highlight && <span className="nav-mobile-link-id">{link.id}</span>}
                  {link.name}
                  {link.highlight && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '12px' }}>
                      <path d="M4 14l10-10M14 4H7M14 4v7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>

            <motion.div 
              className="nav-mobile-footer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="nav-mobile-contact">
                <span>Email</span>
                <a href="mailto:hello@vorq.agency">hello@vorq.agency</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
