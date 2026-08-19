"use client";

import Image from 'next/image';
import Link from "next/link";
import BackgroundImage from "@/components/BackgroundImage";
import { useState } from 'react';
import OrderModal, { PosterSize, SIZES_DATA } from "@/components/OrderModal";
import { ShoppingBag, Sparkles, Copy, Check } from "lucide-react";

const SIZES = SIZES_DATA;

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

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderItem, setOrderItem] = useState<{
    id: string;
    title: string;
    image: string;
    size: PosterSize;
  } | null>(null);

  const [copiedKey, setCopiedKey] = useState(false);

  const getSelectedSize = (id: string): PosterSize => selectedSizes[id] || 'A4';

  const handleSizeChange = (id: string, size: PosterSize) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleOpenOrder = (item: {
    id: string;
    title: string;
    image: string;
    size: PosterSize;
  }) => {
    setOrderItem(item);
    setOrderModalOpen(true);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("thegoatband2024@gmail.com");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 3000);
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
        <div className="text-center mb-12">
          <h1 style={{ fontFamily: 'SATAM' }} className="text-6xl md:text-7xl font-bold mb-6 font-skeleta gothic-shadow">Merch</h1>
          <p className="text-xl text-gray-300 font-serif italic max-w-2xl mx-auto">
            Posteres exclusivos em alta resolução <br />nos tamanhos <span className="text-purple-400 font-semibold">A4</span> (R$ 24,99) e <span className="text-purple-400 font-semibold">A3</span> (R$ 29,99).
          </p>
        </div>

        {/* Banner Informativo de Pagamento PIX e Encomenda */}
        <div className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-purple-950/40 via-zinc-950/90 to-black border border-purple-800/60 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-600/50 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Encomendas Abertas
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-serif text-purple-200">
                Pagamento Rápido e Seguro via PIX
              </h2>
              <p className="text-sm text-zinc-400 max-w-lg font-serif">
                Encomende seus pôsteres favoritos, pague via Pix e retire no próximo show ou receba pelos Correios!
              </p>
            </div>

            {/* Chave PIX Card */}
            <div className="bg-black/80 border border-purple-900/80 rounded-xl p-4 flex flex-col items-center sm:items-end gap-2 w-full md:w-auto">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">Chave Pix Oficial</span>
              <span className="text-sm font-mono text-purple-300 font-bold bg-purple-950/60 px-3 py-1 rounded border border-purple-800 select-all">
                thegoatband2024@gmail.com
              </span>
              <button
                type="button"
                onClick={handleCopyPix}
                className={`mt-1 text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  copiedKey
                    ? "bg-emerald-700 text-white"
                    : "bg-purple-800 hover:bg-purple-700 text-white"
                }`}
              >
                {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey ? "Chave Copiada!" : "Copiar Chave"}
              </button>
            </div>
          </div>
        </div>

        {/* Cards de merchs */}
        <div className="grid gap-8 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {merchs.map((merch) => {
            const currentSize = getSelectedSize(merch.id);
            const currentOption = SIZES[currentSize];

            return (
              <div
                key={merch.id}
                className="bg-gradient-to-r from-gray-950/40 to-black border border-gray-700/50 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between transition-all duration-300 hover:border-purple-600/60 hover:shadow-purple-900/40 hover:shadow-2xl"
              >
                <div className="w-full flex flex-col items-center">
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

                  <div className="flex flex-col items-center mb-5">
                    <span className="text-2xl font-bold text-purple-400 font-serif">{currentOption.price}</span>
                    <span className="text-xs text-gray-400 font-mono mt-0.5">{currentOption.dimensions}</span>
                  </div>
                </div>

                {/* Botão de Encomenda */}
                <button
                  type="button"
                  onClick={() =>
                    handleOpenOrder({
                      id: merch.id,
                      title: merch.title,
                      image: merch.images[0],
                      size: currentSize,
                    })
                  }
                  className="w-full bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white font-serif font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-purple-950/60 border border-purple-500/50 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Encomendar ({currentSize})
                </button>
              </div>
            );
          })}
        </div>

        {/* Seção Como Funciona */}
        <div className="mt-20 max-w-4xl mx-auto border-t border-zinc-800/80 pt-12">
          <h3 className="text-2xl font-bold font-serif text-center text-purple-300 mb-8">
            Como funciona sua encomenda?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950/60 border border-zinc-800 p-5 rounded-xl text-center space-y-2">
              <div className="w-10 h-10 bg-purple-950 border border-purple-700 rounded-full flex items-center justify-center mx-auto text-purple-300 font-bold font-mono">
                1
              </div>
              <h4 className="text-base font-bold font-serif text-zinc-200">Escolha o Pôster</h4>
              <p className="text-xs text-zinc-400 font-serif">
                Selecione o tamanho A4 ou A3 e clique em <strong>Encomendar</strong> no catálogo.
              </p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-800 p-5 rounded-xl text-center space-y-2">
              <div className="w-10 h-10 bg-purple-950 border border-purple-700 rounded-full flex items-center justify-center mx-auto text-purple-300 font-bold font-mono">
                2
              </div>
              <h4 className="text-base font-bold font-serif text-zinc-200">Pague via PIX</h4>
              <p className="text-xs text-zinc-400 font-serif">
                Transfira o valor exato para a chave <strong>thegoatband2024@gmail.com</strong>.
              </p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-800 p-5 rounded-xl text-center space-y-2">
              <div className="w-10 h-10 bg-purple-950 border border-purple-700 rounded-full flex items-center justify-center mx-auto text-purple-300 font-bold font-mono">
                3
              </div>
              <h4 className="text-base font-bold font-serif text-zinc-200">Envie o Comprovante</h4>
              <p className="text-xs text-zinc-400 font-serif">
                Finalize e envie os dados para o WhatsApp <strong>(71) 99631-3661</strong> com o comprovante para envio ou retirada no show.
              </p>
            </div>
          </div>
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

              <span className="text-3xl font-bold text-purple-400 font-serif mb-1">
                {SIZES[modal.size].price}
              </span>
              <span className="text-sm text-gray-400 font-mono mb-4">
                Dimensões: {SIZES[modal.size].dimensions}
              </span>

              {/* Botão Encomendar direto do Modal */}
              <button
                type="button"
                onClick={() => {
                  const itemToOrder = {
                    id: modal.id,
                    title: modal.title,
                    image: modal.images[modal.index],
                    size: modal.size,
                  };
                  setModal(null);
                  handleOpenOrder(itemToOrder);
                }}
                className="w-full max-w-sm bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white font-serif font-bold py-3 px-6 rounded-xl shadow-lg shadow-purple-950/60 border border-purple-500/50 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingBag className="w-5 h-5" />
                Encomendar Agora ({modal.size} - {SIZES[modal.size].price})
              </button>

              <button
                className="absolute top-4 right-4 bg-black/80 hover:bg-purple-900/80 border border-gray-700 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg transition"
                onClick={() => setModal(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Modal de Encomenda & Pagamento PIX */}
        <OrderModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          initialItem={orderItem}
          catalog={merchs}
        />
      </div>
    </div>
  );
}