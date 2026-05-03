"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function GlobeModel({ speed }: { speed?: any }) {
  const { scene } = useGLTF("/globe.glb");
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const multiplier = speed?.get() ?? 1;
      meshRef.current.rotation.y += 0.005 * multiplier;
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={2.7} 
      position={[0, 0, 0]}
    />
  );
}

export default function Globe({ speed }: { speed?: any }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffc8" />
        <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#00ffc8" />
        <GlobeModel speed={speed} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
