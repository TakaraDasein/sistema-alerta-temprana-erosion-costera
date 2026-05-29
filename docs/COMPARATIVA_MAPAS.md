# COMPARATIVA DE LIBRERÍAS DE MAPAS PARA O'UPALAMMA

## 🗺️ Análisis de Opciones

### Comparativa Técnica

| Característica | **Leaflet + React Leaflet** | Mapbox GL JS | react-simple-maps |
|----------------|----------------------------|--------------|-------------------|
| **Tamaño** | 42 KB (ligero) ⭐⭐⭐⭐⭐ | ~200 KB | ~100 KB |
| **Compatibilidad Next.js 16** | ✅ Excelente | ❌ Problemas con Turbopack | ✅ Buena |
| **Renderizado** | Canvas/SVG | WebGL (GPU) | SVG |
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Interactividad** | ✅ Zoom, pan, markers | ✅ Zoom, pan, 3D | ⚠️ Limitada |
| **Costo** | 🆓 100% Gratuito | 💰 50k cargas/mes gratis | 🆓 100% Gratuito |
| **Curva de aprendizaje** | Fácil ⭐⭐⭐⭐⭐ | Media ⭐⭐⭐ | Fácil ⭐⭐⭐⭐ |
| **Tiles OpenStreetMap** | ✅ Nativo | ✅ Soportado | ❌ No |
| **Popups interactivos** | ✅ Nativos | ✅ Nativos | ⚠️ Custom |
| **Mobile responsive** | ✅ Excelente | ✅ Excelente | ✅ Bueno |
| **Accesibilidad** | ✅ Buena | ⭐⭐⭐ | ⭐⭐ |
| **Comunidad** | ⭐⭐⭐⭐⭐ Enorme | ⭐⭐⭐⭐ Grande | ⭐⭐⭐ Media |
| **Usado por** | GitHub, Facebook, NPR | Uber, Airbnb, NYT | Visualizaciones estáticas |

---

## 🏆 RECOMENDACIÓN FINAL: **LEAFLET + REACT-LEAFLET**

### ¿Por qué Leaflet es la mejor opción para O'UPALAMMA?

#### ✅ Ventajas Críticas

1. **100% Compatible con Next.js 16 + Turbopack**
   - No tendrás problemas de build
   - Funciona en dev y producción sin cambios

2. **Totalmente Gratuito y Open Source**
   - No necesitas token de API
   - Sin límites de uso
   - OpenStreetMap tiles gratuitos

3. **Ligero y Rápido**
   - Solo 42 KB de JavaScript
   - Carga instantánea
   - Perfecto para presentaciones

4. **Interactividad Completa**
   - Zoom, pan, markers animados
   - Popups personalizables con HTML/React
   - Eventos de click, hover, etc.

5. **Fácil de Usar**
   - API simple y clara
   - React Leaflet = componentes React nativos
   - Documentación excelente

6. **Estética Personalizable**
   - CSS 100% customizable
   - Markers con iconos personalizados
   - Estilo dark compatible con tu diseño

#### 📊 Para Tu Proyecto Específicamente

**Necesitas**:
- ✅ Mostrar 6 puntos críticos de erosión en Dibulla
- ✅ Popups con información detallada
- ✅ Markers con colores según nivel de riesgo
- ✅ Que compile en Next.js 16
- ✅ Sin costos adicionales

**Leaflet ofrece**:
- ✅ Todo lo anterior
- ✅ Tiles de OpenStreetMap (como en tu link)
- ✅ Heat maps (plugin)
- ✅ Círculos de área de cobertura (para LoRa)
- ✅ Líneas y polígonos (para red mesh)

---

## 🚀 Plan de Implementación con Leaflet

### Fase 1: Instalación (2 min)
```bash
pnpm add leaflet@^1.9.4 react-leaflet@^4.2.1
pnpm add -D @types/leaflet@^1.9.12
```

### Fase 2: Slide Dibulla con Leaflet (30 min)
**Características**:
- Mapa centrado en Dibulla (11.2766, -73.3877)
- 6 markers de puntos críticos con datos INVEMAR
- Popups con información detallada
- Colores según nivel de riesgo
- Leyenda
- Estadísticas

### Fase 3: Slide LoRa Network con Leaflet (20 min)
**Características**:
- Círculo de 12km de cobertura
- Nodos comunitarios
- Líneas de conexión mesh
- Animaciones de pulso

---

## 📝 Código de Ejemplo

### Configuración Básica con React Leaflet

```typescript
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export function MapDibulla() {
  const position = [11.2766, -73.3877] // Palomino
  
  return (
    <MapContainer 
      center={position} 
      zoom={11} 
      style={{ height: '100%', width: '100%' }}
      className="rounded-xl"
    >
      {/* Tiles de OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      
      {/* Marker de punto crítico */}
      <Marker position={position}>
        <Popup>
          <div className="text-[#c9a86c]">
            <h3 className="font-bold">Palomino Centro</h3>
            <p>Erosión: -5.63 m/año</p>
            <p>800 personas en riesgo</p>
          </div>
        </Popup>
      </Marker>
      
      {/* Círculo de cobertura LoRa */}
      <Circle
        center={position}
        radius={12000} // 12 km
        pathOptions={{ 
          color: '#22c55e', 
          fillColor: '#22c55e',
          fillOpacity: 0.15 
        }}
      />
    </MapContainer>
  )
}
```

---

## 🎨 Personalización para O'UPALAMMA

### Markers Personalizados con Colores de Riesgo

```typescript
import L from 'leaflet'

const createCustomIcon = (nivel: 'crítico' | 'alto' | 'medio') => {
  const colors = {
    crítico: '#ef4444',
    alto: '#f59e0b',
    medio: '#eab308'
  }
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px; 
        height: 40px; 
        background: ${colors[nivel]}; 
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      "></div>
    `
  })
}
```

### Estilo Dark Compatible

```css
/* CSS global para tiles dark */
.leaflet-tile {
  filter: invert(1) hue-rotate(180deg) brightness(0.9);
}

/* O usar tiles dark de CartoDB */
https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
```

---

## ⚡ Ventajas sobre Mapbox para tu Caso

| Aspecto | Leaflet | Mapbox |
|---------|---------|--------|
| **Build Next.js 16** | ✅ Funciona | ❌ Falla |
| **Costo** | $0 siempre | $0 hasta 50k/mes |
| **Setup** | 5 min | 15 min + token |
| **Dependencias** | 2 paquetes | 3 paquetes |
| **Tamaño bundle** | +42 KB | +200 KB |
| **Complejidad** | Baja | Media |
| **Para tu proyecto** | ✅ Perfecto | ⚠️ Overkill |

---

## 🎯 Decisión Final

### ✅ USAR LEAFLET + REACT-LEAFLET

**Razones**:
1. ✅ Compila sin problemas en Next.js 16
2. ✅ 100% gratuito, sin tokens
3. ✅ Más ligero y rápido
4. ✅ OpenStreetMap como en tu referencia
5. ✅ Suficiente para tus necesidades
6. ✅ Más fácil de mantener

**Próximos pasos**:
1. Instalar Leaflet
2. Crear `slide-dibulla-leaflet.tsx`
3. Crear `slide-lora-network-leaflet.tsx`
4. Verificar build
5. Listo! 🚀

---

**¿Procedo con la implementación de Leaflet?**

---

**Autor**: OpenCode AI Assistant  
**Fecha**: 2026-05-27  
**Decisión**: Leaflet + React-Leaflet es la mejor opción para O'UPALAMMA
