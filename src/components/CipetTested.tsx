"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, FileText, Expand } from "lucide-react";

/* ------------------------------------------------------------------
   EDIT THIS BLOCK when you receive the real CIPET report.
   1) Save the report picture as:  public/cipet-test-report.jpg
   2) Fill REPORT_DETAILS and TESTED_ITEMS only with facts that appear
      in the report (leave an array empty to hide that list).
------------------------------------------------------------------- */
const REPORT_IMAGE = "/cipet-test-report.jpg";
const REPORT_IMAGE_WIDTH = 900;
const REPORT_IMAGE_HEIGHT = 1200;

const REPORT_DETAILS = {
  heading: "Tested at CIPET",
  intro:
    "Our uPVC window and door profiles are independently tested at CIPET. The test report is shown here so fabricators and builders can verify the quality for themselves.",
  reportDate: "", // e.g. "March 2026"  (leave empty to hide)
  reportNumber: "", // e.g. "CIPET/2026/123"  (leave empty to hide)
};

const TESTED_ITEMS: string[] = [
  // e.g. "Impact resistance", "Heat reversion", "Vicat softening point"
];
/* ----------------------------------------------------------------- */

export default function CipetTested() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section
      id="cipet"
      aria-labelledby="cipet-heading"
      className="py-20 lg:py-24 bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-bold uppercase tracking-wider">
            <BadgeCheck className="w-4 h-4" />
            <span>Independent Lab Verified</span>
          </div>
          <h2 id="cipet-heading" className="mt-4 text-3xl sm:text-4xl font-black text-slate-900">
            {REPORT_DETAILS.heading}
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">{REPORT_DETAILS.intro}</p>

          {(REPORT_DETAILS.reportDate || REPORT_DETAILS.reportNumber) && (
            <dl className="mt-6 grid grid-cols-2 gap-4 max-w-md">
              {REPORT_DETAILS.reportNumber && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <dt className="text-[11px] font-bold uppercase text-slate-500">Report No.</dt>
                  <dd className="text-sm font-bold text-slate-900 mt-1">{REPORT_DETAILS.reportNumber}</dd>
                </div>
              )}
              {REPORT_DETAILS.reportDate && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <dt className="text-[11px] font-bold uppercase text-slate-500">Date</dt>
                  <dd className="text-sm font-bold text-slate-900 mt-1">{REPORT_DETAILS.reportDate}</dd>
                </div>
              )}
            </dl>
          )}

          {TESTED_ITEMS.length > 0 && (
            <ul className="mt-6 space-y-2">
              {TESTED_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <BadgeCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {!imageFailed && (
              <a
                href={REPORT_IMAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-700 transition-colors"
              >
                <Expand className="w-4 h-4" />
                <span>View Full Report</span>
              </a>
            )}
            <a
              href="#brochure"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-300 text-slate-800 hover:border-orange-500 hover:text-orange-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Get Product Manual</span>
            </a>
          </div>
        </div>

        {/* Report picture */}
        <figure className="relative">
          {!imageFailed ? (
            <a
              href={REPORT_IMAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 hover:shadow-2xl transition-shadow"
            >
              <Image
                src={REPORT_IMAGE}
                alt="CIPET test report for Nissi Elite Plast uPVC profiles"
                width={REPORT_IMAGE_WIDTH}
                height={REPORT_IMAGE_HEIGHT}
                className="w-full h-auto"
                onError={() => setImageFailed(true)}
              />
            </a>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <BadgeCheck className="w-12 h-12 text-orange-500 mx-auto" />
              <p className="mt-3 text-sm font-bold text-slate-900">CIPET test report available on request</p>
              <p className="mt-1 text-xs text-slate-500">
                Request the manual or contact our team and we will share the report.
              </p>
            </div>
          )}
          <figcaption className="mt-3 text-xs text-slate-500 text-center">
            Click the report to open it in full size.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
