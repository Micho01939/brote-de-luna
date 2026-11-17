# Cancha Libre · FC 27 Manager Mode

Cancha Libre es un mánager táctico de fútbol para navegador inspirado en EA Sports FC 27. El catálogo incluye **150 clubes jugables** repartidos en **11 competiciones** de **España** y **Canadá** (temporada 2026/27):

- **España (82 clubes · 4 divisiones):** LaLiga EA Sports (20), LaLiga Hypermotion (22) y Primera Federación Grupos 1 y 2 (40).
- **Canadá (68 clubes · 7 divisiones masculinas):** Canadian Premier League · Élite (12 clubes, incluyendo los clubes profesionales canadienses de MLS y CPL con plantillas oficiales de 18 jugadores), League1 Ontario Premier (12), Ligue1 Québec / PLSQ (10), League1 British Columbia (8), League1 Alberta (8), League1 Ontario Championship (10) y Canadian Soccer League · CSL (8).

Las plantillas oficiales de Primera División (España) y Canadian Premier League · Élite (Canadá) conservan nombres, dorsales, posiciones y edades consultados; las plantillas de categorías semiprofesionales y provinciales se generan determinísticamente para el juego. Los escudos son diseños geométricos originales y los GRL y atributos son estimaciones, no valoraciones oficiales.

## Probar localmente

Desde la raíz del proyecto, ejecuta `python3 -m http.server 8000 --directory public` y abre `http://localhost:8000`. No requiere cuenta ni pago.

Las ligas completas se juegan a ida y vuelta con calendario de temporada. En cada jornada se disputa el partido del usuario (en vivo 2D o mediante simulación rápida) y se simulan los demás resultados; el calendario, la clasificación y los marcadores se guardan en la carrera.

## Qué incluye (Novedades FC 27)

- **Central del Mánager FC 27:** Índice de confianza de la directiva, objetivos de temporada según el rango del club, racha de forma, próximo enfrentamiento y bandeja de prensa dinámica.
- **Pizarra Táctica FC IQ y Once Titular Manual:** Selección manual de titulares y suplentes por intercambio, designación de capitán, 6 formaciones (`4-3-3`, `4-2-3-1`, `4-4-2`, `3-5-2`, `5-3-2`, `4-1-4-1`) y 5 estilos FC IQ (*Equilibrado*, *Tiki-Taka Posesión*, *Gegenpressing Alto*, *Contraataque Vertical* y *Bloque Bajo*).
- **Tarjetas estilo FUT / FC 27 y Centro de Entrenamiento:** 6 atributos clave en tarjeta (`RIT`, `TIR`, `PAS`, `REG`, `DEF`, `FIS`), planes de entrenamiento semanal de equipo y sesiones individuales por futbolista.
- **Red Internacional de Ojeo y Fichajes:** Ojeo directo sobre los 149 clubes rivales de España y Canadá (pago de cláusula o negociación con descuento del 15%), contratación de agentes libres y venta de jugadores propios.
- **Partido 2D en Vivo con Telemetría:** Posesión, goles esperados (`xG`), tiros y pases en tiempo real, órdenes de banda en vivo y simulación instantánea de jornada.

En **Fuentes y escudos** puedes importar PNG/SVG para cualquier club o crear un diseño con el editor vectorial de colores, forma, patrón, motivo, tipografía y borde. Los archivos personalizados se guardan en IndexedDB de este navegador y no se incluyen en el respaldo de carreras. Para incluir un asset en el despliegue, colócalo en `public/assets/logos/<ID-del-club>.png` o `.svg`; el juego prueba ambos formatos por ID. Revisa las licencias y atribuciones de cada recurso externo antes de reutilizarlo.

El progreso de partida se guarda en este navegador; borrar los datos del sitio elimina el progreso. Puedes exportar un respaldo JSON.
