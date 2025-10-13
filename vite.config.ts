import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "AU DAM FORESTAL",
        short_name: "AU DAM",
        description: "Gestion administrativa de AU DAM FORESTAL",
        theme_color: "#ffffff",
        background_color: "#000000",
        display: "fullscreen",
        start_url: "/iniciar-sesion",
        icons: [
          {
            src: "",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:5173\/.*$/, // Patrón para manejar las solicitudes del localhost.
            handler: "NetworkFirst", // Intenta primero la red y luego la caché.
            options: {
              cacheName: "local-cache", // Nombre de la caché para estas solicitudes.
              expiration: {
                maxEntries: 50, // Máximo de recursos en caché.
                maxAgeSeconds: 86400, // Duración máxima en la caché (1 día).
              },
            },
          },
        ],
      },
    }),
  ],
});
