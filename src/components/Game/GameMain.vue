<script setup lang="ts">
import type { ISettings, ICell } from '@/models'

import MyButton from '@components/UI/MyButton.vue'
import GameCell from './GameCell.vue'

import { relativeDisplacement } from '@configs/gameConfigs'
import { generateField, getRandomItemsFromArray } from '@/utils'
import { ref, reactive } from 'vue'

const props = defineProps<{ activeGameSetting: ISettings }>()
defineEmits<{ (e: 'goHome'): void }>()

const score = ref(0)
const time = ref(0)
const isFirstStep = ref(true)
const field = reactive(generateField(props.activeGameSetting.cols, props.activeGameSetting.rows))

const layMines = (ignoreCell: ICell) => {
  const cells = field.reduce((acc, row) => {
    return [...acc, ...row.filter((cell) => cell !== ignoreCell)]
  }, [])
  const mines = getRandomItemsFromArray(cells, props.activeGameSetting.amountOfMines)
  mines.forEach((mine) => (mine.isMine = true))
}

const onCellClick = (cell: ICell) => {
  if (isFirstStep.value) {
    isFirstStep.value = false
    layMines(cell)
  }

  cell.isOpen = true
  if (cell.isMine) return endGame()
  openNeighbors(cell)
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

const endGame = () => {}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <MyButton @click="$emit('goHome')"> {{ '<-' }} </MyButton>
      <span>Счет: {{ score }}</span>
      <span>Время: {{ time }}</span>
    </div>

    <div>
      <table class="border-collapse border border-slate-400">
        <tr v-for="(row, y) in field" :key="y">
          <GameCell v-for="(cell, x) in row" :key="x" :cell="cell" @click="onCellClick(cell)" />
        </tr>
      </table>
    </div>
  </div>
</template>
