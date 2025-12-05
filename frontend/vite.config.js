import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/WebDev_Project_HtmlKings/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main:    resolve(__dirname, "index.html"),
        about:   resolve(__dirname, "about.html"),
        contacts: resolve(__dirname, "contacts.html"),
        shop:    resolve(__dirname, "shop.html"),
      },
    },
  },
});