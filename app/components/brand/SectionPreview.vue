<script setup lang="ts">
defineProps<{
  title: string
  description: string
  emptyText: string
  ctaText: string
  ctaTo: string
}>()
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold tracking-tight mb-3">{{ title }}</h2>
        <p class="text-muted-foreground max-w-lg mx-auto">{{ description }}</p>
      </div>

      <div class="text-center py-12 text-muted-foreground">
        <p>{{ emptyText }}</p>
      </div>

      <div class="text-center mt-8">
        <Button as="NuxtLink" :to="ctaTo" variant="outline" size="lg">
          {{ ctaText }}
        </Button>
      </div>
    </div>
  </section>
</template>
