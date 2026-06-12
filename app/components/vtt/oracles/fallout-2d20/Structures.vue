<script setup lang="ts">
const { t } = useI18n()
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

function isHighlighted(id: TableId, row: { min: number; max: number }): boolean {
  const v = rolledValues.value[id]
  if (v === null) return false
  return v >= row.min && v <= row.max
}

interface MatrixRow {
  min: number
  max: number
  results: string[]
}

const matrixRows: MatrixRow[] = [
  { min: 1, max: 6, results: ['none', 'none', 'none', 'none'] },
  { min: 7, max: 8, results: ['none', 'none', 'common_1', 'common_1'] },
  { min: 9, max: 10, results: ['none', 'common_1', 'common_1', 'common_1'] },
  { min: 11, max: 12, results: ['none', 'common_1', 'common_1', 'uncommon_1'] },
  { min: 13, max: 15, results: ['common_1', 'common_1', 'uncommon_1', 'uncommon_1'] },
  { min: 16, max: 17, results: ['common_1', 'uncommon_1', 'uncommon_1', 'rare_1'] },
  { min: 18, max: 18, results: ['uncommon_1', 'uncommon_1', 'rare_1', 'rare_1'] },
  { min: 19, max: 19, results: ['uncommon_1', 'rare_1', 'rare_1', 'rare_1_uncommon_1'] },
  { min: 20, max: 20, results: ['rare_1', 'rare_1_common_1', 'rare_2', 'rare_2'] },
]

interface CategoryRow {
  min: number
  max: number
  common: string
  uncommon: string
  rare: string
}

interface CategoryTable {
  titleKey: string
  rows: CategoryRow[]
}

const categoryTables: CategoryTable[] = [
  {
    titleKey: 'vtt.oracles.structures.categories.settlements',
    rows: [
      { min: 1, max: 10, common: 'cooking_station', uncommon: 'workbench', rare: 'gunsmith_bench' },
      { min: 11, max: 12, common: 'cooking_station', uncommon: 'workbench', rare: 'armorer_bench' },
      { min: 13, max: 14, common: 'campfire', uncommon: 'gunsmith_bench', rare: 'armorer_bench' },
      { min: 15, max: 15, common: 'campfire', uncommon: 'gunsmith_bench', rare: 'armorer_bench' },
      { min: 16, max: 17, common: 'campfire', uncommon: 'armorer_bench', rare: 'armorer_bench' },
      { min: 18, max: 18, common: 'working_terminal', uncommon: 'armorer_bench', rare: 'prepared_shelter' },
      { min: 19, max: 20, common: 'working_terminal', uncommon: 'armorer_bench', rare: 'prepared_shelter' },
    ],
  },
  {
    titleKey: 'vtt.oracles.structures.categories.hospitals',
    rows: [
      { min: 1, max: 10, common: 'working_terminal', uncommon: 'chemistry_bench', rare: 'medical_lab' },
      { min: 11, max: 14, common: 'cooking_station', uncommon: 'chemistry_bench', rare: 'medical_lab' },
      { min: 15, max: 18, common: 'cooking_station', uncommon: 'medical_lab', rare: 'advanced_chemistry_bench' },
      { min: 19, max: 20, common: 'cooking_station', uncommon: 'medical_lab', rare: 'research_center' },
    ],
  },
  {
    titleKey: 'vtt.oracles.structures.categories.factories',
    rows: [
      { min: 1, max: 10, common: 'workbench', uncommon: 'gunsmith_bench', rare: 'armorer_bench' },
      { min: 11, max: 17, common: 'working_terminal', uncommon: 'armorer_bench', rare: 'robotics_workshop' },
      { min: 18, max: 20, common: 'working_terminal', uncommon: 'robotics_workshop', rare: 'robot_recharge_station' },
    ],
  },
  {
    titleKey: 'vtt.oracles.structures.categories.vaults',
    rows: [
      { min: 1, max: 8, common: 'working_terminal', uncommon: 'gunsmith_bench', rare: 'robotics_workshop' },
      { min: 9, max: 10, common: 'working_terminal', uncommon: 'armorer_bench', rare: 'military_arsenal' },
      { min: 11, max: 14, common: 'workbench', uncommon: 'armorer_bench', rare: 'military_arsenal' },
      { min: 15, max: 18, common: 'workbench', uncommon: 'chemistry_bench', rare: 'robot_command_center' },
      { min: 19, max: 20, common: 'workbench', uncommon: 'chemistry_bench', rare: 'secret_lab' },
    ],
  },
]

function rangeLabel(row: { min: number; max: number }): string {
  return row.min === row.max ? `${row.min}` : `${row.min}–${row.max}`
}
</script>

<template>
  <div class="oracle-panel">
    <div class="bg-black/70 backdrop-blur-sm border border-green-700/50 rounded-lg p-2.5 printable">
      <div class="flex items-center gap-2 mb-2 border-b border-green-700/30 pb-1.5">
        <span class="text-lg">⚙</span>
        <h3 class="text-base font-heading font-bold text-green-400 tracking-wider">
          {{ t('vtt.oracles.structures.title') }}
        </h3>
      </div>

      <div class="flex items-end gap-2 mb-2">
        <h3 class="text-lg font-heading font-semibold text-green-400 flex-1">
          {{ t('vtt.oracles.structures.structuresFound') }}
        </h3>
        <div v-if="rolledValues.matrix !== null" class="text-base text-green-400 font-heading whitespace-nowrap">
          {{ t('vtt.oracles.structures.result') }}: {{ rolledValues.matrix }}
        </div>
        <button
          class="px-2 py-1 text-sm font-heading bg-green-700/60 hover:bg-green-600/70 border border-green-700/50 rounded text-green-100 cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
          @click="rollForTable('matrix')"
        >
          1d20
        </button>
      </div>

      <table class="w-full text-base border-collapse mb-2">
        <thead>
          <tr class="bg-green-900/40">
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
        <tbody>
          <tr
            v-for="(row, i) in matrixRows"
            :key="i"
            class="even:bg-green-900/10 transition-colors duration-300"
            :class="isHighlighted('matrix', row) ? 'bg-green-700/30 ring-1 ring-green-500/60' : ''"
          >
            <td class="border border-green-700/30 px-1 py-0.5 text-green-300 font-heading whitespace-nowrap">
              {{ rangeLabel(row) }}
            </td>
            <td
              v-for="(res, j) in row.results"
              :key="j"
              class="border border-green-700/30 px-1 py-0.5 text-white"
            >
              {{ t(`vtt.oracles.structures.results.${res}`) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="grid grid-cols-2 gap-3 mb-2">
        <template
          v-for="(cat, ci) in categoryTables"
          :key="ci"
        >
          <div>
            <div class="flex items-center gap-1 mb-0.5">
              <h3 class="text-lg font-heading font-semibold text-green-400 flex-1">
                {{ t(cat.titleKey) }}
              </h3>
              <div v-if="rolledValues[`cat-${ci}`] !== null" class="text-sm text-green-400 font-heading whitespace-nowrap">
                {{ t('vtt.oracles.structures.result') }}: {{ rolledValues[`cat-${ci}`] }}
              </div>
              <button
                class="px-2 py-1 text-sm font-heading bg-green-700/60 hover:bg-green-600/70 border border-green-700/50 rounded text-green-100 cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]"
                @click="rollForTable(`cat-${ci}`)"
              >
                1d20
              </button>
            </div>

            <table class="w-full text-base border-collapse">
              <thead>
                <tr class="bg-green-900/40">
                  <th class="border border-green-700/30 px-1 py-0.5 text-green-400 font-heading text-left w-6">
                    {{ t('vtt.oracles.structures.d20') }}
                  </th>
                  <th class="border border-green-700/30 px-1 py-0.5 text-green-400 font-heading text-left">
                    {{ t('vtt.oracles.structures.rarity.common') }}
                  </th>
                  <th class="border border-green-700/30 px-1 py-0.5 text-green-400 font-heading text-left">
                    {{ t('vtt.oracles.structures.rarity.uncommon') }}
                  </th>
                  <th class="border border-green-700/30 px-1 py-0.5 text-red-400 font-heading text-left">
                    {{ t('vtt.oracles.structures.rarity.rare') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, ri) in cat.rows"
                  :key="ri"
                  class="even:bg-green-900/10 transition-colors duration-300"
                  :class="isHighlighted(`cat-${ci}`, row) ? 'bg-green-700/30 ring-1 ring-green-500/60' : ''"
                >
                  <td class="border border-green-700/30 px-1 py-0.5 text-green-300 font-heading whitespace-nowrap">
                    {{ rangeLabel(row) }}
                  </td>
                  <td class="border border-green-700/30 px-1 py-0.5 text-green-300">
                    {{ t(`vtt.oracles.structures.items.${row.common}`) }}
                  </td>
                  <td class="border border-green-700/30 px-1 py-0.5 text-green-200">
                    {{ t(`vtt.oracles.structures.items.${row.uncommon}`) }}
                  </td>
                  <td class="border border-green-700/30 px-1 py-0.5 text-red-300">
                    {{ t(`vtt.oracles.structures.items.${row.rare}`) }}
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
