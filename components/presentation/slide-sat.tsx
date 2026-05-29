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

type SlideSATProps = {
  showLabels?: boolean
  onLabelChange?: (value: boolean) => void
}

export function SlideSAT({ showLabels: externalShowLabels, onLabelChange }: SlideSATProps = {}) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [internalShowLabels, setInternalShowLabels] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [userInteracted, setUserInteracted] = useState(false)
  const [lastInteractionTime, setLastInteractionTime] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)

  // Usar prop externa si existe, sino usar estado interno
  const showLabels = externalShowLabels !== undefined ? externalShowLabels : internalShowLabels

  // Alternancia automática cada 3 segundos - pausar 10s después de interacción manual
  useEffect(() => {
    const now = Date.now()
    const timeSinceInteraction = now - lastInteractionTime
    
    // Si el usuario interactuó hace menos de 10 segundos, no hacer auto-toggle
    if (userInteracted && timeSinceInteraction < 10000) {
      const remainingTime = 10000 - timeSinceInteraction
      const timeout = setTimeout(() => {
        setUserInteracted(false)
      }, remainingTime)
      return () => clearTimeout(timeout)
    }
    
    // Auto-toggle cada 3 segundos
    const interval = setInterval(() => {
      if (externalShowLabels !== undefined && onLabelChange) {
        onLabelChange(!externalShowLabels)
      } else {
        setInternalShowLabels(prev => !prev)
      }
    }, 3000)
    
    return () => clearInterval(interval)
  }, [externalShowLabels, onLabelChange, userInteracted, lastInteractionTime])

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
      {/* Título principal - REMOVIDO, ahora está en presentation-viewer */}

      {/* Botón toggle movido - será reemplazado por control en presentation-viewer */}

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
        className="absolute inset-0 z-0 flex items-center justify-center px-16"
      >
        <div className="relative w-full h-full max-h-full">
          <AnimatePresence mode="wait">
            {!showLabels ? (
              <motion.div
                key="sinfondo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/sat/sat-sinfondo.svg"
                    alt="SAT Sin Fondo"
                    fill
                    className="object-contain"
                    priority
                    style={{ maxHeight: '100%' }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="pitchslide"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  filter: `drop-shadow(0 0 ${Math.max(10 - mousePosition.x / 50, 2)}px rgba(45, 139, 184, 0.5))
                           drop-shadow(0 0 ${Math.max(10 - mousePosition.y / 50, 2)}px rgba(201, 168, 108, 0.3))`
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/sat/hardware-etiqutas.svg"
                    alt="SAT Con Etiquetas Hardware"
                    fill
                    className="object-contain"
                    priority
                    style={{ maxHeight: '100%' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Labels minimalistas y compactos en los bordes */}
      {sections.map((section, index) => {
        const Icon = section.icon
        const isHovered = hoveredSection === section.id
        
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: section.edge === 'left' ? -30 : section.edge === 'right' ? 30 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.08 }}
            className="absolute z-40"
            style={getButtonPosition(section.edge, section.position)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="group relative cursor-pointer">
              {/* Label minimalista compacto */}
              <motion.div 
                animate={{ 
                  scale: isHovered ? 1.02 : 1,
                  x: isHovered ? (section.edge === 'left' ? 4 : section.edge === 'right' ? -4 : 0) : 0
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`relative px-3 py-1.5 rounded-md transition-all duration-200 flex items-center gap-2 ${
                  isHovered 
                    ? 'bg-[#2d8bb8]/15 border border-[#2d8bb8]/60' 
                    : 'bg-[#1a1510]/70 border border-[#2d8bb8]/25'
                }`}
                style={{
                  backdropFilter: 'blur(8px)',
                  boxShadow: isHovered 
                    ? '0 2px 12px rgba(45, 139, 184, 0.25)'
                    : '0 1px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Icon 
                  size={14} 
                  className="transition-colors flex-shrink-0"
                  style={{ color: isHovered ? '#2d8bb8' : 'rgba(45, 139, 184, 0.6)' }}
                  strokeWidth={2}
                />
                <span 
                  className="text-[10px] font-medium tracking-wide uppercase transition-colors whitespace-nowrap"
                  style={{ 
                    color: isHovered ? '#c9a86c' : 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {section.title}
                </span>
              </motion.div>

              {/* Línea de conexión al panel */}
              {isHovered && (
                <motion.div
                  initial={{ scaleX: 0, scaleY: 0 }}
                  animate={{ scaleX: 1, scaleY: 1 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute bg-[#2d8bb8]/60
                            ${section.edge === 'left' ? 'left-full h-[1px] w-6 top-1/2 -translate-y-1/2' : ''}
                            ${section.edge === 'right' ? 'right-full h-[1px] w-6 top-1/2 -translate-y-1/2' : ''}
                            ${section.edge === 'top' ? 'top-full w-[1px] h-6 left-1/2 -translate-x-1/2' : ''}
                            ${section.edge === 'bottom' ? 'bottom-full w-[1px] h-6 left-1/2 -translate-x-1/2' : ''}
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
