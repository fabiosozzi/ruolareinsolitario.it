<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue'

const props = defineProps<{
  component: string
}>()

const components: Record<string, Component> = {
  'VttCharacterFallout2d20CharacterSheet': defineAsyncComponent(() => import('~/components/vtt/character/fallout-2d20/CharacterSheet.vue')),
}

const activeComponent = computed(() => components[props.component] ?? null)
</script>

<template>
  <component :is="activeComponent" />
</template>
