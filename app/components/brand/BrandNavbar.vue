<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()
const { locale, t } = useI18n()

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

function switchLocale(nextLocale: 'it' | 'en') {
  locale.value = nextLocale
}
</script>

<template>
  <header class="border-b border-border">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer">
        <img
          src="/images/logo.webp"
          :alt="t('navbar.title')"
          class="h-10 w-10"
        />
        <span class="font-heading font-semibold text-lg hidden sm:inline">{{ t('navbar.title') }}</span>
      </NuxtLink>

      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 text-sm">
          <button
            :class="'cursor-pointer ' + (locale === 'it' ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors')"
            @click="switchLocale('it')"
          >IT</button>
          <span class="text-muted-foreground">/</span>
          <button
            :class="'cursor-pointer ' + (locale === 'en' ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground transition-colors')"
            @click="switchLocale('en')"
          >EN</button>
        </div>

        <button
          @click="toggleColorMode"
          class="cursor-pointer p-1.5 rounded-md text-foreground hover:bg-accent transition-colors"
          :aria-label="colorMode.value === 'dark' ? t('navbar.lightMode') : t('navbar.darkMode')"
        >
          <Sun v-if="colorMode.value === 'dark'" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>
      </div>
    </div>
  </header>
</template>
