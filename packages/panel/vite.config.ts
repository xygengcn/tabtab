import { defineConfig, type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';
import manifestJson from './mainifest';
import packageConfig from './package.json';

const appVersion = packageConfig.version;

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            console.log(1111, tag);
            return tag.startsWith('thy-clock'); // 忽略报错提示
          }
        }
      }
    }),
    vueJsx(),
    VitePWA({
      base: '/',
      devOptions: { enabled: false },
      manifest: manifestJson as any,
      registerType: 'autoUpdate',
      workbox: {
        cacheId: 'tabtab-cache',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://tabtab.xygeng.cn',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'tabtab',
              cacheableResponse: {
                statuses: [200]
              }
            }
          },
          {
            urlPattern: /.*\.[js|json|css].*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'tabtab-xygengcn-js',
              expiration: {
                maxEntries: 50, // 最多缓存30个，超过的按照LRU原则删除
                maxAgeSeconds: 30 * 24 * 60 * 60
              },
              cacheableResponse: {
                statuses: [200]
              }
            }
          }
        ],
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,json}', 'https://tabtab.xygeng.cn/**/*']
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: /^~(.*)$/,
        replacement: '$1'
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ]
  },
  server: {
    host: '0.0.0.0'
  },
  define: {
    __APP_VERSION__: JSON.stringify(appVersion)
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // 解决 The legacy JS API is deprecated 提示问题
      }
    }
  }
});
