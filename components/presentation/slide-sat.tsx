"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  GitBranch, 
  Activity, 
  BarChart3, 
  GitCompare, 
  Cloud, 
  AlertTriangle,
  Tag,
  Tags
} from "lucide-react"
import Image from "next/image"

type EdgePosition = "top" | "right" | "bottom" | "left"

type Section = {
  id: string
  title: string
  svgPath: string
  edge: EdgePosition
  position: string
  icon: React.ElementType
}

const sections: Section[] = [
  {
    id: "proceso",
    title: "Proceso",
    svgPath: "/sat/proceso.svg",
    edge: "left",
    position: "25%",
    icon: GitBranch
  },
  {
    id: "vulnerabilidad",
    title: "Contaminación y Vulnerabilidad",
    svgPath: "/sat/conta vulne.svg",
    edge: "left",
    position: "50%",
    icon: AlertTriangle
  },
  {
    id: "biodiversidad",
    title: "Cambio Climático y Biodiversidad",
    svgPath: "/sat/cambio- biodiversi.svg",
    edge: "left",
    position: "75%",
    icon: Cloud
  },
  {
    id: "sinoptica",
    title: "Sinóptica",
    svgPath: "/sat/sinoptica.svg",
    edge: "right",
    position: "25%",
    icon: Activity
  },
  {
    id: "variables",
    title: "Tipos de Variables",
    svgPath: "/sat/tipos de variables.svg",
    edge: "right",
    position: "50%",
    icon: BarChart3
  },
  {
    id: "vs",
    title: "O'u Pale Mma vs Sistemas Tradicionales",
    svgPath: "/sat/vs.svg",
    edge: "right",
    position: "75%",
    icon: GitCompare
  }
]

const getButtonPosition = (edge: EdgePosition, position: string) => {
  switch (edge) {
    case "left":
      return { left: "2rem", top: position }
    case "right":
      return { right: "2rem", top: position }
    case "top":
      return { top: "2rem", left: position }
    case "bottom":
      return { bottom: "2rem", left: position }
  }
}

const getPanelAnimation = (edge: EdgePosition) => {
  switch (edge) {
    case "left":
      return { initial: { x: -400, opacity: 0 }, animate: { x: 0, opacity: 1 } }
    case "right":
      return { initial: { x: 400, opacity: 0 }, animate: { x: 0, opacity: 1 } }
    case "top":
      return { initial: { y: -400, opacity: 0 }, animate: { y: 0, opacity: 1 } }
    case "bottom":
      return { initial: { y: 400, opacity: 0 }, animate: { y: 0, opacity: 1 } }
  }
}

const getPanelPosition = (edge: EdgePosition) => {
  switch (edge) {
    case "left":
      return "left-0 top-0 bottom-0 w-[50%]"
    case "right":
      return "right-0 top-0 bottom-0 w-[50%]"
    case "top":
      return "top-0 left-0 right-0 h-[50%]"
    case "bottom":
      return "bottom-0 left-0 right-0 h-[50%]"
  }
}

export function SlideSAT() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [showLabels, setShowLabels] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  // Alternancia automática cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLabels(prev => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const activeSection = sections.find(s => s.id === hoveredSection)

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Título principal */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-4 left-0 right-0 text-center z-30"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#c9a86c] mb-1">
          Sistema de Alerta Temprana
        </h1>
        <p className="text-sm text-[#c9a86c]/70">
          O'u Pale Mma - Infraestructura Comunitaria Abierta
        </p>
      </motion.div>

      {/* Botón toggle para cambiar entre SVGs */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-20 right-8 z-30"
      >
        <button
          onClick={() => setShowLabels(!showLabels)}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full
                   bg-[#1a1510]/60 backdrop-blur-sm border border-[#2d8bb8]/30
                   hover:border-[#2d8bb8]/60 hover:bg-[#1a1510]/80
                   transition-all duration-300"
        >
          {showLabels ? (
            <>
              <Tags size={16} className="text-[#2d8bb8]" />
              <span className="text-xs text-[#c9a86c]/70 group-hover:text-[#c9a86c]">
                Con etiquetas
              </span>
            </>
          ) : (
            <>
              <Tag size={16} className="text-[#2d8bb8]/60" />
              <span className="text-xs text-[#c9a86c]/70 group-hover:text-[#c9a86c]">
                Sin etiquetas
              </span>
            </>
          )}
        </button>
      </motion.div>

      {/* Partículas sutiles de fondo - delgadas y alargadas */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-blue-${i}`}
            className="absolute w-0.5 bg-gradient-to-b from-transparent via-[#2d8bb8]/20 to-transparent"
            style={{
              height: `${30 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -100, -200],
              x: [0, (Math.random() - 0.5) * 40],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`particle-gold-${i}`}
            className="absolute w-0.5 bg-gradient-to-b from-transparent via-[#c9a86c]/15 to-transparent"
            style={{
              height: `${40 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, 150, 300],
              x: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Imagen central con transición entre SVGs */}
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute inset-0 z-0 flex items-center justify-center pt-20 pb-0 px-20"
      >
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {!showLabels ? (
              <motion.div
                key="sinfondo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src="/sat/sat-sinfondo.svg"
                  alt="SAT Sin Fondo"
                  fill
                  className="object-contain opacity-90"
                  priority
                />
              </motion.div>
            ) : (
              <motion.div
                key="pitchslide"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                style={{
                  filter: `drop-shadow(0 0 ${Math.max(10 - mousePosition.x / 50, 2)}px rgba(45, 139, 184, 0.5))
                           drop-shadow(0 0 ${Math.max(10 - mousePosition.y / 50, 2)}px rgba(201, 168, 108, 0.3))`
                }}
              >
                <Image
                  src="/sat/hardware-etiqutas.svg"
                  alt="SAT Con Etiquetas Hardware"
                  fill
                  className="object-contain opacity-90"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Botones en los bordes */}
      {sections.map((section, index) => {
        const Icon = section.icon
        const isHovered = hoveredSection === section.id
        
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="absolute z-40"
            style={getButtonPosition(section.edge, section.position)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="group relative">
              {/* Área de detección invisible más grande */}
              <div className="absolute -inset-4" />
              
              {/* Botón principal - SIEMPRE VISIBLE */}
              <motion.div 
                animate={{ 
                  scale: isHovered ? 1.15 : 1
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-14 h-14 rounded-full transition-all duration-300
                          flex items-center justify-center
                          bg-[#1a1510]/90 border-2 border-[#2d8bb8]/60 hover:border-[#2d8bb8] 
                          hover:bg-[#1a1510] shadow-lg shadow-[#2d8bb8]/30"
              >
                <Icon 
                  size={22} 
                  className="transition-colors text-[#2d8bb8] group-hover:text-[#c9a86c]"
                />
              </motion.div>

              {/* Línea de conexión al panel */}
              {isHovered && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute bg-gradient-to-r from-[#2d8bb8] to-transparent
                            ${section.edge === 'left' ? 'left-full h-0.5 w-8' : ''}
                            ${section.edge === 'right' ? 'right-full h-0.5 w-8' : ''}
                            ${section.edge === 'top' ? 'top-full w-0.5 h-8 left-1/2 -translate-x-1/2' : ''}
                            ${section.edge === 'bottom' ? 'bottom-full w-0.5 h-8 left-1/2 -translate-x-1/2' : ''}
                  `}
                />
              )}
            </div>
          </motion.div>
        )
      })}

      {/* Panel expandido desde el borde */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            {...getPanelAnimation(activeSection.edge)}
            exit={{ 
              ...getPanelAnimation(activeSection.edge).initial, 
              transition: { duration: 0.2 } 
            }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`absolute ${getPanelPosition(activeSection.edge)} z-45 
                      bg-[#0d0a08]/98 backdrop-blur-md border-2 border-[#2d8bb8]/70
                      shadow-2xl shadow-[#2d8bb8]/30 pointer-events-none`}
          >
            {/* Header del panel */}
            <div className="relative p-6 border-b border-[#c9a86c]/20">
              <div className="flex items-center gap-3">
                {activeSection.icon && (
                  <div className="w-12 h-12 rounded-full bg-[#2d8bb8]/20 flex items-center justify-center">
                    <activeSection.icon size={24} className="text-[#2d8bb8]" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-[#c9a86c] flex-1">
                  {activeSection.title}
                </h2>
              </div>
            </div>

            {/* Contenido del panel - MÁS GRANDE Y PROPORCIONAL */}
            <div className="p-8 h-[calc(100%-100px)] overflow-auto">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full max-w-full max-h-full">
                  <Image
                    src={activeSection.svgPath}
                    alt={activeSection.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
