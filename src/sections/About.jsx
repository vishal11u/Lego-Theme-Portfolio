import { useState, useRef, useEffect, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import {
  Globe,
  Cpu,
  Check,
  Copy,
  Clock,
  Rocket,
  Gauge,
  Layers,
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

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const CAREER_START = new Date("2024-04-01");

const getYearsOfExperience = () => {
  const years =
    (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 3600 * 1000);
  return `${(Math.floor(years * 10) / 10).toFixed(1)}+`;
};

const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
};

const formatTime = (now, timeZone, withSeconds = false) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
    hourCycle: "h23",
  }).format(now);

const hourIn = (now, timeZone) =>
  Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      hourCycle: "h23",
    }).format(now),
  );

/* ------------------------------------------------------------------ */
/*  3D Telemetry Globe: drag to rotate, Pune hub, arcs to US/EU/Asia   */
/* ------------------------------------------------------------------ */
const PUNE = { lat: 18.5204, lon: 73.8567 };

const CITIES = [
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "San Francisco", lat: 37.77, lon: -122.42 },
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "Berlin", lat: 52.52, lon: 13.4 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
];

const latLonToVec3 = (lat, lon, r = 1) => {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
};

// Great-circle arc lifted off the surface
const buildArc = (from, to, segments = 64) => {
  const A = latLonToVec3(from.lat, from.lon).normalize();
  const B = latLonToVec3(to.lat, to.lon).normalize();
  const omega = A.angleTo(B);
  const lift = 0.1 + 0.3 * (omega / Math.PI);
  const sinO = Math.sin(omega);
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = A.clone()
      .multiplyScalar(Math.sin((1 - t) * omega) / sinO)
      .add(B.clone().multiplyScalar(Math.sin(t * omega) / sinO));
    p.normalize().multiplyScalar(1 + lift * Math.sin(Math.PI * t));
    pts.push(p);
  }
  return pts;
};

const Arc = ({ points, offset }) => {
  const dot = useRef();
  useFrame((state) => {
    if (!dot.current) return;
    const t = (state.clock.getElapsedTime() * 0.25 + offset) % 1;
    dot.current.position.copy(points[Math.floor(t * (points.length - 1))]);
  });
  return (
    <>
      <Line
        points={points}
        color="#22d3ee"
        lineWidth={1}
        transparent
        opacity={0.45}
      />
      <mesh ref={dot}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#a5f3fc" />
      </mesh>
    </>
  );
};

const Marker = ({ lat, lon, color, size = 0.025, pulse = false }) => {
  const group = useRef();
  const ring = useRef();
  const pos = useMemo(() => latLonToVec3(lat, lon, 1), [lat, lon]);

  // Orient the marker so its local +Z points away from the globe center
  useLayoutEffect(() => {
    if (group.current) {
      group.current.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        pos.clone().normalize(),
      );
    }
  }, [pos]);

  useFrame((state) => {
    if (!pulse || !ring.current) return;
    const phase = (state.clock.getElapsedTime() % 1.6) / 1.6;
    const s = 1 + phase * 3;
    ring.current.scale.set(s, s, s);
    ring.current.material.opacity = (1 - phase) * 0.8;
  });

  return (
    <group ref={group} position={pos}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {pulse && (
        <mesh ref={ring}>
          <ringGeometry args={[0.04, 0.05, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
};

const TelemetryGlobe = ({ active }) => {
  const spin = useRef();
  const drag = useRef({ active: false, x: 0, vel: 0 });
  const invalidate = useThree((state) => state.invalidate);

  // Start rotated so Pune faces the camera
  const initialY = useMemo(() => {
    const p = latLonToVec3(PUNE.lat, PUNE.lon, 1);
    return Math.atan2(-p.x, p.z);
  }, []);

  const arcs = useMemo(() => CITIES.map((c) => buildArc(PUNE, c)), []);

  const dots = useMemo(() => {
    const n = 900;
    const arr = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r;
    }
    return arr;
  }, []);

  // Render at ~30fps only while visible (keeps the page light)
  useEffect(() => {
    let interval;
    const stop = () => {
      window.clearInterval(interval);
      interval = undefined;
    };
    const start = () => {
      stop();
      if (!active || document.hidden) return;
      invalidate();
      interval = window.setInterval(invalidate, 1000 / 30);
    };
    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [active, invalidate]);

  useFrame((_, delta) => {
    if (!active || document.hidden || !spin.current) return;
    const d = drag.current;
    if (!d.active) {
      spin.current.rotation.y += delta * 0.12 + d.vel;
      d.vel *= 0.94;
    }
    invalidate();
  });

  return (
    <group rotation={[0.35, 0, 0]}>
      <group ref={spin} rotation={[0, initialY, 0]}>
        {/* Opaque core: hides the far side + handles drag */}
        <mesh
          onPointerDown={(e) => {
            e.stopPropagation();
            e.target.setPointerCapture(e.pointerId);
            drag.current = { active: true, x: e.clientX, vel: 0 };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d.active || !spin.current) return;
            const dx = e.clientX - d.x;
            d.x = e.clientX;
            spin.current.rotation.y += dx * 0.008;
            d.vel = dx * 0.0008;
          }}
          onPointerUp={(e) => {
            drag.current.active = false;
            e.target.releasePointerCapture(e.pointerId);
          }}
        >
          <sphereGeometry args={[0.985, 48, 48]} />
          <meshBasicMaterial color="#050b12" />
        </mesh>

        {/* Lat/long grid */}
        <mesh>
          <sphereGeometry args={[1.003, 24, 16]} />
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>

        {/* Surface dots */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={dots.length / 3}
              array={dots}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.016}
            color="#67e8f9"
            transparent
            opacity={0.65}
            sizeAttenuation
          />
        </points>

        {/* Hub + destinations */}
        <Marker
          lat={PUNE.lat}
          lon={PUNE.lon}
          color="#ff5500"
          size={0.04}
          pulse
        />
        {CITIES.map((c) => (
          <Marker key={c.name} lat={c.lat} lon={c.lon} color="#22d3ee" />
        ))}

        {/* Data arcs from Pune */}
        {arcs.map((pts, i) => (
          <Arc key={CITIES[i].name} points={pts} offset={i / arcs.length} />
        ))}
      </group>

      {/* Atmosphere glow (does not rotate) */}
      <mesh scale={1.12}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Live clocks for IST + US / EU / Asia                               */
/* ------------------------------------------------------------------ */
const ZONES = [
  { label: "US EAST", tz: "America/New_York" },
  { label: "EU CENTRAL", tz: "Europe/Berlin" },
  { label: "ASIA SG", tz: "Asia/Singapore" },
];

const LiveClock = ({ now }) => (
  <div className="text-right shrink-0">
    <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-slate-400">
      <Clock size={11} className="text-cyan-400" />
      <span>IST • UTC+5:30</span>
    </div>
    <div className="font-mono text-xl sm:text-2xl font-black text-white tabular-nums">
      {formatTime(now, "Asia/Kolkata", true)}
    </div>
  </div>
);

const ZoneChips = ({ now }) => (
  <div className="grid grid-cols-3 gap-2">
    {ZONES.map(({ label, tz }) => {
      const hour = hourIn(now, tz);
      const open = hour >= 9 && hour < 18;
      return (
        <div
          key={label}
          className={`p-2 rounded-lg border transition-colors ${
            open
              ? "border-emerald-500/30 bg-emerald-500/[0.06]"
              : "border-white/[0.06] bg-white/[0.03]"
          }`}
        >
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <span
              className={`w-1.5 h-1.5 rounded-full ${open ? "bg-emerald-400" : "bg-slate-600"}`}
            />
            {label}
          </div>
          <div className="font-mono text-sm font-bold text-white mt-0.5 tabular-nums">
            {formatTime(now, tz)}
          </div>
          <div className="text-[9px] font-mono text-slate-500">
            {open ? "BUSINESS HRS" : "OFF HOURS"}
          </div>
        </div>
      );
    })}
  </div>
);

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

const EXPERIENCE = [
  {
    hash: "a1f9c20",
    role: "Software Developer – Frontend",
    company: "Infusyx Services",
    period: "Jun 2025 → Present",
    head: true,
  },
  {
    hash: "7d3e4b8",
    role: "Software Developer – Full Stack (Web & Mobile)",
    company: "Ioweb3 Technologies",
    period: "Apr 2024 → May 2025",
    head: false,
  },
];

const PRINCIPLES = [
  {
    icon: Rocket,
    label: "OWNERSHIP",
    text: "Requirements, UI, APIs and release, handled end to end.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Gauge,
    label: "PERFORMANCE",
    text: "Fast first loads and smooth interactions on real devices.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Layers,
    label: "MAINTAINABILITY",
    text: "Clean, reusable, documented code teammates can build on.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

/* ------------------------------------------------------------------ */
/*  Terminal-style experience panel (types itself when scrolled in)    */
/* ------------------------------------------------------------------ */
const Prompt = ({ text, cursor = false }) => (
  <div className="whitespace-pre-wrap break-words">
    <span className="text-emerald-400">vishal@dev</span>
    <span className="text-slate-500">:</span>
    <span className="text-cyan-400">~</span>
    <span className="text-slate-500">$ </span>
    <span className="text-slate-100">{text}</span>
    {cursor && (
      <span className="inline-block w-2 h-4 -mb-0.5 ml-0.5 bg-cyan-400 animate-pulse" />
    )}
  </div>
);

const TerminalExperience = ({ years }) => {
  const rootRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);

  const script = useMemo(
    () => [
      { kind: "cmd", text: "whoami" },
      {
        kind: "out",
        node: <div className="text-white font-semibold">vishal-shitole</div>,
      },
      { kind: "cmd", text: "uptime --career" },
      {
        kind: "out",
        node: (
          <div className="text-slate-300">
            up <span className="text-cyan-400 font-bold">{years}</span> years ·{" "}
            {EXPERIENCE.length} roles · still shipping
          </div>
        ),
      },
      { kind: "cmd", text: "git log --oneline --career" },
      {
        kind: "out",
        node: (
          <div className="space-y-3">
            {EXPERIENCE.map((e) => (
              <div key={e.hash}>
                <div>
                  <span className="text-amber-400">{e.hash}</span>{" "}
                  {e.head && (
                    <span className="text-cyan-400">
                      (<span className="text-emerald-400">HEAD</span> →
                      present){" "}
                    </span>
                  )}
                  <span className="text-white font-semibold">{e.company}</span>
                </div>
                <div className="pl-4 text-slate-300">{e.role}</div>
                <div className="pl-4 text-slate-500"># {e.period}</div>
              </div>
            ))}
          </div>
        ),
      },
    ],
    [years],
  );

  // Start typing once the panel is on screen
  useEffect(() => {
    const el = rootRef.current;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(script.length);
      setStarted(true);
      return;
    }
    if (!el || !("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [script.length]);

  const done = step >= script.length;

  // Typing engine
  useEffect(() => {
    if (!started || done) return;
    const item = script[step];
    let t;
    if (item.kind === "cmd") {
      if (chars < item.text.length) {
        t = setTimeout(() => setChars((c) => c + 1), 45);
      } else {
        t = setTimeout(() => {
          setStep((s) => s + 1);
          setChars(0);
        }, 350);
      }
    } else {
      t = setTimeout(() => setStep((s) => s + 1), 150);
    }
    return () => clearTimeout(t);
  }, [started, step, chars, done, script]);

  const current = !done ? script[step] : null;

  return (
    <div ref={rootRef} className="flex flex-col flex-1">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08] bg-black/30">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-400/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 font-mono text-[11px] text-slate-400 tracking-wider">
          CAREER TELEMETRY · zsh
        </span>
      </div>

      {/* Terminal body */}
      <div className="flex-1 p-5 bg-black/30 font-mono text-[12px] sm:text-[13px] leading-relaxed space-y-2 min-h-[320px]">
        {script.slice(0, step).map((item, i) =>
          item.kind === "cmd" ? (
            <Prompt key={i} text={item.text} />
          ) : (
            <div key={i} className="pl-4">
              {item.node}
            </div>
          ),
        )}
        {started && current?.kind === "cmd" && (
          <Prompt text={current.text.slice(0, chars)} cursor />
        )}
        {(!started || done) && <Prompt text="" cursor />}
      </div>
    </div>
  );
};

const About = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [globeVisible, setGlobeVisible] = useState(false);
  const globeContainerRef = useRef(null);
  const now = useNow();
  const years = useMemo(getYearsOfExperience, []);

  useEffect(() => {
    const container = globeContainerRef.current;
    if (!container || !("IntersectionObserver" in window)) {
      setGlobeVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setGlobeVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const techStack = [
    {
      name: "React",
      category: "FRONTEND",
      color: "text-[#61DAFB]",
      icon: <FaReact />,
    },
    {
      name: "Next.js",
      category: "FRONTEND",
      color: "text-white",
      icon: <SiNextdotjs />,
    },
    {
      name: "TypeScript",
      category: "FRONTEND",
      color: "text-[#3178C6]",
      icon: <SiTypescript />,
    },
    {
      name: "JavaScript",
      category: "FRONTEND",
      color: "text-[#F7DF1E]",
      icon: <IoLogoJavascript />,
    },
    {
      name: "React Native",
      category: "FRONTEND",
      color: "text-[#61DAFB]",
      icon: <TbBrandReactNative />,
    },
    {
      name: "TailwindCSS",
      category: "FRONTEND",
      color: "text-[#06B6D4]",
      icon: <RiTailwindCssFill />,
    },
    {
      name: "Shadcn UI",
      category: "FRONTEND",
      color: "text-white",
      icon: <SiShadcnui />,
    },
    {
      name: "MUI",
      category: "FRONTEND",
      color: "text-[#007FFF]",
      icon: <SiMui />,
    },

    {
      name: "TanStack Query",
      category: "STATE",
      color: "text-[#FF4154]",
      icon: <SiReactquery />,
    },
    {
      name: "Redux",
      category: "STATE",
      color: "text-[#764ABC]",
      icon: <SiRedux />,
    },

    {
      name: "Node.js",
      category: "BACKEND",
      color: "text-[#339933]",
      icon: <FaNode />,
    },
    {
      name: "PostgreSQL",
      category: "BACKEND",
      color: "text-[#4169E1]",
      icon: <BiLogoPostgresql />,
    },
    {
      name: "Redis",
      category: "BACKEND",
      color: "text-[#DC382D]",
      icon: <SiRedis />,
    },
    {
      name: "MongoDB",
      category: "BACKEND",
      color: "text-[#47A248]",
      icon: <SiMongodb />,
    },
    {
      name: "Supabase",
      category: "BACKEND",
      color: "text-[#3ECF8E]",
      icon: <RiSupabaseFill />,
    },
    {
      name: "Firebase",
      category: "BACKEND",
      color: "text-[#FFCA28]",
      icon: <BiLogoFirebase />,
    },

    {
      name: "AWS",
      category: "INFRA",
      color: "text-[#FF9900]",
      icon: <FaAws />,
    },
    {
      name: "Docker",
      category: "INFRA",
      color: "text-[#2496ED]",
      icon: <FaDocker />,
    },
    {
      name: "GitHub Actions",
      category: "INFRA",
      color: "text-white",
      icon: <FaGithub />,
    },
    {
      name: "Vercel",
      category: "INFRA",
      color: "text-white",
      icon: <IoLogoVercel />,
    },
    {
      name: "Vitest",
      category: "INFRA",
      color: "text-[#729B1B]",
      icon: <SiVitest />,
    },
    {
      name: "Jest",
      category: "INFRA",
      color: "text-[#C21325]",
      icon: <SiJest />,
    },
    {
      name: "Storybook",
      category: "INFRA",
      color: "text-[#FF4785]",
      icon: <SiStorybook />,
    },

    {
      name: "AI Agents & LLMs",
      category: "AI",
      color: "text-[#10A37F]",
      icon: <SiOpenai />,
    },
  ];

  const categories = ["ALL", "FRONTEND", "STATE", "BACKEND", "INFRA", "AI"];

  const filteredTechs =
    activeCategory === "ALL"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  return (
    <section id="about" className="space-section py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 space-reveal">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 tracking-widest uppercase">
            <span>// 01. ARCHITECTURAL PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            SYSTEM ARCHITECTURE &amp; CAPABILITIES
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Robust web systems built with end-to-end discipline, from
            pixel-level UI to high-throughput data layers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Box 1: About / Ownership (7 cols) */}
          <div className="md:col-span-7 cockpit-panel cockpit-panel-hover space-reveal rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <Cpu size={14} className="text-cyan-400" />
                <span>FRONTEND-FOCUSED FULL-STACK DEVELOPER</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Frontend-first engineer who ships the whole feature, not just
                the screen.
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I work on products where{" "}
                <span className="text-amber-400 font-semibold">
                  speed, clarity and reliability
                </span>{" "}
                matter: web platforms, admin dashboards and mobile apps. I take
                a feature{" "}
                <span className="text-cyan-400 font-semibold">
                  from the first conversation to production
                </span>
                , turning loose requirements into clean interfaces, dependable
                APIs and data that stays correct under real-world use.
              </p>
            </div>

            {/* Working principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRINCIPLES.map(({ icon: Icon, label, text, color, bg }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-400/40 transition-all space-y-3"
                >
                  <div
                    className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}
                  >
                    <Icon size={18} className={color} />
                  </div>
                  <div className="space-y-1">
                    <span
                      className={`text-[11px] font-mono font-semibold ${color}`}
                    >
                      {label}
                    </span>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Box 2: Terminal-style experience (5 cols) */}
          <div className="md:col-span-5 cockpit-panel cockpit-panel-hover space-reveal rounded-2xl overflow-hidden flex flex-col">
            <TerminalExperience years={years} />
          </div>

          {/* Box 3: Primary Timezone & Coordinates (5 cols) */}
          <div className="md:col-span-5 cockpit-panel cockpit-panel-hover space-reveal rounded-2xl p-6 relative overflow-hidden flex flex-col">
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Globe size={14} />
                  <span>PRIMARY TIMEZONE &amp; COORDINATES</span>
                </div>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  India
                  <p className="text-xs text-slate-400 font-mono">
                    ( 18.5204° N, 73.8567° E )
                  </p>
                </h4>
              </div>
              <LiveClock now={now} />
            </div>

            {/* <div className="relative z-10 mt-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>REMOTE READY: US / EU / ASIA TIMEZONES</span>
              </div>
            </div> */}

            {/* Interactive globe */}
            <div
              ref={globeContainerRef}
              className="relative flex-1 min-h-[250px] my-2 cursor-grab active:cursor-grabbing"
            >
              <Canvas
                frameloop="demand"
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 3.2], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ touchAction: "pan-y" }}
              >
                <TelemetryGlobe active={globeVisible} />
              </Canvas>
              <div className="absolute bottom-1 left-1 text-[10px] font-mono text-slate-500 pointer-events-none">
                ● PUNE HUB &nbsp;/&nbsp; DRAG TO ROTATE
              </div>
            </div>

            <div className="relative z-10">
              <ZoneChips now={now} />
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.08] relative z-10">
              <TerminalEmailButton />
            </div>
          </div>

          {/* Box 4: Interactive Technology Matrix (7 cols) */}
          <div className="md:col-span-7 cockpit-panel cockpit-panel-hover space-reveal rounded-2xl p-6 sm:p-8 space-y-5">
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
