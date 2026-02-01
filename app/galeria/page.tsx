"use client";

import Link from "next/link"
import Image from 'next/image';
import BackgroundImage from "@/components/BackgroundImage";
import { useEffect, useState } from "react";

export default function GaleriaPage() {
  const [filter, setFilter] = useState("Todos");
  const images = [
    {
      src: "/ritual.jpeg?height=400&width=600",
      alt: "Ritual",
      category: "Art",
    },
    {
      src: "/noise.jpg?height=400&width=600",
      alt: "Show na Casa Noise",
      category: "Show",
    },
    {
      src: "/13.jpg?height=400&width=600",
      alt: "Dia dos Namorados Macabro",
      category: "Show",
    },
    {
      src: "/04.jpg?height=400&width=600",
      alt: "Show na Casa da Felicidade",
      category: "Show",
    },
    {
      src: "/14.jpg?height=400&width=600",
      alt: "Bastodpres",
      category: "Bastidores",
    },
    {
      src: "/6.jpg?height=400&width=600",
      alt: "Bastidores",
      category: "Bastidores",
    },
    {
      src: "/8.jpg?height=400&width=600",
      alt: "Bastidores",
      category: "Bastidores",
    },
    {
      src: "/10.jpg?height=400&width=600",
      alt: "Bastidores",
      category: "Bastidores",
    },
    {
      src: "/5.jpg?height=400&width=600",
      alt: "Bastidores",
      category: "Bastidores",
    },
    {
      src: "/9.jpg?height=400&width=600",
      alt: "Bastidores",
      category: "Bastidores",
    },
    {
      src: "/7.jpg?height=400&width=600",
      alt: "Bastidores",
      category: "Bastidores",
    },
    {
      src: "/11.jpg?height=400&width=600",
      alt: "Bastidores",
      category: "Bastidores",
    },
    {
      src: "/12.jpg?height=400&width=600",
      alt: "Bastidores",
      category: "Bastidores",
    },
    {
      src: "/15.jpg?height=400&width=600",
      alt: "Bastidores",
      category: "Bastidores",
    },
    {
      src: "/16.jpg?height=400&width=600",
      alt: "Ensaio",
      category: "Ensaio",
    },
    {
      src: "/17.jpg?height=400&width=600",
      alt: "Ensaio",
      category: "Ensaio",
    },
    {
      src: "/18.jpg?height=400&width=600",
      alt: "Ensaio",
      category: "Ensaio",
    },
    {
      src: "/20.jpg?height=400&width=600",
      alt: "Ensaio",
      category: "Ensaio",
    },
    {
      src: "/21.jpg?height=400&width=600",
      alt: "Ensaio",
      category: "Ensaio",
    },
    {
      src: "/19.jpg?height=400&width=600",
      alt: "Ensaio",
      category: "Ensaio",
    },

  ]

  const filteredImages = filter === "Todos"
    ? images
    : images.filter((img) => {
      if (filter === "Ensaios") return img.category === "Ensaio";
      if (filter === "Bastidores") return img.category === "Bastidores";
      if (filter === "Shows") return img.category === "Show";
      return true;
    });

  const [modalImage, setModalImage] = useState<{ src: string, alt: string } | null>(null);

  useEffect(() => {
    if (!modalImage) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setModalImage(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalImage]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/10 via-black to-black">
        <BackgroundImage />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-center items-center border-b bg-black border-gray-800/30">
        <div className="flex gap-6">
          <Link href="/" className="text-white hover:text-purple-500 transition-colors font-serif">
            Início
          </Link>
          <Link href="/shows" className="text-white hover:text-purple-500 transition-colors font-serif">
            Shows
          </Link>
          <Link href="/galeria" className="text-purple-600 font-serif font-bold">
            Galeria
          </Link>
          <Link href="/goaTV" className="text-white hover:text-purple-500 font-serif">
            GoaTV
          </Link>
          <Link href="/merch" className="text-white hover:text-purple-500 font-serif">
            Merch
          </Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 style={{ fontFamily: 'SATAM' }} className="text-6xl md:text-7xl font-bold mb-6 font-skeleta gothic-shadow">Galeria Sombria</h1>
          <p className="text-xl text-gray-300 font-serif italic">"Momentos capturados nas trevas do ritual"</p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            className={`px-6 py-2 rounded-full font-serif border ${filter === "Todos" ? "bg-purple-800 text-white border-purple-600 shadow-lg shadow-purple-900/50" : "bg-transparent text-purple-400 hover:text-white active:text-white border-purple-600 hover:bg-purple-900 transition-colors"}`}
            onClick={() => setFilter("Todos")}
          >
            Todos
          </button>
          <button
            className={`px-6 py-2 rounded-full font-serif border ${filter === "Shows" ? "bg-purple-800 text-white border-purple-600 shadow-lg shadow-purple-900/50" : "bg-transparent text-purple-400 hover:text-white active:text-white border-purple-600 hover:bg-purple-900 transition-colors"}`}
            onClick={() => setFilter("Shows")}
          >
            Shows
          </button>
          <button
            className={`px-6 py-2 rounded-full font-serif border ${filter === "Bastidores" ? "bg-purple-800 text-white border-purple-600 shadow-lg shadow-purple-900/50" : "bg-transparent text-purple-400 hover:text-white active:text-white border-purple-600 hover:bg-purple-900 transition-colors"}`}
            onClick={() => setFilter("Bastidores")}
          >
            Bastidores
          </button>
          <button
            className={`px-6 py-2 rounded-full font-serif border ${filter === "Ensaios" ? "bg-purple-800 text-white border-purple-600 shadow-lg shadow-purple-900/50" : "bg-transparent text-purple-400 hover:text-white active:text-white border-purple-600 hover:bg-purple-900 transition-colors"}`}
            onClick={() => setFilter("Ensaios")}
          >
            Ensaios
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-gray-700/30 hover:border-gray-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/30 cursor-pointer"
              onClick={() => setModalImage({ src: image.src, alt: image.alt })}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 filter sepia-[0.3] contrast-125 brightness-90"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg font-serif mb-1">{image.alt}</h3>
                      <span className="text-gray-400 text-sm font-serif">{image.category}</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setModalImage(null)}
          >
            <div
              className="relative"
              onClick={e => e.stopPropagation()} // Impede fechar ao clicar na imagem
            >
              <img
                src={modalImage.src}
                alt={modalImage.alt}
                className="max-w-[90vw] max-h-[80vh] rounded shadow-lg"
              />
              <button
                className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-3 py-1 text-lg"
                onClick={() => setModalImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-400 mb-6 font-serif italic">
            "Cada imagem conta uma história do ritual musical"
          </p>
          <Link href="/shows">
            <button className="bg-purple-800 hover:bg-purple-700 text-white px-8 py-3 text-lg font-serif border border-purple-600 shadow-lg  transition-all duration-300 hover:shadow-purple-700/50 rounded">
              Próximos Rituais
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
