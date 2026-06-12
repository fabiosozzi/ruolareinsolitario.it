<script setup lang="ts">
const { rollDice } = useDiceRoller()

interface Location {
  name: string
  type: string
  condition: string
  danger: string
  loot: string
}

const structureTypes = [
  'Edificio residenziale', 'Magazzino', 'Officina', 'Ospedale',
  'Scuola', 'Bunker', 'Stazione di servizio', 'Supermercato',
  'Centro commerciale', 'Vault', 'Stazione ferroviaria', 'Chiesa',
  'Fabbrica', 'Uffici governativi', 'Deposito militare', 'Abitazione isolata',
]

const conditions = [
  'Parzialmente crollato', 'Intatto ma saccheggiato', 'In fiamme',
  'Allagato', 'Infestato da ghoul', 'Fortificato da abitanti',
  'In ristrutturazione', 'Ricoperto di vegetazione', 'Minato',
  'Radioattivo', 'Bloccato da detriti', 'Apparentemente intatto',
]

const dangers = [
  'Trappole', 'Ghoul', 'Supermutanti', 'Predoni', 'Animali della Zona',
  'Radiazioni', 'Crolli', 'Gas tossici', 'Niente di pericoloso',
  'Sopravvissuti ostili', 'Robot difensivi', 'Zona minata',
]

const lootQualities = [
  'Saccheggiato completamente', 'Solo rottami', 'Qualche risorsa base',
  'Risorse utili', 'Ben fornito', 'Magazzino prezioso',
]

const location = ref({
  name: '',
  type: '',
  condition: '',
  danger: '',
  loot: '',
})

const locationRolls = ref<number[]>([])

function generateLocation() {
  const typeResult = rollDice({ type: 'd20', label: 'D20', sides: 20 }, 1)
  const condResult = rollDice({ type: 'd20', label: 'D20', sides: 20 }, 1)
  const dangerResult = rollDice({ type: 'd20', label: 'D20', sides: 20 }, 1)
  const lootResult = rollDice({ type: 'd6', label: 'D6', sides: 6 }, 1)

  location.value = {
    name: `Locazione #${Math.floor(Math.random() * 9000 + 1000)}`,
    type: structureTypes[(typeResult.total - 1) % structureTypes.length],
    condition: conditions[(condResult.total - 1) % conditions.length],
    danger: dangers[(dangerResult.total - 1) % dangers.length],
    loot: lootQualities[(lootResult.total - 1) % lootQualities.length],
  }
  locationRolls.value = [typeResult.total, condResult.total, dangerResult.total, lootResult.total]
}

function resetLocation() {
  location.value = { name: '', type: '', condition: '', danger: '', loot: '' }
  locationRolls.value = []
}
</script>

<template>
  <div class="oracle-panel">
    <div class="bg-gradient-to-b from-yellow-900/30 to-blue-900/30 border-2 border-yellow-700/60 rounded-lg p-4 printable">
      <div class="flex items-center gap-2 mb-3 border-b border-yellow-700/30 pb-2">
        <span class="text-lg">🏚</span>
        <h3 class="text-lg font-heading font-bold text-yellow-400 tracking-wider">
          GENERA LOCAZIONE
        </h3>
      </div>

      <button
        class="w-full px-4 py-2 mb-3 font-heading text-sm border-2 border-yellow-600 rounded bg-yellow-800/40 hover:bg-yellow-700/60 text-yellow-200 transition-colors cursor-pointer"
        @click="generateLocation"
      >
        GENERA (D20 ×3 + D6)
      </button>

      <div v-if="location.name" class="space-y-2 animate-in fade-in duration-200">
        <div class="bg-yellow-900/40 border border-yellow-700/30 rounded p-2 mb-2">
          <div class="text-lg font-heading font-bold text-yellow-400">
            {{ location.name }}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 text-sm">
          <div class="bg-black/40 border border-yellow-800/30 rounded p-2">
            <div class="text-xs text-yellow-500 font-heading">TIPO</div>
            <div class="text-white">{{ location.type }}</div>
          </div>
          <div class="bg-black/40 border border-yellow-800/30 rounded p-2">
            <div class="text-xs text-yellow-500 font-heading">STATO</div>
            <div class="text-white">{{ location.condition }}</div>
          </div>
          <div class="bg-black/40 border border-yellow-800/30 rounded p-2">
            <div class="text-xs text-yellow-500 font-heading">PERICOLO</div>
            <div class="text-red-300">{{ location.danger }}</div>
          </div>
          <div class="bg-black/40 border border-yellow-800/30 rounded p-2">
            <div class="text-xs text-yellow-500 font-heading">BOTTINO</div>
            <div class="text-white">{{ location.loot }}</div>
          </div>
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
