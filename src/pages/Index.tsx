
import { useState, useEffect } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import SearchPreview from '@/components/SearchPreview';
import WaitlistSignup from '@/components/WaitlistSignup';
import SocialShare from '@/components/SocialShare';
import FloatingElements from '@/components/FloatingElements';
import Earth3D from '@/components/Earth3D';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Earth3D />
      <FloatingElements />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <h1 className="text-7xl md:text-9xl font-black gradient-text mb-6 tracking-tight">
            /GRAHMOS
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            The future of search is here. Experience lightning-fast, AI-powered search that understands context like never before.
          </p>
        </div>

        {/* Search Preview */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <SearchPreview />
        </div>

        {/* Countdown Timer */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <CountdownTimer />
        </div>

        {/* Waitlist Signup */}
        <div className={`mb-12 transition-all duration-1000 delay-700 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <WaitlistSignup />
        </div>

        {/* Social Share */}
        <div className={`transition-all duration-1000 delay-900 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <SocialShare />
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-10">
        <p className="text-white/40 text-sm">
          Built for the future. Launching soon.
        </p>
      </div>
    </div>
  );
};

export default Index;
