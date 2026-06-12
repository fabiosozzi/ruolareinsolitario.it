<script setup lang="ts">
import type { VttGameConfig } from '~/types/vtt'

defineProps<{
  config: VttGameConfig
}>()

const { t } = useI18n()
</script>

<template>
  <div
    class="relative flex-1 min-h-0 overflow-hidden vtt-root font-terminal"
    :style="{ backgroundImage: `url(${config.background})` }"
  >
    <div class="absolute inset-0 bg-black/40" />

    <div class="relative z-10 h-full grid grid-cols-[auto_1fr_auto] grid-rows-1 gap-2 p-2">
      <div v-if="config.characterComponent" class="w-48 min-h-0">
        <VttCharacterPanel :component="config.characterComponent" />
      </div>
      <div class="flex-1 min-w-0">
        <VttMapViewer :marker-icon="config.markerIcon" />
      </div>

      <div class="w-72 flex flex-col gap-2 min-h-0">
        <VttFalloutDicePanel v-if="config.diceComponent === 'VttFalloutDicePanel'" />
        <VttDiceRoller v-else :dice="config.dice" />
        <div class="flex-1 min-h-0">
          <VttSidebar :oracles="config.oracles" />
        </div>
        <VttPromptsPanel :game-id="config.id" />
      </div>
    </div>

    <VttOraclesPanel />
    <VttCharacterDetailPanel />
  </div>
</template>

<style scoped>
.vtt-root * {
  font-family: "Share Tech Mono", monospace !important;
}
</style>
