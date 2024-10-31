import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['vue']
    },
    lib: {
      entry: './src/index.ts',
      name: 'tabtab',
      fileName: 'index',
      formats: ['cjs', 'es']
    }
  },
  plugins: [vue(), vueJsx(), dts()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // 解决 The legacy JS API is deprecated 提示问题
      }
    }
  }
});
