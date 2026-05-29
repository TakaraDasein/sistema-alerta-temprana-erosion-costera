# Guía de Uso de Datos GeoJSON - Erosión Costera Dibulla

## Archivos Disponibles

### 1. Archivos de Producción (Recomendados)
```
public/geojson/
├── puntos-criticos-dibulla.json          ✓ Validado y corregido
└── municipio-dibulla.json                ✓ Validado y corregido (FeatureCollection)
```

### 2. Archivos Mejorados (Opcionales)
```
public/geojson/
├── puntos-criticos-dibulla-mejorado.json  ✓ Con propiedades adicionales
└── municipio-dibulla-corregido.json       ✓ Backup de corrección
```

---

## Uso en Mapbox GL JS

### Cargar puntos críticos
```javascript
map.on('load', () => {
  // Agregar fuente de datos
  map.addSource('puntos-criticos', {
    type: 'geojson',
    data: '/geojson/puntos-criticos-dibulla.json'
  });

  // Agregar capa de círculos con colores por nivel
  map.addLayer({
    id: 'puntos-layer',
    type: 'circle',
    source: 'puntos-criticos',
    paint: {
      'circle-radius': [
        'interpolate', ['linear'], ['get', 'poblacionAfectada'],
        0, 8,
        500, 16,
        1000, 24
      ],
      'circle-color': [
        'match', ['get', 'nivel'],
        'crítico', '#dc2626',
        'alto', '#f59e0b',
        'medio', '#eab308',
        '#6b7280'
      ],
      'circle-opacity': 0.8,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  });

  // Agregar etiquetas
  map.addLayer({
    id: 'puntos-labels',
    type: 'symbol',
    source: 'puntos-criticos',
    layout: {
      'text-field': ['get', 'nombre'],
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 12,
      'text-offset': [0, 1.5],
      'text-anchor': 'top'
    },
    paint: {
      'text-color': '#1f2937',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2
    }
  });
});
```

### Cargar límites municipales
```javascript
map.addSource('municipio', {
  type: 'geojson',
  data: '/geojson/municipio-dibulla.json'
});

map.addLayer({
  id: 'municipio-fill',
  type: 'fill',
  source: 'municipio',
  paint: {
    'fill-color': '#3b82f6',
    'fill-opacity': 0.1
  }
});

map.addLayer({
  id: 'municipio-outline',
  type: 'line',
  source: 'municipio',
  paint: {
    'line-color': '#1d4ed8',
    'line-width': 2,
    'line-dasharray': [2, 2]
  }
});
```

### Crear popup interactivo
```javascript
map.on('click', 'puntos-layer', (e) => {
  const props = e.features[0].properties;
  
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(`
      <div class="popup-erosion">
        <h3>${props.nombre}</h3>
        <div class="nivel nivel-${props.nivel}">${props.nivel.toUpperCase()}</div>
        
        <div class="metric">
          <span class="label">Tasa de erosión:</span>
          <span class="value">${props.tasaErosion} m/año</span>
        </div>
        
        <div class="metric">
          <span class="label">Retroceso 1985-2020:</span>
          <span class="value">${props.retroceso30anos} metros</span>
        </div>
        
        <div class="metric">
          <span class="label">Población afectada:</span>
          <span class="value">${props.poblacionAfectada} personas</span>
        </div>
        
        <div class="metric">
          <span class="label">Comunidad:</span>
          <span class="value">${props.comunidad}</span>
        </div>
        
        <div class="metric">
          <span class="label">Infraestructura:</span>
          <span class="value">${props.infraestructura}</span>
        </div>
        
        <p class="descripcion">${props.descripcion}</p>
      </div>
    `)
    .addTo(map);
});

// Cambiar cursor al pasar sobre puntos
map.on('mouseenter', 'puntos-layer', () => {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'puntos-layer', () => {
  map.getCanvas().style.cursor = '';
});
```

---

## Uso con Leaflet

```javascript
// Cargar puntos críticos
fetch('/geojson/puntos-criticos-dibulla.json')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        const nivel = feature.properties.nivel;
        const color = nivel === 'crítico' ? '#dc2626' :
                     nivel === 'alto' ? '#f59e0b' : '#eab308';
        
        return L.circleMarker(latlng, {
          radius: Math.sqrt(feature.properties.poblacionAfectada) / 3,
          fillColor: color,
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties;
        layer.bindPopup(`
          <h3>${props.nombre}</h3>
          <p><strong>Nivel:</strong> ${props.nivel}</p>
          <p><strong>Tasa de erosión:</strong> ${props.tasaErosion} m/año</p>
          <p><strong>Retroceso 30 años:</strong> ${props.retroceso30anos}m</p>
          <p><strong>Población afectada:</strong> ${props.poblacionAfectada}</p>
          <p>${props.descripcion}</p>
        `);
      }
    }).addTo(map);
  });
```

---

## Análisis con Turf.js

### Calcular distancias entre puntos
```javascript
import * as turf from '@turf/turf';

fetch('/geojson/puntos-criticos-dibulla.json')
  .then(response => response.json())
  .then(data => {
    const points = data.features;
    
    // Distancia entre dos puntos
    const from = points[0];
    const to = points[1];
    const distance = turf.distance(from, to, {units: 'kilometers'});
    console.log(`Distancia: ${distance.toFixed(2)} km`);
    
    // Centro del conjunto de puntos
    const center = turf.center(data);
    console.log('Centro:', center.geometry.coordinates);
    
    // Calcular buffer de 1km alrededor de cada punto
    points.forEach(point => {
      const buffered = turf.buffer(point, 1, {units: 'kilometers'});
      console.log(`Buffer de ${point.properties.nombre}:`, buffered);
    });
  });
```

### Verificar si puntos están dentro del municipio
```javascript
Promise.all([
  fetch('/geojson/puntos-criticos-dibulla.json').then(r => r.json()),
  fetch('/geojson/municipio-dibulla.json').then(r => r.json())
]).then(([puntos, municipio]) => {
  const polygon = municipio.features[0];
  
  puntos.features.forEach(punto => {
    const dentro = turf.booleanPointInPolygon(punto, polygon);
    console.log(`${punto.properties.nombre}: ${dentro ? 'DENTRO' : 'FUERA'}`);
  });
});
```

### Crear línea costera conectando puntos
```javascript
fetch('/geojson/puntos-criticos-dibulla.json')
  .then(response => response.json())
  .then(data => {
    // Ordenar puntos por longitud (oeste a este)
    const sorted = data.features.sort((a, b) => 
      a.geometry.coordinates[0] - b.geometry.coordinates[0]
    );
    
    // Crear línea
    const coords = sorted.map(f => f.geometry.coordinates);
    const lineaCostera = turf.lineString(coords);
    
    // Calcular longitud total
    const longitud = turf.length(lineaCostera, {units: 'kilometers'});
    console.log(`Longitud de costa afectada: ${longitud.toFixed(2)} km`);
  });
```

---

## Filtrado y Búsqueda

### Filtrar por nivel de riesgo
```javascript
fetch('/geojson/puntos-criticos-dibulla.json')
  .then(response => response.json())
  .then(data => {
    const criticos = data.features.filter(f => 
      f.properties.nivel === 'crítico'
    );
    
    console.log(`Puntos críticos: ${criticos.length}`);
    criticos.forEach(p => {
      console.log(`- ${p.properties.nombre}: ${p.properties.tasaErosion} m/año`);
    });
  });
```

### Ordenar por tasa de erosión
```javascript
fetch('/geojson/puntos-criticos-dibulla.json')
  .then(response => response.json())
  .then(data => {
    const ordenados = data.features.sort((a, b) => 
      a.properties.tasaErosion - b.properties.tasaErosion
    );
    
    console.log('Puntos ordenados por erosión (más crítico primero):');
    ordenados.forEach((p, i) => {
      console.log(`${i+1}. ${p.properties.nombre}: ${p.properties.tasaErosion} m/año`);
    });
  });
```

### Calcular estadísticas
```javascript
fetch('/geojson/puntos-criticos-dibulla.json')
  .then(response => response.json())
  .then(data => {
    const stats = {
      total: data.features.length,
      criticos: data.features.filter(f => f.properties.nivel === 'crítico').length,
      altos: data.features.filter(f => f.properties.nivel === 'alto').length,
      medios: data.features.filter(f => f.properties.nivel === 'medio').length,
      
      tasaPromedio: data.features.reduce((sum, f) => 
        sum + Math.abs(f.properties.tasaErosion), 0
      ) / data.features.length,
      
      retrocesoPromedio: data.features.reduce((sum, f) => 
        sum + f.properties.retroceso30anos, 0
      ) / data.features.length,
      
      poblacionTotal: data.features.reduce((sum, f) => 
        sum + f.properties.poblacionAfectada, 0
      ),
      
      puntoMasCritico: data.features.reduce((max, f) => 
        Math.abs(f.properties.tasaErosion) > Math.abs(max.properties.tasaErosion) ? f : max
      )
    };
    
    console.log('Estadísticas:', stats);
  });
```

---

## Exportar a otros formatos

### Exportar a CSV
```javascript
function geojsonToCSV(geojson) {
  const features = geojson.features;
  const headers = ['id', 'nombre', 'longitud', 'latitud', 'tasaErosion', 
                   'retroceso30anos', 'nivel', 'poblacionAfectada', 'comunidad'];
  
  const rows = features.map(f => [
    f.properties.id,
    f.properties.nombre,
    f.geometry.coordinates[0],
    f.geometry.coordinates[1],
    f.properties.tasaErosion,
    f.properties.retroceso30anos,
    f.properties.nivel,
    f.properties.poblacionAfectada,
    f.properties.comunidad
  ]);
  
  const csv = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');
  
  return csv;
}

// Descargar CSV
fetch('/geojson/puntos-criticos-dibulla.json')
  .then(response => response.json())
  .then(data => {
    const csv = geojsonToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'puntos-criticos-dibulla.csv';
    a.click();
  });
```

---

## Validación de Datos

### Script de validación
```bash
# Ejecutar validación completa
npm run validate:geojson

# O directamente con Node
node scripts/validate-geojson.js
```

### Validación manual en JavaScript
```javascript
function validarPunto(feature) {
  const errors = [];
  const props = feature.properties;
  
  // Verificar coherencia matemática
  const retrocesoEsperado = Math.abs(props.tasaErosion) * 30;
  const tolerancia = 5;
  
  if (Math.abs(props.retroceso30anos - retrocesoEsperado) > tolerancia) {
    errors.push(`Retroceso inconsistente: esperado ${retrocesoEsperado}m, actual ${props.retroceso30anos}m`);
  }
  
  // Verificar coordenadas
  const [lon, lat] = feature.geometry.coordinates;
  if (lon > -73.2 || lon < -73.5 || lat < 11.2 || lat > 11.4) {
    errors.push(`Coordenadas fuera de rango esperado de Dibulla`);
  }
  
  return errors;
}
```

---

## Mejores Prácticas

### ✓ Hacer
- Usar `puntos-criticos-dibulla.json` para producción (ya validado)
- Verificar que las coordenadas estén en formato [longitud, latitud]
- Usar colores consistentes por nivel de riesgo
- Incluir atribución de datos (INVEMAR)
- Cachear datos GeoJSON en el cliente
- Usar clustering para muchos puntos

### ✗ Evitar
- Modificar el archivo original sin validación
- Invertir coordenadas [lat, lon]
- Hardcodear coordenadas en el código
- Cambiar estructura sin probar con validador
- Ignorar advertencias del validador

---

## Recursos Adicionales

### Documentación
- [RFC 7946 - GeoJSON Specification](https://datatracker.ietf.org/doc/html/rfc7946)
- [Mapbox GL JS - GeoJSON Sources](https://docs.mapbox.com/mapbox-gl-js/api/sources/#geojsonsource)
- [Turf.js Documentation](https://turfjs.org/)
- [Leaflet GeoJSON Tutorial](https://leafletjs.com/examples/geojson/)

### Herramientas Online
- [geojson.io](http://geojson.io/) - Editor visual
- [GeoJSONLint](https://geojsonlint.com/) - Validador online
- [Mapshaper](https://mapshaper.org/) - Simplificar geometrías

### Fuentes de Datos Oficiales
- **INVEMAR** - https://www.invemar.org.co/
- **IDEAM** - http://www.ideam.gov.co/
- **IGAC** - https://www.igac.gov.co/
- **DANE** - https://www.dane.gov.co/

---

## Soporte

Para reportar errores en los datos o sugerir mejoras:
1. Ejecutar script de validación
2. Documentar el problema encontrado
3. Proponer corrección basada en fuentes oficiales
4. Actualizar archivo y re-validar

**Fecha de última actualización:** 27 de mayo de 2026
