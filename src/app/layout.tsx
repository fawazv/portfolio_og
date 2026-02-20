import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NoiseOverlay from "@/components/ui/noise-overlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fawazv.online"),
  title: "Mohammed Fawaz | Full Stack Developer — React, Node.js, Microservices",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js & Microservices architecture. View projects and get in touch.",
  authors: [{ name: "Mohammed Fawaz" }],
  keywords: [
    "Full Stack Developer", "React Developer", "Next.js", "Node.js",
    "Microservices", "TypeScript", "Docker", "AWS", "Kerala", "India",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fawazv.online",
    siteName: "Mohammed Fawaz — Portfolio",
    title: "Mohammed Fawaz | Full Stack Developer — React, Node.js, Microservices",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js & Microservices. Open to remote & hybrid roles.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mohammed Fawaz — Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Fawaz | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js & Microservices. Open to remote & hybrid roles.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://fawazv.online",
  },
};

import CustomCursor from "@/components/ui/cursor";
import Background from "@/components/ui/background";
import SmoothScroll from "@/components/ui/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohammed Fawaz",
              jobTitle: "Full Stack Developer",
              url: "https://fawazv.online",
              email: "fawazv.business@gmail.com",
              description:
                "Full Stack Developer specializing in React, Next.js, Node.js, and Microservices architecture.",
              image: "https://fawazv.online/portrait.webp",
              sameAs: [
                "https://github.com/fawazv/",
                "https://www.linkedin.com/in/mohammed-fawaz-216314280/",
              ],
              knowsAbout: [
                "React", "Next.js", "Node.js", "TypeScript",
                "Microservices", "Docker", "AWS", "MongoDB", "PostgreSQL",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-9999 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue"
          >
            Skip to content
          </a>

          <SmoothScroll />
          <Background />
          <NoiseOverlay />
          <CustomCursor />
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
