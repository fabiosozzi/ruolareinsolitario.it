<script setup lang="ts">
defineProps<{
  gameId: string
}>()

const { t, locale } = useI18n()

function promptFilename(gameId: string): string {
  const suffix = locale.value === 'en' ? 'en' : 'it'
  return `/vtt/${gameId}/prompts/${gameId}-map-generation-${suffix}.md`
}
</script>

<template>
  <div class="bg-black/70 backdrop-blur-sm border border-green-700/50 rounded-lg p-3 text-white">
    <h3 class="text-sm font-heading font-semibold text-green-400 mb-3">
      {{ t('vtt.prompts.title') }}
    </h3>

    <div class="flex flex-col gap-1.5">
      <a
        :href="promptFilename(gameId)"
        download
        class="block w-full px-3 py-2 text-xs font-heading text-left border border-green-800/40 text-green-300/80 bg-green-900/30 rounded transition-all hover:bg-green-800/50 hover:border-green-700/60 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-400/60 no-underline"
      >
        {{ t('vtt.prompts.mapGen') }}
      </a>
    </div>

    <p class="text-xs text-green-500/50 mt-2">
      {{ t('vtt.prompts.hint') }}
    </p>
  </div>
</template>
