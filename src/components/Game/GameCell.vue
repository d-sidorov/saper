<script setup lang="ts">
import type { ICell } from '@/models'
import { computed, toRefs } from 'vue'
import bombIcon from '@assets/icons/bomb.svg?url'
import flagIcon from '@assets/icons/flag.svg?url'
import questionIcon from '@assets/icons/question.svg?url'

const props = defineProps<{ cell: ICell }>()
defineEmits<{ (e: 'click'): void; (e: 'contextmenu'): void }>()
const cellBackgroundByMineAmountMap: { [key: number]: string } = {
  1: 'bg-blue-400',
  2: 'bg-green-400',
  3: 'bg-red-400',
  4: 'bg-blue-800',
  5: 'bg-amber-700',
  6: 'bg-teal-300',
  7: 'bg-black',
  8: 'bg-white'
}

const { cell } = toRefs(props)

const cellState = computed(() => {
  if (cell.value.mark) return 'isMarked'
  if (!cell.value.isOpen) return 'closed'
  else if (cell.value.isMine) return 'mine'
  else if (cell.value.isOpen) return 'opened'

  return 'closed'
})

const cellBackground = computed(() => {
  switch (cellState.value) {
    case 'opened': {
      if (cell.value.numberOfMinesNearby)
        return cellBackgroundByMineAmountMap[cell.value.numberOfMinesNearby]
      return 'bg-gray-200'
    }
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
  return cell.value.numberOfMinesNearby || null
})
</script>

<template>
  <td
    class="border border-slate-300 min-h-[30px] min-w-[30px] h-[30px] w-[30px] p-0 cursor-pointer select-none"
    :class="[cellBackground]"
    @click="$emit('click')"
    @contextmenu.prevent="$emit('contextmenu')"
  >
    <div class="w-100 h-100 flex items-center justify-center">
      <img v-if="cell.isOpen && cell.isMine" :src="bombIcon" height="20" width="20" />
      <img
        v-else-if="cellState === 'isMarked' && cell.mark === 'flag'"
        :src="flagIcon"
        height="20"
        width="20"
      />
      <img
        v-else-if="cellState === 'isMarked' && cell.mark === 'question'"
        :src="questionIcon"
        height="20"
        width="20"
      />
      <span v-else>{{ cellLabel }}</span>
    </div>
  </td>
</template>
