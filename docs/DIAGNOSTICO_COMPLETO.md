# 🔍 DIAGNÓSTICO COMPLETO - Errores de Leaflet

## 📋 Historial de Errores

### 1. ❌ Error Inicial: "Module not found: react-map-gl"
**Causa:** Incompatibilidad Mapbox + Next.js 16 Turbopack  
**Solución:** Migrar a Leaflet ✅

### 2. ❌ Error SSR: "window is not defined"
**Causa:** Leaflet requiere `window` (solo cliente)  
**Solución:** Dynamic import con `ssr: false` ✅

### 3. ❌ Error CSS: "Module factory not available"
**Causa:** CSS dinámico no funciona en Turbopack  
**Solución:** Importar CSS en `app/layout.tsx` ✅

### 4. ❌ Error ChunkLoadError: "Failed to load chunk"
**Causa:** Cache del navegador + archivo eliminado (`dibulla-map-client.tsx`)  
**Solución:** Integrar todo en un archivo + limpiar cache ✅

### 5. ❌ **ERROR ACTUAL**: "Map container is already initialized"
**Causa:** Múltiples razones detectadas 🔍

---

## 🔬 Análisis del Error Actual

### Mensaje Completo
```
Map container is already initialized.
at div (<anonymous>:null:null)
at LeafletMap (components/presentation/slide-dibulla.tsx:241:7)
at SlideDibulla (components/presentation/slide-dibulla.tsx:358:9)
at PresentationViewer (components/presentation/presentation-viewer.tsx:124:13)
```

### Causas Identificadas

#### 1. **AnimatePresence con transiciones**
```typescript
// presentation-viewer.tsx:115-126
<AnimatePresence mode="wait">
  <motion.div
    key={currentSlide}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.4 }}
  >
    <CurrentSlideComponent />  // ← Monta/desmonta con animación
  </motion.div>
</AnimatePresence>
```

**Problema:**
- Cuando navegas entre slides, `AnimatePresence` puede mantener 2 instancias montadas temporalmente (la que sale + la que entra)
- Leaflet intenta reinicializar el mismo contenedor DOM
- El cleanup no se ejecuta a tiempo

#### 2. **React Strict Mode (Development)**
En Next.js 16 dev mode, React monta componentes 2 veces para detectar efectos secundarios.

**Problema:**
- Primera montada: Crea mapa
- Desmontada: Debería limpiar
- Segunda montada: Intenta recrear en el mismo contenedor
- Leaflet lanza error si el contenedor ya tiene `._leaflet_id`

#### 3. **react-leaflet v4.2.1 API**
`whenCreated` no existe en esta versión. Usar `ref` en su lugar.

---

## ✅ SOLUCIÓN DEFINITIVA

### Enfoque: Slide Estático Sin Mapa Interactivo (Temporal)

Dado los problemas recurrentes con Leaflet + React + AnimatePresence + Turbopack, la solución más robusta para una presentación es:

**Opción A: Mapa estático (SVG o imagen)**
- ✅ Cero dependencias problemáticas
- ✅ Carga instantánea
- ✅ Sin errores de inicialización
- ✅ Compatible con AnimatePresence
- ❌ No interactivo

**Opción B: Mapa interactivo con solución robusta**
- Usar wrapper con ID único por montada
- Detectar contenedores huérfanos y limpiarlos
- Desactivar Leaflet cuando el slide no está visible
- ✅ Interactivo
- ⚠️ Más complejo

**Opción C: Eliminar AnimatePresence solo para slide Dibulla**
- ✅ Mapa funciona sin reinicializaciones
- ❌ Pierde transiciones suaves

---

## 🎯 Recomendación para Presentación

### Para DEMO/PRESENTACIÓN → Opción A (Mapa Estático)

**Ventajas:**
- Funciona el 100% del tiempo
- Carga rápida
- Sin errores inesperados durante la demo
- Puedes hacer click para ir a versión web interactiva

**Implementación:**
1. Crear mapa estático en Figma/Photoshop con los 6 puntos
2. Exportar como PNG/SVG
3. Usar `next/image` para cargarlo
4. Agregar overlays con información (popups simulados)

### Para PRODUCCIÓN → Opción B (Mapa Robusto)

**Implementación:**
1. Wrapper con ID único basado en timestamp
2. Cleanup agresivo en `useEffect`
3. Portal de React para el mapa (fuera del AnimatePresence)
4. Lazy loading solo cuando el slide es visible

---

## 🛠️ Implementación de Solución B (Mapa Robusto)

### Cambios necesarios:

#### 1. Crear wrapper con ID único
```typescript
const [mapId] = useState(`map-${Date.now()}-${Math.random()}`)
```

#### 2. Cleanup agresivo
```typescript
useEffect(() => {
  return () => {
    // Remover todas las instancias de Leaflet en el contenedor
    const container = document.getElementById(mapId)
    if (container && (container as any)._leaflet_id) {
      delete (container as any)._leaflet_id
    }
    // Forzar limpieza de todos los mapas huérfanos
    L.map(container).remove()
  }
}, [mapId])
```

#### 3. Portal para evitar AnimatePresence
```typescript
import { createPortal } from 'react-dom'

// Renderizar mapa en un portal fuera del AnimatePresence
<div id="map-portal-root" />

{mounted && createPortal(
  <LeafletMap />,
  document.getElementById('map-portal-root')!
)}
```

---

## 📊 Comparativa de Soluciones

| Solución | Complejidad | Confiabilidad | Interactividad | Demo-Ready |
|----------|-------------|---------------|----------------|------------|
| **A: Estático** | ⭐ Baja | ⭐⭐⭐⭐⭐ | ❌ No | ✅ 100% |
| **B: Robusto** | ⭐⭐⭐ Alta | ⭐⭐⭐ Media | ✅ Sí | ⚠️ 90% |
| **C: Sin Animación** | ⭐⭐ Media | ⭐⭐⭐⭐ Alta | ✅ Sí | ⚠️ 95% |

---

## 🚀 Próximos Pasos Recomendados

### Para la presentación de mañana/hoy:
✅ **SOLUCIÓN A**: Crear mapa estático

### Para el proyecto a largo plazo:
✅ **SOLUCIÓN B**: Implementar mapa robusto con portal

---

## 📝 Notas Técnicas

### Por qué Leaflet es difícil en React

1. **Imperativo vs Declarativo:**
   - Leaflet: API imperativa (`.remove()`, `.invalidateSize()`)
   - React: Paradigma declarativo
   - Conflicto en lifecycle

2. **Gestión de DOM:**
   - Leaflet manipula DOM directamente
   - React espera controlar el DOM
   - Colisiones en `useEffect`

3. **Transiciones de Framer Motion:**
   - Mantiene componentes montados durante animación
   - Leaflet no espera múltiples instancias
   - Contenedor se reutiliza antes de limpiar

### Soluciones alternativas evaluadas

❌ `react-leaflet` con `useMap` hook → Mismo error  
❌ `react-simple-maps` → No soporta tiles/interactividad avanzada  
❌ Mapbox GL JS → Incompatible con Turbopack  
✅ **Mapa estático** → Funciona siempre  
⚠️ **Portal + cleanup** → Funciona con cuidado  

---

## 🎓 Lecciones Aprendidas

1. **Para presentaciones críticas:**
   - Priorizar confiabilidad sobre interactividad
   - Tener fallback estático siempre

2. **Librerías imperativas en React:**
   - Requieren wrappers cuidadosos
   - Portals ayudan a aislar lifecycle
   - Cleanup es CRÍTICO

3. **Next.js 16 + Turbopack:**
   - Turbopack es nuevo, tiene edge cases
   - Dynamic imports pueden fallar con librerías complejas
   - Webpack probablemente funcionaría mejor

4. **AnimatePresence + librerías DOM:**
   - Conflictos inherentes
   - Usar portals para aislar
   - O desactivar animaciones para slides complejos

---

**Estado actual:** ❌ Mapa interactivo con errores  
**Acción recomendada:** Implementar Solución A (estático) O Solución B (robusto)  
**Tiempo estimado:**  
- Solución A: 20-30 minutos  
- Solución B: 1-2 horas  

¿Qué solución prefieres implementar?
