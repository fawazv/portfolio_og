import type { Metadata } from "next";
import { Host_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NoiseOverlay from "@/components/ui/noise-overlay";

// Signal Violet type system: Host Grotesk (display + text), JetBrains Mono
// (labels, data), Instrument Serif italic (one accent word at most per screen).
const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
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
    // Image comes from src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Fawaz | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js & Microservices. Open to remote & hybrid roles.",
    // Image comes from src/app/twitter-image.tsx
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


import Background from "@/components/ui/background";
import ScrollManager from "@/components/ui/scroll-manager";
import { ViewTransitionResolver } from "@/components/ui/transition-link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hostGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
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
        className="antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-9999 focus:p-4 focus:bg-canvas focus:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Skip to content
          </a>

          <ScrollManager />
          <ViewTransitionResolver />
          <Background />
          <NoiseOverlay />
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
