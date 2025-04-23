import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default async () => {
  // Garantindo que plugins seja sempre um array
  const plugins: Array<any> = [react()];

  if (process.env.NODE_ENV !== "production") {
    plugins.push(runtimeErrorOverlay());
  }

  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }

  return defineConfig({
    base: '/',
    plugins,  // Garantir que plugins seja um array de plugins
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
      sourcemap: process.env.NODE_ENV === "production" ? false : true,
    },
  });
};
