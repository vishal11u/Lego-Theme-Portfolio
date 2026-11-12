import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Html,
  MeshDistortMaterial,
  PerspectiveCamera,
  Sparkles,
  Stars,
  Trail,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Orbiting tech nodes (hover to enlarge, click to focus/pulse core)  */
/* ------------------------------------------------------------------ */
const NODES = [
  {
    label: "React",
    radius: 3.1,
    speed: 0.35,
    offset: 0,
    tilt: 0.5,
    color: "#61dafb",
  },
  {
    label: "Next.js",
    radius: 3.1,
    speed: 0.35,
    offset: Math.PI,
    tilt: 0.5,
    color: "#ffffff",
  },
  {
    label: "TypeScript",
    radius: 3.9,
    speed: -0.25,
    offset: 1.2,
    tilt: -0.7,
    color: "#3b82f6",
  },
  {
    label: "Node.js",
    radius: 3.9,
    speed: -0.25,
    offset: 4.3,
    tilt: -0.7,
    color: "#4ade80",
  },
  {
    label: "PostgreSQL",
    radius: 4.6,
    speed: 0.18,
    offset: 2.4,
    tilt: 1.1,
    color: "#38bdf8",
  },
  {
    label: "AWS",
    radius: 4.6,
    speed: 0.18,
    offset: 5.5,
    tilt: 1.1,
    color: "#f87171",
  },
];

const OrbitNode = ({ label, radius, speed, offset, tilt, color, onSelect }) => {
  const group = useRef();
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    if (group.current) {
      group.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t) * radius * Math.sin(tilt),
        Math.sin(t) * radius * Math.cos(tilt),
      );
    }
    if (mesh.current) {
      const target = hovered ? 1.9 : 1;
      mesh.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    }
  });

  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(color);
        }}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div
          style={{
            transform: "translateY(-22px)",
            fontFamily: "ui-monospace, monospace",
            fontSize: hovered ? 13 : 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: hovered ? color : "rgba(226,232,240,0.55)",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease",
            textShadow: hovered ? `0 0 12px ${color}` : "none",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Core: distorted energy sphere + wireframe shell + rings            */
/* ------------------------------------------------------------------ */
const SystemCore = () => {
  const root = useRef();
  const shell = useRef();
  const coreWrap = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  const matRef = useRef();

  const [hovered, setHovered] = useState(false);
  const pulse = useRef(0);
  const accent = useRef(new THREE.Color("#ff5500"));
  const targetAccent = useRef(new THREE.Color("#ff5500"));

  const handleSelect = (color) => {
    targetAccent.current.set(color);
    pulse.current = 1;
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    // Whole system tilts toward the cursor (smooth parallax)
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.lerp(
        root.current.rotation.y,
        pointer.x * 0.6,
        0.05,
      );
      root.current.rotation.x = THREE.MathUtils.lerp(
        root.current.rotation.x,
        -pointer.y * 0.4,
        0.05,
      );
    }

    if (shell.current) {
      shell.current.rotation.x = t * 0.12;
      shell.current.rotation.y = t * 0.18;
    }

    // Pulse decays back to 0 after a click
    pulse.current = THREE.MathUtils.lerp(pulse.current, 0, 0.06);
    if (coreWrap.current) {
      const base = hovered ? 1.15 : 1;
      const s = base + pulse.current * 0.35;
      coreWrap.current.scale.lerp(new THREE.Vector3(s, s, s), 0.2);
    }

    // Color eases toward last clicked node color
    accent.current.lerp(targetAccent.current, 0.06);
    if (matRef.current) {
      matRef.current.color.copy(accent.current);
      matRef.current.emissive.copy(accent.current);
      matRef.current.distort = THREE.MathUtils.lerp(
        matRef.current.distort,
        hovered ? 0.65 : 0.4,
        0.08,
      );
      matRef.current.speed = hovered ? 4 : 2;
    }

    if (ringA.current) ringA.current.rotation.z += delta * 0.25;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.18;
    if (ringC.current) ringC.current.rotation.z += delta * 0.1;
  });

  return (
    <group ref={root}>
      {/* Energy core (hover = more distortion, click = pulse) */}
      <group ref={coreWrap}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          onClick={(e) => {
            e.stopPropagation();
            pulse.current = 1;
          }}
        >
          <icosahedronGeometry args={[1.15, 8]} />
          <MeshDistortMaterial
            ref={matRef}
            color="#ff5500"
            emissive="#ff5500"
            emissiveIntensity={0.9}
            roughness={0.25}
            metalness={0.6}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </group>

      {/* Wireframe shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Three tilted orbital rings */}
      <group rotation={[Math.PI / 2.4, 0, 0]}>
        <mesh ref={ringA}>
          <torusGeometry args={[3.1, 0.012, 8, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.45} />
        </mesh>
      </group>
      <group rotation={[-Math.PI / 3, 0.4, 0]}>
        <mesh ref={ringB}>
          <torusGeometry args={[3.9, 0.01, 8, 128]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </mesh>
      </group>
      <group rotation={[Math.PI / 1.8, -0.3, 0]}>
        <mesh ref={ringC}>
          <torusGeometry args={[4.6, 0.008, 8, 128]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.22} />
        </mesh>
      </group>

      {/* Tech nodes */}
      {NODES.map((n) => (
        <OrbitNode key={n.label} {...n} onSelect={handleSelect} />
      ))}
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Background dust that drifts opposite to the cursor (depth feel)    */
/* ------------------------------------------------------------------ */
const Dust = () => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 16;
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0008;
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      -state.pointer.x * 0.6,
      0.04,
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      -state.pointer.y * 0.6,
      0.04,
    );
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7dd3fc"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
};

/* ------------------------------------------------------------------ */
/*  Star field (slow drift + cursor parallax)                          */
/* ------------------------------------------------------------------ */
const StarField = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.01;
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      -state.pointer.x * 0.8,
      0.03,
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      -state.pointer.y * 0.8,
      0.03,
    );
  });
  return (
    <group ref={ref}>
      <Stars
        radius={50}
        depth={40}
        count={2500}
        factor={3.5}
        saturation={0}
        fade
        speed={0.8}
      />
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Shooting meteors (streak across the screen, respawn at random)     */
/* ------------------------------------------------------------------ */
const METEOR_ANGLE = 0.55;

const Meteor = ({ w, h, z, delay }) => {
  const group = useRef();
  const tail = useRef();
  const s = useRef({ wait: delay, x: 0, y: 0, speed: 8 });

  useFrame((_, delta) => {
    const m = s.current;
    if (!group.current || !tail.current) return;

    if (m.wait > 0) {
      m.wait -= delta;
      group.current.visible = false;
      if (m.wait <= 0) {
        m.x = THREE.MathUtils.randFloat(-w * 0.1, w * 0.8);
        m.y = h * 0.6;
        m.speed = THREE.MathUtils.randFloat(8, 15);
        tail.current.scale.x = THREE.MathUtils.randFloat(1.5, 3.2);
        group.current.visible = true;
      }
      return;
    }

    m.x -= Math.cos(METEOR_ANGLE) * m.speed * delta;
    m.y -= Math.sin(METEOR_ANGLE) * m.speed * delta;
    group.current.position.set(m.x, m.y, z);

    if (m.y < -h * 0.6 || m.x < -w * 0.7) {
      m.wait = THREE.MathUtils.randFloat(1.5, 6);
    }
  });

  return (
    <group ref={group} rotation={[0, 0, METEOR_ANGLE]} visible={false}>
      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <group ref={tail}>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.05, 1, 8]} />
          <meshBasicMaterial
            color="#7dd3fc"
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Floating asteroids (low-poly rocks that tumble and bob)            */
/* ------------------------------------------------------------------ */
const Asteroid = ({ position, size, speed }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 0.7;
  });
  return (
    <Float speed={1.2} floatIntensity={1.2} rotationIntensity={0.2}>
      <mesh ref={ref} position={position}>
        <dodecahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color="#8b8178"
          roughness={1}
          flatShading
          emissive="#3b2f25"
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
};

/* ------------------------------------------------------------------ */
/*  Planets (banded gas giants, rocky worlds, optional rings)          */
/* ------------------------------------------------------------------ */
const makeBandTexture = (base) => {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  for (let y = 0; y < 128; y++) {
    const c = new THREE.Color(base);
    c.offsetHSL(
      0,
      0,
      Math.sin(y * 0.35) * 0.05 +
        Math.sin(y * 0.11) * 0.04 +
        (Math.random() - 0.5) * 0.03,
    );
    ctx.fillStyle = `#${c.getHexString()}`;
    ctx.fillRect(0, y, 4, 1);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

const _scaleVec = new THREE.Vector3();

const Planet = ({
  position,
  radius,
  color,
  glow,
  ringColor,
  banded = false,
  tilt = 0.4,
  spin = 0.1,
}) => {
  const group = useRef();
  const body = useRef();
  const [hovered, setHovered] = useState(false);
  const map = useMemo(
    () => (banded ? makeBandTexture(color) : null),
    [banded, color],
  );

  useFrame((_, delta) => {
    if (body.current)
      body.current.rotation.y += delta * spin * (hovered ? 4 : 1);
    if (group.current) {
      const s = hovered ? 1.12 : 1;
      group.current.scale.lerp(_scaleVec.set(s, s, s), 0.1);
    }
  });

  return (
    <Float speed={0.8} floatIntensity={0.8} rotationIntensity={0.05}>
      <group ref={group} position={position} rotation={[0, 0, tilt]}>
        <mesh
          ref={body}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[radius, 48, 48]} />
          <meshStandardMaterial
            color={map ? "#ffffff" : color}
            map={map}
            roughness={0.85}
            metalness={0.05}
            emissive={color}
            emissiveIntensity={0.12}
          />
        </mesh>

        {/* Atmosphere glow */}
        <mesh scale={1.12}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={glow || color}
            transparent
            opacity={0.14}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {ringColor && (
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[radius * 1.5, radius * 2.2, 96]} />
            <meshBasicMaterial
              color={ringColor}
              side={THREE.DoubleSide}
              transparent
              opacity={0.4}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

/* ------------------------------------------------------------------ */
/*  Rocket: flies a looping path around the system. Hover = faster,    */
/*  click = boost + barrel roll.                                       */
/* ------------------------------------------------------------------ */
const _up = new THREE.Vector3(0, 1, 0);

const Rocket = ({ center, rx, ry, depth, size = 0.45 }) => {
  const root = useRef();
  const body = useRef();
  const flame = useRef();
  const phase = useRef(Math.random() * 6);
  const boost = useRef(1);
  const roll = useRef(0);
  const [hovered, setHovered] = useState(false);

  const tmp = useMemo(
    () => ({
      next: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      quat: new THREE.Quaternion(),
    }),
    [],
  );

  // Figure-8 path with depth so it passes in front of / behind the core
  const getPos = (p, out) =>
    out.set(
      center[0] + Math.cos(p) * rx,
      center[1] + Math.sin(p * 2) * ry,
      Math.sin(p) * depth,
    );

  useFrame((state, delta) => {
    if (!root.current || !body.current) return;

    boost.current = THREE.MathUtils.lerp(
      boost.current,
      hovered ? 2.2 : 1,
      0.05,
    );
    roll.current = THREE.MathUtils.lerp(roll.current, 0, 0.04);
    phase.current += delta * 0.3 * boost.current;

    getPos(phase.current, root.current.position);
    getPos(phase.current + 0.03, tmp.next);
    tmp.dir.subVectors(tmp.next, root.current.position).normalize();
    tmp.quat.setFromUnitVectors(_up, tmp.dir);
    root.current.quaternion.slerp(tmp.quat, 0.1);

    body.current.rotation.y += delta * (0.8 + roll.current * 12);

    if (flame.current) {
      const t = state.clock.getElapsedTime();
      flame.current.scale.y =
        1 +
        Math.sin(t * 40) * 0.25 +
        Math.random() * 0.2 +
        (boost.current - 1) * 0.3;
      flame.current.scale.x = flame.current.scale.z = 1 + Math.random() * 0.15;
    }
  });

  return (
    <Trail
      width={0.55}
      length={7}
      color="#ff8a3d"
      attenuation={(t) => t * t}
      decay={1.2}
    >
      <group ref={root} scale={size}>
        <group
          ref={body}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          onClick={(e) => {
            e.stopPropagation();
            roll.current = 1;
            boost.current = 4;
          }}
        >
          {/* Fuselage */}
          <mesh>
            <cylinderGeometry args={[0.28, 0.28, 1.2, 24]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.55}
              metalness={0.05}
              roughness={0.35}
            />
          </mesh>
          {/* Nose cone */}
          <mesh position={[0, 0.9, 0]}>
            <coneGeometry args={[0.28, 0.6, 24]} />
            <meshStandardMaterial
              color="#ff5500"
              metalness={0.3}
              roughness={0.35}
              emissive="#ff5500"
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Window */}
          <mesh position={[0, 0.2, 0.26]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={1.2}
            />
          </mesh>
          {/* Fins */}
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
              <mesh position={[0.36, -0.5, 0]} rotation={[0, 0, -0.35]}>
                <boxGeometry args={[0.35, 0.5, 0.05]} />
                <meshStandardMaterial
                  color="#ff5500"
                  emissive="#ff5500"
                  emissiveIntensity={0.35}
                  metalness={0.1}
                  roughness={0.4}
                />
              </mesh>
            </group>
          ))}
          {/* Nozzle */}
          <mesh position={[0, -0.68, 0]}>
            <cylinderGeometry args={[0.16, 0.22, 0.18, 16]} />
            <meshStandardMaterial
              color="#1e293b"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
          {/* Flame */}
          <group ref={flame} position={[0, -0.77, 0]}>
            <mesh position={[0, -0.45, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.17, 0.9, 16]} />
              <meshBasicMaterial
                color="#ff7a1a"
                transparent
                opacity={0.85}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
            <mesh position={[0, -0.28, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.09, 0.55, 12]} />
              <meshBasicMaterial
                color="#fde68a"
                transparent
                opacity={0.95}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        </group>
      </group>
    </Trail>
  );
};

const HeroScene = () => {
  const { viewport, size } = useThree();

  // Scale the system so its outermost ring + labels always fit inside
  // the visible height, on any screen size.
  const MAX_EXTENT = 5.4; // outer ring radius (4.6) + label margin
  const scale = Math.min(1, (viewport.height * 0.5) / MAX_EXTENT);

  // On desktop, push the system to the right so it sits beside the text.
  // On mobile, keep it centered behind the content.
  const isDesktop = size.width >= 1024;
  const offsetX = isDesktop ? viewport.width * 0.22 : 0;

  // Place an object at a screen fraction (fx, fy in -0.5..0.5) at depth z,
  // so it always lands on-screen regardless of how far back it is.
  const at = (fx, fy, z) => {
    const k = (9 - z) / 9;
    return [fx * viewport.width * k, fy * viewport.height * k, z];
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={50} />
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#22d3ee" />
      <pointLight position={[-8, -6, -6]} intensity={1.5} color="#ff5500" />
      <group position={[offsetX, 0, 0]} scale={scale}>
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
          <SystemCore />
        </Float>
      </group>
      <StarField />
      <Dust />
      <Sparkles
        count={60}
        scale={[20, 12, 10]}
        size={2}
        speed={0.3}
        color="#67e8f9"
      />

      {/* Planets */}
      <Planet
        position={at(-0.42, -0.33, -6)}
        radius={1.6}
        color="#a78bfa"
        glow="#c4b5fd"
        ringColor="#ddd6fe"
        banded
        tilt={0.45}
        spin={0.08}
      />
      <Planet
        position={at(-0.12, 0.36, -9)}
        radius={0.9}
        color="#38bdf8"
        glow="#7dd3fc"
        tilt={0.2}
        spin={0.12}
      />

      {/* Floating asteroids */}
      <Asteroid position={at(0.28, 0.3, -1)} size={0.18} speed={0.4} />
      <Asteroid position={at(0.12, -0.12, -2)} size={0.12} speed={0.6} />
      <Asteroid position={at(0.47, 0.05, -2)} size={0.14} speed={0.5} />
      <Asteroid position={at(-0.2, 0.2, -3)} size={0.2} speed={0.3} />
      <Asteroid position={at(0.36, -0.38, 0)} size={0.1} speed={0.7} />
      <Asteroid position={at(-0.32, 0.05, -4)} size={0.25} speed={0.25} />

      {/* Shooting meteors */}
      {[0, 1.8, 3.5, 5, 6.5, 8].map((d, i) => (
        <Meteor
          key={i}
          w={viewport.width}
          h={viewport.height}
          z={-2 - (i % 3)}
          delay={d}
        />
      ))}

      {/* Rocket */}
      <Rocket
        center={[offsetX, 0]}
        rx={isDesktop ? viewport.width * 0.2 : viewport.width * 0.38}
        ry={viewport.height * 0.28}
        depth={2.5}
        size={isDesktop ? 0.45 : 0.38}
      />
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden bg-grid-pattern"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Canvas: interactive on desktop, passive on mobile so links stay tappable */}
      <div className="absolute inset-0 pointer-events-none lg:pointer-events-auto opacity-40 lg:opacity-100 z-0">
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 pointer-events-none">
        <div className="max-w-3xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-300 to-emerald-400 uppercase">
              Vishal Shitole
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl"
          >
            I build high-concurrency SaaS platforms, real-time data streaming
            dashboards, and offline-first mobile applications with React,
            Next.js, TypeScript, and Node.js. Owning the lifecycle from
            architecture to CI/CD and production monitoring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto"
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
      </div>
    </section>
  );
};

export default Hero;
