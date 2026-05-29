"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export function SlidePolicrisis() {
  const [currentSvg, setCurrentSvg] = useState(0)
  
  // Alternar entre los dos SVGs cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSvg((prev) => (prev + 1) % 2)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const svgs = [
    "/sat/cambio- biodiversi.svg",
    "/sat/conta vulne.svg"
  ]

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#1a1510] to-[#0d0a08] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start z-20"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#c9a86c]">
            La Policrisis Planetaria
          </h2>
          <p className="text-[#c9a86c]/60 text-sm">PNUMA, 2021 • Triple Crisis Ambiental</p>
        </div>
        <Globe className="text-[#2d8bb8] w-8 h-8 md:w-10 md:h-10" />
      </motion.div>

      {/* Main content - SVG alternante */}
      <div className="h-full flex flex-col items-center justify-center pt-20 pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative w-full max-w-5xl h-[60vh] flex items-center justify-center"
        >
          {svgs.map((svg, index) => (
            <motion.div
              key={svg}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSvg === index ? 1 : 0,
                scale: currentSvg === index ? 1 : 0.95
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ pointerEvents: currentSvg === index ? 'auto' : 'none' }}
            >
              <Image
                src={svg}
                alt={`Policrisis diagram ${index + 1}`}
                width={1200}
                height={800}
                className="w-full h-full object-contain drop-shadow-2xl"
                priority={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Indicadores de paginación */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-2 mt-6"
        >
          {svgs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSvg(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSvg === index 
                  ? 'bg-[#c9a86c] w-8' 
                  : 'bg-[#c9a86c]/30 hover:bg-[#c9a86c]/50'
              }`}
              aria-label={`Ir a diagrama ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom stats */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0d0a08] to-transparent z-20"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-center">
          <div className="bg-[#1a1510]/80 px-4 py-2 rounded-lg border border-[#c9a86c]/30 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-bold text-[#2d8bb8]">3,500+</p>
            <p className="text-xs md:text-sm text-[#c9a86c]/80">km de costa Colombia</p>
          </div>
          <div className="bg-[#1a1510]/80 px-4 py-2 rounded-lg border border-[#c9a86c]/30 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-bold text-red-500">86</p>
            <p className="text-xs md:text-sm text-[#c9a86c]/80">puntos críticos (INVEMAR)</p>
          </div>
          <div className="bg-[#1a1510]/80 px-4 py-2 rounded-lg border border-[#c9a86c]/30 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-bold text-orange-500">1.4-5m</p>
            <p className="text-xs md:text-sm text-[#c9a86c]/80">retroceso por año</p>
          </div>
        </div>
        
        {/* Advertencia de crisis convergente */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <div className="bg-gradient-to-r from-red-600 to-orange-500 px-6 py-2 rounded-lg flex items-center gap-3 shadow-lg shadow-red-500/30">
            <AlertTriangle className="text-white" size={24} />
            <div>
              <p className="text-white font-bold text-base">EROSIÓN COSTERA ACELERADA</p>
              <p className="text-white/80 text-xs">Crisis convergentes aumentan vulnerabilidad</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
