import Image from "next/image";
import Logo from "./Logo";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Download,
  PhoneCall,
} from "lucide-react";

export default function Hero() {
  const trustPillars = [
    {
      title: "100% Lead-Free",
      desc: "Safe & eco-friendly green formulation",
      badge: "Eco Certified",
    },
    {
      title: "15-Year Warranty",
      desc: "Guaranteed against warping & discolouration",
      badge: "Quality Assured",
    },
    {
      title: "European Technology",
      desc: "High-precision extrusion tooling & PUR lamination",
      badge: "German Standards",
    },
    {
      title: "In-House Steel",
      desc: "8,000 sq.ft dedicated reinforcement plant",
      badge: "High-Rise Ready",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-To-Actions */}
          <div className="lg:col-span-7">
            {/* Tagline Eyebrow & Brand Logo */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              <Logo variant="light" size="default" />
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Nissi Extrusion India Pvt Ltd</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300 font-medium">Roots Since 2010</span>
              </div>
            </div>

            {/* Main Headline from Catalog */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              Strength in Every Line,{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Elegance in Every Curve
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Engineered with advanced European extrusion technology in Avadi, Chennai. 
              <strong> NISSI Elite Plast</strong> manufactures 100% lead-free, cyclone-resistant, 
              acoustically insulated uPVC window and door profiles backed by a 15-year warranty.
            </p>

            {/* Key badges row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="text-orange-400 font-bold">🇮🇳 Made in India</span>
                <span className="text-slate-400">Class A Profiles</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Lead-Free (RoHS Certified)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-700/50 text-amber-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>15-Year Profile Guarantee</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-xl shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Become a Fabricator / Dealer</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#brochure"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:text-white transition-all backdrop-blur-sm"
              >
                <Download className="w-4 h-4 text-orange-400" />
                <span>Download Product Manual</span>
              </a>
            </div>

            {/* Quick Contact hotline */}
            <div className="mt-8 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <PhoneCall className="w-4 h-4 text-orange-400" />
                <span>Factory Enquiry:</span>
                <a href="tel:+919962225516" className="text-orange-400 hover:underline">
                  +91 99622 25516
                </a>
              </div>
              <span>•</span>
              <div>Chennai, Tamil Nadu</div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card representing the modern villa from manual page 1 */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900 group">
              {/* Architecture Image */}
              <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="uPVC casement and sliding windows fitted in a modern luxury villa"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating Profile Badge */}
              <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-xl shadow-lg">
                <div className="text-[10px] text-orange-400 uppercase tracking-widest font-bold">
                  Class A Profile
                </div>
                <div className="text-xs font-semibold text-white">
                  Wall Thickness 2.2 - 2.3mm
                </div>
              </div>

              {/* Bottom Card Overlay Details */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                      Signature Series
                    </span>
                    <h2 className="text-lg font-bold text-white">
                      60 Casement & Multi-Track Sliding
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      European Foils • Hot Melt PUR Technology • Zero Maintenance
                    </p>
                  </div>
                  <div className="bg-white px-3.5 py-1.5 rounded-xl shadow-lg border border-slate-200/50 shrink-0 flex items-center">
                    <Image
                      src="/logo.svg"
                      alt="NISSI Elite Plast UPVC Profiles"
                      width={140}
                      height={39}
                      className="h-8 sm:h-9 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Floating stats tag */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                20k
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-900 uppercase">
                  Avadi Mega Facility
                </div>
                <div className="text-[11px] text-slate-600">
                  4 Floors • 6 Extruders • 300-500 Tons/month
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trust Pillars Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPillars.map((pillar, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-orange-500/50 hover:bg-slate-800/90 transition-all"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-1">
                {pillar.badge}
              </div>
              <div className="text-base font-bold text-white">{pillar.title}</div>
              <div className="text-xs text-slate-400 mt-1">{pillar.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
