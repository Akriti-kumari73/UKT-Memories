import { useState, useEffect } from "react";

const Navbar = ({
  musicOn,
  setMusicOn,
  activeSection = "home",
  onOpenGallery,
}) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Memories", href: "#memories" },
    { name: "Gallery", href: "#gallery", isGallery: true },
    { name: "Video", href: "#video" },
    { name: "Letters", href: "#letter" },
    { name: "Contact", href: "#wishes" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, link) => {
    if (link.isGallery && onOpenGallery) {
      e.preventDefault();
      onOpenGallery();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const triggerHeartBurst = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2,
      y: rect.top,
    };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 md:px-10 ${
          scrolled ? "py-2.5 sm:py-3.5" : "py-4 sm:py-6"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 flex items-center justify-between ${
            scrolled
              ? "max-w-5xl rounded-full bg-[#08090d]/40 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] px-5 py-2"
              : "max-w-7xl bg-transparent border-transparent px-2 py-1"
          }`}
        >
          {/* ================= LOGO ================= */}
          <a
            href="#home"
            className="group flex items-center gap-1.5 text-2xl md:text-3xl font-serif tracking-wider text-white transition duration-300 select-none"
          >
            <span className="font-light tracking-wide drop-shadow-sm">UKT</span>
            <span className="text-violet-300 font-script text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:text-violet-200 drop-shadow-[0_0_12px_rgba(196,181,253,0.6)]">
              ♡
            </span>
          </a>

          {/* ================= DESKTOP LINKS (TRANSPARENT & INTERACTIVE) ================= */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {links.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`text-xs lg:text-sm tracking-wide px-3.5 py-1.5 rounded-full transition-all duration-300 relative group cursor-pointer ${
                    isActive
                      ? "text-white font-medium bg-white/[0.08] shadow-[0_0_15px_rgba(167,139,250,0.15)]"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>

                  {/* Active bottom accent bar matching reference photo */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-gradient-to-r from-violet-400 via-rose-300 to-violet-400 rounded-full drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ================= RIGHT CONTROLS ================= */}
          <div className="flex items-center gap-2.5">
            {/* Quick Heart Reaction Button */}
            <button
              onClick={triggerHeartBurst}
              title="Send a heart to UKT ♡"
              aria-label="Send love"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/30 text-rose-300 transition-all duration-300 hover:scale-110 shadow-sm"
            >
              <span className="text-sm">♥</span>
            </button>

            {/* Interactive Music Player Button with Equalizer */}
            <button
              onClick={() => setMusicOn(!musicOn)}
              aria-label="Toggle background music"
              title={
                musicOn
                  ? "Playing background music (Click to pause)"
                  : "Play background music"
              }
              className={`h-9 sm:h-10 px-3 rounded-full flex items-center gap-2 transition-all duration-300 border shadow-lg cursor-pointer ${
                musicOn
                  ? "bg-violet-600/70 border-violet-400/50 text-white shadow-violet-500/30 scale-105"
                  : "bg-white/10 hover:bg-violet-600/30 border-white/15 hover:border-violet-400/40 text-violet-200 backdrop-blur-md"
              }`}
            >
              {musicOn ? (
                /* Animated Soundwave Equalizer */
                <div className="flex items-end gap-[3px] h-3.5">
                  <span className="w-[2.5px] bg-white rounded-full animate-soundbar-1" />
                  <span className="w-[2.5px] bg-white rounded-full animate-soundbar-2" />
                  <span className="w-[2.5px] bg-white rounded-full animate-soundbar-3" />
                </div>
              ) : (
                /* Music symbol when paused */
                <span className="text-base transition-transform duration-300 hover:rotate-12">
                  ♫
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* ================= MOBILE DRAWER ================= */}
        {open && (
          <div className="md:hidden mt-3 max-w-sm mx-auto p-5 rounded-3xl bg-[#0b0c14]/90 border border-white/10 backdrop-blur-2xl shadow-2xl animate-fadeIn">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="text-white/80 hover:text-white text-sm py-2 px-4 rounded-xl hover:bg-white/5 transition flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.isGallery && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300">
                      42 Photos
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Floating Heart Particles */}
      {floatingHearts.map((h) => (
        <span
          key={h.id}
          className="fixed pointer-events-none text-2xl text-rose-400 animate-float-up z-60"
          style={{ left: `${h.x - 12}px`, top: `${h.y - 10}px` }}
        >
          💖
        </span>
      ))}
    </>
  );
};

export default Navbar;