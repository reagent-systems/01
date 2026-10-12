import { JsonLd } from "./JsonLd";
import { SmartLink } from "./SmartLink";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, baseUrl }: { items: Crumb[]; baseUrl: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: new URL(c.path, baseUrl).toString(),
    })),
  };
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <JsonLd data={schema} />
      <ol>
        {all.map((c, i) =>
          i === all.length - 1 ? (
            <li key={c.path} aria-current="page">
              {c.name}
            </li>
          ) : (
            <li key={c.path}>
              <SmartLink href={c.path}>{c.name}</SmartLink>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
