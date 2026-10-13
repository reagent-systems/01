import type { MetadataRoute } from "next";
import { site } from "../lib/site";

const hidden = ["/api/", "/ops/", "/search", "/dashboard/"];

/** Everything public is open to every crawler, search or AI. Only the API, the operator page, and search results are not. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: hidden },
      ...[
        "Googlebot",
        "Bingbot",
        "GPTBot",
        "OAI-SearchBot",
        "ClaudeBot",
        "Claude-SearchBot",
        "PerplexityBot",
        "Applebot",
        "DuckDuckBot",
      ].map((userAgent) => ({ userAgent, allow: "/", disallow: hidden })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
