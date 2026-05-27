"use client"

import { motion } from "framer-motion"
import { Thermometer, Trees, Factory, AlertTriangle, Globe } from "lucide-react"
import { useEffect, useState, useRef, useMemo } from "react"

// Componente de globo terráqueo simplificado con puntos de crisis
function GlobeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => (r + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Fondo del globo
    const gradient = ctx.createRadialGradient(
      centerX - radius * 0.3,
      centerY - radius * 0.3,
      0,
      centerX,
      centerY,
      radius
    )
    gradient.addColorStop(0, "#3a7ca5")
    gradient.addColorStop(0.7, "#2d5f7c")
    gradient.addColorStop(1, "#1a3a4a")

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Continentes simplificados (líneas curvas)
    ctx.strokeStyle = "#4a9c6d"
    ctx.lineWidth = 2
    const rad = (rotation * Math.PI) / 180

    // América
    ctx.beginPath()
    ctx.moveTo(
      centerX + Math.cos(rad) * radius * 0.3,
      centerY - radius * 0.5
    )
    ctx.quadraticCurveTo(
      centerX + Math.cos(rad) * radius * 0.4,
      centerY,
      centerX + Math.cos(rad) * radius * 0.2,
      centerY + radius * 0.6
    )
    ctx.stroke()

    // África/Europa
    ctx.beginPath()
    ctx.moveTo(
      centerX + Math.cos(rad + 2) * radius * 0.5,
      centerY - radius * 0.4
    )
    ctx.quadraticCurveTo(
      centerX + Math.cos(rad + 2) * radius * 0.6,
      centerY + radius * 0.1,
      centerX + Math.cos(rad + 2) * radius * 0.4,
      centerY + radius * 0.5
    )
    ctx.stroke()

    // Puntos de crisis (rojos pulsantes)
    const crisisPoints = [
      { x: 0.3, y: 0.2 },
      { x: -0.4, y: 0.3 },
      { x: 0.5, y: -0.2 },
      { x: -0.2, y: 0.5 },
      { x: 0.1, y: -0.4 },
    ]

    crisisPoints.forEach((point) => {
      const x = centerX + Math.cos(rad) * point.x * radius
      const y = centerY + point.y * radius
      const pulseSize = 3 + Math.sin(Date.now() / 200) * 2

      ctx.beginPath()
      ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = "#ef4444"
      ctx.fill()
    })

    // Borde del globo
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "#ffffff20"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [rotation])

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className="mx-auto"
    />
  )
}

// Componente de diagrama de crisis convergente
function CrisisConvergenceDiagram() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const crisisVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const crises = useMemo(() => [
    {
      icon: Thermometer,
      title: "Cambio Climático",
      effects: ["Nivel del mar ↑", "Oleaje extremo ↑"],
      color: "#ef4444",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500",
    },
    {
      icon: Trees,
      title: "Pérdida de Biodiversidad",
      effects: ["Manglares arrasados", "Barrera natural perdida"],
      color: "#22c55e",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500",
    },
    {
      icon: Factory,
      title: "Contaminación",
      effects: ["Ecosistemas degradados", "Acción erosiva ↑"],
      color: "#a855f7",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500",
    },
  ], [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-3xl mx-auto"
    >
      {/* Crisis circles */}
      <div className="flex justify-center gap-4 md:gap-8 mb-8">
        {crises.map((crisis, index) => (
          <motion.div
            key={index}
            variants={crisisVariants}
            className={`relative p-4 md:p-6 rounded-full ${crisis.bgColor} border-2 ${crisis.borderColor}`}
          >
            <crisis.icon
              size={32}
              style={{ color: crisis.color }}
              className="md:w-10 md:h-10"
            />
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 md:w-40 text-center">
              <p className="text-xs md:text-sm font-semibold text-[#c9a86c]">
                {crisis.title}
              </p>
              {crisis.effects.map((effect, i) => (
                <p key={i} className="text-[10px] md:text-xs text-[#c9a86c]/70">
                  {effect}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Arrows converging */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center mt-20 mb-4"
      >
        <svg width="300" height="60" viewBox="0 0 300 60" className="text-[#c9a86c]">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#c9a86c" />
            </marker>
          </defs>
          <line x1="50" y1="10" x2="140" y2="50" stroke="#c9a86c" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="150" y1="10" x2="150" y2="50" stroke="#c9a86c" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="250" y1="10" x2="160" y2="50" stroke="#c9a86c" strokeWidth="2" markerEnd="url(#arrowhead)" />
        </svg>
      </motion.div>

      {/* Erosion result */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex justify-center"
      >
        <div className="bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 rounded-lg flex items-center gap-3 shadow-lg shadow-red-500/30">
          <AlertTriangle className="text-white" size={28} />
          <div>
            <p className="text-white font-bold text-lg">EROSIÓN COSTERA</p>
            <p className="text-white/80 text-xs">Proceso continuo y acelerado</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function SlidePolicrisis() {
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
          <p className="text-[#c9a86c]/60 text-sm">PNUMA, 2021</p>
        </div>
        <Globe className="text-[#2d8bb8] w-8 h-8 md:w-10 md:h-10" />
      </motion.div>

      {/* Main content */}
      <div className="h-full flex flex-col items-center justify-center pt-20 pb-24 px-4">
        {/* Globe visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <GlobeVisualization />
        </motion.div>

        {/* Crisis convergence diagram */}
        <CrisisConvergenceDiagram />
      </div>

      {/* Bottom stats */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0d0a08] to-transparent"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-center">
          <div className="bg-[#1a1510]/80 px-4 py-2 rounded-lg border border-[#c9a86c]/30">
            <p className="text-2xl md:text-3xl font-bold text-[#2d8bb8]">3,500+</p>
            <p className="text-xs md:text-sm text-[#c9a86c]/80">km de costa Colombia</p>
          </div>
          <div className="bg-[#1a1510]/80 px-4 py-2 rounded-lg border border-[#c9a86c]/30">
            <p className="text-2xl md:text-3xl font-bold text-red-500">86</p>
            <p className="text-xs md:text-sm text-[#c9a86c]/80">puntos críticos (INVEMAR)</p>
          </div>
          <div className="bg-[#1a1510]/80 px-4 py-2 rounded-lg border border-[#c9a86c]/30">
            <p className="text-2xl md:text-3xl font-bold text-orange-500">1.4-5m</p>
            <p className="text-xs md:text-sm text-[#c9a86c]/80">retroceso por año</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
