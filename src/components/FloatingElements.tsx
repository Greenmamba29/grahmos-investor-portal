import { useEffect, useState } from 'react';

const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500/20 rounded-full animate-float-elements animate-delay-100"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-cyan-500/20 rounded-full animate-float-elements animate-delay-300"></div>
      <div className="absolute top-60 left-1/4 w-3 h-3 bg-purple-500/20 rounded-full animate-float-elements animate-delay-500"></div>
      
      {/* Larger floating elements */}
      <div className="absolute top-32 right-1/3 w-8 h-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full animate-float-slow animate-delay-200"></div>
      <div className="absolute top-80 left-1/3 w-10 h-10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full animate-float-medium animate-delay-400"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-24 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-enhanced-pulse animate-delay-100 glow-blue"></div>
      <div className="absolute top-96 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-enhanced-pulse animate-delay-300 glow-cyan"></div>
      <div className="absolute top-48 right-16 w-2 h-2 bg-purple-400 rounded-full animate-enhanced-pulse animate-delay-500 glow-purple"></div>
      
      {/* Floating lines */}
      <div className="absolute top-32 left-16 w-16 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-float-fast animate-delay-200"></div>
      <div className="absolute top-72 right-32 w-20 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-float-medium animate-delay-400"></div>
      
      {/* Diagonal floating elements */}
      <div className="absolute top-40 left-1/3 w-4 h-4 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-full animate-float-fast animate-delay-600"></div>
      <div className="absolute top-64 right-1/4 w-5 h-5 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full animate-float-slow animate-delay-800"></div>
      
      {/* Bottom floating elements */}
      <div className="absolute bottom-40 left-20 w-6 h-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full animate-float-medium animate-delay-300"></div>
      <div className="absolute bottom-60 right-32 w-4 h-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full animate-float-fast animate-delay-500"></div>
      <div className="absolute bottom-80 left-1/2 w-3 h-3 bg-gradient-to-br from-cyan-500/15 to-purple-500/15 rounded-full animate-float-slow animate-delay-700"></div>
      
      {/* Center area floating elements */}
      <div className="absolute top-1/2 left-16 w-5 h-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full animate-float-medium animate-delay-200"></div>
      <div className="absolute top-1/2 right-20 w-4 h-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full animate-float-fast animate-delay-400"></div>
      
      {/* Subtle background patterns */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
    </div>
  );
};

export default FloatingElements;
