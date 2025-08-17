
import { useState, useEffect } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import SearchPreview from '@/components/SearchPreview';
import EnhancedLogin from '@/components/EnhancedLogin';
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
        
        {/* Enhanced Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          {/* Glowing background circle for the title */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
            <h1 className="relative text-7xl md:text-9xl font-black star-trek-header mb-6 tracking-tight">
              /GRAHMOS
            </h1>
          </div>
          
          {/* Enhanced subtitle with gradient text */}
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed mb-4">
              The future of search is here.
            </p>
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
              Experience lightning-fast, AI-powered search that understands context like never before.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center space-x-2 text-blue-400/80">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-cyan-400/80">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400/80">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Context Aware</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Preview */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="relative">
            {/* Glow effect behind search */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl scale-110"></div>
            <SearchPreview />
          </div>
        </div>

        {/* Enhanced Countdown Timer */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-2xl blur-xl scale-110"></div>
            <CountdownTimer />
          </div>
        </div>

        {/* Enhanced Waitlist Signup */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl blur-xl scale-110"></div>
            <EnhancedLogin />
          </div>
        </div>

        {/* Enhanced Social Share */}
        <div className={`transition-all duration-1000 delay-900 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-green-500/10 rounded-2xl blur-xl scale-110"></div>
            <SocialShare />
          </div>
        </div>

      </div>

      {/* Enhanced Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-10">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full blur-xl scale-150"></div>
          <p className="relative text-white/60 text-sm font-medium">
            Built for the future. Launching soon.
          </p>
          <div className="flex justify-center space-x-4 mt-3">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
