
import { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';

const SearchPreview = () => {
  const [searchText, setSearchText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const demoQueries = [
    'future of artificial intelligence',
    'sustainable energy solutions',
    'quantum computing breakthroughs',
    'space exploration missions',
    'revolutionary healthcare tech'
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setSearchText(demoQueries[currentIndex]);
        setIsAnimating(false);
        currentIndex = (currentIndex + 1) % demoQueries.length;
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-morphism rounded-3xl p-8 search-glow animate-pulse-glow">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-8 w-8 text-blue-400 animate-pulse" />
            <Sparkles className="h-4 w-4 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-light text-white/90 min-h-[3rem] flex items-center">
              <span className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100'}`}>
                {searchText || 'Type your search...'}
              </span>
              <span className="ml-2 w-0.5 h-8 bg-blue-400 animate-pulse"></span>
            </div>
          </div>
        </div>
        
        {/* Animated Results Preview */}
        <div className="mt-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 opacity-50">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: `${i * 200}ms`}}></div>
              <div className="h-4 bg-white/10 rounded flex-1 animate-pulse" style={{animationDelay: `${i * 200}ms`}}></div>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-center text-white/60 mt-6 text-lg">
        AI-powered search that thinks ahead
      </p>
    </div>
  );
};

export default SearchPreview;
