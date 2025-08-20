import { useEffect, useState } from 'react';

const RotatingGlobe = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate grid lines for the globe effect
  const generateGridLines = () => {
    const lines = [];
    
    // Horizontal lines (latitude)
    for (let i = 0; i < 8; i++) {
      const top = (i / 7) * 100;
      const opacity = Math.sin((i / 7) * Math.PI) * 0.6 + 0.2;
      lines.push(
        <div
          key={`lat-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{
            top: `${top}%`,
            opacity: opacity,
            transform: `scaleX(${Math.sin((i / 7) * Math.PI)})`
          }}
        />
      );
    }

    // Vertical lines (longitude)
    for (let i = 0; i < 12; i++) {
      const left = (i / 11) * 100;
      const rotation = (i / 11) * 360;
      lines.push(
        <div
          key={`lon-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          style={{
            left: `${left}%`,
            transformOrigin: 'center',
            transform: `rotateY(${rotation}deg) scaleY(0.8)`
          }}
        />
      );
    }

    return lines;
  };

  // Generate connection points/nodes
  const generateNodes = () => {
    const nodes = [];
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * 360;
      const radius = 40 + Math.random() * 20;
      const x = Math.cos(angle * Math.PI / 180) * radius + 50;
      const y = Math.sin(angle * Math.PI / 180) * radius + 50;
      
      nodes.push(
        <div
          key={`node-${i}`}
          className="absolute w-2 h-2 bg-primary rounded-full animate-pulse-glow glow"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          {/* Electric connection lines */}
          <div 
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, transparent 70%)',
              animationDelay: `${i * 0.3}s`
            }}
          />
        </div>
      );
    }
    return nodes;
  };

  // Generate electric arcs between nodes
  const generateElectricArcs = () => {
    const arcs = [];
    for (let i = 0; i < 8; i++) {
      const startAngle = (i / 8) * 360;
      const endAngle = ((i + 2) / 8) * 360;
      
      arcs.push(
        <div
          key={`arc-${i}`}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(from ${startAngle}deg, transparent 0deg, hsl(var(--primary) / 0.2) ${Math.abs(endAngle - startAngle) / 4}deg, transparent ${Math.abs(endAngle - startAngle) / 2}deg)`,
            animation: `spin 8s linear infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      );
    }
    return arcs;
  };

  return (
    <div className="relative w-96 h-96 mx-auto">
      {/* Main Globe Container */}
      <div 
        className={`relative w-full h-full rounded-full transition-all duration-1000 glow animate-float ${
          mounted ? 'animate-spin-slow' : ''
        }`}
        style={{
          background: `
            radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, hsl(var(--primary-light) / 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at center, hsl(var(--background-secondary)) 0%, hsl(var(--background)) 100%)
          `,
          border: '1px solid hsl(var(--primary) / 0.3)',
        }}
      >
        {/* Grid Lines */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {generateGridLines()}
        </div>

        {/* Connection Nodes */}
        <div className="absolute inset-0 rounded-full">
          {generateNodes()}
        </div>

        {/* Electric Arcs */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {generateElectricArcs()}
        </div>

        {/* Glowing Edge Effect */}
        <div 
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, 
                hsl(var(--primary) / 0.3) 90deg, 
                transparent 180deg,
                hsl(var(--primary-light) / 0.3) 270deg,
                transparent 360deg
              )
            `,
          }}
        />

        {/* Inner Glow */}
        <div 
          className="absolute inset-4 rounded-full opacity-60 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)'
          }}
        />

        {/* Core */}
        <div 
          className="absolute inset-1/3 rounded-full glow-strong animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.3) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* Orbital Rings */}
      <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" 
           style={{
             transform: 'rotate3d(1, 1, 0, 45deg)',
             animationDuration: '4s'
           }} 
      />
      <div className="absolute inset-2 rounded-full border border-primary/10 animate-ping" 
           style={{
             transform: 'rotate3d(1, -1, 0, 60deg)',
             animationDuration: '6s',
             animationDelay: '1s'
           }} 
      />

      {/* Scanning Lines */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              hsl(var(--primary) / 0.1) 45%, 
              hsl(var(--primary) / 0.3) 50%, 
              hsl(var(--primary) / 0.1) 55%, 
              transparent 100%
            )
          `,
          animation: 'scanner 3s ease-in-out infinite'
        }}
      />
    </div>
  );
};

export default RotatingGlobe;