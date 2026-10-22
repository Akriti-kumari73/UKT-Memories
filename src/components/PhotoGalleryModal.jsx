import { useState, useEffect, useCallback } from "react";
import { getPhotos, likePhoto } from "../services/api";

const PhotoGalleryModal = ({ isOpen, onClose, initialCategory = "all" }) => {
  const [photos, setPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Load photos when modal opens
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";
    let isMounted = true;
    getPhotos("all").then((data) => {
      if (isMounted) {
        setPhotos(data);
      }
    });

    return () => {
      isMounted = false;
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredPhotos =
    activeTab === "all"
      ? photos
      : photos.filter((p) => p.category?.toLowerCase() === activeTab.toLowerCase());

  const activePhoto =
    activePhotoIndex !== null && filteredPhotos[activePhotoIndex]
      ? filteredPhotos[activePhotoIndex]
      : null;

  const handleNextPhoto = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    setActivePhotoIndex((prev) => ((prev ?? 0) + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    setActivePhotoIndex((prev) =>
      ((prev ?? 0) - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  }, [filteredPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (activePhotoIndex !== null) {
          setActivePhotoIndex(null);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowRight" && activePhotoIndex !== null) {
        handleNextPhoto();
      } else if (e.key === "ArrowLeft" && activePhotoIndex !== null) {
        handlePrevPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activePhotoIndex, handleNextPhoto, handlePrevPhoto, onClose]);

  if (!isOpen) return null;

  const handleLike = async (e, photoId) => {
    e.stopPropagation();
    const res = await likePhoto(photoId);
    if (res && res.success) {
      setPhotos((prev) =>
        prev.map((p) => (p.id === photoId ? { ...p, likes: res.likes } : p))
      );
    }
  };

  const categories = [
    { id: "all", label: "All Moments", count: photos.length },
    {
      id: "ukt",
      label: "Just UKT",
      count: photos.filter((p) => p.category?.toLowerCase() === "ukt").length,
    },
    {
      id: "together",
      label: "Together",
      count: photos.filter((p) => p.category?.toLowerCase() === "together").length,
    },
    {
      id: "group",
      label: "Our People",
      count: photos.filter((p) => p.category?.toLowerCase() === "group").length,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl max-h-[92vh] bg-[#0b0c13] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= MODAL HEADER ================= */}
        <div className="p-5 sm:p-7 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#0e0f18]/90 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                UKT Memories Gallery
              </h3>
              <span className="font-script text-3xl text-violet-300">♡</span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 mt-1 font-light">
              Browsing {filteredPhotos.length} treasured photos & candid memories
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white flex items-center justify-center transition duration-300 hover:rotate-90"
          >
            ✕
          </button>
        </div>

        {/* ================= CATEGORY FILTER TABS ================= */}
        <div className="px-5 sm:px-8 py-3.5 border-b border-white/5 flex gap-2 sm:gap-3 overflow-x-auto scrollbar-none bg-[#08090f]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setActivePhotoIndex(null);
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === cat.id
                  ? "bg-violet-600/40 text-violet-100 border border-violet-400/50 shadow-[0_0_20px_rgba(167,139,250,0.35)]"
                  : "text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-transparent"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === cat.id
                    ? "bg-violet-500/40 text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* ================= PHOTO GRID ================= */}
        <div className="p-4 sm:p-7 overflow-y-auto flex-1 scrollbar-thin">
          {filteredPhotos.length === 0 ? (
            <div className="py-24 text-center text-white/40">
              No photos found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#12131d] cursor-pointer aspect-[3/4] shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-violet-400/50 hover:shadow-[0_10px_30px_rgba(139,92,246,0.25)]"
                >
                  <img
                    src={photo.src}
                    alt={photo.title || "UKT Memory"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                  {/* Category Pill Tag */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white/75 uppercase tracking-wider font-light opacity-0 group-hover:opacity-100 transition duration-300">
                    {photo.category}
                  </span>

                  {/* Like Button */}
                  <button
                    onClick={(e) => handleLike(e, photo.id)}
                    aria-label="Like photo"
                    title="Like this photo"
                    className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/90 flex items-center gap-1 hover:bg-rose-600/40 transition"
                  >
                    <span className="text-rose-400 text-xs">♥</span>
                    <span className="text-[11px] font-light">
                      {photo.likes || 0}
                    </span>
                  </button>

                  {/* Bottom Title & Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                    <h4 className="font-serif text-white text-sm leading-tight truncate">
                      {photo.title}
                    </h4>
                    {photo.caption && (
                      <p className="text-white/60 text-[11px] mt-0.5 line-clamp-1 font-light">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= FULLSCREEN LIGHTBOX PREVIEW ================= */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-3xl animate-fadeIn"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close Lightbox */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white/70 hover:text-white text-2xl w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition z-50 cursor-pointer"
          >
            ✕
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPhoto();
            }}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-6 text-white/70 hover:text-white text-2xl sm:text-3xl w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition z-50 cursor-pointer"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextPhoto();
            }}
            aria-label="Next photo"
            className="absolute right-3 sm:right-6 text-white/70 hover:text-white text-2xl sm:text-3xl w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition z-50 cursor-pointer"
          >
            ›
          </button>

          {/* Image & Card */}
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between w-full px-4 text-white gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal">
                    {activePhoto.title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-400/30 uppercase tracking-wider font-light">
                    {activePhoto.category}
                  </span>
                </div>
                {activePhoto.caption && (
                  <p className="text-sm text-white/60 mt-0.5 font-light">
                    {activePhoto.caption}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40 font-light">
                  {(activePhotoIndex ?? 0) + 1} of {filteredPhotos.length}
                </span>

                <button
                  onClick={(e) => handleLike(e, activePhoto.id)}
                  className="px-4 py-2 rounded-full bg-violet-600/30 hover:bg-violet-600/50 border border-violet-400/40 flex items-center gap-2 text-sm transition shadow-lg cursor-pointer"
                >
                  <span className="text-rose-400 text-base">♥</span>
                  <span>{activePhoto.likes || 0} Hearts</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryModal;
