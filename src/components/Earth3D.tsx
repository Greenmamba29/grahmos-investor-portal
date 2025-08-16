
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const EarthSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Main Earth */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshPhongMaterial>
          <primitive 
            object={new THREE.CanvasTexture(createEarthTexture())} 
            attach="map" 
          />
        </meshPhongMaterial>
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]} scale={1.1}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#87CEEB"
          transparent={true}
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Outer atmosphere */}
      <mesh position={[0, 0, 0]} scale={1.15}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#4FC3F7"
          transparent={true}
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Create a realistic Earth texture
const createEarthTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return canvas;

  // Create gradient background (ocean)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#1e40af'); // Deep ocean blue
  gradient.addColorStop(0.3, '#2563eb'); // Ocean blue
  gradient.addColorStop(0.7, '#3b82f6'); // Lighter ocean
  gradient.addColorStop(1, '#1e40af'); // Deep ocean blue
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add continent shapes
  ctx.fillStyle = '#22c55e'; // Green for land

  // North America
  ctx.beginPath();
  ctx.ellipse(80, 80, 40, 60, 0, 0, 2 * Math.PI);
  ctx.fill();

  // South America
  ctx.beginPath();
  ctx.ellipse(100, 150, 25, 45, 0, 0, 2 * Math.PI);
  ctx.fill();

  // Europe/Africa
  ctx.beginPath();
  ctx.ellipse(260, 100, 35, 70, 0, 0, 2 * Math.PI);
  ctx.fill();

  // Asia
  ctx.beginPath();
  ctx.ellipse(350, 80, 60, 40, 0, 0, 2 * Math.PI);
  ctx.fill();

  // Australia
  ctx.beginPath();
  ctx.ellipse(400, 180, 20, 15, 0, 0, 2 * Math.PI);
  ctx.fill();

  // Add cloud layer
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 15 + 5;
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius * 0.6, 0, 0, 2 * Math.PI);
    ctx.fill();
  }

  return canvas;
};

const Earth3D = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={1.2} 
          color="#ffffff"
        />
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={0.6} 
          color="#87CEEB"
        />
        <Stars 
          radius={300} 
          depth={60} 
          count={2000} 
          factor={8} 
          saturation={0} 
          fade={true}
        />
        <EarthSphere />
      </Canvas>
    </div>
  );
};

export default Earth3D;
