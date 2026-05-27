Plantilla del Documento de Propuesta
ESPECIFICACIONES GENERALES
Aspecto	Especificación
Extensión máxima	15 páginas (sin portada ni anexos)
Formato de entrega	PDF únicamente
Tamaño de página	Carta (21.59 × 27.94 cm)
Márgenes	2.5 cm en todos los lados
Tipografía cuerpo	Arial, Calibri o Times New Roman, 11-12 pts
Interlineado	1.15 o 1.5
Numeración de páginas	Obligatoria, esquina inferior derecha
Idioma	Español



ESTRUCTURA DEL DOCUMENTO
PORTADA (no cuenta en el límite de páginas)
La portada debe incluir la siguiente información:
Campo	Obligatorio
Logo del evento (si se proporciona)	Opcional
Título: “Propuesta de Sistema de Alerta Temprana de Bajo Costo”	Sí
Nombre de la propuesta (título creativo del SAT propuesto)	Sí
Problemática asignada (Remoción en masa / Inundaciones / Erosión costera)	Sí
Nombre del equipo	Sí
Integrantes (ver detalle abajo)	Sí
Correo electrónico de contacto del equipo	Sí
Fecha de entrega	Sí
Información de cada integrante:
	Nombre completo
	Universidad
	Programa académico
	Semestre actual o “Egresado(a) - [mes/año de grado]”


SECCIÓN 1: RESUMEN EJECUTIVO
Extensión: Máximo 1 página
Propósito
Presentar una síntesis completa de la propuesta que permita al evaluador comprender la solución sin necesidad de leer el documento completo.
Contenido obligatorio
1.1 Problemática abordada (1-2 oraciones)
	Identificar la problemática asignada
	Breve mención del contexto territorial de referencia
1.2 Descripción de la solución (3-4 oraciones)
	Explicación general de cómo funciona el SAT propuesto
	Principales componentes del sistema
1.3 Tecnologías principales
	Lista de las tecnologías clave seleccionadas (sensores, comunicación, alerta)
1.4 Costo total estimado
	Costo de implementación
	Costo de operación anual
1.5 Población objetivo y territorio de referencia
	Tipo de comunidad(es) beneficiaria(s)
	Región, departamento o municipio de referencia (puede ser genérico)
1.6 Elemento diferenciador
	¿Qué hace única o innovadora esta propuesta?
Recomendaciones
	Redactar el resumen ejecutivo al final, una vez completado el documento
	Usar lenguaje claro y directo
	Evitar tecnicismos innecesarios
	No incluir información que no esté desarrollada en el documento


SECCIÓN 2: ANÁLISIS DE LA PROBLEMÁTICA
Extensión: 2-3 páginas
Propósito
Demostrar comprensión profunda del fenómeno y su contexto en Colombia, evidenciando que la solución propuesta responde a necesidades reales.
Contenido obligatorio
2.1 Caracterización del fenómeno (0.5-1 página)
Describir técnicamente el fenómeno asignado:
	Definición y tipos del fenómeno
	Causas principales y factores detonantes
	Dinámica temporal (velocidad de desarrollo, estacionalidad)
	Variables críticas que permiten anticipar o detectar el evento
	Señales precursoras que podrían monitorearse
2.2 Contexto colombiano (1 página)
Caracterizar la problemática en el país:
	Regiones o territorios más afectados (departamentos, municipios, cuencas)
	Datos de eventos históricos relevantes (frecuencia, afectación, pérdidas)
	Condiciones que agravan la vulnerabilidad
	Marco institucional: rol del SNGRD, UNGRD, entidades territoriales, comunidades
	Estado actual de los SAT existentes para esta problemática en Colombia
	Brechas o necesidades identificadas
2.3 Comunidades objetivo (0.5-1 página)
Caracterizar las comunidades que serían beneficiarias del SAT:
	Tipo de comunidades en riesgo (urbanas, rurales, costeras, ribereñas, de ladera)
	Condiciones de conectividad (cobertura celular, internet)
	Acceso a energía eléctrica
	Infraestructura disponible
	Características poblacionales relevantes:
o	Presencia de comunidades étnicas (NARP, indígenas)
o	Personas con discapacidad
o	Adultos mayores
o	Niveles de alfabetización
	Organización comunitaria existente (JAC, consejos comunitarios, otros)
Recomendaciones
	Usar fuentes oficiales y académicas (citar apropiadamente)
	Incluir datos cuantitativos cuando sea posible
	Ser específico sobre el contexto colombiano (evitar descripciones genéricas)
	Conectar el análisis con las decisiones de diseño del SAT


SECCIÓN 3: PROPUESTA TÉCNICA DEL SAT
Extensión: 3-4 páginas
Propósito
Describir en detalle la solución propuesta, justificando las decisiones técnicas y demostrando viabilidad.
Contenido obligatorio
3.1 Arquitectura general del sistema (0.5 página)
Presentar visión integral del SAT:
	Diagrama de componentes (monitoreo → procesamiento → decisión → alerta → respuesta)
	Flujo de información desde la detección hasta la comunicación a la comunidad
	Descripción general de cómo interactúan los componentes
Incluir diagrama o esquema visual obligatorio
3.2 Componente de monitoreo y sensores (1 página)
Especificar las tecnologías de detección:
Aspecto	Descripción requerida
Tipo de sensor(es)	Tecnología específica (ej: pluviómetro de balancín, sensor ultrasónico de nivel, acelerómetro MEMS)
Marca/modelo referencial	Ejemplo comercial o DIY con especificaciones
Variables monitoreadas	Qué mide cada sensor
Rango y precisión	Especificaciones técnicas básicas
Umbrales de activación	Valores que disparan alertas (si aplica)
Justificación	Por qué se seleccionó esta tecnología frente a alternativas
Fuente de energía:
	Tipo (solar, baterías, red eléctrica, híbrido)
	Autonomía esperada
	Consideraciones de mantenimiento
3.3 Componente de procesamiento y transmisión (0.75 página)
Especificar cómo se transmiten y procesan los datos:
Aspecto	Descripción requerida
Tecnología de transmisión	LoRa, GSM/GPRS, satelital, WiFi, radio, otra
Cobertura y alcance	Distancias, topografía, limitaciones
Procesamiento	Local (edge computing) vs centralizado (nube/servidor)
Plataforma de recepción	Software o sistema para recibir y analizar datos
Protocolo de activación	Automático, semiautomático (requiere validación), manual
Frecuencia de transmisión	Cada cuánto se envían datos
3.4 Componente de alerta (0.75 página)
Especificar cómo se comunica la alerta a la comunidad:
Aspecto	Descripción requerida
Dispositivos de alerta	Sirenas, luces, megáfonos, SMS, radio comunitaria, app, WhatsApp, otros
Canal primario	Principal medio de difusión
Canal secundario	Respaldo en caso de falla del primario
Cobertura	Cómo se asegura que llegue a toda la población en riesgo
Tiempo de respuesta	Tiempo estimado desde detección hasta emisión de alerta
3.5 Elementos innovadores (0.5 página)
Destacar los aspectos diferenciadores de la propuesta:
	¿Qué hace diferente este SAT de soluciones convencionales?
	Adaptaciones creativas al contexto colombiano
	Uso de recursos locales o materiales de bajo costo
	Enfoques no tradicionales o combinaciones novedosas
	Aprovechamiento de infraestructura o capacidades existentes
Recomendaciones
	Ser específico en las tecnologías (evitar generalidades como “sensores de bajo costo”)
	Incluir referencias de precios o fuentes de adquisición
	Justificar cada decisión técnica
	Considerar las condiciones del contexto colombiano
	Usar diagramas, tablas y esquemas para mayor claridad


SECCIÓN 4: ESTRATEGIA DE COMUNICACIÓN COMUNITARIA
Extensión: 2 páginas
Propósito
Demostrar que el SAT no es solo tecnología, sino un sistema sociotécnico que requiere apropiación comunitaria para ser efectivo.
Contenido obligatorio
4.1 Canales de comunicación (0.5 página)
Detallar cómo llega la alerta a diferentes grupos:
Canal	Población objetivo	Ventajas	Limitaciones
Principal			
Secundario			
Terciario (si aplica)			
Accesibilidad:
	Adaptaciones para personas con discapacidad visual
	Adaptaciones para personas con discapacidad auditiva
	Consideraciones para adultos mayores
	Estrategia para población analfabeta
	Consideraciones de idioma (si hay comunidades indígenas)
4.2 Roles comunitarios (0.5 página)
Definir la estructura humana del SAT:
Rol	Responsabilidades	Perfil sugerido	Cantidad estimada
Operador del SAT			
Vigía comunitario			
Líder de evacuación			
Otros			
Capacitación requerida:
	Temas de formación para cada rol
	Duración estimada de capacitación
	Frecuencia de actualización
Articulación institucional:
	Rol del Consejo Municipal de Gestión del Riesgo (CMGRD)
	Coordinación con organismos de socorro
	Comunicación con UNGRD territorial
4.3 Protocolo de respuesta (0.5 página)
Definir qué debe hacer la comunidad al recibir la alerta:
Niveles de alerta propuestos:
Nivel	Significado	Mensaje tipo	Acción esperada
Verde/Normal			
Amarillo/Preparación			
Naranja/Alerta			
Rojo/Alarma			
Consideraciones:
	Tiempo disponible para evacuación según tipo de evento
	Puntos de encuentro
	Rutas de evacuación
	Verificación de que la alerta fue recibida
4.4 Apropiación social (0.5 página)
Estrategia para que la comunidad confíe y use el sistema:
	Participación comunitaria en diseño, instalación o mantenimiento
	Socialización y sensibilización inicial
	Simulacros periódicos (frecuencia sugerida)
	Retroalimentación de la comunidad
	Integración con conocimientos locales y tradicionales
	Estrategia para mantener el interés a largo plazo
Recomendaciones
	Considerar la diversidad de la población
	Ser realista sobre las capacidades comunitarias
	Integrar la comunicación del riesgo, no solo la alerta
	Pensar en el sistema completo: antes, durante y después del evento


SECCIÓN 5: PRESUPUESTO Y VIABILIDAD ECONÓMICA
Extensión: 2 páginas
Propósito
Demostrar que la propuesta es genuinamente de bajo costo, con presupuesto realista, detallado y sostenible.
Contenido obligatorio
5.1 Presupuesto de implementación (0.75 página)
Tabla detallada de costos de instalación inicial:
Componente	Descripción	Cantidad	Costo unitario (COP)	Costo total (COP)	Fuente del precio
Sensores					
[Sensor 1]					
[Sensor 2]					
Comunicación					
[Dispositivo TX]					
[Gateway/receptor]					
Energía					
[Panel solar]					
[Batería]					
Alerta					
[Sirena/dispositivo]					
Infraestructura					
[Postes, cajas, etc.]					
Instalación					
Mano de obra					
Transporte					
Capacitación					
Talleres comunitarios					
Materiales					
Otros					
Imprevistos (10%)					
TOTAL IMPLEMENTACIÓN				$XXX	
5.2 Presupuesto de operación anual (0.5 página)
Tabla de costos recurrentes:
Concepto	Frecuencia	Costo unitario (COP)	Costo anual (COP)	Notas
Mantenimiento preventivo				
Conectividad / datos				
Reposición de componentes				
Energía (si aplica)				
Capacitación de refuerzo				
Simulacros				
Administración				
TOTAL OPERACIÓN ANUAL			$XXX	
5.3 Análisis de viabilidad económica (0.75 página)
Comparación de costos:
	Referencia a costos de SAT similares existentes (si hay información disponible)
	Comparación con soluciones comerciales convencionales
Indicadores de costo-efectividad:
	Costo por persona protegida (población beneficiaria estimada)
	Costo por km² cubierto (si aplica)
	Costo vs. pérdidas evitadas potenciales (cualitativo)
Fuentes potenciales de financiamiento:
	Presupuesto municipal (Fondos de Gestión del Riesgo)
	Sistema General de Regalías (SGR)
	Cooperación internacional
	Fondos de adaptación al cambio climático
	Alianzas público-privadas
	Otros
Estrategia de sostenibilidad financiera:
	¿Quién asume los costos de operación a mediano y largo plazo?
	¿Cómo se garantiza el mantenimiento continuo?
	¿Qué pasa si se acaba el financiamiento inicial?
Recomendaciones
	Usar precios reales de mercado colombiano
	Citar fuentes de los precios (páginas web, cotizaciones, catálogos)
	No subestimar costos para parecer más competitivo
	Incluir imprevistos (mínimo 10%)
	Considerar costos ocultos (transporte, instalación, capacitación)
	Ser honesto sobre las limitaciones presupuestales


SECCIÓN 6: ESCALABILIDAD Y SOSTENIBILIDAD
Extensión: 1-2 páginas
Propósito
Analizar el potencial de la solución para ser replicada en otros contextos y sostenida en el tiempo.
Contenido obligatorio
6.1 Replicabilidad (0.5 página)
Análisis de potencial de réplica:
Territorios potenciales:
	¿En qué otros departamentos/regiones de Colombia podría implementarse?
	¿Para qué tipo de comunidades es más apropiado?
Factores críticos para replicar:
	Condiciones mínimas requeridas (conectividad, energía, organización comunitaria)
	Adaptaciones necesarias según contexto territorial
	Elementos que permanecen iguales vs. elementos que deben ajustarse
Matriz de replicabilidad:
Factor	Indispensable	Deseable	Adaptable
Conectividad celular			
Energía eléctrica			
Organización comunitaria			
Capacidad técnica local			
[Otros]			
6.2 Escalabilidad (0.5 página)
Análisis de crecimiento del sistema:
	¿Cómo se amplía la cobertura? (más sensores, más comunidades)
	¿El diseño es modular? ¿Se pueden agregar componentes?
	¿Hay economías de escala? (¿baja el costo unitario al aumentar cobertura?)
	¿Cuántas comunidades/personas podrían cubrirse con el mismo centro de monitoreo?
Limitaciones para escalar:
	Cuellos de botella técnicos
	Restricciones de cobertura de comunicaciones
	Capacidad de procesamiento
	Otras limitaciones identificadas
6.3 Sostenibilidad técnica (0.5 página)
Análisis de durabilidad y mantenimiento:
Componente	Vida útil estimada	Disponibilidad de repuestos en Colombia	Complejidad de mantenimiento
		Alta / Media / Baja	Alta / Media / Baja
			
Transferencia de conocimiento:
	¿Qué capacidades técnicas se requieren localmente?
	¿Es posible formar técnicos locales para el mantenimiento?
	¿Hay dependencia de proveedores externos?
6.4 Riesgos y mitigación (0.5 página)
Identificar principales riesgos:
Riesgo	Probabilidad	Impacto	Estrategia de mitigación
[Técnico]	Alta/Media/Baja	Alto/Medio/Bajo	
[Financiero]			
[Social/comunitario]			
[Institucional]			
[Ambiental]			
Recomendaciones
	Ser honesto sobre las limitaciones
	Identificar claramente qué es escalable y qué no
	Pensar en el largo plazo (5-10 años)
	Considerar cambios en el contexto (tecnológicos, climáticos, institucionales)


SECCIÓN 7: CONCLUSIONES
Extensión: Máximo 0.5 páginas
Contenido sugerido
Síntesis de la propuesta:
	Resumen en 2-3 oraciones de la solución propuesta
Principales fortalezas:
	3-4 puntos fuertes de la propuesta
Limitaciones reconocidas:
	2-3 aspectos que podrían mejorarse o que presentan desafíos
Recomendaciones para implementación:
	Pasos sugeridos si se quisiera llevar la propuesta a la realidad
	Estudios o validaciones adicionales necesarias


SECCIÓN 8: REFERENCIAS
Extensión: no evaluada
Requisitos
	Mínimo 5 referencias de calidad
	Formato consistente (APA 7ª edición, IEEE, o cualquier formato académico reconocido)
	Todas las afirmaciones importantes del documento deben tener respaldo
Tipos de fuentes recomendadas
Tipo	Ejemplos
Fuentes oficiales	UNGRD, IDEAM, SGC, MinAmbiente, DANE
Académicas	Artículos de revistas científicas, tesis, libros
Técnicas	Manuales de fabricantes, fichas técnicas, estándares
Internacionales	UNDRR, UNESCO, OMM, documentos de SAT de otros países
Normativas	Leyes, decretos, políticas públicas colombianas
Nota sobre fuentes de precios
Las fuentes de los precios del presupuesto deben indicarse en la tabla correspondiente (Sección 5), pero también pueden listarse aquí si se prefiere consolidar todas las referencias.


ANEXOS (opcional, no cuenta en el límite de páginas)
Los anexos pueden incluir material complementario que enriquezca la propuesta pero que no es indispensable para su comprensión:
	Declaracion de uso de IA generativa, indicando en que sección se uso y que tanto intervinio, indicar modelo y versión, en cuanto a tecnologías impulsadas por IA (Grammarly, etc.) indicar que uso se le dio.
	Diagramas técnicos ampliados o detallados
	Fichas técnicas completas de componentes propuestos
	Tablas de datos complementarias
	Mapas de territorios de referencia
	Fotografías de contexto
	Cálculos detallados
	Mockups de interfaces (si aplica)
	Cotizaciones o capturas de precios
Nota: Los evaluadores no están obligados a revisar los anexos. Toda la información esencial debe estar en el cuerpo del documento.


LISTA DE VERIFICACIÓN ANTES DE ENTREGAR
Antes de enviar su propuesta, verifique que:
Ítem	✓
La portada incluye toda la información requerida	☐
El documento tiene máximo 15 páginas (sin portada ni anexos)	☐
Todas las secciones obligatorias están incluidas	☐
El documento está en formato PDF	☐
La problemática abordada corresponde a la asignada	☐
Se incluyen diagramas/esquemas del sistema	☐
El presupuesto está completo y detallado	☐
Se citan las fuentes de los precios	☐
Hay mínimo 5 referencias bibliográficas	☐
Las citas y referencias tienen formato consistente	☐
Se revisó ortografía y gramática	☐
Las páginas están numeradas	☐
Se hizo la declaración del uso de IA	☐
Todos los integrantes del equipo revisaron el documento final	☐

