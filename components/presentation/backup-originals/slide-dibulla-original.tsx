"use client"

import { motion } from "framer-motion"
import { MapPin, Users, Waves, TreePine, Home, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Mapa simplificado de La Guajira y Dibulla usando SVG
function GuajiraMap() {
  const [activePoint, setActivePoint] = useState<number | null>(null)

  const criticalPoints = [
    { id: 1, name: "Palomino", x: 45, y: 55, severity: "high" },
    { id: 2, name: "La Punta de los Remedios", x: 38, y: 48, severity: "high" },
    { id: 3, name: "Mingueo", x: 52, y: 60, severity: "medium" },
    { id: 4, name: "La Cachaca III", x: 42, y: 52, severity: "high" },
    { id: 5, name: "Río Ancho", x: 48, y: 58, severity: "medium" },
    { id: 6, name: "Dibulla Centro", x: 40, y: 50, severity: "medium" },
  ]

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-auto">
        {/* Mar Caribe */}
        <rect x="0" y="0" width="100" height="45" fill="#1a3a4a" />
        <text x="50" y="20" textAnchor="middle" fill="#2d8bb8" fontSize="6" fontWeight="bold">
          MAR CARIBE
        </text>

        {/* La Guajira (forma simplificada) */}
        <path
          d="M 20,45 Q 30,35 60,40 Q 85,45 90,55 Q 95,70 85,85 Q 70,95 50,90 Q 30,85 20,70 Q 15,55 20,45 Z"
          fill="#2a2015"
          stroke="#c9a86c"
          strokeWidth="0.5"
        />
        <text x="65" y="75" fill="#c9a86c" fontSize="5" opacity="0.6">
          LA GUAJIRA
        </text>

        {/* Dibulla (destacado) */}
        <path
          d="M 30,45 Q 35,42 50,45 Q 55,48 55,58 Q 52,65 45,68 Q 35,70 30,60 Q 28,52 30,45 Z"
          fill="#3d2d1a"
          stroke="#c9a86c"
          strokeWidth="1"
        />
        <text x="42" y="56" fill="#c9a86c" fontSize="4" fontWeight="bold">
          DIBULLA
        </text>

        {/* Sierra Nevada (icono) */}
        <polygon points="25,70 35,55 45,70" fill="#4a5568" stroke="#718096" strokeWidth="0.5" />
        <polygon points="35,70 45,58 55,70" fill="#4a5568" stroke="#718096" strokeWidth="0.5" />
        <text x="35" y="78" textAnchor="middle" fill="#718096" fontSize="3">
          Sierra Nevada
        </text>

        {/* Puntos críticos de erosión */}
        {criticalPoints.map((point) => (
          <g key={point.id}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={activePoint === point.id ? 4 : 2.5}
              fill={point.severity === "high" ? "#ef4444" : "#f59e0b"}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: point.id * 0.2
              }}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActivePoint(point.id)}
              onMouseLeave={() => setActivePoint(null)}
            />
            {activePoint === point.id && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <rect
                  x={point.x + 3}
                  y={point.y - 8}
                  width="25"
                  height="8"
                  rx="1"
                  fill="#1a1510"
                  stroke="#c9a86c"
                  strokeWidth="0.3"
                />
                <text
                  x={point.x + 5}
                  y={point.y - 3}
                  fill="#c9a86c"
                  fontSize="3"
                >
                  {point.name}
                </text>
              </motion.g>
            )}
          </g>
        ))}

        {/* Leyenda */}
        <g transform="translate(70, 85)">
          <circle cx="3" cy="0" r="2" fill="#ef4444" />
          <text x="7" y="1" fill="#c9a86c" fontSize="2.5">Crítico</text>
          <circle cx="3" cy="5" r="2" fill="#f59e0b" />
          <text x="7" y="6" fill="#c9a86c" fontSize="2.5">Moderado</text>
        </g>
      </svg>
    </div>
  )
}

// Carrusel de impactos
function ImpactCarousel() {
  const impacts = [
    {
      icon: Waves,
      title: "Cambio Climático",
      stats: [
        { label: "Erosión anual", value: "3-5 m/año" },
        { label: "Perdido en 30 años", value: "175 metros" },
      ],
      description: "Ascenso del nivel del mar y mareas de leva más intensas",
      color: "#2d8bb8",
    },
    {
      icon: TreePine,
      title: "Pérdida de Biodiversidad",
      stats: [
        { label: "Manglares", value: "Arrasados" },
        { label: "Chipi-chipi", value: "Desaparecido" },
      ],
      description: "Barrera natural perdida, soberanía alimentaria amenazada",
      color: "#22c55e",
    },
    {
      icon: Home,
      title: "Impacto Social",
      stats: [
        { label: "Familias wayuu", value: "42 desplazadas" },
        { label: "Población en riesgo", value: "47,487 hab." },
      ],
      description: "Cementerios ancestrales perdidos, comunidades multiétnicas",
      color: "#c9a86c",
    },
  ]

  return (
    <Carousel className="w-full max-w-sm mx-auto">
      <CarouselContent>
        {impacts.map((impact, index) => (
          <CarouselItem key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-4"
            >
              <div className="bg-[#1a1510] border border-[#c9a86c]/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${impact.color}20` }}
                  >
                    <impact.icon size={24} style={{ color: impact.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#c9a86c]">
                    {impact.title}
                  </h3>
                </div>

                <div className="space-y-3 mb-4">
                  {impact.stats.map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-[#c9a86c]/70 text-sm">{stat.label}</span>
                      <span
                        className="font-bold text-lg"
                        style={{ color: impact.color }}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-[#c9a86c]/60 text-sm">{impact.description}</p>
              </div>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-2 bg-[#1a1510] border-[#c9a86c]/30 text-[#c9a86c] hover:bg-[#c9a86c]/20 hover:text-[#c9a86c]" />
      <CarouselNext className="-right-2 bg-[#1a1510] border-[#c9a86c]/30 text-[#c9a86c] hover:bg-[#c9a86c]/20 hover:text-[#c9a86c]" />
    </Carousel>
  )
}

export function SlideDibulla() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#1a1510] to-[#0d0a08] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20"
      >
        <div className="flex items-center gap-3">
          <MapPin className="text-red-500" size={28} />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#c9a86c]">
              Dibulla, La Guajira
            </h2>
            <p className="text-[#c9a86c]/60 text-sm">
              Donde la policrisis es tangible
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main content - split layout */}
      <div className="h-full flex flex-col md:flex-row items-center justify-center pt-20 pb-24 px-4 gap-6">
        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full md:w-1/2"
        >
          <GuajiraMap />
        </motion.div>

        {/* Carrusel de impactos */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full md:w-1/2"
        >
          <ImpactCarousel />
        </motion.div>
      </div>

      {/* Bottom alert */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3 bg-red-500/20 border border-red-500 px-6 py-3 rounded-lg">
            <AlertCircle className="text-red-500" size={28} />
            <div>
              <p className="text-red-400 font-bold text-lg">
                CERO Sistemas de Alerta Temprana
              </p>
              <p className="text-red-400/70 text-sm">
                6 puntos críticos SIN monitoreo en tiempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#c9a86c]/60 text-sm">
            <Users size={16} />
            <span>Wayuu · Wiwa · Arhuaco · Afro · Campesinos</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
