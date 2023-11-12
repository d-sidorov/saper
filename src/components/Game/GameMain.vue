<script setup lang="ts">
import type { ISettings, ICell, IGameStatus } from '@/models'

import MyButton from '@components/UI/MyButton.vue'
import GameCell from './GameCell.vue'

import { relativeDisplacement } from '@configs/gameConfigs'
import { generateField, getRandomItemsFromArray } from '@/utils'
import { ref, reactive, computed, onBeforeUnmount } from 'vue'

const props = defineProps<{ activeGameSetting: ISettings }>()
defineEmits<{ (e: 'goHome'): void }>()

const getField = () => generateField(props.activeGameSetting.cols, props.activeGameSetting.rows)
const time = ref()
const startTime = ref<Date | null>()
const timerId = ref<number>()
const isFirstStep = ref(true)
const gameStatus = ref<IGameStatus>('pending')

let field = reactive(getField())

const amountOfFlags = computed(() => {
  return field.reduce((acc, row) => {
    const cellsWithFlag = row.filter((cell) => cell.isFlag)
    return acc + cellsWithFlag.length
  }, 0)
})
const score = computed(() => props.activeGameSetting.amountOfMines - amountOfFlags.value)
const isGameFinished = computed(() => gameStatus.value === 'lose' || gameStatus.value === 'win')
const isGameCompleted = computed(() => {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      const cell = field[i][j]
      if (!cell.isOpen && !cell.isFlag && !cell.isMine) return false
    }
  }
  return true
})
const formatTime = computed(() => {
  const seconds = Math.floor(time.value / 1000) % 60 || 0
  const minutes = Math.floor(time.value / 1000 / 60) || 0

  return {
    minutes: `0${minutes}`.slice(-2),
    seconds: `0${seconds}`.slice(-2)
  }
})

const onCellClick = (cell: ICell) => {
  if (isGameFinished.value || cell.isFlag) return

  if (isFirstStep.value) startGame(cell)

  cell.isOpen = true
  if (cell.isMine) return endGame('lose')

  openNeighbors(cell)

  if (isGameCompleted.value) endGame('win')
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

const onCellRightClick = (cell: ICell) => {
  if (isGameFinished.value || cell.isOpen) return
  cell.isFlag = !cell.isFlag
}

const setMines = (ignoreCell: ICell) => {
  const cells = field.reduce((acc, row) => {
    return [...acc, ...row.filter((cell) => cell !== ignoreCell)]
  }, [])
  const mines = getRandomItemsFromArray(cells, props.activeGameSetting.amountOfMines)
  mines.forEach((mine) => (mine.isMine = true))
}

const openNeighbors = (cell: ICell) => {
  const neighbors = getNeighbors(cell)
  let numberOfMinesNearby = 0

  neighbors.forEach((neighbor) => {
    if (neighbor.isMine) numberOfMinesNearby++
  })
  cell.numberOfMinesNearby = numberOfMinesNearby

  if (numberOfMinesNearby === 0) {
    neighbors.forEach((neighbor) => {
      if (!neighbor.isOpen) {
        neighbor.isOpen = true
        openNeighbors(neighbor)
      }
    })
  }
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
  }, 1000)
}

const clearTimer = () => clearInterval(timerId.value)

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <MyButton @click="$emit('goHome')"> {{ '<-' }} </MyButton>
      <div class="flex gap-x-2 items-center">
        <MyButton @click="restart"> 0 </MyButton>
        <span>{{ score }}</span>
      </div>
      <span>Время: {{ formatTime.minutes }}:{{ formatTime.seconds }}</span>
    </div>

    <div class="flex justify-center">
      <table class="border-collapse border border-slate-400">
        <tr v-for="(row, y) in field" :key="y">
          <GameCell
            v-for="(cell, x) in row"
            :key="x"
            :cell="cell"
            @click="onCellClick(cell)"
            @contextmenu="onCellRightClick(cell)"
          />
        </tr>
      </table>
    </div>
  </div>
</template>
