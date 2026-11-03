"use client";

import { useState } from "react";
import {
  CheckCircle,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<string>("casement");

  const seriesData: Record<
    string,
    {
      title: string;
      subtitle: string;
      description: string;
      highlights: string[];
      specs: {
        code: string;
        name: string;
        weight: string;
        length: string;
        thickness: string;
        pcsBag: number | string;
      }[];
    }
  > = {
    casement: {
      title: "60 Casement Series",
      subtitle: "Windows, Doors, Fixed & Combination Frames",
      description:
        "The flagship 60mm Casement Series by Nissi provides unmatched acoustic insulation, airtight compression sealing, and robust security for modern residential villas and commercial spaces.",
      highlights: [
        "Multi-point locking mechanism compatibility for top-tier security",
        "Dual EPDM compression gaskets prevent air & water infiltration",
        "Supports single & double insulated glass units (IGU)",
        "Class A 2.2mm - 2.3mm heavy-duty outer wall thickness",
      ],
      specs: [
        { code: "NEP-1001", name: "Casement Window Frame", weight: "0.970 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 6 },
        { code: "NEP-1002", name: "Casement Door Frame", weight: "1.080 kg/m", length: "5.8 - 6.0 m", thickness: "2.3 mm", pcsBag: 6 },
        { code: "NEP-1003", name: "Casement Window Frame Small", weight: "0.890 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 6 },
        { code: "NEP-1004", name: "Casement Window Sash", weight: "1.120 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 6 },
        { code: "NEP-1005", name: "Casement Door Sash Outward", weight: "1.340 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 4 },
        { code: "NEP-1006", name: "T - Mullion", weight: "1.010 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 6 },
        { code: "NEP-1007", name: "Casement Single Glass Bead", weight: "0.270 kg/m", length: "5.8 - 6.0 m", thickness: "1.6 mm", pcsBag: 20 },
        { code: "NEP-1009", name: "Door Panel", weight: "0.810 kg/m", length: "5.8 - 6.0 m", thickness: "1.5 mm", pcsBag: 5 },
      ],
    },
    sliding2t: {
      title: "2 Track Sliding Series",
      subtitle: "Compact & Smooth Glide 2-Panel Systems",
      description:
        "Engineered for space-efficient panoramic outdoor views. Features high-load stainless steel roller tracks, multi-chamber thermal barriers, and precision interlocks.",
      highlights: [
        "Effortless silent sliding action with heavy-duty bearing rollers",
        "Optimal drainage channels prevent rainwater accumulation",
        "Reinforced interlocks resist high monsoon wind pressures",
        "Supports glass thickness: 4.5mm - 5mm single/double glazing",
      ],
      specs: [
        { code: "NEP-1010", name: "2 Track Frame", weight: "1.071 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 6 },
        { code: "NEP-1011", name: "Sliding Sash - Big 66mm", weight: "0.950 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 6 },
        { code: "NEP-1012", name: "Sliding Sash - Small 58mm", weight: "0.820 kg/m", length: "5.8 m", thickness: "2.0 mm", pcsBag: 6 },
        { code: "NEP-1013", name: "Sliding Door Sash", weight: "1.120 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 4 },
        { code: "NEP-1014", name: "Sliding Window Interlock", weight: "0.203 kg/m", length: "5.8 - 6.0 m", thickness: "1.5 mm", pcsBag: 20 },
        { code: "NEP-1015", name: "Sliding Door Interlock", weight: "0.241 kg/m", length: "5.8 m", thickness: "1.5 mm", pcsBag: 20 },
        { code: "NEP-1008", name: "Sliding Single Glass Bead", weight: "0.210 kg/m", length: "5.8 m", thickness: "1.6 mm", pcsBag: 20 },
      ],
    },
    sliding25t: {
      title: "2.5 Track Sliding Series (With Mesh)",
      subtitle: "Integrated Mosquito & Insect Net Track",
      description:
        "The ideal fenestration solution for tropical Indian climates. Features a dedicated third track specifically engineered for stainless steel or fiberglass mosquito mesh sashes.",
      highlights: [
        "Integrated insect mesh sash allows fresh air while blocking mosquitoes & bugs",
        "Heavy-duty 90mm frame width for enhanced structural rigidity",
        "Independent mesh sash glide with custom mesh mullion NEP-1017",
        "Perfect for bedrooms, apartments, and villas prone to insects",
      ],
      specs: [
        { code: "NEP-1016", name: "2.5T Frame 90mm", weight: "1.310 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 4 },
        { code: "NEP-1018", name: "Mesh Sash", weight: "0.460 kg/m", length: "5.8 m", thickness: "1.7 mm", pcsBag: 10 },
        { code: "NEP-1017", name: "Mesh Mullion", weight: "0.360 kg/m", length: "5.8 m", thickness: "1.4 mm", pcsBag: 10 },
        { code: "NEP-1011", name: "Sliding Sash - Big 66mm", weight: "0.950 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 6 },
        { code: "NEP-1012", name: "Sliding Sash - Small 58mm", weight: "0.820 kg/m", length: "5.8 m", thickness: "2.0 mm", pcsBag: 6 },
        { code: "NEP-1013", name: "Sliding Door Sash", weight: "1.120 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 4 },
        { code: "NEP-1014", name: "Sliding Window Interlock", weight: "0.203 kg/m", length: "5.8 - 6.0 m", thickness: "1.5 mm", pcsBag: 20 },
      ],
    },
    sliding3t: {
      title: "3 Track Sliding Series",
      subtitle: "Expansive 3-Panel & Multi-Sash Systems",
      description:
        "Designed for grand balcony openings, living rooms, and scenic terraces requiring wider 66% clear opening space with multi-panel sliding flexibility.",
      highlights: [
        "Substantial 112mm outer frame for maximum load capacity and stability",
        "Enables 3 sliding glass panels or 2 glass panels + 1 mesh panel",
        "Seamless connectivity between interior living areas and outdoor patios",
        "Engineered for high-wind loads in multi-storey coastal apartments",
      ],
      specs: [
        { code: "NEP-1019", name: "3T Frame 112mm", weight: "1.560 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 4 },
        { code: "NEP-1011", name: "Sliding Sash - Big 66mm", weight: "0.950 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 6 },
        { code: "NEP-1013", name: "Sliding Door Sash", weight: "1.120 kg/m", length: "5.8 m", thickness: "2.2 mm", pcsBag: 4 },
        { code: "NEP-1014", name: "Sliding Window Interlock", weight: "0.203 kg/m", length: "5.8 - 6.0 m", thickness: "1.5 mm", pcsBag: 20 },
        { code: "NEP-1015", name: "Sliding Door Interlock", weight: "0.241 kg/m", length: "5.8 m", thickness: "1.5 mm", pcsBag: 20 },
        { code: "NEP-1008", name: "Sliding Single Glass Bead", weight: "0.210 kg/m", length: "5.8 m", thickness: "1.6 mm", pcsBag: 20 },
      ],
    },
    auxiliary: {
      title: "Auxiliary & Architectural Profiles",
      subtitle: "Couplers, Grill Profiles, Louvers & Corner Poles",
      description:
        "Comprehensive structural joining and ventilation profiles that allow fabricators to execute bay windows, 90-degree corners, louvers, and integrated security grills.",
      highlights: [
        "Heavy-duty 60*60 square & round corner poles for bay and ribbon windows",
        "Integrated 46x32 grill profiles for home security compliance",
        "Louver blades and beads for toilet, bathroom, and utility ventilation",
        "Universal frame connectors with precision snap-fit locking",
      ],
      specs: [
        { code: "NEP-1020", name: "46 x 32 Grill Profile", weight: "0.470 kg/m", length: "5.8 - 6.0 m", thickness: "2.0 mm", pcsBag: 6 },
        { code: "NEP-1021", name: "Frame Connector 60*60", weight: "0.210 kg/m", length: "5.8 - 6.0 m", thickness: "1.6 mm", pcsBag: 20 },
        { code: "NEP-1022", name: "Square Pole 60*60", weight: "0.760 kg/m", length: "5.8 - 6.0 m", thickness: "2.0 mm", pcsBag: 4 },
        { code: "NEP-1023", name: "Round Pole 60", weight: "0.570 kg/m", length: "5.8 - 6.0 m", thickness: "2.0 mm", pcsBag: 4 },
        { code: "NEP-1024", name: "Round Adaptor 60*60", weight: "0.420 kg/m", length: "5.8 - 6.0 m", thickness: "1.5 mm", pcsBag: 6 },
        { code: "NEP-1025", name: "Louver Bead", weight: "0.250 kg/m", length: "5.8 - 6.0 m", thickness: "1.5 mm", pcsBag: 10 },
        { code: "NEP-1026", name: "Louver Blade 32.7 x 6mm", weight: "0.227 kg/m", length: "5.8 - 6.0 m", thickness: "1.4 mm", pcsBag: 10 },
      ],
    },
    reinforcement: {
      title: "In-House Steel Reinforcement",
      subtitle: "Manufactured at Nissi 8,000 sq.ft Steel Facility",
      description:
        "Unlike competitors who rely on unverified third-party steel, Nissi produces its own galvanized steel reinforcement coils, ensuring optimal gauge thickness, zinc coating, and exact chamber tolerance.",
      highlights: [
        "Produced in-house under strict metallurgical inspection",
        "Heavy zinc galvanization ensures 100% rust prevention inside chambers",
        "Formed to exact CAD profiles: U-channels, C-channels, and box sections",
        "Guarantees required moment of inertia (Ix & Iy) for coastal cyclone wind loads",
      ],
      specs: [
        { code: "NSR-C60", name: "Casement Frame Steel (C-Shape)", weight: "High Tensile", length: "Custom / 5.8m", thickness: "1.2 - 1.5 mm", pcsBag: "Bundle" },
        { code: "NSR-S60", name: "Casement Sash Steel (U-Shape)", weight: "High Tensile", length: "Custom / 5.8m", thickness: "1.2 - 1.5 mm", pcsBag: "Bundle" },
        { code: "NSR-2TF", name: "2 Track Frame Steel Core", weight: "High Tensile", length: "Custom / 5.8m", thickness: "1.2 - 1.5 mm", pcsBag: "Bundle" },
        { code: "NSR-3TF", name: "3 Track Heavy-Duty Steel Box", weight: "High Tensile", length: "Custom / 5.8m", thickness: "1.5 - 2.0 mm", pcsBag: "Bundle" },
      ],
    },
  };

  const tabs = [
    { id: "casement", label: "60 Casement Series" },
    { id: "sliding2t", label: "2 Track Sliding" },
    { id: "sliding25t", label: "2.5 Track (With Mesh)" },
    { id: "sliding3t", label: "3 Track Sliding" },
    { id: "auxiliary", label: "Auxiliary & Grills" },
    { id: "reinforcement", label: "Reinforcement Steel" },
  ];

  const current = seriesData[activeTab];

  return (
    <section id="profiles" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">
            Product Manual & Specifications
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Nissi Elite Plast{" "}
            <span className="text-orange-600">Profile Systems</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            European-standard Class A extrusion profiles engineered with millimeter precision. 
            All profiles are 100% lead-free with Class S tropical formulation.
          </p>
        </div>

        {/* Tab Buttons Navigation */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-105"
                  : "bg-white text-slate-700 hover:text-orange-600 hover:bg-orange-50 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Series Detailed Card */}
        <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-slate-200">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                {current.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {current.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {current.description}
              </p>

              {/* Highlights Bullet Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Series Action Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Engineering Standards
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800">
                  ✓ Class A Wall Thickness (2.2 - 2.3 mm)
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  ✓ Hot Melt PUR Lamination Ready
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  ✓ 15-Year Extrusion Warranty
                </div>
              </div>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase text-white bg-slate-900 hover:bg-orange-600 transition-colors"
              >
                <span>Request Price List</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-orange-600" />
                <h4 className="text-base font-bold text-slate-900">
                  Technical Specifications Table (from Nissi Product Manual)
                </h4>
              </div>
              <span className="text-xs text-slate-600 hidden sm:inline">
                *Official factory catalog parameters
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Profile Code</th>
                    <th className="py-3 px-4">Profile Name</th>
                    <th className="py-3 px-4">Weight (kg/m)</th>
                    <th className="py-3 px-4">Length</th>
                    <th className="py-3 px-4">Thickness</th>
                    <th className="py-3 px-4 text-center">Packaging (Pcs/Bag)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {current.specs.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-orange-700">
                        {row.code}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {row.name}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {row.weight}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {row.length}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {row.thickness}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-slate-700">
                        {row.pcsBag}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
