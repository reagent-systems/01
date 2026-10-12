import "@01/ui/styles.css";
import { Footer, Header } from "@01/ui";
import type { Metadata, Viewport } from "next";
import { Barlow } from "next/font/google";
import type { ReactNode } from "react";
import { footerColumns, primaryNav, site } from "../lib/site";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={barlow.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header links={primaryNav} />
        <main id="main">{children}</main>
        <Footer blurb={site.description} columns={footerColumns} legal={site.legal} />
      </body>
    </html>
  );
}
