import { Button } from "@/components/ui/button";
import goatLogo from '../public/goat-logo.webp';
import Image from 'next/image';
import Link from "next/link";
import BackgroundImage from "@/components/BackgroundImage";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/10 via-black to-black">
      <BackgroundImage />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-center items-center">
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-purple-600 transition-colors font-serif font-bold"
          >
            Início
          </Link>
          <Link
            href="/shows"
            className="text-white hover:text-purple-500 transition-colors font-serif"
          >
            Shows
          </Link>
          <Link href="/galeria" className="text-white hover:text-purple-500 font-serif">
            Galeria
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
       

        {/* Main title */}
        <div className="">
          <Image className="w-1/2 md:w-1/3 flex flex-row mx-auto justify-center items-center mb-48" src={goatLogo} alt="Imagem" />
        </div>

        {/* Subtitle */}
        {/* <div className="text-xl md:text-2xl text-gray-500 mb-8 font-serif italic">
          "Uma experiência sombria e visceral"
        </div> */}

        {/* Description */}
        <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-serif">
          The Goat é uma experiência sombria e visceral — um tributo à
          grandiosidade e teatralidade do Ghost. Mergulhe nas profundezas do
          ritual musical onde cada apresentação é uma cerimônia de adoração ao
          poder da música.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/shows">
            <Button className="bg-purple-800 hover:bg-purple-700 text-white px-8 py-3 text-lg font-serif border border-purple-600 shadow-lg shadow-purple-900/50 transition-all duration-300 hover:shadow-purple-700/50">
              Próximos Rituais
            </Button>
          </Link>
          <Link href="/galeria">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-900   hover:text-white px-8 py-3 text-lg font-serif shadow-lg transition-all duration-300 bg-transparent"
            >
              Galeria Sombria
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
