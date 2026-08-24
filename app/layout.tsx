import type { Metadata, Viewport } from "next";
import "./globals.css";

// All numbers below are sourced from content/stats.generated.json — never typed
// here. See LANDING-PAGE-BRIEF.md §7.1 and §1.2.
export const metadata: Metadata = {
  title: "Vidya — offline CBSE Commerce & Maths practice",
  description:
    "4,029 verified questions with worked solutions for CBSE Class 11–12 Commerce, CUET, CA Foundation and IPMAT. Works with no internet.",
  metadataBase: new URL("https://vidya.example"),
  applicationName: "Vidya",
  authors: [{ name: "Vidya" }],
  keywords: [
    "CBSE",
    "Commerce",
    "Accountancy",
    "CUET",
    "CA Foundation",
    "IPMAT",
    "Class 11",
    "Class 12",
    "offline",
    "practice",
  ],
  openGraph: {
    title: "Vidya — offline CBSE Commerce & Maths practice",
    description:
      "Verified CBSE Commerce questions with worked solutions. Works with no internet.",
    type: "website",
    images: [{ url: "/api/og-image", width: 1200, height: 630, alt: "Vidya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidya — offline CBSE Commerce & Maths practice",
    description:
      "Verified CBSE Commerce questions with worked solutions. Works with no internet.",
    images: ["/api/og-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5fb" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="bg-canvas text-ink antialiased font-sans">
        {children}
      </body>
    </html>
  );
}