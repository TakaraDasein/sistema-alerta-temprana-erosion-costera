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
  Map
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
            <CurrentSlideComponent key={`slide-${currentSlide}`} />
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
              <CurrentSlideComponent />
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
          <motion.button
            onClick={() => goToSlide(0)}
            className="p-2 rounded-full hover:bg-[#c9a86c]/20 transition-colors text-[#c9a86c] relative"
            aria-label="Ir al inicio"
            animate={{
              scale: currentSlide === 0 ? [1, 1.3, 1] : 1,
              boxShadow: currentSlide === 0 
                ? ["0 0 0 0 rgba(201, 168, 108, 0)", "0 0 0 8px rgba(201, 168, 108, 0.3)", "0 0 0 0 rgba(201, 168, 108, 0)"]
                : "0 0 0 0 rgba(201, 168, 108, 0)"
            }}
            transition={{
              scale: { duration: 0.6, repeat: currentSlide === 0 ? Infinity : 0, repeatDelay: 2 },
              boxShadow: { duration: 0.6, repeat: currentSlide === 0 ? Infinity : 0, repeatDelay: 2 }
            }}
          >
            <Home size={18} />
          </motion.button>

          {/* SAT button */}
          <motion.button
            onClick={() => goToSlide(1)}
            className="p-2 rounded-full hover:bg-[#2d8bb8]/20 transition-colors text-[#2d8bb8] relative"
            aria-label="Sistema de Alerta Temprana"
            animate={{
              scale: currentSlide === 1 ? [1, 1.3, 1] : 1,
              boxShadow: currentSlide === 1 
                ? ["0 0 0 0 rgba(45, 139, 184, 0)", "0 0 0 8px rgba(45, 139, 184, 0.3)", "0 0 0 0 rgba(45, 139, 184, 0)"]
                : "0 0 0 0 rgba(45, 139, 184, 0)"
            }}
            transition={{
              scale: { duration: 0.6, repeat: currentSlide === 1 ? Infinity : 0, repeatDelay: 2 },
              boxShadow: { duration: 0.6, repeat: currentSlide === 1 ? Infinity : 0, repeatDelay: 2 }
            }}
          >
            <AlertTriangle size={18} />
          </motion.button>

          {/* Map button - Dibulla */}
          <motion.button
            onClick={() => goToSlide(2)}
            className="p-2 rounded-full hover:bg-red-500/20 transition-colors text-red-500 relative"
            aria-label="Mapa de Dibulla"
            animate={{
              scale: currentSlide === 2 ? [1, 1.3, 1] : 1,
              boxShadow: currentSlide === 2 
                ? ["0 0 0 0 rgba(239, 68, 68, 0)", "0 0 0 8px rgba(239, 68, 68, 0.3)", "0 0 0 0 rgba(239, 68, 68, 0)"]
                : "0 0 0 0 rgba(239, 68, 68, 0)"
            }}
            transition={{
              scale: { duration: 0.6, repeat: currentSlide === 2 ? Infinity : 0, repeatDelay: 2 },
              boxShadow: { duration: 0.6, repeat: currentSlide === 2 ? Infinity : 0, repeatDelay: 2 }
            }}
          >
            <Map size={18} />
          </motion.button>

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

      {/* Slide counter */}
      <div className="absolute top-4 right-4 z-50">
        <div className="bg-[#1a1510]/80 backdrop-blur-sm border border-[#c9a86c]/30 rounded-lg px-3 py-1">
          <span className="text-[#c9a86c] text-sm font-mono">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Current slide title - Movido a la derecha debajo del contador */}
      <div className="absolute top-16 right-4 z-50">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1510]/80 backdrop-blur-sm border border-[#c9a86c]/30 rounded-lg px-3 py-1"
        >
          <span className="text-[#c9a86c] text-xs">
            {slides[currentSlide].title}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
