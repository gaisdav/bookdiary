import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    server: {
      open: true,
      port: 5001,
    },
    envPrefix: 'BOOK',
    base: isDev ? '/' : '/bookdiary/',
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
      VitePWA({
        registerType: 'prompt',
        injectRegister: false,

        pwaAssets: {
          disabled: false,
          config: true,
        },

        manifest: {
          name: 'Bookdiary!',
          short_name: 'Bookdiary!',
          description: 'Bookdiary',
          theme_color: '#1c1c1e',
          background_color: '#1c1c1e',
          display: 'standalone',
          orientation: 'portrait',
          display_override: ['window-controls-overlay'],
          shortcuts: [
            {
              name: 'Find book',
              url: '/books',
              description: 'Find your favorite book',
            },
            {
              name: 'Profile',
              url: '/profile',
            },
          ],
          screenshots: [
            {
              src: 'search.jpeg',
              sizes: '591x1280',
              type: 'image/webp',
            },
          ],
          categories: [
            'books',
            'reading',
            'library',
            'diary',
            'notes',
            'bookmarks',
            'reviews',
          ],
        },

        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          navigateFallback: 'index.html',
        },

        devOptions: {
          enabled: false,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  };
});
