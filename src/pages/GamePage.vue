<script setup lang="ts">
import GameSettings from '@components/Game/GameSettings.vue'
import GameMain from '@components/Game/GameMain.vue'

import type { IGamePages, ISettings } from '@/models'
import { useLeaderBoardStore } from '@/store'
import { ref } from 'vue'

const leaderBoardStore = useLeaderBoardStore()
const activeComponentName = ref<IGamePages>('settings')
const activeGameSetting = ref<ISettings | null>(null)
const username = ref<string>('')
const customCols = ref<number>(10)
const customRows = ref<number>(10)
const customAmountOfMines = ref<number>(5)

const onStartGame = () => {
  if (!activeGameSetting.value) return

  if (activeGameSetting.value.key === 'custom') {
    activeGameSetting.value.cols = customCols.value
    activeGameSetting.value.rows = customRows.value
    activeGameSetting.value.amountOfMines = customAmountOfMines.value
  }

  activeComponentName.value = 'game'
}
const onGoHome = () => {
  activeComponentName.value = 'settings'
  activeGameSetting.value = null
}
const onSetLeaderBoard = (time: number) => {
  leaderBoardStore.addToLeaderBoard({ time, name: username.value || 'unknown' })
}
</script>

<template>
  <div class="w-full">
    <GameSettings
      v-if="activeComponentName === 'settings'"
      v-model:gameSetting="activeGameSetting"
      v-model:username="username"
      v-model:customCols="customCols"
      v-model:customRows="customRows"
      v-model:customAmountOfMines="customAmountOfMines"
      @startGame="onStartGame"
    />
    <GameMain
      v-else-if="activeGameSetting"
      :activeGameSetting="activeGameSetting"
      @goHome="onGoHome"
      @setLeaderBoard="onSetLeaderBoard"
    />
  </div>
</template>
