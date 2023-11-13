<script setup lang="ts">
export interface IButtonProps {
  color?: string
  activeColor?: string
  textColor?: string
  active?: boolean
}

withDefaults(defineProps<IButtonProps>(), {
  color: 'white',
  activeColor: 'white',
  textColor: 'black',
  active: false
})
</script>

<template>
  <button
    class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
    :class="[
      `bg-${active ? activeColor : color}`,
      `text-${textColor}`,
      $attrs.disabled ? 'opacity-50' : ''
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<style></style>
