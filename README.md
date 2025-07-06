# Kanter-Otero-SeminarioIA

Ejemplo de aplicación que muestra un listado de productos alimenticios y utiliza un modelo LLM de [Ollama](https://ollama.ai/) para recomendar un producto según las preferencias del usuario.

## Estructura

- `next-app` – Aplicación web con Next.js, React y Tailwind CSS.
- `backend` – API construida con Nest.js que consulta a `ollama`.

## Uso rápido

1. Desde la raíz del repositorio instala todas las dependencias ejecutando:
   ```bash
   npm install
   ```
   Este comando invoca `install.js`, un pequeño script que instala las
   dependencias de `backend` y `next-app`. En Windows también puede ejecutarse
   manualmente con `node install.js` si aparece algún problema con `npm`.
2. Levanta la aplicación completa:
   ```bash
   npm run dev
   ```
   Se abrirá automáticamente `http://localhost:3000` en tu navegador.
3. Solicita recomendaciones desde la página.

Para que las recomendaciones funcionen es necesario tener corriendo un servidor `ollama` local en `http://localhost:11434`.

## Configurar Ollama

1. Descarga e instala `ollama` desde su [sitio oficial](https://ollama.ai/).
   - En macOS o Linux puedes ejecutar:
     ```bash
     curl -fsSL https://ollama.ai/install.sh | sh
     ```
   - En Windows descarga e instala el ejecutable desde la misma página.
2. Inicia el servicio local:
   ```bash
   ollama serve
   ```
   La primera vez puede que necesites descargar el modelo base con:
   ```bash
   ollama run llama2
   ```
   Esto deja escuchando `http://localhost:11434`.

Con `ollama` corriendo ya puedes levantar la aplicación con `npm run dev`.
