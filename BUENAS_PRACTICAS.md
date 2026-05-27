# Guía de Buenas Prácticas — O'UPALAMMA

> Normas **obligatorias** para todo desarrollo en este proyecto.  
> Cualquier contribución (manual o generada por IA) debe cumplirlas antes de hacer commit.

---

## 1. Gestión de Paquetes — `pnpm` OBLIGATORIO

### ✅ Reglas

- **Solo `pnpm`** como package manager. Nunca `npm`, `yarn`, `bun` ni `npx` para instalar dependencias del proyecto.
- El archivo `pnpm-lock.yaml` **siempre debe estar commiteado**.
- Al agregar una dependencia, especificar **versión exacta** o rango semver conservador:

```bash
# ✅ Correcto
pnpm add framer-motion@12.9.2
pnpm add lucide-react@^0.564.0   # rango patch ok

# ❌ Prohibido
npm install framer-motion
yarn add framer-motion
pnpm add framer-motion            # sin versión → usa "latest" implícito
```

### Configuración `.npmrc` recomendada

```ini
# .npmrc (en raíz del proyecto)
engine-strict=true
save-exact=true
```

> `save-exact=true` hace que `pnpm add` siempre guarde la versión exacta.

### Política de versiones

| Tipo | Política | Ejemplo |
|------|---------|---------|
| Framework principal (Next.js, React) | Fija o `^Major.minor` | `16.2.6`, `^19.0.0` |
| UI libraries (Radix, Framer) | `^Major.minor` | `^12.38.0` |
| Utilidades pequeñas | `^Major.minor.patch` | `^2.1.1` |
| TypeScript, ESLint, tools | Versión exacta | `5.7.3` |

---

## 2. TypeScript — Tipado Estricto

```json
// tsconfig.json — ya configurado, NO relajar
{
  "compilerOptions": {
    "strict": true,        // ← NUNCA desactivar
    "noEmit": true
  }
}
```

### Reglas

- **No usar `any`** — usar `unknown` y narrowing, o tipos concretos.
- **No usar `// @ts-ignore`** — resolver el error real.
- `ignoreBuildErrors: true` en `next.config.mjs` es **temporal** — eliminar antes de producción final.
- Exportar interfaces y tipos desde `lib/types.ts` o archivos `types.ts` locales.

```typescript
// ✅ Correcto
interface SlideProps {
  title: string
  subtitle?: string
}

// ❌ Prohibido
const slide: any = { ... }
```

---

## 3. Estructura de Componentes React

### Convenciones de archivos

```
components/
  presentation/
    slide-dibulla.tsx     # kebab-case para archivos
    index.ts              # re-exports públicos del módulo
```

### Patrón de componente

```typescript
"use client"  // Solo si usa hooks del cliente

import { motion } from "framer-motion"
// Imports externos primero, internos después
import { cn } from "@/lib/utils"

// Tipos/interfaces al inicio del archivo
interface Props {
  isActive?: boolean
}

// Named export (NO default export en componentes de slide)
export function SlideNombre({ isActive = false }: Props) {
  // ...
}
```

### Reglas de componentes

- **Named exports** en componentes de slides (no `export default` sueltos).
- **`"use client"`** solo cuando se usan hooks de React o APIs del browser.
- Separar lógica de UI: hooks complejos → `hooks/` directory.
- Props opcionales con valor por defecto en la desestructuración.

---

## 4. CSS y Diseño — Tailwind v4

### Reglas

- Clases de diseño en el JSX, **no** en archivos `.css` separados (salvo tokens globales).
- Variables de color del sistema de diseño en `app/globals.css` — **no hardcodear hex en JSX** si ya existe un token:

```tsx
// ❌ Evitar (hardcoded repetido)
<div className="bg-[#1a1510] border-[#c9a86c]">

// ✅ Preferido si el token está definido en globals.css
<div className="bg-surface border-gold">
```

- Usar `cn()` de `lib/utils` para clases condicionales:

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-class", isActive && "active-class", className)}>
```

### Animaciones

- Usar **Framer Motion** para transiciones de slides y micro-animaciones de entrada.
- Patrones estándar de entrada:

```tsx
// Entrada estándar de slide
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}

// Entrada con delay para elementos secuenciales
transition={{ delay: 0.2 * index, duration: 0.6 }}
```

---

## 5. Estructura de Slides

Cada slide debe seguir este patrón base:

```tsx
"use client"

import { motion } from "framer-motion"

export function SlideNombre() {
  return (
    <div className="relative h-full w-full bg-[#1a1510] overflow-hidden">
      {/* Sección: fondo/decoración */}
      
      {/* Sección: contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="..."
      >
        {/* Contenido */}
      </motion.div>
    </div>
  )
}
```

---

## 6. Performance y Optimización

### Imágenes

```tsx
// ✅ Siempre usar next/image con alt descriptivo
import Image from "next/image"
<Image src="/images/logo.jpeg" alt="Logo O'UPALAMMA" fill className="object-contain" />

// ❌ Nunca usar <img> HTML nativo
```

### Hooks y memoización

```tsx
// Callbacks que se pasan como props → useCallback
const goToSlide = useCallback((index: number) => { ... }, [deps])

// Cómputos pesados → useMemo
const processedData = useMemo(() => heavyCalc(data), [data])
```

### Lazy loading de slides

Para slides con gráficos pesados (Recharts, D3), considerar:

```tsx
import dynamic from "next/dynamic"
const SlideCostComparison = dynamic(() => import("./slide-cost-comparison"), {
  ssr: false
})
```

---

## 7. Accesibilidad (a11y)

- Todos los botones interactivos deben tener `aria-label` descriptivo en **español**.
- Usar elementos semánticos: `<nav>`, `<main>`, `<button>`, `<h1>`–`<h6>`.
- Contraste de color mínimo WCAG AA (4.5:1 para texto normal).
- Navegación completa por teclado (ya implementada en `presentation-viewer.tsx`).

```tsx
// ✅ Siempre
<button aria-label="Ir a la siguiente diapositiva" onClick={nextSlide}>
  <ChevronRight />
</button>

// ❌ Nunca
<div onClick={nextSlide}><ChevronRight /></div>
```

---

## 8. Commits y Control de Versiones

### Formato de commit (Conventional Commits)

```
tipo(scope): descripción en español o inglés

feat(slides): agrega slide de mapa interactivo de Dibulla
fix(viewer): corrige loop infinito en autoplay
style(slide-title): ajusta tamaño de logo en mobile
docs(proyecto): actualiza PROYECTO.md con nuevas skills
```

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `style` | Cambios de CSS/diseño |
| `refactor` | Refactor sin cambio de funcionalidad |
| `docs` | Documentación |
| `chore` | Mantenimiento (deps, config) |

---

## 9. Checklist antes de cada commit

```
[ ] pnpm lint → sin errores
[ ] TypeScript sin errores (tsc --noEmit)
[ ] No hay console.log en producción
[ ] Imágenes con alt descriptivo
[ ] Botones con aria-label
[ ] Dependencias nuevas con versión fija en package.json
[ ] pnpm-lock.yaml actualizado
[ ] No hay `any` tipado sin justificación
```

---

## 10. Variables de Entorno

```bash
# .env.local (NO commitear)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.ey...

# .env.example (SÍ commitear — plantilla)
NEXT_PUBLIC_MAPBOX_TOKEN=
```

- Variables públicas: prefijo `NEXT_PUBLIC_`
- Nunca commitear `.env.local` o archivos con secretos reales
- Siempre mantener `.env.example` actualizado

---

## 11. Dependencias — Versiones Fijas Actuales

Las dependencias del proyecto ya están en sus versiones más recientes y pertinentes.  
Para actualizarlas usar:

```bash
# Ver qué se puede actualizar
pnpm outdated

# Actualizar una dependencia específica (probar en rama separada)
pnpm update framer-motion --latest

# Actualizar todas (con cuidado — revisar changelogs)
pnpm update --latest
```

> ⚠️ Siempre revisar CHANGELOG de Next.js, React y Tailwind antes de actualizar  
> sus versiones mayores, ya que pueden requerir migraciones.

---

*Última actualización: 2026-05-14*  
*Mantenido por: Antigravity (IA) + Álvaro Efrén Bolaños Scalante*
