<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLeaderBoardStore } from '@/store/index'
import type { ILeaderBoardItem } from '@/models'
import { getMinutes, getSeconds } from '@/utils'

const leaderBoardStore = useLeaderBoardStore()
const { leaderBoard } = storeToRefs(leaderBoardStore)

const getFormattedTime = (item: ILeaderBoardItem) => {
  const seconds = getSeconds(item.time)
  const minutes = getMinutes(item.time)
  const time = {
    minutes: `0${minutes}`.slice(-2),
    seconds: `0${seconds}`.slice(-2)
  }

  return `${time.minutes}:${time.seconds}`
}
</script>

<template>
  <div class="flex flex-col gap-y-4 w-full md:max-w-lg mx-auto">
    <p class="text-center font-bold">Таблица лидеров</p>
    <table class="border-collapse border border-slate-400">
      <thead>
        <tr>
          <th class="border border-slate-300">Имя</th>
          <th class="border border-slate-300">Время</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="leaderBoard.length">
          <tr v-for="(item, index) of leaderBoard" :key="index">
            <td class="border border-slate-300 p-2 max-w-lg">
              <p class="whitespace-normal break-all">{{ item.name }}</p>
            </td>
            <td class="border border-slate-300 p-2">{{ getFormattedTime(item) }}</td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="2" class="text-center">Нет записей</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
