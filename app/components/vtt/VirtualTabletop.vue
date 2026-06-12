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

    <div class="relative z-10 h-full grid grid-cols-[1fr_auto] grid-rows-1 gap-2 p-2">
      <div class="flex-1 min-w-0">
        <VttMapViewer :marker-icon="config.markerIcon" />
      </div>

      <div class="w-72 flex flex-col gap-2 min-h-0">
        <component :is="config.diceComponent" v-if="config.diceComponent" />
        <VttDiceRoller v-else :dice="config.dice" />
        <div class="flex-1 min-h-0">
          <VttSidebar :oracles="config.oracles" />
        </div>
      </div>
    </div>

    <VttOraclesPanel />
  </div>
</template>
