"use client"

import { motion } from "framer-motion"
import { Heart, Mail, Github, Users, Shield, BookOpen } from "lucide-react"
import Image from "next/image"

export function SlideClosing() {
  const highlights = [
    { value: "$3.4M", label: "Implementación" },
    { value: "800", label: "Vidas protegidas" },
    { value: "$4.341", label: "Por persona" },
    { value: "86", label: "Puntos replicables" },
  ]

  const pillars = [
    { icon: Shield, text: "Tecnología", color: "#2d8bb8" },
    { icon: Users, text: "Comunidad", color: "#22c55e" },
    { icon: BookOpen, text: "Soberanía", color: "#c9a86c" },
  ]

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#1a1510] to-[#0d0a08] overflow-hidden">
      {/* Background pattern (subtle) */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/pattern-wayuu.png')`,
            backgroundSize: "100px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 py-8 z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-32 h-32 md:w-40 md:h-40 mb-4"
        >
          <Image
            src="/images/logo-oupalamma.jpeg"
            alt="Logo O'UPALAMMA"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-[#2d8bb8] mb-2"
        >
          {"O'UPALAMMA"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#c9a86c]/80 text-lg md:text-xl mb-6"
        >
          Vigía del territorio frente al mar
        </motion.p>

        {/* Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          {pillars.map((pillar, i) => (
            <div key={i} className="flex items-center gap-2">
              <pillar.icon size={20} style={{ color: pillar.color }} />
              <span style={{ color: pillar.color }} className="font-semibold">
                {pillar.text}
              </span>
              {i < pillars.length - 1 && (
                <span className="text-[#c9a86c]/30 ml-2">+</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8"
        >
          {highlights.map((stat, i) => (
            <div
              key={i}
              className="bg-[#1a1510]/80 border border-[#c9a86c]/30 px-4 py-2 rounded-lg text-center"
            >
              <p className="text-xl md:text-2xl font-bold text-[#22c55e]">
                {stat.value}
              </p>
              <p className="text-xs text-[#c9a86c]/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {["100% Open Source", "Offline-first", "Bilingüe"].map((badge, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2d8bb8]/20 text-[#2d8bb8] border border-[#2d8bb8]/30"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center max-w-md mb-8"
        >
          <p className="text-[#c9a86c]/90 italic text-sm md:text-base">
            {'"La gestión del riesgo es responsabilidad de TODOS los habitantes del territorio"'}
          </p>
          <p className="text-[#c9a86c]/60 text-xs mt-2">— Ley 1523 de 2012</p>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <p className="text-[#c9a86c] font-semibold mb-4">
            ¿Me acompañan?
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a
              href="mailto:efren.dataviz@gmail.co"
              className="flex items-center gap-2 text-[#2d8bb8] hover:text-[#2d8bb8]/80 transition-colors"
            >
              <Mail size={16} />
              <span>efren.dataviz@gmail.co</span>
            </a>
            <a
              href="https://github.com"
              className="flex items-center gap-2 text-[#c9a86c]/70 hover:text-[#c9a86c] transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-4 right-4 text-right"
        >
          <p className="text-[#c9a86c] text-sm font-semibold">
            Álvaro Efrén Bolaños Scalante
          </p>
          <p className="text-[#c9a86c]/60 text-xs">
            Universidad del Cauca - Ciencia Política
          </p>
        </motion.div>

        {/* Gratitude icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8, type: "spring" }}
          className="absolute bottom-4 left-4"
        >
          <Heart className="text-red-500" size={24} fill="#ef4444" />
        </motion.div>
      </div>
    </div>
  )
}
