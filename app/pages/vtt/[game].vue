<script setup lang="ts">
definePageMeta({ layout: 'vtt' })

const { config, loading, error } = useVttGame()

useHead({
  title: () => config.value?.name ?? 'Virtual Tabletop',
})

const { t } = useI18n()
</script>

<template>
  <div class="flex-1 min-h-0 flex flex-col overflow-hidden">
    <div v-if="loading" class="flex-1 flex items-center justify-center bg-background">
      <p class="text-muted-foreground">Loading...</p>
    </div>

    <div v-else-if="error || !config" class="flex-1 flex items-center justify-center bg-background">
      <div class="text-center">
        <p class="text-destructive font-heading text-lg">{{ error ?? 'Game not found' }}</p>
        <NuxtLink to="/vtt" class="text-primary underline mt-2 inline-block">
          {{ t('vtt.title') }}
        </NuxtLink>
      </div>
    </div>

    <VttVirtualTabletop v-else :config="config" class="flex-1 min-h-0" />
  </div>
</template>
