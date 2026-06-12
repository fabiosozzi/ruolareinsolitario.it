<script setup lang="ts">
const { rollDice } = useDiceRoller()

interface NpcProfile {
  name: string
  role: string
  attitude: string
  need: string
  secret: string
}

const npcNames = [
  'Marcus', 'Lucy', 'Rex', 'Vera', 'Cain', 'Mira', 'Zeke', 'Nadia',
  'Otis', 'Faye', 'Gruff', 'Sable', 'Wren', 'Titus', 'Lark', 'Dorn',
]

const roles = [
  'Agricoltore', 'Commerciante', 'Cacciatore', 'Predone', 'Tecnico',
  'Medico', 'Sopravvissuto', 'Vagabondo', 'Mercenario', 'Insediato',
  'Scienziato pazzo', 'Ghoul eremita', 'Ex-militare', 'Schiavista',
  'Ingegnere', 'Esploratore', 'Cuciniere', 'Contrabbandiere',
]

const attitudes = [
  'Amichevole', 'Sospettoso', 'Ostile', 'Indifferente', 'Impaurito',
  'Arrogante', 'Disperato', 'Curioso', 'Ingannevole', 'Protettivo',
]

const needs = [
  'Cibo e acqua', 'Munizioni', 'Protezione', 'Informazioni',
  'Cure mediche', 'Un passaggio', 'Un lavoro', 'Compagnia',
  'Carburante', 'Parti di ricambio', 'Vuole commerciare', 'Aiuto contro predoni',
]

const secrets = [
  'Nasconde un tesoro', 'È un informatore', 'Ha un passato oscuro',
  'Sa dove trovare acqua pura', 'È in realtà un sintetico',
  'Conosce un\'entrata per un vault', 'È un ex-Predone',
  'Veglia su un bambino sopravvissuto', 'Ha una mappa di un deposito militare',
  'Possiede un\'arma unica', 'È immune alle radiazioni', 'Sa chi lo vuole morto',
]

const npc = ref<NpcProfile>({
  name: '',
  role: '',
  attitude: '',
  need: '',
  secret: '',
})

function generateNpc() {
  const nameRoll = rollDice({ type: 'd20', label: 'D20', sides: 20 }, 1)
  const roleRoll = rollDice({ type: 'd20', label: 'D20', sides: 20 }, 1)
  const attitudeRoll = rollDice({ type: 'd10', label: 'D10', sides: 10 }, 1)
  const needRoll = rollDice({ type: 'd12', label: 'D12', sides: 12 }, 1)
  const secretRoll = rollDice({ type: 'd12', label: 'D12', sides: 12 }, 1)

  npc.value = {
    name: npcNames[(nameRoll.total - 1) % npcNames.length],
    role: roles[(roleRoll.total - 1) % roles.length],
    attitude: attitudes[(attitudeRoll.total - 1) % attitudes.length],
    need: needs[(needRoll.total - 1) % needs.length],
    secret: secrets[(secretRoll.total - 1) % secrets.length],
  }
}
</script>

<template>
  <div class="oracle-panel">
    <div class="bg-gradient-to-b from-yellow-900/30 to-blue-900/30 border-2 border-yellow-700/60 rounded-lg p-4 printable">
      <div class="flex items-center gap-2 mb-3 border-b border-yellow-700/30 pb-2">
        <span class="text-lg">👤</span>
        <h3 class="text-lg font-heading font-bold text-yellow-400 tracking-wider">
          GENERA PNG
        </h3>
      </div>

      <button
        class="w-full px-4 py-2 mb-3 font-heading text-sm border-2 border-yellow-600 rounded bg-yellow-800/40 hover:bg-yellow-700/60 text-yellow-200 transition-colors cursor-pointer"
        @click="generateNpc"
      >
        GENERA (D20 ×2 + D10 + D12 ×2)
      </button>

      <div v-if="npc.name" class="space-y-2 animate-in fade-in duration-200">
        <div class="bg-yellow-900/50 border-2 border-yellow-600/50 rounded p-3">
          <div class="text-xl font-heading font-bold text-yellow-400 mb-1">
            {{ npc.name }}
          </div>
          <div class="text-xs text-yellow-500 font-heading tracking-wider mb-2">
            {{ npc.role.toUpperCase() }}
          </div>

          <div class="space-y-1.5 text-sm">
            <div class="flex items-start gap-2">
              <span class="text-yellow-500 font-heading text-xs min-w-[4.5rem]">ATTEGGIAMENTO</span>
              <span class="text-white">{{ npc.attitude }}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-yellow-500 font-heading text-xs min-w-[4.5rem]">BISOGNO</span>
              <span class="text-white">{{ npc.need }}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-yellow-500 font-heading text-xs min-w-[4.5rem]">SEGRETO</span>
              <span class="text-red-300">{{ npc.secret }}</span>
            </div>
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
