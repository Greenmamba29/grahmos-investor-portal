
const FloatingElements = () => {
  const elements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 6
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute rounded-full opacity-10 bg-gradient-to-br from-blue-400 to-cyan-500 animate-float"
          style={{
            width: `${el.size}px`,
            height: `${el.size}px`,
            left: `${el.left}%`,
            top: `${el.top}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`
          }}
        />
      ))}
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20" />
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-blue-900/10" />
    </div>
  );
};

export default FloatingElements;
