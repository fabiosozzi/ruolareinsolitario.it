import type { VttGameConfig } from '~/types/vtt'

export default {
  id: 'fallout-2d20',
  name: 'Fallout 2d20',
  description: 'Tavolo virtuale per Fallout 2d20 — esplora la Zona Contaminata con oracoli, tiri dadi e mappe.',
  background: '/images/vtt/fallout/vtt_background.png',
  markerIcon: '/images/vtt/fallout/map_marker.png',
  dice: [
    { type: 'd20', label: 'D20', sides: 20, defaultCount: 1 },
    { type: 'fal-cd', label: 'CD', sides: 6, defaultCount: 1 },
  ],
  diceComponent: 'VttFalloutDicePanel',
  oracles: [
    { id: 'structures', label: 'Strutture', component: 'VttOraclesFallout2d20Structures' },
  ],
} satisfies VttGameConfig
