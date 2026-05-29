# Slides Mejorados con Visualización de Datos y Mapas

## 🎯 Resumen de Mejoras Implementadas

Se han creado versiones mejoradas de los slides con visualizaciones avanzadas usando **Recharts** y **Mapbox GL JS**.

### ✅ Componentes Creados

#### 1. `slide-dibulla-enhanced.tsx` - Mapa Interactivo de Puntos Críticos

**Características**:
- ✅ Mapa Mapbox GL JS con estilo dark
- ✅ 6 puntos críticos georreferenciados con datos reales de INVEMAR 2024
- ✅ Markers animados con pulso según nivel de riesgo (crítico/alto/medio)
- ✅ Popups interactivos con información detallada:
  - Tasa de erosión anual (m/año)
  - Retroceso acumulado (1985-2025)
  - Población afectada
  - Comunidad y tipo de infraestructura en riesgo
- ✅ Heat map de intensidad de erosión
- ✅ Leyenda de niveles de riesgo
- ✅ Estadísticas agregadas (1,890 personas en riesgo, 6 puntos, erosión promedio)
- ✅ Panel lateral con impactos de la policrisis (solo desktop)

**Datos incluidos**:
```javascript
Palomino Centro: -5.63 m/año, 175m perdidos, 800 personas
La Cachaca III: -4.2 m/año, 126m perdidos, 210 personas (42 familias wayuu)
Playa Los Cocos: -3.8 m/año, 114m perdidos, 150 personas
Desembocadura Río Palomino: -4.5 m/año, 135m perdidos, 300 personas
Sector Mingueo: -3.2 m/año, 96m perdidos, 180 personas
Quebrada Valencia: -3.5 m/año, 105m perdidos, 250 personas
```

#### 2. `slide-policrisis-enhanced.tsx` - Gráficos de Datos Climáticos

**Características**:
- ✅ **Area Chart**: Ascenso del nivel del mar 1985-2100 (datos IPCC 2021)
  - Histórico 1985-2020
  - Proyecciones RCP 4.5 y RCP 8.5
  - Hasta +2m para 2100
- ✅ **Radar Chart**: Convergencia de 5 crisis (Colombia vs Promedio Global)
  - Cambio Climático
  - Pérdida de Biodiversidad
  - Contaminación
  - Erosión Costera
  - Vulnerabilidad Social
- ✅ **Dual-Axis Line Chart**: Pérdida de manglares en Colombia 1990-2025
  - Área total de manglares (eje izquierdo, verde)
  - Pérdida acumulada (eje derecho, rojo)
  - -110,000 hectáreas perdidas
- ✅ Tooltips personalizados con estética del proyecto
- ✅ Panel lateral con las 3 crisis convergentes
- ✅ Stats destacadas en la parte inferior

---

## 📦 Cómo Usar los Nuevos Slides

### Opción A: Reemplazar Slides Existentes (Recomendado)

1. **Renombrar los archivos actuales** (backup):
   ```bash
   mv components/presentation/slide-dibulla.tsx components/presentation/slide-dibulla-old.tsx
   mv components/presentation/slide-policrisis.tsx components/presentation/slide-policrisis-old.tsx
   ```

2. **Renombrar los nuevos archivos**:
   ```bash
   mv components/presentation/slide-dibulla-enhanced.tsx components/presentation/slide-dibulla.tsx
   mv components/presentation/slide-policrisis-enhanced.tsx components/presentation/slide-policrisis.tsx
   ```

3. **Listo!** Los slides se actualizarán automáticamente en `presentation-viewer.tsx`

### Opción B: Usar Ambas Versiones (Testing)

1. **Actualizar** `components/presentation/index.ts`:
   ```typescript
   // Agregar al final
   export { SlideDibulla as SlideDibullaEnhanced } from "./slide-dibulla-enhanced"
   export { SlidePolicrisis as SlidePolicrisisEnhanced } from "./slide-policrisis-enhanced"
   ```

2. **Actualizar** `presentation-viewer.tsx`:
   ```typescript
   import { 
     SlideTitle,
     SlideSAT,
     SlidePolicrisisEnhanced, // Usar versión mejorada
     SlideDibullaEnhanced,    // Usar versión mejorada
     // ... resto de imports
   } from "./..."

   const slides = [
     { id: 0, component: SlideTitle, title: "Portada" },
     { id: 1, component: SlideSAT, title: "Sistema de Alerta Temprana" },
     { id: 2, component: SlidePolicrisisEnhanced, title: "Policrisis Planetaria" },
     { id: 3, component: SlideDibullaEnhanced, title: "Dibulla, La Guajira" },
     // ... resto de slides
   ]
   ```

---

## 🔧 Configuración Necesaria

### 1. Variables de Entorno

Asegúrate de tener el token de Mapbox en `.env.local`:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox_aqui
```

### 2. CSS de Mapbox

El CSS de Mapbox ya está importado en los componentes:
```typescript
import "mapbox-gl/dist/mapbox-gl.css"
```

Si hay problemas de estilos, agregar al `app/globals.css`:
```css
/* Estilos de Mapbox popups personalizados */
.mapboxgl-popup-content {
  background-color: #1a1510 !important;
  border: 1px solid rgba(201, 168, 108, 0.3) !important;
  border-radius: 8px !important;
  padding: 0 !important;
}

.mapboxgl-popup-close-button {
  color: #c9a86c !important;
  font-size: 20px !important;
  padding: 5px !important;
}

.mapboxgl-popup-close-button:hover {
  background-color: rgba(201, 168, 108, 0.2) !important;
}

.mapboxgl-popup-tip {
  border-top-color: #1a1510 !important;
}
```

---

## 🚀 Próximos Pasos Recomendados

### Slides Adicionales Pendientes (según PLAN_MEJORAS_VISUALIZACION.md)

#### 3. `slide-lora-network-enhanced.tsx` - Mapa de Cobertura LoRa
- Mapa con círculo de 12km de alcance
- Topología mesh store-and-forward
- Nodos comunitarios expandiendo la red

#### 4. `slide-environmental-monitoring.tsx` - Dashboard en Tiempo Real
- 7 variables ambientales con gráficos Recharts
- Simulación de datos en tiempo real
- Indicador de nivel de alerta (verde/amarillo/naranja/rojo)

### Código Completo Disponible

Todo el código de estos 2 slides adicionales está en:
📄 `docs/PLAN_MEJORAS_VISUALIZACION.md`

---

## 🐛 Solución de Problemas

### Error: "mapboxgl is not defined"

**Solución**: Asegúrate de que el token esté correctamente configurado y que la página se cargue en el cliente:
```typescript
"use client" // Al inicio del archivo
```

### Mapa no se ve / pantalla negra

**Causas posibles**:
1. Token de Mapbox inválido o expirado
2. Coordenadas incorrectas
3. CSS de Mapbox no cargado

**Solución**:
```bash
# Verificar token
echo $NEXT_PUBLIC_MAPBOX_TOKEN

# Reinstalar dependencias
pnpm install mapbox-gl react-map-gl
```

### Gráficos de Recharts no responsivos

**Solución**: Asegúrate de usar `ResponsiveContainer`:
```typescript
<ResponsiveContainer width="100%" height={220}>
  <AreaChart data={data}>
    {/* ... */}
  </AreaChart>
</ResponsiveContainer>
```

---

## 📊 Datos y Fuentes

### Puntos Críticos de Dibulla
- **Fuente**: INVEMAR (2024), docs/oupalamma.md línea 133-139
- **Metodología**: Análisis multitemporal de línea de costa 1985-2025

### Ascenso del Nivel del Mar
- **Fuente**: IPCC (2021) - Sexto Informe de Evaluación
- **Escenarios**: RCP 4.5 (emisiones moderadas), RCP 8.5 (emisiones altas)

### Pérdida de Manglares
- **Fuente**: INVEMAR (2024) - Informe del estado de ambientes marinos
- **Periodo**: 1990-2025

### Índice de Policrisis
- **Fuente**: PNUMA (2021) - Making Peace with Nature
- **Componentes**: Cambio climático, pérdida de biodiversidad, contaminación

---

## 📝 Notas de Implementación

### Performance

- Mapas Mapbox usan **WebGL** → alto rendimiento incluso con muchos markers
- Gráficos Recharts son **SVG** → buena calidad en cualquier resolución
- Animaciones con **Framer Motion** optimizadas con `will-change`

### Accesibilidad

- Todos los mapas tienen controles de navegación por teclado
- Popups con información textual para lectores de pantalla
- Gráficos con tooltips descriptivos

### Responsive Design

- Mapas adaptan zoom y tamaño según viewport
- Grid de gráficos cambia de 2 columnas (desktop) a 1 columna (mobile)
- Panel lateral de Dibulla solo visible en desktop (lg+)

---

## 🎨 Personalización

### Cambiar Estilo del Mapa

En `slide-dibulla-enhanced.tsx`, línea ~107:
```typescript
mapStyle="mapbox://styles/mapbox/dark-v11"
```

Estilos disponibles:
- `mapbox://styles/mapbox/dark-v11` (actual)
- `mapbox://styles/mapbox/light-v11`
- `mapbox://styles/mapbox/streets-v12`
- `mapbox://styles/mapbox/satellite-v9`
- `mapbox://styles/mapbox/satellite-streets-v12`

### Cambiar Colores de Riesgo

En `slide-dibulla-enhanced.tsx`, línea ~84-89:
```typescript
const getLevelColor = (nivel: string) => {
  switch (nivel) {
    case "crítico": return "#ef4444"  // rojo
    case "alto": return "#f59e0b"     // naranja
    case "medio": return "#eab308"    // amarillo
    default: return "#22c55e"         // verde
  }
}
```

---

## ✅ Checklist de Integración

- [x] Dependencias instaladas (`mapbox-gl`, `react-map-gl`)
- [x] Token de Mapbox configurado en `.env.local`
- [x] Componentes `slide-dibulla-enhanced.tsx` creados
- [x] Componentes `slide-policrisis-enhanced.tsx` creados
- [ ] Slides integrados en `presentation-viewer.tsx`
- [ ] CSS personalizado de Mapbox agregado (opcional)
- [ ] Probado en Chrome/Firefox/Safari
- [ ] Probado en mobile (responsive)
- [ ] Verificado rendimiento (60fps en animaciones)

---

**Autor**: OpenCode AI Assistant  
**Fecha**: 2026-05-27  
**Versión**: 1.0  
**Documentación relacionada**: docs/PLAN_MEJORAS_VISUALIZACION.md
