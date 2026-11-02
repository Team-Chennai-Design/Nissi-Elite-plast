import {
  VolumeX,
  CloudRain,
  ShieldAlert,
  Clock,
  ThermometerSnowflake,
  Box,
  Sparkles,
  Leaf,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function WhyUpvc() {
  const benefits = [
    {
      icon: VolumeX,
      title: "Acoustic Proofing",
      desc: "Multi-chambered profile geometry combined with high-grade EPDM weather stripping dampens external noise by up to 40dB, creating tranquil indoor spaces.",
      metric: "Up to 40dB Reduction",
    },
    {
      icon: CloudRain,
      title: "Extreme Weather Resistance",
      desc: "Specially formulated for harsh Indian tropical weather and coastal monsoons. Does not fade, swell, chalk, or deteriorate under scorching UV sunlight or heavy downpours.",
      metric: "Tropical Grade (Class S)",
    },
    {
      icon: ShieldAlert,
      title: "Impact & Cyclone Resistance",
      desc: "Reinforced with thick galvanized steel channels produced in-house, Nissi profiles easily withstand gale-force wind loads in high-rise coastal developments.",
      metric: "High-Rise Certified",
    },
    {
      icon: ThermometerSnowflake,
      title: "Thermal Insulation & Energy Savings",
      desc: "uPVC is a natural thermal insulator with remarkably low thermal conductivity, preventing heat gain and reducing air conditioning electricity bills by up to 30%.",
      metric: "Save ~30% AC Energy",
    },
    {
      icon: Box,
      title: "Dimensional Stability",
      desc: "Unlike timber that expands with humidity or aluminium that distorts with heat, Nissi uPVC profiles retain their precise millimeter tolerances year after year.",
      metric: "Zero Warping or Jamming",
    },
    {
      icon: Sparkles,
      title: "100% Maintenance Free",
      desc: "Never requires sanding, varnishing, or repainting. Termite-proof, salt-spray immune, and effortlessly cleans with a simple damp cloth wipe.",
      metric: "Zero Painting Cost",
    },
    {
      icon: Leaf,
      title: "100% Lead-Free & Eco-Friendly",
      desc: "Formulated with calcium-zinc organic stabilizers instead of toxic heavy metal lead, ensuring safe indoor air quality and 100% recyclability.",
      metric: "Non-Toxic & Recyclable",
    },
    {
      icon: Clock,
      title: "Enduring 15-Year Guarantee",
      desc: "Backed by an official 15-year warranty against yellowing, brittleness, and structural deformation, offering unmatched lifetime value.",
      metric: "15-Year Guarantee",
    },
  ];

  return (
    <section id="why-upvc" className="py-20 lg:py-28 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">
            Engineered Performance
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              NISSI Elite Plast
            </span>{" "}
            uPVC?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Traditional wood rots and requires constant upkeep. Aluminium transfers heat and corrodes in coastal air. 
            Nissi European-standard uPVC delivers the ultimate blend of beauty, thermal efficiency, and lifelong durability.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-orange-500 hover:bg-slate-800 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-orange-400">
                  <span>Standard Benchmark:</span>
                  <span className="text-white font-bold">{item.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Material Comparison Matrix */}
        <div className="mt-20 p-6 sm:p-10 rounded-3xl bg-slate-950 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white">
              Nissi uPVC vs Traditional Materials
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              A comprehensive technical comparison for builders, architects, and homeowners
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-4 px-4">Performance Criteria</th>
                  <th className="py-4 px-4 text-orange-400 font-bold bg-orange-950/20 rounded-t-xl">
                    NISSI Elite Plast uPVC
                  </th>
                  <th className="py-4 px-4">Traditional Wood</th>
                  <th className="py-4 px-4">Standard Aluminium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Thermal Insulation (Energy Saving)</td>
                  <td className="py-4 px-4 font-bold text-emerald-400 bg-orange-950/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Excellent (Low U-Value)
                  </td>
                  <td className="py-4 px-4 text-slate-400">Moderate</td>
                  <td className="py-4 px-4 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" /> Poor (Conducts Heat)
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Acoustic / Sound Insulation</td>
                  <td className="py-4 px-4 font-bold text-emerald-400 bg-orange-950/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> High (Up to 40 dB)
                  </td>
                  <td className="py-4 px-4 text-slate-400">Moderate</td>
                  <td className="py-4 px-4 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" /> Low (Vibrates easily)
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Weather & Monsoon Resistance</td>
                  <td className="py-4 px-4 font-bold text-emerald-400 bg-orange-950/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Watertight & Airtight
                  </td>
                  <td className="py-4 px-4 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" /> Swells & Rots in Rain
                  </td>
                  <td className="py-4 px-4 text-slate-400">Prone to joint leaks</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Termite & Pest Attack</td>
                  <td className="py-4 px-4 font-bold text-emerald-400 bg-orange-950/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Immune
                  </td>
                  <td className="py-4 px-4 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" /> Highly Vulnerable
                  </td>
                  <td className="py-4 px-4 text-slate-400">Immune</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Maintenance Requirements</td>
                  <td className="py-4 px-4 font-bold text-emerald-400 bg-orange-950/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero (Simple Soap Wash)
                  </td>
                  <td className="py-4 px-4 text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" /> High (Polishing/Painting)
                  </td>
                  <td className="py-4 px-4 text-slate-400">Moderate (Anodize issues)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Lifespan & Warranty</td>
                  <td className="py-4 px-4 font-bold text-emerald-400 bg-orange-950/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 15-Year Backed Guarantee
                  </td>
                  <td className="py-4 px-4 text-slate-400">Subjective to moisture</td>
                  <td className="py-4 px-4 text-slate-400">Limited warranty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
