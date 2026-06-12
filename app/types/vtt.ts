export interface DiceConfig {
  type: string
  label: string
  sides: number
  defaultCount?: number
}

export interface OracleConfig {
  id: string
  label: string
  component: string
}

export interface VttGameConfig {
  id: string
  name: string
  description: string
  background: string
  markerIcon: string
  dice: DiceConfig[]
  diceComponent?: string
  oracles: OracleConfig[]
}

export interface DiceRollResult {
  type: string
  label: string
  values: number[]
  total: number
  icon?: boolean
  icons?: boolean[]
  timestamp: number
  successes?: number
  successesRequired?: number
  passed?: boolean
  effects?: number
}

export interface MapMarker {
  id: string
  x: number
  y: number
}

export interface StoredMap {
  id: string
  name: string
  description: string
  dataUrl: string
  timestamp: number
  markers: MapMarker[]
}
