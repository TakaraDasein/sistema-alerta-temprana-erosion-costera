"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function SlideTitle() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1a1510]">

      {/* ── BORDES WAYUU — sin efectos, limpios ── */}
      <div className="absolute left-0 top-0 h-full w-12 md:w-16 lg:w-20 z-10 pointer-events-none">
        <Image
          src="/images/pattern-wayuu.png"
          alt="Patrón Wayuu"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute right-0 top-0 h-full w-12 md:w-16 lg:w-20 z-10 pointer-events-none">
        <Image
          src="/images/pattern-wayuu.png"
          alt="Patrón Wayuu"
          fill
          className="object-cover"
        />
      </div>

      {/* ── GRID RESPONSIVO ── */}
      <div className="relative z-20 h-full w-full px-16 md:px-24 lg:px-32 py-8 md:py-12">
        <div className="h-full grid grid-rows-[auto_1fr_auto] gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {/* ── FILA 1: HEADER (Institucional) ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center pt-2"
          >
            <div
              className="flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase font-medium"
              style={{
                background: "rgba(201,168,108,0.08)",
                border: "1px solid rgba(201,168,108,0.28)",
                color: "#c9a86c"
              }}
            >
              Hackathon UNGRD · PNUD Colombia 2026
            </div>
          </motion.div>

          {/* ── FILA 2: CONTENIDO PRINCIPAL (Logo + Título + Subtítulos) ── */}
          <div className="flex flex-col items-center justify-center gap-3 md:gap-4 lg:gap-5">
            
            {/* LOGO */}
            <motion.div
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 cursor-pointer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -8, 0],
              }}
              whileHover={{ scale: 1.05 }}
              transition={{
                scale: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                opacity: { duration: 0.8, delay: 0.3 },
                y: {
                  duration: 4,
                  delay: 1.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src="/images/6.png"
                alt="Logo O'UPALAMMA"
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            {/* TÍTULO en terracota */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-widest"
              style={{ color: "#C4622D" }}
            >
              O&#39;UPALAMMA
            </motion.h1>

            {/* FRASE WAYUUNAIKI */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col items-center gap-1"
            >
              <p className="text-[#c9a86c] text-sm sm:text-base md:text-lg lg:text-xl italic font-light tracking-wide md:tracking-widest text-center">
                «Vigía del territorio frente al mar»
              </p>
              <p className="text-[#c9a86c]/55 text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.35em] uppercase">
                en lengua wayuunaiki
              </p>
            </motion.div>

            {/* SEPARADOR DORADO */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="w-48 sm:w-56 md:w-64 lg:w-72 h-[1px]"
              style={{
                background: "linear-gradient(to right, transparent, #c9a86c, #C4622D, #c9a86c, transparent)",
              }}
            />

            {/* SUBTÍTULO */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-white/75 text-[10px] sm:text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase text-center px-4"
            >
              Sistema de Alerta Temprana Comunitario · Erosión Costera
            </motion.p>
          </div>

          {/* ── FILA 3: FOOTER (Autor) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col items-center gap-1 pb-2"
          >
            <p className="text-xs sm:text-sm md:text-base font-semibold tracking-wide" style={{ color: "#c9a86c" }}>
              Álvaro Efrén Bolaños Scalante
            </p>
            <p className="text-[10px] sm:text-xs tracking-wider text-center" style={{ color: "rgba(201,168,108,0.6)" }}>
              Universidad del Cauca · Ciencia Política · Egresado 2025
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
