<script setup lang="ts">
import GameSettings from '@components/Game/GameSettings.vue'
import GameMain from '@components/Game/GameMain.vue'

import type { IGamePages, ISettings } from '@/models'
import { ref } from 'vue'

const activeComponentName = ref<IGamePages>('settings')
const activeGameSetting = ref<ISettings | null>(null)

const onSetSettings = (setting: ISettings) => (activeGameSetting.value = setting)
const onStartGame = () => {
  if (!activeGameSetting.value) return
  activeComponentName.value = 'game'
}
const onGoHome = () => {
  activeComponentName.value = 'settings'
  activeGameSetting.value = null
}
</script>

<template>
  <div class="md:min-w-[400px] md:w-auto w-full">
    <GameSettings
      v-if="activeComponentName === 'settings'"
      :activeGameSetting="activeGameSetting"
      @setSetting="onSetSettings"
      @startGame="onStartGame"
    />
    <GameMain
      v-else-if="activeGameSetting"
      :activeGameSetting="activeGameSetting"
      @goHome="onGoHome"
    />
  </div>
</template>
