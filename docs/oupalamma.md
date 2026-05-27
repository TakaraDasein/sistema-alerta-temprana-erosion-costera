HACKATHON UNGRD · PNUD · COLOMBIA 2026
Propuesta de Sistema de Alerta Temprana (SAT) de Bajo Costo
«Vigía del territorio frente al mar» — En lengua wayuunaiki
Reto asignado: Erosión Costera
Territorio de referencia: Municipio de Dibulla, La Guajira
Equipo: O'upalaMma (participación individual)
Integrante: Álvaro Efrén Bolaños Scalante
Universidad: Universidad del Cauca
Programa académico: Ciencia Política
Estado: Egresado — junio de 2025
Correo de contacto: efren.dataviz@gmail.co
Palabras clave: Sistema de Alerta Temprana, erosión costera, LoRa Meshtastic, IoT comunitario,
gestión del riesgo, Dibulla La Guajira, wayuunaiki
11. RESUMEN EJECUTIVO
1.1 Problemática abordada
La erosión costera amenaza los asentamientos y ecosistemas del municipio de Dibulla (La Guajira), con
retrocesos documentados de hasta 175 m en la línea de costa de Palomino entre 1985 y 2020, con tasas de
perdida anuales sostenidas de 3 a 5 m/año, Sin que el municipio cuente con un sistema de alerta temprana
comunitario que opere en condiciones reales de baja conectividad y alta vulnerabilidad étnica.(INVEMAR,
2008; MinAmbiente, 2021).
1.2 Descripción de la solución
O'upalaMma es un SAT comunitario de bajo costo diseñado para operar sin internet en entornos con
conectividad intermitente. Integra una red de sensores ambientales con transmisión LoRa en malla,
procesamiento local en gateway, validación satelital con Sentinel-2 y un protocolo de alerta multicanal en
español y wayuunaiki. Perfecto para una gestión integral del riesgo por erosión costera a corto y largo plazo.
1.3 Tecnologías principales
Monitoreo: Mini estación meteorológica ultrasónica RS485 (viento, lluvia, temperatura, humedad,
presión); sensor de nivel de agua JSN-SR04T IP67; sensor de vibración 801S; sensor de humedad de suelo
SEN0193; GPS integrado en Heltec V4.3 Comunicación: Red malla LoRa Meshtastic 902-928 MHz;
microcontrolador Heltec V4.3 (ESP32-S3R2) LoRa 32 Procesamiento: Gateway Raspberry Pi 4 con stack
contenerizado Docker (Mosquitto · Node-RED · InfluxDB · Grafana); visualización pública de telemetría
vía Grafana Cloud free tier; análisis satelital de línea de costa vía Google Earth Engine App (ambos
gratuitos) Validación satelital: Sentinel-2 + Google Earth Engine con MNDWI y umbralización de Otsu
Alerta: Sirena 120 dB IP65, WhatsApp, Nodos Lora, radio comunitaria, vocería de vigías
1.4 Costo total estimado
 Implementación piloto (1 nodo sensor + 1 gateway): COP $3.464.189 (incluye imprevistos del 10%)
 Operación anual: COP $1.840.000 visualización pública vía Grafana Cloud free tier y Google Earth
Engine App (ambos gratuitos); la red LoRa opera sin SIM ni planes de datos.
1.5 Población objetivo y territorio
El municipio de Dibulla alberga 47.487 habitantes, entre las comunidades asentadas en la franja costera hay
indígenas Wayuu, comunidades Wiwa, Arhuaco, población campesina mestiza y comunidades
afrodescendientes (DANE, 2025).
1.6 Elemento diferenciador
O'upalaMma es la semilla de una infraestructura comunitaria autogestionada que puede crecer
orgánicamente sin infraestructura centralizada ni costos recurrentes de conectividad otorga autonomía y
soberanía comunitaria en eventos críticos. Al ser bilingüe y 100% open source permite replicarlo en los
puntos críticos de erosión costera. Cualquiera con un Dispositivo LoRa puede integrarse a la malla
robustecer y recibir la alertas y reportes por la banda 915 MHz (Resolución ANE 711/2016).
22. ANÁLISIS DE LA PROBLEMÁTICA
2.1 Caracterización del fenómeno
La erosión costera no puede entenderse de forma aislada: es una expresión territorial de la policrisis o triple
crisis planetaria —la convergencia y amplificación mutua del cambio climático, la pérdida de biodiversidad
y la contaminación—, reconocida por el Programa de las Naciones Unidas para el Medio Ambiente
(PNUMA, 2021) como la mayor amenaza ambiental del siglo XXI para las comunidades más vulnerables
del planeta. En la franja costera colombiana, las tres crisis actúan de forma simultánea: el cambio climático
eleva el nivel del mar y amplifica la energía del oleaje; la pérdida de manglares elimina la barrera biológica
que estabiliza la línea de costa; y la contaminación degrada los ecosistemas que amortiguaban la acción
erosiva. La erosión costera es el retroceso persistente de la línea de costa generado por un balance
sedimentario negativo entre el aporte y la remoción de material (Boak & Turner, 2005). No es un evento
puntual sino un proceso continuo con episodios de aceleración durante tormentas, mareas de leva y eventos
climáticos extremos. En el Caribe colombiano, el proceso se intensifica por la combinación de cuatro
factores: oleaje del noreste (alisios), ascenso del nivel medio del mar, déficit sedimentario por represamiento
fluvial y transformación de dunas y manglares por presión urbanística y turística. La pérdida de manglar es
especialmente crítica: estos ecosistemas actúan como barrera biológica natural que disipa la energía del
oleaje y estabiliza la línea de costa.
Variables críticas monitoreables con los sensores del sistema:
Figura 1. Variables críticas monitoreables y tecnologías asociadas. Fuente: elaboración propia (2026).
El sistema monitorea siete variables precursoras de erosión e inundación costera. La estación RS485 registra
presión atmosférica (caída >4 hPa en 6 h indica sistema de baja presión entrante), viento (>15 m/s sostenido
del NE señala oleaje creciente), precipitación intensa (correlacionada con saturación de cuencas altas) y
temperatura/humedad relativa (calibración y correlación estadística). El sensor de nivel de agua detecta
elevaciones >0,4 m sobre la línea base local de las seis horas previas, umbral indicativo de sobreelevación
costera. La sonda de humedad del suelo identifica saturación >30 % en taludes, condición de alto riesgo de
deslizamiento. El sensor de vibración registra impactos mecánicos en el nodo que reflejan la intensidad de
la acción física del del terreno sobre la estructura.
32.2 Contexto colombiano
Colombia tiene más de 3.500 km de costa y más de 86 puntos críticos de erosión costera identificados por
INVEMAR (2024), con tasas de retroceso de 1,4 a 5,0 m/año en Dibulla. Agravado por la perdida de
ecosistemas como los Manglares, principal defensor biológico de la erosión costera. Los departamentos
más afectados son La Guajira, Magdalena, Atlántico, Bolívar, Sucre, Córdoba, Antioquia y el archipiélago
de San Andrés. La Guajira concentra 674,9 km de costa caribeña, la más extensa del país. El municipio de
Dibulla, en transición geomorfológica entre la Sierra Nevada de Santa Marta y la llanura wayúu, exhibe los
retrocesos más severos del Caribe continental. (INVEMAR, 2008; MinAmbiente, 2021). Las proyecciones
climáticas del IPCC (2021) para el Caribe estiman un ascenso del nivel medio del mar de 0,3 a 1,0 m hacia
finales del siglo XXI bajo escenarios de emisiones intermedias y altas, lo que incrementará la frecuencia e
intensidad de los episodios de inundación costera aguda sobre comunidades ya expuestas.
Marco institucional:
La Ley 1523 de 2012 obliga a los municipios colombianos a incorporar sistemas de alerta temprana en sus
planes territoriales de gestión del riesgo; en la práctica, la gran mayoría de los municipios costeros carece
de esa capacidad a escala local. El SNGRD coordina con IDEAM, DIMAR, INVEMAR y Corpoguajira el
monitoreo costero nacional, que es predominantemente multitemporal — imágenes satelitales y campañas
periódicas de campo— sin capacidad de alerta en tiempo oportuno a escala comunitaria. El Plan Maestro
de Erosión Costera (MinAmbiente, 2016) identifica esta brecha y llama a desarrollar instrumentos de alerta
adaptados a los territorios; la iniciativa "Early Warning for All" de UNDRR (2022) señala la misma carencia
en países en desarrollo: comunidades costeras vulnerables sin cobertura de alertas de última milla. Esta
brecha es especialmente crítica en municipios como Dibulla, donde la combinación de alta exposición
física, conectividad intermitente, comunidades étnicas y limitada capacidad institucional local exige
soluciones diseñadas desde y para el territorio.
2.3 Comunidades objetivo
Caracterización de Dibulla:
 Composición étnica y social: Composición étnica y social: comunidad mixta de pueblos wayuu,
comunidades afrodescendientes y población campesina (DANE, 2018). El municipio registra autoridades
tradicionales wayuu —los palabreros (Pütchipü'üi)—, reconocidos por el Estado colombiano como figuras
legítimas de justicia propia y de resolución de conflictos, y declarados Patrimonio Cultural Inmaterial de
la Humanidad por la UNESCO (2010). La erosión costera afecta directamente la identidad y soberanía
territorial de estas comunidades: en el caso documentado de La Cachaca III, 42 familias wayúu han visto
destruidos por el avance del mar sus sistemas de agua (albercas), cementerios ancestrales y tierras de
cultivo, con pérdida del chipi chipi —molusco de recolección tradicional— que constituía parte de su
soberanía alimentaria (Vorágine, 2024).
 Actividad económica: turismo (hotelería, posadas, operadores de deportes acuáticos), pesca artesanal y
agricultura de subsistencia (DANE, 2018). El sector turístico concentra usuarios estacionales en las playas
y tiene interés directo en sistemas de alerta.
 Conectividad: cobertura celular variable —4G en la cabecera del corregimiento, sin señal en zonas
rurales alejadas— con acceso a internet limitado fuera del casco (DANE & MinTIC, 2025).
4 Energía: red eléctrica con cortes frecuentes; zonas rurales con soluciones solares individuales
 Organización social: red eléctrica con cortes frecuentes; zonas rurales con soluciones solares
individuales (DANE, 2018). En el plano institucional, la Corporación Autónoma Regional de La Guajira
(Corpoguajira) lidero la Mesa de Erosión Costera de La Guajira; en su décima sesión (2024) donde se
suscribió un acuerdo de voluntades interinstitucional para coordinar acciones de mitigación en el litoral
(Corpoguajira, 2024)
 Poblaciones de especial consideración: adultos mayores con acceso limitado a tecnología digital;
población con niveles variables de alfabetización; personas con discapacidad sensorial (DANE, 2018).
El Plan Maestro de Erosión Costera señala que las comunidades costeras —especialmente las indígenas
y afrodescendientes— presentan los niveles de vida más bajos del país y mayor exposición estructural a
la pérdida de territorio e infraestructura (MinAmbiente, 2016). La gravedad de la situación fue reconocida
formalmente cuando en 2020 la Alcaldía de Dibulla declaró urgencia manifiesta por las afectaciones de
erosión costera en Palomino (Alcaldía de Dibulla, 2020).
 Implicaciones para el diseño del SAT: Comunicación multicanal con respaldo analógico obligatorio
para operar sin internet. Mensajes bilingües español/wayuunaiki para superar barreras lingüísticas. - Roles
comunitarios definidos que garanticen operación autónoma y apropiación de largo plazo. - Articulación
con el sector turístico para la gestión de visitantes en zona de riesgo durante temporadas
altas.(MinAmbiente, 2016).
Figura 2. Puntos críticos de erosión costera. Fuente:Elaboración propia con base en INVEMAR (2024).
Este mapa georreferencia los seis puntos críticos de erosión costera identificados en el municipio de
Dibulla, con énfasis en el corregimiento de Palomino, donde se documentan las tasas de retroceso más
altas del litoral colombiano (hasta −5,63 m/año según INVEMAR 2024). La capa inferior muestra el
departamento de La Guajira en su totalidad; la capa media resalta el municipio de Dibulla; la capa superior
presenta los puntos críticos con información detallada sobre tasas de erosión, comunidades afectadas,
infraestructura en riesgo y referencias bibliográficas.
53. PROPUESTA TÉCNICA DEL SAT «O'UPALA MMA»
3.1 Arquitectura general del sistema
O'upalaMma se organiza en cinco capas interoperables que garantizan resiliencia ante fallas parciales. Cada
capa opera de manera autónoma pero se articula con las demás para producir alertas confiables.
Capa 1 — Monitoreo: El nodo sensor captura variables ambientales en tiempo real con una mini estación
meteorológica RS485 ultrasónica y sensores complementarios de nivel de agua, vibración y humedad de
suelo. Los datos se empaquetan en JSON con timestamp GPS.
Capa 2 — Comunicación: Los paquetes se transmiten mediante una red malla LoRa Meshtastic 902-928
MHz con topología store- and-forward y cifrado AES-128. La malla garantiza entrega de datos incluso sin
conectividad a internet.
Capa 3 — Procesamiento local: Un segundo Heltec V4.3 (con su propia antena LoRa 915MHz) actúa
como receptor gateway: recibe los paquetes del nodo in situ, puede activar la alarma local directamente
desde sus GPIO y reenvía los datos por USB al Raspberry Pi 4. El RPi4 almacena la telemetría en InfluxDB
y la visualiza en Grafana, todo dentro de contenedores Docker orquestados por Node-RED. El dashboard
de Grafana se publica con URL pública vía Grafana Cloud free tier para acceso institucional remoto.
Capa 4 — Validación satelital: Imágenes Sentinel-2 procesadas en Google Earth Engine con el índice
MNDWI y umbralización de Otsu permiten monitorear el desplazamiento de la línea de costa cada 5 días,
validando las alertas críticas de forma independiente al monitoreo in situ.
Capa 5 — Decisión y alerta: El CMGRD de Dibulla valida las alertas nivel Naranja y Rojo antes de su
difusión. Los canales primarios —todos operativos sin internet— son: sirena, notificaciones directas a
nodos LoRa de la comunidad, radio comunitaria y vocería de vigías; WhatsApp opera como canal
complementario cuando hay señal celular.
Arquitectura de Monitoreo & Alerta
Figura 3. Arquitectura de 5 capas del SAT O'upala Mma. Elaboración propia con base en UNDRR (2022)
y COI-UNESCO (2024).
63.2 Componente de monitoreo y sensores
Justificación de tecnologías de monitoreo
La propuesta O'upalaMma integra en el nodo sensor microcontrolador Heltec WiFi LoRa 32 V4.3 (ESP32-
S3R2 doble núcleo con radio LoRa SX1262 y GPS L76K integrado) que opera como cerebro del sistema,
capturando siete variables ambientales precursoras de erosión costera aguda: viento, lluvia, presión
atmosférica, temperatura, humedad relativa, nivel del agua y saturación del suelo. Con la mini estación
meteorológica ultrasónica RS485 all-in-one centraliza seis de estas variables en una única interfaz digital
de 0,2 W, eliminando las limitaciones de sensores mecánicos tradicionales, mediante tecnología ultrasónica
sin partes móviles expuestas, certificada para ambientes de niebla salina y comunicada mediante protocolo
RS485 Modbus RTU cuya arquitectura diferencial mitiga interferencia electromagnética (Modbus
Organization, 2012) No obstante, en caso de no contar con la mini estación integrada de bajo costo, el
sistema mantiene plena compatibilidad operativa con sensores unitarios como el BME280 (presión,
temperatura, humedad relativa;), el sensor de lluvia LM393 y un anemómetro RS485 individual (anexo
inventario), preservando la arquitectura de medición (anexo inventario). El JSN-SR04T IP67 detecta
ascensos súbitos del nivel del agua >0,4 m sobre la línea base local—umbral indicativo de sobreelevación
costera— (NOAA CO-OPS, 2021). El SEN0193 emplea tecnología esencial para monitorear saturación
hídrica >30% en taludes costeros, condición crítica de vulnerabilidad ante oleaje extremo (Chen et al.,
2018). El sensor de vibración 801S opera como indicador de contexto, registrando impactos mecánicos en
el nodo que correlacionan con la acción física del terreno durante episodios agudos. La arquitectura modular
garantiza que el sistema permanece operacional incluso al sustituir la estación integrada por sensores
individuales de menor costo, manteniendo la validez científica del monitoreo y la capacidad de alerta
temprana ante erosión costera extrema.
Tabla 1. Sensores, variables monitoreadas y justificación técnica Elaboración propia.
7Fuente de energía:
El sistema opera con energía solar como fuente principal y baterías de respaldo. El nodo sensor instalado
en el poste cuenta con un panel solar de 10W que recarga continuamente una batería recargable de 3000
mAh conectada directamente al microcontrolador Heltec V4.3, el cual tiene circuitos internos que protegen
la batería y regulan el voltaje a 3.3V para todos los componentes electrónicos. Un convertidor adicional
eleva el voltaje de la batería a 12V únicamente para alimentar la estación meteorológica, que requiere mayor
voltaje. Con este diseño, el nodo puede operar de forma indefinida bajo sol normal —La Guajira recibe
aproximadamente 5 horas de sol fuerte al día— y cuenta con 24 días de autonomía de respaldo si las
condiciones están completamente nubladas, tiempo más que suficiente considerando que incluso en
temporada de lluvias el sol reaparece antes de ese plazo. El gateway ubicado en la sede donde se establesca
estratégicamente se conecta a la red eléctrica convencional mediante la fuente de 5V incluida en el kit del
Raspberry Pi 4; el microcontrolador receptor LoRa se alimenta por USB desde el mismo Raspberry. La
sirena de alerta cuenta con su propia batería de respaldo de 12V con capacidad de 8800 mAh que le permite
sonar continuamente por 7 horas o permanecer en espera durante 14 horas; esta misma batería puede también
respaldar el Raspberry Pi mediante un pequeño regulador de voltaje adicional que convierte los 12V a los
5V que necesita, brindando aproximadamente 3-4 horas de operación a todo el gateway durante cortes de
luz. El mantenimiento energético es mínimo: limpiar el panel solar cada tres meses con un paño húmedo
para remover sal y polvo, revisar cada seis meses que la batería del nodo esté cargando correctamente, y
reemplazar las baterías cada 2-3 años cuando completen su ciclo de vida útil (aproximadamente 500-800
recargas).
3.3 Componente de procesamiento y transmisión
Tecnología de comunicación:
Red malla LoRa Meshtastic 915 MHz, banda ISM de uso libre en Colombia (Resolución ANE 711 de
2016), con topología store-and-forward y cifrado AES-128. Alcance efectivo: 8-12 km por salto en zona
costera con línea de vista. Los equipos Heltec V4.3 operan con EIRP de 28 dBm, dentro del límite
regulatorio de 30 dBm de la ANE.
Recepción comunitaria de alertas:
Cualquier persona puede adquirir un nodo Meshtastic compatible por ($149.300 COP), configurar el canal
O’upalaMma y recibir alertas, boletines y mensajes del SAT directamente en su dispositivo—sin internet,
sin SIM y sin ninguna suscripción— mientras el dispositivo esté dentro del alcance de la malla. Node-RED
publica cada alerta como mensaje broadcast al canal cifrado el Heltec gateway lo retransmite por LoRa a
toda la malla; la Meshtastic del receptor lo entrega como notificación push. Cada nuevo nodo comunitario
amplía el alcance territorial de la red mediante store-and-forward, convirtiendo a cada propietario en
repetidor pasivo de las alertas. (Espressif, 2024; Meshtastic Project, 2024).
Arquitectura de muestreo sinóptico adaptativo por estado de alerta:
El sistema opera en dos regímenes diferenciados: un régimen de vigilancia basado en horas sinópticas
estándar de la Organización Meteorológica Mundial (OMM, 2018) que maximiza el ahorro energético y
reduce el desgaste electroquímico de los sensores en ambiente marino; y un régimen de alerta activa con
intervalos progresivamente cortos alineados con el estándar mínimo de 6 minutos para monitoreo
operacional por NOAA CO-OPS (2021).
8Figura 4. Arquitectura de Muestreo del SAT O'upala Mma. Elaboración propia. En base a (OMM, 2018)
Justificación científica por modo: Los intervalos de muestreo siguen estándares internacionales
verificables: el modo Verde emplea las horas sinópticas OMM (01:00, 07:00, 13:00 y 19:00 UTC),
coordinadas globalmente para estaciones de superficie (OMM, 2018), con verificaciones intermedias cada
30 min sin transmisión LoRa, reduciendo el duty cycle a 4 transmisiones/día nominales y garantizando
comparabilidad con la red meteorológica nacional; el modo Amarillo adopta el intervalo de 6 min
establecido por NOAA CO-OPS como mínimo operacional para monitoreo de nivel de agua en sistemas de
alerta costera (NOAA CO-OPS, 2021), suficiente para capturar mareas de leva y storm surge; el modo
Naranja duplica esa resolución (3 min) para eventos en desarrollo activo con frentes de ola en aceleración;
y el modo Rojo aplica 1 min, resolución máxima compatible con el ciclo RS485 Modbus RTU y la
autonomía de batería, alineada con el mínimo para estaciones meteorológicas de superficie (OMM, 2018).
Regla de confirmación anti-falsos positivos (Verde → Amarillo):
La escalada automática de Verde a Amarillo requiere dos verificaciones intermedias consecutivas
(separadas 30 min) con umbral superado en cualquier sensor. Una única lectura no escala el estado.
Excepción: una interrupción del 801S cuenta como primera confirmación — si la verificación siguiente de
30 min confirma umbral en cualquier sensor variable, Node-RED escala de inmediato sin esperar el tercer
ciclo.
3.4 Componente de alerta
El sistema O'upala Mma implementa una arquitectura de alerta multinivel diseñada para operar bajo
condiciones críticas de conectividad. Como primera línea de respuesta ante una emergencia inminente, se
utiliza la Sirena ES-626 de 115dB, la cual se activa automáticamente mediante un relevo (relay) desde el
nodo central Heltec. Este dispositivo garantiza una cobertura sonora en un radio de 400 metros y cuenta con
9una autonomía de hasta 7 horas en modo alarma gracias a un respaldo de batería Li-ion de 12V 8800mAh
compartido con el gateway. Complementariamente, se despliega una Red de Nodos LoRa Meshtastic, que
permite el envío de notificaciones push a otros nodos de pescadores, vigías y turistas en un rango de 8 a 12
km por salto, sin depender de redes de telefonía móvil, internet o suscripciones, garantizando que llegue
incluso a las zonas más remotas del litoral.
Canales institucionales y medios de comunicación masiva Para la gestión de incidentes y la coordinación
técnica, se emplea un directorio comunitario de WhatsApp destinado a líderes, operadores turísticos y
miembros del CMGRD, facilitando el envío de reportes detallados y documentados en tiempo real. En
sectores rurales y zonas donde la señal celular es inexistente, la Radio Comunitaria se establece como el
canal de mayor confianza cultural, permitiendo informar a adultos mayores y familias en rancherías que no
poseen teléfonos inteligentes. Estos canales aseguran que el tiempo de respuesta oscile entre pocos minutos
para detecciones automáticas y un máximo de una hora cuando se requiere validación por parte de las
autoridades municipales.
Gobernanza comunitaria y Wayuu Reconociendo la identidad del territorio, el sistema integra la Vocería de
los Vigías Comunitarios como el mecanismo de difusión para la "última milla" en zonas totalmente off-
grid. Este canal traduce la alerta tecnológica en una acción humana situada, respetando las formas
tradicionales de comunicación de las rancherías. Para garantizar la apropiación social, todos los mensajes
de alerta se emiten de forma bilingüe en español y wayuunaiki, asegurando que la información sea
comprensible y respetuosa con la cosmovisión local, donde el sistema actúa como los "ojos" (O'u) que
cuidan la tierra (Mma).
Accesibilidad e inclusión universal La estrategia de alerta de O'upala Mma ha sido diseñada bajo criterios
de inclusión total para poblaciones vulnerables. Para personas con discapacidad visual, el sistema prioriza
el uso de la sirena y mensajes de audio por radio y WhatsApp; mientras que para la comunidad sorda, se
emplean alertas escritas y señalética visual en los puntos de evacuación. Asimismo, la población analfabeta
cuenta con un sistema de semaforización por colores y pictogramas intuitivos en los puntos de encuentro.
Este enfoque multidimensional asegura que, sin importar las barreras físicas o cognitivas, cada habitante de
Dibulla reciba la información necesaria para salvaguardar su vida ante los procesos de erosión costera.
Accesibilidad: Discapacidad visual: sirena y mensajes de audio en radio y WhatsApp de voz, Discapacidad
auditiva: mensajes de WhatsApp y señalización visual en puntos de evacuación Adultos mayores: radio
comunitaria y vocería como canales prioritarios Población analfabeta: señalización con colores (semáforo)
y pictogramas en puntos de encuentro Idioma: todos los mensajes se emiten en español y wayuunaiki
Tiempo de respuesta estimado: de minutos (detección automática + activación de sirena) a una hora
(validación CMGRD + difusión digital), según el nivel de alerta.
3.5 Elementos innovadores
 Hardware y software 100% abierto: Esquemáticos bajo licencia CERN-OHL y código fuente bajo MIT,
publicados para que cualquier comunidad costera pueda replicar, auditar y mejorar el sistema sin barreras
de propiedad intelectual ni dependencia de fabricantes.
 Sensor meteorológico RS485 certificado para niebla salina: La mini estación meteorológica ultrasónica
reemplaza tres sensores individuales (presión/temperatura/humedad, lluvia, viento) con una sola interfaz
10digital de 0,2W de consumo, reduciendo drásticamente los puntos de falla mecánica y el mantenimiento
en el ambiente marino.
 Arquitectura offline-first: El sistema fue concebido para entornos sin internet. La alerta por sirena no
requiere conectividad. El gateway almacena datos localmente y sincroniza en la nube cuando hay red. La
vocería de vigías es el protocolo de última milla.
 Validación cruzada satelital + sensores in situ: La combinación de telemetría local (en tiempo real) y
análisis satelital Sentinel-2 (cada 5 días) reduce falsos positivos sin depender de un único punto de falla,
aumentando la confiabilidad y la legitimidad de las alertas ante la comunidad.
 Comunicación bilingüe con protocolo de validación cultural wayuu: El diseño contempla que todos
los mensajes de alerta se emitan en español y wayuunaiki. La traducción al wayuunaiki se realizará en
coordinación con hablantes nativos de la comunidad y, de ser posible, con el acompañamiento de la
Universidad de La Guajira o de organizaciones wayuu con experiencia en comunicación comunitaria,
antes de cualquier implementación.
 Costo por persona protegida inferior a COP $4.400: Con COP $3.472.989 de inversión, el sistema
protege directamente a ~800 personas, equivalente a $4.341 por persona —frente a los ~$82 millones de
una boya oceanográfica comercial sin capacidad de alerta comunitaria.
 Red comunitaria LoRa de acceso abierto: La banda 915 MHz es de uso libre en Colombia sin necesidad
de concesión ni pago a operador alguno. Cualquier actor — investigadores, comunidades vecinas, turistas,
instituciones— puede comprar un nodo Heltec V4.3 (~$149.300 COP) y unirse a la malla Meshtastic sin
SIM, sin mensualidades y sin pedir autorización. El protocolo store-and-forward garantiza que cada nodo
adicional amplíe la cobertura y fortalezca la resiliencia de toda la red. El nodo piloto de O’upalaMma es
la semilla de una infraestructura comunitaria autogestionada que escala sin infraestructura centralizada.
4. ESTRATEGIA DE COMUNICACIÓN COMUNITARIA
4.1 Canales de comunicación
La estrategia multicanal garantiza que la alerta llegue a toda la población independientemente de su acceso
a tecnología, idioma, capacidad auditiva o visual, o ubicación geográfica. Ningún canal es prescindible:
cada uno cubre la falla del anterior. Las adaptaciones de accesibilidad están integradas desde el diseño:
sirena y audio para personas con discapacidad visual; mensajes de WhatsApp y señalización visual para
personas con discapacidad auditiva; radio y vocería como canales prioritarios para adultos mayores y
población rural; señalización con semáforo de colores y pictogramas para población con baja alfabetización;
y todos los mensajes en español y wayuunaiki para superar barreras lingüísticas.
4.1 Roles de comunitarios
Rol
ResponsabilidadesPerfil sugeridoCantidad
Operador SATMonitoreo de plataforma, validación de alertas Naranja/Rojo,
reporte al CMGRD, mantenimiento de softwareCapacitación básica en el sistema2
Vigía
ComunitarioMantenimiento básico del nodo, voceria de alertas en zonas sin
señal, reporte de observaciones, enlace con autoridades wayuu.Lider comunitario reconocido, incluye
palabreros según disponibilidad4-6
11Lider de
evacuación
Coordinación de rutas y puntos de encuentro, verificación de
llegada de familias vulnerables
Miembro de Defensa Civil o JAC con
conocimiento del territorio
3-4
Tabla 2. Estructura de roles comunitarios del SAT. Elaboración propia.
TemaDuraciónFrecuenciaDirigido a
Gestion del riesgo costero y funciones del SAT8 horasAnualTodos los roles
Operación y mantenimiento básico del sistema
Protocolos de comunicación y evacuación
12 horas
6 horas
semestral
Trimestral
Operadores y vigías
Tabla 3. Capacitación requerida. Elaboración propia.
Todos los roles
Articulación institucional:
 El CMGRD de Dibulla valida las alertas nivel Naranja y Rojo antes de su difusión y es el referente oficial
ante la comunidad.
 Corpoguajira e INVEMAR proveen soporte técnico y acceso a datos históricos de línea de costa.
 La UNGRD territorial recibe los reportes de eventos y articula la respuesta con el nivel departamental y
nacional.
4.3 Protocolo de respuesta
ColorSignificadoMensaje tipo
Acción esperada
VERDE —
NormalCondiciones de mar normales, no se anticipan
eventos.«Boletín diario: el mar está
tranquilo. Continúe sus
actividades.»
Actividades normales; vigías reportan
rutina.
AMARILLO —
PreparaciónOleaje moderado o lluvia intensa en cuenca
alta. Posible mar de leva en 24–48 h.«Atención: oleaje creciente.
Pescadores eviten zarpar después
de las 16:00.»
Preparación: alertar a turistas verificar
equipos y monitorizar. escuchar radio.
NARANJA —
AlertaMar de leva activo o sobreelevación
significativa. Riesgo de inundación y
socavamiento.«Alerta naranja. Diríjase a punto de Evacuación preventiva de zonas de mayor
encuentro si vive en zona baja.»
exposición; vigías activan voz a voz.
ROJO —
AlarmaEvento extremo en curso. Inundación
inminente, retroceso brusco, riesgo de vida.«ALARMA: evacúe ya hacia PE-1. Evacuación total inmediata; activación
Protéjase. Esto no es simulacro.»
bomberos y Defensa Civil; cierre de vías
costeras.
Tabla 3. Niveles de alerta. Elaboración propia.
4.4 Apropiación social
La apropiación comunitaria es condición de sostenibilidad, no un componente adicional. O’upalaMma está
diseñado para ser del territorio, no para ser instalado en él:
12Co-diseño: La propuesta contempla que la comunidad participe desde el inicio en la selección de
ubicaciones del nodo sensor, la definición de umbrales de alerta, la validación de mensajes en wayuunaiki
y el diseño de los materiales pedagógicos. Las autoridades wayuu validarían culturalmente el protocolo
antes de cualquier implementación. Esta participación no es un requisito formal de la competencia, sino
una condición que la propuesta reconoce como indispensable para la viabilidad real del sistema. Sector
turístico: El diseño contempla la integración de operadores de turismo, hoteles y posadas de Palomino a la
red de difusión de alertas, dado que son responsables de visitantes en zonas de riesgo durante temporadas
altas. Este vínculo generaría además un incentivo económico para el mantenimiento compartido del sistema.
Simulacros: La propuesta sugiere un simulacro general anual con toda la comunidad y uno sectorial
semestral con los roles activos, con evaluación posterior y ajuste de protocolos. Su periodicidad y forma
definitiva deberá acordarse con la JAC y el
CMGRD. Retroalimentación: Se propone realizar
reuniones semestrales con la comunidad para ajustar
umbrales, mensajes y rutas de evacuación según la
experiencia acumulada y los cambios observados en
el territorio. Integración de conocimiento local: Los
vigías wayuu aportarían señales tradicionales de
aviso —comportamiento de fauna marina, cambios
en el color y el olor del mar— que complementarían
el monitoreo instrumental y fortalecerían la
credibilidad del sistema en la comunidad.
Figura 5. Ciclo de Apropiación social del SAT O'upala Mma. Elaboración propia.
5. PRESUPUESTO Y VIABILIDAD ECONÓMICA
5.1 Presupuesto de implementación
Componente
Descripción
Cant.Costo unit.
(COP)Total (COP)Fuente
2149.300298.600AliExpress
HARDWARE PRINCIPAL
Heltec V4.3 WiFi LoRa 32
ESP32-S3R2 + LoRa SX1262 + GPS L76K. Nodo
SENSORES
Mini estación meteorológica
RS485 all-in-oneViento vel/dir, lluvia, T, HR, presión. Ultrasónica.
Certificada niebla salina. Modbus RTU1467.380467.380AliExpress
Bracket soporte estaciónMontaje exterior para sensor RS485176.27076.270AliExpress
JSN-SR04TSensor nivel agua ultrasónico IP67122.89022.890AliExpress
Sensor vibración 801SDetección micro-movimientos en taludes118.86018.860AliExpress
13Sensor humedad suelo SEN0193
Capacitivo
118.46018.460AliExpress
ENERGÍA
Panel solar 6V 10WConexión directa al puerto solar del Heltec V4.31120.000840.000AliExpress
Batería Li-ion 3.7V 3000mAhBatería Li-ion 3.7V 3000mAh (2 unidades). Conector
SH1.25. Gestión de carga integrada en Heltec V4.3160.42060.420AliExpress
MT3608 boost converterEleva 3,7V → 12V para alimentar exclusivamente el
sensor RS485111.21011.210AliExpress
COMUNICACIÖN LoRa — banda libre 915 MHz
Antena LoRa 915MHz 55cm
Absorbente golpes con resorte. Compatible Meshtastic2128.910257.820AliExpress
Cable RG58 con conectores (3m)UHF PL259/SO239 a SMA macho/hembra112.97012.970AliExpress
Convertidor TTL- RS4853,3V/5V. Control de dirección por hardware18.2908.290AliExpress
PROTECCIÓN MARINA
Caja IP67 policarbonato200×120×75mm resistente UV1118.315118.315AliExpress
Coating conformal SERLAVEXA60ml PCB protección UV+humedad con indicador UV137.73037.730AliExpress
Prensaestopas IP68 PG7 inox 304Sellado de cables de sensores (×4)+ bolsa gel sílice
desecante interior418.43073.720AliExpress
120.50920.509Mercado Libre
Adhesivo instantáneopenetraciones 20g. Sellado secundario de penetraciones de cable en caja
de cable en Loctite 401
IP67, complemento a prensaestopas IP68
ALMACENAMIENTO
Adaptador MicroSD (SPI/I2C)Adaptador MicroSD (módulo SPI/I2C)118.46018.460AliExpress
MicroSD 32GB Clase 10 SanDiskIndustrial grade. Respaldo local de datos en nodo161.20661.206Mercado Libre
Multiplexor I2C PCA9548AExpansión bus I2C 1-a-8 canales15.6505.650AliExpress
Zumbador pasivo 5VAlarma sonora local en el nodo16.6506.650AliExpress
GATEWAY
Raspberry Pi 4 Starter Kit 4GBIncluye caja, ventilador PWM, fuente, cables HDMI y
MicroSD 64GB1640.660640.660AliExpress
Sirena ES-626 115dB 15W 12VAltavoz triple ABS. 115dB ±3 a 1m. 1200mA alarma /
600mA149.88049.880Mercad
Libre
Batería Li-ion 12V 8800mAh 3S1P
BMS18650. BMS (protección . Autonomía alarma continua
~7h; espera ~14h. Alimenta la sirena y respalda el
Raspberry Pi 4 vía LM2596 durante cortes de electricidad190.54390.543Mercad
Libre
LM2596 12V→5V 3AConvierte 12V de la batería a 5V para alimentar el
Raspberry Pi 418.0008.000AliExpress
ESTRUCTURA E INSTALACIÓN
14Tubo galvanizado para cerramiento
6mEstructura de soporte del nodo sensor. Resistente a
la intemperie190.00090.000Ferreteria
Dibulla
Base de concretoCimentación + varillas + anclaje del tubo170.00070.000Ferreteria
Dibulla
Instalación técnicaInstalación técnica (incluye calibración)1300.000300.000Autor + apoyo
JAC
Evento de instalación
y socializaciónRefrigerios, viáticos y materiales digitales. Aforo: líderes
comunitarios, CMGRD, JAC, instituciones clave1250.000250.000JAC / CMGRD
Dibulla
SUBTOTAL
3.157.263
IMPREVISTOS
Imprevistos (10%)
Reserva técnica sobre subtotal
—
—
TOTAL IMPLEMENTACIÓN
315.726—
$ 3.472.989—
Tabla 4. Presupuesto detallado de implementación. Precios verificados en abril de 2026. Elaboración
5.2 Presupuesto de operación anual
ConceptoFrecuencia
Costo unit.
(COP)
Mantenimiento preventivoSemestral420.000840.000 Limpieza sensores, inspección sellados, pruebas funcionales, reemplazo
coating
Reposición de
componentesAnual280.000280.000 Sensores desgastados, cables, conectores
SimulacrosAnual180.000180.000 1 simulacro general + 1 sectorial
Administración técnicaMensual45.000540.000 Coordinación operativa, reportes CMGRD, actualizaciones de firmware
Visualización públicaSemestral00 Grafana Cloud free tier + Google Earth Engine App; ambos gratuitos y
mantenidos por sus proveedores
Conectividad LoRaAnual00 Banda 915 MHz libre en Colombia (ANE 711/2016). Sin SIM. Sin
mensualidades
TOTAL OPERACIÓN ANUAL
Total anual
(COP)
$1.840.000
Notas
—
Tabla 5. Costos anuales recurrentes de operación. Elaboración propia
5.3 Análisis de viabilidad económica
Costos comparados de operación
Solución
Boya oceanográfica comercial (Sofar Spotter)
Costo total (COP)
$82.000.000
Costo por punto monitoreado
$82.000.000 (1 punto)
15SAT IDEAM hidrometeorológico tradicional
O'upala Mma
$120.000.000+$24.000.000 (5 puntos)
$3.472.989$3.472.989 (1 punto)
Tabla 6. Costos comparados de operación. Elaboración propia
Fuentes potenciales de financiamiento
 Fondos municipales de gestión del riesgo (Ley 1523 de 2012) Sistema General de Regalías (SGR) —
proyectos OCAD de ciencia y tecnología Cooperación técnica de Corpoguajira (Plan de Acción 2024-
2027) Fondos de adaptación al cambio climático (GCF, PNUD) Alianzas con universidades (Universidad
del Magdalena, Universidad de LaGuajira)
Estrategia de sostenibilidad financiera
Solución
Costo total (COP)
Costo por punto monitoreado
Alcaldía de Dibulla — Fondo Municipal de Gestión del Riesgo60%$1.104.000
Autogestión comunitaria (JAC, hoteleros, operadores turísticos)25%$460.000
Cooperación institucional (Corpoguajira, universidades)15%$276.000
$3.472.989$1.840.000
O'upala Mma
Tabla 7. Sostenibilidad de operación. Elaboración propia
6. ESCALABILIDAD Y SOSTENIBILIDAD
6.1 Replicabilidad La arquitectura de O’upalaMma puede implementarse en cualquier punto crítico de
erosión costera del Caribe continental colombiano —desde La Guajira hasta el Urabá chocoano— con
ajustes menores de idioma, umbrales y conectividad local. Los dos factores verdaderamente indispensables
son la organización comunitaria mínima —una JAC, un consejo comunitario o cualquier estructura social
con capacidad de asumir la operación— y el soporte institucional de un CMGRD o entidad territorial que
coordine las alertas. Sin estos dos elementos, la tecnología no funciona a largo plazo. Los esquemáticos y
el código abierto eliminan la dependencia de soporte técnico externo; la adaptación de mensajes a lenguas
nativas (wayuunaiki, emberá, zenú) es el ajuste cultural más importante en cada territorio. Territorios con
mayor potencial de réplica: Riohacha, Manaure, Uribia, San Antero, Tolú, Necoclí y los corregimientos
costeros del Atlántico.
6.2 Escalabilidad La red LoRa Meshtastic soporta la expansión de 1 a múltiples nodos sin modificar el
gateway. El costo incremental de un nodo adicional completo —electrónica, sensores, sistema de energía,
protección marina, estructura e instalación— se estima entre COP $1.200.000 y $1.500.000, dependiendo
de la distancia al punto de instalación y si la mano de obra es comunitaria o técnica. No se requiere
infraestructura adicional de comunicación: el mismo gateway Raspberry Pi 4 gestiona múltiples nodos con
el stack de software existente.
166.3 Sostenibilidad técnica
La infraestructura tecnológica presenta una longevidad sólida, donde los paneles solares y antenas lideran
la durabilidad (hasta 10 años), mientras que las baterías de Li-ion constituyen el cuello de botella operativo
con reemplazos cada 2 o 3 años. Logísticamente, existe una dualidad en Colombia: los insumos eléctricos
e industriales (paneles, cajas IP67) son de fácil acceso nacional, pero los componentes críticos como el
Heltec V4.3 y la estación RS485 dependen de distribuidores especializados o importaciones directas. En
términos de mantenimiento, el sistema es eficiente, exigiendo principalmente tareas preventivas básicas
como limpieza trimestral y resellado anual para mitigar el impacto del ambiente marino.
6.4 Matriz de riesgos y mitigación
Riesgo
ProbabilidadImpacto
Mitigación
Vandalismo: robo o destrucción de nodosMediaAltoApropiación comunitaria mediante co-diseño;
Falsa alerta: errores del modelo o sensoresMediaMedioDoble validación técnico-comunitaria; «votación»
Eventos extremos: huracanes que destruyen
la redBajaCríticoAnclaje reforzado; protocolo de retiro preventivo de nodos ante avisos
huracanados; redundancia de datos en cloud.
Tecnológico: obsolescencia de componentesBajaMedioHardware abierto facilita migración; revisión tecnológica trianual.
Tabla 8. Riesgos y mitigación. Elaboración propia
7. CONCLUSIONES
O’upalaMma propone un SAT comunitario de bajo costo (COP $3.472.989) capaz de operar sin internet,
comunicar alertas en español y wayuunaiki, y sentar las bases de una infraestructura LoRa comunitaria de
acceso abierto en Palomino, Dibulla. La propuesta responde a una brecha real y documentada: la ausencia
de herramientas de alerta a escala comunitaria en un municipio con erosión severa y alta vulnerabilidad
étnica.
Principales fortalezas:
1. Viabilidad económica y replicabilidad: COP $4.341 por persona protegida directa, con hardware y
software 100% abiertos replicables en los 86 puntos críticos de erosión costera de Colombia (MinAmbiente,
2016) sin restricciones de propiedad intelectual.
2. Resiliencia estructural: diseñado para funcionar sin internet desde el primer nivel de alerta. La sirena con
respaldo autónomo y la vocería de vigías son el núcleo del sistema.
3. Red LoRa de acceso abierto: la banda 915 MHz libre en Colombia permite que cualquier actor se una a
la malla sin SIM ni mensualidades, convirtiendo el nodo piloto en la semilla de una infraestructura
comunitaria autogestionada.
Limitaciones reconocidas:
171. El sensor RS485 all-in-one ($467.380) depende de importación con tiempos de hasta 15 días; no hay
distribuidor nacional confirmada.
2. La implementación requiere como condición previa un proceso de co-diseño y validación con la
comunidad y el CMGRD de Dibulla que esta propuesta conceptual no puede sustituir.
Pasos para implementación:
1. Formalizar convenio interinstitucional entre la Alcaldía de Dibulla, Corpoguajira y el CMGRD, e iniciar
el proceso de co-diseño con la JAC de Palomino y autoridades wayuu.
2. Ejecutar el piloto técnico durante al menos una temporada de lluvias, documentar la experiencia y ajustar
el diseño para informar la réplica en otros municipios del Caribe colombiano.
8. REFERENCIAS BIBLIOGRÁFICAS
Las siguientes referencias soportan la información cuantitativa y cualitativa presentada en la propuesta. Se
aplica el formato APA 7ª edición.
Referencias académicas e institucionales
Agencia Nacional del Espectro. (2016). Resolución número 000711 de 2016, por la cual se reglamentan
las condiciones técnicas de operación de los equipos de radiocomunicaciones de baja potencia en
las bandas de frecuencias de uso libre.
https://normograma.mintic.gov.co/mintic/docs/resolucion_ane_0711_2016.htm
Alcaldía de Dibulla. (2020). Decreto 055 de 2020, por el cual se declara urgencia manifiesta en el
municipio de Dibulla por afectaciones de erosión costera en el corregimiento de Palomino.
https://dibullalaguajira.micolombiadigital.gov.co/sites/dibullalaguajira/content/files/000234/11665
_decreto-055-de-2020.pdf
Boak, E. H., & Turner, I. L. (2005). Shoreline definition and detection: A review. Journal of Coastal
Research, 21(4), 688-703. https://doi.org/10.2112/03-0071.1
Chen, L., Zhang, W., & Gao, Y. (2018). Soil moisture monitoring in coastal slopes using capacitive
sensors. Journal of Coastal Research, 34(2), 451-462. https://doi.org/10.2112/JCOASTRES-D-
17-00089.1
Corporación Autónoma Regional de La Guajira. (2024). Durante la décima Mesa de Erosión Costera se
firmó acuerdo de voluntades para mitigar esta problemática en La Guajira.
https://corpoguajira.gov.co/noticias/durante-la-decima-mesa-de-erosion-costera-se-firmo-acuerdo-
de-voluntades-para-mitigar-esta-problematica-en-la-guajira/
Departamento Administrativo Nacional de Estadística. (2018). Censo Nacional de Población y Vivienda
2018: Resultados municipales, Dibulla, La Guajira.
18https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/censo-
nacional-de-poblacion-y-vivenda-2018
Departamento Administrativo Nacional de Estadística & Ministerio de Tecnologías de la Información y
las Comunicaciones. (2025). TerritoriosIA: Dibulla, La Guajira [proyecciones de población a
nivel municipal, período 2025]. https://territoriosia.mintic.gov.co/
Docker Inc. (2024). Docker — Containerization platform documentation. https://docs.docker.com
Espressif Systems. (2024). ESP32-S3 Series Datasheet. Version 1.4.
https://www.espressif.com/sites/default/files/documentation/esp32-s3_datasheet_en.pdf
Google Earth Engine Apps. (2024). Earth Engine Apps — Deploy and share geospatial applications.
https://developers.google.com/earth-engine/guides/apps
Gorelick, N., Hancher, M., Dixon, M., Ilyushchenko, S., Thau, D., & Moore, R. (2017). Google Earth
Engine: Planetary-scale geospatial analysis for everyone. Remote Sensing of Environment, 202,
18-27. https://doi.org/10.1016/j.rse.2017.05.010
Grafana Labs. (2024). Grafana Cloud — Observability platform with public dashboard sharing.
https://grafana.com/products/cloud/
Heltec Automation. (2024). WiFi LoRa 32 V4.3 — Datasheet and reference manual.
https://heltec.org/project/wifi-lora-32-v4/
INVEMAR. (2008). Diagnóstico de la erosión en la zona costera del Caribe colombiano. Serie de
Publicaciones Especiales No. 13. Santa Marta.
INVEMAR. (2024). Informe del estado de los ambientes y recursos marinos y costeros en Colombia.
Boletín de Investigaciones Marinas y Costeras, 53(1). Santa Marta.
Meshtastic Project. (2024). Meshtastic — Open source mesh networking over LoRa. Documentation and
protocol specification. https://meshtastic.org/docs
Ministerio de Ambiente y Desarrollo Sostenible. (2016). Plan Maestro de Erosión Costera de Colombia
(Convenio de Cooperación Internacional N° 466 de 2014). Bogotá.
Modbus Organization. (2012). Modbus application protocol specification V1.1b3.
https://modbus.org/docs/Modbus_Application_Protocol_V1_1b3.pdf
19NOAA Center for Operational Oceanographic Products and Services. (2021). Tidal Datums and Their
Applications (NOAA Special Publication NOS CO-OPS 1). U.S. Department of Commerce.
https://tidesandcurrents.noaa.gov/publications/tidal_datums_and_their_applications.shtml
OpenJS Foundation. (2024). Node-RED — Low-code programming for event-driven applications.
https://nodered.org
Organización Meteorológica Mundial. (2018). Guía de instrumentos y métodos de observación
meteorológicos (OMM-N° 8, 8.ª ed.). OMM. https://library.wmo.int/records/item/41650-guide-to-
instruments-and-methods-of-observation
Panel Intergubernamental de Expertos sobre el Cambio Climático. (2021). Cambio Climático 2021:
Fundamentos de la ciencia física. Contribución del Grupo de trabajo I al Sexto Informe de
Evaluación del IPCC (Masson-Delmotte, V. et al., Eds.). Cambridge University Press.
https://doi.org/10.1017/9781009157896
Programa de las Naciones Unidas para el Medio Ambiente. (2021). Making Peace with Nature: A
scientific blueprint to tackle the climate, biodiversity and pollution emergencies. PNUMA.
https://www.unep.org/resources/making-peace-nature
Semtech Corporation. (2020). SX1261/SX1262 Long Range, Low Power, sub-GHz RF Transceiver.
Datasheet Rev. 2.1.
https://semtech.my.salesforce.com/sfc/p/#E0000000JelG/a/2R000000HT76/7Nka9W5WgugoZe.j
KHV.Un1RBogvmGMAZV9d0CEzcI0
UNDRR. (2022). Early Warning for All: Executive Action Plan 2023-2027. Geneva, Switzerland.
https://www.undrr.org/early-warnings-for-all
UNESCO. (2010). Sistema normativo de los Wayuu, aplicado por el Pütchipü'üi ("palabrero"). Lista
Representativa del Patrimonio Cultural Inmaterial de la Humanidad.
https://ich.unesco.org/es/RL/sistema-normativo-de-los-wayuu-aplicado-por-el-putchipuui-
palabrero-00435
Vorágine. (2024). Erosión costera en La Guajira: lo que el mar se lleva, nunca lo devuelve.
https://voragine.co/historias/reportaje/erosion-costera-en-la-guajira-lo-que-el-mar-se-lleva-nunca-
lo-devuelve/
Xu, H. (2006). Modification of normalised difference water index (NDWI) to enhance open water features
in remotely sensed imagery. International Journal of Remote Sensing, 27(14), 3025-3033.
https://doi.org/10.1080/01431160600589179
20Referencias de componentes y proveedores
AliExpress. (2026). Mini Estación Meteorológica Ultrasónica RS485 all-in-one (velocidad viento,
dirección, lluvia, temperatura, humedad, presión).
https://es.aliexpress.com/item/1005007798498855.html
Electronilab Colombia. (2026). Catálogo de sensores y módulos electrónicos. https://electronilab.co
Mactronica Colombia. (2026). Distribuidores oficiales ESP32, sensores y componentes IoT.
https://www.mactronica.com.co
ANEXOS Declaración de uso de IA generativa
Varias secciones — edición y estandarización | Claude claude-sonnet-4.6 / github-copilot) |
Corrección de estilo, coherencia, ortografía, reformulación de párrafos indicados por el autor; auditoría
sección por sección con preguntas y ediciones definidas por el autor para verificar cada decisión técnica y
comunicacional
| Alto en redacción; ninguno en contenido técnico ni datos |
Declaración del autor: No se generó información empírica nueva ni se alteraron datos de referencias.
Todos los datos técnicos, precios, decisiones de diseño y contexto territorial fueron definidos, revisados y
aprobados por el autor. La IA actuó como asistente de redacción y organización del documento bajo
supervisión directa del autor.
Modelo: Claude claude-sonnet-4.6 (github-copilot/claude-sonnet-4.6) — OpenCode
Alcance de uso: Corrección de estilo, claridad, consistencia, cálculo de presupuesto, auditoría de coherencia
entre secciones.
21