import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@01/unknowns", "@01/ui"],
  async redirects() {
    return [
      // Aliases to canonical routes (consolidates link equity on one URL).
      { source: "/how", destination: "/how-it-works", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/capabilities", destination: "/processes", permanent: true },
      { source: "/capabilities/:slug", destination: "/processes/:slug", permanent: true },
      { source: "/services", destination: "/processes", permanent: true },
      { source: "/industries", destination: "/for", permanent: true },
      { source: "/contracting", destination: "/for/manufacturers", permanent: true },
      { source: "/join", destination: "/for/manufacturers", permanent: true },
      { source: "/shops", destination: "/for/manufacturers", permanent: true },
      { source: "/suppliers", destination: "/for/manufacturers", permanent: true },
      { source: "/certifications", destination: "/compliance", permanent: true },
      { source: "/quote", destination: "/start", permanent: true },
      { source: "/request-a-quote", destination: "/start", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/privacy-statement", destination: "/privacy", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/video/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
