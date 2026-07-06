# BG3 Stats Metrics

Panel de estadísticas y escalados de **Baldur's Gate 3**. SPA estática, sin
backend: los datos del juego van empaquetados y todo el cálculo ocurre en el
cliente. Desarrollo dirigido por componentes con Storybook.

## Stack

- **React Router v7** (framework mode, **SPA** con `ssr: false`) + **React 19** + **TypeScript**
- **Material UI v9** + Emotion, con un tema inspirado en BG3 (oro/carmesí/pergamino)
- **Storybook 10** (`@storybook/react-vite`) conectado al tema, con addons de
  a11y, docs y tests (Vitest)
- Fuentes self-hosted vía `@fontsource` (Cinzel + EB Garamond)

## Estructura

```
app/                   # capa de framework (React Router)
├─ root.tsx            # document + ThemeProvider + CssBaseline + fuentes
├─ routes.ts           # configuración de rutas
├─ routes/             # rutas de la SPA
└─ app.css             # estilos globales mínimos

src/                   # design system (agnóstico del framework)
├─ components/
│  ├─ atoms/ · molecules/ · organisms/ · templates/
├─ theme/              # palette.ts, theme.ts (bg3Theme), Foundations story
└─ domain/             # lógica pura de stats (modificadores, competencia, DC…)
```

El código de `src/` no depende de React Router: los componentes se construyen
en Storybook y se ensamblan en las rutas de `app/`.

> **"Remix" = React Router v7.** El modelo de este proyecto (rutas basadas en
> archivos, `root.tsx` con `Meta`/`Links`/`Outlet`, `loader`s, SSR/SPA) es el de
> Remix, pero el equipo de Remix fusionó Remix v2 en **React Router v7** a
> finales de 2024 ("Remix *is* React Router now"). Por eso usamos los paquetes
> `react-router` / `@react-router/dev` en vez de `@remix-run/*` (Remix v2, en
> mantenimiento). Remix v3 es un proyecto aparte y **no** es lo que usamos. La
> doc de referencia es la de React Router v7; los tutoriales de `v2.remix.run`
> aplican en concepto, pero cambian imports y algunos APIs.

## Comandos

```bash
pnpm dev         # SPA en desarrollo (http://localhost:5173)
pnpm build       # export estático a build/client/ (desplegable sin Node)
pnpm sb          # Storybook (http://localhost:6006)
pnpm build-sb    # build estático de Storybook
pnpm typecheck   # react-router typegen + tsc
pnpm lint        # ESLint
```

## Metodología

Se construyen los componentes de forma aislada en Storybook (atoms → molecules
→ organisms → templates) y luego se ensamblan en las rutas de `app/`, como un
rompecabezas. La lógica de dominio (`src/domain`) es pura y testeable, sin UI.

## Despliegue

`pnpm build` genera una SPA estática en `build/client/` (HTML/CSS/JS), lista
para cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages…) sin
servidor Node.
