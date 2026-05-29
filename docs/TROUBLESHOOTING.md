# 🔧 Guía de Troubleshooting - O'UPALAMMA

## Problemas Resueltos y Soluciones

### 1. ❌ Error: "Module not found: Can't resolve 'react-map-gl'"

**Contexto:** Al intentar usar Mapbox GL JS con Next.js 16 + Turbopack

**Error completo:**
```
Module not found: Can't resolve 'react-map-gl'
```

**Causa raíz:**
- Incompatibilidad entre react-map-gl y Turbopack (Next.js 16)
- El bundler de Turbopack no resuelve correctamente los módulos de Mapbox en build

**Solución implementada:**
✅ Migrar de Mapbox a **Leaflet + react-leaflet**

**Razones de la migración:**
- Leaflet es 100% compatible con Next.js 16 + Turbopack
- Totalmente gratuito (sin tokens)
- Más ligero: 42 KB vs 200 KB de Mapbox
- Suficiente para el 95% de necesidades de mapas

---

### 2. ❌ Error: "window is not defined" (SSR)

**Contexto:** Al importar Leaflet en componentes

**Error completo:**
```
ReferenceError: window is not defined
    at module evaluation (.next/server/chunks/ssr/...)
```

**Causa raíz:**
- Leaflet depende de `window` y `document`
- Next.js intenta renderizar en servidor durante build (SSR)

**Solución implementada:**
✅ Separar componente cliente con importación dinámica

**Código:**
```typescript
// slide-dibulla.tsx
const LeafletMapComponent = dynamic(
  () => import("./dibulla-map-client").then((mod) => mod.DibullaMapClient),
  { 
    ssr: false,  // ← CLAVE: Deshabilitar SSR
    loading: () => <LoadingSpinner />
  }
)

// dibulla-map-client.tsx (componente separado)
"use client"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
```

---

### 3. ❌ Error: "Module factory is not available" (CSS dinámico)

**Contexto:** Al intentar importar CSS de Leaflet dinámicamente

**Error completo:**
```
Module [project]/node_modules/.pnpm/leaflet@1.9.4/node_modules/leaflet/dist/leaflet.css
was instantiated but the module factory is not available.
```

**Causa raíz:**
- Turbopack no permite importaciones dinámicas de CSS con `require()`
- El código condicional `if (typeof window !== "undefined")` no funciona con CSS en Turbopack

**Código problemático:**
```typescript
// ❌ NO FUNCIONA en Next.js 16 Turbopack
if (typeof window !== "undefined") {
  require("leaflet/dist/leaflet.css")
}
```

**Solución implementada:**
✅ Importar CSS globalmente en `app/layout.tsx`

**Código correcto:**
```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import 'leaflet/dist/leaflet.css'  // ← CSS global
```

---

### 4. ⚠️ Advertencia: Peer dependencies (React 19)

**Mensaje:**
```
WARN  Issues with peer dependencies found
react-leaflet 4.2.1
├── ✕ unmet peer react@^18.0.0: found 19.2.4
```

**Causa:**
- react-leaflet espera React 18
- Proyecto usa React 19 (Next.js 16)

**Impacto:**
- ✅ **NO ES CRÍTICO** - React 19 es compatible hacia atrás
- El código funciona perfectamente en runtime
- Es solo un warning de versiones de peer dependencies

**Acción:**
- Ignorar el warning
- react-leaflet funcionará correctamente con React 19
- Si se desea silenciar: agregar a `.npmrc`:
  ```
  strict-peer-dependencies=false
  ```

---

## 🛠️ Comandos de Diagnóstico

### Limpiar cache y rebuild completo
```bash
# Limpiar cache de Next.js
rm -rf .next

# Limpiar node_modules y reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Build desde cero
pnpm build
```

### Verificar dependencias
```bash
# Ver árbol de dependencias
pnpm list --depth=0

# Verificar que Leaflet esté instalado
pnpm list leaflet react-leaflet
```

### Debug de errores de build
```bash
# Build con logs detallados
pnpm build --debug

# Ver tamaño del bundle
pnpm build && du -sh .next/
```

---

## 📋 Checklist de Integración de Mapas

Al agregar mapas interactivos a Next.js 16:

- [ ] ✅ Usar Leaflet en vez de Mapbox (compatible con Turbopack)
- [ ] ✅ Importar CSS de Leaflet en `app/layout.tsx` (no dinámicamente)
- [ ] ✅ Crear componente separado para la lógica del mapa
- [ ] ✅ Usar `dynamic()` con `ssr: false`
- [ ] ✅ Verificar que `pnpm build` compile sin errores
- [ ] ✅ Probar en desarrollo con cache limpio (`rm -rf .next`)

---

## 🔍 Debugging de Errores Runtime

### Error en desarrollo pero build exitoso
1. Limpiar cache: `rm -rf .next`
2. Reiniciar dev server: `pnpm dev`
3. Hard refresh en navegador: `Ctrl+Shift+R`

### Error en build pero dev funciona
1. Verificar importaciones dinámicas
2. Revisar que no haya `window` o `document` en código SSR
3. Ejecutar: `pnpm build --debug`

### Errores de tipos TypeScript
```bash
# Ver errores de tipos
pnpm tsc --noEmit

# Regenerar tipos
pnpm dlx @types/regenerator --save-dev
```

---

## 📚 Recursos de Referencia

### Leaflet + Next.js
- [react-leaflet docs](https://react-leaflet.js.org/)
- [Leaflet API](https://leafletjs.com/reference.html)
- [Next.js Dynamic Imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)

### Turbopack
- [Turbopack docs](https://turbo.build/pack/docs)
- [Next.js 16 Turbopack migration](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbo)

### Mapas alternativos
- Leaflet (✅ recomendado)
- react-simple-maps (SVG, ligero)
- Mapbox (requiere token, más pesado)

---

## 🚨 Errores Comunes a Evitar

### ❌ NO hacer:
```typescript
// NO: Importar Leaflet en el nivel superior sin dynamic
import L from "leaflet"

// NO: CSS dinámico
if (typeof window !== "undefined") {
  require("leaflet/dist/leaflet.css")
}

// NO: Usar window/document sin verificar
const map = L.map('map') // Error en SSR
```

### ✅ SÍ hacer:
```typescript
// SÍ: Importación dinámica completa
const Map = dynamic(() => import('./map-client'), { ssr: false })

// SÍ: CSS global en layout
import 'leaflet/dist/leaflet.css'

// SÍ: Componente cliente separado
"use client"
export function MapClient() {
  const L = typeof window !== "undefined" ? require("leaflet") : null
  if (!L) return <Loading />
  // ... lógica del mapa
}
```

---

## 📊 Estado Actual (27 Mayo 2026)

**Build status:** ✅ PASSING  
**Runtime status:** ✅ FUNCIONAL  
**Dependencies:**
- leaflet@1.9.4 ✅
- react-leaflet@4.2.1 ✅
- recharts@2.15.0 ✅
- Next.js 16.2.6 ✅

**Problemas conocidos:** Ninguno  
**Warnings:** Peer dependencies React 19 (no crítico)

---

**Última actualización:** 27 Mayo 2026  
**Mantenedor:** Equipo O'UPALAMMA  
