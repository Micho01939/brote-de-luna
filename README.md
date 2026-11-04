# Cancha Libre

Cancha Libre es un mánager de fútbol original para navegador, con clubes y jugadores ficticios.

## Probar localmente

Desde la raíz del proyecto, ejecuta `python3 -m http.server 8000 --directory public` y abre `http://localhost:8000`. No requiere cuenta ni pago.

## Qué incluye

Gestión de plantilla y mercado; temporadas con jugadores ficticios y atributos tipo GRL/OVR; partidos 2D con tácticas, sustituciones, lesiones y recuperación; guardado local y respaldo JSON. El comentario de voz es sintético y opcional: se puede silenciar y mantiene subtítulos en pantalla.

## Datos del universo

El catálogo reúne **721 participaciones en 44 divisiones/grupos, no 721 clubes únicos**: 471 plazas base + 88 de cuatro grupos ingleses Step 3 + 162 participaciones danesas. En Dinamarca, el ajuste es 118 − 16 + 60 = 162 participaciones en 16 grupos. Son inscripciones por competición, no un conteo de clubes matrices únicos. Los nombres de juego son ficticios; las fuentes públicas documentan cobertura por división, no correspondencias individuales entre aliases y clubes.

Consulta [SOURCES.md](SOURCES.md) para las fuentes organizadas por división. No están incluidas todas las divisiones; Baden-Württemberg tiene una lista parcial de 6 de 18 participantes, por lo que esa carrera se juega con amistosos y sin tabla.

El progreso de partida se guarda en este navegador; borrar los datos del sitio elimina el progreso. Puedes exportar un respaldo JSON.
