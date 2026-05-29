"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { MapPin, Users, Waves, TreePine, Home, AlertCircle, AlertTriangle, TrendingDown } from "lucide-react"
import type { MapRef, MarkerProps, PopupProps } from "react-map-gl"

// Importar Map de forma dinámica para evitar problemas de SSR
const Map = dynamic(() => import("react-map-gl").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#1a1510]">
      <p className="text-[#c9a86c]">Cargando mapa...</p>
    </div>
  ),
})

const Marker = dynamic(() => import("react-map-gl").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-map-gl").then((mod) => mod.Popup), { ssr: false })
const Source = dynamic(() => import("react-map-gl").then((mod) => mod.Source), { ssr: false })
const Layer = dynamic(() => import("react-map-gl").then((mod) => mod.Layer), { ssr: false })

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
    coordinates: [-73.3877, 11.2766],
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
    coordinates: [-73.3950, 11.2820],
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
    coordinates: [-73.4100, 11.2950],
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
    coordinates: [-73.3700, 11.2600],
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
    coordinates: [-73.4250, 11.3100],
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
    coordinates: [-73.3500, 11.2450],
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

// Componente del mapa interactivo
function MapDibullaCriticalPoints() {
  const [selectedPoint, setSelectedPoint] = useState<CriticalPoint | null>(null)
  const [viewState, setViewState] = useState({
    longitude: -73.3877,
    latitude: 11.2766,
    zoom: 11
  })

  // GeoJSON para heat map de erosión
  const erosionHeatmapData = {
    type: "FeatureCollection" as const,
    features: criticalPoints.map(p => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: p.coordinates
      },
      properties: {
        erosion: Math.abs(p.tasaErosion),
        name: p.nombre
      }
    }))
  }

  const totalPoblacion = criticalPoints.reduce((sum, p) => sum + p.poblacionAfectada, 0)

  return (
    <div className="relative w-full h-full">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%', borderRadius: '12px' }}
      >
        {/* Capa de heat map de erosión */}
        <Source type="geojson" data={erosionHeatmapData}>
          <Layer
            id="erosion-heat"
            type="heatmap"
            paint={{
              "heatmap-weight": ["get", "erosion"],
              "heatmap-intensity": 1,
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(34, 197, 94, 0)",
                0.2, "rgba(234, 179, 8, 0.2)",
                0.4, "rgba(245, 158, 11, 0.4)",
                0.6, "rgba(239, 68, 68, 0.6)",
                1, "rgba(220, 38, 38, 0.8)"
              ],
              "heatmap-radius": 40,
              "heatmap-opacity": 0.4
            }}
          />
        </Source>

        {/* Marcadores de puntos críticos */}
        {criticalPoints.map((point) => (
          <Marker
            key={point.id}
            longitude={point.coordinates[0]}
            latitude={point.coordinates[1]}
            anchor="bottom"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + point.id * 0.1, type: "spring" }}
              className="relative cursor-pointer group"
              onClick={() => setSelectedPoint(point)}
            >
              {/* Pulso animado */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: getLevelColor(point.nivel) + "40" }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Pin principal */}
              <div
                className="relative w-10 h-10 rounded-full border-3 border-white flex items-center justify-center shadow-xl transform group-hover:scale-125 transition-transform z-10"
                style={{ backgroundColor: getLevelColor(point.nivel) }}
              >
                <AlertTriangle className="text-white" size={20} />
              </div>

              {/* Label flotante */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1a1510] border border-[#c9a86c]/40 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[#c9a86c] font-semibold text-xs">
                  {point.nombre}
                </p>
              </div>
            </motion.div>
          </Marker>
        ))}

        {/* Popup de información detallada */}
        {selectedPoint && (
          <Popup
            longitude={selectedPoint.coordinates[0]}
            latitude={selectedPoint.coordinates[1]}
            anchor="top"
            onClose={() => setSelectedPoint(null)}
            closeButton={true}
            closeOnClick={false}
            className="critical-point-popup"
          >
            <div className="p-3 bg-[#1a1510] text-[#c9a86c] min-w-[280px] max-w-[320px]">
              <h3 className="text-lg font-bold mb-3 text-[#c9a86c] flex items-center gap-2">
                <AlertTriangle 
                  size={18} 
                  style={{ color: getLevelColor(selectedPoint.nivel) }}
                />
                {selectedPoint.nombre}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded px-2 py-1">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="text-red-500" size={16} />
                    <span className="text-[#c9a86c]/70">Erosión anual:</span>
                  </div>
                  <span className="font-bold text-red-500">
                    {selectedPoint.tasaErosion} m/año
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#c9a86c]/70">Retroceso (1985-2025):</span>
                  <span className="font-semibold text-orange-500">
                    {selectedPoint.retroceso30anos} metros
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Users className="text-[#2d8bb8]" size={14} />
                    <span className="text-[#c9a86c]/70">Población afectada:</span>
                  </div>
                  <span className="font-semibold text-[#2d8bb8]">
                    {selectedPoint.poblacionAfectada} personas
                  </span>
                </div>
                
                <div className="border-t border-[#c9a86c]/20 pt-2 mt-2 space-y-1">
                  <p className="text-xs text-[#c9a86c]/80">
                    <strong>Comunidad:</strong> {selectedPoint.comunidad}
                  </p>
                  <p className="text-xs text-[#c9a86c]/80">
                    <strong>En riesgo:</strong> {selectedPoint.infraestructura}
                  </p>
                </div>

                <div 
                  className="mt-2 px-2 py-1 rounded text-center text-xs font-semibold uppercase"
                  style={{ 
                    backgroundColor: getLevelColor(selectedPoint.nivel) + "20",
                    color: getLevelColor(selectedPoint.nivel),
                    border: `1px solid ${getLevelColor(selectedPoint.nivel)}40`
                  }}
                >
                  Riesgo {selectedPoint.nivel}
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Leyenda */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 left-4 bg-[#1a1510]/95 border border-[#c9a86c]/30 rounded-lg p-3 backdrop-blur-sm"
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
        className="absolute top-4 right-4 bg-[#1a1510]/95 border border-[#c9a86c]/30 rounded-lg p-3 backdrop-blur-sm"
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
    </div>
  )
}

// Slide principal de Dibulla con mapa interactivo
export function SlideDibulla() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showLabels, setShowLabels] = useState(true)

  useEffect(() => {
    // Dar tiempo para que se cargue el mapa
    const timer = setTimeout(() => setMapLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Alternar entre mostrar etiquetas y sin etiquetas cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLabels(prev => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
        {mapLoaded && <MapDibullaCriticalPoints />}
      </div>

      {/* Panel de impactos (lado izquierdo) */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="absolute left-4 top-32 bottom-24 w-80 bg-[#1a1510]/95 border border-[#c9a86c]/30 rounded-xl p-4 backdrop-blur-sm overflow-y-auto hidden lg:block"
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

      {/* Bottom alert - Con transición suave entre etiquetas */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0d0a08] to-transparent"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Alerta principal - siempre visible */}
          <div className="flex items-center gap-3 bg-red-500/20 border border-red-500 px-6 py-3 rounded-lg">
            <AlertCircle className="text-red-500" size={28} />
            <div className="relative">
              {/* Versión CON etiquetas */}
              <motion.div
                animate={{ 
                  opacity: showLabels ? 1 : 0,
                }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1] // Curva de bezier suave y orgánica
                }}
                className="absolute inset-0"
              >
                <p className="text-red-400 font-bold text-lg whitespace-nowrap">
                  CERO Sistemas de Alerta Temprana
                </p>
                <p className="text-red-400/70 text-sm whitespace-nowrap">
                  6 puntos críticos SIN monitoreo en tiempo real
                </p>
              </motion.div>

              {/* Versión SIN etiquetas descriptivas */}
              <motion.div
                animate={{ 
                  opacity: showLabels ? 0 : 1,
                }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="absolute inset-0"
              >
                <p className="text-red-400 font-bold text-lg whitespace-nowrap">
                  0 SAT
                </p>
                <p className="text-red-400/70 text-sm whitespace-nowrap">
                  6 puntos · SIN monitoreo
                </p>
              </motion.div>

              {/* Espaciador invisible para mantener el tamaño */}
              <div className="invisible">
                <p className="text-red-400 font-bold text-lg whitespace-nowrap">
                  CERO Sistemas de Alerta Temprana
                </p>
                <p className="text-red-400/70 text-sm whitespace-nowrap">
                  6 puntos críticos SIN monitoreo en tiempo real
                </p>
              </div>
            </div>
          </div>

          {/* Indicador de comunidades - también alterna */}
          <div className="flex items-center gap-2 bg-[#1a1510]/80 border border-[#c9a86c]/30 px-4 py-2 rounded-lg relative overflow-hidden">
            <Users size={18} className="text-[#c9a86c]" />
            
            {/* Versión CON nombres completos */}
            <motion.span 
              animate={{ 
                opacity: showLabels ? 1 : 0,
              }}
              transition={{ 
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="text-[#c9a86c]/80 text-sm absolute left-10"
            >
              Wayuu · Wiwa · Arhuaco · Afro · Campesinos
            </motion.span>

            {/* Versión SIN etiquetas - solo conteo */}
            <motion.span 
              animate={{ 
                opacity: showLabels ? 0 : 1,
              }}
              transition={{ 
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="text-[#c9a86c]/80 text-sm absolute left-10"
            >
              5 comunidades afectadas
            </motion.span>

            {/* Espaciador invisible */}
            <span className="text-[#c9a86c]/80 text-sm invisible">
              Wayuu · Wiwa · Arhuaco · Afro · Campesinos
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
