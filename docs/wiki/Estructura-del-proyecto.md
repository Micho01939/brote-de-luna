# Estructura del proyecto

```text
.
├── docs/
│   └── wiki/
├── public/
│   ├── css/
│   ├── data/
│   ├── js/
│   └── index.html
├── index.html
├── SOURCES.md
└── README.md
```

- `index.html` en la raíz redirige a la aplicación publicada en `public/`.
- `public/index.html` contiene la interfaz del juego.
- `public/css/` reúne los estilos generales, los específicos de LaLiga y la interfaz de actividades avanzadas.
- `public/js/` contiene la interfaz y la lógica del juego.
- `public/data/` contiene el catálogo de clubes y las plantillas de jugadores.
- `SOURCES.md` documenta las fuentes de los datos de temporada.
- `docs/wiki/` contiene las páginas fuente de esta documentación.

Los archivos de la aplicación se cargan directamente desde `public/index.html`, sin empaquetador ni proceso de compilación. Al cambiar una ruta de archivo, actualiza también la referencia correspondiente en ese HTML.
