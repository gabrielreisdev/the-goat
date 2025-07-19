import type React from "react"
import type { Metadata } from "next"
import { Inter, Cinzel } from "next/font/google"
import "./globals.css"
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";

const inter = Inter({ subsets: ["latin"] })
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
})

export const metadata: Metadata = {
  title: "The Goat - Tributo à Ghost",
  description: "The Goat é uma experiência sombria e visceral — um tributo à grandiosidade e teatralidade do Ghost.",
  keywords: "The Goat, Ghost tribute, banda cover, música gótica, shows",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${cinzel.variable} font-sans`}>
        <GlobalAudioPlayer />
        {children}
      </body>
    </html>
  )
}
