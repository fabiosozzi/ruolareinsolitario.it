<script setup lang="ts">
import type { OracleConfig } from '~/types/vtt'

defineProps<{
  oracles: OracleConfig[]
}>()

const { t } = useI18n()

const { openOracle, activeOracleId } = useVttSidebar()
</script>

<template>
  <div class="bg-black/70 backdrop-blur-sm border border-yellow-700/50 rounded-lg p-3 text-white h-full flex flex-col">
    <h3 class="text-sm font-heading font-semibold text-yellow-400 mb-3">
      {{ t('vtt.sidebar.oracles') }}
    </h3>

    <div class="flex flex-col gap-1.5 flex-1">
      <button
        v-for="oracle in oracles"
        :key="oracle.id"
        class="w-full px-3 py-2 text-xs font-heading text-left border rounded transition-colors cursor-pointer"
        :class="
          activeOracleId === oracle.id
            ? 'bg-yellow-700/60 border-yellow-500 text-white'
            : 'bg-yellow-900/30 border-yellow-800/40 text-yellow-300/80 hover:bg-yellow-800/50 hover:border-yellow-700/60'
        "
        @click="openOracle(oracle.id, oracle.component)"
      >
        {{ oracle.label }}
      </button>
    </div>
  </div>
</template>
