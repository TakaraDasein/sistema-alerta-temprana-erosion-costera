# 🔧 SOLUCIÓN: Error ChunkLoadError - Dibulla Map

## Problema
```
Failed to load chunk /_next/static/chunks/node_modules__pnpm_0hb46i~._.js 
from module dibulla-map-client.tsx
```

## Causa
El navegador/servidor tiene cache del archivo `dibulla-map-client.tsx` que ya fue eliminado.

## ✅ Solución Implementada

### 1. Arquitectura actualizada
- ❌ Eliminado: `dibulla-map-client.tsx` (causaba problemas de chunk loading)
- ✅ Integrado: Todo el código del mapa está ahora en `slide-dibulla.tsx`
- ✅ Método: Carga dinámica con `useEffect` + `Promise.all`

### 2. Código actual
```typescript
// slide-dibulla.tsx
function LeafletMap() {
  const [isClient, setIsClient] = useState(false)
  const [mapComponents, setMapComponents] = useState<any>(null)
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Cargar Leaflet dinámicamente solo en cliente
    Promise.all([
      import('leaflet'),
      import('react-leaflet')
    ]).then(([leafletModule, reactLeafletModule]) => {
      setL(leafletModule.default)
      setMapComponents(reactLeafletModule)
    })
  }, [])

  // Renderiza solo cuando todo está cargado
  if (!isClient || !mapComponents || !L) {
    return <Loading />
  }

  return <MapContainer>...</MapContainer>
}
```

## 🚀 Pasos para Resolver

### Opción A: Limpiar Cache del Navegador (RECOMENDADO)

1. **Detener el servidor:**
```bash
# Ctrl+C en la terminal donde corre `pnpm dev`
# O ejecutar:
pkill -f "next dev"
```

2. **Limpiar cache de Next.js:**
```bash
cd /home/efren-cyborg/1.Cyborg-Town/2.Daten-Town/1.competencias/presentacion-o-upala-mma
rm -rf .next node_modules/.cache
```

3. **Reiniciar servidor:**
```bash
pnpm dev
```

4. **Limpiar cache del navegador:**
   - **Chrome/Edge:** 
     - Abrir DevTools (F12)
     - Clic derecho en el botón de refresh
     - Seleccionar "Empty Cache and Hard Reload"
   
   - **Firefox:**
     - Ctrl+Shift+Delete
     - Seleccionar "Cached Web Content"
     - Clic en "Clear Now"
   
   - **Método universal:**
     - Ctrl+Shift+R (Hard refresh)
     - O abrir ventana de incógnito

5. **Abrir en navegador:**
```
http://localhost:3000
```

### Opción B: Usar Ventana de Incógnito

1. **Reiniciar servidor:**
```bash
pkill -f "next dev"
rm -rf .next
pnpm dev
```

2. **Abrir en modo incógnito:**
   - Chrome/Edge: Ctrl+Shift+N
   - Firefox: Ctrl+Shift+P
   - Ir a: http://localhost:3000

### Opción C: Cambiar Puerto

1. **Iniciar en puerto diferente:**
```bash
pkill -f "next dev"
rm -rf .next
pnpm dev -- --port 3002
```

2. **Abrir navegador:**
```
http://localhost:3002
```

## ✅ Verificación de Funcionamiento

Después de seguir los pasos, deberías ver:

1. **Slide 3 (Dibulla):**
   - ✅ Mensaje "Cargando mapa..." (por ~1 segundo)
   - ✅ Mapa interactivo con fondo oscuro
   - ✅ 6 markers rojos/naranjas/amarillos
   - ✅ Click en marker → Popup con información

2. **Sin errores en consola:**
   - ✅ No debe aparecer "ChunkLoadError"
   - ✅ No debe aparecer "Failed to load chunk"

## 🔍 Debugging

Si el error persiste:

### 1. Verificar que el archivo fue eliminado
```bash
ls components/presentation/dibulla-map-client.tsx
# Debe retornar: "No such file or directory"
```

### 2. Verificar contenido de slide-dibulla.tsx
```bash
grep "dibulla-map-client" components/presentation/slide-dibulla.tsx
# No debe retornar nada (sin coincidencias)
```

### 3. Ver logs del servidor
```bash
pnpm dev
# Buscar errores en la salida
```

### 4. Ver consola del navegador
- F12 → Pestaña Console
- Buscar errores en rojo
- Buscar warnings amarillos relacionados con Leaflet

### 5. Verificar network requests
- F12 → Pestaña Network
- Filtrar por "Failed"
- Ver qué chunks están fallando

## 📊 Estado Actual del Código

### Archivos relevantes:

```
components/presentation/
├── slide-dibulla.tsx          ✅ TODO el código del mapa aquí
├── slide-policrisis.tsx       ✅ Gráficos Recharts
├── dibulla-map-client.tsx     ❌ ELIMINADO
└── backup-originals/
    └── ...                    ✅ Backups seguros
```

### Dependencias instaladas:
```json
{
  "leaflet": "^1.9.4",          ✅ Instalado
  "react-leaflet": "^4.2.1",    ✅ Instalado
  "@types/leaflet": "^1.9.12"   ✅ Instalado
}
```

### CSS global (app/layout.tsx):
```typescript
import 'leaflet/dist/leaflet.css'  ✅ Importado
```

## 🎯 Por Qué Funciona Ahora

### Antes (PROBLEMA):
```typescript
// slide-dibulla.tsx
const Map = dynamic(
  () => import('./dibulla-map-client'),  // ❌ Chunk separado
  { ssr: false }
)
```
**Problema:** Turbopack no creaba el chunk correctamente

### Ahora (SOLUCIÓN):
```typescript
// slide-dibulla.tsx
function LeafletMap() {
  useEffect(() => {
    Promise.all([
      import('leaflet'),           // ✅ Import directo
      import('react-leaflet')      // ✅ Import directo
    ]).then(...)
  }, [])
}
```
**Ventaja:** Sin archivos intermedios, sin chunks problemáticos

## 🚨 Si Nada Funciona

### Reset completo del proyecto:

```bash
# 1. Detener todo
pkill -f "next dev"

# 2. Limpiar TODO
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules

# 3. Reinstalar
pnpm install

# 4. Rebuild
pnpm build

# 5. Dev
pnpm dev

# 6. Abrir en incógnito
# http://localhost:3000
```

## 📞 Soporte Adicional

Si después de todos estos pasos el error persiste:

1. Verificar versión de Node.js:
```bash
node -v  # Debe ser >= 18.17.0
```

2. Verificar versión de pnpm:
```bash
pnpm -v  # Debe ser >= 8.0.0
```

3. Ver logs completos:
```bash
pnpm dev 2>&1 | tee dev.log
# Enviar archivo dev.log para análisis
```

## ✅ Checklist de Resolución

- [ ] Detener servidor (Ctrl+C o pkill)
- [ ] Eliminar .next: `rm -rf .next`
- [ ] Verificar que dibulla-map-client.tsx no existe
- [ ] Reiniciar servidor: `pnpm dev`
- [ ] Abrir navegador en incógnito
- [ ] Hard refresh: Ctrl+Shift+R
- [ ] Navegar a Slide 3 (Dibulla)
- [ ] Verificar que el mapa carga
- [ ] Hacer clic en un marker
- [ ] Verificar que el popup se abre

---

**Estado:** ✅ Código actualizado correctamente  
**Pendiente:** Limpiar cache del navegador del usuario  
**Build:** ✅ Exitoso  
**Runtime:** ⏳ Pendiente de verificación por usuario  
