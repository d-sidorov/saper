<script setup lang="ts">
import type { ISettings } from '@/models'

import MyButton from '@components/UI/MyButton.vue'
import MyInput from '@components/UI/MyInput.vue'
import { settings } from '@configs/gameConfigs'

import { useVModels } from '@vueuse/core'

import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    gameSetting: ISettings | null
    username: string
    customCols: number
    customRows: number
    customAmountOfMines: number
  }>(),
  {
    gameSetting: null
  }
)
const emit = defineEmits<{
  (e: 'update:gameSetting', setting: ISettings): void
  (e: 'update:username', username: string): void
  (e: 'update:customCols', customCols: number): void
  (e: 'update:customRows', customRows: number): void
  (e: 'update:customAmountOfMines', customAmountOfMines: number): void
  (e: 'startGame'): void
}>()

const data = useVModels(props, emit)

const settingsError = computed(() => {
  if (!data.username.value) return 'Имя должно быть заполнено'

  if (data.gameSetting.value?.key !== 'custom') return false

  if (!data.customCols.value) return 'Ширина должна быть заполнена'
  if (+data.customCols.value > 100) return 'Ширина не должна быть больше 100'
  if (+data.customCols.value < 0) return 'Ширина не должна быть меньше 0'
  if (!data.customRows.value) return 'Высота должна быть заполнена'
  if (+data.customRows.value > 100) return 'Высота не должна быть больше 100'
  if (+data.customRows.value < 0) return 'Высота не должна быть меньше 0'
  if (!data.customAmountOfMines.value) return 'Количество мин должно быть заполнено'
  if (+data.customAmountOfMines.value > +data.customCols.value * +data.customRows.value - 1)
    return 'Количество мин не должно быть больше площади поля - 1'
  if (+data.customAmountOfMines.value < 0) return 'Высота не должна быть меньше 0'

  return false
})
</script>

<template>
  <div class="flex flex-col gap-y-4 w-full md:max-w-lg mx-auto">
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
        <span>{{ setting.label }}</span>
        <span v-if="setting.key !== 'custom'"> Количество мин: {{ setting.amountOfMines }} </span>
      </MyButton>

      <div
        v-if="data.gameSetting.value?.key === 'custom'"
        class="w-full flex justify-between items-center gap-x-2"
      >
        <MyInput type="number" placeholder="Ширина" class="mb-3" v-model="data.customCols.value" />
        <MyInput type="number" placeholder="Высота" class="mb-3" v-model="data.customRows.value" />
        <MyInput
          type="number"
          placeholder="Мины"
          class="mb-3"
          v-model="data.customAmountOfMines.value"
        />
      </div>
    </div>
    <MyButton
      class="justify-center"
      color="blue-500"
      text-color="white"
      :disabled="settingsError"
      @click="$emit('startGame')"
    >
      Начать игру
    </MyButton>

    <p v-if="settingsError" class="text-center text-red-600">
      {{ settingsError }}
    </p>
  </div>
</template>
