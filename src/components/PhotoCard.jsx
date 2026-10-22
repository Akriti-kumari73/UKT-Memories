const PhotoCard = ({ photo, index = 0 }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-300/40 hover:shadow-[0_20px_50px_rgba(139,92,246,0.2)]"
      style={{
        transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})`,
      }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden">
        <img
          src={photo.src}
          alt={photo.title || "UKT memory"}
          className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-[340px]"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Heart */}
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-lg text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-400/30">
          ♡
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="font-script text-xl text-violet-200">
            {photo.title}
          </p>

          {photo.category && (
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
              {photo.category}
            </p>
          )}
        </div>
      </div>

      {/* Bottom glow */}
      <div className="h-1 w-0 bg-violet-400 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default PhotoCard;