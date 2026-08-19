"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Check, 
  Copy, 
  ShoppingBag, 
  Truck, 
  Sparkles, 
  MessageCircle, 
  Mail, 
  X, 
  Plus, 
  Minus, 
  QrCode,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export type PosterSize = "A4" | "A3";

export interface OrderItem {
  id: string;
  title: string;
  image: string;
  size: PosterSize;
  price: number;
  quantity: number;
}

export interface SizeOption {
  size: PosterSize;
  name: string;
  dimensions: string;
  price: string;
  numericPrice: number;
}

export const SIZES_DATA: Record<PosterSize, SizeOption> = {
  A4: {
    size: "A4",
    name: "Tamanho A4",
    dimensions: "21 × 29,7 cm",
    price: "R$ 24,99",
    numericPrice: 24.99,
  },
  A3: {
    size: "A3",
    name: "Tamanho A3",
    dimensions: "29,7 × 42 cm",
    price: "R$ 29,99",
    numericPrice: 29.99,
  },
};

const PIX_KEY = "thegoatband2024@gmail.com";
const WHATSAPP_NUMBER = "5571996313661";
const WHATSAPP_FORMATTED = "(71) 99631-3661";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: {
    id: string;
    title: string;
    image: string;
    size: PosterSize;
  } | null;
  catalog: Array<{
    id: string;
    title: string;
    images: string[];
  }>;
}

export default function OrderModal({
  isOpen,
  onClose,
  initialItem,
  catalog,
}: OrderModalProps) {
  const [items, setItems] = useState<OrderItem[]>(() => {
    if (initialItem) {
      return [
        {
          id: initialItem.id,
          title: initialItem.title,
          image: initialItem.image,
          size: initialItem.size,
          price: SIZES_DATA[initialItem.size].numericPrice,
          quantity: 1,
        },
      ];
    }
    return [];
  });

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [deliveryType, setDeliveryType] = useState<"show" | "shipping">("show");
  const [address, setAddress] = useState("");
  const [cityState, setCityState] = useState("");
  const [notes, setNotes] = useState("");
  const [copiedPix, setCopiedPix] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initial item when opened
  React.useEffect(() => {
    if (initialItem && isOpen) {
      setItems([
        {
          id: initialItem.id,
          title: initialItem.title,
          image: initialItem.image,
          size: initialItem.size,
          price: SIZES_DATA[initialItem.size].numericPrice,
          quantity: 1,
        },
      ]);
      setIsSubmitted(false);
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const totalValue = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const updateQuantity = (index: number, delta: number) => {
    setItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const updateSize = (index: number, newSize: PosterSize) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index].size = newSize;
      updated[index].price = SIZES_DATA[newSize].numericPrice;
      return updated;
    });
  };

  const addAnotherItem = (merchId: string) => {
    const found = catalog.find((m) => m.id === merchId);
    if (!found) return;
    setItems((prev) => [
      ...prev,
      {
        id: found.id,
        title: found.title,
        image: found.images[0],
        size: "A4",
        price: SIZES_DATA.A4.numericPrice,
        quantity: 1,
      },
    ]);
  };

  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const buildOrderSummaryText = () => {
    let text = `🦇 *NOVA ENCOMENDA - THE GOAT MERCH*\n\n`;
    text += `👤 *Nome:* ${customerName || "Não informado"}\n`;
    text += `📱 *WhatsApp:* ${whatsapp || "Não informado"}\n`;
    text += `📦 *Modalidade de Entrega:* ${
      deliveryType === "show"
        ? "Retirada em Show / Ritual"
        : `Envio Correios - ${address || ""} (${cityState || ""})`
    }\n\n`;

    text += `📋 *Itens Solicitados:*\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.title} (${item.size}) x${item.quantity} = ${formatCurrency(
        item.price * item.quantity
      )}\n`;
    });

    text += `\n💰 *VALOR TOTAL:* ${formatCurrency(totalValue)}\n`;
    text += `🔑 *Pagamento:* Chave PIX: ${PIX_KEY}\n`;
    if (notes) {
      text += `📝 *Observações:* ${notes}\n`;
    }
    text += `\n📎 _Segue em anexo o comprovante da transferência via Pix!_`;

    return text;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const text = buildOrderSummaryText();
    // Open WhatsApp with text directly to the band number
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setIsSubmitted(true);
  };

  const handleSendEmail = () => {
    const text = buildOrderSummaryText();
    const subject = encodeURIComponent(`Encomenda Merch The Goat - ${customerName || "Cliente"}`);
    const body = encodeURIComponent(text);
    window.open(`mailto:${PIX_KEY}?subject=${subject}&body=${body}`, "_blank");
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-b from-gray-950 via-black to-zinc-950 border border-purple-800/50 rounded-2xl shadow-2xl p-5 sm:p-8 w-full max-w-3xl my-8 text-white max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-zinc-900/80 hover:bg-purple-900 border border-zinc-700 hover:border-purple-500 text-gray-300 hover:text-white rounded-full w-9 h-9 flex items-center justify-center transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-700/50 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Encomenda Oficial & Pagamento PIX
          </div>
          <h2 style={{ fontFamily: "SATAM" }} className="text-3xl sm:text-4xl font-bold font-skeleta text-purple-200 tracking-wider">
            Finalizar Encomenda
          </h2>
          <p className="text-sm text-zinc-400 font-serif mt-1">
            Escolha os detalhes, realize o pagamento via PIX e receba seu poster exclusivo.
          </p>
        </div>

        {isSubmitted ? (
          /* Confirmation state */
          <div className="bg-purple-950/20 border border-purple-600/40 rounded-xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-purple-900/60 border border-purple-500 rounded-full flex items-center justify-center mx-auto text-purple-300">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-purple-200">
              Pedido Encaminhado!
            </h3>
            <p className="text-sm text-zinc-300 max-w-md mx-auto">
              Lembre-se de anexar o comprovante do PIX na conversa para que a confirmação e o envio sejam processados imediatamente.
            </p>

            <div className="bg-black/70 border border-zinc-800 rounded-lg p-4 max-w-lg mx-auto text-left text-xs font-mono text-zinc-300 space-y-1">
              <p className="text-purple-400 font-bold">Chave PIX: {PIX_KEY}</p>
              <p>Total: {formatCurrency(totalValue)}</p>
              <p>Cliente: {customerName || "Não informado"}</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={handleCopyPix}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-sm flex items-center gap-2 transition"
              >
                {copiedPix ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
                {copiedPix ? "Chave Copiada!" : "Copiar Chave Pix"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm font-semibold transition"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendWhatsApp} className="space-y-6">
            {/* Lista de Itens */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-purple-300 font-serif flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Itens da Encomenda ({items.length})
                </span>
                {catalog.length > 0 && (
                  <select
                    className="text-xs bg-zinc-900 border border-zinc-700 text-zinc-300 rounded px-2 py-1 focus:outline-none focus:border-purple-500"
                    onChange={(e) => {
                      if (e.target.value) {
                        addAnotherItem(e.target.value);
                        e.target.value = "";
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>+ Adicionar outro pôster...</option>
                    {catalog.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-sm">
                  Nenhum item selecionado. Escolha um pôster no catálogo.
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.id}-${item.size}-${idx}`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/70 border border-zinc-800 p-3 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0 bg-black">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-200 font-serif leading-tight">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-purple-400 font-mono">
                              {SIZES_DATA[item.size].dimensions}
                            </span>
                            <span className="text-xs text-zinc-500">•</span>
                            <span className="text-xs font-semibold text-zinc-300">
                              {formatCurrency(item.price)} cada
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Controls: Size & Quantity */}
                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        {/* Size Switch */}
                        <div className="flex bg-black/60 rounded-lg p-0.5 border border-zinc-800 text-xs">
                          {(["A4", "A3"] as PosterSize[]).map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => updateSize(idx, sz)}
                              className={`px-2 py-1 rounded transition ${
                                item.size === sz
                                  ? "bg-purple-800 text-white font-bold"
                                  : "text-zinc-400 hover:text-white"
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>

                        {/* Qty +/- */}
                        <div className="flex items-center border border-zinc-700 bg-black/60 rounded-lg">
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, -1)}
                            className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-l transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-zinc-200">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, 1)}
                            className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-r transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-purple-400 font-serif min-w-[70px] text-right">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dados do Cliente e Envio */}
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 space-y-4">
              <h3 className="text-sm font-semibold text-purple-300 font-serif flex items-center gap-2">
                <Truck className="w-4 h-4" /> Dados de Contato & Entrega
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-serif">
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-serif">
                    WhatsApp para Contato *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ex: (11) 99999-9999"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Opções de Entrega */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-serif">
                  Forma de Recebimento
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("show")}
                    className={`flex items-start gap-2 p-3 rounded-lg border text-left transition ${
                      deliveryType === "show"
                        ? "bg-purple-950/40 border-purple-600 text-purple-200 shadow-md shadow-purple-950/50"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={deliveryType === "show"}
                      readOnly
                      className="mt-0.5 accent-purple-600"
                    />
                    <div>
                      <div className="text-xs font-bold font-serif text-zinc-200">
                        Retirar no Próximo Show / Ritual
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">
                        Sem custo de frete. Entrega em mãos no evento.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType("shipping")}
                    className={`flex items-start gap-2 p-3 rounded-lg border text-left transition ${
                      deliveryType === "shipping"
                        ? "bg-purple-950/40 border-purple-600 text-purple-200 shadow-md shadow-purple-950/50"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={deliveryType === "shipping"}
                      readOnly
                      className="mt-0.5 accent-purple-600"
                    />
                    <div>
                      <div className="text-xs font-bold font-serif text-zinc-200">
                        Envio por Correios / Transportadora
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">
                        Frete calculado e combinado diretamente via WhatsApp.
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {deliveryType === "shipping" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 font-serif">
                      Endereço Completo com CEP
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, Número, Bairro, CEP"
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 font-serif">
                      Cidade / UF
                    </label>
                    <input
                      type="text"
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                      placeholder="Ex: São Paulo / SP"
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs text-zinc-400 mb-1 font-serif">
                  Observações (Opcional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Dedicatória especial, ponto de referência, etc."
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Seção de Pagamento PIX */}
            <div className="bg-gradient-to-r from-purple-950/40 via-zinc-950 to-black border-2 border-purple-600/60 rounded-xl p-4 sm:p-5 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-purple-400" />
                    <h3 className="text-base font-bold text-purple-200 font-serif">
                      Pagamento Instantâneo via PIX
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Faça a transferência do valor total para a chave oficial abaixo:
                  </p>
                </div>

                <div className="text-left sm:text-right bg-black/60 p-2.5 rounded-lg border border-purple-900/60">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider block">
                    Valor Total
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-purple-300">
                    {formatCurrency(totalValue)}
                  </span>
                </div>
              </div>

              {/* Caixa da Chave Pix com Copiar */}
              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-black/80 border border-purple-800/80 rounded-xl p-2.5 sm:p-3">
                <div className="flex-1 min-w-0 flex items-center gap-2 pl-1">
                  <span className="text-xs font-bold text-purple-400 uppercase font-mono px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800">
                    Chave E-mail
                  </span>
                  <span className="text-sm font-mono text-zinc-100 truncate font-semibold select-all">
                    {PIX_KEY}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPix}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    copiedPix
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                      : "bg-purple-700 hover:bg-purple-600 text-white shadow-md shadow-purple-900/60"
                  }`}
                >
                  {copiedPix ? (
                    <>
                      <Check className="w-4 h-4" />
                      Chave Copiada!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar Chave PIX
                    </>
                  )}
                </button>
              </div>

              {/* Dica do comprovante */}
              <div className="mt-3 flex items-start gap-2 text-xs text-zinc-400 bg-purple-950/20 p-2.5 rounded-lg border border-purple-900/30">
                <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>
                  Após fazer o Pix de <strong>{formatCurrency(totalValue)}</strong>, clique abaixo para enviar os detalhes do pedido e o comprovante para a banda.
                </span>
              </div>
            </div>

            {/* Ações / Envio */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={items.length === 0}
                className="flex-1 bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2.5 text-base transition-all transform active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                Confirmar e Enviar via WhatsApp ({WHATSAPP_FORMATTED})
              </button>

              <button
                type="button"
                disabled={items.length === 0}
                onClick={handleSendEmail}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 disabled:opacity-50 text-zinc-200 hover:text-white font-serif py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-sm transition"
              >
                <Mail className="w-4 h-4" />
                Enviar por E-mail
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
