"use client";
import { useRef, useEffect, useState } from "react";
import { Skull } from "lucide-react";

export default function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
  }, []);

  const handlePlay = () => {
    setCanPlay(true);
    audioRef.current?.play();
  };

  return (
    <>
      {!canPlay && (
        <button
          onClick={handlePlay}
          className="fixed bottom-4 right-4 z-50 bg-black/80 text-purple-800 hover:text-purple-500 p-4 rounded-full shadow-lg animate-pulse transition-all duration-300"
          aria-label="Ativar música"
        >
          <Skull size={36} className="drop-shadow-lg" />
        </button>
      )}
      <audio
        ref={audioRef}
        autoPlay={canPlay}
        loop
        controls={canPlay}
        style={{ display: "none" }}
      >
        <source src="/depth.mp3" type="audio/mp3" />
        Seu navegador não suporta áudio HTML5.
      </audio>
    </>
  );
}
