<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue'

const { t } = useI18n()
const { isOpen, activeCharacterId, close } = useCharacterDetail()

const closeBtn = ref<HTMLButtonElement | null>(null)

watch(isOpen, (open) => {
  if (open) nextTick(() => closeBtn.value?.focus())
})

const components: Record<string, Component> = {
  'VttCharacterFallout2d20CharacterDetail': defineAsyncComponent(() => import('~/components/vtt/character/fallout-2d20/CharacterDetail.vue')),
}

const activeComponent = computed(() => {
  if (!activeCharacterId.value) return null
  return components['VttCharacterFallout2d20CharacterDetail'] ?? null
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 -translate-x-full"
      leave-active-class="transition-all duration-200"
      leave-to-class="opacity-0 -translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed inset-y-0 left-0 z-50 w-full max-w-[min(90vw,56rem)] bg-black/90 backdrop-blur-md border-r border-green-700/50 shadow-2xl flex flex-col font-terminal"
      >
        <div class="flex items-center justify-between p-3 border-b border-green-700/30">
          <h2 class="text-base font-heading font-semibold text-green-400">
            {{ t('vtt.character.title') }}
          </h2>
          <button
            ref="closeBtn"
            class="px-2 py-1 text-base text-green-400 hover:text-white border border-green-700/50 rounded cursor-pointer transition-colors"
            @click="close"
          >
            {{ t('vtt.sidebar.close') }}
          </button>
        </div>

        <div class="flex-1 overflow-y-auto">
          <component :is="activeComponent" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
