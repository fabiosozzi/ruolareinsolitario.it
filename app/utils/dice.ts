export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

export function rollChallengeDie(): { value: number; icon: boolean } {
  const raw = rollDie(6)
  if (raw <= 2) return { value: raw === 1 ? 1 : 2, icon: false }
  if (raw >= 5) return { value: 1, icon: true }
  return { value: 0, icon: false }
}
