import "@01/ui/styles.css";
import { Barlow } from "next/font/google";
import type { ReactNode } from "react";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata = {
  title: "01",
  description: "Design hardware without capital.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={barlow.variable}>
      <body>{children}</body>
    </html>
  );
}
