
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const EarthSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const outerAtmosphereRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);

  // Try to load the uploaded earth image, fallback to generated texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    // Try to load the uploaded earth image
    loader.load(
      '/earth-network.jpg', // This will be your uploaded image
      (texture) => {
        console.log('✅ Loaded uploaded earth image');
        setEarthTexture(texture);
      },
      undefined,
      (error) => {
        console.log('📝 Using generated earth texture (uploaded image not found)');
        // Create fallback texture if image not found
        const canvas = createEarthTexture();
        const texture = new THREE.CanvasTexture(canvas);
        setEarthTexture(texture);
      }
    );
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; // Slower, more realistic rotation
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.08;
    }
    if (outerAtmosphereRef.current) {
      outerAtmosphereRef.current.rotation.y -= delta * 0.05; // Counter-rotation for dynamic effect
    }
    
    // Animate orbital nodes
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y += delta * 0.3;
      nodesGroupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshBasicMaterial;
          // Pulsing glow effect
          const pulse = Math.sin(state.clock.elapsedTime * 2 + index) * 0.3 + 0.7;
          material.opacity = pulse;
          
          // Scale pulsing
          const scale = pulse * 0.5 + 0.5;
          child.scale.setScalar(scale);
        }
      });
    }
  });

  // Generate orbital nodes
  const createOrbitalNodes = () => {
    const nodes = [];
    const nodeCount = 20;
    
    for (let i = 0; i < nodeCount; i++) {
      const theta = (i / nodeCount) * Math.PI * 2;
      const phi = Math.acos(1 - 2 * (i / nodeCount)); // More uniform distribution
      const radius = 3.2 + Math.random() * 0.8;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'];
      const color = colors[i % colors.length];
      
      nodes.push(
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial 
            color={color}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      );
    }
    
    return nodes;
  };

  return (
    <group>
      {/* Main Earth */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshPhongMaterial>
          {earthTexture ? (
            <primitive object={earthTexture} attach="map" />
          ) : (
            <primitive 
              object={new THREE.CanvasTexture(createEarthTexture())} 
              attach="map" 
            />
          )}
        </meshPhongMaterial>
      </mesh>
      
      {/* Inner atmosphere glow */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]} scale={1.08}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#87CEEB"
          transparent={true}
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Middle atmosphere */}
      <mesh position={[0, 0, 0]} scale={1.12}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#4FC3F7"
          transparent={true}
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Outer atmosphere */}
      <mesh ref={outerAtmosphereRef} position={[0, 0, 0]} scale={1.18}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent={true}
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Orbital connection nodes */}
      <group ref={nodesGroupRef}>
        {createOrbitalNodes()}
      </group>
      
      {/* Connection lines/orbital rings */}
      <group>
        {[1.2, 1.4, 1.6].map((scale, index) => (
          <mesh 
            key={index} 
            position={[0, 0, 0]} 
            scale={scale}
            rotation={[Math.PI / 4 * index, Math.PI / 6 * index, 0]}
          >
            <torusGeometry args={[2.5, 0.005, 8, 100]} />
            <meshBasicMaterial
              color={index === 0 ? '#3b82f6' : index === 1 ? '#06b6d4' : '#8b5cf6'}
              transparent={true}
              opacity={0.3}
            />
          </mesh>
        ))}
      </group>
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
