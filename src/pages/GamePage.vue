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

const onStartGame = () => {
  if (!activeGameSetting.value) return
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
