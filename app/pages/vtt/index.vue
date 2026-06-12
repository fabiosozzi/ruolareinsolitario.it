<script setup lang="ts">
import type { VttGameConfig } from '~/types/vtt'
import { getAllGameConfigs } from '~/composables/useVttGame'

definePageMeta({ layout: 'vtt' })

const { t } = useI18n()

const configs = ref<VttGameConfig[]>([])

onMounted(async () => {
  configs.value = await getAllGameConfigs()
})
</script>

<template>
  <div class="h-full overflow-y-auto bg-background">
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-heading font-bold text-center mb-4">
        {{ t('vtt.title') }}
      </h1>
      <p class="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
        {{ t('vtt.selectGame') }}
      </p>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        <NuxtLink
          v-for="game in configs"
          :key="game.id"
          :to="`/vtt/${game.id}`"
          class="group block p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
        >
          <h2 class="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
            {{ game.name }}
          </h2>
          <p class="text-sm text-muted-foreground">
            {{ game.description }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
