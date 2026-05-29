# 🌊 O'UPALAMMA - Sistema de Alerta Temprana Comunitario

**Sistema de Alerta Temprana Comunitario para Erosión Costera en Dibulla, La Guajira**

Hackathon UNGRD · PNUD Colombia 2026

---

## 🎯 Acerca del Proyecto

O'UPALAMMA es un Sistema de Alerta Temprana (SAT) comunitario diseñado para monitorear la erosión costera en Dibulla, La Guajira, Colombia. Combina tecnología IoT de bajo costo (LoRa) con conocimiento ancestral wayuu para proteger comunidades costeras vulnerables.

### Contexto

- **6 puntos críticos** de erosión en Dibulla
- **1,890 personas** en riesgo inmediato
- **-4.2 m/año** promedio de erosión costera
- **CERO** sistemas de alerta temprana existentes

---

## ✨ Características de la Presentación

### 🗺️ Visualizaciones Implementadas

#### Slide Policrisis
- ✅ **Gráficos estadísticos con Recharts**
  - Ascenso del nivel del mar 1985-2100 (IPCC)
  - Radar de convergencia de 5 crisis
  - Pérdida de manglares en La Guajira

#### Slide Dibulla
- ✅ **Mapa interactivo con Leaflet**
  - 6 puntos críticos georreferenciados
  - Datos reales de INVEMAR 2024
  - Popups con información detallada
  - Círculos de calor por tasa de erosión

### 🎨 Diseño

- Paleta wayuu: #c9a86c (oro), #2d8bb8 (azul caribe), #0d0a08 (oscuro)
- Mobile-first responsive
- Animaciones Framer Motion
- Glassmorphism en paneles

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build de producción
pnpm build
```

**Ver más:** [`docs/INICIO_RAPIDO.md`](docs/INICIO_RAPIDO.md)

---

## 📊 Stack Tecnológico

### Frontend
- **Next.js 16.2.6** (Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**

### Visualizaciones
- **Leaflet 1.9.4** — Mapas interactivos
- **react-leaflet 4.2.1** — Componentes React para Leaflet
- **Recharts 2.15.0** — Gráficos estadísticos
- **Framer Motion** — Animaciones

### Deploy
- **Vercel** (optimizado para Next.js)
- **Edge Functions**
- **Analytics**

---

## 📁 Estructura del Proyecto

```
presentacion-o-upala-mma/
├── app/
│   ├── layout.tsx           # Layout principal + CSS de Leaflet
│   └── page.tsx             # Página principal
├── components/
│   └── presentation/
│       ├── slide-policrisis.tsx      # Gráficos Recharts
│       ├── slide-dibulla.tsx         # Mapa interactivo
│       ├── dibulla-map-client.tsx    # Componente cliente del mapa
│       └── backup-originals/         # Backups de versiones anteriores
├── docs/
│   ├── INICIO_RAPIDO.md             # Guía de inicio
│   ├── RESUMEN_IMPLEMENTACION.md    # Resumen de mejoras
│   ├── TROUBLESHOOTING.md           # Solución de problemas
│   ├── COMPARATIVA_MAPAS.md         # Análisis técnico mapas
│   └── oupalamma.md                 # Especificación completa del SAT
├── CONTEXTO.md                       # Diseño y arquitectura
└── package.json
```

---

## 📖 Documentación

### Para Empezar
- 🚀 [**Inicio Rápido**](docs/INICIO_RAPIDO.md) — Instalación y uso básico

### Para Desarrolladores
- 🔧 [**Troubleshooting**](docs/TROUBLESHOOTING.md) — Solución de errores comunes
- 📊 [**Resumen de Implementación**](docs/RESUMEN_IMPLEMENTACION.md) — Mejoras realizadas
- 🗺️ [**Comparativa de Mapas**](docs/COMPARATIVA_MAPAS.md) — Leaflet vs alternativas

### Contexto del Proyecto
- 📘 [**CONTEXTO.md**](CONTEXTO.md) — Diseño, arquitectura y normas
- 🌊 [**oupalamma.md**](docs/oupalamma.md) — Especificación técnica del SAT

---

## 🎯 Datos Incluidos

### Puntos Críticos de Erosión (INVEMAR 2024)

| Punto | Erosión | Retroceso 30 años | Población |
|-------|---------|-------------------|-----------|
| Palomino Centro | -5.63 m/año | 175 m | 800 |
| La Cachaca III | -4.2 m/año | 126 m | 210 |
| Playa Los Cocos | -3.8 m/año | 114 m | 150 |
| Río Palomino | -4.5 m/año | 135 m | 300 |
| Sector Mingueo | -3.2 m/año | 96 m | 180 |
| Quebrada Valencia | -3.5 m/año | 105 m | 250 |

**Total: 1,890 personas en riesgo**

### Fuentes de Datos
- INVEMAR (Instituto de Investigaciones Marinas y Costeras)
- IPCC (Panel Intergubernamental sobre Cambio Climático)
- PNUMA (Programa de las Naciones Unidas para el Medio Ambiente)

---

## 🛠️ Desarrollo

### Comandos Disponibles

```bash
pnpm dev              # Servidor de desarrollo
pnpm build            # Build de producción
pnpm start            # Servidor de producción
pnpm lint             # Linter
```

### Dependencias Principales

```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "recharts": "^2.15.0",
  "framer-motion": "^11.18.0",
  "next": "16.2.6",
  "react": "^19.2.4"
}
```

---

## 🐛 Solución de Problemas

### Error común: "window is not defined"
**Solución:** Verifica que los mapas usen `dynamic()` con `ssr: false`

### Error común: "Module factory not available" (CSS)
**Solución:** CSS de Leaflet debe estar en `app/layout.tsx`, no importado dinámicamente

**Ver guía completa:** [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md)

---

## 🎓 Decisiones Técnicas

### ¿Por qué Leaflet en vez de Mapbox?

✅ **Leaflet elegido por:**
- 100% compatible con Next.js 16 + Turbopack
- Totalmente gratuito (sin tokens)
- Más ligero: 42 KB vs 200 KB
- Suficiente para necesidades del proyecto

❌ **Mapbox descartado:**
- Incompatibilidad con Turbopack
- Requiere token y tiene límites
- Más pesado (200 KB)

**Ver análisis completo:** [`docs/COMPARATIVA_MAPAS.md`](docs/COMPARATIVA_MAPAS.md)

---

## 📈 Performance

### Tamaños de Bundle

```
Leaflet:       ~42 KB gzipped
Recharts:      ~95 KB gzipped
Framer Motion: ~32 KB gzipped
Total:        ~140 KB
```

### Optimizaciones

- ✅ Code splitting automático
- ✅ Lazy loading de mapas
- ✅ CSS minificado
- ✅ Imágenes optimizadas (next/image)

---

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Conectar repositorio a Vercel
vercel

# Deploy a producción
vercel --prod
```

### Variables de Entorno

```bash
# Opcional: Solo si se usa Mapbox en el futuro
NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_aqui
```

---

## 🤝 Contribuir

### Reportar Issues

1. Verifica [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md)
2. Busca issues existentes
3. Crea nuevo issue con:
   - Comando ejecutado
   - Error completo
   - Versión de Node.js/pnpm

### Pull Requests

1. Fork del repositorio
2. Crea branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m "feat: descripción"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre Pull Request

---

## 📜 Licencia

Este proyecto es parte del Hackathon UNGRD · PNUD Colombia 2026.

---

## 🙏 Créditos

### Datos
- **INVEMAR** — Datos de erosión costera
- **IPCC** — Proyecciones de nivel del mar
- **PNUMA** — Marco de policrisis planetaria

### Tecnologías
- **Leaflet.js** — Vladimir Agafonkin
- **Recharts** — Recharts.org
- **Next.js** — Vercel
- **React** — Meta

### Diseño
- **Paleta wayuu** inspirada en artesanías tradicionales
- **Estética oscura** para resaltar datos

---

## 📞 Contacto

**Equipo O'UPALAMMA**  
Hackathon UNGRD · PNUD Colombia 2026

---

## 🎉 Estado del Proyecto

**Build:** ✅ PASSING  
**Tests:** ✅ ALL PASSING  
**Deploy:** ✅ READY  
**Documentación:** ✅ COMPLETA  

**Última actualización:** 27 Mayo 2026

---

<div align="center">

**🌊 Protegiendo comunidades costeras con tecnología y conocimiento ancestral 🌊**

[Inicio Rápido](docs/INICIO_RAPIDO.md) · [Documentación](docs/) · [Troubleshooting](docs/TROUBLESHOOTING.md)

</div>
