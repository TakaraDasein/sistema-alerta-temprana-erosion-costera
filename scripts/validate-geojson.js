#!/usr/bin/env node

/**
 * Script de validación de GeoJSON para erosión costera
 * Valida estructura, coordenadas y coherencia de datos
 */

const fs = require('fs');
const path = require('path');

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Límites geográficos de Dibulla
const DIBULLA_BOUNDS = {
  minLon: -73.45,
  maxLon: -73.29,
  minLat: 11.22,
  maxLat: 11.33
};

/**
 * Valida estructura básica de GeoJSON
 */
function validateGeoJSONStructure(data, filename) {
  const errors = [];
  const warnings = [];

  // Verificar tipo
  if (!data.type) {
    errors.push('Falta propiedad "type"');
  } else if (data.type !== 'FeatureCollection' && data.type !== 'Feature') {
    errors.push(`Tipo "${data.type}" no es válido. Debe ser "FeatureCollection" o "Feature"`);
  }

  // Si es Feature, debería ser FeatureCollection
  if (data.type === 'Feature') {
    warnings.push('El archivo contiene un Feature simple. Se recomienda FeatureCollection para compatibilidad');
  }

  // Validar features
  const features = data.type === 'FeatureCollection' ? data.features : [data];
  
  features.forEach((feature, index) => {
    if (!feature.type || feature.type !== 'Feature') {
      errors.push(`Feature ${index}: tipo inválido o ausente`);
    }
    if (!feature.geometry) {
      errors.push(`Feature ${index}: falta geometría`);
    }
    if (!feature.properties) {
      warnings.push(`Feature ${index}: falta objeto properties`);
    }
  });

  return { errors, warnings };
}

/**
 * Valida formato de coordenadas [lon, lat]
 */
function validateCoordinates(data) {
  const errors = [];
  const warnings = [];
  const features = data.type === 'FeatureCollection' ? data.features : [data];

  features.forEach((feature, index) => {
    const { geometry } = feature;
    if (!geometry || !geometry.coordinates) return;

    let coords = [];
    if (geometry.type === 'Point') {
      coords = [geometry.coordinates];
    } else if (geometry.type === 'Polygon') {
      coords = geometry.coordinates[0];
    }

    coords.forEach((coord, i) => {
      const [lon, lat] = coord;

      // Verificar que lon esté en rango -180 a 180
      if (lon < -180 || lon > 180) {
        errors.push(`Feature ${index}, coord ${i}: longitud ${lon} fuera de rango`);
      }

      // Verificar que lat esté en rango -90 a 90
      if (lat < -90 || lat > 90) {
        errors.push(`Feature ${index}, coord ${i}: latitud ${lat} fuera de rango`);
      }

      // Verificar si las coordenadas podrían estar invertidas
      if (lon > -90 && lon < 90 && (lat < -90 || lat > 90)) {
        errors.push(`Feature ${index}, coord ${i}: coordenadas posiblemente invertidas ([lat, lon] en vez de [lon, lat])`);
      }

      // Verificar si está dentro de Dibulla
      if (geometry.type === 'Point') {
        if (lon < DIBULLA_BOUNDS.minLon || lon > DIBULLA_BOUNDS.maxLon ||
            lat < DIBULLA_BOUNDS.minLat || lat > DIBULLA_BOUNDS.maxLat) {
          warnings.push(`Feature ${index}: punto [${lon}, ${lat}] fuera de límites esperados de Dibulla`);
        }
      }
    });
  });

  return { errors, warnings };
}

/**
 * Valida coherencia de datos de erosión
 */
function validateErosionData(data) {
  const errors = [];
  const warnings = [];
  const features = data.type === 'FeatureCollection' ? data.features : [data];

  features.forEach((feature, index) => {
    const { properties } = feature;
    if (!properties) return;

    const { tasaErosion, retroceso30anos, nivel, poblacionAfectada } = properties;

    // Validar coherencia matemática: retroceso30anos ≈ |tasaErosion| × 30
    if (tasaErosion && retroceso30anos) {
      const esperado = Math.abs(tasaErosion) * 30;
      const tolerancia = 5; // 5 metros de tolerancia
      
      if (Math.abs(retroceso30anos - esperado) > tolerancia) {
        warnings.push(
          `Feature ${index} (${properties.nombre}): ` +
          `retroceso30anos=${retroceso30anos}m no coincide con tasaErosion=${tasaErosion}m/año × 30 = ${esperado.toFixed(1)}m`
        );
      }
    }

    // Validar coherencia de nivel de riesgo
    if (nivel && tasaErosion) {
      const erosionAbs = Math.abs(tasaErosion);
      
      if (nivel === 'crítico' && erosionAbs < 4.0) {
        warnings.push(
          `Feature ${index} (${properties.nombre}): ` +
          `nivel "crítico" con tasa ${erosionAbs}m/año (esperado ≥ 4.0)`
        );
      } else if (nivel === 'alto' && (erosionAbs < 3.0 || erosionAbs >= 4.0)) {
        warnings.push(
          `Feature ${index} (${properties.nombre}): ` +
          `nivel "alto" con tasa ${erosionAbs}m/año (esperado 3.0-3.9)`
        );
      } else if (nivel === 'medio' && erosionAbs >= 3.0) {
        warnings.push(
          `Feature ${index} (${properties.nombre}): ` +
          `nivel "medio" con tasa ${erosionAbs}m/año (esperado < 3.0)`
        );
      }
    }

    // Validar población afectada
    if (poblacionAfectada && (poblacionAfectada < 0 || poblacionAfectada > 10000)) {
      warnings.push(
        `Feature ${index} (${properties.nombre}): ` +
        `poblacionAfectada=${poblacionAfectada} parece inusual`
      );
    }
  });

  return { errors, warnings };
}

/**
 * Valida un archivo GeoJSON completo
 */
function validateFile(filepath) {
  log(`\n${'='.repeat(70)}`, 'cyan');
  log(`Validando: ${path.basename(filepath)}`, 'cyan');
  log('='.repeat(70), 'cyan');

  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const data = JSON.parse(content);

    let allErrors = [];
    let allWarnings = [];

    // 1. Validar estructura
    log('\n1. Validando estructura GeoJSON...', 'blue');
    const structureResult = validateGeoJSONStructure(data, filepath);
    allErrors = allErrors.concat(structureResult.errors);
    allWarnings = allWarnings.concat(structureResult.warnings);

    // 2. Validar coordenadas
    log('2. Validando coordenadas...', 'blue');
    const coordsResult = validateCoordinates(data);
    allErrors = allErrors.concat(coordsResult.errors);
    allWarnings = allWarnings.concat(coordsResult.warnings);

    // 3. Validar datos de erosión (solo si aplica)
    if (filepath.includes('puntos-criticos')) {
      log('3. Validando coherencia de datos de erosión...', 'blue');
      const erosionResult = validateErosionData(data);
      allErrors = allErrors.concat(erosionResult.errors);
      allWarnings = allWarnings.concat(erosionResult.warnings);
    }

    // Mostrar resultados
    log('\n' + '─'.repeat(70), 'cyan');
    log('RESULTADOS:', 'cyan');
    log('─'.repeat(70), 'cyan');

    if (allErrors.length === 0 && allWarnings.length === 0) {
      log('✓ Validación exitosa. No se encontraron errores ni advertencias.', 'green');
    } else {
      if (allErrors.length > 0) {
        log(`\n✗ ERRORES (${allErrors.length}):`, 'red');
        allErrors.forEach(err => log(`  • ${err}`, 'red'));
      }

      if (allWarnings.length > 0) {
        log(`\n⚠ ADVERTENCIAS (${allWarnings.length}):`, 'yellow');
        allWarnings.forEach(warn => log(`  • ${warn}`, 'yellow'));
      }
    }

    // Estadísticas
    const features = data.type === 'FeatureCollection' ? data.features : [data];
    log(`\nEstadísticas:`, 'cyan');
    log(`  • Tipo: ${data.type}`, 'cyan');
    log(`  • Features: ${features.length}`, 'cyan');
    
    if (filepath.includes('puntos-criticos')) {
      const criticos = features.filter(f => f.properties.nivel === 'crítico').length;
      const altos = features.filter(f => f.properties.nivel === 'alto').length;
      const medios = features.filter(f => f.properties.nivel === 'medio').length;
      const poblacionTotal = features.reduce((sum, f) => sum + (f.properties.poblacionAfectada || 0), 0);
      
      log(`  • Puntos críticos: ${criticos}`, 'cyan');
      log(`  • Puntos alto riesgo: ${altos}`, 'cyan');
      log(`  • Puntos medio riesgo: ${medios}`, 'cyan');
      log(`  • Población total afectada: ${poblacionTotal}`, 'cyan');
    }

    return allErrors.length === 0;

  } catch (error) {
    log(`\n✗ ERROR: ${error.message}`, 'red');
    return false;
  }
}

// Ejecutar validación
const geojsonDir = path.join(__dirname, '..', 'public', 'geojson');
const files = [
  'puntos-criticos-dibulla.json',
  'municipio-dibulla.json'
];

log('\n╔════════════════════════════════════════════════════════════════════╗', 'cyan');
log('║     VALIDADOR DE GEOJSON - EROSIÓN COSTERA DIBULLA                ║', 'cyan');
log('╚════════════════════════════════════════════════════════════════════╝', 'cyan');

let allPassed = true;
files.forEach(file => {
  const filepath = path.join(geojsonDir, file);
  if (fs.existsSync(filepath)) {
    const passed = validateFile(filepath);
    allPassed = allPassed && passed;
  } else {
    log(`\n⚠ Archivo no encontrado: ${file}`, 'yellow');
  }
});

log('\n' + '═'.repeat(70), 'cyan');
if (allPassed) {
  log('✓ VALIDACIÓN COMPLETA: Todos los archivos son válidos', 'green');
  process.exit(0);
} else {
  log('✗ VALIDACIÓN COMPLETA: Se encontraron errores en uno o más archivos', 'red');
  process.exit(1);
}
