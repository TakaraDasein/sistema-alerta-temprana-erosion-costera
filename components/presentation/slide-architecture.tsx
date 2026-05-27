"use client"

import { motion } from "framer-motion"
import { 
  Radio, 
  Cpu, 
  Bell, 
  Wifi, 
  Sun, 
  ThermometerSun, 
  Waves,
  CloudRain,
  Vibrate,
  CheckCircle,
  Satellite
} from "lucide-react"
import { useState } from "react"

// Diagrama de arquitectura de 5 capas
function ArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  const layers = [
    {
      id: 1,
      title: "CAPA 1: MONITOREO",
      subtitle: "Nodo Sensor (Heltec V4.3)",
      color: "#2d8bb8",
      icon: ThermometerSun,
      items: [
        { icon: ThermometerSun, text: "Mini estación RS485 (viento, lluvia, presión)" },
        { icon: Waves, text: "Nivel agua JSN-SR04T" },
        { icon: CloudRain, text: "Humedad suelo SEN0193" },
        { icon: Vibrate, text: "Vibración 801S" },
        { icon: Sun, text: "Panel solar 10W · 24 días autonomía" },
      ],
    },
    {
      id: 2,
      title: "CAPA 2: LoRa MESH",
      subtitle: "Red Meshtastic 915 MHz",
      color: "#22c55e",
      icon: Radio,
      items: [
        { icon: Radio, text: "Banda 915 MHz (uso libre Colombia)" },
        { icon: Wifi, text: "8-12 km por salto" },
        { icon: CheckCircle, text: "Sin internet, sin SIM, sin mensualidades" },
      ],
    },
    {
      id: 3,
      title: "CAPA 3: PROCESAMIENTO",
      subtitle: "Gateway RPi4 + Stack Docker",
      color: "#f59e0b",
      icon: Cpu,
      items: [
        { icon: Cpu, text: "Node-RED | InfluxDB | Grafana" },
        { icon: Satellite, text: "Validación Sentinel-2 cada 5 días" },
        { icon: CheckCircle, text: "Dashboard público Grafana Cloud" },
      ],
    },
    {
      id: 4,
      title: "CAPA 4: VALIDACIÓN",
      subtitle: "4 Niveles de Alerta",
      color: "#a855f7",
      icon: Bell,
      items: [
        { icon: CheckCircle, text: "🟢 Verde: Condiciones normales" },
        { icon: CheckCircle, text: "🟡 Amarillo: Oleaje creciente" },
        { icon: CheckCircle, text: "🟠 Naranja: Mar de leva activo" },
        { icon: CheckCircle, text: "🔴 Rojo: Evacuación inmediata" },
      ],
    },
    {
      id: 5,
      title: "CAPA 5: ALERTA",
      subtitle: "Multicanal Bilingüe",
      color: "#ef4444",
      icon: Bell,
      items: [
        { icon: Bell, text: "Sirena 115 dB (400m radio)" },
        { icon: Radio, text: "Red LoRa + Radio comunitaria" },
        { icon: CheckCircle, text: "WhatsApp + Vocería wayuu" },
        { icon: CheckCircle, text: "Español + Wayuunaiki" },
      ],
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="space-y-3">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className={`relative overflow-hidden rounded-lg border transition-all duration-300 cursor-pointer ${
              activeLayer === layer.id
                ? "border-opacity-100"
                : "border-opacity-30"
            }`}
            style={{
              borderColor: layer.color,
              backgroundColor: activeLayer === layer.id ? `${layer.color}15` : "#1a151080",
            }}
            onMouseEnter={() => setActiveLayer(layer.id)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${layer.color}30` }}
              >
                <layer.icon size={20} style={{ color: layer.color }} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm" style={{ color: layer.color }}>
                  {layer.title}
                </h4>
                <p className="text-[#c9a86c]/70 text-xs">{layer.subtitle}</p>
              </div>
            </div>

            {/* Expanded content */}
            <motion.div
              initial={false}
              animate={{
                height: activeLayer === layer.id ? "auto" : 0,
                opacity: activeLayer === layer.id ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                {layer.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-[#c9a86c]/80"
                  >
                    <item.icon size={12} style={{ color: layer.color }} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Connector line */}
            {index < layers.length - 1 && (
              <div className="absolute left-1/2 -bottom-3 w-0.5 h-3 bg-[#c9a86c]/30" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-3 mt-6"
      >
        {["OFFLINE-FIRST", "OPEN SOURCE", "REPLICABLE"].map((badge, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-[#c9a86c]/20 text-[#c9a86c] border border-[#c9a86c]/30"
          >
            {badge}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function SlideArchitecture() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#1a1510] to-[#0d0a08] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20"
      >
        <div className="flex items-center gap-3">
          <Cpu className="text-[#2d8bb8]" size={28} />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#c9a86c]">
              {"Arquitectura O'upalaMma"}
            </h2>
            <p className="text-[#c9a86c]/60 text-sm">
              Sistema de 5 capas · COP $3.4 millones
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="h-full flex items-center justify-center pt-20 pb-8 overflow-y-auto">
        <ArchitectureDiagram />
      </div>
    </div>
  )
}
