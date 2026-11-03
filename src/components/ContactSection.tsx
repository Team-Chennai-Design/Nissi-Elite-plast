"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Building,
  Factory,
  Globe,
  AlertCircle,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "Fabricator / Window Manufacturer",
    city: "",
    series: "60 Casement Series",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [leadRefId, setLeadRefId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, hp_field: honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setLeadRefId(data.id || `ENQ-${Date.now().toString(36).toUpperCase()}`);
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred. Please call +91 99622 25516.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">
            Contact & Dealership Enquiry
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Connect with{" "}
            <span className="text-orange-600">Nissi Extrusion India</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Whether you are a window fabricator seeking bulk profile supply, an architect specifying premium fenestration, or a builder planning high-rise developments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Locations from Catalog Page 16 */}
          <div className="lg:col-span-5 space-y-6">
            {/* Admin Office Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Admin Office (Chennai)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-12">
                11, K E P Garden, Varalakshmi Nagar, Main Road,<br />
                Maduravoyal, Chennai - 600 095, Tamil Nadu, India.
              </p>
            </div>

            {/* Factory Location Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Extrusion Mega Factory
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-12">
                AVADI, Chennai - 600 056, Tamil Nadu.<br />
                <span className="text-slate-500 text-xs">
                  (20,000 sq.ft • 4 Floors • 6 Extruders • 2 PUR Laminators)
                </span>
              </p>
            </div>

            {/* Direct Phone Lines */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Direct Phone Lines
                </h3>
              </div>
              <div className="pl-12 space-y-1.5 text-xs sm:text-sm font-bold text-slate-800">
                <div>
                  <a href="tel:+919962225516" className="hover:text-orange-600 transition-colors">
                    +91 99622 25516
                  </a>
                  <span className="text-xs font-normal text-slate-500 ml-2">(Primary Sales & Factory)</span>
                </div>
                <div>
                  <a href="tel:+919042122555" className="hover:text-orange-600 transition-colors">
                    +91 90421 22555
                  </a>
                </div>
                <div>
                  <a href="tel:+918122013339" className="hover:text-orange-600 transition-colors">
                    +91 81220 13339
                  </a>
                </div>
              </div>
            </div>

            {/* Emails & Portal */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Official Email Desks
                </h3>
              </div>
              <div className="pl-12 space-y-1 text-xs sm:text-sm text-slate-700">
                <div>
                  <a href="mailto:nissiupvcprofiles@gmail.com" className="font-semibold text-orange-600 hover:underline">
                    nissiupvcprofiles@gmail.com
                  </a>
                </div>
                <div>
                  <a href="mailto:nissigroup1977@gmail.com" className="hover:underline">
                    nissigroup1977@gmail.com
                  </a>
                </div>
                <div className="pt-2 text-xs text-slate-500 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>www.nissiupvcgroups.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Fabricator & Dealer Form */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800">
            {submitted ? (
              <div className="text-center py-12 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black">Enquiry Received!</h3>
                <div className="mt-3 inline-block px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-orange-400">
                  Reference ID: {leadRefId}
                </div>
                <p className="mt-4 text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-white">{formData.name}</span>. Our technical sales team will review your requirements and contact you shortly.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-slate-800 text-xs text-slate-400 max-w-sm mx-auto">
                  For immediate urgent supply dispatch: Call <strong className="text-orange-400">+91 99622 25516</strong>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      role: "Fabricator / Window Manufacturer",
                      city: "",
                      series: "60 Casement Series",
                      message: "",
                    });
                  }}
                  className="mt-8 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">
                    Direct Factory Channel
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Request Fabricator / Dealer Partnership
                  </h3>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot anti-spam field */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="hp_field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="enq_name" className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="enq_name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="enq_phone" className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="enq_phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 99622 25516"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="enq_email" className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="enq_email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="enq_city" className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Your City & State *
                    </label>
                    <input
                      id="enq_city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Chennai, Tamil Nadu"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="enq_role" className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      I Am A:
                    </label>
                    <select
                      id="enq_role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="Fabricator / Window Manufacturer">Fabricator / Window Manufacturer</option>
                      <option value="Dealer / Distributor">Dealer / Building Materials Distributor</option>
                      <option value="Architect / Interior Designer">Architect / Interior Designer</option>
                      <option value="Builder / Construction Company">Builder / Construction Developer</option>
                      <option value="Homeowner / Villa Owner">Homeowner / Villa Owner</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="enq_series" className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Series of Interest:
                    </label>
                    <select
                      id="enq_series"
                      value={formData.series}
                      onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="60 Casement Series">60 Casement Series (Windows & Doors)</option>
                      <option value="2 Track & 3 Track Sliding">2 Track & 3 Track Sliding Systems</option>
                      <option value="2.5 Track Sliding With Mesh">2.5 Track Sliding with Mosquito Mesh</option>
                      <option value="Laminated Colour Foils">Laminated Colour Profiles (Woodgrains/Grey)</option>
                      <option value="Steel Coils & Hardware">In-House Steel Reinforcement & Hardware</option>
                      <option value="Complete Factory Dealership">Complete Dealership Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="enq_message" className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Project Requirements / Estimated Volume
                  </label>
                  <textarea
                    id="enq_message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify profiles needed, length, tonnage, delivery location, or timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Dealer / Fabricator Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
