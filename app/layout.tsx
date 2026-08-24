import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vidya — offline CBSE Commerce & Maths practice",
  description:
    "4,029 verified questions with worked solutions for CBSE Class 11–12 Commerce, CUET, CA Foundation and IPMAT. Works with no internet.",
  metadataBase: new URL("https://vidya-landing-handoff.vercel.app"),
  openGraph: {
    title: "Vidya — offline CBSE Commerce & Maths practice",
    description:
      "4,029 verified CBSE Commerce & Maths questions with worked solutions. Works offline.",
    type: "website",
    images: [{ url: "/project-image.svg", width: 1280, height: 640, alt: "Vidya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidya — offline CBSE Commerce & Maths practice",
    description:
      "4,029 verified CBSE Commerce & Maths questions with worked solutions. Works offline.",
    images: ["/project-image.svg"],
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
