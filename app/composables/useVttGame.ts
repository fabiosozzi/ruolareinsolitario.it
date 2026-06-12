import type { VttGameConfig } from '~/types/vtt'

const configs = import.meta.glob<VttGameConfig>('../vtt-config/*.ts', {
  eager: false,
  import: 'default',
})

export function useVttGame() {
  const route = useRoute()
  const gameId = computed(() => route.params.game as string)

  const config = ref<VttGameConfig | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function loadConfig(id: string): Promise<VttGameConfig | null> {
    for (const [path, importFn] of Object.entries(configs)) {
      const module = await importFn()
      if (module.id === id) {
        return module
      }
    }
    return null
  }

  async function loadCurrentGame() {
    loading.value = true
    error.value = null
    try {
      const result = await loadConfig(gameId.value)
      if (result) {
        config.value = result
      } else {
        error.value = `Game "${gameId.value}" not found`
      }
    } catch (e) {
      error.value = String(e)
    } finally {
      loading.value = false
    }
  }

  watch(gameId, loadCurrentGame, { immediate: true })

  return {
    config: readonly(config),
    loading: readonly(loading),
    error: readonly(error),
    loadConfig,
  }
}

export async function getAllGameConfigs(): Promise<VttGameConfig[]> {
  const results: VttGameConfig[] = []
  for (const [path, importFn] of Object.entries(configs)) {
    const module = await importFn()
    results.push(module)
  }
  return results.sort((a, b) => a.name.localeCompare(b.name))
}
