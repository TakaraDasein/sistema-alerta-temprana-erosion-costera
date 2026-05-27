"use client"

import { motion } from "framer-motion"
import { Map, Languages, CheckCircle, Globe2 } from "lucide-react"
import { useState } from "react"

// Mapa de Colombia con puntos de erosión
function ColombiaReplicabilityMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const regions = [
    { id: "guajira", name: "La Guajira", x: 72, y: 18, points: 12, isPilot: true },
    { id: "magdalena", name: "Magdalena", x: 65, y: 28, points: 15, isPilot: false },
    { id: "atlantico", name: "Atlántico", x: 60, y: 25, points: 8, isPilot: false },
    { id: "bolivar", name: "Bolívar", x: 55, y: 32, points: 10, isPilot: false },
    { id: "sucre", name: "Sucre", x: 52, y: 38, points: 6, isPilot: false },
    { id: "cordoba", name: "Córdoba", x: 48, y: 35, points: 5, isPilot: false },
    { id: "antioquia", name: "Antioquia (Costa)", x: 42, y: 40, points: 4, isPilot: false },
    { id: "choco", name: "Chocó", x: 35, y: 50, points: 10, isPilot: false },
    { id: "valle", name: "Valle del Cauca", x: 38, y: 60, points: 6, isPilot: false },
    { id: "cauca", name: "Cauca", x: 40, y: 68, points: 4, isPilot: false },
    { id: "narino", name: "Nariño", x: 42, y: 78, points: 4, isPilot: false },
    { id: "sanandres", name: "San Andrés", x: 25, y: 25, points: 2, isPilot: false },
  ]

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-auto">
        {/* Océano de fondo */}
        <rect x="0" y="0" width="100" height="100" fill="#0d1a24" />
        
        {/* Colombia simplificada */}
        <path
          d="M 45,15 Q 75,10 80,20 Q 85,30 75,35 Q 70,40 65,35 Q 60,40 55,42 
             Q 50,45 45,50 Q 40,55 35,65 Q 38,75 42,85 Q 35,90 30,85 
             Q 25,75 28,65 Q 25,55 30,45 Q 32,35 38,25 Q 42,18 45,15 Z"
          fill="#2a2015"
          stroke="#c9a86c"
          strokeWidth="0.5"
        />

        {/* Costa Caribe (destacada) */}
        <path
          d="M 45,15 Q 75,10 80,20 Q 85,30 75,35 Q 70,40 65,35 Q 60,40 55,42 Q 50,45 45,42 Q 40,35 38,25 Q 42,18 45,15"
          fill="none"
          stroke="#2d8bb8"
          strokeWidth="1.5"
          strokeDasharray="2,1"
        />

        {/* Costa Pacífica (destacada) */}
        <path
          d="M 30,45 Q 25,55 28,65 Q 25,75 28,85 Q 32,90 35,85"
          fill="none"
          stroke="#2d8bb8"
          strokeWidth="1.5"
          strokeDasharray="2,1"
        />

        {/* San Andrés */}
        <circle cx="25" cy="25" r="2" fill="#2a2015" stroke="#c9a86c" strokeWidth="0.3" />

        {/* Puntos de erosión */}
        {regions.map((region) => (
          <g key={region.id}>
            {/* Pulso animado */}
            <motion.circle
              cx={region.x}
              cy={region.y}
              r={region.isPilot ? 4 : 2}
              fill={region.isPilot ? "#22c55e" : "#ef4444"}
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              style={{ cursor: "pointer" }}
            />

            {/* Tooltip */}
            {hoveredRegion === region.id && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <rect
                  x={region.x + 4}
                  y={region.y - 8}
                  width={region.isPilot ? 28 : 22}
                  height="10"
                  rx="1"
                  fill="#1a1510"
                  stroke="#c9a86c"
                  strokeWidth="0.3"
                />
                <text
                  x={region.x + 6}
                  y={region.y - 3}
                  fill="#c9a86c"
                  fontSize="3"
                >
                  {region.name}
                </text>
                <text
                  x={region.x + 6}
                  y={region.y + 1}
                  fill={region.isPilot ? "#22c55e" : "#ef4444"}
                  fontSize="2.5"
                >
                  {region.isPilot ? "PILOTO" : `${region.points} puntos`}
                </text>
              </motion.g>
            )}
          </g>
        ))}

        {/* Etiquetas de mar */}
        <text x="58" y="8" fill="#2d8bb8" fontSize="3" fontWeight="bold">
          MAR CARIBE
        </text>
        <text x="15" y="60" fill="#2d8bb8" fontSize="3" fontWeight="bold" transform="rotate(-90, 15, 60)">
          OCÉANO PACÍFICO
        </text>

        {/* Leyenda */}
        <g transform="translate(5, 88)">
          <circle cx="3" cy="0" r="2" fill="#22c55e" />
          <text x="7" y="1" fill="#c9a86c" fontSize="2.5">Piloto (Dibulla)</text>
          <circle cx="35" cy="0" r="2" fill="#ef4444" />
          <text x="39" y="1" fill="#c9a86c" fontSize="2.5">Replicable</text>
        </g>
      </svg>
    </div>
  )
}

// Lista de características de replicabilidad
function ReplicabilityFeatures() {
  const features = [
    { icon: CheckCircle, text: "Arquitectura modular — de 1 a 100 nodos" },
    { icon: CheckCircle, text: "Software 100% open source (MIT)" },
    { icon: CheckCircle, text: "Hardware abierto (CERN-OHL)" },
    { icon: CheckCircle, text: "Sin dependencias corporativas" },
    { icon: Languages, text: "Adaptable: Wayuunaiki, Emberá, Zenú, Raizal..." },
  ]

  return (
    <div className="space-y-3">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="flex items-center gap-3"
        >
          <feature.icon className="text-[#22c55e]" size={18} />
          <span className="text-[#c9a86c]/90 text-sm">{feature.text}</span>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 p-4 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-lg"
      >
        <p className="text-[#22c55e] font-bold text-lg mb-1">
          Costo nodo adicional:
        </p>
        <p className="text-[#22c55e]/80 text-2xl font-bold">
          $1.2M - $1.5M COP
        </p>
        <p className="text-[#c9a86c]/60 text-xs mt-2">
          Con mano de obra comunitaria, incluso menos
        </p>
      </motion.div>
    </div>
  )
}

export function SlideReplicability() {
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
          <Map className="text-[#2d8bb8]" size={28} />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#c9a86c]">
              Potencial de Réplica
            </h2>
            <p className="text-[#c9a86c]/60 text-sm">
              86 puntos críticos en Colombia (INVEMAR)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="h-full flex flex-col md:flex-row items-center justify-center pt-20 pb-8 px-4 gap-8">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full md:w-1/2"
        >
          <ColombiaReplicabilityMap />
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full md:w-1/2 max-w-sm"
        >
          <ReplicabilityFeatures />
        </motion.div>
      </div>

      {/* Bottom regions list */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0d0a08] to-transparent"
      >
        <div className="flex flex-wrap justify-center gap-2 text-xs text-[#c9a86c]/60">
          <span className="flex items-center gap-1">
            <Globe2 size={12} className="text-[#2d8bb8]" />
            <strong className="text-[#2d8bb8]">CARIBE:</strong> La Guajira, Magdalena, Atlántico, Bolívar, Sucre, Córdoba
          </span>
          <span>|</span>
          <span className="flex items-center gap-1">
            <Globe2 size={12} className="text-[#22c55e]" />
            <strong className="text-[#22c55e]">PACÍFICO:</strong> Chocó, Valle, Cauca, Nariño
          </span>
          <span>|</span>
          <span className="flex items-center gap-1">
            <strong className="text-[#f59e0b]">INSULAR:</strong> San Andrés y Providencia
          </span>
        </div>
      </motion.div>
    </div>
  )
}
