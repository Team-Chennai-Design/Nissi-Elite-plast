import {
  Factory,
  Cog,
  Gauge,
  CheckCircle2,
  Layers,
  Sparkles,
  Building,
  Microscope,
} from "lucide-react";

export default function Manufacturing() {
  const machineryStats = [
    { value: "6", label: "High-Speed Extruders", note: "European extrusion tooling" },
    { value: "2", label: "PUR Color Laminators", note: "Hot-melt coil lamination" },
    { value: "20,000", label: "Sq.Ft Extrusion Plant", note: "4-floor modern facility in Avadi" },
    { value: "8,000", label: "Sq.Ft Steel Factory", note: "Dedicated reinforcement coil plant" },
  ];

  const qualityTests = [
    {
      title: "Corner Weld Strength Test",
      desc: "Hydraulic stress testing ensuring frame corners exceed EN 514 rupture thresholds.",
    },
    {
      title: "Heat Reversion & Shrinkage",
      desc: "Thermal oven conditioning at 150°C to guarantee zero dimensional distortion.",
    },
    {
      title: "Charpy Impact Resistance",
      desc: "Weighted falling-dart impact tests at freezing temperatures ensuring fracture toughness.",
    },
    {
      title: "Accelerated Xenon UV Weathering",
      desc: "Simulates 15+ years of intense tropical solar radiation and humidity.",
    },
  ];

  return (
    <section id="manufacturing" className="py-20 lg:py-28 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">
            Infrastructure & Quality Control
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            High-Precision European Technology in{" "}
            <span className="text-orange-600">Avadi, Chennai</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Our multi-story manufacturing facility is equipped with state-of-the-art extrusion lines, 
            precision chemical blending systems, and automated color laminators engineered to produce flawless uPVC profiles.
          </p>
        </div>

        {/* Machinery Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {machineryStats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all"
            >
              <div className="text-3xl sm:text-4xl font-black text-orange-600 font-mono">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-900 mt-2">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {stat.note}
              </div>
            </div>
          ))}
        </div>

        {/* Plant Features & Lab Testing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Factory Capabilities */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">
              Integrated Extrusion, Lamination & Steel Fabrication
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Covering 20,000 square feet across four modern production floors in Avadi, our plant operates 24/7 with continuous computerized gravimetric dosing. This ensures identical compound density, wall thickness, and polymer integrity from the first meter to the thousandth.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              By combining in-house European hot melt PUR lamination with our separate 8,000 sq.ft steel reinforcement division, we supply window and door fabricators with a 100% harmonized, turnkey profile and hardware ecosystem.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Virgin PVC Resin</div>
                  <div className="text-[11px] text-slate-500">Zero recycled scrap contamination</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Ca-Zn Stabilizers</div>
                  <div className="text-[11px] text-slate-500">100% Pb-free, safe for children</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Rutile TiO2 Content</div>
                  <div className="text-[11px] text-slate-500">Extreme tropical UV resistance</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">ISO & EN Compliance</div>
                  <div className="text-[11px] text-slate-500">Exceeds national window benchmarks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: In-House Quality Testing Lab */}
          <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-8 text-white border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-3">
              <Microscope className="w-4 h-4" />
              <span>Rigorous Laboratory Testing</span>
            </div>
            <h4 className="text-xl font-bold mb-6">
              Every Batch Undergoes 4-Point Quality Testing
            </h4>

            <div className="space-y-4">
              {qualityTests.map((test, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60"
                >
                  <div className="text-sm font-bold text-orange-300">
                    {test.title}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {test.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Class S Tropical Certified</span>
              <span className="text-orange-400 font-bold">15-Year Backed Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
