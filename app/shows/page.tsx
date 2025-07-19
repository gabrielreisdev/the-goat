"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Ticket } from "lucide-react"
import Link from "next/link"
import BackgroundImage from "@/components/BackgroundImage";

export default function ShowsPage() {

  const shows = [
    {
      link: "https://partik.com.br/ghost-e-soad",
      date: "15 AGO 2025",
      venue: "30 Segundos Bar",
      city: "Salvador, BA",
      time: "22:00",
      status: "Ingressos Disponíveis",
    },
    {
      date: "À Definir",
      venue: "30 Segundos Bar",
      city: "Salvador, BA",
      time: "22:00",
      status: "Em Breve",
    },
    {
      date: "À Definir",
      venue: "Casa Noise",
      city: "Feira de Santana, BA",
      time: "22:00",
      status: "Em Breve",
    },
    
  ]

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
          <Link href="/shows" className="text-purple-600 transition-colors font-serif font-bold">
            Shows
          </Link>
          <Link href="/galeria" className="text-white hover:text-purple-500 transition-colors font-serif">
            Galeria
          </Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 style={{ fontFamily: 'SATAM' }} className="text-6xl md:text-7xl font-bold mb-6 font-skeleta gothic-shadow">PRÓXIMOS RITUAIS</h1>
          <p className="text-xl text-gray-300 font-serif italic">"Onde as almas se encontram na escuridão"</p>
        </div>

        {/* Shows Grid */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {shows.map((show, index) => (
            <Card
              key={index}
              className="bg-gradient-to-r from-gray-950/20 to-black border-gray-700/50 hover:border-gray-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/30"
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="text-gray-400" size={24} />
                      <span className="text-2xl font-bold text-gray-300 font-serif">{show.date}</span>
                      <span className="text-lg text-gray-400">{show.time}</span>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2 font-serif">{show.venue}</h3>

                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin size={18} />
                      <span className="text-lg">{show.city}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-4">
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        show.status === "Últimos Ingressos"
                          ? "bg-yellow-900/50 text-yellow-400 border border-yellow-600/50"
                          : show.status === "Em Breve"
                            ? "bg-gray-800/50 text-gray-400 border border-gray-600/50"
                            : "bg-gray-800/50 text-gray-300 border border-gray-600/50"
                      }`}
                    >
                      {show.status}
                    </div>

                    <Button
                      className="bg-purple-800 hover:bg-purple-700 text-white px-6 py-2 font-serif border border-purple-600 shadow-lg shadow-purple-900/50 transition-all duration-300 hover:shadow-purple-700/50"
                      disabled={show.status === "Em Breve"}
                    >
                    <Link href={`${show.link}`} target="_blank">
                    <div className="flex items-center justify-center">
                        <Ticket size={18} className="mr-2" />
                        {show.status === "Em Breve" ? "Em Breve" : "Ingressos"}
                    </div>
                    </Link>
                  </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 mb-8  ">
          <p className="text-lg text-gray-400 mb-6 font-serif italic">
            "Junte-se ao ritual. Sinta o poder da música sombria."
          </p>
          <Link href="/galeria">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white px-8 py-3 text-lg font-serif bg-transparent"
            >
              Ver Galeria dos Rituais
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-1/4 right-10 text-gray-600/20 text-4xl animate-pulse delay-1000">☽</div>
    </div>
  )
}
