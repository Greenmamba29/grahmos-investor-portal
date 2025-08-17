
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Text3D, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Network node component
const NetworkNode = ({ position, intensity = 1 }: { position: [number, number, number]; intensity?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + intensity) * 0.2;
      meshRef.current.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * 3 + intensity) * 0.2);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.5}
        emissive="#00d4ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

// Network connection lines
const NetworkConnections = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  // Create network connections between major cities/points
  const connections = useMemo(() => {
    const points = [
      [2.2, 0.8, 0], // North America
      [2.0, -0.5, 0], // South America
      [-1.8, 0.3, 0], // Europe
      [-2.0, -0.8, 0], // Africa
      [2.5, -1.2, 0], // Asia
      [1.8, -1.5, 0], // Australia
    ];

    const lines: Array<{ start: [number, number, number]; end: [number, number, number] }> = [];
    
    // Connect each point to 2-3 others
    points.forEach((point, i) => {
      const connections = Math.floor(Math.random() * 2) + 2;
      for (let j = 0; j < connections; j++) {
        const targetIndex = (i + j + 1) % points.length;
        lines.push({
          start: point as [number, number, number],
          end: points[targetIndex] as [number, number, number]
        });
      }
    });

    return lines;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        if (line.material) {
          (line.material as THREE.MeshBasicMaterial).opacity = 
            0.3 + Math.sin(state.clock.elapsedTime * 1.5 + i * 0.5) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {connections.map((connection, i) => (
        <Line key={i} start={connection.start} end={connection.end} />
      ))}
    </group>
  );
};

// Line component for network connections
const Line = ({ start, end }: { start: [number, number, number]; end: [number, number, number] }) => {
  const points = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(start[0] * 1.5, start[1] * 1.5, start[2] * 1.5),
      new THREE.Vector3(end[0] * 1.5, end[1] * 1.5, end[2] * 1.5),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(50);
  }, [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.4}
        emissive="#00d4ff"
        emissiveIntensity={0.3}
      />
    </line>
  );
};

const EarthSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const networkRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.08;
    }
    if (networkRef.current) {
      networkRef.current.rotation.y += delta * 0.05;
    }
  });

  // Create enhanced Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return canvas;

    // Create gradient background (ocean)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f172a'); // Deep ocean blue
    gradient.addColorStop(0.3, '#1e40af'); // Ocean blue
    gradient.addColorStop(0.7, '#3b82f6'); // Lighter ocean
    gradient.addColorStop(1, '#0f172a'); // Deep ocean blue
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add continent shapes with better detail
    ctx.fillStyle = '#22c55e'; // Green for land

    // North America - more detailed
    ctx.beginPath();
    ctx.ellipse(200, 120, 60, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Alaska
    ctx.beginPath();
    ctx.ellipse(150, 80, 25, 35, 0, 0, 2 * Math.PI);
    ctx.fill();

    // South America - more detailed
    ctx.beginPath();
    ctx.ellipse(220, 280, 35, 60, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Europe/Africa - more detailed
    ctx.beginPath();
    ctx.ellipse(500, 150, 45, 90, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Asia - more detailed
    ctx.beginPath();
    ctx.ellipse(750, 120, 80, 60, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Australia - more detailed
    ctx.beginPath();
    ctx.ellipse(800, 320, 25, 20, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Add cloud layer with better distribution
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 20 + 8;
      ctx.beginPath();
      ctx.ellipse(x, y, radius, radius * 0.7, 0, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Add some ice caps
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.ellipse(200, 30, 40, 15, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(200, 482, 35, 12, 0, 0, 2 * Math.PI);
    ctx.fill();

    return canvas;
  }, []);

  return (
    <group>
      {/* Main Earth */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <meshPhongMaterial>
          <primitive 
            object={new THREE.CanvasTexture(earthTexture)} 
            attach="map" 
          />
        </meshPhongMaterial>
      </mesh>
      
      {/* Enhanced atmosphere glow */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]} scale={1.05}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent={true}
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Outer atmosphere */}
      <mesh position={[0, 0, 0]} scale={1.12}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial
          color="#0095ff"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Network overlay */}
      <group ref={networkRef}>
        <NetworkConnections />
        
        {/* Major network nodes */}
        <NetworkNode position={[2.2, 0.8, 0]} intensity={1} />
        <NetworkNode position={[2.0, -0.5, 0]} intensity={1.2} />
        <NetworkNode position={[-1.8, 0.3, 0]} intensity={0.8} />
        <NetworkNode position={[-2.0, -0.8, 0]} intensity={1.1} />
        <NetworkNode position={[2.5, -1.2, 0]} intensity={0.9} />
        <NetworkNode position={[1.8, -1.5, 0]} intensity={1.3} />
      </group>
    </group>
  );
};

const Earth3D = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={1.5} 
          color="#ffffff"
        />
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={0.8} 
          color="#00d4ff"
        />
        <pointLight 
          position={[5, -5, 5]} 
          intensity={0.6} 
          color="#0095ff"
        />
        <Stars 
          radius={300} 
          depth={60} 
          count={3000} 
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
