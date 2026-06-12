export interface Character {
  id: string
  name: string
  data: Record<string, unknown>
}

const STORAGE_KEY = 'vtt-characters'
const characters = ref<Character[]>([])
const selectedCharacterId = ref<string | null>(null)

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) characters.value = JSON.parse(raw)
  } catch {}
  if (characters.value.length && !selectedCharacterId.value) {
    selectedCharacterId.value = characters.value[0].id
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters.value))
}

export function useCharacters() {
  load()

  function addCharacter(name: string, initialData: Record<string, unknown> = {}) {
    characters.value.push({ id: crypto.randomUUID(), name, data: initialData })
    save()
    if (!selectedCharacterId.value || characters.value.length === 1) {
      selectedCharacterId.value = characters.value[characters.value.length - 1].id
    }
  }

  function removeCharacter(id: string) {
    characters.value = characters.value.filter((c) => c.id !== id)
    save()
  }

  function updateCharacter(id: string, patch: Partial<Character>) {
    const c = characters.value.find((c) => c.id === id)
    if (c) {
      Object.assign(c, patch)
      save()
    }
  }

  function updateCharacterData(id: string, data: Record<string, unknown>) {
    const c = characters.value.find((c) => c.id === id)
    if (c) {
      c.data = data
      save()
    }
  }

  return {
    characters,
    selectedCharacterId,
    selectCharacter(id: string | null) { selectedCharacterId.value = id },
    addCharacter,
    removeCharacter,
    updateCharacter,
    updateCharacterData,
  }
}
