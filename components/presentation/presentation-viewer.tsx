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
  AlertTriangle
} from "lucide-react"
import { SlideTitle } from "./slide-title"
import { SlideSAT } from "./slide-sat"
import { SlidePolicrisis } from "./slide-policrisis"
import { SlideDibulla } from "./slide-dibulla"
import { SlideArchitecture } from "./slide-architecture"
import { SlideLoRaNetwork } from "./slide-lora-network"
import { SlideCostComparison } from "./slide-cost-comparison"
import { SlideReplicability } from "./slide-replicability"
import { SlideClosing } from "./slide-closing"
import { ParticleBackground } from "./particle-background"

const slides = [
  { id: 0, component: SlideTitle, title: "Portada" },
  { id: 1, component: SlideSAT, title: "Sistema de Alerta Temprana" },
  { id: 2, component: SlidePolicrisis, title: "Policrisis Planetaria" },
  { id: 3, component: SlideDibulla, title: "Dibulla, La Guajira" },
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

  return (
    <div className="relative h-screen w-full bg-[#0d0a08] overflow-hidden">
      {/* Main slide area */}
      <div className="relative h-full w-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
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
            className="p-2 rounded-full hover:bg-[#c9a86c]/20 transition-colors text-[#c9a86c]"
            aria-label="Ir al inicio"
          >
            <Home size={18} />
          </button>

          {/* SAT button */}
          <button
            onClick={() => goToSlide(1)}
            className="p-2 rounded-full hover:bg-[#2d8bb8]/20 transition-colors text-[#2d8bb8]"
            aria-label="Sistema de Alerta Temprana"
          >
            <AlertTriangle size={18} />
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

      {/* Slide counter */}
      <div className="absolute top-4 right-4 z-50">
        <div className="bg-[#1a1510]/80 backdrop-blur-sm border border-[#c9a86c]/30 rounded-lg px-3 py-1">
          <span className="text-[#c9a86c] text-sm font-mono">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Current slide title */}
      <div className="absolute top-4 left-4 z-50">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1510]/80 backdrop-blur-sm border border-[#c9a86c]/30 rounded-lg px-3 py-1"
        >
          <span className="text-[#c9a86c]/80 text-xs">
            {slides[currentSlide].title}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
