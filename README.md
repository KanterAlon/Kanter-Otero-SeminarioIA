# Kanter-Otero-SeminarioIA

Ejemplo de aplicación que muestra un listado de productos alimenticios y utiliza un modelo LLM de [Ollama](https://ollama.ai/) para recomendar un producto según las preferencias del usuario.

## Estructura

- `next-app` – Aplicación web con Next.js, React y Tailwind CSS.
- `backend` – API construida con Nest.js que consulta a `ollama`.

## Uso rápido

1. Desde la raíz del repositorio instala todas las dependencias:
   ```bash
   npm install
   ```
2. Levanta la aplicación completa:
   ```bash
   npm run dev
   ```
   Se abrirá automáticamente `http://localhost:3000` en tu navegador.
3. Solicita recomendaciones desde la página.

Para que las recomendaciones funcionen es necesario tener corriendo un servidor `ollama` local en `http://localhost:11434`.
