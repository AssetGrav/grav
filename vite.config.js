import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],

  define: {
    API_KEY: JSON.stringify(process.env.VITE_REACT_APP_API_KEY),
    AUTH_DOMAIN: JSON.stringify(process.env.VITE_REACT_APP_AUTH_DOMAIN),
    DATABASE_URL: JSON.stringify(process.env.VITE_REACT_APP_DATABASE_URL),
    PROJECT_ID: JSON.stringify(process.env.VITE_REACT_APP_PROJECT_ID),
    STORAGE_BUCKET: JSON.stringify(process.env.VITE_REACT_APP_STORAGE_BUCKET),
    MESSAGING_SENDER_ID: JSON.stringify(
      process.env.VITE_REACT_APP_MESSAGING_SENDER_ID
    ),
    APP_ID: JSON.stringify(process.env.VITE_REACT_APP_APP_ID),
  },
  resolve: {
    alias: {
      web3: "web3/dist/web3.min.js",
    },
  },
});
