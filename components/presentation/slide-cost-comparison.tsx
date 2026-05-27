"use client"

import { motion } from "framer-motion"
import { DollarSign, CheckCircle, X, TrendingDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"

// Datos para el gráfico de comparación
const comparisonData = [
  { name: "Boya oceanográfica", cost: 82, color: "#ef4444", perPerson: "N/A" },
  { name: "SAT IDEAM", cost: 120, color: "#f59e0b", perPerson: "$24M" },
  { name: "O'upalaMma", cost: 3.4, color: "#22c55e", perPerson: "$4.341" },
]

// Tabla comparativa
function ComparisonTable() {
  const solutions = [
    {
      name: "Boya oceanográfica",
      cost: "$82M",
      perPerson: "$82M (1 punto)",
      features: {
        communityAlert: false,
        offline: false,
        bilingual: false,
        openSource: false,
      },
      color: "#ef4444",
    },
    {
      name: "SAT IDEAM",
      cost: "$120M+",
      perPerson: "$24M (5 puntos)",
      features: {
        communityAlert: false,
        offline: false,
        bilingual: false,
        openSource: false,
      },
      color: "#f59e0b",
    },
    {
      name: "O'upalaMma",
      cost: "$3.4M",
      perPerson: "$4.341/persona",
      features: {
        communityAlert: true,
        offline: true,
        bilingual: true,
        openSource: true,
      },
      color: "#22c55e",
      highlight: true,
    },
  ]

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-[#c9a86c]/30">
            <th className="text-left py-3 px-4 text-[#c9a86c] font-semibold text-sm">
              Solución
            </th>
            <th className="text-right py-3 px-4 text-[#c9a86c] font-semibold text-sm">
              Costo
            </th>
            <th className="text-right py-3 px-4 text-[#c9a86c] font-semibold text-sm">
              Costo/persona
            </th>
            <th className="text-center py-3 px-4 text-[#c9a86c] font-semibold text-sm">
              Alerta comunitaria
            </th>
            <th className="text-center py-3 px-4 text-[#c9a86c] font-semibold text-sm">
              Offline
            </th>
            <th className="text-center py-3 px-4 text-[#c9a86c] font-semibold text-sm">
              Bilingüe
            </th>
          </tr>
        </thead>
        <tbody>
          {solutions.map((solution, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`border-b border-[#c9a86c]/10 ${
                solution.highlight
                  ? "bg-[#22c55e]/10"
                  : ""
              }`}
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: solution.color }}
                  />
                  <span
                    className={`text-sm ${
                      solution.highlight
                        ? "text-[#22c55e] font-bold"
                        : "text-[#c9a86c]"
                    }`}
                  >
                    {solution.name}
                  </span>
                </div>
              </td>
              <td
                className="py-4 px-4 text-right font-bold text-lg"
                style={{ color: solution.color }}
              >
                {solution.cost}
              </td>
              <td className="py-4 px-4 text-right text-[#c9a86c]/80 text-sm">
                {solution.perPerson}
              </td>
              <td className="py-4 px-4 text-center">
                {solution.features.communityAlert ? (
                  <CheckCircle className="inline text-[#22c55e]" size={18} />
                ) : (
                  <X className="inline text-red-500/50" size={18} />
                )}
              </td>
              <td className="py-4 px-4 text-center">
                {solution.features.offline ? (
                  <CheckCircle className="inline text-[#22c55e]" size={18} />
                ) : (
                  <X className="inline text-red-500/50" size={18} />
                )}
              </td>
              <td className="py-4 px-4 text-center">
                {solution.features.bilingual ? (
                  <CheckCircle className="inline text-[#22c55e]" size={18} />
                ) : (
                  <X className="inline text-red-500/50" size={18} />
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Gráfico de barras de costos
function CostBarChart() {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={comparisonData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
        >
          <XAxis
            type="number"
            tick={{ fill: "#c9a86c", fontSize: 12 }}
            axisLine={{ stroke: "#c9a86c30" }}
            tickFormatter={(value) => `$${value}M`}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#c9a86c", fontSize: 11 }}
            axisLine={{ stroke: "#c9a86c30" }}
            width={95}
          />
          <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
            {comparisonData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SlideCostComparison() {
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
          <DollarSign className="text-[#22c55e]" size={28} />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#c9a86c]">
              Comparativa de Costos
            </h2>
            <p className="text-[#c9a86c]/60 text-sm">
              24x más económico que soluciones tradicionales
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="h-full flex flex-col justify-center pt-20 pb-8 px-4 md:px-8 gap-6">
        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-4"
        >
          <CostBarChart />
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1a1510]/60 border border-[#c9a86c]/20 rounded-xl p-4"
        >
          <ComparisonTable />
        </motion.div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 px-4 py-2 rounded-lg">
            <TrendingDown className="text-[#22c55e]" size={20} />
            <span className="text-[#22c55e] font-semibold">
              Operación anual: $1.84M
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#2d8bb8]/10 border border-[#2d8bb8]/30 px-4 py-2 rounded-lg">
            <CheckCircle className="text-[#2d8bb8]" size={20} />
            <span className="text-[#2d8bb8] font-semibold">
              $0 en conectividad LoRa
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
