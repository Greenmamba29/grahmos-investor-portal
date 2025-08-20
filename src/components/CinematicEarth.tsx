import { useEffect, useState } from 'react';

const CinematicEarth = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate animated starfield
  const generateStarField = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.8 + 0.2;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 2;
      
      stars.push(
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: opacity,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, ${opacity * 0.5})`
          }}
        />
      );
    }
    return stars;
  };

  // Generate orbital debris/particles
  const generateOrbitalDebris = () => {
    const debris = [];
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * 360;
      const radius = 200 + Math.random() * 100;
      const speed = Math.random() * 2 + 1;
      
      debris.push(
        <div
          key={`debris-${i}`}
          className="absolute w-1 h-1 bg-primary/60 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: `rotate(${angle}deg) translateX(${radius}px)`,
            animation: `orbit ${20 + speed * 10}s linear infinite`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      );
    }
    return debris;
  };

  // Generate connection nodes with electric effects
  const generateElectricNodes = () => {
    const nodes = [];
    const positions = [
      { x: 20, y: 15, delay: 0 },
      { x: 80, y: 25, delay: 0.5 },
      { x: 70, y: 70, delay: 1 },
      { x: 15, y: 80, delay: 1.5 },
      { x: 40, y: 30, delay: 2 },
      { x: 60, y: 60, delay: 2.5 },
      { x: 30, y: 85, delay: 3 },
      { x: 85, y: 50, delay: 0.8 },
    ];

    positions.forEach((pos, i) => {
      nodes.push(
        <div
          key={`node-${i}`}
          className="absolute electric-node"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            animationDelay: `${pos.delay}s`,
          }}
        >
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow glow-strong" />
          
          {/* Electric arcs */}
          <div 
            className="absolute inset-0 animate-ping"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, transparent 70%)',
              animationDelay: `${pos.delay * 0.5}s`,
              animationDuration: '2s'
            }}
          />
        </div>
      );
    });
    
    return nodes;
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-2xl">
      {/* Animated Starfield Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black">
        {generateStarField()}
      </div>

      {/* Nebula Effects */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, hsl(174 100% 70% / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsl(174 80% 55% / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 20%, hsl(210 100% 70% / 0.05) 0%, transparent 50%)
          `
        }}
      />

      {/* Orbital Debris */}
      <div className="absolute inset-0">
        {generateOrbitalDebris()}
      </div>

      {/* Main Earth Container with Realistic Orbit */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`relative w-80 h-80 transition-all duration-2000 ${
            mounted ? 'animate-realistic-orbit' : ''
          }`}
        >
          {/* Earth Image */}
          <div className="relative w-full h-full">
            <div 
              className="w-full h-full rounded-full glow-strong bg-gradient-to-br from-blue-600 via-green-600 to-blue-800 shadow-2xl"
              style={{
                filter: 'brightness(1.1) contrast(1.2) saturate(1.3)',
                animation: 'earth-rotation 60s linear infinite',
                backgroundImage: `
                  radial-gradient(ellipse at 30% 20%, rgba(34, 139, 34, 0.8) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 60%, rgba(30, 144, 255, 0.6) 0%, transparent 50%),
                  radial-gradient(ellipse at 20% 80%, rgba(50, 205, 50, 0.4) 0%, transparent 50%)
                `
              }}
            />
            
            {/* Atmospheric Glow */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, transparent 60%, hsl(174 100% 70% / 0.3) 70%, hsl(174 100% 70% / 0.6) 75%, transparent 80%)',
                animation: 'atmosphere-pulse 4s ease-in-out infinite'
              }}
            />
            
            {/* Electric Connection Nodes */}
            <div className="absolute inset-0 rounded-full">
              {generateElectricNodes()}
            </div>
          </div>

          {/* Orbital Rings with 3D Effect */}
          <div 
            className="absolute inset-0 rounded-full border border-primary/40 animate-ping"
            style={{
              transform: 'rotateX(75deg) rotateY(0deg)',
              animationDuration: '6s',
              borderStyle: 'dashed'
            }}
          />
          <div 
            className="absolute inset-4 rounded-full border border-primary/30 animate-ping"
            style={{
              transform: 'rotateX(75deg) rotateY(45deg)',
              animationDuration: '8s',
              animationDelay: '1s',
              borderStyle: 'dotted'
            }}
          />
          <div 
            className="absolute inset-8 rounded-full border border-primary/20 animate-ping"
            style={{
              transform: 'rotateX(75deg) rotateY(90deg)',
              animationDuration: '10s',
              animationDelay: '2s'
            }}
          />

          {/* Energy Field Scanner */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden opacity-60"
            style={{
              background: `
                conic-gradient(from 0deg at 50% 50%, 
                  transparent 0deg, 
                  hsl(var(--primary) / 0.4) 30deg, 
                  transparent 60deg,
                  hsl(var(--primary-light) / 0.3) 120deg,
                  transparent 150deg,
                  hsl(var(--primary) / 0.2) 210deg,
                  transparent 240deg,
                  hsl(var(--primary-light) / 0.2) 300deg,
                  transparent 330deg,
                  transparent 360deg
                )
              `,
              animation: 'energy-field 12s linear infinite reverse'
            }}
          />

          {/* Hyperspace Scanner Effect */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden opacity-40"
            style={{
              background: `
                linear-gradient(90deg, 
                  transparent 0%, 
                  transparent 45%, 
                  hsl(var(--primary) / 0.6) 50%, 
                  transparent 55%, 
                  transparent 100%
                )
              `,
              animation: 'hyperspace-scan 3s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CinematicEarth;