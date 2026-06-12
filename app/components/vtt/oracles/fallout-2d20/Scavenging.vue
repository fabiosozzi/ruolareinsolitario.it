<script setup lang="ts">
const { rollDice } = useDiceRoller()

interface ScavengeResult {
  roll: number
  item: string
  rarity: string
}

const scavengeTable: ScavengeResult[] = [
  { roll: 1, item: 'Razioni (1d4)', rarity: 'Comune' },
  { roll: 2, item: 'Munizioni (1d6 colpi)', rarity: 'Comune' },
  { roll: 3, item: 'Acqua pura (1 litro)', rarity: 'Comune' },
  { roll: 4, item: 'Farmaci base (Stimpak)', rarity: 'Comune' },
  { roll: 5, item: 'Cacciavite o arnese', rarity: 'Comune' },
  { roll: 6, item: 'Caps (1d10)', rarity: 'Comune' },
  { roll: 7, item: 'Parti di ricambio', rarity: 'Comune' },
  { roll: 8, item: 'Mappa parziale della zona', rarity: 'Poco comune' },
  { roll: 9, item: 'Munizioni rare (1d4 colpi)', rarity: 'Poco comune' },
  { roll: 10, item: 'Stimpak curativo', rarity: 'Poco comune' },
  { roll: 11, item: 'Caps (2d10)', rarity: 'Poco comune' },
  { roll: 12, item: 'Arma da mischia base', rarity: 'Poco comune' },
  { roll: 13, item: 'Abbigliamento protettivo', rarity: 'Raro' },
  { roll: 14, item: 'Munizioni energia (1d4)', rarity: 'Raro' },
  { roll: 15, item: 'Caps (5d10)', rarity: 'Raro' },
  { roll: 16, item: 'Stimpak + RadAway', rarity: 'Raro' },
  { roll: 17, item: 'Arma da fuoco leggera', rarity: 'Molto raro' },
  { roll: 18, item: 'Pezzo di armatura', rarity: 'Molto raro' },
  { roll: 19, item: 'Caps (10d10)', rarity: 'Molto raro' },
  { roll: 20, item: 'Oggetto unico o cimelio', rarity: 'Leggendario' },
]

const lastRoll = ref<ScavengeResult | null>(null)
const rollValue = ref<number>(0)

function rollScavenge() {
  const config = { type: 'd20', label: 'D20', sides: 20 }
  const result = rollDice(config, 1)
  rollValue.value = result.total
  lastRoll.value = scavengeTable.find((s) => s.roll === result.total) ?? null
}

function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'Comune': return 'text-gray-300'
    case 'Poco comune': return 'text-green-400'
    case 'Raro': return 'text-blue-400'
    case 'Molto raro': return 'text-purple-400'
    case 'Leggendario': return 'text-orange-400'
    default: return 'text-yellow-200'
  }
}
</script>

<template>
  <div class="oracle-panel">
    <div class="bg-gradient-to-b from-yellow-900/30 to-blue-900/30 border-2 border-yellow-700/60 rounded-lg p-4 printable">
      <div class="flex items-center gap-2 mb-3 border-b border-yellow-700/30 pb-2">
        <span class="text-lg">🔧</span>
        <h3 class="text-lg font-heading font-bold text-yellow-400 tracking-wider">
          RECUPERO RISORSE
        </h3>
      </div>

      <button
        class="w-full px-4 py-2 mb-3 font-heading text-sm border-2 border-yellow-600 rounded bg-yellow-800/40 hover:bg-yellow-700/60 text-yellow-200 transition-colors cursor-pointer"
        @click="rollScavenge"
      >
        TIRA RECUPERO (D20)
      </button>

      <div v-if="lastRoll" class="space-y-2 animate-in fade-in duration-200">
        <div class="flex items-center gap-2">
          <span class="inline-block px-2 py-0.5 bg-yellow-800/60 border border-yellow-600 rounded text-yellow-300 font-heading text-lg min-w-[2.5rem] text-center">
            {{ rollValue }}
          </span>
          <span class="text-base font-heading font-bold text-white">
            {{ lastRoll.item }}
          </span>
        </div>
        <div :class="['text-xs font-heading tracking-wider', getRarityColor(lastRoll.rarity)]">
          {{ lastRoll.rarity.toUpperCase() }}
        </div>
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
