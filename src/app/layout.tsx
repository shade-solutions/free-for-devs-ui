import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://free-on.pages.dev'),
  title: "Free for Developers - Discover Amazing Free Tools & Services",
  description: "Find the best free tools, services, and resources for developers. From APIs to hosting, analytics to databases - everything you need to build your next project without breaking the bank.",
  keywords: "free developer tools, free APIs, free hosting, developer resources, SaaS, PaaS, IaaS, open source tools",
  authors: [{ name: "Free for Developers" }],
  openGraph: {
    title: "Free for Developers - Discover Amazing Free Tools & Services",
    description: "Find the best free tools, services, and resources for developers",
    type: "website",
    url: "https://free-on.pages.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free for Developers - Discover Amazing Free Tools & Services",
    description: "Find the best free tools, services, and resources for developers",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
