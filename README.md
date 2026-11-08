# Cancha Libre

Cancha Libre es un mánager de fútbol para navegador. El catálogo incluye 82 clubes españoles de la temporada 2026/27: los 20 de Primera División, los 22 de Segunda División y los 40 de Primera Federación, repartidos en dos grupos. Las plantillas oficiales de Primera conservan nombres y dorsales consultados; las plantillas de Segunda y Primera Federación se generan para el juego. Los escudos son diseños geométricos originales y los GRL y atributos son estimaciones, no valoraciones oficiales.

## Probar localmente

Desde la raíz del proyecto, ejecuta `python3 -m http.server 8000 --directory public` y abre `http://localhost:8000`. No requiere cuenta ni pago.

## Qué incluye

Gestión de plantilla y mercado; ligas jugables de Primera, Segunda y Primera Federación (grupos I y II), cada una con su propia clasificación; nombres y dorsales oficiales en las plantillas de Primera y plantillas generadas para los clubes de categorías inferiores; GRL de club y jugador; atributos de ataque, velocidad, pase, regate, defensa, entrada, resistencia, fuerza, tiro, portería, anticipación y visión; partidos 2D con jugadores circulares identificados por dorsal y posición, IA táctica que ajusta presión, coberturas, líneas defensivas y desmarques a atributos y enfoque; reloj ajustable acompasado al movimiento de cancha; marcador fijo con equipos, goles y minuto; faltas, tiros libres directos, córners, lesiones y otros eventos; cambios animados y celebraciones con colores del equipo; guardado local y respaldo JSON. El comentario de voz es sintético y opcional: se puede silenciar y mantiene subtítulos en pantalla.

La temporada se basa en los participantes de las competiciones españolas 2026/27. Consulta [SOURCES.md](SOURCES.md) para las fuentes oficiales de participantes. Los escudos no reproducen insignias oficiales y las valoraciones de club son estimaciones originales del juego.

El progreso de partida se guarda en este navegador; borrar los datos del sitio elimina el progreso. Puedes exportar un respaldo JSON.
