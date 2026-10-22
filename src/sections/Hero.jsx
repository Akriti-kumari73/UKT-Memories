import { useState } from "react";
import PolaroidCard from "../components/PolaroidCard";

const Hero = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 15;
    const y = (clientY / window.innerHeight - 0.5) * 15;
    setMouse({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#08090d]"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        <img
          src="/photos/hero-1.jpg"
          alt="UKT Sunset Shore"
          className="w-full h-full object-cover object-[center_35%] filter brightness-95 contrast-105 scale-105 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mouse.x * -0.5}px, ${mouse.y * -0.5}px) scale(1.04)`,
          }}
        />

        {/* Cinematic atmospheric overlays */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40" />

        {/* Ambient violet glow following cursor softly */}
        <div
          className="absolute w-[650px] h-[650px] rounded-full bg-violet-600/15 blur-[160px] pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: `${50 + mouse.x * 0.4}%`,
            top: `${50 + mouse.y * 0.4}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* ================= FLOATING SPARKLES (Top Left) ================= */}
      <div className="absolute left-[8%] sm:left-[12%] top-[14%] sm:top-[16%] z-10 pointer-events-none select-none">
        <span className="text-violet-200/80 text-2xl sm:text-3xl animate-pulse block drop-shadow-[0_0_10px_rgba(196,181,253,0.8)]">
          ✧
        </span>
        <span className="text-violet-300/70 text-lg sm:text-xl ml-8 -mt-2 animate-pulse block drop-shadow-[0_0_8px_rgba(196,181,253,0.8)]">
          ✦
        </span>
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-24 pb-16 sm:py-24 flex flex-col lg:flex-row items-center justify-between min-h-screen">
        
        {/* Left Spacer so the girl standing on rocks in the background is clearly visible */}
        <div className="hidden lg:block lg:w-[24%] min-h-[400px]" />

        {/* Center Content Block (Exactly matching photo) */}
        <div
          className="flex-1 flex flex-col items-center text-center max-w-2xl mx-auto px-2 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mouse.x * 0.6}px, ${mouse.y * 0.6}px)`,
          }}
        >
          {/* Main UKT Heading with Heart */}
          <div className="relative inline-flex items-center justify-center">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] font-light leading-none tracking-tight text-white drop-shadow-[0_12px_45px_rgba(0,0,0,0.9)]">
              UKT
            </h1>
            <span className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-violet-300 ml-1.5 sm:ml-2 -mt-2 sm:-mt-6 drop-shadow-[0_0_25px_rgba(196,181,253,0.9)] select-none">
              ♡
            </span>
          </div>

          {/* Cursive Subtitle in soft lilac */}
          <p className="font-script text-xl sm:text-2xl md:text-3xl lg:text-4xl text-violet-200/90 mt-1 sm:-mt-2 md:-mt-4 tracking-wide drop-shadow-md">
            memories <span className="text-violet-300/80 mx-1 sm:mx-1.5">•</span> moments{" "}
            <span className="text-violet-300/80 mx-1 sm:mx-1.5">•</span> us
          </p>

          {/* Emotional Quote */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-lg drop-shadow-lg">
            Some people come into our lives
            <br />
            and stay in our hearts forever.
          </p>

          {/* Divider: ─── ♡ ─── */}
          <div className="mt-6 flex items-center justify-center gap-3.5 select-none">
            <span className="h-[1px] w-12 sm:w-16 bg-white/40" />
            <span className="text-violet-300 text-xl drop-shadow">♡</span>
            <span className="h-[1px] w-12 sm:w-16 bg-white/40" />
          </div>

          {/* Explore Memories Button (Glass Pill with glow) */}
          <a
            href="#about"
            className="group mt-8 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm sm:text-base font-normal text-white bg-violet-600/35 border border-violet-300/40 backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:bg-violet-600/50 hover:border-violet-200 hover:shadow-[0_0_40px_rgba(167,139,250,0.6)] hover:scale-105 transition-all duration-300"
          >
            <span>Explore Memories</span>
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>

        {/* Right Side: Tilted Polaroid with washi tape & lavender sprig */}
        <div
          className="mt-12 lg:mt-0 flex justify-center lg:justify-end lg:w-[32%] transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mouse.x * -0.8}px, ${mouse.y * -0.8}px)`,
          }}
        >
          <PolaroidCard
            image="/photos/hero-2.jpg"
            text="Just being you. ♡"
            showSprig={true}
          />
        </div>
      </div>

      {/* ================= BOTTOM CENTER CHEVRON ================= */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/70 hover:text-white transition duration-300 animate-bounce text-2xl select-none"
      >
        ⌄
      </a>
    </section>
  );
};

export default Hero;