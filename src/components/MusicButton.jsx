import { useEffect, useRef, useState } from "react";

const MusicButton = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(
      "/music/joyinsound-cinematic-piano-inspiring-398335-1.mp3"
    );

    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Music could not be played:", error);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className={`group fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-violet-200/30 bg-violet-400/80 text-white shadow-[0_0_25px_rgba(167,139,250,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-violet-300 ${
        isPlaying ? "animate-pulse" : ""
      }`}
    >
      <span
        className={`text-xl transition-transform duration-500 ${
          isPlaying ? "rotate-[360deg]" : ""
        }`}
      >
        {isPlaying ? "♫" : "♪"}
      </span>

      {/* Sound waves */}
      {isPlaying && (
        <span className="absolute -bottom-1 -right-1 flex gap-[2px]">
          <span className="h-2 w-[2px] animate-pulse bg-white" />
          <span className="h-3 w-[2px] animate-pulse bg-white" />
          <span className="h-2 w-[2px] animate-pulse bg-white" />
        </span>
      )}
    </button>
  );
};

export default MusicButton;