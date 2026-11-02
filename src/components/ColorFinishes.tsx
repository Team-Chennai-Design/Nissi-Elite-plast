"use client";

import { useState } from "react";
import { Check, ShieldCheck, Sparkles, Award } from "lucide-react";

export default function ColorFinishes() {
  const [selectedColor, setSelectedColor] = useState<string>("golden-oak");

  const colors = [
    {
      id: "golden-oak",
      name: "Golden Oak",
      type: "Woodgrain Finish",
      code: "FOIL-GO101",
      hex: "#b47836",
      bgClass: "from-amber-600 to-yellow-800",
      description: "Warm, radiant natural oak grain reflecting timeless European architecture.",
    },
    {
      id: "dark-oak",
      name: "Dark Oak",
      type: "Woodgrain Finish",
      code: "FOIL-DO102",
      hex: "#4a3320",
      bgClass: "from-amber-950 to-stone-900",
      description: "Deep, stately espresso wood tones tailored for high-end luxury residences.",
    },
    {
      id: "grey",
      name: "Anthracite Grey",
      type: "Modern Metal Finish",
      code: "FOIL-GR103",
      hex: "#374151",
      bgClass: "from-slate-700 to-gray-900",
      description: "Sleek, minimalist architectural slate grey complementing contemporary facades.",
    },
    {
      id: "golden-oak-r",
      name: "Golden Oak R",
      type: "Textured Woodgrain",
      code: "FOIL-GOR104",
      hex: "#9a652a",
      bgClass: "from-amber-700 to-yellow-900",
      description: "Deep textured rustic oak grain with enhanced surface tactile realism.",
    },
    {
      id: "walnut",
      name: "Walnut",
      type: "Woodgrain Finish",
      code: "FOIL-WL105",
      hex: "#5c4033",
      bgClass: "from-amber-900 to-stone-800",
      description: "Rich, chocolate walnut grain offering executive warmth and understated luxury.",
    },
    {
      id: "white",
      name: "Classic Virgin White",
      type: "High-Gloss Base Profile",
      code: "BASE-W01",
      hex: "#f8fafc",
      bgClass: "from-white to-slate-200",
      description: "Flawless European brilliant white with UV-stabilized anti-yellowing formulation.",
    },
  ];

  const active = colors.find((c) => c.id === selectedColor) || colors[0];

  return (
    <section id="colours" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">
            Laminated Finishes & Foils
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Realistic Wooden Textures &{" "}
            <span className="text-orange-600">Architectural Finishes</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Manufactured with European-grade laminated foils using advanced Hot Melt PUR technology. 
            Backed by a 20-year warranty against peeling, bubbling, and UV fading.
          </p>
        </div>

        {/* Color Palette Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {colors.map((c) => {
            const isSelected = selectedColor === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedColor(c.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "border-orange-600 ring-2 ring-orange-600/30 shadow-lg scale-105 bg-orange-50/20"
                    : "border-slate-200 hover:border-slate-400 bg-white"
                }`}
              >
                {/* Color Swatch Circle */}
                <div
                  className={`w-full h-20 rounded-xl bg-gradient-to-br ${c.bgClass} shadow-inner border border-black/10 flex items-center justify-center`}
                >
                  {isSelected && (
                    <div className="w-8 h-8 rounded-full bg-white/90 text-orange-600 flex items-center justify-center shadow-md">
                      <Check className="w-5 h-5 font-bold" />
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {c.type}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {c.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Finish Visualizer Display */}
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual preview box */}
            <div className="lg:col-span-5">
              <div
                className={`h-56 sm:h-64 rounded-2xl bg-gradient-to-br ${active.bgClass} p-6 shadow-2xl border border-white/20 flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-white self-start">
                  {active.code}
                </div>
                <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl">
                  <div className="text-xl font-black text-white">{active.name}</div>
                  <div className="text-xs text-orange-300">{active.type}</div>
                </div>
              </div>
            </div>

            {/* Description & 6 Manual Highlights */}
            <div className="lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">
                European Foil Specification
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {active.name} Profile Coating
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {active.description}
              </p>

              {/* 6 Core Bullet Points from Page 15 of Manual */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Variety of colors for every architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Realistic wooden textures & metal finishes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>European-grade laminated foils</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Hot melt PUR technology for finish durability</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="font-bold text-white">Backed by reliable 20-year warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold text-emerald-300">Always in stock for immediate dispatch</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 shadow-md shadow-orange-600/30 transition-all"
                >
                  Request Physical Swatch Kit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
