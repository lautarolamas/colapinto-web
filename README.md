# Franco Colapinto · fan site

Fan site no oficial de Franco Colapinto, inspirado en la experiencia de [landonorris.com](https://landonorris.com): preloader, scroll suave, textos que se revelan letra por letra, historia en scroll horizontal, contadores, marquesinas, cursor propio y cascos que giran con el mouse. Todo bien argentino: celeste, blanco y Sol de Mayo.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [GSAP](https://gsap.com) + ScrollTrigger para las animaciones
- [Lenis](https://lenis.darkroom.engineering) para el scroll suave

## Correrlo local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000.

## Deploy en Vercel

Importá el repo en https://vercel.com/new. Vercel detecta Next.js solo, no hace falta configurar nada.

## Contenido

Los datos de la carrera están en `app/data.js` (actualizados a octubre de 2026). Las ilustraciones (sol, cascos, firma) son SVG originales en `app/components/Art.jsx`.

Este sitio no está afiliado a Franco Colapinto, Alpine ni la Fórmula 1.
