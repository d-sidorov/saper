import type { ISettings } from '@models/index'

const settings: ISettings[] = [
  {
    key: 'easy',
    label: 'Простой',
    cols: 8,
    rows: 8,
    amountOfMines: 10
  },
  { key: 'medium', label: 'Средний', cols: 16, rows: 16, amountOfMines: 40 },
  { key: 'hard', label: 'Сложный', cols: 16, rows: 32, amountOfMines: 100 }
]

export { settings }
