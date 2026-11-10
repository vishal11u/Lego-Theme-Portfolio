import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Activity,
  Zap,
  Server,
} from "lucide-react";

// 3D Geometric Systems Core (Fast, Lightweight, High-Tech, 60fps)
const SystemCore = () => {
  const outerMesh = useRef();
  const innerMesh = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerMesh.current) {
      outerMesh.current.rotation.x = t * 0.2;
      outerMesh.current.rotation.y = t * 0.3;
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.x = -t * 0.3;
      innerMesh.current.rotation.z = t * 0.25;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
  });

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={outerMesh}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.35}
          emissive="#00f0ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Inner Octahedron Reactor Core */}
      <mesh ref={innerMesh}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#ff5500"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff5500"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Floating Orbital Data Ring */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.2, 0.03, 16, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
        </mesh>
      </Float>

      {/* Micro-Particles Node Web */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#38bdf8" transparent opacity={0.6} />
      </points>
    </group>
  );
};

const HeroScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={55} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff5500" />
      <SystemCore />
    </>
  );
};

const Hero = () => {
  const telemetryMetrics = [
    {
      label: "CONCURRENT SESSIONS",
      value: "1,000+",
      desc: "Sub-2s multi-tenant SaaS loads",
      icon: Activity,
      color: "text-cyan-400",
    },
    {
      label: "DATA INTERVAL",
      value: "800ms",
      desc: "Real-time Options Greeks simulator",
      icon: Zap,
      color: "text-amber-400",
    },
    {
      label: "ACTIVE AUDIENCE",
      value: "10,000+",
      desc: "Daily students across 3 countries",
      icon: Server,
      color: "text-emerald-400",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 3D Visualizer Canvas (Background layer on desktop) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-1/2 h-[500px] lg:h-[700px] pointer-events-none opacity-40 lg:opacity-85 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-3xl space-y-6">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-slate-300 tracking-wider">
              FULL-STACK &amp; FRONTEND ARCHITECT // 2.6+ YRS
            </span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            ENGINEERING{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-300 to-emerald-400">
              HIGH-SCALE
            </span>{" "}
            SYSTEMS &amp; REACTIVE UI.
          </motion.h1>

          {/* Lead Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl"
          >
            I'm{" "}
            <span className="text-white font-semibold">Vishal Shitole</span>. I
            build high-concurrency SaaS platforms, real-time data streaming
            dashboards, and offline-first mobile applications with React, Next.js,
            TypeScript, and Node.js. Owning the lifecycle from architecture to
            CI/CD and production monitoring.
          </motion.p>

          {/* Tactical CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all cursor-pointer"
            >
              <span>EXPLORE SYSTEMS</span>
              <ArrowDown size={15} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs font-bold text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-cyan-400/50 backdrop-blur-md transition-all cursor-pointer"
            >
              <span>INITIALIZE CONNECT</span>
              <ArrowRight size={15} />
            </a>

            <a
              href="/Vishal-Shitole-Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-slate-300 hover:text-white bg-transparent hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer"
            >
              <Download size={14} className="text-cyan-400" />
              <span>CV / RESUME</span>
            </a>
          </motion.div>
        </div>

        {/* Telemetry Hardware Deck (Bottom Cards) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-16 mt-4 max-w-4xl"
        >
          {telemetryMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="cockpit-panel cockpit-panel-hover rounded-xl p-5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-slate-400 tracking-wider">
                    {item.label}
                  </span>
                  <Icon size={16} className={item.color} />
                </div>
                <div className="text-3xl font-black text-white font-mono tracking-tight mb-1">
                  {item.value}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {item.desc}
                </div>

                {/* Laser accent line */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-linear-to-r from-transparent via-cyan-400/40 to-transparent" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
