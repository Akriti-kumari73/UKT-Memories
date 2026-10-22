const SectionTitle = ({ small, title, description, highlight }) => {
  // Split title into words for individual styling
  const words = title.split(' ');

  return (
    <div className="text-center mb-10 md:mb-12">
      {/* Chapter Badge with Glow Effect */}
      <div className="inline-block mb-3 relative">
        <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full opacity-50" />
        <span className="relative px-5 py-1.5 text-[10px] tracking-[0.4em] uppercase font-light text-violet-300/80 bg-violet-500/10 border border-violet-400/20 rounded-full backdrop-blur-sm inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-violet-400/60 rounded-full animate-pulse" />
          {small}
          <span className="w-1.5 h-1.5 bg-rose-400/60 rounded-full animate-pulse delay-500" />
        </span>
      </div>

      {/* Main Title with Gradient Highlight */}
      <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light mt-3 relative">
        {words.map((word, index) => {
          // Check if this word should be highlighted
          const isHighlighted = highlight && highlight.some(h => word === h);
          
          return (
            <span
              key={index}
              className={`relative inline-block ${
                isHighlighted
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300'
                  : 'text-white'
              } ${index > 0 ? 'ml-2 md:ml-3' : ''}`}
            >
              {word}
              {isHighlighted && (
                <>
                  {/* Underline glow */}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent" />
                  <span className="absolute -bottom-1 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-rose-400/30 to-transparent blur-sm" />
                  
                  {/* Subtle background glow */}
                  <span className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-violet-500/10 to-purple-500/5 blur-2xl -z-10" />
                </>
              )}
            </span>
          );
        })}
      </h2>

      {/* Decorative Divider with Diamond */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <span className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-violet-400/20" />
        <span className="text-violet-300/30 text-sm animate-pulse">✦</span>
        <span className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-violet-400/20" />
      </div>

      {/* Description */}
      {description && (
        <p className="text-white/50 text-sm md:text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed tracking-wide">
          <span className="text-violet-300/30">❝</span>
          {description}
          <span className="text-violet-300/30">❞</span>
        </p>
      )}
    </div>
  );
};

export default SectionTitle;