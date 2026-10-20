"use client";

import { useState } from "react";
import Link from "next/link";
import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "framer-motion";
import { tools, type Tool } from "../content";
import { Reveal } from "./Motion";

// Close to Gradient Forge's four free presets; picking one is the same move as in the studio.
const presets = [
  { name: "Iris", colors: ["#120a1c", "#4a2370", "#9a5cc9", "#6e6440"] },
  { name: "Tide", colors: ["#050d1a", "#0f3d6e", "#2fb6c9", "#c9f2ff"] },
  { name: "Ember", colors: ["#140806", "#7a2412", "#f0743a", "#ffd39a"] },
  { name: "Briar", colors: ["#16060c", "#5c1530", "#c2456e", "#f2b8c6"] },
];

/** The live visual for a tool: an interactive shader for Gradient Forge, the poster for anything else. */
export function ToolStage({ tool }: { tool: Tool }) {
  const [preset, setPreset] = useState(0);
  const reduce = useReducedMotion();
  const live = tool.slug === "gradient-forge";

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tool.poster})` }} />
      {live && (
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={presets[preset].colors}
          distortion={0.85}
          swirl={0.55}
          grainMixer={0.15}
          grainOverlay={0.12}
          speed={reduce ? 0 : 0.35}
          maxPixelCount={2560 * 1440}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 p-6 text-white md:flex-row md:items-end md:justify-between md:p-12">
        <div className="max-w-xl">
          <p className="eyebrow text-white/70">{tool.name}</p>
          <p className="mt-4 text-[clamp(32px,4.6vw,72px)] font-medium leading-[0.98] tracking-[-0.04em]">{tool.tagline}.</p>
          <p className="mt-4 text-white/80 md:text-lg">{tool.pitch}</p>
        </div>

        {live && (
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">Try a preset</p>
            <div className="flex gap-2" role="radiogroup" aria-label="Shader preset">
              {presets.map((p, i) => (
                <button
                  key={p.name}
                  role="radio"
                  aria-checked={preset === i}
                  aria-label={p.name}
                  title={p.name}
                  onClick={() => setPreset(i)}
                  className={`h-10 w-10 rounded-full ring-2 transition-transform duration-200 hover:scale-110 ${
                    preset === i ? "ring-white" : "ring-white/20"
                  }`}
                  style={{ background: p.colors[2] }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** A tool on its live stage, framed in a hatched shell. `detailHref` links to its Lab page. */
export function FeaturedTool({ tool, detailHref }: { tool: Tool; detailHref?: string }) {
  return (
    <div className="shell">
      <div className="panel relative aspect-[4/5] overflow-hidden bg-night sm:aspect-[16/10] lg:aspect-[16/8]">
        <ToolStage tool={tool} />
      </div>
      <div className="well mt-2 flex flex-col gap-5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#e8f8ef] px-3 py-1 text-[12px] font-medium text-[#0b7a45]">{tool.status}</span>
          <span className="text-lg font-medium">{tool.name}</span>
          <span className="text-muted">{tool.pricing}</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          {detailHref ? (
            <Link href={detailHref} className="btn btn-outline btn-sm w-full sm:w-auto">
              Learn more
            </Link>
          ) : (
            <a href={tool.href} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm w-full sm:w-auto">
              Visit site
            </a>
          )}
          <a href={tool.cta.href} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm w-full sm:w-auto">
            {tool.cta.label}
          </a>
        </div>
      </div>
    </div>
  );
}

export function ToolsSection() {
  if (!tools.length) return null;
  const [featured] = tools;

  return (
    <section id="tools" className="section-pad scroll-mt-24 bg-white">
      <div className="vorq-container">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-accent">VORQ Lab</p>
            <h2 className="mt-4 text-[clamp(40px,6vw,88px)] leading-[0.98] tracking-[-0.045em]">
              We ship our own
              <br />
              products too.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-lg leading-relaxed text-muted">
              Micro-SaaS tools for people who build for the web, made with the same craft we put into client work.
            </p>
            <Link href="/lab" className="btn btn-outline btn-sm mt-6">
              Explore the Lab
            </Link>
          </div>
        </Reveal>

        <FeaturedTool tool={featured} detailHref={`/lab/${featured.slug}`} />
      </div>
    </section>
  );
}
