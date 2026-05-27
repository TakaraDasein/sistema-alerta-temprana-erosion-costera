# O'UPALAMMA — Presentación Interactiva

> **Sistema de Alerta Temprana Comunitario para Erosión Costera en Dibulla, La Guajira**  
> Hackathon UNGRD · PNUD Colombia 2026  
> Autor: Álvaro Efrén Bolaños Scalante — Universidad del Cauca, Politólogo

---

## 📌 ¿Qué es este proyecto?

**O'UPALAMMA** es una aplicación web de presentación interactiva tipo "slideshow" construida con **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**. Sirve como pieza de comunicación pública para el Hackathon UNGRD-PNUD 2026, mostrando la propuesta técnica de un sistema IoT-LoRa de monitoreo de erosión costera en Dibulla (La Guajira, Colombia), con sensibilidad cultural Wayuu.

---

## 🏗️ Arquitectura del Proyecto

```
presentacion-o-upala-mma/
├── app/
│   ├── globals.css          # Tokens de diseño Tailwind v4
│   ├── layout.tsx           # RootLayout — metadatos SEO, fuente Geist
│   └── page.tsx             # Entry point → <PresentationViewer />
├── components/
│   ├── presentation/
│   │   ├── index.ts                    # Re-exports públicos
│   │   ├── presentation-viewer.tsx     # Controlador principal de slides
│   │   ├── slide-title.tsx             # Slide 0 — Portada
│   │   ├── slide-policrisis.tsx        # Slide 1 — Policrisis Planetaria
│   │   ├── slide-dibulla.tsx           # Slide 2 — Dibulla, La Guajira
│   │   ├── slide-architecture.tsx      # Slide 3 — Arquitectura IoT
│   │   ├── slide-lora-network.tsx      # Slide 4 — Red LoRa
│   │   ├── slide-cost-comparison.tsx   # Slide 5 — Comparativa de Costos
│   │   ├── slide-replicability.tsx     # Slide 6 — Replicabilidad
│   │   └── slide-closing.tsx           # Slide 7 — Cierre
│   ├── ui/                             # shadcn/ui components
│   └── theme-provider.tsx
├── hooks/                   # Custom React hooks
├── lib/                     # Utilidades (cn, etc.)
├── public/images/           # Assets: logo, pattern-wayuu, etc.
├── styles/
├── PROYECTO.md              # ← Este archivo (contexto del proyecto)
├── BUENAS_PRACTICAS.md      # Guía de buenas prácticas del proyecto
├── package.json
├── pnpm-lock.yaml           # Lockfile OBLIGATORIO (solo pnpm)
├── next.config.mjs
├── tsconfig.json
└── components.json          # Configuración shadcn/ui
```

---

## 🎨 Sistema de Diseño

| Token | Valor | Uso |
|-------|-------|-----|
| `#0d0a08` | Fondo principal oscuro | Background general |
| `#1a1510` | Fondo secundario | Cards, paneles |
| `#c9a86c` | Oro Wayuu | Texto destacado, bordes, íconos |
| `#2d8bb8` | Azul Caribe | Acentos, progreso activo, títulos |
| `#22c55e` | Verde IoT | Estado activo (play, sensores OK) |
| `font-mono` | Geist Mono | Contadores, datos técnicos |

**Paleta cultural:** inspirada en los colores del mar Caribe y la artesanía Wayuu (oro, tierra, azul).

---

## 🗂️ Slides del Hackathon

| # | Slide | Descripción |
|---|-------|-------------|
| 0 | `SlideTitle` | Portada con logo O'UPALAMMA y patrón Wayuu |
| 1 | `SlidePolicrisis` | Marco conceptual: policrisis climática global |
| 2 | `SlideDibulla` | Contexto territorial: Dibulla, erosión costera |
| 3 | `SlideArchitecture` | Arquitectura técnica del SAT (IoT + LoRa + Edge) |
| 4 | `SlideLoRaNetwork` | Red LoRa: nodos, gateway, cobertura |
| 5 | `SlideCostComparison` | Comparativa costo-beneficio vs. soluciones tradicionales |
| 6 | `SlideReplicability` | Escalabilidad a otras zonas costeras de Colombia |
| 7 | `SlideClosing` | Llamado a la acción y cierre |

---

## ⌨️ Controles de Navegación

- `←` / `→` — Slide anterior/siguiente
- `Espacio` — Avanzar slide
- `Home` / `End` — Primer/último slide
- `F` — Pantalla completa
- `Escape` — Salir de pantalla completa
- Botón ▶ — Autoplay (8 seg/slide)

---

## 🔧 Stack Tecnológico

| Tecnología | Versión | Rol |
|-----------|---------|-----|
| Next.js | `16.2.6` (fija) | Framework SSR/SSG |
| React | `^19` | UI library |
| TypeScript | `5.7.3` (fija) | Tipado estático |
| Tailwind CSS | `^4.2.0` | Utilidades CSS |
| Framer Motion | `^12.38.0` | Animaciones |
| Lucide React | `^0.564.0` | Iconografía |
| Recharts | `2.15.0` (fija) | Visualización de datos |
| shadcn/ui | vía components.json | Componentes base |
| pnpm | `10.29.3` | **Package manager ÚNICO** |

---

## 📦 Comandos del Proyecto

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Servidor de producción
pnpm start

# Linting
pnpm lint

# Agregar dependencias (SIEMPRE con pnpm, NUNCA npm/yarn)
pnpm add <paquete>@<version-exacta>
```

> ⚠️ **PROHIBIDO** usar `npm install`, `yarn add` u otro gestor de paquetes.  
> Siempre usar `pnpm` y versiones fijas o rangos semver conservadores.

---

## 🧠 Skills Instaladas (Agente IA)

| Skill | Fuente | Propósito |
|-------|--------|-----------|
| `frontend-design` | `anthropics/skills` | Patrones de diseño UI/UX |
| `vercel-react-best-practices` | `vercel-labs/agent-skills` | Best practices Next.js/React |
| `web-design-guidelines` | `vercel-labs/agent-skills` | Guías de diseño web |
| `mapbox-google-maps-migration` | `mapbox/mapbox-agent-skills` | Integración de mapas |
| `arcgis-widgets-ui` | `saschabrunnerch/arcgis-maps-sdk-js-ai-context` | Widgets ArcGIS |

---

## 📋 Estado del Proyecto

- [x] Estructura base Next.js 16 + React 19
- [x] 8 slides completos con animaciones Framer Motion
- [x] Navegación por teclado y controles visuales
- [x] Integración `@vercel/analytics`
- [x] Skills de IA instaladas
- [x] Documentación de contexto (este archivo)
- [x] Guía de buenas prácticas
- [ ] Mapa interactivo de Dibulla (ArcGIS/Mapbox)
- [ ] Modo exportación PDF
- [ ] Tests E2E (Playwright)
