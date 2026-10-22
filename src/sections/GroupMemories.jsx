import { useState, useEffect } from "react";
import { getPhotos, likePhoto } from "../services/api";

const groupTags = [
  "The Core Squad",
  "Chaos & Laughter",
  "Café Hangouts",
  "Campus Diaries",
  "Road Trips",
  "Inside Jokes",
  "Foodie Gang",
  "Late Night Talks",
  "Festival Fever",
  "Forever Family",
];

const GroupMemories = () => {
  const [groupPhotos, setGroupPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    getPhotos("group").then((data) => {
      if (data && data.length > 0) {
        setGroupPhotos(data);
      }
    });
  }, []);

  const handleLike = async (e, photoId) => {
    e.stopPropagation();
    const res = await likePhoto(photoId);
    if (res && res.success) {
      setGroupPhotos((prev) =>
        prev.map((p) => (p.id === photoId ? { ...p, likes: res.likes } : p))
      );
    }
  };

  return (
    <section
      id="group"
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#08090d] overflow-hidden"
    >
      {/* Background ambient gradient glow */}
      <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-10 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-violet-300 font-light animate-pulse">
            ✦ Chapter 03 ✦
          </p>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white">
            The Chaos <span className="font-serif text-violet-300">We Call Us.</span>
          </h2>

          <div className="flex justify-center items-center gap-3 mt-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-400/40" />
            <span className="text-violet-300 text-lg">♡</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-400/40" />
          </div>

          <p className="mt-4 text-white/60 text-sm sm:text-base font-light leading-relaxed">
            Good people, spontaneous plans, endless madness, and memories that
            somehow become the best ones.
          </p>
        </div>

        {/* ================= SQUAD HIGHLIGHT CENTERPIECE ================= */}
        {groupPhotos.length > 0 && (
          <div
            onClick={() => setSelectedPhoto(groupPhotos[0])}
            className="group relative rounded-3xl overflow-hidden border border-white/15 bg-[#12131e] cursor-pointer shadow-2xl mb-12 max-w-5xl mx-auto aspect-[16/9] sm:aspect-[21/9] transition-all duration-500 hover:border-violet-400/50 hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)]"
          >
            <img
              src={groupPhotos[0].src}
              alt={groupPhotos[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Tag badge */}
            <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-violet-600/40 border border-violet-400/40 text-xs text-white backdrop-blur-md">
              👑 Featured Squad Memory
            </span>

            {/* Heart button */}
            <button
              onClick={(e) => handleLike(e, groupPhotos[0].id)}
              className="absolute top-5 right-5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white flex items-center gap-1.5 hover:bg-rose-600/50 transition"
            >
              <span className="text-rose-400">♥</span>
              <span>{groupPhotos[0].likes || 0}</span>
            </button>

            {/* Bottom Caption */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-serif text-2xl sm:text-4xl text-white">
                {groupPhotos[0].title}
              </h3>
              <p className="mt-2 text-white/70 text-xs sm:text-sm font-light max-w-lg line-clamp-2">
                {groupPhotos[0].caption}
              </p>
            </div>
          </div>
        )}

        {/* ================= DYNAMIC SQUAD GALLERY GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {groupPhotos.slice(1).map((photo, index) => {
            const tag = groupTags[index % groupTags.length];

            return (
              <div
                key={photo.id || index}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0f1019] cursor-pointer shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-[0_15px_40px_rgba(139,92,246,0.2)] aspect-[4/5]"
              >
                <img
                  src={photo.src}
                  alt={photo.title || "Group Memory"}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Gradient shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-60 group-hover:opacity-90 transition duration-300" />

                {/* Vibe tag */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white/80 font-light border border-white/10 opacity-0 group-hover:opacity-100 transition duration-300">
                  {tag}
                </span>

                {/* Heart like button */}
                <button
                  onClick={(e) => handleLike(e, photo.id)}
                  aria-label="Like photo"
                  className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white flex items-center gap-1 hover:bg-rose-600/40 transition"
                >
                  <span className="text-rose-400 text-xs">♥</span>
                  <span className="text-[11px] font-light">{photo.likes || 0}</span>
                </button>

                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition duration-300">
                  <h4 className="font-serif text-white text-sm sm:text-base font-normal truncate group-hover:text-violet-200 transition">
                    {photo.title}
                  </h4>
                  {photo.caption && (
                    <p className="mt-1 text-white/50 text-xs font-light line-clamp-1">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= LIGHTBOX PREVIEW MODAL ================= */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition"
            >
              ✕
            </button>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain border border-white/15 shadow-2xl"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between w-full px-2 text-white gap-3">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-white/60 font-light mt-0.5">
                  {selectedPhoto.caption}
                </p>
              </div>

              <button
                onClick={(e) => handleLike(e, selectedPhoto.id)}
                className="px-4 py-2 rounded-full bg-violet-600/30 hover:bg-violet-600/50 border border-violet-400/40 text-sm flex items-center gap-2 transition"
              >
                <span className="text-rose-400 text-base">♥</span>
                <span>{selectedPhoto.likes || 0} Hearts</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GroupMemories;