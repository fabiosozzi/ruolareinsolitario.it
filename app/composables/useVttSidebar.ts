const isOpen = ref(false)
const activeOracleId = ref<string | null>(null)
const activeOracleComponent = ref<string | null>(null)

export function useVttSidebar() {
  function openOracle(id: string, component: string) {
    if (activeOracleId.value === id) {
      close()
      return
    }
    activeOracleId.value = id
    activeOracleComponent.value = component
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    activeOracleId.value = null
    activeOracleComponent.value = null
  }

  return {
    isOpen: readonly(isOpen),
    activeOracleId: readonly(activeOracleId),
    activeOracleComponent: readonly(activeOracleComponent),
    openOracle,
    close,
  }
}
