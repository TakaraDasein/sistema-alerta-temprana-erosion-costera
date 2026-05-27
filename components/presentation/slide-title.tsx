"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function SlideTitle() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1a1510] flex items-center justify-center">

      {/* ── BORDES WAYUU — sin efectos, limpios ── */}
      <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none">
        <Image
          src="/images/pattern-wayuu.png"
          alt="Patrón Wayuu"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none">
        <Image
          src="/images/pattern-wayuu.png"
          alt="Patrón Wayuu"
          fill
          className="object-cover"
        />
      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-20 md:px-36">

        {/* LOGO */}
        <motion.div
          className="relative w-80 h-80 md:w-[30rem] md:h-[30rem] mb-3 cursor-pointer"
          initial={{ scale: 0.75, opacity: 0, y: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -12, 0],
          }}
          whileHover={{ scale: 1.08 }}
          transition={{
            scale: { duration: 0.9, delay: 0.15, ease: "easeOut" },
            opacity: { duration: 0.9, delay: 0.15 },
            y: {
              duration: 4,
              delay: 1.1,
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
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.75, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-widest mb-2"
          style={{ color: "#C4622D" }}
        >
          O&#39;UPALAMMA
        </motion.h1>

        {/* FRASE WAYUUNAIKI */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.78, duration: 0.65 }}
          className="text-[#c9a86c] text-base md:text-xl italic font-light tracking-widest mb-1 text-center"
        >
          «Vigía del territorio frente al mar»
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.55 }}
          className="text-[#c9a86c]/55 text-xs tracking-[0.35em] uppercase mb-7"
        >
          en lengua wayuunaiki
        </motion.p>

        {/* SEPARADOR DORADO */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.85, ease: "easeOut" }}
          className="mb-6"
          style={{
            width: "280px",
            height: "1px",
            background: "linear-gradient(to right, transparent, #c9a86c, #C4622D, #c9a86c, transparent)",
          }}
        />

        {/* SUBTÍTULO */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="text-white/75 text-xs md:text-sm tracking-[0.2em] uppercase text-center mb-4"
        >
          Sistema de Alerta Temprana Comunitario · Erosión Costera
        </motion.p>

        {/* BADGE INSTITUCIONAL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.28, duration: 0.6 }}
          className="flex items-center gap-2 rounded-full px-5 py-1.5 mb-7"
          style={{
            background: "rgba(201,168,108,0.08)",
            border: "1px solid rgba(201,168,108,0.28)",
          }}
        >
          <span
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: "#c9a86c" }}
          >
            Hackathon UNGRD · PNUD Colombia 2026
          </span>
        </motion.div>

        {/* AUTOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.42, duration: 0.65 }}
          className="flex flex-col items-center gap-1"
        >
          <p className="text-sm md:text-base font-semibold tracking-wide" style={{ color: "#c9a86c" }}>
            Álvaro Efrén Bolaños Scalante
          </p>
          <p className="text-xs tracking-wider" style={{ color: "rgba(201,168,108,0.6)" }}>
            Universidad del Cauca · Ciencia Política · Egresado 2025
          </p>
        </motion.div>

      </div>
    </div>
  )
}
