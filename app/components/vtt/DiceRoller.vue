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
  <div class="bg-black/70 backdrop-blur-sm border border-green-700/50 rounded-lg p-3 text-white">
    <h3 class="text-base font-heading font-semibold text-green-400 mb-3">
      {{ t('vtt.dice.roll') }}
    </h3>

    <div class="flex flex-wrap gap-1.5 mb-3">
      <button
        v-for="die in dice"
        :key="die.type"
        class="px-3 py-1.5 text-base font-heading bg-green-800/40 hover:bg-green-700/60 border border-green-700/50 rounded transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
        @click="roll(die)"
      >
        {{ die.label }}
      </button>
    </div>

    <div v-if="session.length" class="border-t border-green-700/30 pt-2">
      <div class="text-base text-green-300/80 font-heading mb-1">{{ t('vtt.dice.history') }}</div>

      <div class="max-h-40 overflow-y-auto mb-2">
        <div class="grid grid-cols-3 gap-1">
          <div
            v-for="(r, i) in session"
            :key="r.id"
            class="flex items-center gap-1 text-base"
          >
            <VttDiceFace :value="r.total" :type="r.type" :icon="r.icon" />
            <span class="text-green-200">→{{ r.total }}</span>
          </div>
        </div>
      </div>

      <div class="text-base flex items-center gap-2 pt-1.5 border-t border-green-700/30">
        <span class="text-green-400 font-heading font-semibold">{{ t('vtt.dice.total') }}</span>
        <span class="text-white font-bold">{{ grandTotal }}</span>
      </div>

      <button
        class="mt-2 w-full px-2 py-1 text-base text-green-300/80 hover:text-green-300 border border-green-700/30 hover:border-green-600/50 rounded transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-green-400/60"
        @click="clearSession"
      >
        {{ t('vtt.dice.clear') }}
      </button>
    </div>

    <div v-else class="text-base text-green-200/40 italic border-t border-green-700/30 pt-2">
      —
    </div>
  </div>
</template>
