import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Ivan — Webdesign & Entwicklung für lokale Unternehmen",
  description:
    "Maßgeschneiderte, performante Websites für lokale Unternehmen. Startklar in 2 bis 4 Wochen.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${body.variable} ${display.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
