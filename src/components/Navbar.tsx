"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Menu, X, ArrowRight, Download } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About Us", href: "#about" },
    { label: "Profile Series", href: "#profiles" },
    { label: "Why uPVC", href: "#why-upvc" },
    { label: "Colour Profiles", href: "#colours" },
    { label: "Manufacturing", href: "#manufacturing" },
    { label: "Steel & Hardware", href: "#hardware" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2 sm:py-2.5 border-b border-slate-200"
          : "bg-white py-2.5 sm:py-3 xl:py-3.5 shadow-sm"
      }`}
    >
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between gap-4 lg:gap-6 xl:gap-8 2xl:gap-12">
          {/* Brand Logo - Big, Visible, and Left-Aligned */}
          <Link href="/" className="flex items-center shrink-0">
            <Logo size="default" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-2.5 lg:gap-3 xl:gap-5 2xl:gap-8 flex-nowrap shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] lg:text-xs xl:text-[13px] 2xl:text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors whitespace-nowrap py-1 relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0 flex-nowrap">
            <a
              href="#brochure"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 xl:px-3.5 xl:py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="whitespace-nowrap">Catalog</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 xl:gap-2 px-3 py-2 xl:px-4 2xl:px-5 xl:py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-md shadow-orange-600/20 hover:shadow-orange-600/40 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Fabricator Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-6 px-4 bg-white border border-slate-200 rounded-2xl shadow-xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="#brochure"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 whitespace-nowrap"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Download Product Manual PDF</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/30 whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">Enquire as Fabricator / Dealer</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
