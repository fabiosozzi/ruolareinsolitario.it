<script setup lang="ts">
import type { DiceRollResult } from '~/types/vtt'

const { t } = useI18n()

const mode = ref<'prova' | 'danni' | 'custom'>('prova')

const provaCount = ref(1)
const nb = ref(7)
const successiRichiesti = ref(1)

const danniCount = ref(1)

const customD20 = ref(1)
const customCD = ref(0)

const session = ref<DiceRollResult[]>([])

function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

function rollProva() {
  const values: number[] = []
  for (let i = 0; i < provaCount.value; i++) {
    values.push(rollDie(20))
  }
  const successes = values.filter((v) => v <= nb.value).length
  const passed = successes >= successiRichiesti.value
  session.value.unshift({
    type: 'prova',
    label: `${provaCount.value}D20`,
    values,
    total: values.reduce((a, b) => a + b, 0),
    timestamp: Date.now(),
    successes,
    successesRequired: successiRichiesti.value,
    passed,
  })
}

function rollCD(): { value: number; icon: boolean } {
  const raw = rollDie(6)
  if (raw <= 2) return { value: raw === 1 ? 1 : 2, icon: false }
  if (raw >= 5) return { value: 1, icon: true }
  return { value: 0, icon: false }
}

function rollDanni() {
  const values: number[] = []
  const icons: boolean[] = []
  for (let i = 0; i < danniCount.value; i++) {
    const r = rollCD()
    values.push(r.value)
    icons.push(r.icon)
  }
  session.value.unshift({
    type: 'danni',
    label: `${danniCount.value}CD`,
    values,
    total: values.reduce((a, b) => a + b, 0),
    timestamp: Date.now(),
    icons,
    effects: icons.filter(Boolean).length,
  })
}

function rollCustom() {
  if (customD20.value > 0) {
    const values: number[] = []
    for (let i = 0; i < customD20.value; i++) {
      values.push(rollDie(20))
    }
    session.value.unshift({
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
      const r = rollCD()
      values.push(r.value)
      icons.push(r.icon)
    }
    session.value.unshift({
      type: 'custom-cd',
      label: `${customCD.value}CD`,
      values,
      total: values.reduce((a, b) => a + b, 0),
      timestamp: Date.now(),
      icons,
      effects: icons.filter(Boolean).length,
    })
  }
}

function clearSession() {
  session.value = []
}

</script>

<template>
  <div class="bg-black/70 backdrop-blur-sm border border-yellow-700/50 rounded-lg p-3 text-white">
    <h3 class="text-sm font-heading font-semibold text-yellow-400 mb-3">
      {{ t('vtt.dice.roll') }}
    </h3>

    <div class="flex gap-1 mb-3">
      <button
        v-for="m in (['prova', 'danni', 'custom'] as const)"
        :key="m"
        class="flex-1 px-2 py-1.5 text-xs font-heading border rounded transition-colors cursor-pointer"
        :class="
          mode === m
            ? 'bg-yellow-700/60 border-yellow-500 text-white'
            : 'bg-yellow-900/30 border-yellow-800/40 text-yellow-300/80 hover:bg-yellow-800/50'
        "
        @click="mode = m"
      >
        {{ t(`vtt.dice.${m}`) }}
      </button>
    </div>

    <div v-if="mode === 'prova'" class="flex flex-wrap gap-2 items-end mb-3">
      <div>
        <label class="text-[10px] text-yellow-400/70 font-heading">{{ t('vtt.dice.count') }} D20</label>
        <input
          v-model.number="provaCount"
          type="number"
          min="1"
          max="5"
          class="block w-16 px-2 py-1 mt-0.5 text-sm bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors"
        />
      </div>
      <div>
        <label class="text-[10px] text-yellow-400/70 font-heading">{{ t('vtt.dice.nb') }}</label>
        <input
          v-model.number="nb"
          type="number"
          min="1"
          max="20"
          class="block w-16 px-2 py-1 mt-0.5 text-sm bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors"
        />
      </div>
      <div>
        <label class="text-[10px] text-yellow-400/70 font-heading">{{ t('vtt.dice.successesRequired') }}</label>
        <input
          v-model.number="successiRichiesti"
          type="number"
          min="1"
          max="10"
          class="block w-16 px-2 py-1 mt-0.5 text-sm bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors"
        />
      </div>
      <button
        class="px-3 py-1.5 text-sm font-heading bg-yellow-700/60 hover:bg-yellow-600/70 border border-yellow-700/50 rounded text-yellow-100 cursor-pointer"
        @click="rollProva"
      >
        {{ t('vtt.dice.roll') }}
      </button>
    </div>

    <div v-if="mode === 'danni'" class="flex flex-wrap gap-2 items-end mb-3">
      <div>
        <label class="text-[10px] text-yellow-400/70 font-heading">{{ t('vtt.dice.count') }} CD</label>
        <input
          v-model.number="danniCount"
          type="number"
          min="1"
          max="10"
          class="block w-16 px-2 py-1 mt-0.5 text-sm bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors"
        />
      </div>
      <button
        class="px-3 py-1.5 text-sm font-heading bg-yellow-700/60 hover:bg-yellow-600/70 border border-yellow-700/50 rounded text-yellow-100 cursor-pointer"
        @click="rollDanni"
      >
        {{ t('vtt.dice.roll') }}
      </button>
    </div>

    <div v-if="mode === 'custom'" class="flex flex-wrap gap-2 items-end mb-3">
      <div>
        <label class="text-[10px] text-yellow-400/70 font-heading">D20</label>
        <input
          v-model.number="customD20"
          type="number"
          min="0"
          max="5"
          class="block w-16 px-2 py-1 mt-0.5 text-sm bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors"
        />
      </div>
      <div>
        <label class="text-[10px] text-yellow-400/70 font-heading">CD</label>
        <input
          v-model.number="customCD"
          type="number"
          min="0"
          max="10"
          class="block w-16 px-2 py-1 mt-0.5 text-sm bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors"
        />
      </div>
      <button
        class="px-3 py-1.5 text-sm font-heading bg-yellow-700/60 hover:bg-yellow-600/70 border border-yellow-700/50 rounded text-yellow-100 cursor-pointer"
        @click="rollCustom"
      >
        {{ t('vtt.dice.roll') }}
      </button>
    </div>

    <div v-if="session.length" class="border-t border-yellow-700/30 pt-2">
      <div class="text-xs text-yellow-500/70 font-heading mb-1">STORICO</div>

      <div class="max-h-48 overflow-y-auto space-y-2 mb-2">
        <div v-for="(r, i) in session" :key="i" class="pb-2 border-b border-yellow-700/15 last:border-0">
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
            <div class="text-xs mt-1">
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
              <span class="text-xs text-yellow-200">→ {{ r.total }} {{ t('vtt.dice.damage') }}</span>
            </div>
            <div class="text-xs text-yellow-200/50 mt-1">
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
              <span class="text-xs text-yellow-200">→ {{ r.total }}</span>
            </div>
            <div class="text-xs text-yellow-200/50 mt-1">
              {{ t('vtt.dice.effects') }}: {{ r.effects }}
            </div>
          </template>
        </div>
      </div>


      <button
        class="mt-2 w-full px-2 py-1 text-xs text-yellow-400/70 hover:text-yellow-300 border border-yellow-700/30 hover:border-yellow-600/50 rounded transition-colors cursor-pointer"
        @click="clearSession"
      >
        {{ t('vtt.dice.clear') }}
      </button>
    </div>

    <div v-else class="text-xs text-yellow-200/40 italic border-t border-yellow-700/30 pt-2">
      —
    </div>
  </div>
</template>
