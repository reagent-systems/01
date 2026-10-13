import { PageHero } from "@01/ui";
import { SearchResults } from "../../components/SearchResults";
import { pageMetadata } from "../../lib/seo";
import { site } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Search",
  description: "Search the 01 site for processes, guides, designs, and state pages.",
  path: "/search",
  noindex: true,
});

export default function SearchPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Search", path: "/search" }]}
        baseUrl={site.url}
        eyebrow="Search"
        title="Find a page"
        short
      />
      <section className="section">
        <div className="container">
          <SearchResults />
        </div>
      </section>
    </>
  );
}
