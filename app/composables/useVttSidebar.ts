const isOpen = ref(false)
const activeOracleId = ref<string | null>(null)
const activeOracleComponent = ref<string | null>(null)
const activeOracleLabel = ref<string | null>(null)

export function useVttSidebar() {
  function openOracle(id: string, component: string, label: string) {
    if (activeOracleId.value === id) {
      close()
      return
    }
    activeOracleId.value = id
    activeOracleComponent.value = component
    activeOracleLabel.value = label
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    activeOracleId.value = null
    activeOracleComponent.value = null
    activeOracleLabel.value = null
  }

  return {
    isOpen: readonly(isOpen),
    activeOracleId: readonly(activeOracleId),
    activeOracleComponent: readonly(activeOracleComponent),
    activeOracleLabel: readonly(activeOracleLabel),
    openOracle,
    close,
  }
}
