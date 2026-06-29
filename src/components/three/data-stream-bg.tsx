"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState, tickScrollVelocity } from "@/lib/scroll-store";

/**
 * Enterprise 3D background — "data streams".
 * Particles flow along curved Catmull-Rom spline paths over a perspective
 * grid floor. The whole scene TWISTS as the user scrolls: rotation X/Y,
 * camera dolly, and a velocity-driven swirl for a tactile, premium feel.
 *
 * Each page passes a `variant` preset so the background feels distinct
 * per page (different camera angle, stream density, base rotation, seed)
 * while staying cohesive.
 */

export type BgVariant =
  | "home"
  | "services"
  | "process"
  | "case-studies"
  | "pricing"
  | "about"
  | "careers"
  | "blog"
  | "faq"
  | "contact";

type Preset = {
  streamCount: number;
  particlesPerStream: number;
  seedOffset: number;
  baseRotX: number;
  baseRotY: number;
  baseRotZ: number;
  camZ: number;
  camY: number;
  camX: number;
  twistScale: number;
  fov: number;
  gridOpacity: number;
};

const PRESETS: Record<BgVariant, Preset> = {
  home:          { streamCount: 7, particlesPerStream: 60, seedOffset: 3,   baseRotX: 0,     baseRotY: 0,    baseRotZ: 0,     camZ: 9,   camY: 0,   camX: 0,    twistScale: 1.0, fov: 50, gridOpacity: 0.12 },
  services:      { streamCount: 9, particlesPerStream: 50, seedOffset: 21,  baseRotX: 0.12,  baseRotY: -0.3, baseRotZ: 0,     camZ: 9.5, camY: 0.6, camX: 0.5,  twistScale: 0.8, fov: 52, gridOpacity: 0.10 },
  process:       { streamCount: 6, particlesPerStream: 70, seedOffset: 37,  baseRotX: -0.18, baseRotY: 0.4,  baseRotZ: 0,     camZ: 8.5, camY: -0.4,camX: -0.4, twistScale: 1.2, fov: 48, gridOpacity: 0.14 },
  "case-studies":{ streamCount: 8, particlesPerStream: 55, seedOffset: 51,  baseRotX: 0.08,  baseRotY: 0.6,  baseRotZ: 0,     camZ: 10,  camY: 0.8, camX: 0.6,  twistScale: 0.7, fov: 54, gridOpacity: 0.09 },
  pricing:       { streamCount: 5, particlesPerStream: 65, seedOffset: 67,  baseRotX: -0.1,  baseRotY: -0.5, baseRotZ: 0,     camZ: 9,   camY: 0.3, camX: -0.3, twistScale: 0.6, fov: 50, gridOpacity: 0.11 },
  about:         { streamCount: 7, particlesPerStream: 60, seedOffset: 83,  baseRotX: 0.15,  baseRotY: 0.2,  baseRotZ: 0,     camZ: 9.2, camY: 0.5, camX: 0.4,  twistScale: 0.9, fov: 51, gridOpacity: 0.12 },
  careers:       { streamCount: 6, particlesPerStream: 58, seedOffset: 97,  baseRotX: -0.12, baseRotY: -0.4, baseRotZ: 0,     camZ: 9.4, camY: -0.3,camX: 0.3,  twistScale: 0.85,fov: 50, gridOpacity: 0.11 },
  blog:          { streamCount: 8, particlesPerStream: 52, seedOffset: 111, baseRotX: 0.1,   baseRotY: 0.5,  baseRotZ: 0,     camZ: 9.6, camY: 0.7, camX: -0.5, twistScale: 0.8, fov: 52, gridOpacity: 0.10 },
  faq:           { streamCount: 5, particlesPerStream: 62, seedOffset: 127, baseRotX: -0.08, baseRotY: 0.3,  baseRotZ: 0,     camZ: 9,   camY: 0.2, camX: 0.3,  twistScale: 0.5, fov: 50, gridOpacity: 0.13 },
  contact:       { streamCount: 6, particlesPerStream: 60, seedOffset: 139, baseRotX: 0.06,  baseRotY: -0.2, baseRotZ: 0,     camZ: 9.3, camY: 0.4, camX: -0.4, twistScale: 0.7, fov: 50, gridOpacity: 0.11 },
};

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSplinePath(seed: number): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  const rng = mulberry32(seed);
  const startX = -14 + rng() * 4;
  const endX = 10 + rng() * 4;
  const baseY = (rng() - 0.5) * 5;
  const segments = 5;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = THREE.MathUtils.lerp(startX, endX, t);
    const y = baseY + Math.sin(t * Math.PI * (1 + rng())) * (1.5 + rng() * 2);
    const z = (rng() - 0.5) * 4;
    pts.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
}

function DataStream({ seed, color, particleCount }: { seed: number; color: string; particleCount: number }) {
  const curve = useMemo(() => makeSplinePath(seed), [seed]);
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.012, 6, false), [curve]);

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const p = curve.getPointAt(i / particleCount);
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    }
    return arr;
  }, [curve, particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      const geom = pointsRef.current.geometry;
      const pos = geom.attributes.position as THREE.BufferAttribute;
      const time = state.clock.elapsedTime;
      const speed = 0.04 + (seed % 3) * 0.01;
      const vBoost = 1 + Math.abs(scrollState.velocity) * 2.5;
      for (let i = 0; i < particleCount; i++) {
        let t = (i / particleCount + time * speed * vBoost) % 1;
        const p = curve.getPointAt(t);
        pos.setXYZ(i, p.x, p.y, p.z);
      }
      pos.needsUpdate = true;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15 + seed) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.1}
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function GridFloor({ opacity }: { opacity: number }) {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 0.6) % 2;
      const mat = ref.current.material as THREE.Material & { opacity: number; transparent: boolean };
      if (mat) {
        mat.transparent = true;
        mat.opacity = opacity;
      }
    }
  });
  return (
    <group position={[0, -4.5, 0]}>
      <gridHelper ref={ref} args={[60, 60, "#0a0a0a", "#0a0a0a"]} />
    </group>
  );
}

function DataNodes() {
  const ref = useRef<THREE.Points>(null);
  const count = 24;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const rng = mulberry32(99);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng() - 0.5) * 22;
      arr[i * 3 + 1] = (rng() - 0.5) * 7;
      arr[i * 3 + 2] = (rng() - 0.5) * 5;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <points ref={ref} positions={positions} stride={3}>
      <pointsMaterial color="#84cc16" size={0.18} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}

function Scene({ preset }: { preset: Preset }) {
  const groupRef = useRef<THREE.Group>(null);
  const floorRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    tickScrollVelocity();
    const p = scrollState.progress;
    const v = scrollState.velocity;

    if (groupRef.current) {
      const targetX = preset.baseRotX - p * 0.55 * preset.twistScale;
      const targetY = preset.baseRotY + p * 1.1 * preset.twistScale + v * 0.25;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.06);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, preset.baseRotZ + v * 0.12, 0.08);
    }

    const camTargetZ = preset.camZ + p * 2.2;
    const camTargetY = preset.camY + p * 0.8;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, camTargetZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, camTargetY, 0.05);
    const px = state.pointer.x * 0.4 + preset.camX;
    const py = state.pointer.y * 0.2;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, px, 0.04);
    state.camera.lookAt(0, 0, 0);

    if (floorRef.current) {
      floorRef.current.rotation.z = THREE.MathUtils.lerp(floorRef.current.rotation.z, v * 0.08, 0.05);
    }
  });

  const streams = useMemo(() => {
    const colors = ["#0a0a0a", "#0a0a0a", "#84cc16", "#0a0a0a", "#0a0a0a", "#84cc16", "#0a0a0a", "#0a0a0a", "#84cc16"];
    return Array.from({ length: preset.streamCount }, (_, i) => ({
      seed: i * 17 + preset.seedOffset,
      color: colors[i % colors.length],
    }));
  }, [preset.streamCount, preset.seedOffset]);

  return (
    <>
      <group ref={floorRef}>
        <GridFloor opacity={preset.gridOpacity} />
      </group>
      <group ref={groupRef}>
        <DataNodes />
        {streams.map((s, i) => (
          <DataStream key={i} seed={s.seed} color={s.color} particleCount={preset.particlesPerStream} />
        ))}
      </group>
    </>
  );
}

export default function DataStreamBackground({ variant = "home" }: { variant?: BgVariant }) {
  const preset = PRESETS[variant];
  return (
    <Canvas
      camera={{ position: [preset.camX, preset.camY, preset.camZ], fov: preset.fov }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene preset={preset} />
    </Canvas>
  );
}
