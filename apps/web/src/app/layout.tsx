import "@01/ui/styles.css";
import { Footer, Header, JsonLd } from "@01/ui";
import type { Metadata, Viewport } from "next";
import { Barlow } from "next/font/google";
import type { ReactNode } from "react";
import { audiences } from "../lib/audiences";
import { processes } from "../lib/processes";
import { organizationSchema, websiteSchema } from "../lib/seo";
import { drawerNav, fileTypes, primaryNav, site } from "../lib/site";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "custom hardware manufacturing",
    "hardware crowdfunding",
    "group buy",
    "on-demand manufacturing",
    "contract manufacturing",
    "PCB assembly",
    "CNC machining",
    "3D printing",
    "injection molding",
    "prototype to production",
    "waitlist pricing",
    "design for manufacture",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Manufacturing",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Set these in Vercel once Search Console and Bing Webmaster are set up.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

const link = (label: string, href: string) => ({ label, href });
const half = Math.ceil(processes.length / 2);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={barlow.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header
          links={primaryNav}
          drawerLinks={drawerNav}
          action={{ href: "/start", label: "Start a design" }}
        />
        <main id="main">{children}</main>
        <Footer
          legalName={site.legalName}
          cta={{ href: "/start", label: "Start a design" }}
          columns={[
            {
              title: "General",
              links: [
                link("About and mission", "/#mission"),
                link("How it works", "/how-it-works"),
                link("Compliance", "/compliance"),
                link("Join as a shop", "/for/manufacturers"),
                link("Start a design", "/start"),
                link("Contact", "/contact"),
              ],
            },
            {
              title: "Processes",
              links: [
                link("All processes", "/processes"),
                ...processes.slice(0, half).map((p) => link(p.title, `/processes/${p.slug}`)),
              ],
            },
            {
              title: "More processes",
              links: processes.slice(half).map((p) => link(p.title, `/processes/${p.slug}`)),
            },
            {
              title: "Who it’s for",
              links: audiences.map((a) => link(a.name, `/for/${a.slug}`)),
            },
          ]}
          list={{
            title: "Files we read",
            items: fileTypes.map((t) => ({ label: t })),
          }}
          legal={`© ${new Date().getFullYear()} ${site.legalName}. All rights reserved.`}
          legalLinks={[
            link("Terms", "/terms"),
            link("Privacy", "/privacy"),
            link("Designer agreement", "/designer-agreement"),
            link("Supplier agreement", "/supplier-agreement"),
            link("Sitemap", "/sitemap.xml"),
          ]}
        />
      </body>
    </html>
  );
}
