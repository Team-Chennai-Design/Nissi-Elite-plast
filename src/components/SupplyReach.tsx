import { Truck, MapPin, ArrowRight } from "lucide-react";

// Edit these two values when the sales figure changes.
const MONTHLY_VOLUME = "300 - 500";
const MONTHLY_UNIT = "Tons";

export default function SupplyReach() {
  return (
    <section
      id="supply"
      aria-label="Monthly supply volume across India"
      className="py-14 lg:py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#fb923c,transparent_45%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-5 text-center sm:text-left flex-col sm:flex-row">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-400/30 text-orange-400 flex items-center justify-center shrink-0">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-orange-300">
              Monthly Sales Volume
            </div>
            <div className="mt-1 flex items-end justify-center sm:justify-start gap-2">
              <span className="text-5xl sm:text-6xl font-black font-mono leading-none text-white">
                {MONTHLY_VOLUME}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-orange-400 pb-1">{MONTHLY_UNIT}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-200">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Supplied to fabricators and dealers pan-India, every month</span>
            </div>
          </div>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/30 transition-all shrink-0"
        >
          <span>Become a Dealer / Fabricator</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
