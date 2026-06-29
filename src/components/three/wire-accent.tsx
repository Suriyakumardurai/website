"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** A slowly rotating wireframe icosahedron knot — premium 3D accent for dark sections */
function Knot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.28, 120, 16]} />
      <meshBasicMaterial color="#84cc16" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const s = 0.4 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#84cc16" transparent opacity={0.18} />
    </mesh>
  );
}

export default function WireAccent({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Knot />
        <Core />
      </Canvas>
    </div>
  );
}
