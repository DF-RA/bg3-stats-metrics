import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SPA estática: genera HTML/CSS/JS en `out/`, sin servidor Node.
  // La navegación entre rutas es client-side (se comporta como SPA).
  output: "export",

  // Requerido para export estático si se usa next/image (no hay optimizador en runtime).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
