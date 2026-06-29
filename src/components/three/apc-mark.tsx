"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* AutoPlanet mark — a "planet" sphere with an orbiting ring,
   representing Auto + Planet. Used in navbar and as floating accent. */
function PlanetMark({ size = 1 }: { size?: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.8;
    if (ring2.current) {
      ring2.current.rotation.x += delta * 0.6;
      ring2.current.rotation.y += delta * 0.4;
    }
    if (core.current) core.current.rotation.y += delta * 0.3;
  });

  return (
    <group scale={size}>
      {/* Core planet */}
      <mesh ref={core}>
        <sphereGeometry args={[0.62, 48, 48]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      {/* Main ring */}
      <mesh ref={ring} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.05, 0.045, 16, 80]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Tilted accent ring */}
      <mesh ref={ring2} rotation={[0.4, 0.3, 0]}>
        <torusGeometry args={[1.25, 0.02, 12, 64]} />
        <meshStandardMaterial color="#84cc16" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* small orbiting node */}
      <OrbitDot radius={1.05} speed={1.2} tilt={Math.PI / 2.2} color="#84cc16" />
      <OrbitDot radius={1.25} speed={0.8} tilt={0.4} color="#0a0a0a" />
    </group>
  );
}

function OrbitDot({
  radius,
  speed,
  tilt,
  color,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t) * radius * Math.sin(tilt),
        Math.sin(t) * radius * Math.cos(tilt)
      );
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
}

export default function ApcMark({ size = 1 }: { size?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#84cc16" />
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <PlanetMark size={size} />
      </Float>
    </Canvas>
  );
}
