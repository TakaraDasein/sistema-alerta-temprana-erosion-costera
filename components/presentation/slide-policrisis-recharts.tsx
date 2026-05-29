"use client"

import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { Thermometer, Trees, Factory, Waves, Globe2, AlertTriangle } from "lucide-react"

// Datos: Ascenso del nivel del mar (IPCC, 2021)
const seaLevelData = [
  { year: 1985, nivel: 0, escenario: "Histórico" },
  { year: 1990, nivel: 0.05, escenario: "Histórico" },
  { year: 1995, nivel: 0.08, escenario: "Histórico" },
  { year: 2000, nivel: 0.12, escenario: "Histórico" },
  { year: 2005, nivel: 0.16, escenario: "Histórico" },
  { year: 2010, nivel: 0.20, escenario: "Histórico" },
  { year: 2015, nivel: 0.25, escenario: "Histórico" },
  { year: 2020, nivel: 0.30, escenario: "Histórico" },
  { year: 2025, nivel: 0.35, escenario: "Proyección" },
  { year: 2030, nivel: 0.42, escenario: "RCP 4.5" },
  { year: 2040, nivel: 0.55, escenario: "RCP 4.5" },
  { year: 2050, nivel: 0.70, escenario: "RCP 4.5" },
  { year: 2060, nivel: 0.85, escenario: "RCP 8.5" },
  { year: 2070, nivel: 1.05, escenario: "RCP 8.5" },
  { year: 2080, nivel: 1.30, escenario: "RCP 8.5" },
  { year: 2090, nivel: 1.60, escenario: "RCP 8.5" },
  { year: 2100, nivel: 2.00, escenario: "RCP 8.5" }
]

// Datos: Convergencia de las 3 crisis (índice 0-100)
const policrisisData = [
  { crisis: "Cambio Climático", colombia: 78, global: 85, max: 100 },
  { crisis: "Pérdida Biodiversidad", colombia: 82, global: 75, max: 100 },
  { crisis: "Contaminación", colombia: 68, global: 70, max: 100 },
  { crisis: "Erosión Costera", colombia: 88, global: 65, max: 100 },
  { crisis: "Vulnerabilidad Social", colombia: 75, global: 60, max: 100 }
]

// Datos: Pérdida de manglares en Colombia (INVEMAR)
const mangroveData = [
  { year: 1990, hectareas: 450000, perdida: 0 },
  { year: 1995, hectareas: 435000, perdida: 15000 },
  { year: 2000, hectareas: 418000, perdida: 32000 },
  { year: 2005, hectareas: 398000, perdida: 52000 },
  { year: 2010, hectareas: 380000, perdida: 70000 },
  { year: 2015, hectareas: 365000, perdida: 85000 },
  { year: 2020, hectareas: 352000, perdida: 98000 },
  { year: 2025, hectareas: 340000, perdida: 110000 }
]

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1510] border border-[#c9a86c]/40 rounded-lg p-3 shadow-xl">
        <p className="text-[#c9a86c] font-semibold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function SlidePolicrisis() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#0d0a08] via-[#1a1510] to-[#0d0a08] overflow-hidden">
      {/* Fondo de partículas sutiles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#c9a86c] rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20"
      >
        <div className="flex items-center gap-3">
          <Globe2 className="text-[#2d8bb8]" size={32} />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#c9a86c] mb-1">
              La Policrisis Planetaria
            </h2>
            <p className="text-[#c9a86c]/70 text-sm md:text-base">
              Cambio climático + Pérdida de biodiversidad + Contaminación = Erosión costera acelerada
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main content grid */}
      <div className="h-full pt-28 pb-20 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto">
        {/* Chart 1: Ascenso del nivel del mar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1510]/70 border border-[#c9a86c]/20 rounded-xl p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <Waves className="text-[#2d8bb8]" size={20} />
            <h3 className="text-[#c9a86c] font-semibold text-sm md:text-base">
              Ascenso del Nivel del Mar (1985-2100)
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={seaLevelData}>
              <defs>
                <linearGradient id="colorNivel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d8bb8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2d8bb8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#c9a86c20" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: "#c9a86c", fontSize: 11 }}
                stroke="#c9a86c30"
                interval={2}
              />
              <YAxis 
                tick={{ fill: "#c9a86c", fontSize: 11 }}
                stroke="#c9a86c30"
                label={{ value: "metros", angle: -90, position: "insideLeft", fill: "#c9a86c", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="nivel" 
                stroke="#2d8bb8" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorNivel)" 
                name="Nivel del mar"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#c9a86c]/60 mt-2">
            Fuente: IPCC (2021) - Escenarios RCP 4.5 y RCP 8.5
          </p>
        </motion.div>

        {/* Chart 2: Radar de la Policrisis */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1a1510]/70 border border-[#c9a86c]/20 rounded-xl p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-red-500" size={20} />
            <h3 className="text-[#c9a86c] font-semibold text-sm md:text-base">
              Convergencia de Crisis: Colombia vs Global
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={policrisisData}>
              <PolarGrid stroke="#c9a86c30" />
              <PolarAngleAxis 
                dataKey="crisis" 
                tick={{ fill: "#c9a86c", fontSize: 10 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: "#c9a86c", fontSize: 10 }}
              />
              <Radar 
                name="Colombia" 
                dataKey="colombia" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.5}
                strokeWidth={2}
              />
              <Radar 
                name="Promedio Global" 
                dataKey="global" 
                stroke="#2d8bb8" 
                fill="#2d8bb8" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Legend 
                wrapperStyle={{ fontSize: "11px" }}
                iconType="circle"
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#c9a86c]/60 mt-2">
            Índice de severidad (0-100) - Fuente: PNUMA (2021)
          </p>
        </motion.div>

        {/* Chart 3: Pérdida de manglares */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#1a1510]/70 border border-[#c9a86c]/20 rounded-xl p-4 lg:col-span-2 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <Trees className="text-[#22c55e]" size={20} />
            <h3 className="text-[#c9a86c] font-semibold text-sm md:text-base">
              Pérdida de Manglares en Colombia (1990-2025)
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mangroveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c9a86c20" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: "#c9a86c", fontSize: 11 }}
                stroke="#c9a86c30"
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: "#22c55e", fontSize: 11 }}
                stroke="#22c55e"
                label={{ value: "Hectáreas", angle: -90, position: "insideLeft", fill: "#22c55e", fontSize: 12 }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#ef4444", fontSize: 11 }}
                stroke="#ef4444"
                label={{ value: "Pérdida acum.", angle: 90, position: "insideRight", fill: "#ef4444", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="hectareas" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Área de manglares"
                dot={{ fill: "#22c55e", r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="perdida" 
                stroke="#ef4444" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Pérdida acumulada"
                dot={{ fill: "#ef4444", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#c9a86c]/60 mt-2">
            Fuente: INVEMAR (2024) - Los manglares actúan como barrera natural contra la erosión costera
          </p>
        </motion.div>
      </div>

      {/* Stats destacadas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-3 z-20"
      >
        <div className="bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-lg backdrop-blur-sm">
          <p className="text-red-500 font-bold text-sm md:text-base">+2m nivel del mar (2100)</p>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 px-4 py-2 rounded-lg backdrop-blur-sm">
          <p className="text-orange-500 font-bold text-sm md:text-base">-110,000 ha manglares</p>
        </div>
        <div className="bg-[#2d8bb8]/20 border border-[#2d8bb8]/40 px-4 py-2 rounded-lg backdrop-blur-sm">
          <p className="text-[#2d8bb8] font-bold text-sm md:text-base">86 puntos críticos</p>
        </div>
        <div className="bg-[#c9a86c]/20 border border-[#c9a86c]/40 px-4 py-2 rounded-lg backdrop-blur-sm">
          <p className="text-[#c9a86c] font-bold text-sm md:text-base">3.500+ km costa</p>
        </div>
      </motion.div>

      {/* Panel lateral de las 3 crisis */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
        className="absolute right-4 top-32 w-72 bg-[#1a1510]/90 border border-[#c9a86c]/30 rounded-xl p-4 backdrop-blur-sm hidden xl:block"
      >
        <h3 className="text-[#c9a86c] font-bold mb-3 text-sm">Las 3 Crisis Convergentes</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-2 bg-[#2d8bb8]/10 border border-[#2d8bb8]/30 rounded">
            <Thermometer className="text-[#2d8bb8] flex-shrink-0" size={18} />
            <div>
              <p className="text-[#2d8bb8] font-semibold text-xs mb-1">Cambio Climático</p>
              <p className="text-[#c9a86c]/70 text-xs">Nivel del mar ↑ Oleaje extremo ↑</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded">
            <Trees className="text-[#22c55e] flex-shrink-0" size={18} />
            <div>
              <p className="text-[#22c55e] font-semibold text-xs mb-1">Pérdida de Biodiversidad</p>
              <p className="text-[#c9a86c]/70 text-xs">Manglares ↓ Barrera natural ↓</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded">
            <Factory className="text-[#f59e0b] flex-shrink-0" size={18} />
            <div>
              <p className="text-[#f59e0b] font-semibold text-xs mb-1">Contaminación</p>
              <p className="text-[#c9a86c]/70 text-xs">Ecosistemas costeros degradados</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#c9a86c]/20">
          <p className="text-[#c9a86c] font-semibold text-xs mb-2">Resultado:</p>
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded p-2">
            <Waves className="text-red-500 flex-shrink-0" size={16} />
            <p className="text-red-500 text-xs font-semibold">
              Erosión Costera Acelerada
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
