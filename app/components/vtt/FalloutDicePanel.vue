<script setup lang="ts">
import type { DiceRollResult } from '~/types/vtt'
import { rollDie as sharedRollDie, rollChallengeDie } from '~/utils/dice'

const { t } = useI18n()
const { isOpen: isOracleOpen } = useVttSidebar()

const mode = ref<'prova' | 'danni' | 'custom'>('prova')

watch(isOracleOpen, (open) => {
  if (open) mode.value = 'custom'
})

const provaCount = ref(1)
const nb = ref(7)
const successiRichiesti = ref(1)

const danniCount = ref(1)

const customD20 = ref(1)
const customCD = ref(0)

const session = ref<DiceRollResult[]>([])

function rollProva() {
  const values: number[] = []
  for (let i = 0; i < provaCount.value; i++) {
    values.push(sharedRollDie(20))
  }
  const successes = values.filter((v) => v <= nb.value).length
  const passed = successes >= successiRichiesti.value
  session.value.unshift({
    id: crypto.randomUUID(),
    type: 'prova',
    label: `${provaCount.value}D20`,
    values,
    total: values.reduce((a, b) => a + b, 0),
    timestamp: Date.now(),
    successes,
    successesRequired: successiRichiesti.value,
    passed,
  })
  if (session.value.length > 50) session.value = session.value.slice(0, 50)
}

function rollDanni() {
  const values: number[] = []
  const icons: boolean[] = []
  for (let i = 0; i < danniCount.value; i++) {
    const r = rollChallengeDie()
    values.push(r.value)
    icons.push(r.icon)
  }
  session.value.unshift({
    id: crypto.randomUUID(),
    type: 'danni',
    label: `${danniCount.value}CD`,
    values,
    total: values.reduce((a, b) => a + b, 0),
    timestamp: Date.now(),
    icons,
    effects: icons.filter(Boolean).length,
  })
  if (session.value.length > 50) session.value = session.value.slice(0, 50)
}

function rollCustom() {
  if (customD20.value > 0) {
    const values: number[] = []
    for (let i = 0; i < customD20.value; i++) {
      values.push(sharedRollDie(20))
    }
    session.value.unshift({
      id: crypto.randomUUID(),
      type: 'd20',
      label: `${customD20.value}D20`,
      values,
      total: values.reduce((a, b) => a + b, 0),
      timestamp: Date.now(),
    })
  }
  if (customCD.value > 0) {
    const values: number[] = []
    const icons: boolean[] = []
    for (let i = 0; i < customCD.value; i++) {
      const r = rollChallengeDie()
      values.push(r.value)
      icons.push(r.icon)
    }
    session.value.unshift({
      id: crypto.randomUUID(),
      type: 'custom-cd',
      label: `${customCD.value}CD`,
      values,
      total: values.reduce((a, b) => a + b, 0),
      timestamp: Date.now(),
      icons,
      effects: icons.filter(Boolean).length,
    })
  }
  if (session.value.length > 50) session.value = session.value.slice(0, 50)
}

function removeRoll(index: number) {
  session.value.splice(index, 1)
}

function clearSession() {
  session.value = []
}

</script>

<template>
  <div class="bg-black/70 backdrop-blur-sm border border-green-700/50 rounded-lg p-3 text-white">
    <h3 class="text-base font-heading font-semibold text-green-400 mb-3">
      {{ t('vtt.dice.roll') }}
    </h3>

    <div class="flex gap-1 mb-3">
      <button
        v-for="m in (['prova', 'danni', 'custom'] as const)"
        :key="m"
        class="flex-1 px-2 py-1.5 text-base font-heading border rounded transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
        :class="
          mode === m
            ? 'bg-green-700/60 border-green-500 text-white'
            : 'bg-green-900/30 border-green-800/40 text-green-300/80 hover:bg-green-800/50'
        "
        @click="mode = m"
      >
        {{ t(`vtt.dice.${m}`) }}
      </button>
    </div>

    <div v-if="mode === 'prova'" class="flex flex-wrap gap-2 items-end mb-3">
      <div>
        <label class="text-base text-green-300/80 font-heading">{{ t('vtt.dice.count') }} D20</label>
        <input
          v-model.number="provaCount"
          type="number"
          min="1"
          max="5"
          class="block w-16 px-2 py-1 mt-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 transition-colors"
        />
      </div>
      <div>
        <label class="text-base text-green-300/80 font-heading">{{ t('vtt.dice.nb') }}</label>
        <input
          v-model.number="nb"
          type="number"
          min="1"
          max="20"
          class="block w-16 px-2 py-1 mt-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 transition-colors"
        />
      </div>
      <div>
        <label class="text-base text-green-300/80 font-heading">{{ t('vtt.dice.successesRequired') }}</label>
        <input
          v-model.number="successiRichiesti"
          type="number"
          min="1"
          max="10"
          class="block w-16 px-2 py-1 mt-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 transition-colors"
        />
      </div>
      <button
        class="px-3 py-1.5 text-base font-heading bg-green-700/60 hover:bg-green-600/70 border border-green-700/50 rounded text-green-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
        @click="rollProva"
      >
        {{ t('vtt.dice.roll') }}
      </button>
    </div>

    <div v-if="mode === 'danni'" class="flex flex-wrap gap-2 items-end mb-3">
      <div>
        <label class="text-base text-green-300/80 font-heading">{{ t('vtt.dice.count') }} CD</label>
        <input
          v-model.number="danniCount"
          type="number"
          min="1"
          max="10"
          class="block w-16 px-2 py-1 mt-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 transition-colors"
        />
      </div>
      <button
        class="px-3 py-1.5 text-base font-heading bg-green-700/60 hover:bg-green-600/70 border border-green-700/50 rounded text-green-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
        @click="rollDanni"
      >
        {{ t('vtt.dice.roll') }}
      </button>
    </div>

    <div v-if="mode === 'custom'" class="flex flex-wrap gap-2 items-end mb-3">
      <div>
        <label class="text-base text-green-300/80 font-heading">D20</label>
        <input
          v-model.number="customD20"
          type="number"
          min="0"
          max="5"
          class="block w-16 px-2 py-1 mt-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 transition-colors"
        />
      </div>
      <div>
        <label class="text-base text-green-300/80 font-heading">CD</label>
        <input
          v-model.number="customCD"
          type="number"
          min="0"
          max="10"
          class="block w-16 px-2 py-1 mt-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 transition-colors"
        />
      </div>
      <button
        class="px-3 py-1.5 text-base font-heading bg-green-700/60 hover:bg-green-600/70 border border-green-700/50 rounded text-green-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
        @click="rollCustom"
      >
        {{ t('vtt.dice.roll') }}
      </button>
    </div>

    <div v-if="session.length" class="border-t border-green-700/30 pt-2">
      <div class="text-base text-green-300/80 font-heading mb-1">{{ t('vtt.dice.history') }}</div>

      <div class="max-h-48 overflow-y-auto overflow-x-hidden p-1 mb-2 space-y-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-green-900/30 [&::-webkit-scrollbar-thumb]:bg-green-700/50 [&::-webkit-scrollbar-thumb]:rounded">
        <div v-for="r in session" :key="r.id" class="relative p-3 border-t border-green-700/15 first:border-t-0 transition-all duration-300" :class="session[0]?.id === r.id ? 'ring-1 ring-green-400/60 rounded bg-green-900/20' : ''">
          <button
            class="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-[10px] text-green-500/50 hover:text-red-400 transition-colors cursor-pointer"
            @click="removeRoll(i)"
            :aria-label="t('vtt.dice.deleteRoll')"
          >
            ✕
          </button>
          <template v-if="r.type === 'prova'">
            <div class="flex gap-1 items-center flex-wrap">
              <div
                v-for="(v, j) in r.values"
                :key="j"
                class="rounded"
                :class="v <= (r.successesRequired ?? 7) ? 'ring-1 ring-green-500/70' : 'ring-1 ring-red-500/70'"
              >
                <VttDiceFace :value="v" type="d20" />
              </div>
            </div>
            <div class="text-base mt-1">
              <span :class="r.passed ? 'text-green-400' : 'text-red-400'">
                {{ r.successes }}/{{ r.successesRequired }} — {{ r.passed ? t('vtt.dice.passed') : t('vtt.dice.failed') }}
              </span>
            </div>
          </template>

          <template v-if="r.type === 'danni'">
            <div class="flex gap-1 items-center flex-wrap">
              <VttDiceFace
                v-for="(v, j) in r.values"
                :key="j"
                :value="v"
                type="fal-cd"
                :icon="r.icons?.[j] ?? false"
              />
              <span class="text-base text-green-200">→ {{ r.total }} {{ t('vtt.dice.damage') }}</span>
            </div>
            <div class="text-base text-green-200/50 mt-1">
              {{ t('vtt.dice.effects') }}: {{ r.effects }}
            </div>
          </template>

          <template v-if="r.type === 'd20'">
            <div class="flex gap-1 items-center flex-wrap">
              <VttDiceFace
                v-for="(v, j) in r.values"
                :key="j"
                :value="v"
                type="d20"
              />
            </div>
          </template>

          <template v-if="r.type === 'custom-cd'">
            <div class="flex gap-1 items-center flex-wrap">
              <VttDiceFace
                v-for="(v, j) in r.values"
                :key="j"
                :value="v"
                type="fal-cd"
                :icon="r.icons?.[j] ?? false"
              />
              <span class="text-base text-green-200">→ {{ r.total }}</span>
            </div>
            <div class="text-base text-green-200/50 mt-1">
              {{ t('vtt.dice.effects') }}: {{ r.effects }}
            </div>
          </template>
        </div>
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
