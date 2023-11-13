<script setup lang="ts">
import type { ISettings } from '@/models'

import MyButton from '@components/UI/MyButton.vue'
import MyInput from '@components/UI/MyInput.vue'
import { settings } from '@configs/gameConfigs'

import { useVModels } from '@vueuse/core'

const props = withDefaults(defineProps<{ gameSetting: ISettings | null; username: string }>(), {
  gameSetting: null
})
const emit = defineEmits<{
  (e: 'update:gameSetting', setting: ISettings): void
  (e: 'update:username', username: string): void
  (e: 'startGame'): void
}>()

const data = useVModels(props, emit)
</script>

<template>
  <div class="flex flex-col gap-y-4 w-full md:max-w-lg mx-auto">
    <p class="text-center font-bold">Выберите уровень</p>
    <div class="flex flex-col gap-y-4">
      <MyInput placeholder="Введите имя" class="mb-3" v-model="data.username.value" />
      <MyButton
        v-for="(setting, index) in settings"
        :key="index"
        active-color="green-200"
        :active="setting.key === gameSetting?.key"
        class="justify-between"
        @click="data.gameSetting.value = setting"
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
