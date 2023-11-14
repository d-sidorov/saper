import type { RouteRecordRaw } from 'vue-router'
import GamePage from '@pages/GamePage.vue'

export default {
  path: '/game',
  name: 'game',
  meta: {
    title: 'Игра'
  },
  component: GamePage
} as RouteRecordRaw
