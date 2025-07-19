"use client";
import { useRef, useEffect } from "react";

export default function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
  }, []);

  return (
    <audio ref={audioRef} src="/depth.mp3" autoPlay loop />
  );
}
