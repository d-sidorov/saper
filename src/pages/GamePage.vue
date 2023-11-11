<script setup lang="ts">
import GameSettings from '@components/Game/GameSettings.vue'
import GameMain from '@components/Game/GameMain.vue'

import type { IGamePages, ISettings } from '@models/index'
import { ref } from 'vue'

const activeComponentName = ref<IGamePages>('settings')
const activeGameSetting = ref<ISettings | null>(null)

const onSetSettings = (setting: ISettings) => (activeGameSetting.value = setting)
const onStartGame = () => {
  if (!activeGameSetting.value) return
  activeComponentName.value = 'game'
}
</script>

<template>
  <div class="w-96">
    <GameSettings
      v-if="activeComponentName === 'settings'"
      :activeGameSetting="activeGameSetting"
      @setSetting="onSetSettings"
      @startGame="onStartGame"
    />
    <GameMain v-else :activeGameSetting="activeGameSetting" />
  </div>
</template>
