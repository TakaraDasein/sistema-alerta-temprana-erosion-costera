# 🚀 Guía de Inicio Rápido - O'UPALAMMA

## Visualizaciones Implementadas

Esta presentación incluye visualizaciones avanzadas de datos con mapas interactivos y gráficos estadísticos.

---

## 📦 Instalación

```bash
# 1. Instalar dependencias
pnpm install

# 2. Crear archivo de variables de entorno (opcional para Mapbox, no requerido para Leaflet)
cp .env.example .env.local

# 3. Iniciar servidor de desarrollo
pnpm dev

# 4. Abrir en navegador
# http://localhost:3000
```

---

## 🎯 Slides Mejorados

### 1. Slide Policrisis (Slide 2)
**Archivo:** `components/presentation/slide-policrisis.tsx`

**Visualizaciones:**
- ✅ **Area Chart**: Ascenso del nivel del mar 1985-2100 (IPCC)
- ✅ **Radar Chart**: Convergencia de 5 crisis planetarias
- ✅ **Dual-axis Chart**: Pérdida de manglares en La Guajira

**Datos incluidos:**
- Proyecciones IPCC RCP 4.5 y RCP 8.5
- 8,470 hectáreas de manglares perdidas (1985-2025)
- Índices de policrisis Colombia vs Global

**Navegación:**
- Usa las teclas ← → para navegar entre gráficos
- Hover sobre los gráficos para ver detalles

---

### 2. Slide Dibulla (Slide 3)
**Archivo:** `components/presentation/slide-dibulla.tsx`

**Visualizaciones:**
- ✅ **Mapa interactivo Leaflet** con 6 puntos críticos
- ✅ **Popups informativos** con datos de INVEMAR 2024
- ✅ **Círculos de calor** proporcionales a erosión

**Puntos críticos incluidos:**
1. **Palomino Centro**: -5.63 m/año (800 personas)
2. **La Cachaca III**: -4.2 m/año (210 personas)
3. **Playa Los Cocos**: -3.8 m/año (150 personas)
4. **Desembocadura Río Palomino**: -4.5 m/año (300 personas)
5. **Sector Mingueo**: -3.2 m/año (180 personas)
6. **Quebrada Valencia**: -3.5 m/año (250 personas)

**Interacción:**
- Haz clic en los markers rojos/naranjas/amarillos
- Explora los popups con información detallada
- Usa zoom y pan para navegar el mapa

---

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia servidor de desarrollo (port 3000)
pnpm dev --port 3001  # Inicia en puerto personalizado

# Build
pnpm build            # Genera build de producción
pnpm start            # Inicia servidor de producción

# Utilidades
pnpm lint             # Verifica código con ESLint
pnpm clean            # Limpia cache de Next.js
```

---

## 🎨 Personalización

### Cambiar datos del mapa

Edita `components/presentation/slide-dibulla.tsx`:

```typescript
const criticalPoints: CriticalPoint[] = [
  {
    id: 1,
    nombre: "Nuevo Punto",
    coordinates: [latitud, longitud],  // [lat, lng]
    tasaErosion: -4.5,                 // m/año (negativo)
    comunidad: "Nombre comunidad",
    poblacionAfectada: 500,
    infraestructura: "Descripción",
    retroceso30anos: 135,              // metros
    nivel: "crítico"                   // crítico | alto | medio
  }
]
```

### Cambiar colores

La paleta wayuu está definida en `app/globals.css`:

```css
--color-oro: #c9a86c;
--color-caribe: #2d8bb8;
--color-oscuro: #0d0a08;
```

---

## 📊 Estructura de Datos

### Gráficos (Recharts)

Los datos están en `slide-policrisis.tsx`:

```typescript
// Nivel del mar
const seaLevelData = [
  { year: 1985, nivel: 0, escenario: "Histórico" },
  // ...
]

// Manglares
const mangroveData = [
  { year: 1985, hectareas: 13150, perdida: 0 },
  // ...
]
```

### Mapa (Leaflet)

Coordenadas en formato `[latitud, longitud]`:

```typescript
// Dibulla, La Guajira
center: [11.2766, -73.3877]

// Radio de círculos proporcional a erosión
radius: Math.abs(tasaErosion) * 800
```

---

## 🔍 Verificación de Funcionamiento

### Checklist de funcionamiento

✅ Build exitoso:
```bash
pnpm build
# Debe terminar con: ✓ Compiled successfully
```

✅ Desarrollo sin errores:
```bash
pnpm dev
# Abrir http://localhost:3000
# Navegar a Slide 2 (Policrisis) → Ver 3 gráficos
# Navegar a Slide 3 (Dibulla) → Ver mapa con 6 markers
```

✅ Markers interactivos:
- Clic en marker → Debe abrir popup
- Popup muestra: erosión, población, comunidad, infraestructura

✅ Gráficos responsivos:
- Redimensionar ventana → Gráficos se adaptan
- Mobile viewport → Todo visible y usable

---

## 🐛 Solución de Problemas

### Error: "Module not found: leaflet"

```bash
# Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Error: "window is not defined"

Verifica que `dibulla-map-client.tsx` use:
```typescript
"use client"
```

Y que `slide-dibulla.tsx` importe con:
```typescript
const Map = dynamic(() => import('./dibulla-map-client'), { ssr: false })
```

### Error: "CSS module not available"

Verifica que `app/layout.tsx` contenga:
```typescript
import 'leaflet/dist/leaflet.css'
```

### Mapa no se ve

1. Limpia cache:
```bash
rm -rf .next
pnpm dev
```

2. Hard refresh en navegador: `Ctrl+Shift+R`

3. Revisa consola del navegador para errores de red

**Más soluciones:** Ver `docs/TROUBLESHOOTING.md`

---

## 📱 Modo Presentación

### Pantalla completa

- Presiona `F11` en navegador
- O usa modo presentación del navegador

### Navegación

```
Teclas de navegación:
→ o Espacio    : Siguiente slide
← o Backspace  : Slide anterior
Inicio (Home)  : Primera slide
Fin (End)      : Última slide
```

### Tips de presentación

1. **Slide Policrisis**: Pausa en cada gráfico para explicar
   - Area Chart: Tendencia exponencial del nivel del mar
   - Radar: Convergencia de múltiples crisis
   - Dual-axis: Pérdida masiva de manglares

2. **Slide Dibulla**: Haz clic en 2-3 puntos críticos representativos
   - Palomino (crítico): Mayor tasa de erosión
   - La Cachaca III (crítico): 42 familias wayuu desplazadas
   - Río Palomino (crítico): Infraestructura crítica en riesgo

3. **Narración sugerida**:
   > "Aquí vemos 6 puntos críticos con datos reales de INVEMAR 2024.
   > En Palomino Centro, la erosión avanza a 5.63 metros por año.
   > En 30 años, se han perdido 175 metros de costa.
   > 800 personas están en riesgo inmediato.
   > Y actualmente, NO hay ningún sistema de alerta temprana."

---

## 📚 Documentación Adicional

- **`docs/COMPARATIVA_MAPAS.md`**: Análisis técnico Leaflet vs alternativas
- **`docs/TROUBLESHOOTING.md`**: Guía de solución de problemas
- **`docs/RESUMEN_IMPLEMENTACION.md`**: Resumen completo de mejoras
- **`CONTEXTO.md`**: Diseño, arquitectura y normas del proyecto

---

## 🤝 Contribuir

### Reportar problemas

1. Verifica `docs/TROUBLESHOOTING.md`
2. Abre issue en repositorio
3. Incluye:
   - Comando ejecutado
   - Error completo
   - Output de `pnpm list leaflet react-leaflet`

### Agregar nuevos slides con mapas

1. Copia `components/presentation/dibulla-map-client.tsx`
2. Modifica datos y estilo
3. Importa con `dynamic(..., { ssr: false })`
4. Verifica con `pnpm build`

---

## ⚡ Performance

### Tamaños de bundle

```
Leaflet: ~42 KB gzipped
Recharts: ~95 KB gzipped
Total visualizaciones: ~140 KB
```

### Optimizaciones incluidas

- ✅ Code splitting automático (Next.js)
- ✅ Lazy loading de mapas (dynamic import)
- ✅ CSS minificado
- ✅ Imágenes optimizadas (next/image)

---

## 📄 Licencia

Este proyecto es parte del Hackathon UNGRD · PNUD Colombia 2026.

---

**🎉 ¡Listo para presentar!**

Para cualquier duda, consulta:
- `docs/TROUBLESHOOTING.md`
- `docs/RESUMEN_IMPLEMENTACION.md`
