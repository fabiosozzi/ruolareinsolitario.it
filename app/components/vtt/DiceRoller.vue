<script setup lang="ts">
import type { DiceConfig, DiceRollResult } from '~/types/vtt'

const props = defineProps<{
  dice: DiceConfig[]
}>()

const { t } = useI18n()
const { rollDice, rollChallengeDie, rollD100 } = useDiceRoller()

const session = ref<DiceRollResult[]>([])

function roll(config: DiceConfig) {
  if (config.type === 'fal-cd') {
    const count = config.defaultCount ?? 1
    for (let i = 0; i < count; i++) {
      session.value.push(rollChallengeDie())
    }
  } else if (config.type === 'd100') {
    session.value.push(rollD100())
  } else {
    const count = config.defaultCount ?? 1
    session.value.push(rollDice(config, count))
  }
}

function clearSession() {
  session.value = []
}

const grandTotal = computed(() =>
  session.value.reduce((sum, r) => sum + r.total, 0)
)
</script>

<template>
  <div class="bg-black/70 backdrop-blur-sm border border-yellow-700/50 rounded-lg p-3 text-white">
    <h3 class="text-sm font-heading font-semibold text-yellow-400 mb-3">
      {{ t('vtt.dice.roll') }}
    </h3>

    <div class="flex flex-wrap gap-1.5 mb-3">
      <button
        v-for="die in dice"
        :key="die.type"
        class="px-3 py-1.5 text-xs font-heading bg-yellow-800/40 hover:bg-yellow-700/60 border border-yellow-700/50 rounded transition-colors cursor-pointer"
        @click="roll(die)"
      >
        {{ die.label }}
      </button>
    </div>

    <div v-if="session.length" class="border-t border-yellow-700/30 pt-2">
      <div class="text-xs text-yellow-500/70 font-heading mb-1">TIRI</div>

      <div class="max-h-40 overflow-y-auto mb-2">
        <div class="grid grid-cols-3 gap-1">
          <div
            v-for="(r, i) in session"
            :key="i"
            class="flex items-center gap-1 text-xs"
          >
            <VttDiceFace :value="r.total" :type="r.type" :icon="r.icon" />
            <span class="text-yellow-200">→{{ r.total }}</span>
          </div>
        </div>
      </div>

      <div class="text-sm flex items-center gap-2 pt-1.5 border-t border-yellow-700/30">
        <span class="text-yellow-400 font-heading font-semibold">TOT</span>
        <span class="text-white font-bold">{{ grandTotal }}</span>
      </div>

      <button
        class="mt-2 w-full px-2 py-1 text-xs text-yellow-400/70 hover:text-yellow-300 border border-yellow-700/30 hover:border-yellow-600/50 rounded transition-colors cursor-pointer"
        @click="clearSession"
      >
        Cancella tiri
      </button>
    </div>

    <div v-else class="text-xs text-yellow-200/40 italic border-t border-yellow-700/30 pt-2">
      —
    </div>
  </div>
</template>
