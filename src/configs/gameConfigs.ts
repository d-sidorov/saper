import type { ISettings } from '@models/index'

export const settings: ISettings[] = [
  {
    key: 'easy',
    label: 'Простой',
    cols: 8,
    rows: 8,
    amountOfMines: 10
  },
  { key: 'medium', label: 'Средний', cols: 16, rows: 16, amountOfMines: 40 },
  { key: 'hard', label: 'Сложный', cols: 32, rows: 16, amountOfMines: 100 }
]

export const relativeDisplacement = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

export const LEADER_BOARD_STORAGE_NAME = 'leaderBoard'
export const MAX_LEADER_BOARD_STORAGE = 10
