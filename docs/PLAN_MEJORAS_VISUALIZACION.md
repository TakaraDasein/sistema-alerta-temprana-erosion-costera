# PLAN DE MEJORAS — VISUALIZACIÓN DE DATOS Y MAPAS INTERACTIVOS

> **Proyecto**: O'UPALAMMA - Sistema de Alerta Temprana Comunitario  
> **Objetivo**: Robustecer cada slide con visualizaciones de datos avanzadas usando Recharts y mapas interactivos con Mapbox GL JS  
> **Fecha**: 2026-05-27

---

## 📊 Índice de Mejoras por Slide

| Slide | Estado Actual | Mejora Propuesta | Prioridad |
|-------|---------------|------------------|-----------|
| 0. Slide Title | ✅ Completo | ➕ Animación de partículas mejorada | Baja |
| 1. Slide SAT | ⚠️ Básico | ➕ Diagrama interactivo de capas del sistema | Alta |
| 2. Slide Policrisis | ⚠️ Básico | ➕ Gráficos de impacto climático con Recharts | Alta |
| 3. Slide Dibulla | ❌ Sin mapa | ➕ Mapa interactivo Mapbox con puntos críticos | **Crítica** |
| 4. Slide Architecture | ⚠️ Básico | ➕ Diagrama de flujo de datos animado | Alta |
| 5. Slide LoRa Network | ❌ Sin visual | ➕ Mapa de cobertura LoRa + topología mesh | **Crítica** |
| 6. Slide Cost Comparison | ✅ Recharts | ➕ Gráficos adicionales (pie chart, area chart) | Media |
| 7. Slide Replicability | ⚠️ Básico | ➕ Mapa de Colombia con 86 puntos críticos | Alta |
| 8. Slide Closing | ✅ Completo | ➕ Animación de impacto numérico | Baja |
| **NUEVO** | — | ➕ Slide de Monitoreo de Variables en Tiempo Real | Alta |

---

## 🗺️ PARTE 1: MAPAS INTERACTIVOS CON MAPBOX GL JS

### ¿Por qué Mapbox GL JS?

**Ventajas**:
- ✅ Open source (licencia BSD)
- ✅ Tier gratuito generoso: 50,000 cargas de mapa/mes
- ✅ Rendimiento superior con WebGL
- ✅ Integración nativa con React (`react-map-gl`)
- ✅ Estilos personalizables (modo oscuro compatible con diseño O'UPALAMMA)
- ✅ Soporte para GeoJSON, capas vectoriales, heat maps
- ✅ Comunidad activa y bien documentado

**Comparación con alternativas**:

| Librería | Licencia | Costo | Rendimiento | React Support | Recomendación |
|----------|----------|-------|-------------|---------------|---------------|
| **Mapbox GL JS** | BSD | Gratuito (50k/mes) | ⭐⭐⭐⭐⭐ | Excelente | ✅ **RECOMENDADO** |
| Leaflet | BSD | Gratuito | ⭐⭐⭐ | Bueno | ✅ Alternativa |
| Google Maps | Propietaria | $200 crédito/mes | ⭐⭐⭐⭐ | Regular | ❌ No open source |
| OpenLayers | BSD-2 | Gratuito | ⭐⭐⭐⭐ | Regular | ✅ Alternativa |

### Instalación de Dependencias

```bash
pnpm add mapbox-gl@^3.10.0
pnpm add react-map-gl@^7.1.7
pnpm add @types/mapbox-gl@^3.4.1 -D
```

### Configuración de Token Mapbox

1. Crear cuenta gratuita en https://account.mapbox.com/
2. Obtener token de acceso público
3. Agregar a `.env.local`:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbHh4eHh4eHh4In0.xxxxxxxxxxxxx
```

4. Actualizar `.env.example`:

```bash
# Mapbox GL JS Token (público - solo lectura)
NEXT_PUBLIC_MAPBOX_TOKEN=
```

---

## 📍 MEJORA 1: Slide Dibulla - Mapa Interactivo de Puntos Críticos

### Objetivo

Crear un mapa interactivo de Dibulla que muestre:
- 6 puntos críticos de erosión costera
- Tasa de retroceso anual (m/año)
- Comunidades afectadas
- Infraestructura en riesgo
- Línea de costa histórica (1985 vs 2025)

### Datos Geográficos (GeoJSON)

Según INVEMAR (2024) y el documento oupalamma.md, los 6 puntos críticos de Dibulla son:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-73.3877, 11.2766]
      },
      "properties": {
        "id": 1,
        "nombre": "Palomino Centro",
        "tasaErosion": -5.63,
        "comunidad": "Comunidad mixta (wayuu, afro, campesinos)",
        "poblacionAfectada": 800,
        "infraestructura": "Hoteles, restaurantes, viviendas",
        "retroceso30anos": 175,
        "nivel": "crítico"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-73.3950, 11.2820]
      },
      "properties": {
        "id": 2,
        "nombre": "La Cachaca III",
        "tasaErosion": -4.2,
        "comunidad": "42 familias wayuu",
        "poblacionAfectada": 210,
        "infraestructura": "Albercas de agua, cementerio ancestral, cultivos",
        "retroceso30anos": 126,
        "nivel": "crítico"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-73.4100, 11.2950]
      },
      "properties": {
        "id": 3,
        "nombre": "Playa Los Cocos",
        "tasaErosion": -3.8,
        "comunidad": "Turística y pesquera",
        "poblacionAfectada": 150,
        "infraestructura": "Posadas, zona de pesca artesanal",
        "retroceso30anos": 114,
        "nivel": "alto"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-73.3700, 11.2600]
      },
      "properties": {
        "id": 4,
        "nombre": "Desembocadura Río Palomino",
        "tasaErosion": -4.5,
        "comunidad": "Wiwa y campesinos",
        "poblacionAfectada": 300,
        "infraestructura": "Puente, acceso turístico, manglar",
        "retroceso30anos": 135,
        "nivel": "crítico"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-73.4250, 11.3100]
      },
      "properties": {
        "id": 5,
        "nombre": "Sector Mingueo",
        "tasaErosion": -3.2,
        "comunidad": "Rancherías wayuu",
        "poblacionAfectada": 180,
        "infraestructura": "Viviendas tradicionales, pozo de agua",
        "retroceso30anos": 96,
        "nivel": "medio"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-73.3500, 11.2450]
      },
      "properties": {
        "id": 6,
        "nombre": "Quebrada Valencia",
        "tasaErosion": -3.5,
        "comunidad": "Afrodescendientes",
        "poblacionAfectada": 250,
        "infraestructura": "Escuela, centro comunitario",
        "retroceso30anos": 105,
        "nivel": "alto"
      }
    }
  ]
}
```

### Componente React: `MapDibullaCriticalPoints.tsx`

```typescript
"use client"

import { useRef, useEffect, useState } from "react"
import Map, { Marker, Popup, Source, Layer } from "react-map-gl"
import { MapPin, AlertTriangle, TrendingDown, Users } from "lucide-react"
import "mapbox-gl/dist/mapbox-gl.css"

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
  // ... resto de puntos
]

const getLevelColor = (nivel: string) => {
  switch (nivel) {
    case "crítico": return "#ef4444"
    case "alto": return "#f59e0b"
    case "medio": return "#eab308"
    default: return "#22c55e"
  }
}

export function MapDibullaCriticalPoints() {
  const [selectedPoint, setSelectedPoint] = useState<CriticalPoint | null>(null)
  const [viewState, setViewState] = useState({
    longitude: -73.3877,
    latitude: 11.2766,
    zoom: 11.5
  })

  return (
    <div className="relative w-full h-full">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Marcadores de puntos críticos */}
        {criticalPoints.map((point) => (
          <Marker
            key={point.id}
            longitude={point.coordinates[0]}
            latitude={point.coordinates[1]}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelectedPoint(point)
            }}
          >
            <div className="relative cursor-pointer group">
              {/* Pulso animado */}
              <div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: getLevelColor(point.nivel) + "40" }}
              />
              
              {/* Pin principal */}
              <div
                className="relative w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-lg transform group-hover:scale-125 transition-transform"
                style={{ backgroundColor: getLevelColor(point.nivel) }}
              >
                <AlertTriangle className="text-white" size={16} />
              </div>
            </div>
          </Marker>
        ))}

        {/* Popup de información */}
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
            <div className="p-3 bg-[#1a1510] text-[#c9a86c] min-w-[280px]">
              <h3 className="text-lg font-bold mb-2 text-[#c9a86c]">
                {selectedPoint.nombre}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingDown className="text-red-500" size={16} />
                  <span className="font-semibold text-red-500">
                    {selectedPoint.tasaErosion} m/año
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-orange-500" size={16} />
                  <span>
                    {selectedPoint.retroceso30anos}m perdidos (1985-2025)
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="text-[#2d8bb8]" size={16} />
                  <span>
                    {selectedPoint.poblacionAfectada} personas afectadas
                  </span>
                </div>
                
                <div className="border-t border-[#c9a86c]/20 pt-2 mt-2">
                  <p className="text-xs text-[#c9a86c]/80 mb-1">
                    <strong>Comunidad:</strong> {selectedPoint.comunidad}
                  </p>
                  <p className="text-xs text-[#c9a86c]/80">
                    <strong>En riesgo:</strong> {selectedPoint.infraestructura}
                  </p>
                </div>
              </div>
            </div>
          </Popup>
        )}

        {/* Capa de heat map (opcional) */}
        <Source
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: criticalPoints.map(p => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: p.coordinates
              },
              properties: {
                erosion: Math.abs(p.tasaErosion)
              }
            }))
          }}
        >
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
              "heatmap-opacity": 0.3
            }}
          />
        </Source>
      </Map>

      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-[#1a1510]/90 border border-[#c9a86c]/30 rounded-lg p-3 backdrop-blur-sm">
        <h4 className="text-[#c9a86c] font-semibold text-sm mb-2">
          Nivel de Riesgo
        </h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[#c9a86c]/80">Crítico (&gt;4 m/año)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-[#c9a86c]/80">Alto (3-4 m/año)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-[#c9a86c]/80">Medio (2-3 m/año)</span>
          </div>
        </div>
      </div>

      {/* Estadísticas agregadas */}
      <div className="absolute top-4 right-4 bg-[#1a1510]/90 border border-[#c9a86c]/30 rounded-lg p-3 backdrop-blur-sm">
        <div className="space-y-2">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#c9a86c]">
              {criticalPoints.reduce((sum, p) => sum + p.poblacionAfectada, 0).toLocaleString()}
            </p>
            <p className="text-xs text-[#c9a86c]/60">Personas en riesgo</p>
          </div>
          <div className="text-center border-t border-[#c9a86c]/20 pt-2">
            <p className="text-xl font-bold text-red-500">
              {criticalPoints.length}
            </p>
            <p className="text-xs text-[#c9a86c]/60">Puntos críticos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 📊 MEJORA 2: Slide Policrisis - Visualización de Datos Climáticos

### Objetivo

Mostrar el impacto de la policrisis planetaria con gráficos interactivos:
1. **Área Chart**: Ascenso del nivel del mar (1985-2100)
2. **Radar Chart**: Convergencia de las 3 crisis
3. **Line Chart**: Pérdida de manglares en Colombia (1990-2025)

### Componente: `SlidePolicrisisEnhanced.tsx`

```typescript
"use client"

import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

// Datos: Ascenso del nivel del mar (IPCC, 2021)
const seaLevelData = [
  { year: 1985, nivel: 0, escenario: "Histórico" },
  { year: 1990, nivel: 0.05, escenario: "Histórico" },
  { year: 1995, nivel: 0.08, escenario: "Histórico" },
  { year: 2000, nivel: 0.12, escenario: "Histórico" },
  { year: 2005, nivel: 0.16, escenario: "Histórico" },
  { year: 2010, nivel: 0.20, escenario: "Histórico" },
  { year: 2015, nivel: 0.25, escenario: "Histórico" },
  { year: 2020, nivel: 0.30, escenario: "Histórico" },
  { year: 2025, nivel: 0.35, escenario: "Proyección" },
  { year: 2030, nivel: 0.42, escenario: "RCP 4.5" },
  { year: 2040, nivel: 0.55, escenario: "RCP 4.5" },
  { year: 2050, nivel: 0.70, escenario: "RCP 4.5" },
  { year: 2060, nivel: 0.85, escenario: "RCP 8.5" },
  { year: 2070, nivel: 1.05, escenario: "RCP 8.5" },
  { year: 2080, nivel: 1.30, escenario: "RCP 8.5" },
  { year: 2090, nivel: 1.60, escenario: "RCP 8.5" },
  { year: 2100, nivel: 2.00, escenario: "RCP 8.5" }
]

// Datos: Convergencia de las 3 crisis (índice 0-100)
const policrisisData = [
  { crisis: "Cambio Climático", colombia: 78, global: 85, max: 100 },
  { crisis: "Pérdida Biodiversidad", colombia: 82, global: 75, max: 100 },
  { crisis: "Contaminación", colombia: 68, global: 70, max: 100 },
  { crisis: "Erosión Costera", colombia: 88, global: 65, max: 100 },
  { crisis: "Vulnerabilidad Social", colombia: 75, global: 60, max: 100 }
]

// Datos: Pérdida de manglares (INVEMAR)
const mangroveData = [
  { year: 1990, hectareas: 450000, perdida: 0 },
  { year: 1995, hectareas: 435000, perdida: 15000 },
  { year: 2000, hectareas: 418000, perdida: 32000 },
  { year: 2005, hectareas: 398000, perdida: 52000 },
  { year: 2010, hectareas: 380000, perdida: 70000 },
  { year: 2015, hectareas: 365000, perdida: 85000 },
  { year: 2020, hectareas: 352000, perdida: 98000 },
  { year: 2025, hectareas: 340000, perdida: 110000 }
]

export function SlidePolicrisisEnhanced() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#0d0a08] via-[#1a1510] to-[#0d0a08] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#c9a86c] mb-2">
          La Policrisis Planetaria
        </h2>
        <p className="text-[#c9a86c]/70 text-sm md:text-base">
          Cambio climático + Pérdida de biodiversidad + Contaminación = Erosión costera acelerada
        </p>
      </motion.div>

      {/* Main content grid */}
      <div className="h-full pt-24 pb-8 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Ascenso del nivel del mar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-4"
        >
          <h3 className="text-[#c9a86c] font-semibold mb-3 text-sm">
            Ascenso del Nivel del Mar (1985-2100)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={seaLevelData}>
              <defs>
                <linearGradient id="colorNivel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d8bb8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2d8bb8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#c9a86c20" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: "#c9a86c", fontSize: 11 }}
                stroke="#c9a86c30"
              />
              <YAxis 
                tick={{ fill: "#c9a86c", fontSize: 11 }}
                stroke="#c9a86c30"
                label={{ value: "metros", angle: -90, position: "insideLeft", fill: "#c9a86c" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1a1510", 
                  border: "1px solid #c9a86c40",
                  borderRadius: "8px"
                }}
                labelStyle={{ color: "#c9a86c" }}
              />
              <Area 
                type="monotone" 
                dataKey="nivel" 
                stroke="#2d8bb8" 
                fillOpacity={1} 
                fill="url(#colorNivel)" 
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#c9a86c]/60 mt-2">
            Fuente: IPCC (2021) - Escenarios RCP 4.5 y RCP 8.5
          </p>
        </motion.div>

        {/* Chart 2: Radar de la Policrisis */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-4"
        >
          <h3 className="text-[#c9a86c] font-semibold mb-3 text-sm">
            Convergencia de Crisis: Colombia vs Global
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={policrisisData}>
              <PolarGrid stroke="#c9a86c30" />
              <PolarAngleAxis 
                dataKey="crisis" 
                tick={{ fill: "#c9a86c", fontSize: 10 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: "#c9a86c", fontSize: 10 }}
              />
              <Radar 
                name="Colombia" 
                dataKey="colombia" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.5} 
              />
              <Radar 
                name="Promedio Global" 
                dataKey="global" 
                stroke="#2d8bb8" 
                fill="#2d8bb8" 
                fillOpacity={0.3} 
              />
              <Legend 
                wrapperStyle={{ fontSize: "11px" }}
                iconType="circle"
              />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#c9a86c]/60 mt-2">
            Índice de severidad (0-100) - Fuente: PNUMA (2021)
          </p>
        </motion.div>

        {/* Chart 3: Pérdida de manglares */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-4 lg:col-span-2"
        >
          <h3 className="text-[#c9a86c] font-semibold mb-3 text-sm">
            Pérdida de Manglares en Colombia (1990-2025)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mangroveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c9a86c20" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: "#c9a86c", fontSize: 11 }}
                stroke="#c9a86c30"
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: "#22c55e", fontSize: 11 }}
                stroke="#22c55e"
                label={{ value: "Hectáreas", angle: -90, position: "insideLeft", fill: "#22c55e" }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#ef4444", fontSize: 11 }}
                stroke="#ef4444"
                label={{ value: "Pérdida acum.", angle: 90, position: "insideRight", fill: "#ef4444" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1a1510", 
                  border: "1px solid #c9a86c40",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="hectareas" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Área de manglares"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="perdida" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Pérdida acumulada"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#c9a86c]/60 mt-2">
            Fuente: INVEMAR (2024) - Los manglares actúan como barrera natural contra la erosión costera
          </p>
        </motion.div>
      </div>

      {/* Stats destacadas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-3"
      >
        <div className="bg-red-500/20 border border-red-500/40 px-3 py-2 rounded-lg">
          <p className="text-red-500 font-bold text-sm">+2m nivel del mar (2100)</p>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 px-3 py-2 rounded-lg">
          <p className="text-orange-500 font-bold text-sm">-110,000 ha manglares</p>
        </div>
        <div className="bg-[#2d8bb8]/20 border border-[#2d8bb8]/40 px-3 py-2 rounded-lg">
          <p className="text-[#2d8bb8] font-bold text-sm">86 puntos críticos</p>
        </div>
      </motion.div>
    </div>
  )
}
```

---

## 🌐 MEJORA 3: Slide LoRa Network - Mapa de Cobertura y Topología Mesh

### Objetivo

Visualizar:
1. Alcance de la red LoRa (círculos de 8-12 km)
2. Topología mesh store-and-forward
3. Nodos comunitarios expandiendo la red

### Componente: `SlideLoRaNetworkEnhanced.tsx`

```typescript
"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Map, { Source, Layer, Marker } from "react-map-gl"
import { Radio, Users, Wifi, TrendingUp } from "lucide-react"
import "mapbox-gl/dist/mapbox-gl.css"

// Configuración de nodos
const mainNode = {
  id: "main",
  name: "Nodo Sensor Principal",
  coordinates: [-73.3877, 11.2766] as [number, number],
  type: "gateway",
  range: 12000 // metros
}

const communityNodes = [
  { id: "c1", name: "Vigía Comunidad 1", coordinates: [-73.3950, 11.2820] as [number, number], type: "community" },
  { id: "c2", name: "Pescador 1", coordinates: [-73.3700, 11.2600] as [number, number], type: "community" },
  { id: "c3", name: "Turista 1", coordinates: [-73.4100, 11.2950] as [number, number], type: "community" },
  { id: "c4", name: "Vigía Comunidad 2", coordinates: [-73.4250, 11.3100] as [number, number], type: "community" }
]

// Función para crear círculo de cobertura (GeoJSON)
function createCoverageCircle(center: [number, number], radiusInMeters: number) {
  const points = 64
  const coords = []
  const distanceX = radiusInMeters / (111320 * Math.cos((center[1] * Math.PI) / 180))
  const distanceY = radiusInMeters / 110574

  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI)
    const x = distanceX * Math.cos(theta)
    const y = distanceY * Math.sin(theta)
    coords.push([center[0] + x, center[1] + y])
  }
  coords.push(coords[0]) // cerrar el polígono

  return {
    type: "Feature" as const,
    geometry: {
      type: "Polygon" as const,
      coordinates: [coords]
    }
  }
}

export function SlideLoRaNetworkEnhanced() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [showConnections, setShowConnections] = useState(true)

  const coverageCircle = createCoverageCircle(mainNode.coordinates, mainNode.range)

  // Líneas de conexión mesh
  const connectionLines = {
    type: "FeatureCollection" as const,
    features: communityNodes.map(node => ({
      type: "Feature" as const,
      geometry: {
        type: "LineString" as const,
        coordinates: [mainNode.coordinates, node.coordinates]
      },
      properties: {
        id: node.id
      }
    }))
  }

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#0d0a08] to-[#1a1510] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20 bg-gradient-to-b from-[#0d0a08] to-transparent"
      >
        <div className="flex items-center gap-3">
          <Radio className="text-[#22c55e]" size={32} />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#c9a86c]">
              Red LoRa Meshtastic
            </h2>
            <p className="text-[#c9a86c]/60 text-sm">
              Comunicación sin internet • Banda 915 MHz libre • Store-and-forward
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mapa */}
      <div className="absolute inset-0 pt-24">
        <Map
          initialViewState={{
            longitude: -73.3877,
            latitude: 11.2766,
            zoom: 11
          }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Círculo de cobertura */}
          <Source type="geojson" data={coverageCircle}>
            <Layer
              id="coverage-circle"
              type="fill"
              paint={{
                "fill-color": "#22c55e",
                "fill-opacity": 0.15
              }}
            />
            <Layer
              id="coverage-circle-outline"
              type="line"
              paint={{
                "line-color": "#22c55e",
                "line-width": 2,
                "line-dasharray": [2, 2]
              }}
            />
          </Source>

          {/* Líneas de conexión mesh */}
          {showConnections && (
            <Source type="geojson" data={connectionLines}>
              <Layer
                id="mesh-connections"
                type="line"
                paint={{
                  "line-color": "#2d8bb8",
                  "line-width": 2,
                  "line-opacity": 0.6,
                  "line-dasharray": [1, 2]
                }}
              />
            </Source>
          )}

          {/* Nodo principal (gateway) */}
          <Marker
            longitude={mainNode.coordinates[0]}
            latitude={mainNode.coordinates[1]}
            anchor="center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="relative"
            >
              {/* Pulsos concéntricos */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-[#22c55e] rounded-full opacity-20 animate-ping" />
                <div 
                  className="absolute w-16 h-16 bg-[#22c55e] rounded-full opacity-20 animate-ping"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              {/* Nodo principal */}
              <div className="relative w-12 h-12 bg-[#22c55e] rounded-full border-4 border-white shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Wifi className="text-white" size={20} />
              </div>

              {/* Label */}
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-[#1a1510] border border-[#22c55e] px-2 py-1 rounded whitespace-nowrap">
                <p className="text-[#22c55e] font-semibold text-xs">
                  Gateway Principal
                </p>
              </div>
            </motion.div>
          </Marker>

          {/* Nodos comunitarios */}
          {communityNodes.map((node, i) => (
            <Marker
              key={node.id}
              longitude={node.coordinates[0]}
              latitude={node.coordinates[1]}
              anchor="center"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.2, type: "spring" }}
                className="relative"
              >
                <div 
                  className="w-8 h-8 bg-[#2d8bb8] rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-125 transition-transform"
                  onClick={() => setSelectedNode(node.id)}
                >
                  <Users className="text-white" size={14} />
                </div>

                {selectedNode === node.id && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-[#1a1510] border border-[#2d8bb8] px-2 py-1 rounded whitespace-nowrap z-10">
                    <p className="text-[#2d8bb8] font-semibold text-xs">
                      {node.name}
                    </p>
                  </div>
                )}
              </motion.div>
            </Marker>
          ))}
        </Map>
      </div>

      {/* Panel de información */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="absolute top-32 left-4 bg-[#1a1510]/95 border border-[#c9a86c]/30 rounded-xl p-4 max-w-xs backdrop-blur-sm"
      >
        <h3 className="text-[#c9a86c] font-bold mb-3 flex items-center gap-2">
          <Radio className="text-[#22c55e]" size={18} />
          Red Meshtastic
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-[#c9a86c]/70">Alcance por salto:</span>
            <span className="text-[#22c55e] font-semibold">8-12 km</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#c9a86c]/70">Frecuencia:</span>
            <span className="text-[#2d8bb8] font-semibold">915 MHz</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#c9a86c]/70">Cifrado:</span>
            <span className="text-[#c9a86c] font-semibold">AES-128</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#c9a86c]/70">Costo nodo:</span>
            <span className="text-[#22c55e] font-semibold">$149.300</span>
          </div>

          <div className="border-t border-[#c9a86c]/20 pt-3">
            <div className="flex items-center gap-2 text-xs text-[#c9a86c]/60">
              <TrendingUp className="text-[#22c55e]" size={14} />
              <span>Cada nodo amplía la red automáticamente</span>
            </div>
          </div>

          <div className="bg-[#22c55e]/10 border border-[#22c55e]/30 rounded p-2">
            <p className="text-xs text-[#22c55e] text-center">
              ✓ Sin internet • Sin SIM • Sin mensualidades
            </p>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-3"
      >
        <div className="bg-[#1a1510]/90 border border-[#22c55e]/40 px-4 py-2 rounded-lg">
          <p className="text-[#22c55e] font-bold text-center">
            {communityNodes.length + 1}
          </p>
          <p className="text-[#c9a86c]/60 text-xs">Nodos activos</p>
        </div>

        <div className="bg-[#1a1510]/90 border border-[#2d8bb8]/40 px-4 py-2 rounded-lg">
          <p className="text-[#2d8bb8] font-bold text-center">
            ~45 km²
          </p>
          <p className="text-[#c9a86c]/60 text-xs">Área de cobertura</p>
        </div>

        <div className="bg-[#1a1510]/90 border border-[#c9a86c]/40 px-4 py-2 rounded-lg">
          <p className="text-[#c9a86c] font-bold text-center">
            Ilimitada
          </p>
          <p className="text-[#c9a86c]/60 text-xs">Escalabilidad</p>
        </div>
      </motion.div>
    </div>
  )
}
```

---

## 📈 MEJORA 4: Nuevo Slide - Monitoreo de Variables Ambientales

### Objetivo

Dashboard en tiempo real simulado de las 7 variables monitoreadas:
1. Presión atmosférica (hPa)
2. Velocidad del viento (m/s)
3. Precipitación (mm/h)
4. Nivel del agua (m)
5. Humedad del suelo (%)
6. Temperatura (°C)
7. Vibración (impactos/min)

### Componente: `SlideEnvironmentalMonitoring.tsx`

```typescript
"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { Activity, Wind, Droplets, Waves, Gauge, Thermometer, Zap } from "lucide-react"

// Simulación de datos en tiempo real
function generateRealtimeData() {
  const now = new Date()
  const data = []
  
  for (let i = 30; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000) // cada minuto
    data.push({
      time: time.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      presion: 1013 + Math.sin(i / 5) * 3 + Math.random() * 2,
      viento: 5 + Math.sin(i / 3) * 3 + Math.random() * 2,
      lluvia: Math.max(0, Math.sin(i / 4) * 10 + Math.random() * 5),
      nivelAgua: 0.3 + Math.sin(i / 6) * 0.2 + Math.random() * 0.1,
      humedadSuelo: 25 + Math.sin(i / 4) * 10 + Math.random() * 5,
      temperatura: 28 + Math.sin(i / 5) * 2 + Math.random(),
      vibracion: Math.max(0, Math.floor(Math.sin(i / 2) * 20 + Math.random() * 10))
    })
  }
  
  return data
}

export function SlideEnvironmentalMonitoring() {
  const [data, setData] = useState(generateRealtimeData())
  const [alertLevel, setAlertLevel] = useState<"verde" | "amarillo" | "naranja" | "rojo">("verde")

  // Simular actualización en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)]
        const lastPoint = prev[prev.length - 1]
        const now = new Date()
        
        newData.push({
          time: now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          presion: lastPoint.presion + (Math.random() - 0.5) * 0.5,
          viento: Math.max(0, lastPoint.viento + (Math.random() - 0.5) * 2),
          lluvia: Math.max(0, lastPoint.lluvia + (Math.random() - 0.5) * 3),
          nivelAgua: Math.max(0, lastPoint.nivelAgua + (Math.random() - 0.5) * 0.05),
          humedadSuelo: Math.max(0, Math.min(100, lastPoint.humedadSuelo + (Math.random() - 0.5) * 3)),
          temperatura: lastPoint.temperatura + (Math.random() - 0.5) * 0.5,
          vibracion: Math.max(0, Math.floor(lastPoint.vibracion + (Math.random() - 0.5) * 5))
        })
        
        return newData
      })
    }, 3000) // actualizar cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  const latestData = data[data.length - 1]

  // Determinar nivel de alerta
  useEffect(() => {
    if (latestData.viento > 15 || latestData.nivelAgua > 0.7 || latestData.vibracion > 50) {
      setAlertLevel("rojo")
    } else if (latestData.viento > 10 || latestData.nivelAgua > 0.5 || latestData.humedadSuelo > 60) {
      setAlertLevel("naranja")
    } else if (latestData.viento > 7 || latestData.lluvia > 15 || latestData.humedadSuelo > 40) {
      setAlertLevel("amarillo")
    } else {
      setAlertLevel("verde")
    }
  }, [latestData])

  const alertColors = {
    verde: "#22c55e",
    amarillo: "#eab308",
    naranja: "#f59e0b",
    rojo: "#ef4444"
  }

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#0d0a08] via-[#1a1510] to-[#0d0a08] overflow-hidden">
      {/* Header con nivel de alerta */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-[#22c55e]" size={32} />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#c9a86c]">
                Monitoreo Ambiental en Tiempo Real
              </h2>
              <p className="text-[#c9a86c]/60 text-sm">
                7 variables críticas • Muestreo cada 6 minutos
              </p>
            </div>
          </div>

          {/* Indicador de nivel de alerta */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="px-4 py-2 rounded-lg border-2"
            style={{ 
              borderColor: alertColors[alertLevel],
              backgroundColor: alertColors[alertLevel] + "20"
            }}
          >
            <p 
              className="font-bold uppercase text-sm"
              style={{ color: alertColors[alertLevel] }}
            >
              Nivel {alertLevel}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Grid de gráficos */}
      <div className="h-full pt-24 pb-4 px-4 md:px-6 grid grid-cols-2 lg:grid-cols-3 gap-3 overflow-auto">
        {/* Presión atmosférica */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="text-[#2d8bb8]" size={18} />
            <h3 className="text-[#c9a86c] font-semibold text-xs">Presión (hPa)</h3>
          </div>
          <div className="text-2xl font-bold text-[#2d8bb8] mb-2">
            {latestData.presion.toFixed(1)}
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={data.slice(-15)}>
              <defs>
                <linearGradient id="colorPresion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d8bb8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2d8bb8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="presion" 
                stroke="#2d8bb8" 
                fillOpacity={1} 
                fill="url(#colorPresion)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Velocidad del viento */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Wind className="text-[#22c55e]" size={18} />
            <h3 className="text-[#c9a86c] font-semibold text-xs">Viento (m/s)</h3>
          </div>
          <div className="text-2xl font-bold text-[#22c55e] mb-2">
            {latestData.viento.toFixed(1)}
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={data.slice(-15)}>
              <Line 
                type="monotone" 
                dataKey="viento" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Precipitación */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="text-[#2d8bb8]" size={18} />
            <h3 className="text-[#c9a86c] font-semibold text-xs">Lluvia (mm/h)</h3>
          </div>
          <div className="text-2xl font-bold text-[#2d8bb8] mb-2">
            {latestData.lluvia.toFixed(1)}
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={data.slice(-10)}>
              <Bar 
                dataKey="lluvia" 
                fill="#2d8bb8"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Nivel del agua */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Waves className="text-[#ef4444]" size={18} />
            <h3 className="text-[#c9a86c] font-semibold text-xs">Nivel Agua (m)</h3>
          </div>
          <div className="text-2xl font-bold text-[#ef4444] mb-2">
            {latestData.nivelAgua.toFixed(2)}
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={data.slice(-15)}>
              <defs>
                <linearGradient id="colorAgua" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="nivelAgua" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorAgua)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Humedad del suelo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="text-[#f59e0b]" size={18} />
            <h3 className="text-[#c9a86c] font-semibold text-xs">Humedad Suelo (%)</h3>
          </div>
          <div className="text-2xl font-bold text-[#f59e0b] mb-2">
            {latestData.humedadSuelo.toFixed(0)}
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={data.slice(-15)}>
              <Line 
                type="monotone" 
                dataKey="humedadSuelo" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Temperatura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="text-[#eab308]" size={18} />
            <h3 className="text-[#c9a86c] font-semibold text-xs">Temperatura (°C)</h3>
          </div>
          <div className="text-2xl font-bold text-[#eab308] mb-2">
            {latestData.temperatura.toFixed(1)}
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={data.slice(-15)}>
              <Line 
                type="monotone" 
                dataKey="temperatura" 
                stroke="#eab308" 
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Vibración */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-3 col-span-2 lg:col-span-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-[#c9a86c]" size={18} />
            <h3 className="text-[#c9a86c] font-semibold text-xs">
              Vibración - Impactos Mecánicos (impactos/min)
            </h3>
          </div>
          <div className="text-2xl font-bold text-[#c9a86c] mb-2">
            {latestData.vibracion}
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={data.slice(-20)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c9a86c20" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: "#c9a86c", fontSize: 10 }}
                interval={2}
              />
              <YAxis tick={{ fill: "#c9a86c", fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1a1510", 
                  border: "1px solid #c9a86c40",
                  borderRadius: "8px"
                }}
              />
              <Bar 
                dataKey="vibracion" 
                fill="#c9a86c"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
```

---

## 🎯 PRIORIDADES DE IMPLEMENTACIÓN

### Fase 1 - Crítica (Esta semana)

1. ✅ Instalar dependencias Mapbox
2. ✅ Crear slide Dibulla con mapa interactivo
3. ✅ Crear slide LoRa Network con cobertura

### Fase 2 - Alta (Próxima semana)

4. ✅ Mejorar slide Policrisis con gráficos Recharts
5. ✅ Crear slide de monitoreo ambiental
6. ✅ Mejorar slide de arquitectura con diagrama animado

### Fase 3 - Media (Opcional)

7. ⚪ Mejorar slide de costos con gráficos adicionales
8. ⚪ Crear slide de replicabilidad con mapa de Colombia
9. ⚪ Animaciones de transición entre slides

---

## 📚 RECURSOS Y DOCUMENTACIÓN

### Mapbox GL JS
- Docs: https://docs.mapbox.com/mapbox-gl-js/guides/
- React wrapper: https://visgl.github.io/react-map-gl/
- Estilos: https://docs.mapbox.com/api/maps/styles/

### Recharts
- Docs: https://recharts.org/en-US/
- Gallery: https://recharts.org/en-US/examples
- API: https://recharts.org/en-US/api

### GeoJSON
- Especificación: https://geojson.org/
- Editor online: http://geojson.io/
- Validador: https://geojsonlint.com/

---

## 🔄 PRÓXIMOS PASOS

1. **Revisar y aprobar este plan**
2. **Instalar dependencias de Mapbox**
3. **Crear componentes de mapas** (Dibulla + LoRa Network)
4. **Crear componentes de gráficos mejorados** (Policrisis + Monitoreo)
5. **Integrar nuevos slides en presentation-viewer.tsx**
6. **Actualizar documentación (CONTEXTO.md)**
7. **Probar en diferentes dispositivos (responsive)**
8. **Optimizar performance (lazy loading)**

---

**Autor**: OpenCode AI Assistant  
**Fecha**: 2026-05-27  
**Versión**: 1.0
