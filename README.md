# Cancha Libre

Cancha Libre es un mánager de fútbol para navegador. El catálogo jugable contiene únicamente los 20 clubes de LaLiga EA Sports 2026/27, con nombres, dorsales, posiciones y edades de las plantillas oficiales. Los escudos son diseños geométricos originales; los GRL y atributos son estimaciones del juego y no valoraciones oficiales.

## Probar localmente

Desde la raíz del proyecto, ejecuta `python3 -m http.server 8000 --directory public` (en Windows también puedes usar `py -m http.server 8000 --directory public`) y abre `http://localhost:8000`. No requiere cuenta ni pago.

## Qué incluye

Gestión de plantilla y mercado; plantillas de hasta 25 jugadores de LaLiga con nombres y dorsales oficiales; atributos estimados agrupados en ritmo, tiro, pase, regate, defensa y físico, estilos de juego y GRL efectivo según la forma; partidos tácticos 2D con presión selectiva, coberturas zonales, líneas defensivas, desmarques y transiciones; duración configurable entre 10 y 90 minutos simulados y ritmo ajustable; sustituciones, lesiones y especialistas médicos; ruedas de prensa, objetivos de directiva, moral, confianza, aprobación de la afición, doble cargo con selección, patrocinios y entrevistas con efectos en la carrera. La estructura de atributos toma como referencia las categorías públicas de EA SPORTS FC; las valoraciones de jugadores del juego son estimaciones originales, no datos oficiales de EA. El comentario de voz es sintético y opcional: se puede silenciar y mantiene subtítulos en pantalla.

La temporada se basa en los participantes de LaLiga EA Sports 2026/27. Consulta [SOURCES.md](SOURCES.md) para las fuentes de participantes y cobertura. Los escudos no reproducen insignias oficiales y las valoraciones de club son estimaciones originales del juego.

El progreso de partida se guarda en este navegador; borrar los datos del sitio elimina el progreso. Puedes exportar un respaldo JSON.

## Documentación

Consulta la [wiki del proyecto](docs/wiki/Home.md) para aprender a jugar, ejecutar el juego y entender su estructura y sus datos.

## Estructura del proyecto

- `public/index.html`: página de entrada del juego.
- `public/css/`: estilos generales, del modo de LaLiga y de actividades avanzadas.
- `public/js/`: interfaz y lógica del juego.
- `public/data/`: catálogo y plantillas de jugadores.
- `SOURCES.md`: fuentes de cobertura y participantes.
- `docs/wiki/`: páginas de documentación del proyecto.
