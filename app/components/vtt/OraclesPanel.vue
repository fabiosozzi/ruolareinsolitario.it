<script setup lang="ts">
const { t } = useI18n()

const { isOpen, activeOracleComponent, close } = useVttSidebar()
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
        class="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-black/90 backdrop-blur-md border-l border-yellow-700/50 shadow-2xl flex flex-col"
      >
        <div class="flex items-center justify-between p-3 border-b border-yellow-700/30">
          <h2 class="text-sm font-heading font-semibold text-yellow-400">
            {{ t('vtt.sidebar.oracles') }}
          </h2>
          <button
            class="px-2 py-1 text-xs text-yellow-400 hover:text-white border border-yellow-700/50 rounded cursor-pointer"
            @click="close"
          >
            {{ t('vtt.sidebar.close') }}
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <component :is="activeOracleComponent" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
