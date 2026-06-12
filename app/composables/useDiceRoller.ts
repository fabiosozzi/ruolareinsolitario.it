import type { DiceConfig, DiceRollResult } from '~/types/vtt'
import { rollDie as sharedRollDie, rollChallengeDie as sharedRollChallengeDie } from '~/utils/dice'

const history = ref<DiceRollResult[]>([])

function pushHistory(result: DiceRollResult) {
  history.value.unshift(result)
  if (history.value.length > 50) {
    history.value = history.value.slice(0, 50)
  }
}

export function useDiceRoller() {
  function rollDice(config: DiceConfig, count: number = 1): DiceRollResult {
    const values: number[] = []
    for (let i = 0; i < count; i++) {
      values.push(sharedRollDie(config.sides))
    }
    const result: DiceRollResult = {
      id: crypto.randomUUID(),
      type: config.type,
      label: config.label,
      values,
      total: values.reduce((a, b) => a + b, 0),
      timestamp: Date.now(),
    }
    pushHistory(result)
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
      id: crypto.randomUUID(),
      type: 'd66',
      label: 'D66',
      values: [tens, ones],
      total: value,
      timestamp: Date.now(),
    }
    pushHistory(result)
    return result
  }

  function rollChallengeDie(): DiceRollResult {
    const r = sharedRollChallengeDie()
    const result: DiceRollResult = {
      id: crypto.randomUUID(),
      type: 'fal-cd',
      label: 'CD',
      values: [r.value],
      total: r.value,
      icon: r.icon,
      timestamp: Date.now(),
    }
    pushHistory(result)
    return result
  }

  function rollD100(): DiceRollResult {
    const tens = Math.floor(Math.random() * 10) * 10
    const ones = Math.floor(Math.random() * 10)
    const total = tens + ones === 0 ? 100 : tens + ones
    const result: DiceRollResult = {
      id: crypto.randomUUID(),
      type: 'd100',
      label: 'D100',
      values: [tens === 0 && ones === 0 ? 100 : total],
      total: tens === 0 && ones === 0 ? 100 : total,
      timestamp: Date.now(),
    }
    pushHistory(result)
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
