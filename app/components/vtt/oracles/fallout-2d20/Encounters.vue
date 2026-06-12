<script setup lang="ts">
const { t } = useI18n()
const { characters, selectedCharacterId } = useCharacters()
import { dimensions } from '~/utils/fallout-2d20'

type TableId = 'matrix' | `cat-${number}`

const rolledValues = ref<Record<TableId, number | null>>({
  matrix: null,
  'cat-0': null,
  'cat-1': null,
  'cat-2': null,
  'cat-3': null,
})

function rollForTable(id: TableId) {
  rolledValues.value[id] = Math.floor(Math.random() * 20) + 1
}

function isHighlighted(id: TableId, row: { d20Min: number; d20Max: number }): boolean {
  const v = rolledValues.value[id]
  if (v === null) return false
  return v >= row.d20Min && v <= row.d20Max
}

interface LevelRow {
  d20Min: number
  d20Max: number
  results: string[]
}

interface LevelBand {
  levelMin: number
  levelMax: number
  rows: LevelRow[]
}

const levelBands: LevelBand[] = [
  {
    levelMin: 1, levelMax: 4,
    rows: [
      { d20Min: 1, d20Max: 5, results: ['none', 'none', 'none', 'track'] },
      { d20Min: 6, d20Max: 8, results: ['track', 'track', 'track', 'track'] },
      { d20Min: 9, d20Max: 11, results: ['survivor_1', 'survivor_2', 'enemies_2', 'enemies_2'] },
      { d20Min: 12, d20Max: 14, results: ['enemies_2', 'enemies_2', 'enemies_4', 'enemies_4'] },
      { d20Min: 15, d20Max: 16, results: ['enemies_4', 'enemies_4', 'enemies_6', 'elite_2'] },
      { d20Min: 17, d20Max: 18, results: ['elite_2', 'elite_2', 'elite_2', 'elite_2'] },
      { d20Min: 19, d20Max: 19, results: ['boss_local', 'boss_local', 'boss_local', 'boss_local'] },
      { d20Min: 20, d20Max: 20, results: ['special_event', 'special_event', 'special_event', 'special_event'] },
    ],
  },
  {
    levelMin: 5, levelMax: 8,
    rows: [
      { d20Min: 1, d20Max: 4, results: ['none', 'track', 'track', 'track'] },
      { d20Min: 5, d20Max: 7, results: ['track', 'track', 'enemies_2', 'enemies_4'] },
      { d20Min: 8, d20Max: 10, results: ['survivor_1', 'enemies_2', 'enemies_4', 'enemies_6'] },
      { d20Min: 11, d20Max: 13, results: ['enemies_2', 'enemies_4', 'enemies_6', 'enemies_6'] },
      { d20Min: 14, d20Max: 16, results: ['enemies_4', 'enemies_6', 'elite_2', 'elite_2'] },
      { d20Min: 17, d20Max: 19, results: ['boss_local', 'boss_local', 'boss_local', 'boss_local'] },
      { d20Min: 20, d20Max: 20, results: ['special_event', 'special_event', 'special_event', 'special_event'] },
    ],
  },
  {
    levelMin: 9, levelMax: 12,
    rows: [
      { d20Min: 1, d20Max: 3, results: ['track', 'track', 'track', 'track'] },
      { d20Min: 4, d20Max: 6, results: ['track', 'enemies_2', 'enemies_4', 'enemies_3'] },
      { d20Min: 7, d20Max: 9, results: ['enemies_2', 'enemies_3', 'enemies_6', 'enemies_6'] },
      { d20Min: 10, d20Max: 12, results: ['enemies_3', 'enemies_4', 'elite_2', 'elite_2'] },
      { d20Min: 13, d20Max: 15, results: ['elite_2', 'elite_2', 'elite_4', 'boss_local'] },
      { d20Min: 16, d20Max: 19, results: ['boss_local', 'boss_local', 'boss_local', 'boss_local'] },
      { d20Min: 20, d20Max: 20, results: ['special_event', 'special_event', 'special_event', 'special_event'] },
    ],
  },
  {
    levelMin: 13, levelMax: 99,
    rows: [
      { d20Min: 1, d20Max: 2, results: ['track', 'track', 'track', 'track'] },
      { d20Min: 3, d20Max: 5, results: ['enemies_2', 'enemies_4', 'enemies_6', 'enemies_6'] },
      { d20Min: 6, d20Max: 8, results: ['enemies_4', 'enemies_6', 'enemies_6', 'elite_6'] },
      { d20Min: 9, d20Max: 11, results: ['enemies_4', 'elite_2', 'elite_2', 'elite_2'] },
      { d20Min: 12, d20Max: 14, results: ['elite_4', 'elite_2', 'boss_local', 'boss_local'] },
      { d20Min: 15, d20Max: 17, results: ['boss_local', 'boss_escort', 'boss_escort', 'boss_escort'] },
      { d20Min: 18, d20Max: 19, results: ['boss_escort', 'boss_escort', 'legendary_threat', 'legendary_threat'] },
      { d20Min: 20, d20Max: 20, results: ['special_event', 'special_event', 'major_event', 'major_event'] },
    ],
  },
]

interface LocationRow {
  d20Min: number
  d20Max: number
  resultKey: string
}

interface LocationTable {
  titleKey: string
  rows: LocationRow[]
}

const locationTables: LocationTable[] = [
  {
    titleKey: 'vtt.oracles.encounters.locations.settlements',
    rows: [
      { d20Min: 1, d20Max: 3, resultKey: 'radroach' },
      { d20Min: 4, d20Max: 6, resultKey: 'molerat' },
      { d20Min: 7, d20Max: 9, resultKey: 'stray_dog' },
      { d20Min: 10, d20Max: 12, resultKey: 'raider' },
      { d20Min: 13, d20Max: 15, resultKey: 'feral_ghoul' },
      { d20Min: 16, d20Max: 17, resultKey: 'raider_veteran' },
      { d20Min: 18, d20Max: 19, resultKey: 'yao_guai' },
      { d20Min: 20, d20Max: 20, resultKey: 'mirelurk' },
    ],
  },
  {
    titleKey: 'vtt.oracles.encounters.locations.hospitals',
    rows: [
      { d20Min: 1, d20Max: 3, resultKey: 'feral_ghoul' },
      { d20Min: 4, d20Max: 6, resultKey: 'feral_ghoul_2' },
      { d20Min: 7, d20Max: 9, resultKey: 'service_robot' },
      { d20Min: 10, d20Max: 12, resultKey: 'raiders' },
      { d20Min: 13, d20Max: 15, resultKey: 'mirelurk' },
      { d20Min: 16, d20Max: 17, resultKey: 'super_mutant' },
      { d20Min: 18, d20Max: 19, resultKey: 'assaultron' },
      { d20Min: 20, d20Max: 20, resultKey: 'deathclaw' },
    ],
  },
  {
    titleKey: 'vtt.oracles.encounters.locations.factories',
    rows: [
      { d20Min: 1, d20Max: 3, resultKey: 'protectron' },
      { d20Min: 4, d20Max: 6, resultKey: 'security_robot' },
      { d20Min: 7, d20Max: 9, resultKey: 'raiders' },
      { d20Min: 10, d20Max: 12, resultKey: 'feral_ghouls' },
      { d20Min: 13, d20Max: 15, resultKey: 'super_mutants' },
      { d20Min: 16, d20Max: 17, resultKey: 'assaultron' },
      { d20Min: 18, d20Max: 19, resultKey: 'sentry_bot' },
      { d20Min: 20, d20Max: 20, resultKey: 'deathclaw' },
    ],
  },
  {
    titleKey: 'vtt.oracles.encounters.locations.military',
    rows: [
      { d20Min: 1, d20Max: 3, resultKey: 'military_robot' },
      { d20Min: 4, d20Max: 6, resultKey: 'armed_protectron' },
      { d20Min: 7, d20Max: 9, resultKey: 'assaultron' },
      { d20Min: 10, d20Max: 12, resultKey: 'super_mutant' },
      { d20Min: 13, d20Max: 15, resultKey: 'super_mutant_veteran' },
      { d20Min: 16, d20Max: 17, resultKey: 'sentry_bot' },
      { d20Min: 18, d20Max: 19, resultKey: 'deathclaw' },
      { d20Min: 20, d20Max: 20, resultKey: 'behemoth' },
    ],
  },
]

function rangeLabel(row: { d20Min: number; d20Max: number }): string {
  return row.d20Min === row.d20Max ? `${row.d20Min}` : `${row.d20Min}–${row.d20Max}`
}

function levelLabel(band: LevelBand): string {
  return band.levelMax === 99 ? `${band.levelMin}+` : `${band.levelMin}–${band.levelMax}`
}

const activeBand = ref<LevelBand | null>(null)

watch(
  [selectedCharacterId, () => characters.value.map((c) => c.data?.level)],
  () => {
    let c = characters.value.find((ch) => ch.id === selectedCharacterId.value)
    if (!c && characters.value.length) c = characters.value[0]
    if (!c) { activeBand.value = null; return }
    const level = c.data?.level
    if (typeof level !== 'number') { activeBand.value = null; return }
    activeBand.value = levelBands.find((b) => level >= b.levelMin && level <= b.levelMax) ?? null
  },
  { immediate: true },
)
</script>

<template>
  <div class="oracle-panel">
    <div class="bg-black/70 backdrop-blur-sm border border-green-700/50 rounded-lg p-2.5 printable">
      <div class="flex items-center gap-2 mb-2 border-b border-green-700/30 pb-1.5">
        <span class="text-base">☠</span>
        <h3 class="text-sm font-heading font-bold text-green-400 tracking-wider">
          {{ t('vtt.oracles.encounters.title') }}
        </h3>
      </div>

      <div class="flex items-end gap-2 mb-2">
        <h3 class="text-base font-heading font-semibold text-green-400 flex-1">
          {{ t('vtt.oracles.encounters.encounterMatrix') }}
        </h3>
        <div v-if="rolledValues.matrix !== null" class="text-sm text-green-400 font-heading whitespace-nowrap">
          {{ t('vtt.oracles.encounters.result') }}: {{ rolledValues.matrix }}
        </div>
        <button
          class="px-2 py-1 text-xs font-heading bg-green-700/60 hover:bg-green-600/70 border border-green-700/50 rounded text-green-100 cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
          @click="rollForTable('matrix')"
        >
          1d20
        </button>
      </div>

      <div class="overflow-x-auto mb-2">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-green-900/40">
              <th class="border border-green-700/30 px-1 py-0.5 text-green-400 font-heading text-left">
                {{ t('vtt.oracles.encounters.levels') }}
              </th>
              <th class="border border-green-700/30 px-1 py-0.5 text-green-400 font-heading text-left w-6">
                {{ t('vtt.oracles.structures.d20') }}
              </th>
              <th
                v-for="dim in dimensions"
                :key="dim"
                class="border border-green-700/30 px-1 py-0.5 text-green-400 font-heading text-left"
              >
                {{ t(`vtt.oracles.structures.dimensions.${dim}`) }}
              </th>
            </tr>
          </thead>
          <tbody v-if="activeBand">
            <template v-for="(row, ri) in activeBand.rows" :key="ri">
              <tr
                class="even:bg-green-900/10 transition-colors duration-300"
                :class="isHighlighted('matrix', row) ? 'bg-green-700/30 ring-1 ring-green-500/60' : ''"
              >
                <td
                  v-if="ri === 0"
                  :rowspan="activeBand.rows.length"
                  class="border border-green-700/30 px-1 py-0.5 text-green-300 font-heading align-top"
                >
                  {{ levelLabel(activeBand) }}
                </td>
                <td class="border border-green-700/30 px-1 py-0.5 text-green-300 font-heading whitespace-nowrap">
                  {{ rangeLabel(row) }}
                </td>
                <td
                  v-for="(res, j) in row.results"
                  :key="j"
                  class="border border-green-700/30 px-1 py-0.5 text-white"
                >
                  {{ t(`vtt.oracles.encounters.results.${res}`) }}
                </td>
              </tr>
            </template>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="border border-green-700/30 px-2 py-3 text-center text-xs text-green-400/40 italic">
                {{ t('vtt.oracles.encounters.selectCharacter') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-base font-heading font-semibold text-green-400 mb-1">
        {{ t('vtt.oracles.encounters.locationTables') }}
      </h3>

      <div class="grid grid-cols-2 gap-3 mb-2">
        <template
          v-for="(loc, li) in locationTables"
          :key="li"
        >
          <div>
            <div class="flex items-center gap-1 mb-0.5">
              <h3 class="text-sm font-heading font-semibold text-green-400 flex-1">
                {{ t(loc.titleKey) }}
              </h3>
              <div v-if="rolledValues[`cat-${li}`] !== null" class="text-xs text-green-400 font-heading whitespace-nowrap">
                {{ t('vtt.oracles.encounters.result') }}: {{ rolledValues[`cat-${li}`] }}
              </div>
              <button
                class="px-2 py-1 text-xs font-heading bg-green-700/60 hover:bg-green-600/70 border border-green-700/50 rounded text-green-100 cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
                @click="rollForTable(`cat-${li}`)"
              >
                1d20
              </button>
            </div>

            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="bg-green-900/40">
                  <th class="border border-green-700/30 px-1 py-0.5 text-green-400 font-heading text-left w-6">
                    {{ t('vtt.oracles.structures.d20') }}
                  </th>
                  <th class="border border-green-700/30 px-1 py-0.5 text-green-400 font-heading text-left">
                    {{ t(loc.titleKey) }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, ri) in loc.rows"
                  :key="ri"
                  class="even:bg-green-900/10 transition-colors duration-300"
                  :class="isHighlighted(`cat-${li}`, row) ? 'bg-green-700/30 ring-1 ring-green-500/60' : ''"
                >
                  <td class="border border-green-700/30 px-1 py-0.5 text-green-300 font-heading whitespace-nowrap">
                    {{ rangeLabel(row) }}
                  </td>
                  <td class="border border-green-700/30 px-1 py-0.5 text-white">
                    {{ t(`vtt.oracles.encounters.enemies.${row.resultKey}`) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.printable {
  @media print {
    background: white !important;
    border: 2px solid #333 !important;
    color: #111 !important;
  }
}
</style>
