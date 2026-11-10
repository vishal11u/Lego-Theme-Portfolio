import {
  Calendar,
  Building2,
} from "lucide-react";
import { experiences } from "../constants";

const Experiences = () => {
  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 tracking-widest uppercase">
            <span>// 04. PRODUCTION TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            WORK EXPERIENCE &amp; SCALE
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Verified engineering tenure architecting multi-tenant web platforms,
            reusable component libraries, and cross-platform mobile applications.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative">
          {/* Subtle connecting vertical line */}
          <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-[1px] bg-gradient-to-b from-cyan-400 via-amber-400 to-transparent hidden md:block" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className="cockpit-panel cockpit-panel-hover rounded-2xl p-6 sm:p-8 relative md:ml-16 overflow-hidden group"
            >
              {/* Timeline Connector Dot on Desktop */}
              <div className="hidden md:flex absolute -left-16 top-8 w-8 h-8 rounded-full bg-[#080a0f] border-2 border-cyan-400 items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {/* Company & Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {exp.title}
                    </h3>
                    <span className="px-3 py-0.5 rounded-full font-mono text-xs font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/30">
                      {exp.job}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mt-2">
                    <Calendar size={13} className="text-slate-500" />
                    <span>{exp.date}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 shrink-0">
                  <Building2 size={14} className="text-cyan-400" />
                  <span>FULL-TIME PRODUCTION</span>
                </div>
              </div>

              {/* Deliverables & Impact Points */}
              <div className="pt-6 space-y-3">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  ARCHITECTURAL MILESTONES &amp; IMPACT:
                </div>

                {exp.contents.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* Accent bottom laser border */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-linear-to-r from-transparent via-cyan-400/30 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
