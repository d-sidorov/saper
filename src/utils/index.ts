import type { ICell } from '@/models'

export const generateField = (cols: number, rows: number) => {
  const field: ICell[][] = []

  for (let i = 0; i < rows; i++) {
    field[i] = []
    for (let j = 0; j < cols; j++) {
      field[i].push({ x: j, y: i, ...getDefaultCellWithoutCoordinates() })
    }
  }
  return field
}

export const getRandomItemsFromArray = <T>(arr: T[], amount: number) => {
  const cloneArr: T[] = [...arr]
  const result: T[] = []

  for (let i = 0; i < amount; i++) {
    const index = Math.floor(Math.random() * (cloneArr.length - 1))
    result.push(...cloneArr.splice(index, 1))
  }

  return result
}

export const getSeconds = (ms: number) => {
  return Math.floor(ms / 1000) % 60 || 0
}

export const getMinutes = (ms: number) => {
  return Math.floor(ms / 1000 / 60) || 0
}

const getDefaultCellWithoutCoordinates = (): Omit<ICell, 'x' | 'y'> => {
  return {
    numberOfMinesNearby: 0,
    isMine: false,
    isOpen: false,
    mark: null,
    isLight: false
  }
}
