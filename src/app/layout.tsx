import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "NISSI Elite Plast",
  authors: [{ name: "Nissi Extrusion India Pvt Ltd", url: SITE_URL }],
  creator: "Nissi Extrusion India Pvt Ltd",
  publisher: "Nissi Extrusion India Pvt Ltd",
  category: "Building Materials",
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  title: {
    default: "NISSI Elite Plast | Leading uPVC Windows & Doors Profiles Manufacturer",
    template: "%s | NISSI Elite Plast",
  },
  description:
    "Nissi Extrusion India Pvt Ltd - 100% Lead-Free uPVC Window & Door Profiles with European Extrusion Technology, In-House Galvanized Steel Reinforcement, and 15-Year Warranty. Avadi, Chennai.",
  keywords: [
    "Nissi uPVC",
    "Nissi Elite Plast",
    "uPVC profiles India",
    "uPVC window manufacturers Chennai",
    "uPVC door profiles",
    "lead-free uPVC",
    "casement window profiles",
    "sliding window profiles",
    "steel reinforcement coils",
    "Nissi Extrusion India",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NISSI Elite Plast | uPVC Windows & Doors Profiles Manufacturer",
    description:
      "Precision in Every Profile, Excellence in Every Frame. European extrusion technology, 100% lead-free, 15-year warranty.",
    url: SITE_URL,
    siteName: "NISSI Elite Plast",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NISSI Elite Plast | uPVC Windows & Doors Profiles Manufacturer",
    description:
      "European-grade 100% lead-free uPVC profiles manufactured in Avadi, Chennai. 15-year warranty.",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-orange-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
