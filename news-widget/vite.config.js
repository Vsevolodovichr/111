import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../111/js'), // ← куди зберігати зібраний JS
    emptyOutDir: false, // не очищати всю папку /js
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.jsx'),
      output: {
        entryFileNames: 'news.bundle.js', // ← стабільне ім’я для підключення в HTML
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'vendor.js',
      },
    },
  },
});
