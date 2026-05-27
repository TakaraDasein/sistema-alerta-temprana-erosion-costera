"use client"

import { motion } from "framer-motion"
import { Radio, Users, Smartphone, Wifi } from "lucide-react"
import { useEffect, useState } from "react"

// Animación de red mesh
function MeshNetworkAnimation() {
  const [activeNodes, setActiveNodes] = useState<number[]>([])
  const [signalPaths, setSignalPaths] = useState<{from: number, to: number}[]>([])

  const nodes = [
    { id: 0, x: 50, y: 15, type: "sensor", label: "Nodo Sensor" },
    { id: 1, x: 20, y: 45, type: "community", label: "Vigía 1" },
    { id: 2, x: 40, y: 50, type: "fisher", label: "Pescador 1" },
    { id: 3, x: 60, y: 45, type: "tourist", label: "Turista" },
    { id: 4, x: 80, y: 50, type: "fisher", label: "Pescador 2" },
    { id: 5, x: 30, y: 75, type: "community", label: "Vigía 2" },
    { id: 6, x: 50, y: 80, type: "community", label: "Vigía 3" },
    { id: 7, x: 70, y: 75, type: "fisher", label: "Pescador 3" },
  ]

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
    { from: 1, to: 5 },
    { from: 2, to: 5 },
    { from: 2, to: 6 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 4, to: 7 },
    { from: 5, to: 6 },
    { from: 6, to: 7 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      // Simular propagación de señal
      const randomConnection = connections[Math.floor(Math.random() * connections.length)]
      setSignalPaths(prev => [...prev.slice(-3), randomConnection])
      setActiveNodes(prev => {
        const newActive = [...prev, randomConnection.to]
        return newActive.slice(-4)
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const getNodeColor = (type: string) => {
    switch (type) {
      case "sensor": return "#2d8bb8"
      case "community": return "#22c55e"
      case "fisher": return "#f59e0b"
      case "tourist": return "#a855f7"
      default: return "#c9a86c"
    }
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "sensor": return "📡"
      case "community": return "👁️"
      case "fisher": return "🎣"
      case "tourist": return "🎒"
      default: return "📱"
    }
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-auto">
        {/* Ondas de radio desde el sensor central */}
        {[1, 2, 3].map((ring) => (
          <motion.circle
            key={ring}
            cx={nodes[0].x}
            cy={nodes[0].y}
            r={ring * 12}
            fill="none"
            stroke="#2d8bb8"
            strokeWidth="0.3"
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ 
              opacity: [0.5, 0.1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: ring * 0.5
            }}
          />
        ))}

        {/* Conexiones entre nodos */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from)!
          const toNode = nodes.find(n => n.id === conn.to)!
          const isActive = signalPaths.some(
            p => (p.from === conn.from && p.to === conn.to) ||
                 (p.from === conn.to && p.to === conn.from)
          )

          return (
            <motion.line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isActive ? "#22c55e" : "#c9a86c30"}
              strokeWidth={isActive ? 1 : 0.5}
              strokeDasharray={isActive ? "none" : "2,2"}
              animate={{
                stroke: isActive ? "#22c55e" : "#c9a86c30",
                strokeWidth: isActive ? 1.5 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          )
        })}

        {/* Nodos */}
        {nodes.map((node) => {
          const isActive = activeNodes.includes(node.id)
          const color = getNodeColor(node.type)

          return (
            <g key={node.id}>
              {/* Pulso de activación */}
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={5}
                  fill={color}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Nodo principal */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.type === "sensor" ? 5 : 3.5}
                fill={`${color}30`}
                stroke={color}
                strokeWidth={isActive ? 1.5 : 0.8}
                animate={{
                  scale: isActive ? 1.2 : 1
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Icono */}
              <text
                x={node.x}
                y={node.y + 1.5}
                textAnchor="middle"
                fontSize={node.type === "sensor" ? 4 : 3}
              >
                {getNodeIcon(node.type)}
              </text>

              {/* Label */}
              <text
                x={node.x}
                y={node.y + (node.type === "sensor" ? 10 : 8)}
                textAnchor="middle"
                fill="#c9a86c"
                fontSize="2.5"
                opacity={0.8}
              >
                {node.label}
              </text>
            </g>
          )
        })}

        {/* Leyenda */}
        <g transform="translate(5, 90)">
          <circle cx="3" cy="0" r="2" fill="#22c55e30" stroke="#22c55e" strokeWidth="0.5" />
          <text x="7" y="1" fill="#c9a86c" fontSize="2.5">Vigía</text>
          
          <circle cx="23" cy="0" r="2" fill="#f59e0b30" stroke="#f59e0b" strokeWidth="0.5" />
          <text x="27" y="1" fill="#c9a86c" fontSize="2.5">Pescador</text>
          
          <circle cx="48" cy="0" r="2" fill="#a855f730" stroke="#a855f7" strokeWidth="0.5" />
          <text x="52" y="1" fill="#c9a86c" fontSize="2.5">Turista</text>
        </g>
      </svg>
    </div>
  )
}

// Información del nodo personal
function PersonalNodeInfo() {
  const features = [
    { icon: Smartphone, text: "Nodo personal Meshtastic", highlight: "$149.300 COP" },
    { icon: Wifi, text: "Sin SIM, sin mensualidades", highlight: "$0/mes" },
    { icon: Radio, text: "Recibe alertas automáticamente", highlight: "24/7" },
    { icon: Users, text: "Amplía la red (store-and-forward)", highlight: "∞ alcance" },
  ]

  return (
    <div className="space-y-3">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.15 }}
          className="flex items-center gap-3 bg-[#1a1510]/80 border border-[#c9a86c]/20 rounded-lg p-3"
        >
          <feature.icon className="text-[#2d8bb8]" size={20} />
          <span className="text-[#c9a86c]/80 text-sm flex-1">{feature.text}</span>
          <span className="text-[#22c55e] font-bold text-sm">{feature.highlight}</span>
        </motion.div>
      ))}
    </div>
  )
}

export function SlideLoRaNetwork() {
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
          <Radio className="text-[#22c55e]" size={28} />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#c9a86c]">
              Red LoRa Comunitaria
            </h2>
            <p className="text-[#c9a86c]/60 text-sm">
              Meshtastic · 915 MHz · Acceso Abierto
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="h-full flex flex-col md:flex-row items-center justify-center pt-20 pb-8 px-4 gap-8">
        {/* Network animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full md:w-1/2"
        >
          <MeshNetworkAnimation />
        </motion.div>

        {/* Node info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full md:w-1/2 max-w-sm"
        >
          <h3 className="text-lg font-semibold text-[#c9a86c] mb-4">
            Cada nodo personal:
          </h3>
          <PersonalNodeInfo />

          {/* Legal note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 p-3 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-lg"
          >
            <p className="text-[#22c55e] text-xs">
              <strong>Banda 915 MHz: USO LIBRE</strong> en Colombia
              <br />
              <span className="text-[#22c55e]/70">
                Resolución ANE 711/2016 · Sin permisos requeridos
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
