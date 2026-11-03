import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl font-black text-orange-500 font-mono">404</div>
        <h1 className="mt-3 text-2xl font-black">This page could not be found</h1>
        <p className="mt-2 text-sm text-slate-400">
          The page you are looking for may have moved. Visit our home page to explore NISSI Elite Plast uPVC profiles.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-orange-600 hover:bg-orange-500 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
