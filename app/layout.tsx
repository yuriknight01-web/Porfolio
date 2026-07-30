import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Xitao Liao — AI Product Designer",
  description:
    "Product Designer creating AI-powered creator tools through product strategy, UX, visual storytelling, and creative technology.",
  icons: {
    icon:
      process.env.GITHUB_PAGES === "true"
        ? "/Porfolio/favicon.svg"
        : "/favicon.svg",
    shortcut:
      process.env.GITHUB_PAGES === "true"
        ? "/Porfolio/favicon.svg"
        : "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
        {children}
      </body>
    </html>
  );
}
