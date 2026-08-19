"use client";

import Image from 'next/image';
import Link from "next/link";
import BackgroundImage from "@/components/BackgroundImage";
import { useState } from 'react';

type PosterSize = 'A4' | 'A3';

interface SizeOption {
  size: PosterSize;
  name: string;
  dimensions: string;
  price: string;
}

const SIZES: Record<PosterSize, SizeOption> = {
  A4: {
    size: 'A4',
    name: 'Tamanho A4',
    dimensions: '21 × 29,7 cm',
    price: 'R$ 24,99',
  },
  A3: {
    size: 'A3',
    name: 'Tamanho A3',
    dimensions: '29,7 × 42 cm',
    price: 'R$ 29,99',
  },
};

const merchs = [
  {
    id: 'opus-eponymous',
    title: 'Poster Satanized - Opus Eponymous',
    images: ['/opus.jpeg', '/opus.jpeg'],
  },
  {
    id: 'ifyou',
    title: 'Poster Satanized - If You Have Ghost',
    images: ['/ifyou.jpeg', '/ifyou.jpeg'],
  },
  {
    id: 'infestissumam',
    title: 'Poster Satanized - Infestissumam',
    images: ['/infesti.jpeg', '/infesti.jpeg'],
  },
  {
    id: 'meliora',
    title: 'Poster Satanized - Meliora',
    images: ['/meliora.jpeg', '/meliora.jpeg'],
  },
  {
    id: 'prequelle',
    title: 'Poster Satanized - Prequelle',
    images: ['/prequelle.jpg', '/prequelle.jpg'],
  },
  {
    id: 'impera',
    title: 'Poster Satanized - Impera',
    images: ['/impera.jpeg', '/impera.jpeg'],
  },
  {
    id: 'skeleta',
    title: 'Poster Satanized - Skeletá',
    images: ['/skeleta.jpeg', '/skeleta.jpeg'],
  },
];

export default function MerchPage() {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, PosterSize>>({});
  const [modal, setModal] = useState<null | {
    id: string;
    images: string[];
    title: string;
    size: PosterSize;
    index: number;
  }>(null);

  const getSelectedSize = (id: string): PosterSize => selectedSizes[id] || 'A4';

  const handleSizeChange = (id: string, size: PosterSize) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
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
          <Link href="/goaTV" className="text-white hover:text-purple-500 font-serif">GoaTV</Link>
          <Link href="/merch" className="text-purple-600 font-serif font-bold">Merch</Link>
        </div>
      </nav>

      {/* Conteúdo principal do Merch */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 style={{ fontFamily: 'SATAM' }} className="text-6xl md:text-7xl font-bold mb-6 font-skeleta gothic-shadow">Merch</h1>
          <p className="text-xl text-gray-300 font-serif italic max-w-2xl mx-auto">
            Posteres exclusivos em alta resolução <br />nos tamanhos <span className="text-purple-400 font-semibold">A4</span> (R$ 24,99) e <span className="text-purple-400 font-semibold">A3</span> (R$ 29,99).
          </p>
        </div>

        {/* Cards de merchs */}
        <div className="grid gap-8 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {merchs.map((merch) => {
            const currentSize = getSelectedSize(merch.id);
            const currentOption = SIZES[currentSize];

            return (
              <div
                key={merch.id}
                className="bg-gradient-to-r from-gray-950/40 to-black border border-gray-700/50 rounded-xl shadow-lg p-6 flex flex-col items-center transition-all duration-300 hover:border-purple-600/60 hover:shadow-purple-900/40 hover:shadow-2xl"
              >
                <div
                  className="w-full relative group cursor-pointer overflow-hidden rounded-lg mb-4 flex justify-center bg-black/40 select-none"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={() =>
                    setModal({
                      id: merch.id,
                      images: merch.images,
                      title: merch.title,
                      size: currentSize,
                      index: 0,
                    })
                  }
                >
                  <Image
                    src={merch.images[0]}
                    alt={merch.title}
                    width={240}
                    height={320}
                    draggable={false}
                    quality={75}
                    className="rounded object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none select-none"
                    style={{ WebkitTouchCallout: 'none' }}
                  />
                  {/* Marca d'água */}
                  <Image
                    src="/marca%20dagua.png"
                    alt=""
                    fill
                    draggable={false}
                    className="absolute inset-0 object-cover pointer-events-none z-10 select-none"
                    style={{ mixBlendMode: 'multiply', WebkitTouchCallout: 'none' }}
                  />
                  {/* Camada invisível de proteção contra salvar imagem */}
                  <div
                    className="absolute inset-0 z-20 select-none"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 z-30 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs tracking-wider uppercase text-purple-200 font-serif bg-black/40 pointer-events-none">
                    Clique para ampliar
                  </div>
                </div>

                <h2 className="text-xl font-bold font-serif mb-3 text-purple-300 text-center">{merch.title}</h2>

                {/* Seletor de tamanhos */}
                <div className="flex items-center gap-2 mb-4 bg-gray-900/80 p-1.5 rounded-lg border border-gray-800">
                  {(['A4', 'A3'] as PosterSize[]).map((sizeKey) => {
                    const opt = SIZES[sizeKey];
                    const isSelected = currentSize === sizeKey;
                    return (
                      <button
                        key={sizeKey}
                        type="button"
                        onClick={() => handleSizeChange(merch.id, sizeKey)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-purple-700 text-white shadow-md shadow-purple-900/50'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {opt.size} ({opt.price})
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-purple-400 font-serif">{currentOption.price}</span>
                  <span className="text-xs text-gray-400 font-mono mt-0.5">{currentOption.dimensions}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal de imagem expandida com carrossel e seletor */}
        {modal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setModal(null)}
          >
            <div
              className="relative flex flex-col items-center bg-gradient-to-b from-gray-900 to-black border border-purple-800/40 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl mx-auto select-none"
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="relative flex items-center justify-center mb-6 w-full min-h-[250px]">
                {modal.images.length > 1 && (
                  <button
                    className="absolute left-2 flex items-center justify-center w-10 h-10 bg-black/70 hover:bg-purple-900/80 text-white rounded-full text-xl z-30 transition border border-gray-700"
                    onClick={() =>
                      setModal((m) =>
                        m ? { ...m, index: (m.index - 1 + m.images.length) % m.images.length } : null
                      )
                    }
                  >
                    &#8592;
                  </button>
                )}
                <div
                  className="relative select-none"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <Image
                    src={modal.images[modal.index]}
                    alt={modal.title}
                    width={400}
                    height={500}
                    draggable={false}
                    quality={80}
                    className="rounded-lg shadow-lg max-w-full max-h-[50vh] object-contain pointer-events-none select-none"
                    style={{ WebkitTouchCallout: 'none' }}
                  />
                  {/* Marca d'água no modal */}
                  <Image
                    src="/marca%20dagua.png"
                    alt=""
                    fill
                    draggable={false}
                    className="absolute inset-0 object-cover pointer-events-none z-10 rounded-lg opacity-75 select-none"
                    style={{ mixBlendMode: 'multiply', WebkitTouchCallout: 'none' }}
                  />
                  {/* Camada invisível de proteção contra clique direito e arrastar */}
                  <div
                    className="absolute inset-0 z-20 rounded-lg select-none"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                {modal.images.length > 1 && (
                  <button
                    className="absolute right-2 flex items-center justify-center w-10 h-10 bg-black/70 hover:bg-purple-900/80 text-white rounded-full text-xl z-30 transition border border-gray-700"
                    onClick={() =>
                      setModal((m) =>
                        m ? { ...m, index: (m.index + 1) % m.images.length } : null
                      )
                    }
                  >
                    &#8594;
                  </button>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold font-serif mb-3 text-purple-300 text-center">
                {modal.title}
              </h2>

              {/* Seletor no modal */}
              <div className="flex items-center gap-3 mb-4 bg-gray-950 p-2 rounded-xl border border-gray-800">
                {(['A4', 'A3'] as PosterSize[]).map((sizeKey) => {
                  const opt = SIZES[sizeKey];
                  const isSelected = modal.size === sizeKey;
                  return (
                    <button
                      key={sizeKey}
                      type="button"
                      onClick={() => {
                        setModal((m) => (m ? { ...m, size: sizeKey } : null));
                        handleSizeChange(modal.id, sizeKey);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-purple-700 text-white shadow-lg shadow-purple-900/60'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {opt.name} ({opt.dimensions})
                    </button>
                  );
                })}
              </div>

              <span className="text-3xl font-bold text-purple-400 font-serif mb-2">
                {SIZES[modal.size].price}
              </span>
              <span className="text-sm text-gray-400 font-mono mb-4">
                Dimensões: {SIZES[modal.size].dimensions}
              </span>

              <button
                className="absolute top-4 right-4 bg-black/80 hover:bg-purple-900/80 border border-gray-700 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg transition"
                onClick={() => setModal(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 