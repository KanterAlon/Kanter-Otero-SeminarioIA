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
