import { defineConfig } from "vite";
import { createVuePlugin as vue } from "vite-plugin-vue2";

const path = require("path");
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
            "@": path.resolve(__dirname, "./src")
        }
    },
    server: {
        port: 8080,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true
            }
        }
    },
    test: {
        globals: true,
        environment: "jsdom"
    }
});
