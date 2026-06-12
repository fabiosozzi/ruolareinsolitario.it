<script setup lang="ts">
const { t } = useI18n()

const dimensions = ['small', 'medium', 'large', 'huge'] as const

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
  { min: 20, max: 20, results: ['rare_1', 'rare_1_common_1', 'unique_1', 'unique_1'] },
]

interface StructureRow {
  min: number
  max: number
  resultKey: string
}

interface RarityTable {
  rarityKey: string
  rows: StructureRow[]
}

interface StructureCategory {
  titleKey: string
  tables: RarityTable[]
}

const structureCategories: StructureCategory[] = [
  {
    titleKey: 'vtt.oracles.structures.categories.settlements',
    tables: [
      {
        rarityKey: 'vtt.oracles.structures.rarity.common',
        rows: [
          { min: 1, max: 12, resultKey: 'vtt.oracles.structures.items.cooking_station' },
          { min: 13, max: 17, resultKey: 'vtt.oracles.structures.items.campfire' },
          { min: 18, max: 20, resultKey: 'vtt.oracles.structures.items.working_terminal' },
        ]
      },
      {
        rarityKey: 'vtt.oracles.structures.rarity.uncommon',
        rows: [
          { min: 1, max: 12, resultKey: 'vtt.oracles.structures.items.workbench' },
          { min: 13, max: 17, resultKey: 'vtt.oracles.structures.items.gunsmith_bench' },
          { min: 18, max: 20, resultKey: 'vtt.oracles.structures.items.armorer_bench' },
        ]
      },
      {
        rarityKey: 'vtt.oracles.structures.rarity.rare',
        rows: [
          { min: 1, max: 10, resultKey: 'vtt.oracles.structures.items.gunsmith_bench' },
          { min: 11, max: 17, resultKey: 'vtt.oracles.structures.items.armorer_bench' },
          { min: 18, max: 20, resultKey: 'vtt.oracles.structures.items.prepared_shelter' },
        ]
      },
    ]
  },
  {
    titleKey: 'vtt.oracles.structures.categories.hospitals',
    tables: [
      {
        rarityKey: 'vtt.oracles.structures.rarity.common',
        rows: [
          { min: 1, max: 10, resultKey: 'vtt.oracles.structures.items.working_terminal' },
          { min: 11, max: 20, resultKey: 'vtt.oracles.structures.items.cooking_station' },
        ]
      },
      {
        rarityKey: 'vtt.oracles.structures.rarity.uncommon',
        rows: [
          { min: 1, max: 14, resultKey: 'vtt.oracles.structures.items.chemistry_bench' },
          { min: 15, max: 20, resultKey: 'vtt.oracles.structures.items.medical_lab' },
        ]
      },
      {
        rarityKey: 'vtt.oracles.structures.rarity.rare',
        rows: [
          { min: 1, max: 12, resultKey: 'vtt.oracles.structures.items.medical_lab' },
          { min: 13, max: 18, resultKey: 'vtt.oracles.structures.items.advanced_chemistry_bench' },
          { min: 19, max: 20, resultKey: 'vtt.oracles.structures.items.research_center' },
        ]
      },
    ]
  },
  {
    titleKey: 'vtt.oracles.structures.categories.factories',
    tables: [
      {
        rarityKey: 'vtt.oracles.structures.rarity.common',
        rows: [
          { min: 1, max: 10, resultKey: 'vtt.oracles.structures.items.workbench' },
          { min: 11, max: 20, resultKey: 'vtt.oracles.structures.items.working_terminal' },
        ]
      },
      {
        rarityKey: 'vtt.oracles.structures.rarity.uncommon',
        rows: [
          { min: 1, max: 10, resultKey: 'vtt.oracles.structures.items.gunsmith_bench' },
          { min: 11, max: 17, resultKey: 'vtt.oracles.structures.items.armorer_bench' },
          { min: 18, max: 20, resultKey: 'vtt.oracles.structures.items.robotics_workshop' },
        ]
      },
      {
        rarityKey: 'vtt.oracles.structures.rarity.rare',
        rows: [
          { min: 1, max: 10, resultKey: 'vtt.oracles.structures.items.armorer_bench' },
          { min: 11, max: 17, resultKey: 'vtt.oracles.structures.items.robotics_workshop' },
          { min: 18, max: 20, resultKey: 'vtt.oracles.structures.items.robot_recharge_station' },
        ]
      },
    ]
  },
  {
    titleKey: 'vtt.oracles.structures.categories.vaults',
    tables: [
      {
        rarityKey: 'vtt.oracles.structures.rarity.common',
        rows: [
          { min: 1, max: 10, resultKey: 'vtt.oracles.structures.items.working_terminal' },
          { min: 11, max: 20, resultKey: 'vtt.oracles.structures.items.workbench' },
        ]
      },
      {
        rarityKey: 'vtt.oracles.structures.rarity.uncommon',
        rows: [
          { min: 1, max: 8, resultKey: 'vtt.oracles.structures.items.gunsmith_bench' },
          { min: 9, max: 14, resultKey: 'vtt.oracles.structures.items.armorer_bench' },
          { min: 15, max: 20, resultKey: 'vtt.oracles.structures.items.chemistry_bench' },
        ]
      },
      {
        rarityKey: 'vtt.oracles.structures.rarity.rare',
        rows: [
          { min: 1, max: 8, resultKey: 'vtt.oracles.structures.items.robotics_workshop' },
          { min: 9, max: 14, resultKey: 'vtt.oracles.structures.items.military_arsenal' },
          { min: 15, max: 18, resultKey: 'vtt.oracles.structures.items.robot_command_center' },
          { min: 19, max: 20, resultKey: 'vtt.oracles.structures.items.secret_lab' },
        ]
      },
    ]
  },
]

const uniqueRows: StructureRow[] = [
  { min: 1, max: 5, resultKey: 'vtt.oracles.structures.items.full_military_arsenal' },
  { min: 6, max: 9, resultKey: 'vtt.oracles.structures.items.fev_lab' },
  { min: 10, max: 12, resultKey: 'vtt.oracles.structures.items.robot_command_center' },
  { min: 13, max: 15, resultKey: 'vtt.oracles.structures.items.cryo_chamber' },
  { min: 16, max: 18, resultKey: 'vtt.oracles.structures.items.vault_tec_reactor' },
  { min: 19, max: 19, resultKey: 'vtt.oracles.structures.items.experimental_workshop' },
  { min: 20, max: 20, resultKey: 'vtt.oracles.structures.items.intact_prewar_tech' },
]

function rangeLabel(row: { min: number; max: number }): string {
  return row.min === row.max ? `${row.min}` : `${row.min}–${row.max}`
}
</script>

<template>
  <div class="oracle-panel">
    <div class="bg-gradient-to-b from-yellow-900/30 to-blue-900/30 border-2 border-yellow-700/60 rounded-lg p-4 printable">
      <div class="flex items-center gap-2 mb-3 border-b border-yellow-700/30 pb-2">
        <span class="text-lg">🏗</span>
        <h3 class="text-lg font-heading font-bold text-yellow-400 tracking-wider">
          {{ t('vtt.oracles.structures.title') }}
        </h3>
      </div>

      <p class="text-xs text-yellow-300/80 mb-3 font-heading">
        {{ t('vtt.oracles.structures.subtitle') }}
      </p>

      <table class="w-full text-xs border-collapse mb-4">
        <thead>
          <tr class="bg-yellow-900/40">
            <th class="border border-yellow-700/30 px-2 py-1.5 text-yellow-400 font-heading text-left">
              {{ t('vtt.oracles.structures.d20') }}
            </th>
            <th
              v-for="dim in dimensions"
              :key="dim"
              class="border border-yellow-700/30 px-2 py-1.5 text-yellow-400 font-heading text-left"
            >
              {{ t(`vtt.oracles.structures.dimensions.${dim}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in matrixRows"
            :key="i"
            class="even:bg-yellow-900/10"
          >
            <td class="border border-yellow-700/30 px-2 py-1 text-yellow-300 font-heading whitespace-nowrap">
              {{ rangeLabel(row) }}
            </td>
            <td
              v-for="(res, j) in row.results"
              :key="j"
              class="border border-yellow-700/30 px-2 py-1 text-white"
            >
              {{ t(`vtt.oracles.structures.results.${res}`) }}
            </td>
          </tr>
        </tbody>
      </table>

      <template
        v-for="(category, ci) in structureCategories"
        :key="ci"
      >
        <h3 class="text-sm font-heading font-semibold text-yellow-400 mb-2 mt-4">
          {{ t(category.titleKey) }}
        </h3>

        <template v-for="(table, ti) in category.tables" :key="ti">
          <table class="w-full text-xs border-collapse mb-3">
            <thead>
              <tr class="bg-yellow-900/40">
                <th class="border border-yellow-700/30 px-2 py-1 text-yellow-400 font-heading text-left w-12">
                  {{ t('vtt.oracles.structures.d20') }}
                </th>
                <th class="border border-yellow-700/30 px-2 py-1 text-yellow-400 font-heading text-left">
                  {{ t(table.rarityKey) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, ri) in table.rows"
                :key="ri"
                class="even:bg-yellow-900/10"
              >
                <td class="border border-yellow-700/30 px-2 py-1 text-yellow-300 font-heading">
                  {{ rangeLabel(row) }}
                </td>
                <td class="border border-yellow-700/30 px-2 py-1 text-white">
                  {{ t(row.resultKey) }}
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </template>

      <h3 class="text-sm font-heading font-semibold text-yellow-400 mb-2 mt-4">
        {{ t('vtt.oracles.structures.categories.unique') }}
      </h3>

      <table class="w-full text-xs border-collapse">
        <thead>
          <tr class="bg-yellow-900/40">
            <th class="border border-yellow-700/30 px-2 py-1 text-yellow-400 font-heading text-left w-12">
              {{ t('vtt.oracles.structures.d20') }}
            </th>
            <th class="border border-yellow-700/30 px-2 py-1 text-yellow-400 font-heading text-left">
              {{ t('vtt.oracles.structures.structure') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in uniqueRows"
            :key="i"
            class="even:bg-yellow-900/10"
          >
            <td class="border border-yellow-700/30 px-2 py-1 text-yellow-300 font-heading">
              {{ rangeLabel(row) }}
            </td>
            <td class="border border-yellow-700/30 px-2 py-1 text-white">
              {{ t(row.resultKey) }}
            </td>
          </tr>
        </tbody>
      </table>
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
