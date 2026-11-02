import {
  CheckCircle,
  Clock,
  Code,
  Lock,
  Headphones,
  Zap,
  Star,
  Quote,
} from "lucide-react";

export default function WhyChooseUs() {
  const differentiators = [
    {
      icon: Code,
      title: "100% Code Ownership",
      desc: "Full intellectual property rights transferred directly to your organization. Zero proprietary vendor lock-in.",
    },
    {
      icon: Lock,
      title: "Enterprise-Grade Security",
      desc: "Every system is designed with Zero-Trust principles, encrypted pipelines, and built-in SOC2/GDPR compliance readiness.",
    },
    {
      icon: Clock,
      title: "Rapid Time-to-Value",
      desc: "Our battle-tested component libraries and agile sprints accelerate production delivery by up to 40% over traditional agencies.",
    },
    {
      icon: Headphones,
      title: "Direct Access to Engineers",
      desc: "Communicate directly with the senior architects and developers building your platform, not layers of non-technical managers.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Nissi completely transformed our legacy platform. Their architectural precision and speed exceeded all expectations, reducing infrastructure costs by 45%.",
      author: "Marcus Vance",
      role: "CTO, Meridian Cloud Systems",
      rating: 5,
    },
    {
      quote:
        "Partnering with Nissi was the best technical decision we made this year. They delivered a fault-tolerant web ecosystem two weeks ahead of schedule.",
      author: "Elena Rostova",
      role: "VP of Product, FinTech Pulse",
      rating: 5,
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            The Nissi Advantage
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Visionary Leaders Choose{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Nissi
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            We reject the typical agency bloat. We combine elite software engineering with strategic clarity to deliver real business outcomes.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/30 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{diff.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{diff.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonials Highlight */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">Client Voices & Trust</h3>
            <p className="text-sm text-slate-400 mt-1">What leaders say about collaborating with Nissi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl"
              >
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.author}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
