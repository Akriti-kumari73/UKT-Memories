import { useState } from "react";
import { MemoriesIcon, TogetherIcon, GroupIcon, ReliveIcon } from "../components/Icons";
import { likeMemory } from "../services/api";

const Intro = () => {
  const [showSurprise, setShowSurprise] = useState(false);

  const featureCards = [
    {
      id: 1,
      title: "Memories",
      desc: "Little moments that matter",
      icon: <MemoriesIcon className="w-8 h-8 text-violet-300" />,
      href: "#memories",
    },
    {
      id: 2,
      title: "Together",
      desc: "You, me and our stories",
      icon: <TogetherIcon className="w-8 h-8 text-violet-300" />,
      href: "#us",
    },
    {
      id: 3,
      title: "Our People",
      desc: "The chaos we love",
      icon: <GroupIcon className="w-8 h-8 text-violet-300" />,
      href: "#group",
    },
    {
      id: 4,
      title: "Relive",
      desc: "Videos that take us back",
      icon: <ReliveIcon className="w-8 h-8 text-violet-300" />,
      href: "#video",
    },
  ];

  const handleCardClick = (id) => {
    likeMemory(id);
  };

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#08090d] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 flex flex-col items-start">
            
            {/* Cursive Greeting with Heart */}
            <div className="flex items-center gap-2">
              <span className="font-script text-2xl sm:text-3xl text-violet-300">
                Hey UKT,
              </span>
              <span className="font-script text-2xl sm:text-3xl text-violet-300">
                ♡
              </span>
            </div>

            {/* Headline: You are rare. */}
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              You are{" "}
              <span className="text-violet-300 drop-shadow-[0_0_20px_rgba(167,139,250,0.4)]">
                rare.
              </span>
            </h2>

            {/* Descriptive Paragraph */}
            <p className="mt-6 text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-md">
              This little space is full of memories, laughs, stupid moments and
              the best conversations.
            </p>

            {/* Thank you note */}
            <p className="mt-5 text-violet-200/90 text-base sm:text-lg font-light">
              Thank you for being you.
            </p>

            {/* Hand-drawn heart outline */}
            <button
              onClick={() => setShowSurprise(true)}
              title="Click for a little secret note!"
              className="mt-4 font-script text-3xl text-violet-300/80 hover:text-violet-200 hover:scale-125 transition-transform duration-300 cursor-pointer select-none"
            >
              ♡
            </button>
          </div>

          {/* ================= RIGHT COLUMN (4-Card Container) ================= */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-[#0d0e15]/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 md:gap-6">
                {featureCards.map((card) => (
                  <a
                    key={card.id}
                    href={card.href}
                    onClick={() => handleCardClick(card.id)}
                    className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1"
                  >
                    {/* Icon Circle */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-violet-500/10 border border-violet-400/20 group-hover:border-violet-300 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300 shadow-md">
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-sm sm:text-base font-medium text-white group-hover:text-violet-200 transition">
                      {card.title}
                    </h3>

                    {/* Subtitle / Description */}
                    <p className="mt-2 text-xs text-white/50 leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECRET SURPRISE NOTE MODAL ================= */}
      {showSurprise && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setShowSurprise(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#12131d] border border-violet-400/30 rounded-3xl p-8 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSurprise(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-lg w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
            >
              ✕
            </button>

            <span className="text-4xl animate-bounce inline-block">💖</span>

            <h4 className="font-serif text-2xl text-white mt-4">
              A Little Note For You ✨
            </h4>

            <div className="w-12 h-px bg-violet-400/40 mx-auto my-4" />

            <p className="text-white/80 text-sm leading-relaxed font-light">
              "Kuch log aise hote hain jinse baat karke din ka saara stress gayab
              ho jata hai. You are definitely that person. Keep smiling hamesha!"
            </p>

            <p className="font-script text-2xl text-violet-300 mt-6">
              Stay Rare. ♡
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Intro;