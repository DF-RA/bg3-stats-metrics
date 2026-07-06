import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('estadisticas', 'routes/estadisticas.tsx'),
  route('laboratorio', 'routes/laboratorio.tsx'),
] satisfies RouteConfig;
