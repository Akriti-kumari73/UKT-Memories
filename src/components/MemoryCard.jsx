const MemoryCard = ({ icon, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-violet-300/20 bg-white/[0.03] p-7 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-violet-300/50 hover:bg-violet-400/[0.06] hover:shadow-[0_15px_40px_rgba(139,92,246,0.15)]">

      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-400/10 blur-2xl transition-all duration-500 group-hover:bg-violet-400/25" />

      {/* Icon */}
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-violet-300/30 bg-violet-400/[0.08] text-3xl text-violet-300 transition duration-500 group-hover:scale-110 group-hover:bg-violet-400/15">
        {icon}
      </div>

      {/* Title */}
      <h3 className="relative mt-5 text-lg font-medium text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="relative mx-auto mt-3 max-w-[170px] text-sm leading-6 text-white/50">
        {description}
      </p>

      {/* Bottom line */}
      <div className="mx-auto mt-5 h-px w-8 bg-violet-300/50 transition-all duration-500 group-hover:w-16" />

    </div>
  );
};

export default MemoryCard;