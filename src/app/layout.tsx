import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import OfflineIndicator from "@/components/OfflineIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateViewport() {
  return {
    themeColor: '#2563eb',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}

export const metadata: Metadata = {
  metadataBase: new URL('https://free-on.pages.dev'),
  title: "Free for Developers - Discover Amazing Free Tools & Services",
  description: "Find the best free tools, services, and resources for developers. From APIs to hosting, analytics to databases - everything you need to build your next project without breaking the bank.",
  keywords: "free developer tools, free APIs, free hosting, developer resources, SaaS, PaaS, IaaS, open source tools",
  authors: [{ name: "Free for Developers" }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FreeDev',
  },
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/icons/icon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icons/icon-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icons/icon-512x512.png',
      },
    ],
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
        <ThemeProvider>
          <PWAInstallPrompt />
          <OfflineIndicator />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
