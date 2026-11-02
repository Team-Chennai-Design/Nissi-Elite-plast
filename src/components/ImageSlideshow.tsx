"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Maximize2,
} from "lucide-react";

export default function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      tag: "3 Track Multi-Panel System",
      title: "Grand Panoramic Sliding Doors",
      series: "Nissi 3T Frame (NEP-1019) with Big Sash (NEP-1011)",
      specs: "112mm Heavy-Duty Frame • Silent Tandem Rollers • Thermal Insulated Glass",
      location: "Luxury Waterfront Residence, Chennai",
      badge: "66% Clear Opening Span",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      tag: "Architectural Color Profiles",
      title: "Anthracite Grey Modern Casement Facade",
      series: "60 Casement Series with European Grey Foil",
      specs: "Class A 2.3mm Wall Thickness • Multi-Point Security Locks • EPDM Gaskets",
      location: "Contemporary Villa, Coimbatore",
      badge: "20-Year Foil Warranty",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      tag: "Laminated Woodgrain Finishes",
      title: "Golden Oak Textured French Windows",
      series: "Golden Oak Laminated Profiles (Hot Melt PUR Technology)",
      specs: "Natural European Oak Texture • 100% Termite & Moisture Immune • Zero Maintenance",
      location: "Executive Bungalow, Bengaluru",
      badge: "Realistic Wood Finish",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80",
      tag: "High-Rise Wind Load Ready",
      title: "Cyclone-Resistant High-Rise Balcony Sliders",
      series: "2.5 Track Sliding Series with Integrated Mosquito Net (NEP-1016 & NEP-1018)",
      specs: "In-House Galvanized Steel Core • Tested >2,500 Pa Gale Wind Pressure",
      location: "Sea-Facing Penthouse, Chennai",
      badge: "Tropical Grade (Class S)",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      tag: "Acoustic Proofing & Quiet Living",
      title: "Soundproof Casement Windows with T-Mullion",
      series: "60 Casement Double Open with Fixed Window (NEP-1004 & NEP-1006)",
      specs: "Dampens External Traffic Noise up to 40dB • 100% Lead-Free Non-Toxic Formulation",
      location: "Urban Residence, Madurai",
      badge: "Up to 40dB Reduction",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
      tag: "State-of-the-Art Manufacturing",
      title: "Avadi Mega Extrusion Plant & Testing Lab",
      series: "4 Floors • 20,000 Sq.Ft • 6 European Extrusion Lines",
      specs: "Automated Gravimetric Dosing • 2 PUR Color Laminators • 8,000 Sq.Ft Steel Plant",
      location: "Avadi Industrial Zone, Chennai - 600 056",
      badge: "6 Automated Extruders",
    },
  ];

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentIndex];

  return (
    <section className="py-20 lg:py-24 bg-slate-950 text-white relative overflow-hidden border-y border-slate-900">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Architectural Showcase & Real Installations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Nissi in Action:{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Elegance in Every Frame
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
              Discover how architects, builders, and fabricators across India elevate residential and commercial projects with Nissi Elite Plast profiles.
            </p>
          </div>

          {/* Slideshow Controls (Play/Pause, Counter, Arrows) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500 text-slate-300 hover:text-white transition-colors"
              title={isPlaying ? "Pause Slideshow" : "Resume Slideshow"}
              aria-label={isPlaying ? "Pause Slideshow" : "Resume Slideshow"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={prevSlide}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500 text-slate-300 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-orange-400">
              0{currentIndex + 1} / 0{slides.length}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500 text-slate-300 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Slideshow Stage */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
          {/* Main Slide Image */}
          <div className="relative h-[420px] sm:h-[540px] lg:h-[620px] w-full overflow-hidden">
            <img
              src={current.image}
              alt={current.title}
              key={current.id}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 animate-in fade-in zoom-in-95 duration-500"
            />

            {/* Gradient Overlays for contrast and typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
          </div>

          {/* Top Left Floating Tag */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-xs font-bold uppercase tracking-wider text-orange-400 shadow-lg">
              {current.tag}
            </div>
            <div className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-orange-600/90 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
              {current.badge}
            </div>
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{current.location}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {current.title}
              </h3>

              <div className="mt-2 text-sm sm:text-base font-medium text-orange-300">
                {current.series}
              </div>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {current.specs}
              </p>

              {/* Action Button */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-600/30 transition-all hover:scale-105"
                >
                  <span>Enquire for This Specification</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#profiles"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  <span>View Technical CAD Specs</span>
                </a>
              </div>
            </div>
          </div>

          {/* Autoplay progress bar */}
          {isPlaying && (
            <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-800">
              <div
                key={currentIndex}
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 w-full animate-[progress_5s_linear]"
                style={{
                  animation: "progress 5s linear infinite",
                }}
              />
            </div>
          )}
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {slides.map((s, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentIndex(idx);
                }}
                className={`relative rounded-xl overflow-hidden h-20 sm:h-24 border-2 transition-all text-left group ${
                  isActive
                    ? "border-orange-500 ring-2 ring-orange-500/30 scale-[1.03]"
                    : "border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/10 transition-colors" />
                <div className="absolute bottom-1.5 left-2 right-2">
                  <div className="text-[10px] font-bold text-white truncate drop-shadow">
                    {s.title}
                  </div>
                </div>
                {isActive && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-400 shadow" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
