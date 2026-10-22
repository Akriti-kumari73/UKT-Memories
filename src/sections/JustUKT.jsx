import { useState, useEffect } from "react";
import PhotoGalleryModal from "../components/PhotoGalleryModal";
import { getPhotos, likePhoto } from "../services/api";

const JustUKT = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [uktPhotos, setUktPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    getPhotos("ukt").then((data) => {
      if (data && data.length > 0) {
        setUktPhotos(data);
      }
    });
  }, []);

  const openGallery = () => {
    setGalleryOpen(true);
  };

  const handleLike = async (e, photoId) => {
    e.stopPropagation();
    const res = await likePhoto(photoId);
    if (res && res.success) {
      setUktPhotos((prev) =>
        prev.map((p) => (p.id === photoId ? { ...p, likes: res.likes } : p))
      );
    }
  };

  // Top 4 showcase cards matching the reference photo
  const showcaseCards = [
    {
      id: "card-1",
      src: "/photos/ukt/ukt-2.jpg",
      alt: "Sunset Profile",
      zoom: "object-[center_28%]",
    },
    {
      id: "card-2",
      src: "/photos/hero-2.jpg",
      alt: "Laughing Candid",
      zoom: "object-[center_20%]",
    },
    {
      id: "card-3",
      src: "/photos/hero-1.jpg",
      alt: "Standing by Shore",
      zoom: "object-[left_center]",
    },
    {
      id: "card-4",
      src: "/photos/hero-1.jpg",
      alt: "More Moments",
      zoom: "object-center filter brightness-50 blur-[1px]",
      isOverlay: true,
      count: `+${Math.max(12, uktPhotos.length || 12)}`,
      label: "More Moments",
    },
  ];

  return (
    <section
      id="memories"
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#08090d] overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div className="absolute right-1/4 top-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ================= TOP SECTION (MATCHING PHOTO) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16">
          {/* Left Column: Heading & Button */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Just{" "}
              <span className="text-violet-300 drop-shadow-[0_0_20px_rgba(167,139,250,0.4)]">
                UKT.
              </span>
            </h2>

            {/* Subtle accent dots matching photo: .... */}
            <div className="flex gap-1.5 mt-3 select-none text-violet-400/60 tracking-[0.3em] text-sm">
              ••••
            </div>

            <p className="mt-4 text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-sm">
              Glimpses of you that I'll always treasure.
            </p>

            <button
              onClick={openGallery}
              className="group mt-8 inline-flex items-center gap-3 px-7 py-3 rounded-full text-sm font-medium text-white/90 bg-white/5 border border-white/15 hover:bg-violet-600/25 hover:border-violet-300/40 hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
            >
              <span>View All Photos</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </button>
          </div>

          {/* Right Column: 4 Tall Rounded Cards matching photo */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {showcaseCards.map((card) => (
                <div
                  key={card.id}
                  onClick={openGallery}
                  className="group relative aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#12131d] cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.03] hover:border-violet-400/40 hover:shadow-violet-500/20"
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 ${card.zoom}`}
                  />

                  {/* Dark gradient shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* +12 More Moments Overlay on Card 4 */}
                  {card.isOverlay ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition duration-300 group-hover:bg-black/30">
                      <span className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight drop-shadow-md">
                        {card.count}
                      </span>
                      <span className="mt-1 text-xs sm:text-sm text-violet-200/90 font-light tracking-wide text-center">
                        {card.label}
                      </span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-violet-500/10 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= LUXURY MASONRY SHOWCASE FOR JUST UKT ================= */}
        <div className="mt-20 pt-12 border-t border-white/5">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-violet-300 font-light">
                ✦ Solo Portraits ✦
              </p>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-white">
                Every Smile, A Timeless Story
              </h3>
            </div>
            <button
              onClick={openGallery}
              className="text-xs sm:text-sm text-violet-300/80 hover:text-violet-200 transition flex items-center gap-1.5"
            >
              <span>Explore full collection</span>
              <span>↗</span>
            </button>
          </div>

          {/* Elegant 4-Column Card Grid with hover tilt & details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {uktPhotos.slice(0, 8).map((photo, index) => (
              <div
                key={photo.id || index}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e0f18] cursor-pointer shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-[0_15px_40px_rgba(139,92,246,0.2)]"
              >
                {/* Photo container */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={photo.src}
                    alt={photo.title || "UKT"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition duration-300" />

                  {/* Heart button */}
                  <button
                    onClick={(e) => handleLike(e, photo.id)}
                    aria-label="Like photo"
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/90 flex items-center gap-1 hover:bg-rose-600/40 transition"
                  >
                    <span className="text-rose-400 text-xs">♥</span>
                    <span className="text-[11px] font-light">
                      {photo.likes || 0}
                    </span>
                  </button>
                </div>

                {/* Card footer caption */}
                <div className="p-4 bg-[#0d0e16]">
                  <h4 className="font-serif text-white text-sm sm:text-base truncate group-hover:text-violet-200 transition">
                    {photo.title}
                  </h4>
                  {photo.caption && (
                    <p className="mt-1 text-white/50 text-xs font-light line-clamp-1">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
            >
              ✕
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain border border-white/15 shadow-2xl"
            />
            <div className="mt-3 text-center text-white">
              <h3 className="font-serif text-xl">{selectedPhoto.title}</h3>
              <p className="text-sm text-white/60 font-light mt-0.5">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Full Photo Gallery Modal */}
      <PhotoGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialCategory="ukt"
      />
    </section>
  );
};

export default JustUKT;