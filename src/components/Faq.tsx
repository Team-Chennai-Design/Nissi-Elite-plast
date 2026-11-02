"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What types of companies and projects does Nissi support?",
      a: "We collaborate with seed-stage startups, high-growth scale-ups, and established enterprises across SaaS, FinTech, Healthcare, E-Commerce, and Logistics. We handle everything from greenfield full-stack development to legacy modernization and cloud infrastructure optimization.",
    },
    {
      q: "What engagement models do you offer?",
      a: "We offer flexible structures based on your roadmap: Dedicated Engineering Squads (for ongoing feature development and scaling), Milestone-Based Project Delivery (for clearly scoped projects with defined deliverables), and Strategic Technical Advisory (for fractional CTO/architectural oversight).",
    },
    {
      q: "How quickly can Nissi commence a project?",
      a: "Following an initial discovery session and mutual alignment, our team typically initiates the kickoff and architecture phase within 5 to 7 business days.",
    },
    {
      q: "How do you handle source code ownership and security?",
      a: "You retain 100% of all intellectual property, source code, design assets, and credentials upon delivery. We sign non-disclosure agreements (NDAs) upfront and enforce strict Zero-Trust security across our development pipelines.",
    },
    {
      q: "What does post-launch maintenance look like?",
      a: "We offer dedicated Service Level Agreements (SLAs) that include 24/7 uptime monitoring, security patching, dependency upgrades, performance tuning, and on-demand feature iterations.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faqs" className="py-24 bg-slate-900/30 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Common Inquiries
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Everything you need to know about partnering with Nissi.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/30 transition-colors"
                >
                  <span className="text-base sm:text-lg font-semibold text-white pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/40">
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
