import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronRight,
  Cpu,
  X,
  Eye,
  GitBranch,
} from "lucide-react";
import { myProjects } from "../constants";

// Architectural blueprints for each flagship system
const systemBlueprints = {
  1: {
    // FormPilot
    flow: [
      { node: "Client Embed / SDK", desc: "HTML / React widget popup overlay" },
      { node: "Edge Validation", desc: "Next.js API & JWT refresh verification" },
      { node: "Redis Layer", desc: "Token-bucket rate limiting & spam cache" },
      { node: "Primary Storage", desc: "PostgreSQL submissions & analytics" },
      { node: "Event Dispatch", desc: "SendGrid notifications & webhooks" },
    ],
  },
  2: {
    // TradeX
    flow: [
      { node: "Next.js 15 / React 19", desc: "Installable PWA client interface" },
      { node: "Zustand State Hub", desc: "800ms real-time simulated order stream" },
      { node: "Greeks Engine", desc: "Delta, Theta, Gamma, Vega calculations" },
      { node: "Canvas Engine", desc: "TradingView Lightweight Charts" },
      { node: "Storage & Sync", desc: "Supabase order book & offline storage" },
    ],
  },
  3: {
    // RailGaadi
    flow: [
      { node: "Route Map Canvas", desc: "MapLibre GL GPU-accelerated vectors" },
      { node: "TanStack Query", desc: "30-second polling & state sync" },
      { node: "Overlays Mesh", desc: "Weather, elevation & terrain feeds" },
      { node: "Resilient Fallback", desc: "Degrades gracefully on API failure" },
    ],
  },
  4: {
    // Frontix
    flow: [
      { node: "TypeScript Source", desc: "25+ tree-shakable modern utilities" },
      { node: "Vitest Suite", desc: "100% test coverage automated via CI" },
      { node: "tsup Bundler", desc: "Dual ESM + CJS output (~2.5KB gzipped)" },
      { node: "npm Registry", desc: "Published semantic versioning package" },
    ],
  },
  5: {
    // Trusty Voice
    flow: [
      { node: "Client Widget", desc: "Embeddable script with dark/light themes" },
      { node: "Clerk Auth", desc: "Secure passwordless authentication" },
      { node: "AI Sentiment", desc: "Automated real-time customer insights" },
      { node: "Supabase DB", desc: "Real-time subscriptions & analytics" },
    ],
  },
  6: {
    // EnvShare
    flow: [
      { node: "Client Browser", desc: "AES-GCM client-side encryption key" },
      { node: "Upstash Redis", desc: "Ephemeral encrypted secret payloads" },
      { node: "Auto-Expiration", desc: "Burn-after-reading or time limits" },
    ],
  },
};

const ProjectModal = ({ project, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = orig;
    };
  }, [closeModal]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={closeModal}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="cockpit-panel rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto border border-white/[0.15] shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mono text-xs text-cyan-400">
              SYSTEM ARCHITECTURE SPECIFICATION
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              {project.title}
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Image */}
        <div className="rounded-xl overflow-hidden border border-white/[0.1] bg-black/40">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 sm:h-72 object-cover"
          />
        </div>

        {/* Narrative & Highlights */}
        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {project.description}
          </p>

          <div className="space-y-2 pt-2">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
              KEY ARCHITECTURAL PROVISIONS:
            </span>
            {project.subDescription.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs text-slate-300 leading-relaxed"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags & Action */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2.5 py-1 rounded font-mono text-[11px] text-slate-300 bg-white/[0.04] border border-white/[0.08]"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            <span>VISIT LIVE SYSTEM</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project }) => {
  const [viewMode, setViewMode] = useState("preview"); // "preview" | "blueprint"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const blueprint = systemBlueprints[project.id];

  return (
    <>
      <div className="cockpit-panel cockpit-panel-hover space-reveal rounded-2xl overflow-hidden flex flex-col justify-between group">
        {/* Card Header & Tactile Mode Switch */}
        <div className="p-5 pb-3 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-mono text-xs text-slate-400">
              SYS-0{project.id} // PRODUCTION
            </span>
          </div>

          {/* Mode Switch Toggle Button */}
          {blueprint && (
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/[0.08]">
              <button
                onClick={() => setViewMode("preview")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  viewMode === "preview"
                    ? "bg-cyan-400 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Visual Preview"
              >
                <Eye size={11} />
                <span>UI</span>
              </button>
              <button
                onClick={() => setViewMode("blueprint")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  viewMode === "blueprint"
                    ? "bg-amber-400 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
                title="System Architecture Blueprint"
              >
                <GitBranch size={11} />
                <span>ARCH</span>
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Display Area */}
        {viewMode === "preview" ? (
          /* Visual Preview Mode */
          <div className="relative h-52 sm:h-56 overflow-hidden bg-black/30">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-transparent to-transparent opacity-80" />
          </div>
        ) : (
          /* System Blueprint Mode */
          <div className="h-52 sm:h-56 p-4 bg-[#070a10] flex flex-col justify-center space-y-2 font-mono overflow-y-auto">
            <div className="text-[10px] text-amber-400 font-bold tracking-wider mb-1 flex items-center gap-1">
              <Cpu size={12} />
              <span>LIVE DATA ARCHITECTURE:</span>
            </div>
            {blueprint.flow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px]">
                <div className="w-4 h-4 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="truncate">
                  <span className="text-white font-semibold">{step.node}: </span>
                  <span className="text-slate-400">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Card Content & Meta */}
        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-0.5 rounded font-mono text-[10px] text-slate-300 bg-white/[0.04] border border-white/[0.06]"
                >
                  {tag.name}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-1.5 py-0.5 rounded font-mono text-[10px] text-slate-400 bg-white/[0.02]">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-mono text-xs font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors cursor-pointer"
              >
                <span>SPEC DETAILS</span>
                <ChevronRight size={14} />
              </button>

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-300 hover:text-cyan-400 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors cursor-pointer"
                title="Visit Live"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal
            project={project}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="space-section py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="space-reveal flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 tracking-widest uppercase">
              <span>// 02. FLAGSHIP SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              PRODUCTION SOFTWARES
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Engineered for throughput, data integrity, and responsiveness.
              Toggle the <span className="text-amber-400 font-mono">[ARCH]</span>{" "}
              button on any card to inspect the real-time data flow.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> UI PREVIEW
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> SYSTEM BLUEPRINT
            </span>
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
