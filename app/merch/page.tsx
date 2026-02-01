"use client";

import { Button } from "@/components/ui/button";
import goatLogo from '../../public/goat-logo-metalico.png';
import Image from 'next/image';
import Link from "next/link";
import BackgroundImage from "@/components/BackgroundImage";
import { useState } from 'react';

const merchs = [
  {
    title: 'Camiseta Ritual Sombrio',
    price: 'R$ 79,90',
    images: ['/placeholder.jpg', '/placeholder.jpg'],
  },
  {
    title: 'Caneca Cerimonial',
    price: 'R$ 49,90',
    images: ['/placeholder.jpg'],
  },
  {
    title: 'Adesivo Logo The Goat',
    price: 'R$ 14,90',
    images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
  },
];

export default function MerchPage() {
  const [modal, setModal] = useState<null | { images: string[]; title: string; price: string; index: number }>(null);
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
          <Link href="/goaTV" className="text-white hover:text-purple-500 font-serif">GoaTV</Link>
          <Link href="/merch" className="text-purple-600 font-serif font-bold">Merch</Link>
        </div>
      </nav>

      {/* Conteúdo principal do Merch */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 style={{ fontFamily: 'SATAM' }} className="text-6xl md:text-7xl font-bold mb-6 font-skeleta gothic-shadow">Merch</h1>
          <p className="text-xl text-gray-300 font-serif italic">"Em breve: camisetas, acessórios e produtos oficiais da The Goat para você levar a experiência além do palco."</p>
        </div>

        {/* Cards de futuros merchs */}
        {/* <div className="grid gap-8 max-w-4xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {merchs.map((merch, i) => (
            <div key={merch.title} className="bg-gradient-to-r from-gray-950/20 to-black border border-gray-700/50 rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-purple-900/60 hover:shadow-2xl">
              <Image src={merch.images[0]} alt={merch.title} width={160} height={160} className="mb-4 rounded object-cover cursor-pointer" onClick={() => setModal({ images: merch.images, title: merch.title, price: merch.price, index: 0 })} />
              <h2 className="text-2xl font-bold font-serif mb-2 text-purple-400">{merch.title}</h2>
              <span className="text-lg font-bold text-purple-500 font-serif">{merch.price}</span>
            </div>
          ))}
        </div> */}

        {/* Modal de imagem expandida com carrossel */}
        {/* {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setModal(null)}>
            <div
              className="relative flex flex-col items-center bg-gradient-to-r from-gray-950/20 to-black border border-gray-700/50 rounded-2xl shadow-2xl p-10 w-full max-w-2xl mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-center mb-6 w-full">
                {modal.images.length > 1 && (
                  <button
                    className="absolute left-4 flex items-center justify-center w-12 h-12 bg-black/70 text-white rounded-full text-2xl z-10 hover:bg-purple-900/80 transition"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                    onClick={() => setModal(m => m && { ...m, index: (m.index - 1 + m.images.length) % m.images.length })}
                  >
                    <span className="material-icons" style={{ fontSize: 32, lineHeight: 1 }}>&#8592;</span>
                  </button>
                )}
                <Image src={modal.images[modal.index]} alt={modal.title} width={350} height={220} className="rounded-lg shadow-lg max-w-full max-h-[40vh] object-contain" />
                {modal.images.length > 1 && (
                  <button
                    className="absolute right-4 flex items-center justify-center w-12 h-12 bg-black/70 text-white rounded-full text-2xl z-10 hover:bg-purple-900/80 transition"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                    onClick={() => setModal(m => m && { ...m, index: (m.index + 1) % m.images.length })}
                  >
                    <span className="material-icons" style={{ fontSize: 32, lineHeight: 1 }}>&#8594;</span>
                  </button>
                )}
              </div>
              <h2 className="text-3xl font-bold font-serif mb-2 text-purple-400 text-center">{modal.title}</h2>
              <span className="text-2xl font-bold text-purple-500 font-serif mb-4 text-center">{modal.price}</span>
              <button className="absolute top-4 right-4 bg-black/70 text-white rounded-full px-3 py-1 text-lg" onClick={() => setModal(null)}>
                ×
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
} 