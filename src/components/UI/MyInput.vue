<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: string | number }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()

const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<template>
  <input
    type="text"
    class="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    v-bind="$attrs"
    v-model="model"
  />
</template>
