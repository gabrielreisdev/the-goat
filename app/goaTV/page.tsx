"use client";

import Link from "next/link";
import BackgroundImage from "@/components/BackgroundImage";
import { useRef, useState } from "react";

function PlayIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="6,4 20,12 6,20" /></svg>
  );
}
function PauseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><rect x="5" y="4" width="5" height="16" rx="2"/><rect x="14" y="4" width="5" height="16" rx="2"/></svg>
  );
}
function VolumeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><path d="M19 9a3 3 0 0 1 0 6" strokeLinecap="round"/></svg>
  );
}
function FullscreenIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="4 4 9 4 9 9"/><polyline points="20 4 15 4 15 9"/><polyline points="4 20 9 20 9 15"/><polyline points="20 20 15 20 15 15"/></svg>
  );
}

export default function GoaTVPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = Number(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const vol = Number(e.target.value);
    video.volume = vol;
    setVolume(vol);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!isFullscreen) {
      if (video.requestFullscreen) video.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Format time in mm:ss
  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/10 via-black to-black">
        <BackgroundImage />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-center items-center border-b bg-black border-gray-800/30">
        <div className="flex gap-6">
          <Link href="/" className="text-white hover:text-purple-500 transition-colors font-serif">Início</Link>
          <Link href="/shows" className="text-white hover:text-purple-500 transition-colors font-serif">Shows</Link>
          <Link href="/galeria" className="text-white hover:text-purple-500 font-serif">Galeria</Link>
          <Link href="/goaTV" className="text-purple-600 font-serif font-bold">GoaTV</Link>
          <Link href="/merch" className="text-white hover:text-purple-500 font-serif">Merch</Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 style={{ fontFamily: 'SATAM' }} className="text-6xl md:text-7xl font-bold mb-6 font-skeleta gothic-shadow">GoaTV</h1>
          <p className="text-xl text-gray-300 font-serif italic">Vídeos, bastidores e conteúdos exclusivos da The Goat.</p>
        </div>

        {/* Player de vídeo customizado moderno */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-3xl aspect-[16/9] rounded-2xl bg-gradient-to-br from-gray-950/80 via-black to-purple-950 border border-purple-900 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <video
              ref={videoRef}
              poster="/placeholder.jpg"
              className="w-full h-full rounded-2xl"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={handlePlayPause}
              onEnded={() => setIsPlaying(false)}
              style={{ background: "#000" }}
            >
              <source src="/goatv1.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos HTML5.
            </video>
            {/* Controles customizados modernos */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 py-5 flex flex-col gap-3 rounded-b-2xl transition-all">
              <div className="flex items-center gap-4 w-full">
                <button
                  onClick={handlePlayPause}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-800/80 hover:bg-purple-700/90 text-white shadow-lg transition-all duration-200 focus:outline-none border-2 border-purple-900"
                  aria-label={isPlaying ? "Pausar" : "Tocar"}
                >
                  {isPlaying ? <PauseIcon className="w-7 h-7" /> : <PlayIcon className="w-8 h-8 ml-1" />}
                </button>
                <span className="text-xs font-mono w-12 text-right text-purple-200 drop-shadow">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="flex-1 accent-purple-600 h-2 rounded-lg bg-gray-800/60 shadow-inner transition-all"
                  style={{ accentColor: "#a78bfa" }}
                />
                <span className="text-xs font-mono w-12 text-purple-200 drop-shadow">{formatTime(duration)}</span>
                <button
                  onClick={handleFullscreen}
                  className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-purple-900/80 text-purple-200 border border-purple-900 transition-all"
                  aria-label="Tela cheia"
                >
                  <FullscreenIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-3 w-full">
                <span className="text-purple-300"><VolumeIcon className="w-6 h-6" /></span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="accent-purple-600 h-2 w-32 rounded-lg bg-gray-800/60 shadow-inner transition-all"
                  style={{ accentColor: "#a78bfa" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Link para mais vídeos */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/thegoatband_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-800 hover:bg-purple-700 text-white px-8 py-3 text-lg font-serif border border-purple-600 shadow-lg shadow-purple-900/50 transition-all duration-300 hover:shadow-purple-700/50 rounded"
          >
            Ver mais vídeos no Instagram
          </a>
        </div>
      </div>
    </div>
  );
}