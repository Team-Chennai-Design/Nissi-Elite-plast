import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nissiupvcgroups.com"),
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
    url: "https://www.nissiupvcgroups.com",
    siteName: "NISSI Elite Plast",
    images: [
      {
        url: "/logo.svg",
        width: 728,
        height: 202,
        alt: "NISSI Elite Plast UPVC Profiles",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NISSI Elite Plast | uPVC Windows & Doors Profiles Manufacturer",
    description:
      "European-grade 100% lead-free uPVC profiles manufactured in Avadi, Chennai. 15-year warranty.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-orange-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
