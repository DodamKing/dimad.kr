// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: false,

  app: {
    head: {
      title: 'DIMAD',
      meta: [
        { charset: 'utf-8'},
        { name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {
          name: "description",
          content: "디지털 노마드, 디마드의 홈페이지",
        },
        {
          name: 'google-site-verification',
          content: 'PlYdRNSi1zGbnQC-1UtvTw81FjJ-zoEHv4n_V4dW360'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css' }
      ],
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
    'nuxt-simple-sitemap',
  ],

  plugins: [
    '~/plugins/apexcharts.client.ts',
  ],

  build: {
    transpile: ['fabric', 'recharts', 'vue3-apexcharts']
  },

  // nitro: {
  //   preset: 'vercel'
  // },

  css: [
    'vue-toastification/dist/index.css',
    '~/assets/css/main.css',
  ],

  gtag: {
    id: 'G-JBWHRH0P1Q'
  },

  sitemap: {
    urls: [
      'https://dimad.kr'
    ],
    exclude: [
      '/api-test',
      '/thumbnail-maker'
    ]
  },
})
