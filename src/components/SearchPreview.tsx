
import { useState, useEffect, useMemo } from 'react';
import { Search, Sparkles, Zap, Globe, Brain } from 'lucide-react';

const SearchPreview = () => {
  const [searchText, setSearchText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);

  const demoQueries = useMemo(() => [
    'future of artificial intelligence',
    'sustainable energy solutions',
    'quantum computing breakthroughs',
    'space exploration missions',
    'revolutionary healthcare tech',
    'climate change innovations',
    'blockchain revolution',
    'autonomous vehicles'
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQueryIndex((prev) => (prev + 1) % demoQueries.length);
        setSearchText(demoQueries[currentQueryIndex]);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentQueryIndex, demoQueries]);

  // Set initial text
  useEffect(() => {
    setSearchText(demoQueries[0]);
  }, [demoQueries]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Enhanced search container */}
      <div className="glass-morphism rounded-3xl p-8 search-glow relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 rounded-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"></div>

        {/* Search interface */}
        <div className="relative z-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="relative">
                <Search className="h-8 w-8 text-blue-400 animate-pulse" />
                <Sparkles className="h-4 w-4 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              {/* Orbiting particles */}
              <div className="absolute inset-0 w-8 h-8">
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-float-fast"></div>
                <div className="absolute bottom-0 right-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-float-medium"></div>
                <div className="absolute top-1/2 left-0 w-1 h-1 bg-purple-400 rounded-full animate-float-slow"></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="text-2xl md:text-3xl font-light text-white/90 min-h-[3rem] flex items-center">
                <span className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-2 scale-95' : 'opacity-100 transform translate-y-0 scale-100'}`}>
                  {searchText || 'Type your search...'}
                </span>
                <span className="ml-2 w-0.5 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 animate-pulse"></span>
              </div>
            </div>
          </div>

          {/* Enhanced animated results preview */}
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-enhanced-pulse" style={{animationDelay: `${i * 200}ms`}}></div>
                <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded flex-1 animate-pulse" style={{animationDelay: `${i * 200}ms`}}></div>
                <div className="w-16 h-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded animate-pulse" style={{animationDelay: `${i * 300}ms`}}></div>
              </div>
            ))}
          </div>

          {/* Feature highlights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
              <Brain className="h-5 w-5 text-blue-400" />
              <span className="text-white/80 text-sm">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
              <Zap className="h-5 w-5 text-cyan-400" />
              <span className="text-white/80 text-sm">Lightning Fast</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
              <Globe className="h-5 w-5 text-purple-400" />
              <span className="text-white/80 text-sm">Global Context</span>
            </div>
          </div>
        </div>

        {/* Floating elements around search */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/30 rounded-full animate-float-fast"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400/30 rounded-full animate-float-medium"></div>
        <div className="absolute top-1/2 right-8 w-1 h-1 bg-purple-400/40 rounded-full animate-float-slow"></div>
      </div>

      {/* Enhanced subtitle */}
      <div className="text-center mt-8">
        <p className="text-white/70 text-lg mb-2">
          AI-powered search that thinks ahead
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchPreview;
