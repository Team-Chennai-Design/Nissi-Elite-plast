"use client";

import { useState } from "react";
import { Download, FileText, CheckCircle2, Sparkles, AlertCircle, PhoneCall } from "lucide-react";

export default function BrochureModal() {
  const [downloadRequested, setDownloadRequested] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seriesInterest, setSeriesInterest] = useState("60 Casement & Sliding Series");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("/Nissi_Elite_Plast_Product_Manual.pdf");

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/brochure-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Prospective Fabricator/Client",
          email,
          phone,
          seriesInterest,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to process download request.");
      }

      const fileUrl = data.downloadUrl || "/Nissi_Elite_Plast_Product_Manual.pdf";
      setDownloadUrl(fileUrl);
      setDownloadRequested(true);

      // Trigger actual download in the browser
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "Nissi_Elite_Plast_Product_Manual.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error("Brochure download error:", err);
      setErrorMessage(err.message || "Failed to trigger download. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="brochure" className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-y border-orange-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-orange-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Brochure Preview & Information */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official 2026 Edition</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Download the Official Nissi Elite Plast Product Manual
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Access complete CAD assembly cross-sections, profile codes (NEP-1001 to NEP-1026), wall thickness tolerances, reinforcement charts, and European foil color swatches.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>60 Casement Series</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2, 2.5 & 3 Track Sliding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Galvanized Steel Specs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Laminated Color Foils</span>
              </div>
            </div>
          </div>

          {/* Right Column: Download Form */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
            {downloadRequested ? (
              <div className="text-center py-6 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold">Download Started!</h4>
                <p className="text-xs text-slate-300 mt-2">
                  Your official Nissi Elite Plast Product Manual PDF download has begun. Your request has been logged in our system.
                </p>

                <div className="mt-4">
                  <a
                    href={downloadUrl}
                    download="Nissi_Elite_Plast_Product_Manual.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Click here if download didn&apos;t start</span>
                  </a>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
                  Direct Factory Desk: <strong className="text-orange-400">+91 99622 25516</strong>
                </div>

                <button
                  onClick={() => {
                    setDownloadRequested(false);
                    setEmail("");
                    setPhone("");
                    setName("");
                  }}
                  className="mt-4 text-xs text-slate-400 hover:text-white underline block mx-auto"
                >
                  Download again with different details
                </button>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
                    Get Instant PDF Access
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fabricator@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99622 25516"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Series of Primary Interest
                  </label>
                  <select
                    value={seriesInterest}
                    onChange={(e) => setSeriesInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-orange-500"
                  >
                    <option value="60 Casement & Sliding Series">60 Casement & Sliding Systems</option>
                    <option value="2.5 Track Sliding With Mesh">2.5 Track with Mosquito Mesh</option>
                    <option value="Laminated Woodgrain Foils">European Laminated Colour Profiles</option>
                    <option value="In-House Steel Reinforcement">In-House Steel Reinforcement Coils</option>
                    <option value="Complete Factory Dealership">Complete Dealership Inquiry</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Logging Download & Fetching PDF...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download PDF Manual</span>
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
