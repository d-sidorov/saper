import type { RouteRecordRaw } from 'vue-router'
import GamePage from '@pages/GamePage.vue'

export default {
  path: '/game',
  name: 'Игра',
  component: GamePage
} as RouteRecordRaw
