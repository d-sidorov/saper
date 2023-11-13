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
    customCols: string
    customRows: string
    customAmountOfMines: string
  }>(),
  {
    gameSetting: null
  }
)
const emit = defineEmits<{
  (e: 'update:gameSetting', setting: ISettings): void
  (e: 'update:username', username: string): void
  (e: 'update:customCols', customCols: string): void
  (e: 'update:customRows', customRows: string): void
  (e: 'update:customAmountOfMines', customAmountOfMines: string): void
  (e: 'startGame'): void
}>()

const data = useVModels(props, emit)

const customSettingsError = computed(() => {
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
        <span>{{ setting.label }}</span>
        <span v-if="setting.key !== 'custom'"> Количество мин: {{ setting.amountOfMines }} </span>
      </MyButton>

      <div
        v-if="data.gameSetting.value?.key === 'custom'"
        class="w-full flex justify-between items-center gap-x-2"
      >
        <MyInput placeholder="Ширина" class="mb-3" v-model="data.customCols.value" />
        <MyInput placeholder="Высота" class="mb-3" v-model="data.customRows.value" />
        <MyInput placeholder="Мины" class="mb-3" v-model="data.customAmountOfMines.value" />
      </div>
    </div>

    <p
      v-if="data.gameSetting.value?.key === 'custom' && customSettingsError"
      class="text-center text-red-600"
    >
      {{ customSettingsError }}
    </p>
    <MyButton
      class="justify-center"
      color="blue-500"
      text-color="white"
      :disabled="customSettingsError"
      @click="$emit('startGame')"
    >
      Начать игру
    </MyButton>
  </div>
</template>
