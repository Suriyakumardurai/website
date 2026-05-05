"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function GlobeModel({ speed }: { speed?: any }) {
  const { scene } = useGLTF("/globe.glb");
  const meshRef = useRef<THREE.Group>(null);

  // Optimize materials for clarity
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.material) {
        child.material.envMapIntensity = 2;
        child.material.roughness = 0.3;
        child.material.metalness = 0.8;
      }
    }
  });

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
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.8
        }}
      >
        {/* VIRTUAL STUDIO RIG (Simulates Environment Map) */}
        <ambientLight intensity={1.8} />
        
        {/* Key Lights */}
        <pointLight position={[10, 10, 10]} intensity={4} color="#00ffc8" />
        <spotLight position={[-10, 10, 10]} angle={0.25} penumbra={1} intensity={6} color="#00ffc8" />
        
        {/* Rim & Definition Lights */}
        <directionalLight position={[0, 5, 5]} intensity={3} color="#ffffff" />
        <directionalLight position={[5, -5, 5]} intensity={2} color="#00ffc8" />
        <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 0, -10]} intensity={2} color="#00ffc8" />
        
        <GlobeModel speed={speed} />
      </Canvas>
    </div>
  );
}
