import type { Metadata } from "next";
import { site } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

/** Builds consistent per-page metadata: canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, image, noindex }: PageMeta): Metadata {
  const url = new URL(path, site.url).toString();
  const images = [{ url: image ?? "/opengraph-image", width: 1200, height: 630, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: images.map((i) => i.url),
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/brand/01-mark-512.png"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    sameAs: Object.values(site.social).length ? Object.values(site.social) : undefined,
    knowsAbout: [
      "Hardware manufacturing",
      "Contract manufacturing",
      "CNC machining",
      "Sheet metal fabrication",
      "Injection molding",
      "3D printing",
      "PCB fabrication",
      "PCB assembly",
      "Group buys",
      "Design for manufacture",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": orgId },
    inLanguage: "en-US",
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
