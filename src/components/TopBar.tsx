import { Phone, Mail, MapPin, Award, FileDown } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Contact Info */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="tel:+919962225516"
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-semibold text-white">+91 99622 25516</span>
          </a>
          <a
            href="mailto:nissiupvcprofiles@gmail.com"
            className="hidden md:flex items-center gap-1.5 hover:text-orange-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-orange-500" />
            <span>nissiupvcprofiles@gmail.com</span>
          </a>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>Factory: Avadi, Chennai - 600 056</span>
          </div>
        </div>

        {/* Right: Partner & Highlights */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Partnered with</span>
            <strong className="text-white">McCoy Mart</strong>
          </div>
          <span className="text-slate-700">|</span>
          <a
            href="#brochure"
            className="flex items-center gap-1 text-[11px] font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Product Manual PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
