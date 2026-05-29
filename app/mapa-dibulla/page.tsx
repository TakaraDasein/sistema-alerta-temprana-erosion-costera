"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, AlertCircle } from "lucide-react"

// Datos de puntos críticos
const criticalPoints = [
  {
    id: 1,
    nombre: "Palomino Centro",
    coordinates: [11.2766, -73.3877] as [number, number],
    tasaErosion: -5.63,
    comunidad: "Comunidad mixta (wayuu, afro, campesinos)",
    poblacionAfectada: 800,
    infraestructura: "Hoteles, restaurantes, viviendas",
    retroceso30anos: 175,
    nivel: "crítico" as const
  },
  {
    id: 2,
    nombre: "La Cachaca III",
    coordinates: [11.2820, -73.3950] as [number, number],
    tasaErosion: -4.2,
    comunidad: "42 familias wayuu",
    poblacionAfectada: 210,
    infraestructura: "Albercas de agua, cementerio ancestral, cultivos",
    retroceso30anos: 126,
    nivel: "crítico" as const
  },
  {
    id: 3,
    nombre: "Playa Los Cocos",
    coordinates: [11.2950, -73.4100] as [number, number],
    tasaErosion: -3.8,
    comunidad: "Turística y pesquera",
    poblacionAfectada: 150,
    infraestructura: "Posadas, zona de pesca artesanal",
    retroceso30anos: 114,
    nivel: "alto" as const
  },
  {
    id: 4,
    nombre: "Desembocadura Río Palomino",
    coordinates: [11.2600, -73.3700] as [number, number],
    tasaErosion: -4.5,
    comunidad: "Wiwa y campesinos",
    poblacionAfectada: 300,
    infraestructura: "Puente, acceso turístico, manglar",
    retroceso30anos: 135,
    nivel: "crítico" as const
  },
  {
    id: 5,
    nombre: "Sector Mingueo",
    coordinates: [11.3100, -73.4250] as [number, number],
    tasaErosion: -3.2,
    comunidad: "Rancherías wayuu",
    poblacionAfectada: 180,
    infraestructura: "Viviendas tradicionales, pozo de agua",
    retroceso30anos: 96,
    nivel: "medio" as const
  },
  {
    id: 6,
    nombre: "Quebrada Valencia",
    coordinates: [11.2450, -73.3500] as [number, number],
    tasaErosion: -3.5,
    comunidad: "Afrodescendientes",
    poblacionAfectada: 250,
    infraestructura: "Escuela, centro comunitario",
    retroceso30anos: 105,
    nivel: "alto" as const
  }
]

const getLevelColor = (nivel: string) => {
  switch (nivel) {
    case "crítico": return "#ef4444"
    case "alto": return "#f59e0b"
    case "medio": return "#eab308"
    default: return "#22c55e"
  }
}

const totalPoblacion = criticalPoints.reduce((sum, p) => sum + p.poblacionAfectada, 0)

export default function MapaDibulla() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const circlesRef = useRef<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const initializingRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (initializingRef.current) return
    
    initializingRef.current = true

    const loadMap = async () => {
      try {
        const L = (await import('leaflet')).default
        const container = containerRef.current
        if (!container) {
          setIsLoading(false)
          return
        }

        // CRÍTICO: Remover instancia previa si existe
        if (mapRef.current) {
          try {
            mapRef.current.remove()
          } catch (e) {
            console.warn('Error removing previous map:', e)
          }
          mapRef.current = null
        }

        // CRÍTICO: Limpiar markers y circles previos
        markersRef.current.forEach(m => {
          try { m.remove() } catch (e) {}
        })
        circlesRef.current.forEach(c => {
          try { c.remove() } catch (e) {}
        })
        markersRef.current = []
        circlesRef.current = []

        // CRÍTICO: Limpiar metadata del contenedor
        if ((container as any)._leaflet_id) {
          delete (container as any)._leaflet_id
          delete (container as any)._leaflet
          container.innerHTML = ''
        }

        // Esperar un frame para asegurar limpieza
        await new Promise(resolve => setTimeout(resolve, 50))

        // Crear mapa con Leaflet puro
        const map = L.map(container, {
          center: [11.2766, -73.3877],
          zoom: 11,
          zoomControl: true,
          scrollWheelZoom: true
        })
        
        mapRef.current = map

        // Agregar tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map)

        // Crear función para iconos personalizados
        const createCustomIcon = (nivel: string) => {
          const color = getLevelColor(nivel)
          
          return L.divIcon({
            className: 'custom-marker-icon',
            html: `
              <div style="position: relative;">
                <div style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 40px;
                  height: 40px;
                  background: ${color};
                  border-radius: 50%;
                  opacity: 0.3;
                  animation: pulse 2s infinite;
                "></div>
                <div style="
                  position: relative;
                  width: 32px;
                  height: 32px;
                  background: ${color};
                  border: 3px solid white;
                  border-radius: 50%;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.5);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
          })
        }

        // Agregar círculos de calor
        criticalPoints.forEach(point => {
          const circle = L.circle(point.coordinates, {
            radius: Math.abs(point.tasaErosion) * 800,
            color: getLevelColor(point.nivel),
            fillColor: getLevelColor(point.nivel),
            fillOpacity: 0.15,
            weight: 1,
            opacity: 0.4
          }).addTo(map)
          
          circlesRef.current.push(circle)
        })

        // Agregar markers con popups
        criticalPoints.forEach(point => {
          const marker = L.marker(point.coordinates, {
            icon: createCustomIcon(point.nivel)
          }).addTo(map)
          
          const popupHTML = `
            <div style="padding: 12px; color: #c9a86c;">
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">${point.nombre}</h3>
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
                <div style="display: flex; justify-content: space-between; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 4px; padding: 4px 8px;">
                  <span>Erosión anual:</span>
                  <span style="font-weight: bold; color: #ef4444;">${point.tasaErosion} m/año</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Retroceso (1985-2025):</span>
                  <span style="font-weight: 600; color: #f59e0b;">${point.retroceso30anos} m</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Población afectada:</span>
                  <span style="font-weight: 600; color: #2d8bb8;">${point.poblacionAfectada}</span>
                </div>
                <div style="border-top: 1px solid rgba(201, 168, 108, 0.2); padding-top: 8px; margin-top: 4px;">
                  <p style="font-size: 12px; margin-bottom: 4px;"><strong>Comunidad:</strong> ${point.comunidad}</p>
                  <p style="font-size: 12px;"><strong>En riesgo:</strong> ${point.infraestructura}</p>
                </div>
                <div style="margin-top: 8px; padding: 4px 8px; border-radius: 4px; text-align: center; font-size: 12px; font-weight: 600; text-transform: uppercase; background: ${getLevelColor(point.nivel)}20; color: ${getLevelColor(point.nivel)}; border: 1px solid ${getLevelColor(point.nivel)}40;">
                  Riesgo ${point.nivel}
                </div>
              </div>
            </div>
          `
          
          marker.bindPopup(popupHTML, {
            maxWidth: 320,
            minWidth: 280
          })
          
          markersRef.current.push(marker)
        })

        // Invalidar tamaño del mapa
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize()
          }
        }, 100)

        setIsLoading(false)

      } catch (err) {
        console.error('Error loading map:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
        setIsLoading(false)
      }
    }

    loadMap()

    // Cleanup exhaustivo
    return () => {
      initializingRef.current = false

      // Remover markers
      markersRef.current.forEach(m => {
        try { m.remove() } catch (e) {}
      })
      markersRef.current = []

      // Remover circles
      circlesRef.current.forEach(c => {
        try { c.remove() } catch (e) {}
      })
      circlesRef.current = []

      // Remover mapa
      if (mapRef.current) {
        try {
          mapRef.current.remove()
        } catch (e) {}
        mapRef.current = null
      }

      // Limpiar contenedor
      if (containerRef.current) {
        delete (containerRef.current as any)._leaflet_id
        delete (containerRef.current as any)._leaflet
      }
    }
  }, []) // Solo ejecutar una vez

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1510] to-[#0d0a08] flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-[#c9a86c] text-2xl font-bold mb-2">Error al cargar el mapa</h2>
          <p className="text-[#c9a86c]/70 mb-4">{error}</p>
          <Link href="/" className="text-[#2d8bb8] hover:underline">
            Volver a la presentación
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1510] to-[#0d0a08] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c9a86c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#c9a86c] text-lg">Cargando mapa interactivo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1510] to-[#0d0a08]">
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .leaflet-container { background: #1a1510; }
        .leaflet-popup-content-wrapper { background: #1a1510; border: 1px solid rgba(201, 168, 108, 0.3); border-radius: 8px; }
        .leaflet-popup-tip { background: #1a1510; }
        .leaflet-popup-close-button { color: #c9a86c !important; font-size: 20px !important; }
        .leaflet-popup-close-button:hover { background: rgba(201, 168, 108, 0.2) !important; }
        .leaflet-control-zoom a { background: #1a1510 !important; border: 1px solid rgba(201, 168, 108, 0.3) !important; color: #c9a86c !important; }
        .leaflet-control-zoom a:hover { background: rgba(201, 168, 108, 0.2) !important; }
        .leaflet-control-attribution { background: rgba(26, 21, 16, 0.8) !important; color: rgba(201, 168, 108, 0.6) !important; font-size: 10px !important; }
        .leaflet-control-attribution a { color: #2d8bb8 !important; }
      `}</style>

      {/* Header */}
      <div className="bg-[#0d0a08]/90 backdrop-blur-sm border-b border-[#c9a86c]/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-[#c9a86c] hover:text-[#2d8bb8] transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="text-sm">Volver a presentación</span>
              </Link>
              <div className="flex items-center gap-2">
                <MapPin className="text-red-500" size={24} />
                <h1 className="text-xl font-bold text-[#c9a86c]">
                  Mapa Interactivo - Dibulla, La Guajira
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-[#c9a86c]">{totalPoblacion.toLocaleString()}</p>
                <p className="text-xs text-[#c9a86c]/60">Personas en riesgo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-[#1a1510] rounded-xl border border-[#c9a86c]/30 overflow-hidden" style={{ height: 'calc(100vh - 160px)' }}>
          <div ref={containerRef} className="w-full h-full" />
        </div>

        {/* Leyenda */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-[#c9a86c] text-sm">Crítico (&gt;4 m/año)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className="text-[#c9a86c] text-sm">Alto (3-4 m/año)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <span className="text-[#c9a86c] text-sm">Medio (2-3 m/año)</span>
          </div>
        </div>

        {/* Alert */}
        <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0" size={32} />
          <div>
            <p className="text-red-400 font-bold text-lg">CERO Sistemas de Alerta Temprana</p>
            <p className="text-red-400/70">6 puntos críticos SIN monitoreo en tiempo real • 1,890 personas en riesgo inmediato</p>
          </div>
        </div>
      </div>
    </div>
  )
}
