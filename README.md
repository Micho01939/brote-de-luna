# Cancha Libre

Cancha Libre es un mánager de fútbol para navegador. El catálogo jugable contiene únicamente los 20 clubes de LaLiga EA Sports 2026/27, con nombres, dorsales, posiciones y edades de las plantillas oficiales. Los escudos son diseños geométricos originales; los GRL y atributos son estimaciones del juego y no valoraciones oficiales.

## Probar localmente

Desde la raíz del proyecto, ejecuta `python3 -m http.server 8000 --directory public` y abre `http://localhost:8000`. No requiere cuenta ni pago.

## Qué incluye

Gestión de plantilla y mercado; plantillas de hasta 25 jugadores de LaLiga con nombres y dorsales oficiales; GRL de club y jugador; atributos de ataque, velocidad, pase, regate, defensa, entrada, resistencia, fuerza, tiro, portería, anticipación y visión; partidos 2D con jugadores circulares identificados por dorsal y posición, IA táctica que ajusta presión, coberturas, líneas defensivas y desmarques a atributos y enfoque; sustituciones, lesiones y recuperación; celebración diferenciada por local/visitante con los colores del equipo, marcador y goleador; guardado local y respaldo JSON. El comentario de voz es sintético y opcional: se puede silenciar y mantiene subtítulos en pantalla.

La temporada se basa en los participantes de LaLiga EA Sports 2026/27. Consulta [SOURCES.md](SOURCES.md) para las fuentes de participantes y cobertura. Los escudos no reproducen insignias oficiales y las valoraciones de club son estimaciones originales del juego.

El progreso de partida se guarda en este navegador; borrar los datos del sitio elimina el progreso. Puedes exportar un respaldo JSON.
