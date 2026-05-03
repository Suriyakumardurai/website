'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, color, speed = 1, distort = 0.3, size = 1 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1} floatingRange={[-0.3, 0.3]}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          distort={distort}
          speed={speed * 2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = (state.pointer.x * viewport.width) / 2;
      lightRef.current.position.y = (state.pointer.y * viewport.height) / 2;
    }
  });

  return <pointLight ref={lightRef} intensity={1.5} color="#8b5cf6" distance={10} />;
}

function Particles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.025} color="#7c3aed" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#e8e8f0" />
      <pointLight position={[-8, 4, -8]} intensity={0.8} color="#7c3aed" distance={20} />
      <pointLight position={[8, -4, 8]} intensity={0.6} color="#06b6d4" distance={20} />
      <MouseLight />

      {/* Push all shapes far to the edges so they don't cover hero text */}
      <AnimatedSphere position={[-5.5, 2.5, -6]} color="#7c3aed" speed={0.8} distort={0.3} size={1} />
      <AnimatedSphere position={[5.5, -2, -7]} color="#a855f7" speed={0.6} distort={0.2} size={0.7} />
      <AnimatedSphere position={[-4, -3, -5]} color="#06b6d4" speed={0.7} distort={0.25} size={0.5} />
      <AnimatedSphere position={[4.5, 3.5, -8]} color="#6366f1" speed={0.5} distort={0.2} size={0.6} />

      <Particles count={200} />
    </>
  );
}

export default function FloatingShapes() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.7 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', pointerEvents: 'auto' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
