import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NUXT_DEVTOOLS !== 'false' },

  css: ['~/assets/css/tailwind.css'],

  modules: [
    '@netlify/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/content',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo'
  ],

  site: {
    url: 'https://ruolareinsolitario.it',
    name: 'Ruolare in solitario',
    description: 'Guide, recensioni e strumenti per il gioco di ruolo in solitario.',
    defaultLocale: 'it',
    indexable: false,
  },

  ogImage: false,

  seo: {
    fallbackTitle: false,
    meta: {
      applicationName: 'Ruolare in solitario',
      themeColor: [
        { content: '#121212', media: '(prefers-color-scheme: dark)' },
        { content: '#FAFAFA', media: '(prefers-color-scheme: light)' },
      ],
      colorScheme: 'dark light',
      ogType: 'website',
    }
  },

  i18n: {
    locales: [
      { code: 'it', language: 'it-IT' },
      { code: 'en', language: 'en-US' }
    ],
    defaultLocale: 'it',
    detectBrowserLanguage: false,
    vueI18n: 'config.ts'
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark'
  },

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },

  app: {
    head: {
      titleTemplate: '%s - %siteName'
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
})
