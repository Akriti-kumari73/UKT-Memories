import { useRef, useState } from "react";

const VideoSection = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="video" className="relative py-28 md:py-40 px-6 overflow-hidden bg-[#08090d]">
      {/* Background with warm glow effects */}
      <div className="absolute inset-0">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-rose-900/10" />
        
        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-rose-500/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/8 blur-[100px]" />
        
        {/* Floating sparkles */}
        <span className="absolute top-[10%] left-[5%] text-3xl text-violet-300/20 animate-pulse">✦</span>
        <span className="absolute top-[20%] right-[10%] text-2xl text-rose-300/20 animate-pulse" style={{ animationDelay: '1s' }}>✧</span>
        <span className="absolute bottom-[25%] left-[15%] text-4xl text-violet-300/15 animate-pulse" style={{ animationDelay: '2s' }}>♡</span>
        <span className="absolute bottom-[15%] right-[8%] text-3xl text-rose-300/20 animate-pulse" style={{ animationDelay: '0.5s' }}>✦</span>
        <span className="absolute top-[50%] left-[8%] text-2xl text-violet-300/15 animate-pulse" style={{ animationDelay: '1.5s' }}>♡</span>
        <span className="absolute top-[60%] right-[5%] text-2xl text-rose-300/15 animate-pulse" style={{ animationDelay: '2.5s' }}>✧</span>
        
        {/* Floating hearts */}
        <span className="absolute top-[30%] left-[20%] text-2xl text-rose-300/10 animate-bounce" style={{ animationDuration: '3s' }}>♡</span>
        <span className="absolute bottom-[35%] right-[20%] text-xl text-violet-300/10 animate-bounce" style={{ animationDuration: '4s' }}>♡</span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-violet-400/80 uppercase tracking-[0.3em] text-xs font-light">
            ✦ Chapter 04 ✦
          </p>

          <h2 className="font-serif text-5xl md:text-7xl mt-5">
            <span className="text-white">A Video</span>
            <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-violet-300 to-purple-300">
              Full of Us.
            </span>
          </h2>

          <div className="flex justify-center mt-4">
            <span className="text-rose-300/40 text-2xl animate-pulse">♡</span>
          </div>

          <p className="mt-5 text-white/50 text-sm md:text-base font-light tracking-wide">
            Press play. Relive it. <span className="text-rose-300/40">✨</span>
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl shadow-violet-500/10">
          {/* Video container with gradient border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 via-rose-500/20 to-violet-500/20 rounded-3xl blur-sm opacity-50" />
          
          <div className="relative rounded-3xl overflow-hidden">
            <video
              ref={videoRef}
              src="/videos/ukt-memory.mp4"
              className="w-full aspect-video object-cover"
              playsInline
              controls={playing}
              onEnded={() => setPlaying(false)}
            />

            {!playing && (
              <button
                onClick={toggleVideo}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                w-20 h-20 md:w-24 md:h-24 rounded-full
                bg-white/10 backdrop-blur-md border border-white/20
                text-white text-2xl
                hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-2xl
                flex items-center justify-center group"
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  ▶
                </span>
                <span className="absolute -inset-4 rounded-full bg-violet-500/20 animate-ping opacity-0 group-hover:opacity-100" />
              </button>
            )}
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-400/30" />
          <span className="text-rose-300/30 text-2xl animate-pulse">♡</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-400/30" />
        </div>
        <p className="text-center text-white/20 text-xs tracking-[0.2em] uppercase mt-3 font-light">
          Memories in motion
        </p>
      </div>
    </section>
  );
};

export default VideoSection;