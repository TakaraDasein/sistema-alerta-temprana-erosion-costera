#!/bin/bash

echo "🧹 Limpiando cache de Next.js y reiniciando..."

# Detener cualquier servidor Next.js corriendo
echo "1. Deteniendo servidores existentes..."
pkill -f "next dev" 2>/dev/null || true

# Limpiar cache de Next.js
echo "2. Eliminando cache de Next.js..."
rm -rf .next

# Limpiar cache de node_modules
echo "3. Eliminando cache de node_modules..."
rm -rf node_modules/.cache

# Verificar que dibulla-map-client.tsx no exista
if [ -f "components/presentation/dibulla-map-client.tsx" ]; then
    echo "⚠️  Eliminando archivo obsoleto dibulla-map-client.tsx..."
    rm -f components/presentation/dibulla-map-client.tsx
fi

echo ""
echo "✅ Cache limpiado exitosamente"
echo ""
echo "🚀 Para iniciar el servidor, ejecuta:"
echo "   pnpm dev"
echo ""
echo "💡 En el navegador:"
echo "   1. Abre en modo incógnito (Ctrl+Shift+N)"
echo "   2. O haz hard refresh (Ctrl+Shift+R)"
echo "   3. Navega a http://localhost:3000"
echo ""
