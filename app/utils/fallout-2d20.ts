export const dimensions = ['small', 'medium', 'large', 'huge'] as const

export function maxHp(endurance: number): number {
  return endurance * 2 + 10
}

export function radThreshold(endurance: number): number {
  return endurance * 3 + 5
}
