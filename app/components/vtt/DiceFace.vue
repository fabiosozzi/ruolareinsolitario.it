<script setup lang="ts">
const props = defineProps<{
  value: number
  type: string
  icon?: boolean
}>()

const colors: Record<string, { bg: string; border: string; light: string }> = {
  d4: { bg: '#dc2626', border: '#f87171', light: '#fca5a5' },
  d6: { bg: '#059669', border: '#34d399', light: '#6ee7b7' },
  d8: { bg: '#ea580c', border: '#fb923c', light: '#fdba74' },
  d10: { bg: '#7c3aed', border: '#a78bfa', light: '#c4b5fd' },
  d12: { bg: '#7e22ce', border: '#a855f7', light: '#c084fc' },
  d20: { bg: '#d97706', border: '#f59e0b', light: '#fbbf24' },
  d100: { bg: '#0891b2', border: '#22d3ee', light: '#67e8f9' },
}

const c = computed(() => colors[props.type] ?? { bg: '#4b5563', border: '#9ca3af', light: '#d1d5db' })
const label = computed(() => `${props.type}: ${props.value}`)
</script>

<template>
  <!-- d4: triangolo |
     -->
  <svg v-if="type === 'd4'" viewBox="0 0 32 32" class="w-16 h-16 shrink-0" :aria-label="label" role="img">
    <polygon points="16,2 30,28 2,28" :fill="c.bg" :stroke="c.border" stroke-width="1.5" stroke-linejoin="round" />
    <line x1="16" y1="2" x2="16" y2="28" :stroke="c.light" stroke-width="1" opacity="0.4" />
    <line x1="2" y1="28" x2="16" y2="14" :stroke="c.light" stroke-width="1" opacity="0.4" />
    <line x1="30" y1="28" x2="16" y2="14" :stroke="c.light" stroke-width="1" opacity="0.4" />
    <text x="16" y="22" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="inherit">{{ value }}</text>
  </svg>

  <!-- d6: quadrato 2D -->
  <svg v-else-if="type === 'd6'" viewBox="0 0 32 32" class="w-16 h-16 shrink-0" :aria-label="label" role="img">
    <rect x="3" y="3" width="26" height="26" rx="4" :fill="c.bg" :stroke="c.border" stroke-width="1.5" />
    <rect x="5" y="5" width="22" height="22" rx="3" fill="white" opacity="0.08" />
    <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="inherit">{{ value }}</text>
  </svg>

  <!-- d8: rombo -->
  <svg v-else-if="type === 'd8'" viewBox="0 0 32 32" class="w-16 h-16 shrink-0" :aria-label="label" role="img">
    <polygon points="16,2 30,16 16,30 2,16" :fill="c.bg" :stroke="c.border" stroke-width="1.5" stroke-linejoin="round" />
    <line x1="16" y1="2" x2="16" y2="30" :stroke="c.light" stroke-width="1" opacity="0.4" />
    <line x1="2" y1="16" x2="30" y2="16" :stroke="c.light" stroke-width="1" opacity="0.4" />
    <line x1="16" y1="2" x2="2" y2="16" :stroke="c.light" stroke-width="1" opacity="0.25" />
    <line x1="30" y1="16" x2="16" y2="30" :stroke="c.light" stroke-width="1" opacity="0.25" />
    <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="inherit">{{ value }}</text>
  </svg>

  <!-- d10: pentagono -->
  <svg v-else-if="type === 'd10'" viewBox="0 0 32 32" class="w-16 h-16 shrink-0" :aria-label="label" role="img">
    <polygon points="16,3 28,12 24,27 8,27 4,12" :fill="c.bg" :stroke="c.border" stroke-width="1.5" stroke-linejoin="round" />
    <line x1="16" y1="3" x2="16" y2="27" :stroke="c.light" stroke-width="1" opacity="0.3" />
    <line x1="28" y1="12" x2="8" y2="27" :stroke="c.light" stroke-width="1" opacity="0.3" />
    <line x1="24" y1="27" x2="4" y2="12" :stroke="c.light" stroke-width="1" opacity="0.3" />
    <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="inherit">{{ value }}</text>
  </svg>

  <!-- d12: esagono -->
  <svg v-else-if="type === 'd12'" viewBox="0 0 32 32" class="w-16 h-16 shrink-0" :aria-label="label" role="img">
    <polygon points="28,16 22,26 10,26 4,16 10,6 22,6" :fill="c.bg" :stroke="c.border" stroke-width="1.5" stroke-linejoin="round" />
    <polygon points="16,16 28,16 22,26" :fill="c.light" fill-opacity="0.2" />
    <polygon points="16,16 22,26 10,26" :fill="c.light" fill-opacity="0.15" />
    <polygon points="16,16 10,26 4,16" :fill="c.light" fill-opacity="0.2" />
    <polygon points="16,16 4,16 10,6" :fill="c.light" fill-opacity="0.15" />
    <polygon points="16,16 10,6 22,6" :fill="c.light" fill-opacity="0.2" />
    <polygon points="16,16 22,6 28,16" :fill="c.light" fill-opacity="0.15" />
    <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="inherit">{{ value }}</text>
  </svg>

  <!-- d20: icosaedro (esagono + Y centrale) -->
  <svg v-else-if="type === 'd20'" viewBox="0 0 32 32" class="w-16 h-16 shrink-0" :aria-label="label" role="img">
    <polygon points="28,16 22,26 10,26 4,16 10,6 22,6" :fill="c.bg" :stroke="c.border" stroke-width="1.5" stroke-linejoin="round" />
    <line x1="16" y1="16" x2="10" y2="6" :stroke="c.light" stroke-width="1.5" opacity="0.5" />
    <line x1="16" y1="16" x2="22" y2="6" :stroke="c.light" stroke-width="1.5" opacity="0.5" />
    <line x1="16" y1="16" x2="16" y2="26" :stroke="c.light" stroke-width="1.5" opacity="0.5" />
    <line x1="16" y1="16" x2="28" y2="16" :stroke="c.light" stroke-width="1" opacity="0.25" />
    <line x1="16" y1="16" x2="4" y2="16" :stroke="c.light" stroke-width="1" opacity="0.25" />
    <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="inherit">{{ value }}</text>
  </svg>

  <!-- d100: cerchio -->
  <svg v-else-if="type === 'd100'" viewBox="0 0 32 32" class="w-16 h-16 shrink-0" :aria-label="label" role="img">
    <circle cx="16" cy="16" r="14" :fill="c.bg" :stroke="c.border" stroke-width="1.5" />
    <circle cx="16" cy="16" r="10" fill="none" :stroke="c.light" stroke-width="1" opacity="0.4" />
    <text x="16" y="20" text-anchor="middle" fill="white" font-size="20" font-weight="bold" font-family="inherit">{{ value }}</text>
  </svg>

  <!-- fal-cd: Challenge Die stile Pip-Boy -->
  <svg v-else-if="type === 'fal-cd'" viewBox="0 0 32 32" class="w-16 h-16 shrink-0" :aria-label="label" role="img">
    <rect x="2" y="2" width="28" height="28" rx="4" fill="#0a1628" stroke="#22d3ee" stroke-width="1.5" />
    <rect x="5" y="5" width="22" height="22" rx="3" fill="none" stroke="#22d3ee" stroke-width="0.5" opacity="0.3" />
    <g v-if="icon" fill="#fbbf24">
      <polygon points="16,5 10,16 14,16 13,27 22,14 17,14 17.5,11" />
    </g>
    <g v-else-if="value === 2" fill="#fbbf24">
      <circle cx="11" cy="16" r="2.5" />
      <circle cx="21" cy="16" r="2.5" />
    </g>
    <circle v-else-if="value === 1" cx="16" cy="16" r="2.5" fill="#fbbf24" />
  </svg>

  <!-- fallback -->
  <span v-else class="inline-flex items-center justify-center w-16 h-16 rounded text-base font-bold shrink-0" :style="{ backgroundColor: c.bg, color: 'white' }" :aria-label="label" role="img">
    {{ value }}
  </span>
</template>
