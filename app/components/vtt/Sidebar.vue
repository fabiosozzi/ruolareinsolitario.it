<script setup lang="ts">
import type { OracleConfig } from '~/types/vtt'

defineProps<{
  oracles: OracleConfig[]
}>()

const { t } = useI18n()

const { openOracle, activeOracleId } = useVttSidebar()
</script>

<template>
  <div class="bg-black/70 backdrop-blur-sm border border-green-700/50 rounded-lg p-3 text-white h-full flex flex-col">
    <h3 class="text-base font-heading font-semibold text-green-400 mb-1">
      {{ t('vtt.sidebar.oracles') }}
    </h3>
    <p class="text-sm text-green-400/50 mb-2 font-heading">
      {{ t('vtt.sidebar.oraclesDesc') }}
    </p>

    <div class="flex flex-col gap-1.5 flex-1">
      <button
        v-for="oracle in oracles"
        :key="oracle.id"
        class="w-full px-3 py-2 text-base font-heading text-left border rounded transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
        :class="
          activeOracleId === oracle.id
            ? 'bg-green-700/60 border-green-500 text-white'
            : 'bg-green-900/30 border-green-800/40 text-green-300/80 hover:bg-green-800/50 hover:border-green-700/60'
        "
        @click="openOracle(oracle.id, oracle.component, oracle.label)"
      >
        {{ oracle.label }}
      </button>
    </div>
  </div>
</template>
