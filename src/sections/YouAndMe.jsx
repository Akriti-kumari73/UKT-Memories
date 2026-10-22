import { useState, useEffect } from "react";
import { getPhotos, likePhoto } from "../services/api";

const friendshipMessages = [
  {
    title: "Side by Side",
    message: "Walking through life together, making every ordinary moment memorable.",
    emoji: "🤝",
  },
  {
    title: "Unbreakable Bond",
    message: "Miles apart or side by side, our connection stays eternal and deep.",
    emoji: "💫",
  },
  {
    title: "Golden Conversations",
    message: "Late night talks, silly gossip, and endless laughter till 3 AM.",
    emoji: "✨",
  },
  {
    title: "Soul Sisters",
    message: "Connected not by blood, but by heart, soul, and shared dreams.",
    emoji: "👯",
  },
  {
    title: "Safe Haven",
    message: "The one person I can always be 100% authentically myself with.",
    emoji: "🌸",
  },
  {
    title: "Partners in Crime",
    message: "Every wild idea and spontaneous adventure started with us two.",
    emoji: "🥂",
  },
  {
    title: "Forever Cheering",
    message: "Always your loudest cheerleader and biggest supporter in everything.",
    emoji: "🎉",
  },
  {
    title: "Grateful Every Day",
    message: "Thank you for being my rock, my secret-keeper, and my best friend.",
    emoji: "🙏",
  },
  {
    title: "Timeless Memories",
    message: "Years may change, but the feeling of our friendship stays timeless.",
    emoji: "💕",
  },
  {
    title: "Pure Joy",
    message: "No filters, no judgments, just genuine smiles and happy hearts.",
    emoji: "💖",
  },
];

const friendshipQuotes = [
  {
    quote: "A true friend is someone who reaches for your hand and touches your heart.",
    author: "Gabriel García Márquez",
  },
  {
    quote: "Friendship isn't about whom you have known the longest. It's about who came and never left.",
    author: "Unknown",
  },
  {
    quote: "Some people arrive and make such a beautiful impact on your life, you can barely remember life without them.",
    author: "Anna Taylor",
  },
  {
    quote: "Walking with a friend in the dark is better than walking alone in the light.",
    author: "Helen Keller",
  },
];

const YouAndMe = () => {
  const [togetherPhotos, setTogetherPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    getPhotos("together").then((data) => {
      if (data && data.length > 0) {
        setTogetherPhotos(data);
      }
    });

    const quoteTimer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % friendshipQuotes.length);
    }, 6000);

    return () => clearInterval(quoteTimer);
  }, []);

  const handleLike = async (e, photoId) => {
    e.stopPropagation();
    const res = await likePhoto(photoId);
    if (res && res.success) {
      setTogetherPhotos((prev) =>
        prev.map((p) => (p.id === photoId ? { ...p, likes: res.likes } : p))
      );
    }
  };

  // Subtle organic tilt rotations for scrapbook aesthetic
  const getTilt = (index) => {
    const tilts = ["-rotate-1", "rotate-2", "-rotate-2", "rotate-1", "-rotate-1.5", "rotate-1.5"];
    return tilts[index % tilts.length];
  };

  return (
    <section
      id="us"
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#08090d] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-rose-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-10 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-violet-300 font-light animate-pulse">
            ✦ Chapter 02 ✦
          </p>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white">
            You <span className="font-script text-violet-300 mx-2">&</span> Me.
          </h2>

          <div className="flex justify-center items-center gap-3 mt-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-400/40" />
            <span className="text-rose-300 text-lg">♡</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-400/40" />
          </div>

          <p className="mt-4 text-white/60 text-sm sm:text-base font-light leading-relaxed">
            Side by side, through every chapter, inside joke, and sweet memory.
          </p>
        </div>

        {/* ================= ELEGANT POLAROID SCRAPBOOK GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-start">
          {togetherPhotos.map((photo, index) => {
            const message = friendshipMessages[index % friendshipMessages.length];
            const tilt = getTilt(index);

            return (
              <div
                key={photo.id || index}
                onClick={() => setSelectedPhoto({ ...photo, message })}
                className={`group relative bg-[#f4eee6] p-3 pb-8 rounded-lg shadow-xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-20 hover:rotate-0 ${tilt}`}
              >
                {/* Washi Tape Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#dfd6c4]/85 backdrop-blur-sm -rotate-2 shadow-sm border-t border-b border-black/5 z-10" />

                {/* Photo Frame */}
                <div className="relative aspect-[4/5] overflow-hidden rounded bg-[#1e1c24]">
                  <img
                    src={photo.src}
                    alt={photo.title || "Together Memory"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Gradient shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                  {/* Heart Like Button */}
                  <button
                    onClick={(e) => handleLike(e, photo.id)}
                    className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-xs text-white flex items-center gap-1 hover:bg-rose-600/50 transition shadow-md"
                  >
                    <span className="text-rose-400 text-xs">♥</span>
                    <span className="text-[11px] font-light">{photo.likes || 0}</span>
                  </button>
                </div>

                {/* Polaroid Caption */}
                <div className="mt-3 px-1 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-sm">{message.emoji}</span>
                    <h4 className="font-script text-xl sm:text-2xl text-[#2a2438] tracking-wide">
                      {photo.title || message.title}
                    </h4>
                  </div>
                  <p className="mt-1 text-[#625970] text-xs font-light line-clamp-1 italic">
                    {photo.caption || message.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= FRIENDSHIP QUOTE BANNER ================= */}
        <div className="mt-20 max-w-3xl mx-auto rounded-3xl bg-[#0e0f18]/80 border border-white/10 p-8 sm:p-10 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl" />

          <span className="text-3xl text-violet-300/60 block mb-2 font-serif">
            “
          </span>
          <p className="font-serif text-lg sm:text-2xl text-white font-light italic leading-relaxed transition-all duration-700">
            {friendshipQuotes[currentQuoteIndex].quote}
          </p>
          <span className="mt-3 block text-xs tracking-[0.25em] text-violet-300 uppercase font-light">
            — {friendshipQuotes[currentQuoteIndex].author}
          </span>
        </div>
      </div>

      {/* ================= TOGETHER MEMORY DETAIL MODAL ================= */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#11121d] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition"
            >
              ✕
            </button>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-h-[55vh] w-auto max-w-full rounded-2xl object-contain border border-white/10 shadow-lg"
            />

            <div className="mt-5">
              <span className="text-3xl block mb-2">
                {selectedPhoto.message?.emoji || "💕"}
              </span>
              <h3 className="font-serif text-2xl text-white">
                {selectedPhoto.title}
              </h3>
              <p className="mt-2 text-white/70 text-sm sm:text-base font-light max-w-md mx-auto leading-relaxed">
                "{selectedPhoto.message?.message || selectedPhoto.caption}"
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={(e) => handleLike(e, selectedPhoto.id)}
                className="px-5 py-2 rounded-full bg-violet-600/30 hover:bg-violet-600/50 border border-violet-400/40 text-white text-sm flex items-center gap-2 transition"
              >
                <span className="text-rose-400">♥</span>
                <span>{selectedPhoto.likes || 0} Hearts</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default YouAndMe;