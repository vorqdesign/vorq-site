import Image from "next/image";
import type { Cover as CoverId } from "./posts";

/** Covers drawn in the site's own language, so the journal never needs stock art. */
export function Cover({ id, priority = false }: { id: CoverId; priority?: boolean }) {
  const frame = "hatch absolute inset-0 grid place-items-center overflow-hidden";

  if (id === "forge") {
    return (
      <div className="absolute inset-0 bg-night">
        <Image
          src="/captures/forge-poster.jpg"
          alt="Gradient Forge homepage"
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-left"
        />
      </div>
    );
  }

  if (id === "wordmark") {
    return (
      <div className={frame}>
        <div className="relative px-[8%] py-[6%]">
          <span className="absolute inset-0 border border-accent/60" />
          {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((p) => (
            <span key={p} className={`absolute ${p} h-2 w-2 border border-accent bg-white`} />
          ))}
          <span className="absolute -top-6 right-0 rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] text-white">Wordmark3D</span>
          <p className="font-wordmark text-[clamp(44px,7vw,96px)] leading-none text-ink">VORQ</p>
        </div>
      </div>
    );
  }

  if (id === "pricing") {
    return (
      <div className={frame}>
        <div className="w-[62%] max-w-[300px] rotate-[-3deg] rounded-2xl bg-white p-5 font-mono text-[12px] shadow-[0_20px_40px_-20px_rgb(0_0_0/0.35)] ring-1 ring-black/[0.05]">
          {[
            ["Scope", "Listed"],
            ["Timeline", "Dated"],
            ["Revisions", "Included"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1 text-ink/50">
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div className="my-3 border-t border-dashed border-ink/15" />
          <div className="flex justify-between text-ink">
            <span>Total</span>
            <span className="text-accent">Fixed</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === "builds") {
    const tiles = [
      ["Landing", "#2f6bff"],
      ["Dashboard", "#00a37a"],
      ["Web app", "#8b3dff"],
      ["Mobile", "#ff5a1f"],
    ];
    return (
      <div className={frame}>
        <div className="grid w-[70%] grid-cols-2 gap-2">
          {tiles.map(([name, color]) => (
            <div key={name} className="flex aspect-[4/3] flex-col justify-between rounded-xl bg-white p-3 ring-1 ring-black/[0.05]">
              <span className="h-2 w-2 rounded-full" style={{ background: color }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55">{name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "code") {
    return (
      <div className={frame}>
        <pre className="w-[66%] max-w-[340px] rounded-2xl bg-ink p-5 font-mono text-[12px] leading-relaxed text-white/75 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)]">
          <span className="text-white/40">{"<"}</span>
          <span className="text-accent-soft">Hero</span>
          {"\n  "}motion=<span className="text-white">&quot;spring&quot;</span>
          {"\n  "}states=<span className="text-white">{"{"}[&quot;empty&quot;, &quot;error&quot;]{"}"}</span>
          {"\n"}
          <span className="text-white/40">{"/>"}</span>
        </pre>
      </div>
    );
  }

  if (id === "devtools") {
    return (
      <div className={frame}>
        <div className="w-[66%] max-w-[340px] overflow-hidden rounded-2xl bg-ink font-mono text-[12px] shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)]">
          <div className="flex gap-1.5 border-b border-white/10 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <p className="px-4 py-4 text-white/80">
            <span className="text-accent-soft">$</span> npm install your-tool
            <br />
            <span className="text-[#5ee0b0]">✓</span> <span className="text-white/50">ready in 2 lines of config</span>
          </p>
        </div>
      </div>
    );
  }

  if (id === "team") {
    return (
      <div className={frame}>
        <div className="flex w-[70%] items-end gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            {["#2f6bff", "#ff5a1f", "#00a37a"].map((c) => (
              <div key={c} className="h-6 rounded-lg ring-1 ring-black/[0.05]" style={{ background: c, opacity: 0.7 }} />
            ))}
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Patchwork</span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-6 rounded-lg bg-accent ring-1 ring-black/[0.05]" style={{ opacity: 0.45 + i * 0.25 }} />
            ))}
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">System</span>
          </div>
        </div>
      </div>
    );
  }

  // website
  return (
    <div className={frame}>
      <div className="w-[68%] max-w-[340px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_-20px_rgb(0_0_0/0.35)] ring-1 ring-black/[0.05]">
        <div className="flex gap-1.5 border-b border-black/[0.06] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ink/10" />
          <span className="h-2 w-2 rounded-full bg-ink/10" />
          <span className="h-2 w-2 rounded-full bg-ink/10" />
        </div>
        <div className="space-y-2 p-4">
          <div className="h-2.5 w-3/4 rounded-full bg-ink" />
          <div className="h-2 w-1/2 rounded-full bg-ink/20" />
          <div className="h-4 w-20 rounded-full bg-accent" />
          <div className="mt-2 h-14 rounded-lg bg-ink/[0.05]" />
        </div>
      </div>
    </div>
  );
}
