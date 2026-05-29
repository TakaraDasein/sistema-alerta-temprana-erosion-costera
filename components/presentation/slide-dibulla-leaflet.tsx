"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { MapPin, Users, Waves, TreePine, Home, AlertCircle, AlertTriangle, TrendingDown } from "lucide-react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Importar componentes de Leaflet dinámicamente para evitar SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
)

// Tipos para puntos críticos
interface CriticalPoint {
  id: number
  nombre: string
  coordinates: [number, number]
  tasaErosion: number
  comunidad: string
  poblacionAfectada: number
  infraestructura: string
  retroceso30anos: number
  nivel: "crítico" | "alto" | "medio"
}

// Datos de los 6 puntos críticos de erosión en Dibulla (según INVEMAR 2024)
const criticalPoints: CriticalPoint[] = [
  {
    id: 1,
    nombre: "Palomino Centro",
    coordinates: [11.2766, -73.3877],
    tasaErosion: -5.63,
    comunidad: "Comunidad mixta (wayuu, afro, campesinos)",
    poblacionAfectada: 800,
    infraestructura: "Hoteles, restaurantes, viviendas",
    retroceso30anos: 175,
    nivel: "crítico"
  },
  {
    id: 2,
    nombre: "La Cachaca III",
    coordinates: [11.2820, -73.3950],
    tasaErosion: -4.2,
    comunidad: "42 familias wayuu",
    poblacionAfectada: 210,
    infraestructura: "Albercas de agua, cementerio ancestral, cultivos",
    retroceso30anos: 126,
    nivel: "crítico"
  },
  {
    id: 3,
    nombre: "Playa Los Cocos",
    coordinates: [11.2950, -73.4100],
    tasaErosion: -3.8,
    comunidad: "Turística y pesquera",
    poblacionAfectada: 150,
    infraestructura: "Posadas, zona de pesca artesanal",
    retroceso30anos: 114,
    nivel: "alto"
  },
  {
    id: 4,
    nombre: "Desembocadura Río Palomino",
    coordinates: [11.2600, -73.3700],
    tasaErosion: -4.5,
    comunidad: "Wiwa y campesinos",
    poblacionAfectada: 300,
    infraestructura: "Puente, acceso turístico, manglar",
    retroceso30anos: 135,
    nivel: "crítico"
  },
  {
    id: 5,
    nombre: "Sector Mingueo",
    coordinates: [11.3100, -73.4250],
    tasaErosion: -3.2,
    comunidad: "Rancherías wayuu",
    poblacionAfectada: 180,
    infraestructura: "Viviendas tradicionales, pozo de agua",
    retroceso30anos: 96,
    nivel: "medio"
  },
  {
    id: 6,
    nombre: "Quebrada Valencia",
    coordinates: [11.2450, -73.3500],
    tasaErosion: -3.5,
    comunidad: "Afrodescendientes",
    poblacionAfectada: 250,
    infraestructura: "Escuela, centro comunitario",
    retroceso30anos: 105,
    nivel: "alto"
  }
]

// Función para obtener color según nivel de riesgo
const getLevelColor = (nivel: string) => {
  switch (nivel) {
    case "crítico": return "#ef4444"
    case "alto": return "#f59e0b"
    case "medio": return "#eab308"
    default: return "#22c55e"
  }
}

// Crear iconos personalizados para Leaflet
const createCustomIcon = (nivel: "crítico" | "alto" | "medio") => {
  const color = getLevelColor(nivel)
  
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div style="position: relative;">
        <div class="marker-pulse" style="
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

// Componente del mapa
function LeafletMap() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const center: [number, number] = [11.2766, -73.3877] // Palomino
  const totalPoblacion = criticalPoints.reduce((sum, p) => sum + p.poblacionAfectada, 0)

  useEffect(() => {
    setMapLoaded(true)
  }, [])

  if (!mapLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1a1510] rounded-xl">
        <p className="text-[#c9a86c]">Cargando mapa...</p>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        .leaflet-container {
          background: #1a1510;
          border-radius: 12px;
        }

        .leaflet-popup-content-wrapper {
          background: #1a1510;
          border: 1px solid rgba(201, 168, 108, 0.3);
          border-radius: 8px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
        }

        .leaflet-popup-tip {
          background: #1a1510;
          border: 1px solid rgba(201, 168, 108, 0.3);
        }

        .leaflet-popup-close-button {
          color: #c9a86c !important;
          font-size: 20px !important;
          padding: 4px 8px !important;
        }

        .leaflet-popup-close-button:hover {
          background: rgba(201, 168, 108, 0.2) !important;
        }

        .leaflet-control-attribution {
          background: rgba(26, 21, 16, 0.8) !important;
          color: rgba(201, 168, 108, 0.6) !important;
          font-size: 10px !important;
        }

        .leaflet-control-attribution a {
          color: #2d8bb8 !important;
        }

        .leaflet-control-zoom a {
          background: #1a1510 !important;
          border: 1px solid rgba(201, 168, 108, 0.3) !important;
          color: #c9a86c !important;
        }

        .leaflet-control-zoom a:hover {
          background: rgba(201, 168, 108, 0.2) !important;
          color: #c9a86c !important;
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={11}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
        zoomControl={true}
      >
        {/* Tiles de OpenStreetMap con estilo oscuro */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Círculos de calor alrededor de puntos críticos */}
        {criticalPoints.map((point) => (
          <Circle
            key={`circle-${point.id}`}
            center={point.coordinates}
            radius={Math.abs(point.tasaErosion) * 800} // Radio proporcional a erosión
            pathOptions={{
              color: getLevelColor(point.nivel),
              fillColor: getLevelColor(point.nivel),
              fillOpacity: 0.15,
              weight: 1,
              opacity: 0.4
            }}
          />
        ))}

        {/* Markers de puntos críticos */}
        {criticalPoints.map((point) => (
          <Marker
            key={point.id}
            position={point.coordinates}
            icon={createCustomIcon(point.nivel)}
          >
            <Popup maxWidth={320} minWidth={280}>
              <div className="p-3 text-[#c9a86c]">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle 
                    size={18} 
                    style={{ color: getLevelColor(point.nivel) }}
                  />
                  {point.nombre}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded px-2 py-1">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="text-red-500" size={16} />
                      <span className="text-[#c9a86c]/70">Erosión anual:</span>
                    </div>
                    <span className="font-bold text-red-500">
                      {point.tasaErosion} m/año
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#c9a86c]/70">Retroceso (1985-2025):</span>
                    <span className="font-semibold text-orange-500">
                      {point.retroceso30anos} metros
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Users className="text-[#2d8bb8]" size={14} />
                      <span className="text-[#c9a86c]/70">Población afectada:</span>
                    </div>
                    <span className="font-semibold text-[#2d8bb8]">
                      {point.poblacionAfectada} personas
                    </span>
                  </div>
                  
                  <div className="border-t border-[#c9a86c]/20 pt-2 mt-2 space-y-1">
                    <p className="text-xs text-[#c9a86c]/80">
                      <strong>Comunidad:</strong> {point.comunidad}
                    </p>
                    <p className="text-xs text-[#c9a86c]/80">
                      <strong>En riesgo:</strong> {point.infraestructura}
                    </p>
                  </div>

                  <div 
                    className="mt-2 px-2 py-1 rounded text-center text-xs font-semibold uppercase"
                    style={{ 
                      backgroundColor: getLevelColor(point.nivel) + "20",
                      color: getLevelColor(point.nivel),
                      border: `1px solid ${getLevelColor(point.nivel)}40`
                    }}
                  >
                    Riesgo {point.nivel}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Leyenda */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 left-4 bg-[#1a1510]/95 border border-[#c9a86c]/30 rounded-lg p-3 backdrop-blur-sm z-[1000]"
      >
        <h4 className="text-[#c9a86c] font-semibold text-sm mb-2">
          Nivel de Riesgo
        </h4>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-[#c9a86c]/80">Crítico (&gt;4 m/año)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className="text-[#c9a86c]/80">Alto (3-4 m/año)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <span className="text-[#c9a86c]/80">Medio (2-3 m/año)</span>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas agregadas */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-4 right-4 bg-[#1a1510]/95 border border-[#c9a86c]/30 rounded-lg p-3 backdrop-blur-sm z-[1000]"
      >
        <div className="space-y-2 text-center">
          <div>
            <p className="text-2xl font-bold text-[#c9a86c]">
              {totalPoblacion.toLocaleString()}
            </p>
            <p className="text-xs text-[#c9a86c]/60">Personas en riesgo</p>
          </div>
          <div className="border-t border-[#c9a86c]/20 pt-2">
            <p className="text-xl font-bold text-red-500">
              {criticalPoints.length}
            </p>
            <p className="text-xs text-[#c9a86c]/60">Puntos críticos</p>
          </div>
          <div className="border-t border-[#c9a86c]/20 pt-2">
            <p className="text-xl font-bold text-orange-500">
              -4.2
            </p>
            <p className="text-xs text-[#c9a86c]/60">m/año promedio</p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

// Slide principal de Dibulla
export function SlideDibulla() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#1a1510] to-[#0d0a08] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20 bg-gradient-to-b from-[#0d0a08]/90 to-transparent"
      >
        <div className="flex items-center gap-3">
          <MapPin className="text-red-500" size={32} />
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#c9a86c]">
              Dibulla, La Guajira
            </h2>
            <p className="text-[#c9a86c]/60 text-sm md:text-base">
              Donde la policrisis es tangible — 6 puntos críticos sin sistemas de alerta
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mapa principal */}
      <div className="absolute inset-0 pt-24 pb-20 px-4 md:px-6">
        <LeafletMap />
      </div>

      {/* Panel de impactos (lado izquierdo) */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="absolute left-4 top-32 bottom-24 w-80 bg-[#1a1510]/95 border border-[#c9a86c]/30 rounded-xl p-4 backdrop-blur-sm overflow-y-auto hidden lg:block z-[1000]"
      >
        <h3 className="text-[#c9a86c] font-bold text-lg mb-4 flex items-center gap-2">
          <Waves className="text-[#2d8bb8]" size={20} />
          La Policrisis en Dibulla
        </h3>

        <div className="space-y-4">
          {/* Cambio Climático */}
          <div className="bg-[#2d8bb8]/10 border border-[#2d8bb8]/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Waves className="text-[#2d8bb8]" size={18} />
              <h4 className="text-[#2d8bb8] font-semibold text-sm">Cambio Climático</h4>
            </div>
            <ul className="space-y-1 text-xs text-[#c9a86c]/80">
              <li>• Ascenso del nivel del mar</li>
              <li>• Mareas de leva más intensas</li>
              <li>• Erosión: 3-5 m/año</li>
              <li>• 175 m perdidos en 30 años</li>
            </ul>
          </div>

          {/* Pérdida de Biodiversidad */}
          <div className="bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="text-[#22c55e]" size={18} />
              <h4 className="text-[#22c55e] font-semibold text-sm">Pérdida de Biodiversidad</h4>
            </div>
            <ul className="space-y-1 text-xs text-[#c9a86c]/80">
              <li>• Manglares arrasados</li>
              <li>• Pérdida de barrera natural</li>
              <li>• Chipi-chipi desaparecido</li>
              <li>• Soberanía alimentaria amenazada</li>
            </ul>
          </div>

          {/* Impacto Social */}
          <div className="bg-[#c9a86c]/10 border border-[#c9a86c]/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Home className="text-[#c9a86c]" size={18} />
              <h4 className="text-[#c9a86c] font-semibold text-sm">Impacto Social</h4>
            </div>
            <ul className="space-y-1 text-xs text-[#c9a86c]/80">
              <li>• 42 familias wayuu desplazadas</li>
              <li>• Cementerios ancestrales perdidos</li>
              <li>• 47,487 habitantes en riesgo</li>
              <li>• Wayuu, Wiwa, Arhuaco, afro, campesinos</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Bottom alert */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0d0a08] to-transparent z-20"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3 bg-red-500/20 border border-red-500 px-6 py-3 rounded-lg">
            <AlertCircle className="text-red-500" size={28} />
            <div>
              <p className="text-red-400 font-bold text-lg">
                CERO Sistemas de Alerta Temprana
              </p>
              <p className="text-red-400/70 text-sm">
                6 puntos críticos SIN monitoreo en tiempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#1a1510]/80 border border-[#c9a86c]/30 px-4 py-2 rounded-lg">
            <Users size={18} className="text-[#c9a86c]" />
            <span className="text-[#c9a86c]/80 text-sm">
              Wayuu · Wiwa · Arhuaco · Afro · Campesinos
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
