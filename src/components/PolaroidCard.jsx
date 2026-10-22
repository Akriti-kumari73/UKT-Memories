import { LavenderSprig } from "./Icons";

const PolaroidCard = ({
  image = "/photos/hero-2.jpg",
  text = "Just being you. ♡",
  showSprig = true,
}) => {
  return (
    <div className="relative group">
      {/* Soft atmospheric purple glow behind */}
      <div className="absolute -inset-4 rounded-3xl bg-violet-500/15 blur-2xl transition duration-500 group-hover:bg-violet-400/25" />

      {/* Main Polaroid Frame */}
      <div
        className="relative w-[240px] sm:w-[270px] md:w-[310px] lg:w-[330px] bg-[#f7f3ec] p-3.5 pb-14 rounded-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.65)] rotate-[5deg] transition-all duration-500 group-hover:rotate-[2deg] group-hover:scale-[1.02] border border-[#e8e0d4]"
      >
        {/* Semi-transparent Masking / Washi Tape on top */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#dfd6c4]/80 backdrop-blur-sm -rotate-[2deg] shadow-sm border-t border-b border-black/5" />

        {/* Photo Container */}
        <div className="overflow-hidden bg-[#1e1c24] aspect-[4/5] rounded-[1px]">
          <img
            src={image}
            alt="UKT Polaroid Memory"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Handwritten Cursive Caption at bottom */}
        <p className="absolute bottom-3 left-0 right-0 text-center font-script text-2xl text-[#2a2438] tracking-wide select-none">
          {text}
        </p>

        {/* Illustrated Lavender Flower Sprig overlapping bottom-left */}
        {showSprig && (
          <div className="absolute -bottom-6 -left-7 z-30 pointer-events-none drop-shadow-md -rotate-[12deg]">
            <LavenderSprig className="w-16 h-28 opacity-95" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PolaroidCard;