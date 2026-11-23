import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // The track is the largest asset and never changes mid-event: let the browser
  // keep it after the first stream instead of re-fetching it per visit.
  headers: async () => [
    {
      source: "/music.ogg",
      headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
    },
  ],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
