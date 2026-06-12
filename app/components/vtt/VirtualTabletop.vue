<script setup lang="ts">
import type { VttGameConfig } from '~/types/vtt'

defineProps<{
  config: VttGameConfig
}>()

const { t } = useI18n()
</script>

<template>
  <div
    class="relative flex-1 min-h-0 overflow-hidden"
    :style="{ backgroundImage: `url(${config.background})` }"
  >
    <div class="absolute inset-0 bg-black/40" />

    <div class="relative z-10 h-full grid grid-cols-[auto_1fr_auto] grid-rows-1 gap-2 p-2">
      <div class="w-64 flex flex-col gap-2">
        <VttDiceRoller :dice="config.dice" />
      </div>

      <div class="flex-1 min-w-0">
        <VttMapViewer :marker-icon="config.markerIcon" />
      </div>

      <div class="w-72">
        <VttSidebar :oracles="config.oracles" />
      </div>
    </div>

    <VttOraclesPanel />
  </div>
</template>
