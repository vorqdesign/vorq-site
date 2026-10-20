import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // Local images are served as static files. The Next.js image optimizer
  // is a Node server, and this site does not use the Cloudflare Images binding.
  images: {
    unoptimized: true,
  },
  // The studio page was retired; keep old links working.
  redirects: async () => [{ source: "/team", destination: "/", permanent: true }],
};

export default nextConfig;

// Only does work during `next dev`. Gives that server the local Workers bindings.
initOpenNextCloudflareForDev();
