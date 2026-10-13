import { allPages } from "../../lib/pages";
import { site } from "../../lib/site";

export const dynamic = "force-static";

/** A plain-text summary for language-model crawlers (the llms.txt convention). */
export function GET() {
  const pages = allPages();
  const groups = [...new Set(pages.map((p) => p.group))];
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is run by ${site.legalName}. A designer uploads a hardware design. Buyers join a waitlist and save a card. The unit price falls as the count rises. At the target count one button starts every shop in the chain, and buyers are charged. Any custom design works; standard platforms are optional shortcuts.`,
    "",
    ...groups.flatMap((g) => [
      `## ${g}`,
      "",
      ...pages
        .filter((p) => p.group === g)
        .map((p) => `- [${p.title}](${new URL(p.url, site.url)}): ${p.description}`),
      "",
    ]),
    "## Machine-readable",
    "",
    `- [Sitemap](${site.url}/sitemap.xml)`,
    `- [Feed](${site.url}/feed.xml)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
