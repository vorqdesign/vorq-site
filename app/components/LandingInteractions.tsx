"use client";

import { useEffect } from "react";

export default function LandingInteractions() {
  useEffect(() => {
    /* ---- CUSTOM CURSOR ---- */
    const cur = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cur) {
        cur.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    function animRing() {
      // Smoother follow
      rx += (mx - rx) * 0.08;
      ry += (my - ry) * 0.08;
      if (ring) {
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animRing);
    }
    rafId = requestAnimationFrame(animRing);

    const cursorLabel = document.getElementById("cursor-label");
    const hoverEls = document.querySelectorAll(
      "a, button, .work-card, .price-card, .why-card, [data-cursor]"
    );
    const addHover = (e: Event) => {
      document.body.classList.add("cursor-hover");
      const target = e.currentTarget as HTMLElement;
      const labelText = target.getAttribute("data-cursor");
      if (labelText && cursorLabel) {
        cursorLabel.textContent = labelText;
        document.body.classList.add("cursor-label-active");
      }
    };
    const removeHover = () => {
      document.body.classList.remove("cursor-hover");
      document.body.classList.remove("cursor-label-active");
      if (cursorLabel) cursorLabel.textContent = "";
    };
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    /* ---- SCROLL REVEAL ---- */
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), i * 80);
            ro.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => ro.observe(el));

    /* ---- HERO ORB mouse-reactive parallax ---- */
    const heroOrb = document.querySelector("[data-hero-orb]") as HTMLElement | null;
    const onHeroMouseMove = (e: MouseEvent) => {
      if (!heroOrb) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1 to 1
      const dy = (e.clientY - cy) / cy;
      heroOrb.style.transform = `translate(${dx * 40}px, ${dy * 30}px)`;
    };
    document.addEventListener("mousemove", onHeroMouseMove);

    /* ---- MAGNETIC BUTTON ---- */
    const magneticBtns = document.querySelectorAll("[data-magnetic]") as NodeListOf<HTMLElement>;
    const magneticHandlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    magneticBtns.forEach((btn) => {
      const onMagMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const bx = rect.left + rect.width / 2;
        const by = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - bx, e.clientY - by);
        if (dist < 150) {
          const pull = 0.3;
          const tx = (e.clientX - bx) * pull;
          const ty = (e.clientY - by) * pull;
          btn.style.transform = `translate(${tx}px, ${ty}px) scale(1.04)`;
        } else {
          btn.style.transform = "";
        }
      };
      const onMagLeave = () => {
        btn.style.transform = "";
      };
      document.addEventListener("mousemove", onMagMove);
      btn.addEventListener("mouseleave", onMagLeave);
      magneticHandlers.push({ el: btn, move: onMagMove, leave: onMagLeave });
    });

    /* ---- GLOW FOLLOW on Work Cards ---- */
    const glowCards = document.querySelectorAll("[data-glow]") as NodeListOf<HTMLElement>;
    const glowHandlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    glowCards.forEach((card) => {
      const onGlowMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--glow-x", (e.clientX - rect.left) + "px");
        card.style.setProperty("--glow-y", (e.clientY - rect.top) + "px");
        card.style.setProperty("--glow-opacity", "1");
      };
      const onGlowLeave = () => {
        card.style.setProperty("--glow-opacity", "0");
      };
      card.addEventListener("mousemove", onGlowMove);
      card.addEventListener("mouseleave", onGlowLeave);
      glowHandlers.push({ el: card, move: onGlowMove, leave: onGlowLeave });
    });

    /* ---- JS-DRIVEN MARQUEE (scroll-direction aware) ---- */
    const mTracks = document.querySelectorAll(".marquee-track") as NodeListOf<HTMLElement>;
    const mPos = [0, 0];
    const mBaseSpeeds = [-1.2, 0.8]; // row1 left, row2 right
    let mDir = 1;
    let mPrevScrollY = window.scrollY;
    let mRafId: number;

    function tickMarquee() {
      const dy = window.scrollY - mPrevScrollY;
      if (dy > 1) mDir = 1;
      else if (dy < -1) mDir = -1;
      mPrevScrollY = window.scrollY;

      mTracks.forEach((track, i) => {
        const half = track.scrollWidth / 2;
        if (half === 0) return;
        mPos[i] += mBaseSpeeds[i] * mDir;
        if (mPos[i] <= -half) mPos[i] += half;
        if (mPos[i] > 0) mPos[i] -= half;
        track.style.transform = `translateX(${mPos[i]}px)`;
      });
      mRafId = requestAnimationFrame(tickMarquee);
    }
    mRafId = requestAnimationFrame(tickMarquee);

    /* ---- NAV scroll background ---- */
    const onScroll = () => {
      const nav = document.querySelector("nav") as HTMLElement | null;
      if (!nav) return;
      if (window.scrollY > 60) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);

    /* ---- 3D TILT on Pricing / Why Cards ---- */
    const tiltCards = document.querySelectorAll("[data-tilt]") as NodeListOf<HTMLElement>;
    const tiltHandlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    tiltCards.forEach((card) => {
      const onTiltMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transition = "transform 0.1s ease-out";
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      };
      const onTiltLeave = () => {
        card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      };
      card.addEventListener("mousemove", onTiltMove);
      card.addEventListener("mouseleave", onTiltLeave);
      tiltHandlers.push({ el: card, move: onTiltMove, leave: onTiltLeave });
    });

    /* ---- CLEANUP ---- */
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(mRafId);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
      ro.disconnect();
      document.removeEventListener("mousemove", onHeroMouseMove);
      magneticHandlers.forEach(({ el, move, leave }) => {
        document.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
      window.removeEventListener("scroll", onScroll);
      glowHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
      tiltHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return null;
}
