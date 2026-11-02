import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NISSI Elite Plast | Leading uPVC Windows & Doors Profiles Manufacturer",
  description:
    "Nissi Extrusion India Pvt Ltd - 100% Lead-Free uPVC Window & Door Profiles with European Extrusion Technology, In-House Steel Reinforcement, and 15-Year Warranty. Avadi, Chennai.",
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
