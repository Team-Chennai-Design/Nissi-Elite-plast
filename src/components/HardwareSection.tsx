import {
  Wrench,
  Layers,
  ShieldCheck,
  CheckCircle,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function HardwareSection() {
  const hardwareItems = [
    {
      name: "Galvanized Steel Reinforcement Coils",
      source: "In-House 8,000 Sq.Ft Plant",
      desc: "Custom-rolled C-channels, U-channels, and box profiles with heavy zinc galvanization, preventing rust and ensuring structural rigidity in high-rise coastal winds.",
      tag: "Produced In-House",
    },
    {
      name: "Nissi Weather Strips & Gaskets",
      source: "Nissi Hardware Division",
      desc: "High-density silicone-treated wool pile and EPDM rubber seals providing airtight, watertight insulation against torrential monsoon rains and city pollution.",
      tag: "All-Weather Sealing",
    },
    {
      name: "Fix & Stay Friction Hinges",
      source: "Heavy Duty SS 304",
      desc: "Non-corrosive stainless steel friction stays tested to over 25,000 opening cycles without drooping, suitable for heavy casement sashes.",
      tag: "Tested 25k Cycles",
    },
    {
      name: "Multi-Point Security Locks & Rollers",
      source: "Precision Engineered",
      desc: "Smooth gliding tandem rollers with sealed needle bearings paired with multi-point espagnolette locking bars for maximum anti-burglary protection.",
      tag: "Anti-Burglary Grade",
    },
  ];

  return (
    <section id="hardware" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">
            Hardware & Reinforcement Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Complete Systems from{" "}
            <span className="text-orange-600">Nissi Hardware & Steel</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            A window profile is only as durable as its internal reinforcement and operating hardware. 
            Nissi delivers a 100% integrated solution eliminating the need to source multiple vendors.
          </p>
        </div>

        {/* 4 Hardware Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hardwareItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-orange-600/10 text-orange-700 text-[10px] font-bold uppercase tracking-wider mb-4">
                  {item.tag}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {item.name}
                </h3>
                <div className="text-xs font-semibold text-slate-500 mb-3">
                  {item.source}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
                >
                  <span>Enquire for Wholesale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* High-Rise Wind Load Feature Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
              High-Rise & Coastal Tower Ready
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Zero Compromise on Structural Wind Load
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Our in-house 8,000 sq.ft steel reinforcement facility manufactures heavy-gauge galvanized steel cores tailored exactly to Nissi profiles. This guarantees that installations easily withstand cyclone wind pressures exceeding 2,500 Pascals (approx 200 km/h winds).
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 shadow-xl shadow-orange-600/30 transition-all hover:scale-105"
          >
            Become a Registered Fabricator
          </a>
        </div>
      </div>
    </section>
  );
}
