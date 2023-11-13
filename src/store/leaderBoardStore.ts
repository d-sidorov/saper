import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { ILeaderBoardItem } from '@/models'

import { LEADER_BOARD_STORAGE_NAME, MAX_LEADER_BOARD_STORAGE } from '@configs/gameConfigs'

export default defineStore('leaderBoard', () => {
  const leaderBoard = useLocalStorage<ILeaderBoardItem[]>(LEADER_BOARD_STORAGE_NAME, [])

  const addToLeaderBoard = (item: ILeaderBoardItem) => {
    if (!leaderBoard.value.length) {
      leaderBoard.value.push(item)
      return
    }

    if (
      leaderBoard.value.length === MAX_LEADER_BOARD_STORAGE &&
      item.time > leaderBoard.value[MAX_LEADER_BOARD_STORAGE - 1].time
    )
      return

    const existingUserIndex = leaderBoard.value.findIndex(
      (_item) => _item.name.toLowerCase().trim() === item.name.toLowerCase().trim()
    )

    if (existingUserIndex !== -1) {
      const existingUser = leaderBoard.value[existingUserIndex]
      if (item.time < existingUser.time) leaderBoard.value.splice(existingUserIndex, 1, item)
    } else {
      leaderBoard.value.push(item)
    }

    leaderBoard.value = leaderBoard.value
      .sort((a, b) => a.time - b.time)
      .slice(0, MAX_LEADER_BOARD_STORAGE)
  }

  return { leaderBoard, addToLeaderBoard }
})
