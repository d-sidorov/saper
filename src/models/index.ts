export type IGamePages = 'settings' | 'game'

export type ISettings = {
  key: 'easy' | 'medium' | 'hard'
  label: string
  cols: number
  rows: number
  amountOfMines: number
}

export type IGameStatus = 'pending' | 'process' | 'lose' | 'win'

export type ICell = {
  x: number
  y: number
  isOpen: boolean
  numberOfMinesNearby: number
  isMine: boolean
  isFlag: boolean
}
