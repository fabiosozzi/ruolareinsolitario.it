<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue'

const { t } = useI18n()
const { isOpen, activeOracleComponent, activeOracleLabel, close } = useVttSidebar()

const closeBtn = ref<HTMLButtonElement | null>(null)

watch(isOpen, (open) => {
  if (open) nextTick(() => closeBtn.value?.focus())
})

const oracleComponents: Record<string, Component> = {
  'VttOraclesFallout2d20Structures': defineAsyncComponent(() => import('~/components/vtt/oracles/fallout-2d20/Structures.vue')),
  'VttOraclesFallout2d20Encounters': defineAsyncComponent(() => import('~/components/vtt/oracles/fallout-2d20/Encounters.vue')),
}

const oracleComponent = computed(() => {
  const name = activeOracleComponent.value
  if (!name || !oracleComponents[name]) return null
  return oracleComponents[name]
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close()
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 translate-x-full"
      leave-active-class="transition-all duration-200"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed inset-y-0 right-0 z-50 w-full max-w-[min(90vw,70rem)] bg-black/90 backdrop-blur-md border-l border-green-700/50 shadow-2xl flex flex-col font-terminal"
      >
        <div class="flex items-center justify-between p-3 border-b border-green-700/30">
          <h2 class="text-base font-heading font-semibold text-green-400">
            {{ activeOracleLabel }}
          </h2>
          <button
            ref="closeBtn"
            class="px-2 py-1 text-base text-green-400 hover:text-white border border-green-700/50 rounded cursor-pointer"
            @click="close"
          >
            {{ t('vtt.sidebar.close') }}
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <component :is="oracleComponent" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
