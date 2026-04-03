"use client";

import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import LandingInteractions from "../components/LandingInteractions";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
    {
        name: "Priyanshu Bhardwaj",
        role: "Co-Founder · Designer & Developer",
        image: "/cofounder1.jpg",
        bio: "Handling end-to-end execution. From initial concept and design systems to the final line of code and deployment.",
        index: "01",
        socials: [
            { label: "Twitter", href: "#" },
            { label: "LinkedIn", href: "#" },
        ],
    },
    {
        name: "Ravi Pratap Singh",
        role: "Co-Founder · Designer & Developer",
        image: "/cofounder2.jpg",
        bio: "Obsessed with details. Ensuring every pixel is perfect and every interaction feels seamless and responsive.",
        index: "02",
        socials: [
            { label: "Instagram", href: "#" },
            { label: "Behance", href: "#" },
        ],
    },
];

const values = [
    {
        title: "Obsessive Quality",
        desc: "We don't ship until it's pixel-perfect. Good enough is never good enough for us.",
    },
    {
        title: "Radical Transparency",
        desc: "We build in the open and keep our clients involved at every step of the process.",
    },
    {
        title: "Always Learning",
        desc: "Technology moves fast. We move faster. We're constantly exploring new tools and techniques.",
    },
    {
        title: "Design Driven",
        desc: "Design isn't just how it looks, it's how it works. We prioritize user experience above all else.",
    },
];

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-[#f5f3ee] text-[#0e0d0b] selection:bg-[#0e0d0b] selection:text-[#f5f3ee]">
            <div id="cursor" />
            <div id="cursor-ring"><span id="cursor-label" /></div>
            <SiteNav />

            {/* ── HERO ────────────────────────────────── */}
            <section className="team-hero">
                <div className="team-container">
                    {/* Eyebrow tag */}
                    <motion.div
                        className="team-tag"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="team-tag-line" />
                        Meet the team
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        className="team-h1"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        We act<br />
                        <em>as one.</em>
                    </motion.h1>

                    {/* Byline */}
                    <motion.p
                        className="team-byline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                        No layers, no middlemen. Just pure craft.
                        We build in the open and keep clients involved at every step.
                    </motion.p>
                </div>
            </section>

            {/* ── TEAM GRID ───────────────────────────── */}
            <section className="team-members-section">
                <div className="team-container">
                    <div className="team-members-grid">
                        {teamMembers.map((member, i) => (
                            <motion.article
                                key={i}
                                className="team-member-card"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Photo */}
                                <div className="team-photo-wrap group">
                                    <div className="team-photo-inner">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            unoptimized
                                            priority={i === 0}
                                            className="team-photo-img"
                                        />
                                        {/* Hover reveal overlay */}
                                        <div className="team-photo-overlay">
                                            <div className="team-photo-overlay-content">
                                                <p className="team-photo-bio">{member.bio}</p>
                                                <div className="team-photo-socials">
                                                    {member.socials.map((s) => (
                                                        <a key={s.label} href={s.href} className="team-social-link">
                                                            {s.label} ↗
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Decorative index */}
                                    <span className="team-member-index">{member.index}</span>
                                </div>

                                {/* Info */}
                                <div className="team-member-info">
                                    <h2 className="team-member-name">{member.name}</h2>
                                    <p className="team-member-role">{member.role}</p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VALUES / DNA ─────────────────────────── */}
            <section className="team-dna-section">
                <div className="team-container">
                    <div className="team-dna-inner">
                        {/* Sticky label */}
                        <div className="team-dna-label-col">
                            <motion.h2
                                className="team-dna-heading"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                DNA.
                            </motion.h2>
                            <p className="team-dna-sub">What we stand for</p>
                        </div>

                        {/* Values list */}
                        <div className="team-dna-list-col">
                            {values.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="team-dna-item"
                                    initial={{ opacity: 0, y: 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-5%" }}
                                    transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="team-dna-item-num">{String(i + 1).padStart(2, "0")}</div>
                                    <div className="team-dna-item-body">
                                        <h3 className="team-dna-item-title">{item.title}</h3>
                                        <p className="team-dna-item-desc">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <SiteFooter />
            <LandingInteractions />
        </main>
    );
}
