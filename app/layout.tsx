import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/providers/CustomCursor";
import { Navbar } from "@/components/Navbar/Navbar";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAILLARD — Seared to obsession",
  description:
    "A cheeseburger built the hard way. Dry-aged smash patty, aged cheddar, char you can hear.",
  metadataBase: new URL("https://maillard.example"),
  openGraph: {
    title: "MAILLARD — Seared to obsession",
    description: "A cheeseburger built the hard way.",
    images: ["/images/showcase-poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0A08",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ember focus:px-4 focus:py-2 focus:font-semibold focus:text-ember-ink"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
