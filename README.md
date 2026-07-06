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
