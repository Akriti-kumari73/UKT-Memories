import { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import JustUKT from "./sections/JustUKT";
import YouAndMe from "./sections/YouAndMe";
import Letter from "./sections/Letter";
import GroupMemories from "./sections/GroupMemories";
import VideoSection from "./sections/VideoSection";
import WishesSection from "./sections/WishesSection";
import FinalSection from "./sections/FinalSection";
import PhotoGalleryModal from "./components/PhotoGalleryModal";
import { getStats } from "./services/api";

function App() {
  const [musicOn, setMusicOn] = useState(false);
  const [stats, setStats] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Fetch live backend statistics
    getStats().then((data) => {
      if (data) setStats(data);
    });

    // Intersection observer / scroll listener to highlight active section in Navbar
    const handleScroll = () => {
      const sections = ["home", "about", "memories", "us", "group", "video", "letter", "wishes"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (sectionId === "us" || sectionId === "group") {
              setActiveSection("gallery");
            } else if (sectionId === "wishes") {
              setActiveSection("contact");
            } else if (sectionId === "letter") {
              setActiveSection("letters");
            } else {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(() => {
        setMusicOn(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [musicOn]);

  return (
    <div className="bg-[#08090d] text-white min-h-screen selection:bg-violet-400 selection:text-black">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
      />

      {/* Top Floating Navbar matching photo */}
      <Navbar
        musicOn={musicOn}
        setMusicOn={setMusicOn}
        activeSection={activeSection}
        onOpenGallery={() => setGalleryModalOpen(true)}
      />

      <main>
        {/* Hero Section matching photo */}
        <Hero />

        {/* Section 2: "Hey UKT, You are rare." matching photo */}
        <Intro />

        {/* Section 3: "Just UKT." matching photo & upgraded layout */}
        <JustUKT />

        {/* Chapter 02: Together / You and Me - Upgraded Polaroid Scrapbook */}
        <YouAndMe />

        {/* Heartfelt Letter: Dear UKT */}
        <Letter />

        {/* Chapter 03: The Squad Chaos / Group Memories - Upgraded Dynamic Masonry */}
        <GroupMemories />

        {/* Chapter 04: Cinema Video Relive */}
        <VideoSection />

        {/* Interactive Backend-powered Wall of Love & Wishes */}
        <WishesSection />

        {/* Closing Final Section */}
        <FinalSection />
      </main>

      {/* Global Full Photo Gallery Modal (triggers on Gallery click) */}
      <PhotoGalleryModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        initialCategory="all"
      />

      {/* Luxury Footer with Live Backend Stats */}
      <footer className="py-14 px-6 text-center bg-[#06070a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-32 bg-violet-600/10 blur-[80px] pointer-events-none" />

        <p className="font-serif text-3xl sm:text-4xl tracking-wide text-white">
          UKT <span className="font-script text-3xl sm:text-4xl text-violet-300">♡</span>
        </p>

        {/* Custom dedicated message */}
        <p className="mt-4 font-serif text-base sm:text-lg text-white/85 font-light">
          A little world, crafted by <span className="text-violet-300 font-normal">Akriti</span>
        </p>

        <p className="mt-2 text-sm sm:text-base text-violet-200/80 font-light max-w-md mx-auto italic">
          for the memories that deserve to live forever <span className="text-rose-300 font-script text-lg">♡</span>
        </p>

        <p className="mt-3 text-xs sm:text-sm text-white/45 tracking-wider font-light">
          — made with intention, kept with love —
        </p>

        {stats && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-white/40 font-light">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
              📸 {stats.totalPhotos || 42} Moments Captured
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
              💌 {stats.totalWishes || 3} Love Notes
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
              💖 {stats.totalHearts || 1240} Total Hearts
            </span>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-white/10" />
          <span className="text-violet-300/50 text-xs tracking-[0.25em] uppercase font-light">
            For the ones who matter
          </span>
          <span className="h-px w-8 bg-white/10" />
        </div>
      </footer>
    </div>
  );
}

export default App;