import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Globe,
  Cpu,
  Check,
  Copy,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { FaAws, FaDocker, FaReact, FaNode, FaGithub } from "react-icons/fa";
import { IoLogoJavascript, IoLogoVercel } from "react-icons/io5";
import {
  SiMui,
  SiShadcnui,
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiMongodb,
  SiJest,
  SiVitest,
  SiStorybook,
  SiRedis,
  SiReactquery,
  SiOpenai,
} from "react-icons/si";
import { RiTailwindCssFill, RiSupabaseFill } from "react-icons/ri";
import { BiLogoPostgresql, BiLogoFirebase } from "react-icons/bi";
import { TbBrandReactNative } from "react-icons/tb";

// 3D Telemetry Wireframe Globe
const TelemetryGlobe = () => {
  const globeRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      globeRef.current.rotation.x = 0.2;
    }
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.3}
          emissive="#00f0ff"
          emissiveIntensity={0.4}
        />
      </mesh>
      <pointLight position={[2, 2, 2]} intensity={1} color="#00f0ff" />
    </group>
  );
};

// Interactive Terminal Email Copy
const TerminalEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "shitolevishal29@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-black/50 border border-white/[0.1] hover:border-cyan-400/50 transition-all font-mono text-xs text-left group cursor-pointer"
    >
      <div className="flex items-center gap-2 text-slate-300">
        <span className="text-cyan-400">&gt;</span>
        <span className="text-slate-400">mailto:</span>
        <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
          {email}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-cyan-400">
        {copied ? (
          <>
            <Check size={14} className="text-emerald-400" />
            <span className="text-emerald-400 font-bold">COPIED</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>COPY</span>
          </>
        )}
      </div>
    </button>
  );
};

const About = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const techStack = [
    { name: "React", category: "FRONTEND", color: "text-[#61DAFB]", icon: <FaReact /> },
    { name: "Next.js", category: "FRONTEND", color: "text-white", icon: <SiNextdotjs /> },
    { name: "TypeScript", category: "FRONTEND", color: "text-[#3178C6]", icon: <SiTypescript /> },
    { name: "JavaScript", category: "FRONTEND", color: "text-[#F7DF1E]", icon: <IoLogoJavascript /> },
    { name: "React Native", category: "FRONTEND", color: "text-[#61DAFB]", icon: <TbBrandReactNative /> },
    { name: "TailwindCSS", category: "FRONTEND", color: "text-[#06B6D4]", icon: <RiTailwindCssFill /> },
    { name: "Shadcn UI", category: "FRONTEND", color: "text-white", icon: <SiShadcnui /> },
    { name: "MUI", category: "FRONTEND", color: "text-[#007FFF]", icon: <SiMui /> },

    { name: "TanStack Query", category: "STATE", color: "text-[#FF4154]", icon: <SiReactquery /> },
    { name: "Redux", category: "STATE", color: "text-[#764ABC]", icon: <SiRedux /> },

    { name: "Node.js", category: "BACKEND", color: "text-[#339933]", icon: <FaNode /> },
    { name: "PostgreSQL", category: "BACKEND", color: "text-[#4169E1]", icon: <BiLogoPostgresql /> },
    { name: "Redis", category: "BACKEND", color: "text-[#DC382D]", icon: <SiRedis /> },
    { name: "MongoDB", category: "BACKEND", color: "text-[#47A248]", icon: <SiMongodb /> },
    { name: "Supabase", category: "BACKEND", color: "text-[#3ECF8E]", icon: <RiSupabaseFill /> },
    { name: "Firebase", category: "BACKEND", color: "text-[#FFCA28]", icon: <BiLogoFirebase /> },

    { name: "AWS", category: "INFRA", color: "text-[#FF9900]", icon: <FaAws /> },
    { name: "Docker", category: "INFRA", color: "text-[#2496ED]", icon: <FaDocker /> },
    { name: "GitHub Actions", category: "INFRA", color: "text-white", icon: <FaGithub /> },
    { name: "Vercel", category: "INFRA", color: "text-white", icon: <IoLogoVercel /> },
    { name: "Vitest", category: "INFRA", color: "text-[#729B1B]", icon: <SiVitest /> },
    { name: "Jest", category: "INFRA", color: "text-[#C21325]", icon: <SiJest /> },
    { name: "Storybook", category: "INFRA", color: "text-[#FF4785]", icon: <SiStorybook /> },

    { name: "AI Agents & LLMs", category: "AI", color: "text-[#10A37F]", icon: <SiOpenai /> },
  ];

  const categories = ["ALL", "FRONTEND", "STATE", "BACKEND", "INFRA", "AI"];

  const filteredTechs =
    activeCategory === "ALL"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 tracking-widest uppercase">
            <span>// 01. ARCHITECTURAL PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            SYSTEM ARCHITECTURE &amp; CAPABILITIES
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Engineering robust web systems with end-to-end discipline: from
            high-throughput state caching to resilient CI/CD pipelines.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Box 1: Core Background & Ownership (7 cols) */}
          <div className="md:col-span-7 cockpit-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <Cpu size={14} className="text-cyan-400" />
                <span>FULL LIFECYCLE SOFTWARE DEVELOPER</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Building SaaS platforms, real-time engines &amp; cross-platform apps.
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                With <span className="text-white font-semibold">2.6+ years</span>{" "}
                of hands-on production engineering, I specialize in taking
                complex product requirements and architecting high-performance
                solutions. From building multi-tenant SaaS platforms handling{" "}
                <span className="text-cyan-400 font-semibold">
                  10,000+ daily university students
                </span>{" "}
                to real-time options trading simulators with{" "}
                <span className="text-amber-400 font-semibold">
                  800ms data updates
                </span>
                .
              </p>
            </div>

            {/* Architecture Principles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/[0.08]">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                  PERFORMANCE
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  Code-splitting, lazy loads, sub-2s initial paint.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  RELIABILITY
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  Zero-downtime CI/CD with automated rollbacks.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-amber-400 font-semibold">
                  DESIGN SYSTEMS
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  Reusable Storybook components with Shadcn &amp; MUI.
                </p>
              </div>
            </div>
          </div>

          {/* Box 2: Quantified Metrics Deck (5 cols) */}
          <div className="md:col-span-5 cockpit-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-slate-400 tracking-wider">
                PRODUCTION TELEMETRY
              </span>
              <Workflow size={16} className="text-cyan-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-mono text-3xl font-black text-cyan-400">
                  2.6+
                </div>
                <div className="text-xs font-semibold text-white mt-1">
                  Years Experience
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Production SaaS &amp; Mobile
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-mono text-3xl font-black text-emerald-400">
                  10k+
                </div>
                <div className="text-xs font-semibold text-white mt-1">
                  Daily Active Users
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Across 3 Countries
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-mono text-3xl font-black text-amber-400">
                  10+
                </div>
                <div className="text-xs font-semibold text-white mt-1">
                  Shipped Systems
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  SaaS, Tools &amp; PWAs
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-mono text-3xl font-black text-purple-400">
                  500+
                </div>
                <div className="text-xs font-semibold text-white mt-1">
                  Commits &amp; PRs
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  GitHub &amp; Open Source
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Full compliance with OWASP, GDPR &amp; RBAC standards</span>
            </div>
          </div>

          {/* Box 3: Geolocation & Remote Readiness (5 cols) */}
          <div className="md:col-span-5 cockpit-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Globe size={14} />
                <span>PRIMARY TIMEZONE &amp; COORDINATES</span>
              </div>
              <h4 className="text-xl font-bold text-white">Pune, India</h4>
              <p className="text-xs text-slate-400 font-mono">
                18.5204° N, 73.8567° E // IST (UTC +5:30)
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono mt-1">
                <span>● REMOTE READY: US / EU / ASIA TIMEZONES</span>
              </div>
            </div>

            <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-40 pointer-events-none">
              <Canvas>
                <TelemetryGlobe />
              </Canvas>
            </div>

            <div className="pt-4 mt-6 border-t border-white/[0.08] relative z-10">
              <TerminalEmailButton />
            </div>
          </div>

          {/* Box 4: Interactive Technology Matrix (7 cols) */}
          <div className="md:col-span-7 cockpit-panel rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs text-cyan-400 tracking-wider">
                  TECHNOLOGY STACK MATRIX
                </span>
                <h4 className="text-lg font-bold text-white">
                  Verified Production Competencies
                </h4>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-cyan-400 text-slate-950 font-bold"
                        : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {filteredTechs.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-cyan-400/40 transition-all group cursor-default"
                >
                  <span className={`text-xl ${tech.color} shrink-0`}>
                    {tech.icon}
                  </span>
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                      {tech.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {tech.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
