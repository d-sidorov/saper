export type IGamePages = 'settings' | 'game'

export type ISettings = {
  key: 'easy' | 'medium' | 'hard'
  label: string
  cols: number
  rows: number
  amountOfMines: number
}
