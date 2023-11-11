<script setup lang="ts">
import type { ICell } from '@/models'
import { computed, toRefs } from 'vue'

const props = defineProps<{ cell: ICell }>()
const { cell } = toRefs(props)
defineEmits<{ (e: 'click'): void }>()

const cellState = computed(() => {
  if (!cell.value.isOpen) return 'closed'
  else if (cell.value.isMine) return 'mine'
  else if (cell.value.isOpen) return 'opened'

  return 'closed'
})

const cellBackground = computed(() => {
  switch (cellState.value) {
    case 'opened':
      return 'bg-green-300'
    case 'closed':
      return 'bg-white'
    case 'mine':
      return 'bg-red-300'
    default:
      return 'bg-white'
  }
})

const cellLabel = computed(() => {
  if (cellState.value === 'closed') return ''
  if (cellState.value === 'mine') return '*'
  return cell.value.numberOfMinesNearby || null
})
</script>

<template>
  <td
    class="border border-slate-300 min-h-[30px] min-w-[30px] h-[30px] w-[30px] p-0"
    :class="[cellBackground]"
    @click="$emit('click')"
  >
    <div class="w-100 h-100 flex items-center justify-center">
      {{ cellLabel }}
    </div>
  </td>
</template>
