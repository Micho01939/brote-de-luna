# Instalación y ejecución

Cancha Libre es una aplicación estática: no necesita instalar dependencias, crear una cuenta ni configurar un servidor de aplicaciones.

1. Descarga o clona el repositorio.
2. Abre una terminal en la raíz del proyecto y ejecuta un servidor HTTP local:

   ```sh
   python3 -m http.server 8000 --directory public
   ```

   En Windows puedes usar:

   ```powershell
   py -m http.server 8000 --directory public
   ```

3. Abre `http://localhost:8000` en el navegador.

También puedes abrir `public/index.html` directamente en un navegador moderno. El servidor local es la opción recomendada para evitar restricciones del navegador al cargar archivos.

No hay backend: el progreso se guarda localmente en el navegador y no se sincroniza entre dispositivos.
