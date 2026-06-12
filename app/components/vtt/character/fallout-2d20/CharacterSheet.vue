<script setup lang="ts">
const { t, locale } = useI18n()
const { characters, selectedCharacterId, selectCharacter, addCharacter } = useCharacters()
const { open } = useCharacterDetail()

function addNew() {
  const name = locale.value === 'en' ? 'New Character' : 'Nuovo Personaggio'
  addCharacter(name, {
    origin: '', level: 1, exp: 0, nextLevelExp: 200,
    strength: 4, perception: 4, endurance: 4, charisma: 4,
    intelligence: 4, agility: 4, luck: 4,
    hpCurrent: 18, radiation: 0,
    armor: {
      head: { phys: 0, energ: 0, rad: 0, hp: 0 },
      torso: { phys: 0, energ: 0, rad: 0, hp: 0 },
      leftArm: { phys: 0, energ: 0, rad: 0, hp: 0 },
      rightArm: { phys: 0, energ: 0, rad: 0, hp: 0 },
      leftLeg: { phys: 0, energ: 0, rad: 0, hp: 0 },
      rightLeg: { phys: 0, energ: 0, rad: 0, hp: 0 },
    },
    weapons: [],
  })
  const last = characters.value[characters.value.length - 1]
  if (last) { selectCharacter(last.id); open(last.id) }
}
</script>

<template>
  <div class="bg-black/70 backdrop-blur-sm border border-green-700/50 rounded-lg p-2.5 text-white h-full flex flex-col text-base gap-2">
    <div class="flex items-center gap-1 border-b border-green-700/30 pb-1.5">
      <h3 class="text-base font-heading font-semibold text-green-400 flex-1 truncate">
        {{ t('vtt.character.title') }}
      </h3>
      <button class="px-2 py-0.5 text-sm font-heading bg-green-700/60 hover:bg-green-600/70 border border-green-700/50 rounded text-green-100 cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-green-400/60 active:scale-[0.98]" @click="addNew">+</button>
    </div>

    <div class="flex flex-col gap-1 flex-1 overflow-y-auto">
      <div
        v-for="c in characters"
        :key="c.id"
        tabindex="0"
        role="button"
        class="flex items-center gap-1 px-2 py-1.5 border rounded transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-green-400/60"
        :class="selectedCharacterId === c.id
          ? 'bg-green-700/60 border-green-500 text-white'
          : 'bg-green-900/30 border-green-800/40 text-green-300/80 hover:bg-green-800/50 hover:border-green-700/60'"
        @click="selectCharacter(c.id)"
      >
        <span class="flex-1 truncate text-sm font-heading">{{ c.name || '—' }}</span>
        <button class="px-3 py-2 text-xl text-green-400/50 hover:text-green-300 cursor-pointer transition-colors leading-none" :aria-label="t('vtt.character.viewDetail')" @click.stop="open(c.id)">◎</button>
      </div>

      <div v-if="!characters.length" class="flex-1 flex items-center justify-center text-sm text-green-400/40 italic">
        {{ t('vtt.character.noCharacters') }}
      </div>
    </div>
  </div>
</template>
