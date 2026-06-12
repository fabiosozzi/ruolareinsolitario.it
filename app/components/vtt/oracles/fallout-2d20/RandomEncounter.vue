<script setup lang="ts">
const { rollD66 } = useDiceRoller()

interface Encounter {
  roll: string
  description: string
  details: string
}

const encounters: Encounter[] = [
  { roll: '11-14', description: 'Ghoul vagabondi', details: 'Un gruppo di 1d6 ghoul affamati. Non ostili a meno che provocati.' },
  { roll: '15-22', description: 'Scampato pericolo', details: 'Segni di un recente combattimento. Resti e bossoli sparsi.' },
  { roll: '23-26', description: 'Raduni anomali', details: 'Una piccola area di radiazioni intense. Equipaggiamento necessario per attraversarla.' },
  { roll: '31-34', description: 'Supermutanti in pattuglia', details: '1d4 supermutanti di pattuglia. Armati e pericolosi.' },
  { roll: '35-42', description: 'Recupero utile', details: 'Un contenitore metallico semi-sepolto. Razioni e munizioni all\'interno.' },
  { roll: '43-46', description: 'Viandante solitario', details: 'Un sopravvissuto solitario. Possibile scambio o agguato.' },
  { roll: '51-54', description: 'Avamposto abbandonato', details: 'Un edificio saccheggiato ma con alcune risorse residue.' },
  { roll: '55-62', description: 'Animali della Zona', details: '1d4 moleratti o cani della Zona. Aggressivi se avvicinati.' },
  { roll: '63-66', description: 'Fenomeno atmosferico', details: 'Una tempesta di sabbia o pioggia radioattiva. Cercare riparo immediatamente.' },
]

const encounterRolls = ref<string[]>([])
const encounterTotal = ref<number>(0)
const activeEncounter = ref<Encounter | null>(null)
const isRolling = ref(false)

function rollEncounter() {
  const result = rollD66()
  encounterRolls.value = result.values.map(String)
  encounterTotal.value = result.total

  const totalStr = result.total < 10 ? `0${result.total}` : String(result.total)
  activeEncounter.value = encounters.find((e) => {
    const [min, max] = e.roll.split('-').map(Number)
    return result.total >= min && result.total <= max
  }) ?? null
}
</script>

<template>
  <div class="oracle-panel">
    <div class="bg-gradient-to-b from-yellow-900/30 to-blue-900/30 border-2 border-yellow-700/60 rounded-lg p-4 printable">
      <div class="flex items-center gap-2 mb-3 border-b border-yellow-700/30 pb-2">
        <span class="text-lg">☢</span>
        <h3 class="text-lg font-heading font-bold text-yellow-400 tracking-wider">
          INCONTRO CASUALE
        </h3>
      </div>

      <button
        class="w-full px-4 py-2 mb-3 font-heading text-sm border-2 border-yellow-600 rounded bg-yellow-800/40 hover:bg-yellow-700/60 text-yellow-200 transition-colors cursor-pointer"
        @click="rollEncounter"
      >
        TIRA INCONTRO (D66)
      </button>

      <div v-if="activeEncounter" class="space-y-2 animate-in fade-in duration-200">
        <div class="flex gap-2">
          <span class="inline-block px-2 py-0.5 bg-yellow-800/60 border border-yellow-600 rounded text-yellow-300 font-heading text-xs">
            {{ encounterTotal < 10 ? `0${encounterTotal}` : encounterTotal }}
          </span>
          <span class="text-xl font-heading font-bold text-white">
            {{ activeEncounter.description }}
          </span>
        </div>
        <p class="text-sm text-yellow-200/80 leading-relaxed">
          {{ activeEncounter.details }}
        </p>
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
