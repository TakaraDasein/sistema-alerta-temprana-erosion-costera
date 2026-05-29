"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { MapPin, Users, AlertTriangle, X, ZoomIn, ZoomOut, Home } from "lucide-react"
import "leaflet/dist/leaflet.css"

// ========== UTILITY FUNCTIONS ==========
const getLevelColor = (nivel: string): string => {
  switch (nivel) {
    case "crítico": return "#ef4444"
    case "alto": return "#f59e0b"
    case "medio": return "#eab308"
    default: return "#10B981"
  }
}

const getSizeByLevel = (nivel: string): number => {
  switch (nivel) {
    case "crítico": return 44
    case "alto": return 36
    case "medio": return 32
    default: return 28
  }
}

// ========== MAP MANAGER CLASS ==========
class MapManager {
  private map: any = null
  private markers: any[] = []
  private circles: any[] = []

  async initialize(container: HTMLElement, onZoomChange: (zoom: number) => void) {
    const L = (await import('leaflet')).default
    
    // Limpiar primero para evitar inicialización duplicada
    this.cleanup(container)
    
    // Validar que el contenedor tenga dimensiones con múltiples reintentos
    let attempts = 0
    while ((!container.offsetWidth || !container.offsetHeight) && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }
    
    if (!container.offsetWidth || !container.offsetHeight) {
      console.error('Container has no dimensions after retries')
      throw new Error('Container not ready')
    }
    
    // Pequeño delay adicional antes de crear el mapa
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Verificar que no haya un mapa existente
    if ((container as any)._leaflet_id) {
      console.warn('Container already has a leaflet map, cleaning up...')
      delete (container as any)._leaflet_id
      container.innerHTML = ''
    }
    
    this.map = L.map(container, {
      center: [11.2700, -73.4200], // Centrado en la zona de Dibulla-Palomino
      zoom: 11,
      minZoom: 9,
      maxZoom: 16,
      zoomControl: false, // Deshabilitamos los controles por defecto de Leaflet
      scrollWheelZoom: true, // Zoom con rueda del mouse
      dragging: true, // Permite arrastrar el mapa
      touchZoom: true, // Zoom con gestos touch
      doubleClickZoom: true, // Zoom con doble clic
      boxZoom: true, // Zoom con selección de área (Shift + arrastre)
      keyboard: true, // Navegación con teclado
      attributionControl: false,
      tap: true,
      tapTolerance: 20,
      // Opciones adicionales para mejorar la interacción
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      inertia: true, // Inercia al arrastrar (efecto momentum)
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 1500,
      worldCopyJump: false
    })

    this.map.on('zoomend', () => {
      const zoom = this.map.getZoom()
      onZoomChange(zoom)
      this.updateCirclesOpacity(zoom)
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      opacity: 0.8
    }).addTo(this.map)

    // Invalidar size después de agregar tiles
    setTimeout(() => {
      if (this.map) {
        try {
          this.map.invalidateSize()
        } catch (e) {
          console.warn('Initial invalidateSize failed:', e)
        }
      }
    }, 100)

    return { L, map: this.map }
  }

  cleanup(container?: HTMLElement) {
    this.markers.forEach(m => { try { m.remove() } catch (e) {} })
    this.markers = []
    this.circles.forEach(c => { try { c.remove() } catch (e) {} })
    this.circles = []
    if (this.map) {
      try { 
        this.map.off()
        this.map.remove() 
      } catch (e) {
        console.warn('Error removing map:', e)
      }
      this.map = null
    }
    if (container) {
      // Limpiar completamente el contenedor
      if ((container as any)._leaflet_id) {
        delete (container as any)._leaflet_id
      }
      container.innerHTML = ''
      // Remover todas las clases de Leaflet
      container.className = container.className.replace(/leaflet-\S+/g, '').trim()
    }
  }

  addCircles(L: any, geojsonData: any) {
    geojsonData.features.forEach((feature: any) => {
      const coords = feature.geometry.coordinates
      const props = feature.properties
      const circle = L.circle([coords[1], coords[0]], {
        radius: Math.abs(props.tasaErosion) * 700,
        color: getLevelColor(props.nivel),
        fillColor: getLevelColor(props.nivel),
        fillOpacity: 0.12,
        weight: 2,
        opacity: 0.3,
        interactive: false
      }).addTo(this.map)
      this.circles.push(circle)
    })
  }

  createMarkerIcon(L: any, nivel: string) {
    const color = getLevelColor(nivel)
    const size = getSizeByLevel(nivel)
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <span style="color: white; font-weight: 700; font-size: ${size * 0.45}px;">!</span>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    })
  }

  addMarkers(L: any, geojsonData: any, currentZoom: number, onPointHover: (point: any | null) => void) {
    const geoJsonLayer = L.geoJSON(geojsonData, {
      pointToLayer: (feature: any, latlng: any) => {
        const marker = L.marker(latlng, {
          icon: this.createMarkerIcon(L, feature.properties.nivel),
          riseOnHover: true
        })

        marker.bindTooltip(feature.properties.nombre, {
          permanent: false, // Solo mostrar en hover
          direction: 'top',
          offset: [0, -getSizeByLevel(feature.properties.nivel)/2 - 8],
          className: 'marker-label-hover',
          opacity: 1
        })

        // Evento hover: mostrar panel lateral
        marker.on('mouseover', () => {
          onPointHover(feature.properties)
          marker.openTooltip()
        })

        // Evento mouseout: ocultar panel lateral
        marker.on('mouseout', () => {
          onPointHover(null)
          marker.closeTooltip()
        })

        this.markers.push(marker)
        return marker
      }
    }).addTo(this.map)

    if (geoJsonLayer.getBounds().isValid()) {
      this.map.fitBounds(geoJsonLayer.getBounds(), { padding: [100, 100] })
    }
  }

  updateCirclesOpacity(zoom: number) {
    const opacity = zoom < 12 ? 0.3 : 0.2
    const fillOpacity = zoom < 12 ? 0.12 : 0.08
    this.circles.forEach(circle => circle.setStyle({ opacity, fillOpacity }))
  }

  zoomIn() {
    if (this.map) this.map.zoomIn()
  }

  zoomOut() {
    if (this.map) this.map.zoomOut()
  }

  resetView() {
    if (this.map) this.map.setView([11.2700, -73.4200], 11)
  }

  invalidateSize() {
    if (this.map && this.map.getContainer()) {
      try {
        this.map.invalidateSize()
      } catch (err) {
        console.warn('Failed to invalidate map size:', err)
      }
    }
  }
}

// ========== MAIN COMPONENT ==========
export function SlideDibulla() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapManagerRef = useRef<MapManager | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredPoint, setHoveredPoint] = useState<any>(null)
  const [currentZoom, setCurrentZoom] = useState(11)
  const initializingRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || initializingRef.current) return
    
    initializingRef.current = true
    const mapManager = new MapManager()
    mapManagerRef.current = mapManager

    const loadMap = async () => {
      try {
        const container = containerRef.current
        if (!container) {
          console.error('Container not found')
          return
        }

        console.log('Initializing map...')
        // El método initialize ahora maneja los reintentos internamente
        const { L } = await mapManager.initialize(container, setCurrentZoom)
        console.log('Map initialized successfully')
        
        console.log('Loading GeoJSON...')
        const response = await fetch('/geojson/puntos-criticos-dibulla.json')
        if (!response.ok) throw new Error('Failed to load GeoJSON')
        const geojsonData = await response.json()
        console.log('GeoJSON loaded:', geojsonData.features.length, 'features')

        mapManager.addCircles(L, geojsonData)
        console.log('Circles added')
        
        mapManager.addMarkers(L, geojsonData, currentZoom, setHoveredPoint)
        console.log('Markers added')

        // Múltiples invalidaciones para asegurar renderizado correcto
        setTimeout(() => {
          mapManager.invalidateSize()
          console.log('Invalidate 1/3')
        }, 200)
        
        setTimeout(() => {
          mapManager.invalidateSize()
          console.log('Invalidate 2/3')
        }, 400)
        
        setTimeout(() => {
          mapManager.invalidateSize()
          setIsLoading(false)
          console.log('Map fully loaded')
        }, 600)
        
      } catch (err) {
        console.error('Error loading map:', err)
        setIsLoading(false)
      }
    }

    loadMap()

    return () => {
      initializingRef.current = false
      mapManagerRef.current?.cleanup(containerRef.current || undefined)
    }
  }, [])

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#1a1510] to-[#0d0a08]">
      {/* Global Styles */}
      <style jsx global>{`
        .leaflet-container { 
          background: #1a1510 !important;
          height: 100% !important;
          width: 100% !important;
          cursor: grab !important;
        }
        .leaflet-container.leaflet-drag-target {
          cursor: grabbing !important;
        }
        .leaflet-dragging .leaflet-container {
          cursor: grabbing !important;
        }
        .custom-marker { background: transparent !important; border: none !important; }
        .marker-label-hover {
          background: rgba(0, 0, 0, 0.95) !important;
          border: 2px solid rgba(201, 168, 108, 0.8) !important;
          border-radius: 8px !important;
          color: #c9a86c !important;
          font-weight: 700 !important;
          font-size: 14px !important;
          padding: 6px 12px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8) !important;
          pointer-events: none !important;
        }
        .marker-label-hover::before {
          border-top-color: rgba(0, 0, 0, 0.95) !important;
        }
        /* Asegurar que los tiles no bloqueen eventos */
        .leaflet-tile-pane {
          pointer-events: none !important;
        }
        /* Asegurar que el pane de overlay permita eventos */
        .leaflet-overlay-pane {
          pointer-events: auto !important;
        }
      `}</style>

      {/* FULLSCREEN MAP */}
      <div className="absolute inset-0 z-0">
        <div ref={containerRef} className="w-full h-full" />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0d0a08]/95 backdrop-blur-sm z-10">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#c9a86c]/30 rounded-full mx-auto mb-4"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-[#c9a86c] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-[#c9a86c] font-semibold text-lg">Cargando mapa...</p>
              <p className="text-[#c9a86c]/60 text-sm">Puntos críticos de erosión</p>
            </div>
          </div>
        )}
      </div>

      {/* LEFT PANEL - Escala reducida */}
      <div className="absolute left-0 top-0 bottom-0 z-10 w-60 p-4 flex flex-col gap-4">
        
        {/* HEADER */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0d0a08]/90 backdrop-blur-md border border-[#c9a86c]/30 rounded-lg p-3"
        >
          <div className="flex items-center gap-2">
            <MapPin className="text-[#c9a86c]" size={20} />
            <div>
              <h2 className="text-base font-bold text-[#c9a86c]">Dibulla</h2>
              <p className="text-[10px] text-[#c9a86c]/60">La Guajira, Colombia</p>
            </div>
          </div>
        </motion.div>

        {/* KPI HERO - Retroceso Máximo */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-red-600/90 to-red-500/90 backdrop-blur-md border border-red-400/30 rounded-lg p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-white" size={12} />
            </div>
            <p className="text-xs font-medium text-white/90">Retroceso Máximo</p>
          </div>
          
          <div className="mb-2">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">175</span>
              <span className="text-lg font-semibold text-white/90">m</span>
            </div>
            <p className="text-[10px] text-white/80 mt-0.5">35 años (1985-2020)</p>
          </div>

          <div className="pt-2 border-t border-white/20">
            <p className="text-xs font-semibold text-white">Palomino Centro</p>
            <p className="text-[10px] text-white/70">800 personas afectadas</p>
          </div>
        </motion.div>

        {/* MÉTRICAS AGREGADAS - Grid 2x2 */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-2"
        >
          <div className="bg-[#0d0a08]/90 backdrop-blur-md border border-[#c9a86c]/30 rounded-md p-2">
            <p className="text-lg font-bold text-[#c9a86c]">4</p>
            <p className="text-[9px] text-[#c9a86c]/60 mt-0.5">Puntos críticos</p>
          </div>
          
          <div className="bg-[#0d0a08]/90 backdrop-blur-md border border-[#c9a86c]/30 rounded-md p-2">
            <p className="text-lg font-bold text-[#c9a86c]">1,340</p>
            <p className="text-[9px] text-[#c9a86c]/60 mt-0.5">Personas</p>
          </div>
          
          <div className="bg-[#0d0a08]/90 backdrop-blur-md border border-[#c9a86c]/30 rounded-md p-2">
            <p className="text-lg font-bold text-[#c9a86c]">-4.2</p>
            <p className="text-[9px] text-[#c9a86c]/60 mt-0.5">m/año prom.</p>
          </div>
          
          <div className="bg-[#0d0a08]/90 backdrop-blur-md border border-[#2d8bb8]/30 rounded-md p-2">
            <p className="text-lg font-bold text-[#2d8bb8]">{currentZoom}</p>
            <p className="text-[9px] text-[#c9a86c]/60 mt-0.5">Zoom nivel</p>
          </div>
        </motion.div>

        {/* LEYENDA */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#0d0a08]/90 backdrop-blur-md border border-[#c9a86c]/30 rounded-lg p-3"
        >
          <p className="text-xs font-semibold text-[#c9a86c] mb-2">Nivel de Riesgo</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></div>
              <span className="text-[10px] text-[#c9a86c]/80">Crítico (&gt;4 m/año)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"></div>
              <span className="text-[10px] text-[#c9a86c]/80">Alto (3-4 m/año)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white"></div>
              <span className="text-[10px] text-[#c9a86c]/80">Medio (2-3 m/año)</span>
            </div>
          </div>
        </motion.div>

        {/* CONTROLES DE MAPA */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-2"
        >
          {/* Zoom Controls Profesionales */}
          <div className="bg-[#0d0a08]/90 backdrop-blur-md border border-[#c9a86c]/30 rounded-lg overflow-hidden">
            <button
              onClick={() => mapManagerRef.current?.zoomIn()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[#c9a86c] hover:bg-[#c9a86c]/10 transition-all border-b border-[#c9a86c]/20"
            >
              <ZoomIn size={16} />
              <span className="text-xs font-semibold">Acercar</span>
            </button>
            <button
              onClick={() => mapManagerRef.current?.zoomOut()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[#c9a86c] hover:bg-[#c9a86c]/10 transition-all border-b border-[#c9a86c]/20"
            >
              <ZoomOut size={16} />
              <span className="text-xs font-semibold">Alejar</span>
            </button>
            <button
              onClick={() => mapManagerRef.current?.resetView()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[#2d8bb8] hover:bg-[#2d8bb8]/10 transition-all"
            >
              <Home size={16} />
              <span className="text-xs font-semibold">Vista Inicial</span>
            </button>
          </div>
        </motion.div>

        {/* FOOTER - Comunidades */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-auto bg-[#0d0a08]/80 backdrop-blur-sm border border-[#c9a86c]/20 rounded-md p-2"
        >
          <div className="flex items-center gap-1.5">
            <Users className="text-[#2d8bb8]" size={12} />
            <p className="text-[9px] text-[#c9a86c]/70">Wayuu • Wiwa • Afro</p>
          </div>
        </motion.div>
      </div>

      {/* PANEL LATERAL DERECHO COMPACTO - Solo con hover */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-80 bg-[#0d0a08]/95 backdrop-blur-xl border-2 border-[#c9a86c]/50 rounded-xl shadow-2xl pointer-events-auto"
          >
            {/* Header compacto */}
            <div className="bg-gradient-to-r from-[#c9a86c]/20 to-transparent border-b border-[#c9a86c]/30 p-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-lg flex-shrink-0"
                  style={{ backgroundColor: getLevelColor(hoveredPoint.nivel) }}
                >
                  <AlertTriangle className="text-white" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#c9a86c] leading-tight truncate">{hoveredPoint.nombre}</h3>
                  <p className="text-xs text-[#c9a86c]/70 capitalize">Nivel {hoveredPoint.nivel}</p>
                </div>
              </div>
            </div>

            {/* Content compacto */}
            <div className="p-4 space-y-3">
              {/* Métricas en grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/40 rounded-lg p-3">
                  <p className="text-[10px] text-red-300/80 mb-0.5 uppercase tracking-wide">Tasa anual</p>
                  <p className="text-xl font-bold text-red-400">{hoveredPoint.tasaErosion}</p>
                  <p className="text-[9px] text-red-300/60">m/año</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/40 rounded-lg p-3">
                  <p className="text-[10px] text-orange-300/80 mb-0.5 uppercase tracking-wide">30 años</p>
                  <p className="text-xl font-bold text-orange-400">{hoveredPoint.retroceso30anos}</p>
                  <p className="text-[9px] text-orange-300/60">metros</p>
                </div>
              </div>

              {/* Población */}
              <div className="bg-gradient-to-br from-[#2d8bb8]/20 to-[#2d8bb8]/5 border border-[#2d8bb8]/40 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="text-[#2d8bb8]" size={14} />
                  <p className="text-[10px] text-[#c9a86c]/70 font-semibold uppercase tracking-wide">Población</p>
                </div>
                <p className="text-2xl font-bold text-[#2d8bb8] mb-1">{hoveredPoint.poblacionAfectada.toLocaleString()}</p>
                <p className="text-xs text-[#c9a86c]/80 line-clamp-1">{hoveredPoint.comunidad}</p>
              </div>

              {/* Infraestructura */}
              <div className="bg-[#c9a86c]/5 border border-[#c9a86c]/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="text-[#c9a86c]" size={14} />
                  <p className="text-[10px] text-[#c9a86c]/70 font-semibold uppercase tracking-wide">Infraestructura</p>
                </div>
                <p className="text-xs text-[#c9a86c] leading-relaxed line-clamp-2">{hoveredPoint.infraestructura}</p>
              </div>

              {/* Descripción */}
              <div className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-lg p-3">
                <p className="text-xs text-[#c9a86c]/90 leading-relaxed line-clamp-3">{hoveredPoint.descripcion}</p>
              </div>
            </div>

            {/* Footer compacto */}
            <div className="border-t border-[#c9a86c]/10 px-4 py-2">
              <p className="text-[9px] text-[#c9a86c]/50 text-center">
                INVEMAR 2024 • Erosión Costera
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
