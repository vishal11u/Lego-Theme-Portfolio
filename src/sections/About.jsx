import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import {
  Copy,
  Check,
  Mail,
  Globe,
  Code,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";

import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaNode } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiJest } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";
import { RiSupabaseFill } from "react-icons/ri";
import { BiLogoFirebase } from "react-icons/bi";

// 3D Floating Code Symbols
const FloatingCodeSymbol = ({ symbol, position, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

// Enhanced 3D LEGO Brick
const AnimatedLegoBrick = ({ color = "#ff0000", position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      if (hovered) {
        meshRef.current.scale.lerp({ x: 1.2, y: 1.2, z: 1.2 }, 0.1);
      } else {
        meshRef.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1);
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 0.4, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      {[0, 1].map((i) =>
        [0, 1].map((j) => (
          <mesh
            key={`${i}-${j}`}
            position={[-0.25 + i * 0.5, 0.3, -0.25 + j * 0.5]}
          >
            <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )),
      )}
    </group>
  );
};

// Interactive Globe
const InteractiveGlobe = () => {
  const globeRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
      globeRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#4caf50"
          wireframe
          emissive="#4caf50"
          emissiveIntensity={0.3}
        />
      </mesh>
      <pointLight position={[2, 2, 2]} intensity={1} color="#4caf50" />
    </group>
  );
};

// Particle System for Cards
const CardParticles = ({ color }) => {
  const particlesRef = useRef();
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.6} />
    </points>
  );
};

// Enhanced LEGO Card with 3D depth
const EnhancedLegoCard = ({
  children,
  className = "",
  color = "bg-white",
  icon: Icon,
}) => {
  const cardRef = useRef();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02, z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative ${color} rounded-2xl p-6 border-b-8 border-opacity-70 shadow-2xl ${className} overflow-hidden`}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, white 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, white 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, white 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Icon badge */}
      {Icon && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <Icon className="text-white" size={24} />
        </motion.div>
      )}

      {/* LEGO studs decoration - animated */}
      <div className="absolute top-2 left-2 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
            className="w-3 h-3 bg-white bg-opacity-20 rounded-full"
          />
        ))}
      </div>

      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

// Animated Tech Stack
const AnimatedTechStack = () => {
  const techs = [
    { name: "HTML5", color: "bg-orange-400", icon: <FaHtml5 /> },
    { name: "CSS3", color: "bg-blue-500", icon: <FaCss3Alt /> },
    { name: "JavaScript", color: "bg-yellow-500", icon: <IoLogoJavascript /> },
    { name: "React", color: "bg-cyan-500", icon: <FaReact /> },
    { name: "Next.js", color: "bg-black", icon: <SiNextdotjs /> },
    { name: "Node", color: "bg-green-600", icon: <FaNode /> },
    { name: "MongoDB", color: "bg-green-500", icon: <SiMongodb /> },
    { name: "PostgreSQL", color: "bg-blue-400", icon: <BiLogoPostgresql /> },
    { name: "TypeScript", color: "bg-blue-600", icon: <SiTypescript /> },
    { name: "TailwindCSS", color: "bg-teal-500", icon: <RiTailwindCssFill /> },
    { name: "GitHub", color: "bg-gray-900", icon: <FaGithub /> },
    { name: "Redux", color: "bg-indigo-600", icon: <SiRedux /> },
    { name: "Jest", color: "bg-orange-500", icon: <SiJest /> },
    {
      name: "React Native",
      color: "bg-blue-600",
      icon: <TbBrandReactNative />,
    },
    { name: "Firebase", color: "bg-yellow-400", icon: <BiLogoFirebase /> },
    { name: "Supabase", color: "bg-green-500", icon: <RiSupabaseFill /> },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-8 gap-4">
      {techs.map((tech, i) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.2, rotate: 360, y: -10 }}
          transition={{
            delay: i * 0.05,
            rotate: { duration: 0.6 },
            scale: { type: "spring", stiffness: 300 },
          }}
          className={`${tech.color} w-18 h-16 rounded-lg flex flex-col items-center justify-center border-b-4 border-opacity-50 border-black shadow-lg cursor-pointer relative group`}
        >
          <span className="text-2xl">{tech.icon}</span>
          <span className="text-white font-medium text-[10px] mt-1">
            {tech.name}
          </span>

          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {tech.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Copy Email Button with animation
const AnimatedEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "shitolevishal29@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95, y: 0 }}
      onClick={handleCopy}
      className="relative cursor-pointer flex items-center gap-3 text-sm md:text-xl px-8 py-4 bg-linear-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-lg font-black shadow-2xl border-b-4 border-yellow-600 overflow-hidden group"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
        style={{ opacity: 0.2 }}
      />

      <Mail size={20} className="relative z-10" />
      <span className="relative z-10">{email}</span>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: copied ? 1 : 0 }}
        className="relative z-10"
      >
        {copied ? (
          <Check size={20} className="text-green-700" />
        ) : (
          <Copy size={20} />
        )}
      </motion.div>

      {/* Sparkle effect on copy */}
      {copied && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * 60 * Math.PI) / 180) * 30,
                y: Math.sin((i * 60 * Math.PI) / 180) * 30,
              }}
              transition={{ duration: 0.6 }}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            />
          ))}
        </>
      )}
    </motion.button>
  );
};

// Stats Counter
const StatCounter = ({ end, label, icon: Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 10;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="flex items-center gap-3 bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border-2 border-white border-opacity-30"
    >
      <Icon className="text-black" size={24} />
      <div>
        <div className="text-3xl font-black text-black">{count}+</div>
        <div className="text-sm font-bold text-black opacity-80">{label}</div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      className="relative py-20 px-6 bg-linear-to-b from-purple-900 via-indigo-900 to-blue-900 overflow-hidden"
      id="about"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
          >
            <div
              className="absolute w-full h-1 bg-white"
              style={{ top: `${i * 5}%` }}
            />
            <div
              className="absolute h-full w-1 bg-white"
              style={{ left: `${i * 5}%` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(28)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.2,
              delay: i * 0.1,
              repeat: Infinity,
            }}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-7xl font-black text-white mb-4 uppercase"
            style={{
              fontFamily: "Bungee, cursive",
              letterSpacing: "0.05em",
            }}
          >
            <span className="bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 font-bold">
            Building the future, one block at a time
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-auto"
        >
          {/* Grid 1 - Introduction with stats */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-3 md:row-span-2"
          >
            <EnhancedLegoCard
              color="bg-gradient-to-br from-red-500 to-pink-600"
              className="h-full"
              icon={Code}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">
                    Hi, I'm Vishal Shitole
                  </h3>
                  <p className="text-white text-lg font-bold leading-relaxed">
                    Over the last 2.2+ years, I developed my frontend and
                    backend dev skills to deliver dynamic software web and mobile
                    applications.
                  </p>
                </div>

                {/* Animated stats */}
                <div className="grid grid-cols-2 gap-4">
                  <StatCounter end={10} label="Projects" icon={Award} />
                  <StatCounter end={500} label="Commits" icon={TrendingUp} />
                </div>
              </div>
            </EnhancedLegoCard>
          </motion.div>

          {/* Grid 2 - Skills with 3D elements */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-3 md:row-span-2"
          >
            <EnhancedLegoCard
              color="bg-gradient-to-br from-blue-500 to-cyan-600"
              className="h-full"
              icon={Zap}
            >
              <div className="flex flex-col h-full">
                <h3 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase text-center">
                  Code is Craft
                </h3>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {[
                    "Design Patterns",
                    "Clean Code",
                    "UI/UX",
                    "Performance",
                    "Responsive Design",
                    "Accessibility",
                  ].map((skill, i) => (
                    <motion.div
                      key={skill}
                      whileHover={{
                        rotate: Math.random() > 0.5 ? 5 : -5,
                        scale: 1.05,
                      }}
                      className="bg-white bg-opacity-20 rounded-lg p-2 border-b-4 border-white border-opacity-30 backdrop-blur-sm flex items-center justify-center"
                    >
                      <p className="font-black text-black text-center">
                        {skill}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* 3D floating symbols */}
                <div className="absolute right-0 bottom-0 w-32 h-32 opacity-30">
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[5, 5, 5]} />
                    <FloatingCodeSymbol
                      symbol="<>"
                      position={[0, 0, 0]}
                      color="#ffffff"
                    />
                  </Canvas>
                </div>
              </div>
            </EnhancedLegoCard>
          </motion.div>

          {/* Grid 3 - Globe */}
          <motion.div variants={cardVariants} className="md:col-span-3">
            <EnhancedLegoCard
              color="bg-gradient-to-br from-green-500 to-emerald-600"
              className="h-64"
              icon={Globe}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-2 uppercase">
                  Time Zone
                </h3>
                <p className="text-white font-bold">
                  Based in Pune, India. Open to remote work worldwide
                </p>
              </div>
              <div className="absolute right-0 -top-1.5 w-64 h-72">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[5, 5, 5]} />
                  <InteractiveGlobe />
                </Canvas>
              </div>
            </EnhancedLegoCard>
          </motion.div>

          {/* Grid 4 - Contact */}
          <motion.div variants={cardVariants} className="md:col-span-3">
            <EnhancedLegoCard
              color="bg-gradient-to-br from-purple-500 to-pink-600"
              className="h-64"
              icon={Mail}
            >
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <h3 className="text-3xl md:text-4xl font-black text-white text-center uppercase mb-6">
                  Start a Project Together?
                </h3>
                <AnimatedEmailButton />
              </div>
            </EnhancedLegoCard>
          </motion.div>

          {/* Grid 5 - Tech Stack */}
          <motion.div variants={cardVariants} className="md:col-span-6">
            <EnhancedLegoCard
              color="bg-gradient-to-br from-orange-500 to-red-600"
              className="relative"
              particleColor="#ffffff"
            >
              <div className="mb-6">
                <h3 className="text-3xl font-black text-white mb-2 uppercase">
                  Tech Stack
                </h3>
                <p className="text-white font-bold">
                  I specialize in a variety of languages, frameworks, and tools
                  that allow me to build robust and scalable applications
                </p>
              </div>
              <AnimatedTechStack />

              {/* 3D animated brick */}
              <div className="absolute right-8 top-8 w-32 h-32 hidden lg:block">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight
                    position={[5, 5, 5]}
                    intensity={1}
                    color="#ff6b6b"
                  />
                  <AnimatedLegoBrick color="#ff6b6b" />
                  <CardParticles color="#ffffff" />
                </Canvas>
              </div>
            </EnhancedLegoCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
