import LandingInteractions from "./components/LandingInteractions";
import TestimonialSlider from "./components/TestimonialSlider";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

export default function LandingPage() {
  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring"><span id="cursor-label" /></div>

      {/* NAV */}
      <SiteNav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-orb" data-hero-orb />
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-stat">
            <div className="hero-eyebrow-num">3+</div>
            <div className="hero-eyebrow-label">Projects Live</div>
          </div>
          <div className="hero-divider-line" />
          <div className="hero-eyebrow-stat">
            <div className="hero-eyebrow-num">3d</div>
            <div className="hero-eyebrow-label">Avg. Delivery</div>
          </div>
          <div className="hero-divider-line" />
          <div className="hero-eyebrow-stat">
            <div className="hero-eyebrow-num">$20</div>
            <div className="hero-eyebrow-label">Starting From</div>
          </div>
        </div>
        <div className="hero-headline">
          <h1>
            <span className="line hero-line reveal">We design</span>
            <span className="line hero-line reveal">
              <em>websites</em> that
            </span>
            <span className="line hero-line reveal">
              <span className="stroke-text">actually</span> work.
            </span>
          </h1>
        </div>
        <div className="hero-bottom">
          <p className="hero-desc">
            Premium web design, redesigns &amp; MVP builds — at prices that
            respect early-stage budgets. No bloat, no templates, no BS.
          </p>
          <div className="hero-actions">
            <a href="#pricing" className="btn-primary-lg" data-magnetic data-cursor="Best deals ↓">
              See our pricing
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 13L13 3M13 3H6M13 3v7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#work" className="btn-link" data-cursor="See magic ✦">
              View our work →
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          <span>Website Design <strong>from $50</strong></span>
          <span>Redesigns <strong>from $20</strong></span>
          <span>MVP Builds <strong>from $100</strong></span>
          <span>Next.js</span>
          <span>Framer Motion</span>
          <span>7-day Delivery</span>
          <span>Zero Templates</span>
          <span>Website Design <strong>from $50</strong></span>
          <span>Redesigns <strong>from $20</strong></span>
          <span>MVP Builds <strong>from $100</strong></span>
          <span>Next.js</span>
          <span>Framer Motion</span>
          <span>7-day Delivery</span>
          <span>Zero Templates</span>
        </div>
        <div className="marquee-track marquee-track--reverse">
          <span>Custom Code</span>
          <span>SEO Optimised</span>
          <span>Lighthouse 95+</span>
          <span>React</span>
          <span>Supabase</span>
          <span>Full Handoff</span>
          <span>No Lock-in</span>
          <span>Custom Code</span>
          <span>SEO Optimised</span>
          <span>Lighthouse 95+</span>
          <span>React</span>
          <span>Supabase</span>
          <span>Full Handoff</span>
          <span>No Lock-in</span>
        </div>
      </div>

      {/* WORK */}
      <section className="work-section" id="work">
        <div className="container">
          <div className="work-intro">
            <div>
              <div className="section-tag" style={{ color: "var(--accent)" }}>
                Selected Work
              </div>
              <h2 className="landing-h2" style={{ color: "var(--bg)" }}>
                Built from scratch.
                <br />
                Shipped on time.
              </h2>
            </div>
            <div className="work-intro-right reveal">
              <div className="work-count">04</div>
              <p className="work-note">
                Every project is custom, live &amp; converting.
              </p>
            </div>
          </div>
          <div className="work-grid">
            {/* Card 1: SamaWritten */}
            <div className="work-card reveal" data-glow>
              <div className="work-glow" />
              <div className="work-visual wv-1">
                <div className="floating-tag">NEW ✦</div>
                <img 
                  src="/images/samawritten.jpg" 
                  alt="SamaWritten Cardiac Wearable" 
                  className="wv-img"
                />
              </div>
              <div className="work-card-body">
                <div className="work-card-meta">
                  <span className="work-card-type">Cardiac Wearable AI</span>
                  <span className="work-card-time">Delivered in 2 days</span>
                </div>
                <div className="work-card-title">SamaWritten</div>
                <div className="work-card-desc">
                  Advanced Cardiac Wearable — AI-powered heart monitoring. Monitors 20+ conditions on-wrist. Alerts samaritans — no phone needed.
                </div>
                <div className="work-card-footer">
                  <div className="work-card-tags">
                    <span className="wct">Next.js</span>
                    <span className="wct">Framer</span>
                    <span className="wct">AI</span>
                  </div>
                  <a href="https://www.samawritten.com" target="_blank" rel="noopener noreferrer" className="work-card-cta" data-cursor="Live site →">
                    View project
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Aranyoing */}
            <div className="work-card reveal" data-glow>
              <div className="work-glow" />
              <div className="work-visual wv-2">
                <div className="floating-tag">NEW ✦</div>
                <img 
                  src="/images/aranyoing.jpg" 
                  alt="Aranyoing Portfolio Redesign" 
                  className="wv-img"
                />
              </div>
              <div className="work-card-body">
                <div className="work-card-meta">
                  <span className="work-card-type">Portfolio Redesign</span>
                  <span className="work-card-time">Redesigned in 6 hrs</span>
                </div>
                <div className="work-card-title">Aranyoing</div>
                <div className="work-card-desc">
                  High-end minimalist portfolio redesign. Complete layout overhaul with premium motion and responsive performance.
                </div>
                <div className="work-card-footer">
                  <div className="work-card-tags">
                    <span className="wct">React</span>
                    <span className="wct">GSAP</span>
                    <span className="wct">UI/UX</span>
                  </div>
                  <a href="https://www.aranyoing.com" target="_blank" rel="noopener noreferrer" className="work-card-cta" data-cursor="Live site →">
                    View project
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Open Dev Society */}
            <div className="work-card reveal" data-glow>
              <div className="work-glow" />
              <div className="work-visual wv-3">
                <img 
                  src="/images/ods.jpg" 
                  alt="Open Dev Society Community" 
                  className="wv-img"
                />
              </div>
              <div className="work-card-body">
                <div className="work-card-meta">
                  <span className="work-card-type">Community Platform</span>
                  <span className="work-card-time">Delivered in 4 days</span>
                </div>
                <div className="work-card-title">Open Dev Society</div>
                <div className="work-card-desc">
                  Main website development for the global open-source community. Building the future of dev culture together.
                </div>
                <div className="work-card-footer">
                  <div className="work-card-tags">
                    <span className="wct">Next.js</span>
                    <span className="wct">Community</span>
                    <span className="wct">OSS</span>
                  </div>
                  <a href="https://opendevsociety.vercel.app" target="_blank" rel="noopener noreferrer" className="work-card-cta" data-cursor="Live site →">
                    View project
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 4: Kine UI */}
            <div className="work-card reveal" data-glow>
              <div className="work-glow" />
              <div className="work-visual wv-4">
                <img 
                  src="/images/kineUI.jpg" 
                  alt="Kine UI Library" 
                  className="wv-img"
                />
              </div>
              <div className="work-card-body">
                <div className="work-card-meta">
                  <span className="work-card-type">Open Source (Full MVP)</span>
                  <span className="work-card-time">Delivered in 2 days</span>
                </div>
                <div className="work-card-title">Kine UI</div>
                <div className="work-card-desc">
                  Spatial computing UI library for full production spatial interfaces. Redefining interactions in 3D environments.
                </div>
                <div className="work-card-footer">
                  <div className="work-card-tags">
                    <span className="wct">Spatial UI</span>
                    <span className="wct">Google Pipeline</span>
                    <span className="wct">OSS</span>
                  </div>
                  <a href="https://kine-ui.vercel.app" target="_blank" rel="noopener noreferrer" className="work-card-cta" data-cursor="Live site →">
                    View project
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* PRICING */}
      <section className="pricing-section section" id="pricing">
        <div className="container">
          <div className="pricing-header reveal">
            <div>
              <div className="section-tag">Pricing</div>
              <h2 className="landing-h2">
                Honest prices.
                <br />
                Premium output.
              </h2>
            </div>
            <p className="pricing-header-right">
              We got tired of agencies quoting $5K for a landing page. Good
              design is a tool — not a luxury. Here&apos;s exactly what you pay.
            </p>
          </div>
          <div className="pricing-grid">
            {/* Redesign */}
            <div className="price-card reveal" data-tilt data-cursor="Buy it :)">
              <div className="pc-name">Redesign</div>
              <div className="pc-price">
                <sup>$</sup>20<span className="pc-price-sub">–50</span>
              </div>
              <div className="pc-tagline">
                Modernise your existing site. Faster, sharper, more persuasive.
              </div>
              <ul className="pc-includes">
                <li>Full visual refresh</li>
                <li>Mobile-first layout</li>
                <li>Performance pass</li>
                <li>Up to 5 pages</li>
                <li>1 revision round</li>
              </ul>
              <a href="/book" className="pc-cta">
                Get started →
              </a>
            </div>
            {/* Website Design (featured) */}
            <div className="price-card featured reveal" data-tilt data-cursor="Best value 🔥">
              <div className="pc-star">✦</div>
              <div className="pc-name">Website Design</div>
              <div className="pc-price">
                <sup>$</sup>50<span className="pc-price-sub">–100</span>
              </div>
              <div className="pc-tagline">
                A new site built from scratch. Designed to convert, built to
                last.
              </div>
              <ul className="pc-includes">
                <li>Custom design + dev</li>
                <li>Next.js or Framer</li>
                <li>Animations included</li>
                <li>SEO-optimised</li>
                <li>1 revision round</li>
              </ul>
              <a href="/book" className="pc-cta">
                Get started →
              </a>
            </div>
            {/* MVP Build */}
            <div className="price-card reveal" data-tilt data-cursor="Let's build 🚀">
              <div className="pc-name">MVP Build</div>
              <div className="pc-price">
                <sup>$</sup>100<span className="pc-price-sub">–500</span>
              </div>
              <div className="pc-tagline">
                Ship your idea fast. Full-stack or frontend, scoped to your
                stage.
              </div>
              <ul className="pc-includes">
                <li>Scoped to requirements</li>
                <li>Next.js + Supabase</li>
                <li>Auth, DB, API routes</li>
                <li>Deployed &amp; handed off</li>
                <li>Code ownership</li>
              </ul>
              <a href="/book" className="pc-cta">
                Get started →
              </a>
            </div>
          </div>
          <div className="pricing-custom reveal">
            <div>
              <h3>Need something bigger?</h3>
              <p>
                Complex scope, ongoing work, or a specific brief — let&apos;s
                figure out the right number together.
              </p>
            </div>
            <a
              href="mailto:hello@vorq.agency"
              className="btn-primary-lg"
              style={{ fontSize: "14px", padding: "14px 28px" }}
            >
              Let&apos;s talk
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 13L13 3M13 3H6M13 3v7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why-section section">
        <div className="container">
          <div className="section-tag reveal" style={{ color: 'var(--accent)' }}>Why VORQ</div>
          <h2 className="landing-h2 reveal" style={{ color: 'var(--bg)' }}>
            Not a factory.
            <br />
            Your actual team.
          </h2>
          <div className="why-grid">
            <div className="why-card reveal" data-tilt data-cursor="Fair price 🏷️">
              <div className="why-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="10" y1="38" x2="38" y2="10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="24" cy="24" r="6" fill="var(--accent)" fillOpacity="0.2" />
                </svg>
              </div>
              <div className="why-num" aria-hidden="true">01</div>
              <div className="why-title">Prices that don&apos;t insult you</div>
              <div className="why-desc">
                We&apos;ve seen $8K quotes for a 4-page site. That&apos;s not
                craft — that&apos;s overhead being passed on.{" "}
                <span className="why-accent">We price for the work, not the brand name.</span>
              </div>
              <div className="why-card-dots" aria-hidden="true" />
            </div>

            <div className="why-card reveal" data-tilt data-cursor="Handcrafted 🛠️">
              <div className="why-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <polygon points="24,4 44,24 24,44 4,24" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <polygon points="24,14 34,24 24,34 14,24" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent)" fillOpacity="0.15" />
                  <circle cx="24" cy="24" r="3" fill="var(--accent)" />
                </svg>
              </div>
              <div className="why-num" aria-hidden="true">02</div>
              <div className="why-title">Zero templates. Ever.</div>
              <div className="why-desc">
                Every component written for you.{" "}
                <span className="why-accent">Your competitors won&apos;t have a site that looks like yours</span>
                {" "}— because ours is custom down to the last pixel.
              </div>
              <div className="why-card-dots" aria-hidden="true" />
            </div>

            <div className="why-card reveal" data-tilt data-cursor="Fast ship ⚡">
              <div className="why-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <path d="M24 6L24 42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" />
                  <path d="M12 18L24 6L36 18" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 26L24 18L32 26" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                </svg>
              </div>
              <div className="why-num" aria-hidden="true">03</div>
              <div className="why-title">We ship in under 10 days</div>
              <div className="why-desc">
                Most projects live in under a week.{" "}
                <span className="why-accent">You&apos;re not waiting six weeks</span>
                {" "}in an agency sprint cycle while your runway burns.
              </div>
              <div className="why-card-dots" aria-hidden="true" />
            </div>

            <div className="why-card reveal" data-tilt data-cursor="You own it 🔑">
              <div className="why-card-icon">
                <svg viewBox="0 0 48 48" fill="none">
                  <rect x="12" y="8" width="24" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M20 24L23 27L28 21" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="18" y1="34" x2="30" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <circle cx="24" cy="14" r="2" fill="var(--accent)" fillOpacity="0.3" />
                </svg>
              </div>
              <div className="why-num" aria-hidden="true">04</div>
              <div className="why-title">You own everything</div>
              <div className="why-desc">
                Full code handoff. No vendor lock-in.{" "}
                <span className="why-accent">The codebase is yours from day one.</span>
                {" "}No subscription to &quot;keep your site running.&quot;
              </div>
              <div className="why-card-dots" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section section" id="process">
        <div className="container">
          <div className="section-tag reveal">Process</div>
          <h2 className="landing-h2 reveal">
            Simple. Predictable.
            <br />
            On time.
          </h2>
          <div className="process-list reveal">
            <div className="process-item">
              <div className="process-n">01</div>
              <div className="process-title">Brief us</div>
              <div className="process-desc">
                Drop an email or hop on a quick call. Tell us what you need,
                your deadline, and budget. No lengthy forms.
              </div>
            </div>
            <div className="process-item">
              <div className="process-n">02</div>
              <div className="process-title">We scope it</div>
              <div className="process-desc">
                Fixed scope and fixed price in 24 hours. You approve — or we
                adjust. No surprise invoices halfway through.
              </div>
            </div>
            <div className="process-item">
              <div className="process-n">03</div>
              <div className="process-title">We build it</div>
              <div className="process-desc">
                Design → development → revisions. Live preview link from day one
                so you&apos;re never in the dark.
              </div>
            </div>
            <div className="process-item">
              <div className="process-n">04</div>
              <div className="process-title">You go live</div>
              <div className="process-desc">
                We handle deployment. Full codebase handed off. Domain connected.
                Ongoing support available.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialSlider />

      {/* FOOTER */}
      <SiteFooter />

      <LandingInteractions />
    </>
  );
}
