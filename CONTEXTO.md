# CONTEXTO DEL PROYECTO — O'UPALAMMA

> **Documento de referencia completo**: Diseño estético, arquitectura, normas de estructura y buenas prácticas.  
> Última actualización: 2026-05-27

---

## 📋 Índice

1. [Visión General](#visión-general)
2. [Sistema de Diseño](#sistema-de-diseño)
3. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
4. [Principios de Desarrollo](#principios-de-desarrollo)
5. [Stack Tecnológico](#stack-tecnológico)
6. [Estructura de Componentes](#estructura-de-componentes)
7. [Gestión de Estilos y UI/UX](#gestión-de-estilos-y-uiux)
8. [Normas de Código](#normas-de-código)
9. [Comandos y Workflows](#comandos-y-workflows)

---

## 1. Visión General

### ¿Qué es O'UPALAMMA?

**O'UPALAMMA** es una aplicación web de presentación interactiva (slideshow) que comunica la propuesta técnica de un Sistema de Alerta Temprana Comunitario (SAT) para erosión costera en Dibulla, La Guajira. Desarrollada para el **Hackathon UNGRD · PNUD Colombia 2026**.

**Autor**: Álvaro Efrén Bolaños Scalante — Politólogo, Universidad del Cauca

### Objetivos del proyecto

- ✅ Presentación profesional tipo pitch (8 minutos)
- ✅ Diseño culturalmente sensible (estética Wayuu)
- ✅ Responsive design (mobile-first)
- ✅ Accesibilidad WCAG AA
- ✅ Performance optimizado (<2s FCP)
- ✅ Código mantenible y escalable

---

## 2. Sistema de Diseño

### 2.1 Paleta de Colores

La paleta está inspirada en el mar Caribe y la artesanía tradicional Wayuu:

#### Colores Base

```css
/* Fondos */
--bg-primary: #0d0a08        /* Fondo principal oscuro (tierra nocturna) */
--bg-secondary: #1a1510      /* Fondo secundario (cards, paneles) */

/* Acentos principales */
--gold-wayuu: #c9a86c        /* Oro Wayuu - bordes, íconos, títulos destacados */
--blue-caribe: #2d8bb8       /* Azul Caribe - acentos, progreso activo */
--green-iot: #22c55e         /* Verde IoT - estado activo, sensores OK */

/* Texto */
--text-primary: #f5f5f4      /* Texto principal (stone-100) */
--text-secondary: #a8a29e    /* Texto secundario (stone-400) */
--text-muted: #78716c        /* Texto desenfatizado (stone-500) */
```

#### Variables CSS Globales (Tailwind v4)

El proyecto usa el sistema de tokens de shadcn/ui basado en **OKLCH** para mejor percepción de color:

```css
/* app/globals.css */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --accent: oklch(0.97 0 0);
  /* ... ver app/globals.css para tokens completos */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... tokens modo oscuro */
}
```

### 2.2 Tipografía

```typescript
// app/layout.tsx
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono" 
})
```

**Uso de fuentes**:

| Elemento | Fuente | Clase Tailwind |
|----------|--------|----------------|
| Títulos principales | Bricolage Grotesque 700-800 | `font-sans font-bold` o `font-extrabold` |
| Cuerpo de texto | Bricolage Grotesque 400-500 | `font-sans` |
| Datos técnicos, contadores | Geist Mono 400-600 | `font-mono` |
| Código, JSON | Geist Mono 400 | `font-mono text-sm` |

### 2.3 Espaciado y Grid System

**Mobile-first responsive**:

```typescript
// Breakpoints Tailwind CSS
sm: 640px   // tablets pequeñas
md: 768px   // tablets
lg: 1024px  // laptops
xl: 1280px  // desktops
2xl: 1536px // pantallas grandes
```

**Sistema de espaciado estándar**:

```css
/* Padding interno de slides */
padding: 2rem (mobile) → 4rem (desktop)

/* Gap en grids */
gap: 1rem (mobile) → 1.5rem (tablet) → 2rem (desktop)

/* Márgenes verticales entre secciones */
space-y-6 (mobile) → space-y-8 (tablet) → space-y-12 (desktop)
```

### 2.4 Componentes UI Base

El proyecto usa **shadcn/ui** (estilo "new-york") como base:

```json
// components.json
{
  "style": "new-york",
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

**Componentes instalados**:
- Accordion, Alert, Avatar, Badge, Button, Card
- Dialog, Dropdown, Form, Input, Select, Tabs
- Toast, Tooltip, Separator
- Chart (Recharts wrapper)

### 2.5 Animaciones y Transiciones

**Motor de animación**: Framer Motion (`^12.38.0`)

#### Patrones estándar

```typescript
// Entrada de slide (fade + slide up)
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>

// Entrada secuencial (stagger)
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 * i, duration: 0.6 }}
  />
))}

// Transición entre slides
<AnimatePresence mode="wait">
  <motion.div
    key={currentSlide}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  />
</AnimatePresence>
```

#### Curvas de easing

- `easeOut`: entrada de elementos, slides
- `easeInOut`: transiciones suaves bidireccionales
- `spring`: efectos de rebote (botones, hover states)

---

## 3. Arquitectura del Proyecto

### 3.1 Estructura de Directorios

```
presentacion-o-upala-mma/
├── app/                              # Next.js 16 App Router
│   ├── globals.css                   # Tokens Tailwind v4 + custom properties
│   ├── layout.tsx                    # Root layout (fonts, metadata, Analytics)
│   └── page.tsx                      # Entry point → <PresentationViewer />
│
├── components/
│   ├── presentation/                 # Módulo de presentación
│   │   ├── index.ts                  # Re-exports públicos
│   │   ├── presentation-viewer.tsx   # Controlador principal (navegación, keyboard)
│   │   ├── particle-background.tsx   # Fondo animado de partículas
│   │   ├── slide-title.tsx           # Slide 0: Portada
│   │   ├── slide-sat.tsx             # Slide 1: Sistema de Alerta Temprana
│   │   ├── slide-policrisis.tsx      # Slide 2: Policrisis Planetaria
│   │   ├── slide-dibulla.tsx         # Slide 3: Dibulla, La Guajira
│   │   ├── slide-architecture.tsx    # Slide 4: Arquitectura IoT
│   │   ├── slide-lora-network.tsx    # Slide 5: Red LoRa
│   │   ├── slide-cost-comparison.tsx # Slide 6: Comparativa de Costos
│   │   ├── slide-replicability.tsx   # Slide 7: Replicabilidad
│   │   └── slide-closing.tsx         # Slide 8: Cierre
│   │
│   ├── ui/                           # shadcn/ui components (70+ componentes)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx                 # Wrapper de Recharts
│   │   └── ...
│   │
│   └── theme-provider.tsx            # Context para modo dark/light
│
├── hooks/                            # Custom React hooks
│   ├── use-toast.ts
│   └── use-mobile.ts                 # Detección de viewport móvil
│
├── lib/
│   └── utils.ts                      # Utilidades (cn, clsx, twMerge)
│
├── public/
│   └── images/
│       ├── logo.jpeg                 # Logo O'UPALAMMA
│       ├── pattern-wayuu.svg         # Patrón decorativo Wayuu
│       └── ...
│
├── docs/                             # Documentación de contexto
│   ├── tdr-convocatoria.md
│   ├── criterios.md
│   ├── oupalamma.md
│   └── GUION_PITCH_FINAL.md
│
├── CONTEXTO.md                       # ← Este documento
├── BUENAS_PRACTICAS.md               # Guía de normas obligatorias
├── PROYECTO.md                       # README técnico
│
├── package.json                      # Dependencias (solo pnpm)
├── pnpm-lock.yaml                    # Lockfile (SIEMPRE commiteado)
├── .npmrc                            # engine-strict=true, save-exact=true
├── tsconfig.json                     # TypeScript config (strict mode)
├── next.config.mjs                   # Next.js config
├── components.json                   # shadcn/ui config
└── postcss.config.mjs                # PostCSS + Tailwind v4
```

### 3.2 Flujo de Navegación

```
Usuario ingresa → app/page.tsx
                     ↓
               <PresentationViewer />
                     ↓
     Renderiza slide actual según `currentSlide` state
                     ↓
     Escucha teclado (←, →, Space, Home, End, F, Esc)
                     ↓
     Autoplay opcional (8 seg/slide)
                     ↓
     Controles visuales (prev, next, progress bar)
```

### 3.3 Patrón de Slides

Cada slide es un **componente independiente** que sigue este esquema:

```typescript
"use client"  // Solo si usa hooks de React

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SlideNombreProps {
  className?: string
}

export function SlideNombre({ className }: SlideNombreProps) {
  return (
    <div className={cn(
      "relative h-full w-full overflow-hidden",
      "bg-[#1a1510]",  // o usar token CSS si existe
      className
    )}>
      {/* Capa 1: Fondo/decoración */}
      <div className="absolute inset-0 z-0">
        {/* ParticleBackground, gradientes, SVG patterns */}
      </div>

      {/* Capa 2: Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 h-full flex flex-col items-center justify-center p-8 md:p-12"
      >
        {/* Contenido del slide */}
      </motion.div>
    </div>
  )
}
```

---

## 4. Principios de Desarrollo

### 4.1 Principios SOLID aplicados

| Principio | Aplicación en el proyecto |
|-----------|---------------------------|
| **Single Responsibility** | Cada slide es un componente independiente con una sola responsabilidad. `presentation-viewer.tsx` maneja solo la lógica de navegación. |
| **Open/Closed** | Nuevos slides se agregan sin modificar `PresentationViewer`, solo extendiéndolo en el array `slides`. |
| **Liskov Substitution** | Todos los slides implementan la misma interfaz de props (opcionales). |
| **Interface Segregation** | Hooks y componentes UI exponen solo las props necesarias. |
| **Dependency Inversion** | Componentes dependen de abstracciones (interfaces de props), no de implementaciones concretas. |

### 4.2 Composición sobre Herencia

```typescript
// ✅ Correcto: composición
<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>{content}</CardContent>
</Card>

// ❌ Evitar: herencia de clases para componentes React
class SlideBase extends Component { ... }
class SlideDibulla extends SlideBase { ... }
```

### 4.3 DRY (Don't Repeat Yourself)

**Utilidad `cn()`** para clases condicionales:

```typescript
// lib/utils.ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Uso en componentes
<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)} />
```

**Custom hooks** para lógica reutilizable:

```typescript
// hooks/use-mobile.ts
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  
  return isMobile
}
```

### 4.4 Separation of Concerns

```
Presentación (JSX)     ←→ Lógica de negocio (hooks)     ←→ Estado (React state/context)
      ↓                          ↓                                ↓
components/presentation/    hooks/use-*.ts              Context API / Zustand (si necesario)
```

---

## 5. Stack Tecnológico

### 5.1 Framework y Bibliotecas Core

| Tecnología | Versión | Justificación |
|-----------|---------|---------------|
| **Next.js** | `16.2.6` | Framework SSR/SSG con App Router, optimizaciones automáticas |
| **React** | `^19.0.0` | Biblioteca UI con Server Components |
| **TypeScript** | `5.7.3` | Tipado estático estricto, mejor DX |
| **Tailwind CSS** | `^4.2.0` | Utility-first CSS, diseño responsive rápido |

### 5.2 UI y Animaciones

| Biblioteca | Versión | Uso |
|-----------|---------|-----|
| **Framer Motion** | `^12.38.0` | Animaciones declarativas, transiciones de slides |
| **Radix UI** | `1.x` | Primitivas accesibles (base de shadcn/ui) |
| **Lucide React** | `^0.564.0` | Iconos SVG optimizados |
| **Recharts** | `2.15.0` | Gráficos de barras, líneas (slide de costos) |

### 5.3 Herramientas de Desarrollo

| Herramienta | Versión | Configuración |
|-----------|---------|---------------|
| **pnpm** | `10.29.3` | Package manager ÚNICO (ver `.npmrc`) |
| **ESLint** | (via Next.js) | Linting automático con `pnpm lint` |
| **PostCSS** | `^8.5` | Procesador CSS para Tailwind v4 |
| **Autoprefixer** | `^10.4.20` | Prefijos CSS automáticos |

### 5.4 Analítica y Monitoreo

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
```

---

## 6. Estructura de Componentes

### 6.1 Anatomía de un Componente React

```typescript
// 1. Directiva "use client" (solo si usa hooks del cliente)
"use client"

// 2. Imports externos (node_modules)
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

// 3. Imports internos (del proyecto)
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// 4. Tipos e interfaces
interface Props {
  title: string
  subtitle?: string
  isActive?: boolean
  className?: string
}

// 5. Componente principal (named export)
export function ComponentName({ 
  title, 
  subtitle, 
  isActive = false,
  className 
}: Props) {
  // 6. Hooks (primero)
  const [state, setState] = useState(false)
  const callback = useCallback(() => { ... }, [deps])
  
  // 7. Efectos
  useEffect(() => { ... }, [])
  
  // 8. Handlers y lógica
  const handleClick = () => { ... }
  
  // 9. Render condicional temprano (si aplica)
  if (!title) return null
  
  // 10. JSX principal
  return (
    <div className={cn("base-classes", className)}>
      {/* ... */}
    </div>
  )
}
```

### 6.2 Patrones de Props

```typescript
// ✅ Props con valores por defecto
interface ButtonProps {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

export function Button({ 
  variant = "primary", 
  size = "md",
  disabled = false 
}: ButtonProps) { ... }

// ✅ Props con children
interface CardProps {
  children: React.ReactNode
  className?: string
}

// ✅ Props con eventos
interface InputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}
```

### 6.3 Composición de Componentes

```typescript
// Patrón "Compound Components"
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>
    {/* contenido */}
  </CardContent>
  <CardFooter>
    <Button>Acción</Button>
  </CardFooter>
</Card>
```

---

## 7. Gestión de Estilos y UI/UX

### 7.1 Metodología CSS

**Utility-first** con Tailwind CSS v4:

```tsx
// ✅ Clases en el JSX
<div className="flex items-center gap-4 px-6 py-4 bg-secondary rounded-lg">

// ❌ Evitar CSS separado para estilos de componente
// styles/slide.module.css → NO usar salvo casos excepcionales
```

**Clases condicionales con `cn()`**:

```tsx
import { cn } from "@/lib/utils"

<button className={cn(
  "px-4 py-2 rounded-lg transition-colors",
  isActive ? "bg-blue-caribe text-white" : "bg-stone-700 text-stone-300",
  disabled && "opacity-50 cursor-not-allowed",
  className  // permite override externo
)} />
```

### 7.2 Responsive Design

**Mobile-first breakpoints**:

```tsx
// Padding responsivo
className="p-4 md:p-6 lg:p-8"

// Grid adaptativo
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Texto responsivo
className="text-2xl md:text-4xl lg:text-6xl"

// Visibilidad condicional
className="hidden md:block"  // oculto en mobile, visible en tablet+
className="block md:hidden"  // visible en mobile, oculto en tablet+
```

### 7.3 Accesibilidad (a11y)

#### Contraste de color

Mínimo WCAG AA (4.5:1 para texto normal):

```tsx
// ✅ Texto claro sobre fondo oscuro
<div className="bg-[#0d0a08] text-stone-100">

// ✅ Texto oscuro sobre fondo claro
<div className="bg-stone-100 text-stone-900">

// ⚠️ Verificar: texto oro sobre fondo oscuro
<div className="bg-[#1a1510] text-[#c9a86c]">
```

#### ARIA labels y semántica

```tsx
// ✅ Botones con aria-label descriptivo
<button aria-label="Ir a la siguiente diapositiva" onClick={nextSlide}>
  <ChevronRight />
</button>

// ✅ Navegación semántica
<nav aria-label="Navegación de presentación">
  <button>Anterior</button>
  <span aria-live="polite" aria-atomic="true">
    Diapositiva {current} de {total}
  </span>
  <button>Siguiente</button>
</nav>

// ✅ Imágenes con alt descriptivo
<Image 
  src="/images/logo.jpeg" 
  alt="Logo O'UPALAMMA - Sistema de Alerta Temprana Comunitario" 
  width={200} 
  height={100} 
/>
```

#### Navegación por teclado

```typescript
// components/presentation/presentation-viewer.tsx (líneas 69-97)
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
```

### 7.4 Performance

#### Optimización de imágenes

```tsx
// ✅ Siempre usar next/image
import Image from "next/image"

<Image 
  src="/images/logo.jpeg" 
  alt="Logo O'UPALAMMA" 
  fill
  className="object-contain"
  priority  // para imágenes above the fold
/>

// ❌ NUNCA usar <img> HTML nativo
<img src="/images/logo.jpeg" alt="..." />  // ← Prohibido
```

#### Lazy loading de slides pesados

```tsx
import dynamic from "next/dynamic"

const SlideCostComparison = dynamic(
  () => import("./slide-cost-comparison"),
  { ssr: false }  // solo en cliente (si usa Recharts)
)
```

#### Memoización

```tsx
// Callbacks que se pasan como props
const handleClick = useCallback(() => {
  console.log(data)
}, [data])

// Cómputos pesados
const processedData = useMemo(
  () => expensiveCalculation(rawData),
  [rawData]
)

// Componentes que reciben props estables
const MemoizedComponent = React.memo(MyComponent)
```

---

## 8. Normas de Código

### 8.1 Gestión de Paquetes — `pnpm` OBLIGATORIO

```bash
# ✅ SIEMPRE usar pnpm
pnpm add framer-motion@12.38.0
pnpm add lucide-react@^0.564.0

# ❌ PROHIBIDO npm, yarn, bun
npm install framer-motion  # ← NO
yarn add framer-motion     # ← NO
bun add framer-motion      # ← NO
```

**Configuración `.npmrc`**:

```ini
engine-strict=true    # Fuerza versiones de Node/pnpm en package.json
save-exact=true       # pnpm add guarda versión exacta por defecto
```

**Política de versiones**:

| Tipo | Política | Ejemplo |
|------|---------|---------|
| Framework (Next.js, React) | Fija o `^Major.minor` | `16.2.6`, `^19.0.0` |
| UI libs (Radix, Framer) | `^Major.minor` | `^12.38.0` |
| Utilidades pequeñas | `^Major.minor.patch` | `^2.1.1` |
| TypeScript, tools | Exacta | `5.7.3` |

### 8.2 TypeScript — Tipado Estricto

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,        // ← NUNCA desactivar
    "noEmit": true,
    "target": "ES6",
    "jsx": "react-jsx"
  }
}
```

**Reglas**:

```typescript
// ❌ Prohibido
const data: any = fetchData()
// @ts-ignore
console.log(data.foo)

// ✅ Correcto
interface ResponseData {
  foo: string
  bar: number
}
const data: ResponseData = fetchData()
console.log(data.foo)

// ✅ Si no conoces el tipo, usa unknown
const data: unknown = fetchData()
if (isResponseData(data)) {
  console.log(data.foo)  // narrowing
}
```

### 8.3 Convenciones de Nombres

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Archivos de componentes | `kebab-case.tsx` | `slide-dibulla.tsx` |
| Componentes React | `PascalCase` | `SlideDibulla` |
| Hooks personalizados | `camelCase` con prefijo `use` | `useMobile` |
| Utilidades | `camelCase` | `cn`, `formatDate` |
| Constantes globales | `SCREAMING_SNAKE_CASE` | `API_BASE_URL` |
| Variables locales | `camelCase` | `currentSlide`, `isPlaying` |

### 8.4 Exports

```typescript
// ✅ Named exports para componentes de slides
export function SlideDibulla() { ... }

// ✅ Re-exports en index.ts
// components/presentation/index.ts
export { PresentationViewer } from "./presentation-viewer"
export { SlideTitle } from "./slide-title"
export { SlideDibulla } from "./slide-dibulla"

// ⚠️ Default export solo en page.tsx (convención Next.js)
export default function Page() { ... }
```

### 8.5 Imports

**Orden de imports**:

```typescript
// 1. React y hooks core
import { useState, useCallback, useEffect } from "react"

// 2. Bibliotecas externas (node_modules)
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

// 3. Componentes internos (con @/ alias)
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SlideDibulla } from "@/components/presentation"

// 4. Tipos locales (si aplica)
import type { SlideProps } from "./types"
```

### 8.6 Commits — Conventional Commits

```bash
feat(slides): agrega slide de mapa interactivo de Dibulla
fix(viewer): corrige loop infinito en autoplay
style(slide-title): ajusta tamaño de logo en mobile
refactor(presentation): extrae lógica de navegación a custom hook
docs(contexto): actualiza CONTEXTO.md con sección de UX
chore(deps): actualiza framer-motion a 12.38.0
```

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `style` | Cambios de CSS/diseño (no afectan lógica) |
| `refactor` | Refactor sin cambio de funcionalidad |
| `docs` | Documentación |
| `chore` | Mantenimiento (deps, config) |
| `test` | Tests |
| `perf` | Mejoras de performance |

---

## 9. Comandos y Workflows

### 9.1 Desarrollo Local

```bash
# Instalar dependencias (primera vez o después de pull)
pnpm install

# Servidor de desarrollo
pnpm dev
# → http://localhost:3000

# Build de producción
pnpm build

# Servidor de producción local
pnpm start

# Linting
pnpm lint
```

### 9.2 Workflow de Trabajo

1. **Antes de empezar a codear**:
   ```bash
   git pull origin main
   pnpm install  # por si hay nuevas deps
   ```

2. **Durante desarrollo**:
   ```bash
   pnpm dev  # servidor activo
   # Codear con hot reload
   ```

3. **Antes de commit**:
   ```bash
   pnpm lint           # sin errores
   pnpm build          # verificar que compila
   # Verificar visualmente en navegador
   ```

4. **Commit**:
   ```bash
   git add .
   git commit -m "feat(slides): agrega slide de arquitectura IoT"
   git push origin main
   ```

### 9.3 Agregar Dependencias

```bash
# Dependencia de producción (versión exacta)
pnpm add recharts@2.15.0

# Dependencia de producción (rango semver)
pnpm add framer-motion@^12.38.0

# Dependencia de desarrollo
pnpm add -D @types/react@^19

# Ver dependencias desactualizadas
pnpm outdated

# Actualizar dependencia específica
pnpm update recharts --latest

# Actualizar todas (con cuidado — revisar changelogs)
pnpm update --latest
```

### 9.4 Agregar Componente shadcn/ui

```bash
# Usar CLI de shadcn para agregar componente
npx shadcn@latest add card

# Esto crea/actualiza:
# - components/ui/card.tsx
# - Actualiza imports en components.json
```

### 9.5 Checklist Pre-Commit

```
[ ] pnpm lint → sin errores
[ ] pnpm build → compila correctamente
[ ] TypeScript sin errores (tsc --noEmit)
[ ] No hay console.log en producción
[ ] Imágenes con alt descriptivo
[ ] Botones con aria-label
[ ] Dependencias nuevas con versión en package.json
[ ] pnpm-lock.yaml actualizado (automático con pnpm add)
[ ] No hay tipado `any` sin justificación
[ ] Componentes nuevos siguen patrón estándar
[ ] CSS usa tokens del sistema de diseño (no hex hardcodeados repetidos)
```

---

## 10. Referencias y Recursos

### 10.1 Documentación Técnica

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)

### 10.2 Archivos de Referencia del Proyecto

- `BUENAS_PRACTICAS.md` — Normas obligatorias de código
- `PROYECTO.md` — README técnico del proyecto
- `docs/GUION_PITCH_FINAL.md` — Guión de la presentación
- `docs/oupalamma.md` — Contexto del sistema O'UPALAMMA
- `docs/tdr-convocatoria.md` — TDR del Hackathon UNGRD
- `docs/criterios.md` — Criterios de evaluación

### 10.3 Atajos de Teclado de la Presentación

| Tecla | Acción |
|-------|--------|
| `→` o `Space` | Siguiente slide |
| `←` | Slide anterior |
| `Home` | Primer slide |
| `End` | Último slide |
| `F` | Toggle pantalla completa |
| `Esc` | Salir de pantalla completa |

---

## 11. Glosario Técnico

| Término | Definición |
|---------|-----------|
| **SAT** | Sistema de Alerta Temprana — sistema IoT de monitoreo de erosión costera |
| **Wayuu** | Pueblo indígena de La Guajira, Colombia — estética cultural del proyecto |
| **LoRa** | Long Range — tecnología de comunicación inalámbrica de bajo consumo |
| **IoT** | Internet of Things — red de sensores conectados |
| **shadcn/ui** | Colección de componentes React copiables basados en Radix UI |
| **App Router** | Sistema de routing de Next.js 13+ basado en carpetas en `app/` |
| **Server Components** | Componentes React que se renderizan solo en servidor (RSC) |
| **Client Components** | Componentes con `"use client"` que se hidratan en navegador |
| **pnpm** | Package manager rápido y eficiente en espacio de disco |
| **OKLCH** | Espacio de color perceptualmente uniforme (mejor que RGB/HSL) |

---

**Mantenido por**: Álvaro Efrén Bolaños Scalante  
**Última actualización**: 2026-05-27  
**Versión del proyecto**: 0.1.0

---

*Para dudas o contribuciones, consultar `BUENAS_PRACTICAS.md` y `PROYECTO.md`.*
