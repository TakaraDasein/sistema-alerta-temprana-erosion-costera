"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Home,
  Maximize2,
  Minimize2,
  AlertTriangle,
  Map,
  Tag,
  Tags
} from "lucide-react"
import { SlideTitle } from "./slide-title"
import { SlideSAT } from "./slide-sat"
import { SlidePolicrisis } from "./slide-policrisis"
import { SlideDibulla } from "./slide-dibulla-ux-improved"
import { SlideArchitecture } from "./slide-architecture"
import { SlideLoRaNetwork } from "./slide-lora-network"
import { SlideCostComparison } from "./slide-cost-comparison"
import { SlideReplicability } from "./slide-replicability"
import { SlideClosing } from "./slide-closing"
import { ParticleBackground } from "./particle-background"

const slides = [
  { id: 0, component: SlideTitle, title: "Portada" },
  { id: 1, component: SlideSAT, title: "Sistema de Alerta Temprana" },
  { id: 2, component: SlideDibulla, title: "Dibulla - Mapa de Puntos Críticos" },
  { id: 3, component: SlidePolicrisis, title: "Policrisis Planetaria" },
  { id: 4, component: SlideArchitecture, title: "Arquitectura" },
  { id: 5, component: SlideLoRaNetwork, title: "Red LoRa" },
  { id: 6, component: SlideCostComparison, title: "Comparativa de Costos" },
  { id: 7, component: SlideReplicability, title: "Replicabilidad" },
  { id: 8, component: SlideClosing, title: "Cierre" },
]

export function PresentationViewer() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSATLabels, setShowSATLabels] = useState(false)
  const [satUserInteracted, setSatUserInteracted] = useState(false)
  const [satLastInteraction, setSatLastInteraction] = useState(0)

  const handleSATLabelToggle = () => {
    setShowSATLabels(!showSATLabels)
    setSatUserInteracted(true)
    setSatLastInteraction(Date.now())
  }

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index)
    }
  }, [])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goToSlide])

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 8000) // 8 seconds per slide

    return () => clearInterval(interval)
  }, [isPlaying, nextSlide])

  // Auto-toggle SAT labels cada 3 segundos (pausar 10s después de interacción)
  useEffect(() => {
    if (currentSlide !== 1) return // Solo en slide SAT
    
    const now = Date.now()
    const timeSinceInteraction = now - satLastInteraction
    
    // Si el usuario interactuó hace menos de 10 segundos, esperar
    if (satUserInteracted && timeSinceInteraction < 10000) {
      const remainingTime = 10000 - timeSinceInteraction
      const timeout = setTimeout(() => {
        setSatUserInteracted(false)
      }, remainingTime)
      return () => clearTimeout(timeout)
    }
    
    // Auto-toggle cada 3 segundos
    const interval = setInterval(() => {
      if (!satUserInteracted) {
        setShowSATLabels(prev => !prev)
      }
    }, 3000)
    
    return () => clearInterval(interval)
  }, [currentSlide, satUserInteracted, satLastInteraction])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          nextSlide()
          break
        case "ArrowLeft":
          prevSlide()
          break
        case "Home":
          goToSlide(0)
          break
        case "End":
          goToSlide(slides.length - 1)
          break
        case "Escape":
          setIsFullscreen(false)
          break
        case "f":
        case "F":
          toggleFullscreen()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const CurrentSlideComponent = slides[currentSlide].component

  // El mapa de Dibulla necesita persistir sin desmontarse (ahora es slide 2)
  const shouldPreserveComponent = currentSlide === 2
  
  return (
    <div className="relative h-screen w-full bg-[#0d0a08] overflow-hidden">
      {/* Main slide area */}
      <div className="relative h-full w-full z-10">
        {shouldPreserveComponent ? (
          // Renderizado directo sin AnimatePresence para preservar el estado del mapa
          <div className="absolute inset-0 z-20">
            <CurrentSlideComponent 
              key={`slide-${currentSlide}`} 
              {...(currentSlide === 1 ? { showLabels: showSATLabels } : {})}
            />
          </div>
        ) : (
          // AnimatePresence normal para otros slides  
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20"
            >
              <CurrentSlideComponent 
                {...(currentSlide === 1 ? { showLabels: showSATLabels } : {})}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Partículas — encima de los slides, debajo de controles */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 bg-[#1a1510]/90 backdrop-blur-sm border border-[#c9a86c]/30 rounded-full px-4 py-2">
          {/* Home button */}
          <button
            onClick={() => goToSlide(0)}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentSlide === 0 
                ? "bg-[#c9a86c]/20 text-[#c9a86c]" 
                : "text-[#c9a86c]/40 hover:text-[#c9a86c]/70 hover:bg-[#c9a86c]/5"
            }`}
            aria-label="Ir al inicio"
          >
            <Home size={16} strokeWidth={currentSlide === 0 ? 2.5 : 2} />
          </button>

          {/* SAT button */}
          <button
            onClick={() => goToSlide(1)}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentSlide === 1 
                ? "bg-[#2d8bb8]/20 text-[#2d8bb8]" 
                : "text-[#2d8bb8]/40 hover:text-[#2d8bb8]/70 hover:bg-[#2d8bb8]/5"
            }`}
            aria-label="Sistema de Alerta Temprana"
          >
            <AlertTriangle size={16} strokeWidth={currentSlide === 1 ? 2.5 : 2} />
          </button>

          {/* Map button - Dibulla */}
          <button
            onClick={() => goToSlide(2)}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentSlide === 2 
                ? "bg-red-500/20 text-red-500" 
                : "text-red-500/40 hover:text-red-500/70 hover:bg-red-500/5"
            }`}
            aria-label="Mapa de Dibulla"
          >
            <Map size={16} strokeWidth={currentSlide === 2 ? 2.5 : 2} />
          </button>

          {/* SAT button - vertical rectangle */}
          <button
            onClick={() => goToSlide(1)}
            className={`relative w-10 h-12 rounded-lg transition-all duration-300 flex items-center justify-center ${
              currentSlide === 1 
                ? "bg-[#2d8bb8]/20 border-2 border-[#2d8bb8]" 
                : "border-2 border-[#2d8bb8]/20 hover:border-[#2d8bb8]/40 hover:bg-[#2d8bb8]/10"
            }`}
            style={currentSlide === 1 ? {
              boxShadow: "0 0 12px rgba(45, 139, 184, 0.5), inset 0 0 8px rgba(45, 139, 184, 0.2)"
            } : {}}
            aria-label="Sistema de Alerta Temprana"
          >
            <AlertTriangle 
              size={18} 
              strokeWidth={currentSlide === 1 ? 2.5 : 2}
              className={currentSlide === 1 ? "text-[#2d8bb8]" : "text-[#2d8bb8]/50"}
            />
          </button>

          {/* Map button - Dibulla - vertical rectangle */}
          <button
            onClick={() => goToSlide(2)}
            className={`relative w-10 h-12 rounded-lg transition-all duration-300 flex items-center justify-center ${
              currentSlide === 2 
                ? "bg-red-500/20 border-2 border-red-500" 
                : "border-2 border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10"
            }`}
            style={currentSlide === 2 ? {
              boxShadow: "0 0 12px rgba(239, 68, 68, 0.5), inset 0 0 8px rgba(239, 68, 68, 0.2)"
            } : {}}
            aria-label="Mapa de Dibulla"
          >
            <Map 
              size={18} 
              strokeWidth={currentSlide === 2 ? 2.5 : 2}
              className={currentSlide === 2 ? "text-red-500" : "text-red-500/50"}
            />
          </button>

          {/* Previous */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full hover:bg-[#c9a86c]/20 transition-colors text-[#c9a86c]"
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Slide indicators */}
          <div className="flex items-center gap-1 px-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#2d8bb8] w-6"
                    : "bg-[#c9a86c]/40 hover:bg-[#c9a86c]/60"
                }`}
                aria-label={`Ir a ${slide.title}`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-full hover:bg-[#c9a86c]/20 transition-colors text-[#c9a86c]"
            aria-label="Siguiente diapositiva"
          >
            <ChevronRight size={20} />
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-full transition-colors ${
              isPlaying 
                ? "bg-[#22c55e]/20 text-[#22c55e]" 
                : "hover:bg-[#c9a86c]/20 text-[#c9a86c]"
            }`}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full hover:bg-[#c9a86c]/20 transition-colors text-[#c9a86c]"
            aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Slide counter + SAT Labels Toggle */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        {/* SAT Labels Toggle - Solo visible en slide SAT */}
        {currentSlide === 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={handleSATLabelToggle}
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg
                     backdrop-blur-md border transition-all duration-200 ${
                       showSATLabels 
                         ? 'bg-[#2d8bb8]/15 border-[#2d8bb8]/60' 
                         : 'bg-[#1a1510]/90 border-[#2d8bb8]/30 hover:border-[#2d8bb8]/50'
                     }`}
            aria-label="Toggle SAT labels"
          >
            {/* Contenido */}
            <div className="relative flex items-center gap-2">
              {showSATLabels ? (
                <Tags size={14} className="text-[#2d8bb8]" strokeWidth={2.5} />
              ) : (
                <Tag size={14} className="text-[#c9a86c]/60" strokeWidth={2} />
              )}
              
              <span className={`text-xs font-medium tracking-wide transition-colors ${
                showSATLabels 
                  ? 'text-[#c9a86c]' 
                  : 'text-[#c9a86c]/50'
              }`}>
                {showSATLabels ? 'Etiquetas' : 'Hardware'}
              </span>
            </div>
            
            {/* Indicador de estado sutil */}
            <div className={`w-1 h-1 rounded-full transition-all duration-200 ${
              showSATLabels 
                ? 'bg-[#2d8bb8] opacity-100' 
                : 'bg-[#c9a86c]/20 opacity-60'
            }`} />
          </motion.button>
        )}
        
        {/* Counter */}
        <div className="bg-[#1a1510]/80 backdrop-blur-sm border border-[#c9a86c]/30 rounded-lg px-3 py-1.5">
          <span className="text-[#c9a86c] text-sm font-mono">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  )
}
