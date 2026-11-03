import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Banner */}
        <div className="pb-12 border-b border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Logo variant="light" size="lg" />
            <p className="mt-4 text-sm text-slate-300 italic font-serif">
              &ldquo;Strength in every line, Elegance in every curve&rdquo;
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold uppercase tracking-widest text-orange-400">
              European Extrusion Technology
            </div>
            <div className="text-sm font-semibold text-white">
              Precision in Every Profile, Excellence in Every Frame
            </div>
          </div>
        </div>

        {/* 4 Columns Links & Addresses */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-slate-900 text-xs sm:text-sm">
          {/* Col 1: Company Profile */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Nissi Extrusion India Pvt Ltd
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Established in 2024, built upon over a decade of fenestration experience since 2010. 
              Manufacturing high-performance 100% lead-free uPVC window and door profiles, 
              in-house galvanized steel reinforcement coils, and complete hardware systems.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Official Construction Partner: <strong className="text-slate-300">McCoy Mart</strong>
            </div>
          </div>

          {/* Col 2: Profile Systems */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Profile Series
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#profiles" className="hover:text-orange-400 transition-colors">
                  60 Casement Series
                </a>
              </li>
              <li>
                <a href="#profiles" className="hover:text-orange-400 transition-colors">
                  2 Track Sliding Systems
                </a>
              </li>
              <li>
                <a href="#profiles" className="hover:text-orange-400 transition-colors">
                  2.5 Track Sliding (Mesh)
                </a>
              </li>
              <li>
                <a href="#profiles" className="hover:text-orange-400 transition-colors">
                  3 Track Sliding Doors
                </a>
              </li>
              <li>
                <a href="#profiles" className="hover:text-orange-400 transition-colors">
                  Auxiliary & Grills
                </a>
              </li>
              <li>
                <a href="#colours" className="hover:text-orange-400 transition-colors">
                  Laminated Woodgrains
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Divisions */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-300 font-semibold">NISSI Elite plast</span>
              </li>
              <li>
                <span className="text-slate-400">Nissi Hardware Division</span>
              </li>
              <li>
                <span className="text-slate-400">8,000 Sq.Ft Steel Plant</span>
              </li>
              <li>
                <span className="text-slate-400">Nissi Furniture (20,000 Sq.Ft)</span>
              </li>
              <li>
                <a href="#brochure" className="text-orange-400 font-semibold hover:underline">
                  Download Product Manual
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Addresses */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Offices & Plants
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <strong className="text-white block">Admin Office:</strong>
                <span className="text-slate-400">
                  11, K E P Garden, Varalakshmi Nagar, Main Road, Maduravoyal, Chennai - 600 095.
                </span>
              </div>
              <div>
                <strong className="text-white block">Factory:</strong>
                <span className="text-slate-400">
                  AVADI, Chennai - 600 056. (20,000 sq.ft • 4 Floors)
                </span>
              </div>
              <div className="pt-2 text-xs space-y-1">
                <div>
                  Phone: <a href="tel:+919962225516" className="text-orange-400 font-bold hover:underline">+91 99622 25516</a>, +91 90421 22555
                </div>
                <div>
                  Email: <a href="mailto:nissiupvcprofiles@gmail.com" className="text-slate-300 hover:underline">nissiupvcprofiles@gmail.com</a>
                </div>
                <div className="text-slate-500">
                  Domain: www.nissiupvcgroups.com
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Nissi Extrusion India Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Made with Indian Pride & European Precision</span>
            <span>15-Year Backed Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
