"use client";

import { useState } from "react";
import {
  Code2,
  Cloud,
  Cpu,
  Palette,
  LineChart,
  ShieldAlert,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const services = [
    {
      id: "software",
      category: "tech",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
      title: "Custom Software & Web Platforms",
      description:
        "High-performance, fault-tolerant enterprise web applications, customer portals, and microservices built with modern frameworks and robust API architectures.",
      deliverables: [
        "Full-Stack Web & Mobile Engineering",
        "API & Microservices Architecture",
        "Legacy Code Refactoring & Modernization",
        "Performance & SEO Optimization",
      ],
    },
    {
      id: "cloud",
      category: "infrastructure",
      icon: Cloud,
      color: "from-cyan-500 to-teal-500",
      title: "Cloud Infrastructure & DevOps",
      description:
        "Cloud-native architecture and automated deployment pipelines ensuring maximum uptime, elastic scalability, and cost efficiency across AWS, Azure, and GCP.",
      deliverables: [
        "Cloud Migration & Infrastructure as Code (IaC)",
        "CI/CD Pipeline Automation",
        "Containerization (Docker & Kubernetes)",
        "24/7 Monitoring & Incident Response",
      ],
    },
    {
      id: "transformation",
      category: "strategy",
      icon: Cpu,
      color: "from-indigo-500 to-purple-500",
      title: "Digital Transformation & Automation",
      description:
        "Eliminate operational bottlenecks by modernizing mission-critical workflows with intelligent automation, ERP/CRM integrations, and custom dashboards.",
      deliverables: [
        "End-to-End Workflow Automation",
        "Custom ERP & CRM Integrations",
        "Digital Process Engineering",
        "Data Silo Elimination",
      ],
    },
    {
      id: "design",
      category: "design",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      title: "Product Design & Brand Experience",
      description:
        "User-centered UI/UX design, interactive prototyping, and design systems crafted to elevate customer engagement and convert visitors into loyal clients.",
      deliverables: [
        "Interactive UI/UX & Wireframing",
        "Design Systems & Brand Toolkits",
        "Conversion Rate Optimization (CRO)",
        "Usability Testing & Accessibility (WCAG)",
      ],
    },
    {
      id: "data",
      category: "tech",
      icon: LineChart,
      color: "from-emerald-500 to-green-500",
      title: "Data Analytics & AI Insights",
      description:
        "Harness actionable intelligence through automated data pipelines, custom predictive analytics, and enterprise AI tooling tailored to your business model.",
      deliverables: [
        "Real-Time Business Intelligence Dashboards",
        "Custom Machine Learning & AI Integration",
        "Data Warehouse & ETL Pipelines",
        "Predictive Forecasting Models",
      ],
    },
    {
      id: "security",
      category: "infrastructure",
      icon: ShieldAlert,
      color: "from-amber-500 to-orange-500",
      title: "Cybersecurity & Governance",
      description:
        "Comprehensive vulnerability assessments, zero-trust security postures, and proactive compliance frameworks to safeguard your valuable data assets.",
      deliverables: [
        "Vulnerability Assessment & Pen Testing",
        "Zero-Trust Architecture & IAM Governance",
        "SOC2, ISO 27001 & GDPR Advisory",
        "Incident Recovery & Continuity Planning",
      ],
    },
  ];

  const categories = [
    { id: "all", label: "All Services" },
    { id: "tech", label: "Engineering & AI" },
    { id: "infrastructure", label: "Cloud & Security" },
    { id: "strategy", label: "Strategy & Automation" },
    { id: "design", label: "Product & UI/UX" },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            What We Do
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Solutions Built for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Enduring Scale
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From architecture to deployment and ongoing innovation, Nissi provides end-to-end technology capabilities to power every stage of your growth.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-blue-500/5"
              >
                <div>
                  {/* Service Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${service.color} p-0.5 shadow-md flex items-center justify-center mb-6`}
                  >
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="mt-6 pt-6 border-t border-slate-800/80">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      Core Capabilities
                    </div>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-slate-900 border border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold text-white">
              Need a customized enterprise solution or specialized tech stack?
            </h4>
            <p className="mt-1 text-sm text-slate-300">
              Our principal consultants and engineers design custom-tailored architectures for unique requirements.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all hover:scale-105"
          >
            Talk to an Expert
          </a>
        </div>
      </div>
    </section>
  );
}
