import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { easing } from "maath";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Tech Stack Data with colors
const techStacks = [
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Next.js", color: "#000000" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Docker", color: "#2496ED" },
  { name: "GitHub", color: "#FF9900" },
  { name: "Redux", color: "#E10098" },
];

// Floating Tech Stack 3D
const FloatingTech = ({ position, tech, index }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime + index) * 0.3;
      meshRef.current.rotation.y += 0.01;
      if (hovered) {
        meshRef.current.scale.lerp({ x: 1.3, y: 1.3, z: 1.3 }, 0.1);
      } else {
        meshRef.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1);
      }
    }
  });

  return (
    <Float
      speed={2 + index * 0.3}
      rotationIntensity={0.6}
      floatIntensity={1.5}
      floatingRange={[-0.5, 0.5]}
    >
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[0.8, 0.8, 0.3]} />
          <meshStandardMaterial
            color={tech.color}
            metalness={0.8}
            roughness={0.2}
            emissive={tech.color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[0.6, 0.6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      </group>
    </Float>
  );
};

// LEGO Minifig with Face
const LegoMinifig = ({ scale, position }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (headRef.current) {
      headRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
      headRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position || [1.3, -1, 0]}
      scale={scale || 0.3}
    >
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 1.2, 0]}>
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial
            color="#ffeb3b"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.2, 0.1, 0.46]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color={blink ? "#ffeb3b" : "#000000"} />
        </mesh>
        <mesh position={[0.2, 0.1, 0.46]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color={blink ? "#ffeb3b" : "#000000"} />
        </mesh>

        {/* Smile */}
        <mesh position={[0, -0.1, 0.46]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Helmet/Visor */}
        <mesh position={[0, 0, 0.3]}>
          <boxGeometry args={[0.7, 0.6, 0.2]} />
          <meshStandardMaterial
            color="#03a9f4"
            transparent
            opacity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Arms with animation */}
      <mesh
        position={[-0.8, 0.3, 0]}
        rotation={[0, 0, 0.3 + Math.sin(Date.now() * 0.001) * 0.2]}
      >
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh
        position={[0.8, 0.3, 0]}
        rotation={[0, 0, -0.3 - Math.sin(Date.now() * 0.001) * 0.2]}
      >
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.3, -1.2, 0]}>
        <boxGeometry args={[0.5, 1.2, 0.5]} />
        <meshStandardMaterial color="#2196f3" />
      </mesh>
      <mesh position={[0.3, -1.2, 0]}>
        <boxGeometry args={[0.5, 1.2, 0.5]} />
        <meshStandardMaterial color="#2196f3" />
      </mesh>

      {/* Backpack */}
      <mesh position={[0, 0.3, -0.5]}>
        <boxGeometry args={[0.8, 1, 0.4]} />
        <meshStandardMaterial color="#9e9e9e" />
      </mesh>
    </group>
  );
};

// Particle System
const ParticleField = () => {
  const points = useRef();
  const particleCount = 1000;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    const color = Math.random() > 0.5 ? [1, 0.84, 0.0] : [0.26, 0.59, 0.96];
    colors[i * 3] = color[0];
    colors[i * 3 + 1] = color[1];
    colors[i * 3 + 2] = color[2];
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Interactive Mouse Follower
const MouseFollower = () => {
  const { mouse } = useThree();
  const lightRef = useRef();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 5;
      lightRef.current.position.y = mouse.y * 5;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 5]}
      intensity={2}
      distance={10}
      color="#ff00ff"
    />
  );
};

const HeroText = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "VISHAL SHITOLE";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 max-w-8xl px-6 pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-black text-white uppercase">
            Hello World!
          </span>
        </div>

        <h1
          className="text-5xl md:text-8xl font-black mb-3 leading-tight"
          style={{
            fontFamily: "Bungee, cursive",
            letterSpacing: "0.05em",
            WebkitTextStroke: "1px black",
            color: "transparent",
          }}
        >
          <span className="inline-block text-white">I'M</span>
          <br />
          <span className="inline-block bg-white bg-clip-text text-transparent animate-gradient">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 h-16 md:h-24 bg-yellow-400 ml-2"
            />
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-xl md:text-3xl text-gray-200 mb-8 font-bold"
      >
        <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          FULL STACK DEVELOPER
        </span>
        <br />
        BUILDING AWESOME THINGS, BRICK BY BRICK
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex gap-4 flex-wrap"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-lg font-black shadow-2xl hover:shadow-red-500/50 transition-all border-b-4 border-red-700"
        >
          <a href="#work" className="block w-full h-full text-center">
            VIEW WORK
          </a>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-black shadow-2xl hover:shadow-blue-500/50 transition-all border-b-4 border-blue-700"
        >
          <a href="#contact" className="block w-full h-full text-center">
            CONTACT ME
          </a>
        </motion.button>
      </motion.div>
    </div>
  );
};

const LegoBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-b from-indigo-900 via-purple-900 to-pink-900" />

    {/* Animated gradient orbs */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl"
    />

    <div className="absolute inset-0 opacity-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-1 bg-white"
          style={{ top: `${i * 5}%` }}
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute h-full w-1 bg-white"
          style={{ left: `${i * 5}%` }}
        />
      ))}
    </div>
  </div>
);

const Loader = () => (
  <div className="flex items-center justify-center h-full">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-8 border-yellow-400 border-t-red-500 rounded-lg"
    />
  </div>
);

function Scene({ isMobile }) {
  const techPositions = [
    [-4, 3, -3],
    [4, 3, -4],
    [-3, -2, -3],
    [3, -2, -4],
    [-5, 0, -2],
    [5, 1, -3],
    [-2, 4, -5],
    [2, -3, -2],
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={75} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff00ff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#00ffff"
      />

      <MouseFollower />
      <ParticleField />

      {techStacks.map((tech, i) => (
        <FloatingTech
          key={tech.name}
          position={techPositions[i]}
          tech={tech}
          index={i}
        />
      ))}

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <LegoMinifig
          scale={isMobile ? 1.2 : 1.8}
          position={isMobile ? [0, -0.5, 0] : [1.5, -0.5, 0]}
        />
      </Float>

      <Rig />
    </>
  );
}

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x * 1, state.mouse.y * 1, 6],
      0.2,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
}

const ScrollIndicator = () => (
  <motion.div
    animate={{ y: [0, 15, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
  >
    <span className="text-sm font-black uppercase text-white group-hover:text-yellow-400 transition-colors">
      Explore More
    </span>
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="w-10 h-10 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-b-4 border-yellow-600 shadow-lg"
    >
      <ChevronDown size={24} className="text-white" />
    </motion.div>
  </motion.div>
);

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 853);
  }, []);

  return (
    <section
      className="relative flex items-start justify-center min-h-screen overflow-hidden m20 md:mt24"
      id="home"
    >
      <LegoBackground />
      <HeroText />

      <div className="absolute inset-0 pointer-events-none">
        <Canvas>
          <Suspense fallback={<Loader />}>
            <Scene isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      <ScrollIndicator />

      {/* Floating studs with animation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
          }}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: ["#f44336", "#2196f3", "#ffeb3b", "#4caf50"][i % 4],
            top: `${20 + i * 10}%`,
            left: `${10 + (i % 2) * 80}%`,
          }}
        />
      ))}
    </section>
  );
};

export default Hero;
