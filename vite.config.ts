import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: false, // keep original size,
        replaceAttrValues: {
          "#e6e6e6": "#2eb774",
          "#f2f2f2": "#41dc8e",
    
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
})
