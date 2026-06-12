<script setup lang="ts">
const { t } = useI18n()
import type { Weapon } from '~/types/vtt'
import { maxHp, radThreshold } from '~/utils/fallout-2d20'
const { characters, updateCharacter, updateCharacterData, removeCharacter } = useCharacters()
const { close, activeCharacterId } = useCharacterDetail()

const active = computed(() => characters.value.find((c) => c.id === activeCharacterId.value) ?? null)

function get<T>(key: string, fallback: T): T {
  return (active.value?.data?.[key] as T) ?? fallback
}

function set(key: string, value: unknown) {
  if (!active.value) return
  updateCharacterData(active.value.id, { ...active.value.data, [key]: value })
}

function setArmor(part: string, field: string, value: number) {
  if (!active.value) return
  const armor = { ...get('armor', {}) }
  armor[part] = { ...(armor[part] || {}), [field]: value }
  set('armor', armor)
}

function addWeapon() {
  const ws = [...get<unknown[]>('weapons', [])]
  ws.push({ id: crypto.randomUUID(), name: '', type: '', damage: '', damageType: 'Fisici', range: '', qualities: '', specialEffects: '', ammo: '', capacity: 0 })
  set('weapons', ws)
}

function removeWeapon(wId: string) {
  set('weapons', get<unknown[]>('weapons', []).filter((w: any) => w.id !== wId))
}

function updateWeapon(wId: string, field: string, value: unknown) {
  set('weapons', get<unknown[]>('weapons', []).map((w: any) => w.id === wId ? { ...w, [field]: value } : w))
}

const expandedWeapons = ref<Set<string>>(new Set())

function toggleWeapon(id: string) {
  const next = new Set(expandedWeapons.value)
  if (next.has(id)) next.delete(id); else next.add(id)
  expandedWeapons.value = next
}

const parts = ['head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'] as const

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}
</script>

<template>
  <div class="h-full flex flex-col text-base">
    <div v-if="active" class="flex-1 overflow-y-auto p-3 space-y-2.5">
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="text-green-300/80 font-heading text-sm">{{ t('vtt.character.name') }}</label>
          <input :value="active.name"
            class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60"
            @input="updateCharacter(active.id, { name: ($event.target as HTMLInputElement).value })" />
        </div>
        <div>
          <label class="text-green-300/80 font-heading text-sm">{{ t('vtt.character.origin') }}</label>
          <input :value="get('origin', '')"
            class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60"
            @input="set('origin', ($event.target as HTMLInputElement).value)" />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2">
        <div>
          <label class="text-green-300/80 font-heading text-sm">{{ t('vtt.character.level') }}</label>
          <input :value="get('level', 1)" type="number" min="1" max="20"
            class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60"
            @input="set('level', Math.max(1, Number(($event.target as HTMLInputElement).value) || 1))" />
        </div>
        <div>
          <label class="text-green-300/80 font-heading text-sm">{{ t('vtt.character.exp') }}</label>
          <div class="flex gap-1 items-center">
            <input :value="get('exp', 0)" type="number" min="0"
              class="flex-1 w-0 px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60"
              @input="set('exp', Number(($event.target as HTMLInputElement).value) || 0)" />
            <span class="text-green-500/50">/</span>
            <input :value="get('nextLevelExp', 200)" type="number" min="1"
              class="w-16 px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 text-center"
              @input="set('nextLevelExp', Number(($event.target as HTMLInputElement).value) || 1)" />
          </div>
        </div>
        <div>
          <label class="text-green-300/80 font-heading text-sm">{{ t('vtt.character.maxHp') }}</label>
          <div class="flex gap-1 items-center">
            <input :value="get('hpCurrent', maxHp(get('endurance', 4)))" type="number" min="0"
              class="flex-1 w-0 px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60"
              @input="set('hpCurrent', Math.max(0, Number(($event.target as HTMLInputElement).value) || 0))" />
            <span class="text-green-500/50">/</span>
            <span class="px-2 py-1 text-base bg-black/50 border border-green-700/30 rounded text-green-400 font-bold">{{ maxHp(get('endurance', 4)) }}</span>
          </div>
        </div>
      </div>

      <div class="border-t border-green-700/20 pt-2">
        <h4 class="text-sm font-heading font-semibold text-green-400/70 mb-1.5 tracking-wider uppercase">SPECIAL</h4>
        <div class="grid grid-cols-4 gap-2">
          <div><label class="text-green-300/80 font-heading text-sm">FOR</label><input :value="get('strength', 4)" type="number" min="1" max="10" class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="set('strength', Math.max(1, Number(($event.target as HTMLInputElement).value) || 1))" /></div>
          <div><label class="text-green-300/80 font-heading text-sm">PER</label><input :value="get('perception', 4)" type="number" min="1" max="10" class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="set('perception', Math.max(1, Number(($event.target as HTMLInputElement).value) || 1))" /></div>
          <div><label class="text-green-300/80 font-heading text-sm">RES</label><input :value="get('endurance', 4)" type="number" min="1" max="10" class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="set('endurance', Math.max(1, Number(($event.target as HTMLInputElement).value) || 1))" /></div>
          <div><label class="text-green-300/80 font-heading text-sm">CAR</label><input :value="get('charisma', 4)" type="number" min="1" max="10" class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="set('charisma', Math.max(1, Number(($event.target as HTMLInputElement).value) || 1))" /></div>
          <div><label class="text-green-300/80 font-heading text-sm">INT</label><input :value="get('intelligence', 4)" type="number" min="1" max="10" class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="set('intelligence', Math.max(1, Number(($event.target as HTMLInputElement).value) || 1))" /></div>
          <div><label class="text-green-300/80 font-heading text-sm">AGI</label><input :value="get('agility', 4)" type="number" min="1" max="10" class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="set('agility', Math.max(1, Number(($event.target as HTMLInputElement).value) || 1))" /></div>
          <div><label class="text-green-300/80 font-heading text-sm">FORT</label><input :value="get('luck', 4)" type="number" min="1" max="10" class="w-full px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="set('luck', Math.max(1, Number(($event.target as HTMLInputElement).value) || 1))" /></div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 border-t border-green-700/20 pt-2">
        <div>
          <label class="text-green-300/80 font-heading text-sm">{{ t('vtt.character.radiation') }}</label>
          <div class="flex gap-1 items-center">
            <input :value="get('radiation', 0)" type="number" min="0"
              class="flex-1 w-0 px-2 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60"
              @input="set('radiation', Math.max(0, Number(($event.target as HTMLInputElement).value) || 0))" />
            <span class="text-green-500/50">/</span>
            <span class="px-2 py-1 text-base bg-black/50 border border-green-700/30 rounded text-green-400 font-bold">{{ radThreshold(get('endurance', 4)) }}</span>
          </div>
        </div>
      </div>

      <div class="border-t border-green-700/20 pt-2">
        <h4 class="text-sm font-heading font-semibold text-green-400/70 mb-1 tracking-wider uppercase">{{ t('vtt.character.armor') }}</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="text-green-300/80 font-heading">
                <th class="text-left px-1 py-0.5 font-normal">{{ t('vtt.character.bodyPart') }}</th>
                <th class="text-center px-1 py-0.5 font-normal">{{ t('vtt.character.armorFields.rdPhys') }}</th>
                <th class="text-center px-1 py-0.5 font-normal">{{ t('vtt.character.armorFields.rdEnerg') }}</th>
                <th class="text-center px-1 py-0.5 font-normal">{{ t('vtt.character.armorFields.rdRad') }}</th>
                <th class="text-center px-1 py-0.5 font-normal">{{ t('vtt.character.armorFields.limbHp') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="part in parts" :key="part">
                <td class="px-1 py-0.5 text-green-300/70 whitespace-nowrap">{{ t(`vtt.character.armorParts.${part}`) }}</td>
                <td class="px-0.5 py-0.5"><input :value="get('armor', {})[part]?.phys ?? 0" type="number" min="0" class="w-full px-1 py-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 text-center" @input="setArmor(part, 'phys', Number(($event.target as HTMLInputElement).value) || 0)" /></td>
                <td class="px-0.5 py-0.5"><input :value="get('armor', {})[part]?.energ ?? 0" type="number" min="0" class="w-full px-1 py-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 text-center" @input="setArmor(part, 'energ', Number(($event.target as HTMLInputElement).value) || 0)" /></td>
                <td class="px-0.5 py-0.5"><input :value="get('armor', {})[part]?.rad ?? 0" type="number" min="0" class="w-full px-1 py-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 text-center" @input="setArmor(part, 'rad', Number(($event.target as HTMLInputElement).value) || 0)" /></td>
                <td class="px-0.5 py-0.5"><input :value="get('armor', {})[part]?.hp ?? 0" type="number" min="0" class="w-full px-1 py-0.5 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60 text-center" @input="setArmor(part, 'hp', Math.max(0, Number(($event.target as HTMLInputElement).value) || 0))" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="border-t border-green-700/20 pt-2">
        <div class="flex items-center gap-1 mb-1">
          <h4 class="text-sm font-heading font-semibold text-green-400/70 tracking-wider uppercase flex-1">{{ t('vtt.character.weapons') }}</h4>
          <button class="px-1.5 py-0.5 text-sm font-heading bg-green-700/60 hover:bg-green-600/70 border border-green-700/50 rounded text-green-100 cursor-pointer transition-all" @click="addWeapon">+</button>
        </div>
        <div v-if="!get<Weapon[]>('weapons', []).length" class="text-sm text-green-500/40 italic">{{ t('vtt.character.noWeapons') }}</div>
        <div v-for="w in get<Weapon[]>('weapons', [])" :key="w.id" class="mb-1.5 border border-green-700/20 rounded">
          <div class="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-green-900/20 transition-colors" @click="toggleWeapon((w as Weapon).id)">
            <span class="flex-1 text-base text-green-200 truncate">{{ (w as Weapon).name || '—' }}</span>
            <span class="text-sm text-green-300/60 whitespace-nowrap">{{ (w as Weapon).damage }} CD</span>
            <span class="text-sm text-green-400/40 mx-1">·</span>
            <span class="text-sm text-green-300/60 whitespace-nowrap">{{ (w as Weapon).damageType }}</span>
            <button class="ml-1 text-red-400/60 hover:text-red-300 text-sm cursor-pointer" :aria-label="t('vtt.character.remove')" @click.stop="removeWeapon((w as Weapon).id)">✕</button>
          </div>
          <div v-if="expandedWeapons.has((w as Weapon).id)" class="px-2 pb-2 border-t border-green-700/15 pt-1.5 space-y-1.5">
            <div class="grid grid-cols-2 gap-1.5">
              <div>
                <label class="text-green-300/80 font-heading text-sm">Danni</label>
                <div class="flex items-center gap-1">
                  <input :value="(w as Weapon).damage" placeholder="4" class="flex-1 w-0 px-1.5 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="updateWeapon((w as Weapon).id, 'damage', ($event.target as HTMLInputElement).value)" />
                  <span class="text-sm text-green-400/60 font-heading">CD</span>
                </div>
              </div>
              <div>
                <label class="text-green-300/80 font-heading text-sm">Tipo danno</label>
                <input :value="(w as Weapon).damageType" class="w-full px-1.5 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="updateWeapon((w as Weapon).id, 'damageType', ($event.target as HTMLInputElement).value)" />
              </div>
              <div>
                <label class="text-green-300/80 font-heading text-sm">Gittata</label>
                <input :value="(w as Weapon).range" class="w-full px-1.5 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="updateWeapon((w as Weapon).id, 'range', ($event.target as HTMLInputElement).value)" />
              </div>
              <div>
                <label class="text-green-300/80 font-heading text-sm">Qualità</label>
                <input :value="(w as Weapon).qualities" class="w-full px-1.5 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="updateWeapon((w as Weapon).id, 'qualities', ($event.target as HTMLInputElement).value)" />
              </div>
            </div>
            <div>
              <label class="text-green-300/80 font-heading text-sm">Effetti speciali</label>
              <input :value="(w as Weapon).specialEffects" class="w-full px-1.5 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="updateWeapon((w as Weapon).id, 'specialEffects', ($event.target as HTMLInputElement).value)" />
            </div>
            <div class="grid grid-cols-2 gap-1.5">
              <div>
                <label class="text-green-300/80 font-heading text-sm">Munizioni</label>
                <input :value="(w as Weapon).ammo" class="w-full px-1.5 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="updateWeapon((w as Weapon).id, 'ammo', ($event.target as HTMLInputElement).value)" />
              </div>
              <div>
                <label class="text-green-300/80 font-heading text-sm">Capienza</label>
                <input :value="(w as Weapon).capacity || 0" type="number" min="0" class="w-full px-1.5 py-1 text-base bg-black/50 border border-green-700/50 rounded text-green-200 outline-none focus:border-green-500/60" @input="updateWeapon((w as Weapon).id, 'capacity', Number(($event.target as HTMLInputElement).value) || 0)" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="w-full px-2 py-1.5 text-base text-red-400/70 hover:text-red-300 border border-red-700/30 hover:border-red-600/50 rounded transition-colors cursor-pointer"
        @click="removeCharacter(active.id); close()">{{ t('vtt.character.remove') }}</button>
    </div>

    <div v-else class="flex-1 flex items-center justify-center text-base text-green-400/40 italic">
      {{ t('vtt.character.noCharacters') }}
    </div>
  </div>
</template>
