<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: () => t('seo.home.title'),
  titleTemplate: false,
})

useSeoMeta({
  ogTitle: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogDescription: () => t('seo.home.description'),
  ogLocale: () => locale.value === 'it' ? 'it_IT' : 'en_US',
})
</script>

<template>
  <div>
    <BrandHeroSection />
  </div>
</template>
