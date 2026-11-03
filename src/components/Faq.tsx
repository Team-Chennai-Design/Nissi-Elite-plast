"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes NISSI Elite Plast uPVC profiles 100% lead-free and eco-friendly?",
      a: "Our uPVC profiles are formulated exclusively with non-toxic calcium-zinc (Ca-Zn) organic stabilizers instead of conventional heavy-metal lead. This complies with European RoHS standards, guarantees safe indoor air quality for homes and schools, and ensures the profiles are 100% recyclable.",
    },
    {
      q: "What is the difference between the 15-Year and 20-Year warranties?",
      a: "We offer a 15-Year structural warranty on our virgin white base uPVC extrusion profiles against yellowing, brittleness, and warping in Indian tropical climates. For our colour profiles (Golden Oak, Dark Oak, Anthracite Grey, Walnut), we use European-grade laminated foils with hot-melt PUR technology backed by a 20-Year warranty against peeling, bubbling, and UV fading.",
    },
    {
      q: "Why is in-house steel reinforcement critical for high-rise buildings?",
      a: "Many suppliers use uncertified, thin third-party steel that rusts inside profile chambers. At Nissi, our dedicated 8,000 sq.ft facility produces heavy-gauge galvanized steel reinforcement coils (C-channels, U-channels, and box sections) in-house. This gives windows and doors the structural moment of inertia needed to withstand intense cyclone winds and high wind loads in coastal and high-rise apartments.",
    },
    {
      q: "How does the 2.5 Track Sliding Series with integrated mesh work?",
      a: "The 2.5 Track system (NEP-1016) features an integrated third track specifically engineered for stainless steel or fiberglass insect/mosquito mesh sashes. This allows full ventilation and natural airflow while maintaining a complete insect barrier, making it the ideal choice for residential bedrooms and living rooms.",
    },
    {
      q: "How can window and door fabricators partner with Nissi Extrusion?",
      a: "We supply profile bundles, steel reinforcement sections, and hardware directly from our 20,000 sq.ft mega extrusion plant in Avadi, Chennai. Registered fabricators receive technical CAD drawings, cutting charts, fabrication training, and priority logistics dispatch across South India and nationwide.",
    },
    {
      q: "What wall thickness and standards do Nissi profiles adhere to?",
      a: "All main load-bearing profiles (frames and sashes) are manufactured to Class A standards with wall thicknesses between 2.2mm and 2.3mm. They are formulated with high rutile titanium dioxide (TiO2) content for Class S severe tropical climate resistance.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Everything You Need to Know About{" "}
            <span className="text-orange-600">Nissi uPVC</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Technical clarity for architects, fabricators, builders, and homeowners.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
