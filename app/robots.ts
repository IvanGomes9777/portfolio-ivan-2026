import type { MetadataRoute } from "next";

const BASE_URL = "https://portfolio-ivan-2026.vercel.app";

// AI search/retrieval crawlers are explicitly allowed so the site can be found
// and cited in AI answers (GEO). They inherit the same "allow all but /api/"
// rules as regular crawlers.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
