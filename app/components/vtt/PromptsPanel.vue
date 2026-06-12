<script setup lang="ts">
defineProps<{
  gameId: string
}>()

const { t, locale } = useI18n()

async function downloadPrompt() {
  const file = locale.value === 'en' ? '/vtt/fallout/prompts/fallout-map-generation-en.md' : '/vtt/fallout/prompts/fallout-map-generation-it.md'
  const resp = await fetch(file)
  const text = await resp.text()
  const blob = new Blob([text], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.split('/').pop()!
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="bg-black/70 backdrop-blur-sm border border-green-700/50 rounded-lg p-3 text-white">
    <h3 class="text-base font-heading font-semibold text-green-400 mb-1">
      {{ t('vtt.prompts.title') }}
    </h3>
    <p class="text-sm text-green-400/50 mb-2 font-heading">
      {{ t('vtt.prompts.desc') }}
    </p>

    <div class="flex flex-col gap-1.5">
      <button
        class="w-full px-3 py-2 text-sm font-heading text-left border border-green-800/40 text-green-300/80 bg-green-900/30 rounded transition-all hover:bg-green-800/50 hover:border-green-700/60 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-400/60"
        @click="downloadPrompt"
      >
        {{ t('vtt.prompts.mapGen') }}
      </button>
    </div>

    <p class="text-sm text-green-500/50 mt-2">
      {{ t('vtt.prompts.hint') }}
    </p>
  </div>
</template>
