import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Book_My_Show_Clone/', // ✅ Add this line
  build: {
    outDir: 'dist', // ✅ Ensure it's set to 'dist'
  },
})
