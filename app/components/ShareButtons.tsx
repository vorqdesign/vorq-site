"use client";

import { useState } from "react";

/** Copy link, X and LinkedIn. The URL is read on click, so server and client render the same markup. */
export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const pill = "rounded-full bg-mist px-4 py-2 text-[13px] text-ink/70 transition-colors hover:bg-ink hover:text-white";

  const open = (make: (url: string) => string) => window.open(make(window.location.href), "_blank", "noopener,noreferrer");

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={pill}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
      <button
        className={pill}
        onClick={() => open((u) => `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(u)}`)}
      >
        Share on X
      </button>
      <button
        className={pill}
        onClick={() => open((u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`)}
      >
        LinkedIn
      </button>
    </div>
  );
}
