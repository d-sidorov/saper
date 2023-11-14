<script setup lang="ts">
import type { ISettings, ICell, ICellMarks, IGameStatus } from '@/models'

import MyButton from '@components/UI/MyButton.vue'
import GameCell from './GameCell.vue'
import refreshIcon from '@assets/icons/refresh.svg?url'
import homeIcon from '@assets/icons/home.svg?url'

import { relativeDisplacement } from '@configs/gameConfigs'
import { generateField, getRandomItemsFromArray, getSeconds, getMinutes } from '@/utils'
import { ref, reactive, computed, onBeforeUnmount } from 'vue'

const props = defineProps<{ activeGameSetting: ISettings }>()
const emit = defineEmits<{
  (e: 'goHome'): void
  (e: 'setLeaderBoard', time: number): void
}>()

const getField = () => generateField(props.activeGameSetting.cols, props.activeGameSetting.rows)
const field = reactive(getField())
const time = ref(0)
const startTime = ref<Date | null>()
const timerId = ref<number>()
const isFirstStep = ref(true)
const gameStatus = ref<IGameStatus>('pending')

const amountOfFlags = computed(() => {
  return field.reduce((acc, row) => {
    const cellsWithFlag = row.filter((cell) => cell.mark === 'flag')
    return acc + cellsWithFlag.length
  }, 0)
})
const score = computed(() => props.activeGameSetting.amountOfMines - amountOfFlags.value)
const isGameFinished = computed(() => gameStatus.value === 'lose' || gameStatus.value === 'win')
const isGameCompleted = computed(() => {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      const cell = field[i][j]
      if (!cell.isOpen && cell.mark !== 'flag' && !cell.isMine) return false
    }
  }
  return true
})
const formatTime = computed(() => {
  const seconds = getSeconds(time.value)
  const minutes = getMinutes(time.value)
  return {
    minutes: `0${minutes}`.slice(-2),
    seconds: `0${seconds}`.slice(-2)
  }
})
const gameStatusBorderClass = computed(() => {
  if (gameStatus.value === 'lose') return 'border-2 border-red-500'
  else if (gameStatus.value === 'win') return 'border-2 border-green-500'
  return null
})

const onCellClick = (cell: ICell) => {
  if (isGameFinished.value || cell.isOpen || cell.mark) return

  if (isFirstStep.value) startGame(cell)

  cell.isOpen = true
  if (cell.isMine) return endGame('lose')

  openCell(cell)

  if (isGameCompleted.value) {
    endGame('win')
    emit('setLeaderBoard', time.value)
  }
}

const onCellRightClick = (cell: ICell) => {
  if (isGameFinished.value || cell.isOpen) return
  const newMark: ICellMarks = !cell.mark ? 'flag' : cell.mark === 'flag' ? 'question' : null
  cell.mark = newMark
}

const onCellWheelClick = (cell: ICell) => {
  if (!cell.isOpen || !cell.numberOfMinesNearby) return
  const neighbors = getNeighbors(cell)
  const numberOfFlags = neighbors.reduce((acc, cell) => {
    return cell.mark === 'flag' ? ++acc : acc
  }, 0)
  if (numberOfFlags === cell.numberOfMinesNearby) {
    neighbors.forEach((cell) => {
      if (!cell.isOpen && cell.mark !== 'flag') {
        if (cell.isMine) {
          openCell(cell, false)
          endGame('lose')
        } else openCell(cell)
      }
    })
  }
}

const onCellWheelDown = (cell: ICell) => {
  const neighbors = getNeighbors(cell)
  neighbors.forEach((neighbor) => (neighbor.isLight = true))
}

const onCellWheelUp = (cell: ICell) => {
  const neighbors = getNeighbors(cell)
  neighbors.forEach((neighbor) => (neighbor.isLight = false))
}

const startGame = (cell: ICell) => {
  isFirstStep.value = false
  gameStatus.value = 'process'
  startTime.value = new Date()
  setMines(cell)
  setTimer()
}

const endGame = (status: IGameStatus) => {
  gameStatus.value = status
  clearTimer()
}

const restart = () => {
  time.value = 0
  isFirstStep.value = true
  gameStatus.value = 'pending'
  field.splice(0, props.activeGameSetting.rows, ...getField())
  clearTimer()
}

const setMines = (ignoreCell: ICell) => {
  const cells = field.reduce((acc, row) => {
    return [...acc, ...row.filter((cell) => cell !== ignoreCell)]
  }, [])
  const mines = getRandomItemsFromArray(cells, props.activeGameSetting.amountOfMines)
  mines.forEach((mine) => (mine.isMine = true))
}

const openCell = (cell: ICell, isOpenNeighbors = true) => {
  cell.isOpen = true
  cell.mark = null
  setNumberOfMinesNearby(cell)
  if (isOpenNeighbors) openNeighbors(cell)
}

const setNumberOfMinesNearby = (cell: ICell) => {
  const neighbors = getNeighbors(cell)
  let numberOfMinesNearby = 0

  neighbors.forEach((neighbor) => {
    if (neighbor.isMine) numberOfMinesNearby++
  })
  cell.numberOfMinesNearby = numberOfMinesNearby
}

const openNeighbors = (cell: ICell) => {
  if (cell.numberOfMinesNearby !== 0) return

  const neighbors = getNeighbors(cell)
  neighbors.forEach((neighbor) => {
    if (!neighbor.isOpen) {
      openCell(neighbor)
    }
  })
}

const getNeighbors = (cell: ICell) => {
  const neighbors: ICell[] = []

  relativeDisplacement.forEach(([x, y]) => {
    const relativeX = cell.x + x
    const relativeY = cell.y + y

    if (!field[relativeY]?.[relativeX]) return false
    neighbors.push(field[relativeY][relativeX])
  })
  return neighbors
}

const setTimer = () => {
  timerId.value = setInterval(() => {
    if (!startTime.value) return
    time.value = +new Date() - +startTime.value
  }, 0)
}

const clearTimer = () => clearInterval(timerId.value)

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center mx-auto gap-x-8">
      <MyButton @click="$emit('goHome')"><img :src="homeIcon" height="20" width="20" /> </MyButton>
      <div class="flex gap-x-2 items-center">
        <MyButton @click="restart">
          <img :src="refreshIcon" height="20" width="20" />
        </MyButton>
        <span class="min-w-[30px] text-center">{{ score }}</span>
      </div>
      <span>{{ formatTime.minutes }}:{{ formatTime.seconds }}</span>
    </div>

    <div class="flex overflow-auto">
      <table class="border-collapse border border-slate-400 mx-auto" :class="gameStatusBorderClass">
        <tr v-for="(row, y) in field" :key="y">
          <GameCell
            v-for="(cell, x) in row"
            :key="x"
            :cell="cell"
            @click="onCellClick(cell)"
            @contextmenu="onCellRightClick(cell)"
            @wheelClick="onCellWheelClick(cell)"
            @wheelDown="onCellWheelDown(cell)"
            @wheelUp="onCellWheelUp(cell)"
          />
        </tr>
      </table>
    </div>
  </div>
</template>
