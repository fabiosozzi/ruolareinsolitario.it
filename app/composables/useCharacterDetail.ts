const isOpen = ref(false)
const activeCharacterId = ref<string | null>(null)

export function useCharacterDetail() {
  function open(id: string) {
    activeCharacterId.value = id
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    activeCharacterId.value = null
  }

  return {
    isOpen: readonly(isOpen),
    activeCharacterId: readonly(activeCharacterId),
    open,
    close,
  }
}
