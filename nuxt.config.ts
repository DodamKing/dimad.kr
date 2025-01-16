// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: true,

  app: {
    head: {
      title: 'DIMAD',
      meta: [
        { charset: 'utf-8'},
        { name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI
  }
})
