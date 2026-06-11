<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    class="relative isolate flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden bg-[url('/images/background_hero_homepage.png')] bg-cover bg-center px-4 py-24 text-center text-white"
  >
    <div class="absolute inset-0 -z-10 bg-black/65" />

    <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-4">
      {{ t('hero.title') }}
    </h1>

    <p class="text-xl md:text-2xl text-primary font-semibold mb-6 drop-shadow-sm">
      {{ t('hero.subtitle') }}
    </p>

    <p class="text-lg text-white/90 max-w-xl mb-6">
      {{ t('hero.description') }}
    </p>

    <p class="text-sm text-white/75 italic">
      {{ t('hero.notice') }}
    </p>
  </section>
</template>
