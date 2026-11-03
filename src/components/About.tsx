import Image from "next/image";
import {
  Factory,
  Wrench,
  Armchair,
  Layers,
  HeartHandshake,
} from "lucide-react";

export default function About() {
  const milestones = [
    { year: "2010", event: "Pioneered uPVC fabrication and hardware trading in Chennai" },
    { year: "2018", event: "Launched dedicated steel coil reinforcement manufacturing facility" },
    { year: "2021", event: "Opened 20,000 sq.ft state-of-the-art Furniture & uPVC showroom" },
    { year: "2024", event: "Incorporated Nissi Extrusion India Pvt Ltd with 4-floor Avadi Mega Extrusion Plant" },
  ];

  const divisions = [
    {
      icon: Factory,
      title: "Nissi Extrusion Mega Plant",
      location: "Avadi, Chennai",
      stats: "20,000 sq.ft • 4 Floors",
      desc: "Equipped with 6 high-precision extruder machines and 2 hot-melt PUR color foil laminators, engineering top-tier Class A uPVC profiles.",
    },
    {
      icon: Layers,
      title: "In-House Steel Reinforcement",
      location: "Dedicated Facility",
      stats: "8,000 sq.ft Plant",
      desc: "Fabricates heavy-gauge galvanized steel reinforcement coils in-house, ensuring unmatched structural wind-load strength for high-rise towers.",
    },
    {
      icon: Wrench,
      title: "Nissi Hardware Division",
      location: "Comprehensive Trading",
      stats: "Complete uPVC Systems",
      desc: "Supplies high-grade fix-and-stay systems, friction hinges, multi-point locks, rollers, and custom Nissi weather strips.",
    },
    {
      icon: Armchair,
      title: "Nissi Furniture Unit",
      location: "Chennai Experience Center",
      stats: "20,000 sq.ft Showroom",
      desc: "Showcases premium, durable, and aesthetically appealing residential and office furniture combining elegance with ergonomic utility.",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="max-w-3xl">
          <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">
            About Nissi Extrusion India Pvt Ltd
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Built on a Decade of Precision,{" "}
            <span className="text-orange-600">Engineered for Generations</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
            With roots dating back to 2010 in uPVC fabrication and hardware trading, 
            <strong> Nissi Extrusion India Pvt Ltd</strong> has grown into one of South India&apos;s 
            most technologically advanced and comprehensive uPVC profiles manufacturing ecosystems.
          </p>
        </div>

        {/* Narrative & Image Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p>
              Headquartered in Chennai, we operate a fully integrated production ecosystem: from 
              our <strong>20,000 sq.ft Avadi extrusion factory</strong> operating 6 automated European-tech 
              extrusion lines and 2 color coil laminating machines, to our <strong>8,000 sq.ft dedicated 
              steel reinforcement manufacturing plant</strong>.
            </p>
            <p>
              Unlike standard profile suppliers, we control every critical link in the quality chain. 
              Our profiles are formulated with <strong>100% lead-free, non-toxic stabilizers</strong> designed 
              expressly to withstand tropical sunlight, extreme humidity, high coastal winds, and saline environments 
              without yellowing, cracking, or losing tensile strength.
            </p>

            {/* Pan-India Network Banner */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center shrink-0 text-white font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Pan-India Fabricator & Dealer Network
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Empowering architects, developers, fabricators, and homeowners nationwide with verified, direct factory access to Nissi Elite Plast profiles, prompt dispatch, and dedicated technical support.
                </p>
              </div>
            </div>

            {/* Core Values Quote from Manual */}
            <div className="p-4 rounded-xl bg-orange-50/70 border-l-4 border-orange-500 text-xs sm:text-sm text-slate-700 italic">
              &ldquo;We take a moment to thank God for His endless blessings, guidance, and support. Without His grace, we would not be where we are today.&rdquo;
              <span className="block not-italic font-bold text-slate-900 mt-1">
                — The Nissi Extrusion Leadership Team
              </span>
            </div>
          </div>

          {/* Right Column: Factory Image & Infrastructure Quick-Look */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative h-80 sm:h-96 w-full">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="European precision tooling and extrusion lines"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs uppercase font-bold text-orange-400">
                  Avadi, Chennai Facility
                </div>
                <div className="text-xl font-bold mt-1">
                  Precision European Tooling
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  High-capacity automated extrusion ensuring dimensional tolerance &lt; 0.1mm
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Dedicated Divisions */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">
              Integrated Capabilities
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
              The Four Pillars of the Nissi Ecosystem
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div, i) => {
              const Icon = div.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 mb-1">
                    {div.location} • {div.stats}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {div.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {div.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mt-20 p-8 rounded-3xl bg-slate-900 text-white">
          <div className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">
            Growth & Proven Track Record
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-8">
            Decade-Long Evolution in Fenestration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="border-l-2 border-orange-500 pl-4 py-1">
                <div className="text-2xl font-black text-orange-400 font-mono">
                  {m.year}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
