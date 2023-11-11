<script setup lang="ts">
import type { ISettings } from '@/models'

import MyButton from '@components/UI/MyButton.vue'
import { settings } from '@configs/gameConfigs'

withDefaults(defineProps<{ activeGameSetting: ISettings | null }>(), { activeGameSetting: null })

defineEmits<{
  (e: 'setSetting', setting: ISettings): void
  (e: 'startGame'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <p class="text-center font-bold">Выберите уровень</p>
    <div class="flex flex-col gap-y-4">
      <MyButton
        v-for="(setting, index) in settings"
        :key="index"
        active-color="green-200"
        :active="setting.key === activeGameSetting?.key"
        class="justify-between"
        @click="$emit('setSetting', setting)"
      >
        <span>{{ setting.label }}</span> <span>Количество мин: {{ setting.amountOfMines }}</span>
      </MyButton>
    </div>

    <MyButton
      class="justify-center"
      color="blue-500"
      text-color="white"
      @click="$emit('startGame')"
    >
      Начать игру
    </MyButton>
  </div>
</template>
