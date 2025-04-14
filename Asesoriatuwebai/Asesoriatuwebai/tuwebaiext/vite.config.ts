import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Función auxiliar para cargar plugins dinámicamente
function loadCartographerPlugin() {
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    return import("@replit/vite-plugin-cartographer")
      .then((m) => [m.cartographer()])
      .catch(() => []);
  }
  return Promise.resolve([]);
}

// Configuración asíncrona en una función autoejecutable
export default defineConfig(async () => {
  const extraPlugins = await loadCartographerPlugin();

  return {
    plugins: [
      react(),
      runtimeErrorOverlay(),
      themePlugin(),
      ...extraPlugins,
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
  };
});
