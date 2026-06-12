import type { DiceConfig, DiceRollResult } from '~/types/vtt'

const history = ref<DiceRollResult[]>([])

export function useDiceRoller() {
  function rollDie(sides: number, explode: boolean = false): number {
    const result = Math.floor(Math.random() * sides) + 1
    if (explode && result === sides) {
      return result + rollDie(sides, true)
    }
    return result
  }

  function rollDice(config: DiceConfig, count: number = 1): DiceRollResult {
    const values: number[] = []
    for (let i = 0; i < count; i++) {
      values.push(rollDie(config.sides))
    }
    const result: DiceRollResult = {
      type: config.type,
      label: config.label,
      values,
      total: values.reduce((a, b) => a + b, 0),
      timestamp: Date.now(),
    }
    history.value.unshift(result)
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }
    return result
  }

  function rollCustom(sides: number, count: number = 1, label: string = `d${sides}`): DiceRollResult {
    return rollDice({ type: `d${sides}`, label, sides }, count)
  }

  function rollD66(): DiceRollResult {
    const tens = Math.floor(Math.random() * 6) + 1
    const ones = Math.floor(Math.random() * 6) + 1
    const value = (tens - 1) * 10 + ones
    const result: DiceRollResult = {
      type: 'd66',
      label: 'D66',
      values: [tens, ones],
      total: value,
      timestamp: Date.now(),
    }
    history.value.unshift(result)
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }
    return result
  }

  function rollChallengeDie(): DiceRollResult {
    const raw = rollDie(6)
    let value: number
    let icon = false
    if (raw === 1) value = 1
    else if (raw === 2) value = 2
    else if (raw >= 5) { value = 1; icon = true }
    else value = 0

    const result: DiceRollResult = {
      type: 'fal-cd',
      label: 'CD',
      values: [value],
      total: value,
      icon,
      timestamp: Date.now(),
    }
    history.value.unshift(result)
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }
    return result
  }

  function rollD100(): DiceRollResult {
    const tens = Math.floor(Math.random() * 10) * 10
    const ones = Math.floor(Math.random() * 10)
    const total = tens + ones === 0 ? 100 : tens + ones
    const result: DiceRollResult = {
      type: 'd100',
      label: 'D100',
      values: [tens === 0 && ones === 0 ? 100 : total],
      total: tens === 0 && ones === 0 ? 100 : total,
      timestamp: Date.now(),
    }
    history.value.unshift(result)
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }
    return result
  }

  function clearHistory() {
    history.value = []
  }

  return {
    history: readonly(history),
    rollDice,
    rollCustom,
    rollD66,
    rollChallengeDie,
    rollD100,
    clearHistory,
  }
}
