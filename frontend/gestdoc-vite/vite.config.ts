import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Gestdoc",
        short_name: "Gestdoc",
        description: "Sistema institucional de gestão documental",
        theme_color: "#0A1A2F",
        background_color: "#FFFFFF",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }: { request: Request }) =>
              request.destination === "document",
            handler: "NetworkFirst",
            options: { cacheName: "html-cache" }
          },
          {
            urlPattern: ({ request }: { request: Request }) =>
              ["script", "style"].includes(request.destination),
            handler: "StaleWhileRevalidate",
            options: { cacheName: "asset-cache" }
          },
          {
            urlPattern: ({ request }: { request: Request }) =>
              ["image", "font"].includes(request.destination),
            handler: "CacheFirst",
            options: { cacheName: "static-cache" }
          }
        ]
      }
    })
  ],

  base: "./",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@services": path.resolve(__dirname, "src/services"),
      "@context": path.resolve(__dirname, "src/context"),
      "@utils": path.resolve(__dirname, "src/utils")
    }
  },

  server: {
    port: 5173,
    open: true,
    strictPort: true
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          xlsx: ["xlsx"],
          ui: ["@headlessui/react", "@heroicons/react"]
        }
      }
    }
  }
});

