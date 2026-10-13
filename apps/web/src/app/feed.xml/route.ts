import { insights } from "../../lib/insights";
import { absoluteUrl } from "../../lib/seo";
import { site } from "../../lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c] ?? c,
  );

export function GET() {
  const items = insights
    .map(
      (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${absoluteUrl(`/insights/${i.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/insights/${i.slug}`)}</guid>
      <pubDate>${new Date(i.published).toUTCString()}</pubDate>
      <description>${esc(i.description)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(`${site.name} insights`)}</title>
    <link>${absoluteUrl("/insights")}</link>
    <description>${esc("Guides for hardware inventors.")}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
