# Kanter-Otero-SeminarioIA

Ejemplo de aplicación que muestra un listado de productos alimenticios y utiliza un modelo LLM de [Ollama](https://ollama.ai/) para recomendar un producto según las preferencias del usuario.

## Estructura

- `next-app` – Aplicación web con Next.js, React y Tailwind CSS.
- `backend` – API construida con Nest.js que consulta a `ollama`.

## Uso rápido

1. Instalar dependencias en ambos proyectos.
   ```bash
   cd backend && npm install
   cd ../next-app && npm install
   ```
2. Ejecutar el backend de Nest.js:
   ```bash
   npm start
   ```
3. En otro terminal, ejecutar la app de Next.js:
   ```bash
   npm run dev
   ```
4. Visitar `http://localhost:3000` y solicitar recomendaciones.

Para que las recomendaciones funcionen es necesario tener corriendo un servidor `ollama` local en `http://localhost:11434`.
