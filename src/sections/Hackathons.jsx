import {
  Trophy,
  Zap,
  Clock,
  ExternalLink,
  Flame,
  Terminal,
} from "lucide-react";
import { hackathons } from "../constants";

const Hackathons = () => {
  return (
    <section id="hackathons" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-2 tracking-widest uppercase">
              <Flame size={14} />
              <span>// 03. THE SPRINT ARENA</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              HACKATHONS &amp; RAPID SPRINT BUILDS
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              High-velocity engineering under tight 24h–36h timeboxes. Proving the
              ability to synthesize problem statements, architect full-stack MVPs,
              and ship under intense pressure.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs">
            <Trophy size={14} />
            <span>TOP TRACK FINALIST &amp; WINNER</span>
          </div>
        </div>

        {/* Sprint Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {hackathons.map((item) => (
            <div
              key={item.id}
              className="cockpit-panel cockpit-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 flex items-center gap-1.5">
                    <Clock size={12} />
                    {item.duration}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {item.event}
                  </span>
                </div>

                <div className="px-3 py-1 rounded-md font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                  {item.award}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 mt-1">
                    ROLE: {item.role}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    EXECUTION HIGHLIGHTS:
                  </div>
                  {item.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <Zap size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Action Link */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded font-mono text-[11px] text-slate-300 bg-white/[0.04] border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
                >
                  <span>VIEW REPO</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Accent top border */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-linear-to-r from-transparent via-amber-400/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Sprint Methodology Banner */}
        <div className="cockpit-panel rounded-xl p-5 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Terminal size={18} />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-white">
                THE RAPID BUILD PROTOCOL
              </div>
              <div className="text-xs text-slate-400">
                How I move from zero to production deployable MVP in &lt;36 hours
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-300">
            <span className="text-cyan-400">01. SCOPE (2H)</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400">02. CORE API (12H)</span>
            <span className="text-slate-600">→</span>
            <span className="text-amber-400">03. UI &amp; STATE (16H)</span>
            <span className="text-slate-600">→</span>
            <span className="text-purple-400">04. PRODUCTION DEPLOY</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
